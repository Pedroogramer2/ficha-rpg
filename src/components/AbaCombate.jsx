// src/components/AbaCombate.jsx
import { useState } from 'react';
import { ARMAS, PROPRIEDADES_MAESTRIA } from '../data/armas';
import itensMagicos from '../data/itensMagicos'; 

export function AbaCombate(props) {
  const [ataques, setAtaques] = useState(props.dados.ataques || []);
  
  // Controle de Adição
  const [armaSelecionada, setArmaSelecionada] = useState(""); 
  
  // Estados para Arma Customizada
  const [nomeCustom, setNomeCustom] = useState("");
  const [danoCustom, setDanoCustom] = useState("1d8");
  const [tipoCustom, setTipoCustom] = useState("Cortante");
  const [ehAcuidadeCustom, setEhAcuidadeCustom] = useState(false);

  const [armaParaDeletar, setArmaParaDeletar] = useState(null);

  // 👇 INVENTÁRIO INTEGRADO: Filtra apenas os itens da mochila que estão equipados 👇
  const inventarioEquipado = (props.dados.inventario || []).filter(item => item.equipado);

  function salvarNoBanco(novaLista) {
    setAtaques(novaLista);
    if (props.aoSalvar) props.aoSalvar("ataques", novaLista);
  }

  function adicionarAtaque() {
    if (!armaSelecionada) return;
    
    let novo = {};

    if (armaSelecionada === "custom") {
      if (!nomeCustom) return alert("Digite o nome da arma mágica!");
      novo = {
        id: Date.now().toString(),
        nome: nomeCustom,
        dano: danoCustom,
        tipo: tipoCustom,
        maestria: "", 
        propriedades: ["Mágica / Homebrew", ehAcuidadeCustom ? "Acuidade" : ""].filter(Boolean),
        atributoOverride: "auto"
      };
    } else {
      const dadosArma = ARMAS.find(a => a.nome === armaSelecionada);
      if (!dadosArma) return;
      novo = {
        id: Date.now().toString(),
        nome: dadosArma.nome,
        dano: dadosArma.dano,
        tipo: dadosArma.tipo,
        maestria: dadosArma.maestria, 
        propriedades: dadosArma.propriedades,
        atributoOverride: "auto"
      };
    }
    
    salvarNoBanco([...ataques, novo]);
    setArmaSelecionada(""); 
    setNomeCustom("");
    setEhAcuidadeCustom(false);
  }

  function removerAtaque(id) {
    salvarNoBanco(ataques.filter(a => a.id !== id));
    setArmaParaDeletar(null); 
  }

  function mudarAtributoOverride(idArma, novoAtributo) {
    const novaLista = ataques.map(atk => 
      atk.id === idArma ? { ...atk, atributoOverride: novoAtributo } : atk
    );
    salvarNoBanco(novaLista);
  }

  function calcularAtributoDoAtaque(atk) {
    const forca = props.dados.forca || 10;
    const destreza = props.dados.destreza || 10;
    
    const propsLowerCase = atk.propriedades?.map(p => p.toLowerCase()) || [];

    let chaveAuto = "forca";
    if (propsLowerCase.includes("munição") || propsLowerCase.includes("ammunition") || propsLowerCase.includes("distância")) {
      chaveAuto = "destreza";
    } else if (propsLowerCase.includes("acuidade") || propsLowerCase.includes("finesse")) {
      chaveAuto = destreza > forca ? "destreza" : "forca";
    }

    if (!atk.atributoOverride || atk.atributoOverride === "auto") {
      return { chaveReal: chaveAuto, valor: props.dados[chaveAuto] || 10, chaveAuto: chaveAuto };
    }

    return { 
      chaveReal: atk.atributoOverride, 
      valor: props.dados[atk.atributoOverride] || 10, 
      chaveAuto: chaveAuto 
    };
  }

  function rolarAtaque(ataque, modInfo) {
    if (!props.aoRolar) return;
    const nivel = props.dados.nivel || 1;
    const prof = Math.ceil(nivel / 4) + 1;
    
    // Soma o modificador + proficiência + bônus mágico da arma (se tiver)
    const bonusMagico = ataque.bonusAtaque || 0;
    const modTotal = modInfo.modificador + prof + bonusMagico;
    
    props.aoRolar(`Ataque com ${ataque.nome}`, modTotal);
  }

  function dispararDanoDaAba(ataque, modInfo) {
    if (props.aoRolarDano) {
      const bonusMagico = ataque.bonusAtaque || 0;
      const modDanoCalculado = modInfo.modificador + bonusMagico;
      
      // Se for negativo não coloca o "+", ex: 1d8 - 1
      const sinalDano = modDanoCalculado >= 0 ? `+ ${modDanoCalculado}` : `- ${Math.abs(modDanoCalculado)}`;
      let stringFinalDano = `${ataque.dano} ${sinalDano}`;

      // Adiciona o dano extra do item mágico se existir (ex: +1d6 Fogo da Flametongue)
      if (ataque.danoExtra) {
        stringFinalDano += ` + ${ataque.danoExtra}`;
      }

      props.aoRolarDano(ataque.nome, stringFinalDano);
    }
  }

  const gruposDeArmas = ARMAS.reduce((grupos, arma) => {
    const categoria = arma.categoria || "Armas Padrão";
    if (!grupos[categoria]) grupos[categoria] = [];
    grupos[categoria].push(arma);
    return grupos;
  }, {});

  // 👇 JUNTA AS ARMAS MANUAIS COM AS ARMAS DO INVENTÁRIO 👇
  const ataquesDoInventario = inventarioEquipado.map(item => {
    
    const infoNormal = ARMAS.find(a => {
      const nomeBanco = a.nome.toLowerCase();
      const nomeInv = item.nome.toLowerCase();
      
      // Corta o nome no parênteses. Ex: "Mangual (Flail)" vira só "mangual"
      const nomeLimpo = nomeBanco.split('(')[0].trim();
      
      return nomeBanco === nomeInv || 
             nomeInv.includes(nomeLimpo) || 
             nomeLimpo.includes(nomeInv);
    });

    // 2. Procura no nosso MONSTRUOSO banco de ITENS MÁGICOS
    // O flatMap junta todos os arrays (Comum, Raro, Lendário) numa lista só!
    const todosOsMagicos = Object.values(itensMagicos).flatMap(array => array);
    
    // Procura por um item mágico com o nome exato (ignorando maiúsculas)
    const infoMagica = todosOsMagicos.find(i => i.nome.toLowerCase() === item.nome.toLowerCase());

    // 3. Define quem manda: O Mágico sobrepõe o Normal. Se não for nenhum, vira 1d4.
    const danoBase = infoMagica?.dano || infoNormal?.dano || "1d4";
    const tipoBase = infoMagica?.tipoDano || infoNormal?.tipo || "Concussão";
    
    // As propriedades juntam as normais (ex: Acuidade) com as mágicas
    const propBase = infoMagica?.propriedades || infoNormal?.propriedades || ["Arma Improvisada"];
    const maestriaBase = infoMagica?.maestria || infoNormal?.maestria || "";

    // Se o item mágico existe, checamos se ele EXIGE sintonia. 
    // Se exigir, o bônus só ativa se "item.sintonizado" for true.
    const isMagicoAtivo = infoMagica && (!infoMagica.attunement || item.sintonizado);
    
    return {
      id: `inv-${item.id}`,
      nome: item.nome,
      dano: danoBase,
      tipo: tipoBase,
      propriedades: propBase,
      maestria: maestriaBase,
      atributoOverride: "auto",
      isDoInventario: true, 
      // Puxa o bônus mágico dinâmico (O +3 da Vorpal, o +1 da Longsword)
      bonusAtaque: isMagicoAtivo ? (infoMagica.bonusAtaque || 0) : 0,
      danoExtra: isMagicoAtivo ? infoMagica.danoExtra : null
    };
  });

  const todosAtaques = [...ataques, ...ataquesDoInventario];

  return (
    <div className="painel-combate">
      <h3>⚔️ Ações de Combate</h3>

      <div className="add-arma-box" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="select-arma-combate"
            value={armaSelecionada}
            onChange={e => setArmaSelecionada(e.target.value)}
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
          
          <button onClick={adicionarAtaque} className="btn-add-arma" disabled={!armaSelecionada} title="Adicionar ao arsenal!">
            ➕
          </button>
        </div>

        {armaSelecionada === "custom" && (
          <div className="custom-weapon-form fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px', background: '#1a1a1a', padding: '10px', borderRadius: '6px', border: '1px dashed #ffcc00' }}>
            <input type="text" placeholder="Nome" value={nomeCustom} onChange={e => setNomeCustom(e.target.value)} style={{ flex: '1 1 40%', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
            <input type="text" placeholder="Dano" value={danoCustom} onChange={e => setDanoCustom(e.target.value)} style={{ flex: '1 1 20%', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
            <input type="text" placeholder="Tipo" value={tipoCustom} onChange={e => setTipoCustom(e.target.value)} style={{ flex: '1 1 20%', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
            <label style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffcc00', fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px' }}>
              <input type="checkbox" checked={ehAcuidadeCustom} onChange={(e) => setEhAcuidadeCustom(e.target.checked)} />
              Possui a tag "Acuidade" (Usa Destreza se for maior)
            </label>
          </div>
        )}
      </div>

      <div className="grid-ataques">
        {todosAtaques.length === 0 && <p className="vazio">Nenhuma arma equipada. (Adicione aqui ou equipe no Inventário).</p>}

        {todosAtaques.map((atk) => {
          const infoAtributo = calcularAtributoDoAtaque(atk);
          const mod = Math.floor((infoAtributo.valor - 10) / 2);
          const prof = Math.ceil((props.dados.nivel || 1) / 4) + 1;
          
          // Soma o bônus mágico visualmente
          const bonusMagicoVisual = atk.bonusAtaque || 0;
          const bonusTotal = mod + prof + bonusMagicoVisual;
          const textoBonus = bonusTotal >= 0 ? `+${bonusTotal}` : bonusTotal;
          
          const exibindoConfirmacao = armaParaDeletar === atk.id;

          return (
            <div key={atk.id} className="card-ataque" style={{ borderLeft: atk.isDoInventario ? '3px solid #3498db' : 'none' }}>
              <div className="header-ataque">
                <span className="nome-arma">
                  {atk.nome} 
                  {atk.isDoInventario && <span style={{ fontSize: '0.7rem', color: '#3498db', marginLeft: '5px' }}>(Inventário)</span>}
                </span>
                
                {!atk.isDoInventario && (
                  exibindoConfirmacao ? (
                    <button className="btn-lixo-arma" onClick={() => removerAtaque(atk.id)} style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Certeza?
                    </button>
                  ) : (
                    <button className="btn-lixo-arma" onClick={() => { setArmaParaDeletar(atk.id); }} title="Remover Arma">x</button>
                  )
                )}
              </div>
              
              <div className="corpo-ataque">
                <div className="info-dano">
                  <span className="dano-texto">
                    {atk.dano} {mod + bonusMagicoVisual >= 0 ? `+ ${mod + bonusMagicoVisual}` : `- ${Math.abs(mod + bonusMagicoVisual)}`}
                  </span>
                  
                  {/* Select de Override escondido/mostrado igual antes */}
                  {!atk.isDoInventario && (
                    <select 
                      className="select-atributo-arma-magico"
                      value={atk.atributoOverride || "auto"}
                      onChange={(e) => mudarAtributoOverride(atk.id, e.target.value)}
                      title="Mudar o atributo base (Ex: Bruxo usa Carisma)"
                      style={{
                        background: atk.atributoOverride !== "auto" ? '#5c0099' : '#333', 
                        color: 'white', border: '1px solid #555', borderRadius: '4px', 
                        fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', 
                        padding: '2px 4px', cursor: 'pointer', outline: 'none'
                      }}
                    >
                      <option value="auto">Auto ({infoAtributo.chaveAuto.substring(0,3)})</option>
                      <option value="forca">FOR</option>
                      <option value="destreza">DES</option>
                      <option value="inteligencia">INT</option>
                      <option value="sabedoria">SAB</option>
                      <option value="carisma">CAR</option>
                    </select>
                  )}
                </div>

                {atk.maestria && (
                  <div className="badge-maestria" title={PROPRIEDADES_MAESTRIA?.[atk.maestria] || ""}>
                    ✨ {atk.maestria}
                  </div>
                )}
                
                {/* Se a arma puxou os bônus mágicos, avisa visualmente */}
                {bonusMagicoVisual > 0 && (
                  <div className="badge-maestria" style={{ background: '#331a00', color: '#ffcc00', borderColor: '#cc9900' }}>
                    ✦ Arma +{bonusMagicoVisual}
                  </div>
                )}
                {atk.propriedades?.includes("Mágica / Homebrew") && bonusMagicoVisual === 0 && (
                  <div className="badge-maestria" style={{ background: '#331a00', color: '#ffcc00', borderColor: '#cc9900' }}>
                    ✨ Arma Mágica
                  </div>
                )}

                <div className="botoes-rolagem" style={{marginTop:'10px'}}>
                  <button className="btn-rolar-ataque" onClick={() => rolarAtaque(atk, { modificador: mod })}>
                    🎲 Acerto <strong>{textoBonus}</strong>
                  </button>
                  <button className="btn-rolar-dano" onClick={() => dispararDanoDaAba(atk, { modificador: mod })}>
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