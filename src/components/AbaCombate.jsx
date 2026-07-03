// src/components/AbaCombate.jsx
import { useState } from 'react';
import { ARMAS, PROPRIEDADES_MAESTRIA } from '../data/armas';

export function AbaCombate(props) {
  const [ataques, setAtaques] = useState(props.dados.ataques || []);
  
  // Controle de Adição
  const [armaSelecionada, setArmaSelecionada] = useState(""); 
  const [novoAtributo, setNovoAtributo] = useState("forca");
  
  // Estados para Arma Customizada (Itens Mágicos/Homebrew)
  const [nomeCustom, setNomeCustom] = useState("");
  const [danoCustom, setDanoCustom] = useState("1d8");
  const [tipoCustom, setTipoCustom] = useState("Cortante");

  // Estado do Double-Tap de exclusão
  const [armaParaDeletar, setArmaParaDeletar] = useState(null);

  function salvarNoBanco(novaLista) {
    setAtaques(novaLista);
    if (props.aoSalvar) props.aoSalvar("ataques", novaLista);
  }

  function lidarComMudancaArma(valor) {
    setArmaSelecionada(valor);
    if (!valor || valor === "custom") return;

    const dadosArma = ARMAS.find(a => a.nome === valor);
    if (!dadosArma) return;

    const forca = props.dados.forca || 10;
    const destreza = props.dados.destreza || 10;

    const ehArmaDistancia = dadosArma.propriedades.some(p => p.toLowerCase().includes("munição"));
    if (ehArmaDistancia) {
      setNovoAtributo("destreza");
      return;
    }

    const temAcuidade = dadosArma.propriedades.includes("Acuidade");
    if (temAcuidade) {
      setNovoAtributo(destreza > forca ? "destreza" : "forca");
      return;
    }

    setNovoAtributo("forca");
  }

  function adicionarAtaque() {
    if (!armaSelecionada) return;
    
    let novo = {};

    if (armaSelecionada === "custom") {
      if (!nomeCustom) return alert("Digite o nome da arma mágica!");
      novo = {
        id: Date.now(),
        nome: nomeCustom,
        dano: danoCustom,
        tipo: tipoCustom,
        maestria: "", 
        propriedades: ["Mágica / Homebrew"],
        atributo: novoAtributo 
      };
    } else {
      const dadosArma = ARMAS.find(a => a.nome === armaSelecionada);
      if (!dadosArma) return;
      novo = {
        id: Date.now(),
        nome: dadosArma.nome,
        dano: dadosArma.dano,
        tipo: dadosArma.tipo,
        maestria: dadosArma.maestria, 
        propriedades: dadosArma.propriedades,
        atributo: novoAtributo 
      };
    }
    
    salvarNoBanco([...ataques, novo]);
    setArmaSelecionada(""); 
    setNomeCustom("");
  }

  function removerAtaque(id) {
    salvarNoBanco(ataques.filter(a => a.id !== id));
    setArmaParaDeletar(null); 
  }

  function rolarAtaque(ataque) {
    if (!props.aoRolar) return;
    const valorAtributo = props.dados[ataque.atributo] || 10; 
    const mod = Math.floor((valorAtributo - 10) / 2);
    const nivel = props.dados.nivel || 1;
    const prof = Math.ceil(nivel / 4) + 1;
    
    props.aoRolar(`Ataque com ${ataque.nome}`, mod + prof);
  }

  // Função simplificada para acionar o rolador oficial da Ficha!
  function dispararDanoDaAba(ataque, mod) {
    if (props.aoRolarDano) {
      props.aoRolarDano(ataque.nome, `${ataque.dano} + ${mod}`);
    }
  }

  const gruposDeArmas = ARMAS.reduce((grupos, arma) => {
    const categoria = arma.categoria || "Armas Padrão";
    if (!grupos[categoria]) grupos[categoria] = [];
    grupos[categoria].push(arma);
    return grupos;
  }, {});

  return (
    <div className="painel-combate">
      <h3>⚔️ Ações de Combate</h3>

      <div className="add-arma-box" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="select-arma-combate"
            value={armaSelecionada}
            onChange={e => lidarComMudancaArma(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">-- Selecione uma Arma --</option>
            <option value="custom">✨ Criar Arma Personalizada / Mágica</option>
            
            {Object.entries(gruposDeArmas).map(([nomeGrupo, armasDoGrupo]) => (
              <optgroup key={nomeGrupo} label={nomeGrupo}>
                {armasDoGrupo.map(a => (
                  <option key={a.nome} value={a.nome}>
                    {a.nome} ({a.dano})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <select 
            value={novoAtributo} 
            onChange={e => setNovoAtributo(e.target.value)}
            className="select-atributo"
          >
            <option value="forca">Força</option>
            <option value="destreza">Destreza</option>
            <option value="inteligencia">Inteligência</option> 
            <option value="sabedoria">Sabedoria</option>
            <option value="carisma">Carisma</option>
          </select>
          
          <button onClick={adicionarAtaque} className="btn-add-arma" disabled={!armaSelecionada}>
            ➕
          </button>
        </div>

        {armaSelecionada === "custom" && (
          <div className="custom-weapon-form fade-in" style={{ display: 'flex', gap: '10px', marginTop: '10px', background: '#1a1a1a', padding: '10px', borderRadius: '6px', border: '1px dashed #ffcc00' }}>
            <input 
              type="text" placeholder="Nome (Ex: Sun Blade)" 
              value={nomeCustom} onChange={e => setNomeCustom(e.target.value)}
              style={{ flex: 2, padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }}
            />
            <input 
              type="text" placeholder="Dano (Ex: 1d8 + 2d6)" 
              value={danoCustom} onChange={e => setDanoCustom(e.target.value)}
              style={{ flex: 1, padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }}
            />
            <input 
              type="text" placeholder="Tipo (Ex: Radiante)" 
              value={tipoCustom} onChange={e => setTipoCustom(e.target.value)}
              style={{ flex: 1, padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }}
            />
          </div>
        )}
      </div>

      <div className="grid-ataques">
        {ataques.length === 0 && <p className="vazio">Nenhuma arma equipada.</p>}

        {ataques.map((atk) => {
          const valAtr = props.dados[atk.atributo] || 10;
          const mod = Math.floor((valAtr - 10) / 2);
          const prof = Math.ceil((props.dados.nivel || 1) / 4) + 1;
          const bonusTotal = mod + prof;
          const textoBonus = bonusTotal >= 0 ? `+${bonusTotal}` : bonusTotal;
          const exibindoConfirmacao = armaParaDeletar === atk.id;

          return (
            <div key={atk.id} className="card-ataque">
              <div className="header-ataque">
                <span className="nome-arma">{atk.nome}</span>
                
                {exibindoConfirmacao ? (
                  <button 
                    className="btn-lixo-arma" 
                    onClick={() => removerAtaque(atk.id)}
                    style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '0.8rem' }}
                  >
                    Certeza?
                  </button>
                ) : (
                  <button 
                    className="btn-lixo-arma" 
                    onClick={() => { setArmaParaDeletar(atk.id); }}
                    title="Remover Arma"
                  >
                    x
                  </button>
                )}
              </div>
              
              <div className="corpo-ataque">
                <div className="info-dano">
                  <span className="dano-texto">{atk.dano} + {mod}</span>
                  <span className="tipo-atributo">{atk.atributo.substring(0,3).toUpperCase()}</span>
                </div>

                {atk.maestria && (
                  <div className="badge-maestria" title={PROPRIEDADES_MAESTRIA?.[atk.maestria] || ""}>
                    ✨ {atk.maestria}
                  </div>
                )}
                {atk.propriedades?.includes("Mágica / Homebrew") && (
                  <div className="badge-maestria" style={{ background: '#331a00', color: '#ffcc00', borderColor: '#cc9900' }}>
                    ✨ Arma Mágica
                  </div>
                )}

                <div className="botoes-rolagem" style={{marginTop:'10px'}}>
                  <button className="btn-rolar-ataque" onClick={() => rolarAtaque(atk)}>
                    🎲 Acerto <strong>{textoBonus}</strong>
                  </button>
                  {/* Chama a função limpa sem alert nativo */}
                  <button className="btn-rolar-dano" onClick={() => dispararDanoDaAba(atk, mod)}>
                    💥 Dano
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}