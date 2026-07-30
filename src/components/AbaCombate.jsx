// src/components/AbaCombate.jsx
import { useState } from 'react';
import { ARMAS, PROPRIEDADES_MAESTRIA } from '../data/armas';
import itensMagicos from '../data/itensMagicos'; 

export function AbaCombate(props) {
  const [ataques, setAtaques] = useState(props.dados.ataques || []);
  
  const [armaSelecionada, setArmaSelecionada] = useState(""); 
  
  const [nomeCustom, setNomeCustom] = useState("");
  const [danoCustom, setDanoCustom] = useState("1d8");
  const [tipoCustom, setTipoCustom] = useState("Cortante");
  const [ehAcuidadeCustom, setEhAcuidadeCustom] = useState(false);

  const [armaParaDeletar, setArmaParaDeletar] = useState(null);

  const inventarioEquipado = (props.dados.inventario || []).filter(item => item.equipado && item.isArma);

  function salvarNoBanco(novaLista) {
    setAtaques(novaLista);
    if (props.aoSalvar) props.aoSalvar("ataques", novaLista);
  }

  // 👇 SISTEMA DE GASTAR USOS AGORA LÊ CLASSE E RAÇA! 👇
  function alternarUsoHabilidade(nomeHab, indice, isRacial = false) {
    if (!props.aoSalvar) return;
    
    // Descobre em qual gaveta a habilidade está morando!
    const chaveBanco = isRacial ? "tracosRaciais" : "tracosClasse";
    const listaAtual = props.dados[chaveBanco] || [];
    
    const novaLista = listaAtual.map(hab => {
      if (hab.nome === nomeHab) {
        
        let usosMax = hab.usosMax || 0;
        
        // Se for racial, a gente injeta a matemática pesada aqui no momento do clique!
        if (isRacial) {
          const nomeLower = hab.nome.toLowerCase();
          const nivelAtual = props.dados.nivel || 1;
          const profBonus = Math.ceil(nivelAtual / 4) + 1;
          
          if (nomeLower.includes("arma de sopro")) usosMax = profBonus;
          else if (nomeLower.includes("voo dracônico") && nivelAtual >= 5) usosMax = 1;
        }

        const isArray = Array.isArray(hab.usosGastos);
        const gastosAtuais = isArray ? hab.usosGastos.length : (hab.usosGastos || 0);
        const disponiveisAtuais = usosMax - gastosAtuais;

        let novosDisponiveis;
        if (indice < disponiveisAtuais) {
          novosDisponiveis = indice;
        } else {
          novosDisponiveis = indice + 1;
        }

        const novosGastos = usosMax - novosDisponiveis;
        const novosGastosSalvos = isArray ? Array(novosGastos).fill(true) : novosGastos;

        return { ...hab, usosGastos: novosGastosSalvos };
      }
      return hab;
    });
    
    props.aoSalvar(chaveBanco, novaLista);
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
    
    const usaDestreza = propsLowerCase.some(p => p.includes("munição") || p.includes("ammunition") || p.includes("distância"));
    const ehAcuidade = propsLowerCase.some(p => p.includes("acuidade") || p.includes("finesse"));

    if (usaDestreza) {
      chaveAuto = "destreza";
    } else if (ehAcuidade) {
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

  function rolarAtaque(ataque, modInfo, atributoChave) {
    if (!props.aoRolar) return;
    const nivel = props.dados.nivel || 1;
    const prof = Math.ceil(nivel / 4) + 1;
    const bonusMagico = ataque.bonusAtaque || 0;
    const modBase = modInfo.modificador + prof + bonusMagico;
    props.aoRolar(`Ataque com ${ataque.nome}`, modBase, atributoChave);
  }

  function dispararDanoDaAba(ataque, modInfo, atributoChave) {
    if (props.aoRolarDano) {
      const bonusMagico = ataque.bonusAtaque || 0;
      const modDanoCalculado = modInfo.modificador + bonusMagico;
      
      const sinalDano = modDanoCalculado >= 0 ? `+ ${modDanoCalculado}` : `- ${Math.abs(modDanoCalculado)}`;
      let stringFinalDano = `${ataque.dano} ${sinalDano}`;
      
      if (ataque.danoExtra) stringFinalDano += ` + ${ataque.danoExtra}`;
      props.aoRolarDano(ataque.nome, stringFinalDano, atributoChave);
    }
  }

  const gruposDeArmas = ARMAS.reduce((grupos, arma) => {
    const categoria = arma.categoria || "Armas Padrão";
    if (!grupos[categoria]) grupos[categoria] = [];
    grupos[categoria].push(arma);
    return grupos;
  }, {});

  const ataquesDoInventario = inventarioEquipado.map(item => {
    const infoNormal = ARMAS.find(a => {
      const nomeBanco = a.nome.toLowerCase();
      const nomeInv = item.nome.toLowerCase();
      const nomeLimpo = nomeBanco.split('(')[0].trim();
      return nomeBanco === nomeInv || nomeInv.includes(nomeLimpo) || nomeLimpo.includes(nomeInv);
    });

    const todosOsMagicos = Object.values(itensMagicos).flatMap(array => array);
    const infoMagica = todosOsMagicos.find(i => i.nome.toLowerCase() === item.nome.toLowerCase());

    const danoBase = infoMagica?.dano || infoNormal?.dano || "1d4";
    const tipoBase = infoMagica?.tipoDano || infoNormal?.tipo || "Concussão";
    const propBase = infoMagica?.propriedades || infoNormal?.propriedades || ["Arma Improvisada"];
    const maestriaBase = infoMagica?.maestria || infoNormal?.maestria || "";
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
      bonusAtaque: isMagicoAtivo ? (infoMagica.bonusAtaque || 0) : 0,
      danoExtra: isMagicoAtivo ? infoMagica.danoExtra : null
    };
  });

  const isMonge = props.dados.classe === "Monge";
  const nivelAtivo = props.dados.nivel || 1;
  let dadoDesarmado = "1"; 
  if (isMonge) {
    if (nivelAtivo >= 17) dadoDesarmado = "1d12";
    else if (nivelAtivo >= 11) dadoDesarmado = "1d10";
    else if (nivelAtivo >= 5) dadoDesarmado = "1d8";
    else dadoDesarmado = "1d6";
  }

  const ataqueDesarmado = {
    id: "fixo-desarmado",
    nome: isMonge ? "Ataque Desarmado (Artes Marciais)" : "Ataque Desarmado",
    dano: dadoDesarmado,
    tipo: "Concussão",
    propriedades: isMonge ? ["Acuidade"] : [],
    atributoOverride: isMonge ? "destreza" : "forca",
    isFixo: true
  };
  
  const todosAtaques = [ataqueDesarmado, ...ataques, ...ataquesDoInventario];

  // 👇 O SUPER SCANNER DE HABILIDADES (Agora lê Raça também!) 👇
  const tracosClasse = props.dados.tracosClasse || [];
  const tracosRaciais = props.dados.tracosRaciais || [];
  
  const raciaisParaCombate = tracosRaciais.map(traco => {
    let tipoAcao = "";
    let usosMax = 0;
    const nomeLower = (traco.nome || "").toLowerCase();
    const descLower = (traco.descricao || traco.desc || "").toLowerCase();
    const profBonus = Math.ceil(nivelAtivo / 4) + 1;

    // Acha qual o tipo de ação pela descrição ou pelo nome
    if (nomeLower.includes("arma de sopro") || descLower.includes("ação de ataque") || descLower.includes("ação:")) {
      tipoAcao = "acao";
    } else if (nomeLower.includes("voo dracônico") || descLower.includes("ação bônus")) {
      tipoAcao = "bonus";
    } else if (descLower.includes("reação")) {
      tipoAcao = "reacao";
    }

    // Calcula os Usos Matemáticos
    if (nomeLower.includes("arma de sopro")) {
      usosMax = profBonus;
    } else if (nomeLower.includes("voo dracônico") && nivelAtivo >= 5) {
      usosMax = 1;
    }

    if (tipoAcao) {
      return { ...traco, tipoAcao, usosMax, isRacial: true }; // 🧬 Ganha a Tag Racial
    }
    return null;
  }).filter(Boolean);

  // Funde as duas gavetas!
  const caracteristicas = [...tracosClasse, ...raciaisParaCombate];

  const acoesPrincipais = caracteristicas.filter(c => c.tipoAcao === "acao");
  const acoesBonus = caracteristicas.filter(c => c.tipoAcao === "bonus");
  const reacoes = caracteristicas.filter(c => c.tipoAcao === "reacao");
  const acoesLivres = caracteristicas.filter(c => c.tipoAcao === "livre");

  function formatarTexto(texto) {
    if (!texto) return "";
    const partes = texto.split(/\*\*(.*?)\*\*/g);
    return partes.map((parte, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ color: '#fff' }}>{parte}</strong>;
      }
      return parte;
    });
  }

  return (
    <div className="painel-combate">
      
      {/* SEÇÃO 1: AÇÕES PRINCIPAIS */}
      <h3 style={{ color: '#ffcc00', borderBottom: '2px solid #555', paddingBottom: '5px' }}>⚔️ Ações de Combate</h3>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
        {['🏃 Disparada (Dash)', '🛡️ Esquiva (Dodge)', '💨 Desengajar (Disengage)', '🕵️ Esconder (Hide)', '🤝 Ajudar (Help)'].map(acao => (
          <span key={acao} style={{ background: '#222', color: '#aaa', padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', border: '1px solid #444', cursor: 'help' }}>
            {acao}
          </span>
        ))}
      </div>

      <div className="add-arma-box" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="select-arma-combate"
            value={armaSelecionada}
            onChange={e => setArmaSelecionada(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">-- Equipar Nova Arma --</option>
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
            <input type="text" placeholder="Dano (Ex: 1d8)" value={danoCustom} onChange={e => setDanoCustom(e.target.value)} style={{ flex: '1 1 20%', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
            <input type="text" placeholder="Tipo" value={tipoCustom} onChange={e => setTipoCustom(e.target.value)} style={{ flex: '1 1 20%', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
            <label style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffcc00', fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px' }}>
              <input type="checkbox" checked={ehAcuidadeCustom} onChange={(e) => setEhAcuidadeCustom(e.target.checked)} />
              Possui a tag "Acuidade" (Usa Destreza se for maior)
            </label>
          </div>
        )}
      </div>

      <div className="grid-ataques">
        {todosAtaques.map((atk) => {
          const infoAtributo = calcularAtributoDoAtaque(atk);
          const mod = Math.floor((infoAtributo.valor - 10) / 2);
          const prof = Math.ceil((props.dados.nivel || 1) / 4) + 1;
          
          const bonusMagicoVisual = atk.bonusAtaque || 0;
          const bonusTotal = mod + prof + bonusMagicoVisual;
          const textoBonus = bonusTotal >= 0 ? `+${bonusTotal}` : bonusTotal;
          
          const exibindoConfirmacao = armaParaDeletar === atk.id;

          return (
            <div key={atk.id} className="card-ataque" style={{ borderLeft: atk.isDoInventario ? '3px solid #3498db' : atk.isFixo ? '3px solid #2ecc71' : 'none' }}>
              <div className="header-ataque">
                <span className="nome-arma" style={{ color: atk.isFixo ? '#2ecc71' : 'inherit' }}>
                  {atk.nome} 
                  {atk.isDoInventario && <span style={{ fontSize: '0.7rem', color: '#3498db', marginLeft: '5px' }}>(Inventário)</span>}
                </span>
                
                {!atk.isDoInventario && !atk.isFixo && (
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
                    {atk.dano === "1" ? "1" : atk.dano} {mod + bonusMagicoVisual >= 0 ? `+ ${mod + bonusMagicoVisual}` : `- ${Math.abs(mod + bonusMagicoVisual)}`}
                  </span>
                  
                  {!atk.isDoInventario && (
                    <select 
                      className="select-atributo-arma-magico"
                      value={atk.atributoOverride || "auto"}
                      onChange={(e) => mudarAtributoOverride(atk.id, e.target.value)}
                      title="Mudar o atributo base"
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
                  <button className="btn-rolar-ataque" onClick={() => rolarAtaque(atk, { modificador: mod }, infoAtributo.chaveReal)}>
                    🎲 Acerto <strong>{textoBonus}</strong>
                  </button>
                  <button className="btn-rolar-dano" onClick={() => dispararDanoDaAba(atk, { modificador: mod }, infoAtributo.chaveReal)}>
                    💥 Dano
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👇 HABILIDADES DE AÇÃO PRINCIPAL 👇 */}
      {acoesPrincipais.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ color: '#ffcc00', marginBottom: '10px', borderBottom: '1px solid #555', paddingBottom: '5px' }}>🔸 Ações Principais</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {acoesPrincipais.map(hab => (
              <div key={hab.nome} style={{ background: '#111', border: '1px solid #ffcc00', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ color: '#ffcc00', flex: 1 }}>
                    {hab.nome} {hab.isRacial && <span style={{ fontSize: '0.7rem', color: '#aaffaa', marginLeft: '5px' }}>(Raça)</span>}
                  </strong>
                  {hab.usosMax > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                      {Array.from({ length: hab.usosMax }).map((_, i) => {
                        const gastosAtuais = Array.isArray(hab.usosGastos) ? hab.usosGastos.length : (hab.usosGastos || 0);
                        const disponiveis = hab.usosMax - gastosAtuais;
                        const gasto = i >= disponiveis;
                        return (
                          <div 
                            key={i} 
                            onClick={() => alternarUsoHabilidade(hab.nome, i, hab.isRacial)}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: gasto ? 'transparent' : '#ffcc00', border: '1px solid #ffcc00', cursor: 'pointer', transition: '0.2s' }}
                            title="Clique para gastar / recuperar"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{formatarTexto(hab.descricao || hab.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👇 SEÇÃO 2: AÇÕES BÔNUS 👇 */}
      {acoesBonus.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#3498db', borderBottom: '2px solid #555', paddingBottom: '5px' }}>⚡ Ações Bônus</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {acoesBonus.map(hab => (
              <div key={hab.nome} style={{ background: '#111', border: '1px solid #3498db', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ color: '#3498db', flex: 1 }}>
                    {hab.nome} {hab.isRacial && <span style={{ fontSize: '0.7rem', color: '#aaffaa', marginLeft: '5px' }}>(Raça)</span>}
                  </strong>
                  {hab.usosMax > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                      {Array.from({ length: hab.usosMax }).map((_, i) => {
                        const gastosAtuais = Array.isArray(hab.usosGastos) ? hab.usosGastos.length : (hab.usosGastos || 0);
                        const disponiveis = hab.usosMax - gastosAtuais;
                        const gasto = i >= disponiveis;
                        return (
                          <div 
                            key={i} 
                            onClick={() => alternarUsoHabilidade(hab.nome, i, hab.isRacial)}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: gasto ? 'transparent' : '#3498db', border: '1px solid #3498db', cursor: 'pointer', transition: '0.2s' }}
                            title="Clique para gastar / recuperar"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{formatarTexto(hab.descricao || hab.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👇 SEÇÃO 3: REAÇÕES 👇 */}
      {reacoes.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#e67e22', borderBottom: '2px solid #555', paddingBottom: '5px' }}>🛡️ Reações</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {reacoes.map(hab => (
              <div key={hab.nome} style={{ background: '#111', border: '1px solid #e67e22', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ color: '#e67e22', flex: 1 }}>
                    {hab.nome} {hab.isRacial && <span style={{ fontSize: '0.7rem', color: '#aaffaa', marginLeft: '5px' }}>(Raça)</span>}
                  </strong>
                  {hab.usosMax > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                      {Array.from({ length: hab.usosMax }).map((_, i) => {
                        const gastosAtuais = Array.isArray(hab.usosGastos) ? hab.usosGastos.length : (hab.usosGastos || 0);
                        const disponiveis = hab.usosMax - gastosAtuais;
                        const gasto = i >= disponiveis;
                        return (
                          <div 
                            key={i} 
                            onClick={() => alternarUsoHabilidade(hab.nome, i, hab.isRacial)}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: gasto ? 'transparent' : '#e67e22', border: '1px solid #e67e22', cursor: 'pointer', transition: '0.2s' }}
                            title="Clique para gastar / recuperar"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{formatarTexto(hab.descricao || hab.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👇 SEÇÃO 4: AÇÕES LIVRES / GATILHOS 👇 */}
      {acoesLivres.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#2ecc71', borderBottom: '2px solid #555', paddingBottom: '5px' }}>💨 Ações Livres & Modificadores</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {acoesLivres.map(hab => (
              <div key={hab.nome} style={{ background: '#111', border: '1px dashed #2ecc71', borderRadius: '8px', padding: '12px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ color: '#2ecc71', flex: 1 }}>
                    {hab.nome} {hab.isRacial && <span style={{ fontSize: '0.7rem', color: '#aaffaa', marginLeft: '5px' }}>(Raça)</span>}
                  </strong>
                  {hab.usosMax > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                      {Array.from({ length: hab.usosMax }).map((_, i) => {
                        const gastosAtuais = Array.isArray(hab.usosGastos) ? hab.usosGastos.length : (hab.usosGastos || 0);
                        const disponiveis = hab.usosMax - gastosAtuais;
                        const gasto = i >= disponiveis;
                        return (
                          <div 
                            key={i} 
                            onClick={() => alternarUsoHabilidade(hab.nome, i, hab.isRacial)}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: gasto ? 'transparent' : '#2ecc71', border: '1px solid #2ecc71', cursor: 'pointer', transition: '0.2s' }}
                            title="Clique para gastar / recuperar"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{formatarTexto(hab.descricao || hab.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}