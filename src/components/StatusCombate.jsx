// src/components/StatusCombate.jsx
import { useState, useEffect } from 'react';
import { ARMADURAS } from '../data/armaduras';
import { TALENTOS } from '../data/talentos';
import itensMagicos from '../data/itensMagicos';

export function StatusCombate(props) {
  const dados = props.dados || {};
  
  const [armaduraNome, setArmaduraNome] = useState(dados.armaduraEquipada || "");
  const [escudoCA, setEscudoCA] = useState(dados.escudoCA || 0); 
  const [bonusManual, setBonusManual] = useState(dados.bonusCA_Manual || 0);
  const [modalLevelUp, setModalLevelUp] = useState(false);  

  let bonusSpeedTalentos = 0;
  if (dados.talentos) {
    dados.talentos.forEach(t => {
      const infoTalento = Object.values(TALENTOS).find(talentoDB => talentoDB.nome === t.nome);
      if (infoTalento && infoTalento.efeitosPassivos && infoTalento.efeitosPassivos.bonusDeslocamento) {
        bonusSpeedTalentos += infoTalento.efeitosPassivos.bonusDeslocamento;
      }
    });
  }

  let bonusSpeedClasse = 0;
  const nivelPersonagem = dados.nivel || 1;
  const semArmadura = !dados.armaduraEquipada || dados.armaduraEquipada === "";
  const semEscudo = escudoCA === 0;

  if (dados.classe === "Monge" && semArmadura && semEscudo) {
    if (nivelPersonagem >= 18) bonusSpeedClasse = 30;
    else if (nivelPersonagem >= 14) bonusSpeedClasse = 25;
    else if (nivelPersonagem >= 10) bonusSpeedClasse = 20;
    else if (nivelPersonagem >= 6) bonusSpeedClasse = 15;
    else if (nivelPersonagem >= 2) bonusSpeedClasse = 10;
  }
  
  if (dados.classe === "Bárbaro" && nivelPersonagem >= 5) {
    const isArmaduraPesada = ["cota de malha", "cota de talas", "placas"].some(pesada => (dados.armaduraEquipada || "").toLowerCase().includes(pesada));
    if (!isArmaduraPesada) {
      bonusSpeedClasse = 10;
    }
  }

  const dex = dados.destreza || 10;
  const modDex = Math.floor((dex - 10) / 2);

  useEffect(() => {
    if (!dados.armaduraEquipada && dados.inventario) {
      const armaduraDoInventario = dados.inventario.find(i => i.isArmadura);
      if (armaduraDoInventario && props.aoSalvar) {
        props.aoSalvar("armaduraEquipada", armaduraDoInventario.nome);
        setArmaduraNome(armaduraDoInventario.nome);
      }
    }
  }, [dados.inventario, dados.armaduraEquipada, props.aoSalvar]);

  useEffect(() => {
    setArmaduraNome(dados.armaduraEquipada || "");
    setEscudoCA(dados.escudoCA || 0);
  }, [dados.armaduraEquipada, dados.escudoCA]);


  // 👇 O SUPER RADAR DE ITENS DA MOCHILA 👇
  let bonusCA_Itens = 0;
  let bonusSpeedItens = 0; // 👈 Puxa velocidade base
  let velocidadeVooItens = 0; // 👈 Puxa velocidade de voo
  
  if (dados.inventario) {
    const itensEmUso = dados.inventario.filter(i => i.equipado || i.sintonizado);
    const todosMagicos = Object.values(itensMagicos).flatMap(arr => arr);

    itensEmUso.forEach(itemUso => {
      const infoMagica = todosMagicos.find(im => im.nome.toLowerCase() === itemUso.nome.toLowerCase());
      if (infoMagica) {
        if (infoMagica.bonusCA) bonusCA_Itens += infoMagica.bonusCA;
        
        // Automação de Deslocamento!
        if (infoMagica.bonusDeslocamento) bonusSpeedItens += infoMagica.bonusDeslocamento;
        if (infoMagica.concedeVoo && infoMagica.concedeVoo > velocidadeVooItens) {
          velocidadeVooItens = infoMagica.concedeVoo; // Pega o maior voo possível
        }
      }
    });
  }

  // A MATEMÁTICA FINAL DA VELOCIDADE (Agora soma os itens!)
  const baseSpeed = dados.deslocamento || 30; 
  const deslocamentoFinal = baseSpeed + bonusSpeedTalentos + bonusSpeedClasse + bonusSpeedItens;
  
  useEffect(() => {
    if (props.aoSalvar && dados.deslocamentoAtualizado !== deslocamentoFinal) {
      props.aoSalvar("deslocamentoAtualizado", deslocamentoFinal);
    }
  }, [deslocamentoFinal, dados.deslocamentoAtualizado, props.aoSalvar]);

  const totalExtra = bonusManual + bonusCA_Itens;

  // --- CÁLCULO DE CA INTELIGENTE ---
  let caFinal = 0;
  let componenteArmadura = 10; 
  let componenteDex = modDex; 
  let componenteClasse = 0; 
  let labelClasse = "";

  const nomeParaBuscar = (armaduraNome || "").toLowerCase().trim();
  let armaduraObj = null;

  if (nomeParaBuscar) {
    armaduraObj = ARMADURAS.find(a => a.nome.toLowerCase() === nomeParaBuscar);
    if (!armaduraObj) {
      const armadurasOrdenadas = [...ARMADURAS].sort((a,b) => b.nome.length - a.nome.length);
      armaduraObj = armadurasOrdenadas.find(a => {
        const nomePtBr = a.nome.toLowerCase().split(' (')[0].trim();
        return nomeParaBuscar === nomePtBr || nomeParaBuscar.includes(nomePtBr) || nomePtBr.includes(nomeParaBuscar);
      });
    }
  }
  
  const valorSelectArmadura = armaduraObj ? armaduraObj.nome : "";

  if (armaduraObj) {
    componenteArmadura = armaduraObj.caBase;
    if (armaduraObj.addDex) {
      if (typeof armaduraObj.maxDex === 'number') {
        componenteDex = Math.min(modDex, armaduraObj.maxDex);
      } else {
        componenteDex = modDex;
      }
    } else {
      componenteDex = 0; 
    }
  } else {
    componenteArmadura = 10;
    componenteDex = modDex;
    
    if (dados.classe === "Monge" && escudoCA === 0) {
      const wis = dados.sabedoria || 10;
      componenteClasse = Math.floor((wis - 10) / 2);
      labelClasse = "Sab";
    } 
    else if (dados.classe === "Bárbaro") {
      const con = dados.constituicao || 10;
      componenteClasse = Math.floor((con - 10) / 2);
      labelClasse = "Con";
    }
  }

  caFinal = componenteArmadura + componenteDex + componenteClasse + escudoCA + totalExtra;

  useEffect(() => {
    if (props.aoSalvar && dados.ca !== caFinal) {
      props.aoSalvar("ca", caFinal);
    }
  }, [caFinal, props.aoSalvar, dados.ca]);

  function handleChangeArmadura(e) {
    const nova = e.target.value;
    setArmaduraNome(nova);
    if (props.aoSalvar) props.aoSalvar("armaduraEquipada", nova);
  }

  function handleChangeEscudo(e) {
    const novoValor = parseInt(e.target.value) || 0;
    setEscudoCA(novoValor);
    if (props.aoSalvar) props.aoSalvar("escudoCA", novoValor);
  }

  function rolarIniciativa() {
    if (props.aoRolar) props.aoRolar("Iniciativa", modDex);
  }

  return (
    <div className="status-combate-container">
      
      {modalLevelUp && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setModalLevelUp(false)}>
          <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #4caf50', width: '300px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.8)' }} onClick={(e) => e.stopPropagation()}>
             <h3 style={{ color: '#4caf50', marginTop: 0 }}>✨ Subir de Nível</h3>
             <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '20px' }}>Deseja ir para o Editor de Personagem e evoluir para o <strong>Nível {(dados.nivel || 1) + 1}</strong>?</p>
             <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setModalLevelUp(false)} style={{ flex: 1, padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                <button onClick={() => { setModalLevelUp(false); if(props.aoSubirNivel) props.aoSubirNivel(); }} style={{ flex: 1, padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Vamos lá!</button>
             </div>
          </div>
        </div>
      )}

      {/* BOTÃO DE LEVEL UP */}
      <div className="box-status levelup" onClick={() => setModalLevelUp(true)} title="Subir de Nível (Level Up)">
        <span className="titulo-status" style={{color: '#4caf50'}}>Nível</span>
        <div className="valor-status roravel" style={{color: '#4caf50'}}>
          {dados.nivel || 1} <span style={{fontSize: '0.8rem'}}>✨</span>
        </div>
      </div>

      {/* INICIATIVA */}
      <div className="box-status iniciativa" onClick={rolarIniciativa} title="Rolar Iniciativa">
        <span className="titulo-status">Iniciativa</span>
        <div className="valor-status roravel">
          {modDex >= 0 ? `+${modDex}` : modDex}
        </div>
      </div>

      {/* DESLOCAMENTO (AGORA COM MAGIA DE VOO E BÔNUS DE ITENS) */}
      <div className="box-status speed" style={{ position: 'relative' }}>
        {bonusSpeedItens > 0 && (
           <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#8e44ad', color: 'white', fontSize: '0.5rem', fontWeight: 'bold', padding: '2px 4px', borderRadius: '10px' }} title={`+${bonusSpeedItens} de itens mágicos`}>
             ✨ Magia
           </div>
        )}
        <span className="titulo-status">Deslocamento</span>
        <div className="valor-status">{deslocamentoFinal} <small style={{fontSize:'0.6em'}}>ft</small></div>
        {velocidadeVooItens > 0 && (
          <div style={{ color: '#3498db', fontSize: '0.65rem', fontWeight: 'bold', marginTop: '2px' }}>
            🪽 Voo {velocidadeVooItens}ft
          </div>
        )}
      </div>

      {/* CLASSE DE ARMADURA (AC) */}
      <div className="box-ac-complexo" style={{ position: 'relative' }}>
        
        {bonusCA_Itens > 0 && (
          <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ffcc00', color: 'black', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', zIndex: 10 }}>
            +{bonusCA_Itens} Mágico
          </div>
        )}

        <div className="ac-display-zao">
          <span className="escudo-icon">🛡️</span>
          <span className="valor-ac-grande">{caFinal}</span>
          <small className="label-ac">Armor Class</small>
        </div>

        <div className="controles-ac">
          <select className="select-armadura" value={valorSelectArmadura} onChange={handleChangeArmadura}>
            <option value="">Sem Armadura (Roupas)</option>
            <optgroup label="Armaduras Leves">
              {ARMADURAS.filter(a => a.tipo === "Leve").map(a => <option key={a.nome} value={a.nome}>{a.nome} (11+Des)</option>)}
            </optgroup>
            <optgroup label="Armaduras Médias">
              {ARMADURAS.filter(a => a.tipo === "Média").map(a => <option key={a.nome} value={a.nome}>{a.nome} (AC {a.caBase})</option>)}
            </optgroup>
            <optgroup label="Armaduras Pesadas">
              {ARMADURAS.filter(a => a.tipo === "Pesada").map(a => <option key={a.nome} value={a.nome}>{a.nome} (AC {a.caBase})</option>)}
            </optgroup>
          </select>

          <div style={{ display: 'flex', gap: '5px' }}>
            <select className="select-escudo" value={escudoCA} onChange={handleChangeEscudo} style={{ flex: 1 }}>
              <option value="0">Nenhum Escudo</option>
              <option value="2">🛡️ Escudo (+2)</option>
              <option value="3">✨ Escudo +1 (+3)</option>
              <option value="4">✨ Escudo +2 (+4)</option>
              <option value="5">✨ Escudo +3 (+5)</option>
            </select>

            <div className="controle-bonus-extra" title="Ajuste manual da CA pelo jogador (Temporário)">
              <button 
                onClick={() => {
                  const novoBonus = Math.max(0, bonusManual - 1);
                  setBonusManual(novoBonus);
                  if (props.aoSalvar) props.aoSalvar("bonusCA_Manual", novoBonus);
                }} 
                disabled={bonusManual <= 0}
              >-</button>
              <span>+{bonusManual} Temp</span>
              <button onClick={() => {
                  const novoBonus = bonusManual + 1;
                  setBonusManual(novoBonus);
                  if (props.aoSalvar) props.aoSalvar("bonusCA_Manual", novoBonus);
              }}>+</button>
            </div>
          </div>

          <div className="calculo-resumo">
            <span>Base {componenteArmadura}</span>
            <span style={{color: componenteDex === 0 ? '#555' : 'inherit'}}> + Des {componenteDex}</span>
            {componenteClasse !== 0 && <span style={{color: '#9b59b6'}}> + {labelClasse} {componenteClasse}</span>}
            {escudoCA > 0 && <span style={{color:'#44ff44'}}> + Esc {escudoCA}</span>}
            {bonusManual > 0 && <span style={{color:'#aaa'}}> + Tmp {bonusManual}</span>}
            {bonusCA_Itens > 0 && <span style={{color:'#ffcc00', fontWeight: 'bold'}}> + Mag {bonusCA_Itens}</span>}
          </div>
        </div>
      </div>

      <style>{`
        .status-combate-container { display: flex; gap: 10px; background: #1a1a1a; padding: 10px; border-radius: 8px; align-items: stretch; flex-wrap: wrap; }
        
        .box-status { background: #2b2b2b; padding: 5px; border-radius: 5px; text-align: center; min-width: 70px; cursor: pointer; border: 1px solid #444; display: flex; flex-direction: column; justify-content: center; transition: 0.2s; }
        .box-status:hover { border-color: #777; }
        .titulo-status { font-size: 0.65rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .valor-status { font-size: 1.5rem; font-weight: bold; color: white; line-height: 1.2; }
        .roravel { color: #ffcc00; }
        
        .box-status.levelup:hover { border-color: #4caf50; box-shadow: 0 0 10px rgba(76, 175, 80, 0.3); transform: scale(1.05); }

        .box-ac-complexo { flex: 1; display: flex; background: #222; border-radius: 6px; border: 1px solid #444; padding: 5px; align-items: center; gap: 12px; min-width: 300px;}
        .ac-display-zao { text-align: center; background: #151515; padding: 5px 12px; border-radius: 6px; border: 2px solid white; min-width: 75px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .valor-ac-grande { font-size: 2rem; font-weight: bold; color: white; line-height: 1; margin: 2px 0; }
        .escudo-icon { font-size: 0.8rem; margin-bottom: -5px; }
        .label-ac { font-size: 0.55rem; text-transform: uppercase; color: #888; font-weight: bold; }

        .controles-ac { flex: 1; display: flex; flex-direction: column; gap: 5px; justify-content: center; }
        .select-armadura, .select-escudo { background: #333; color: white; border: 1px solid #555; padding: 5px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; }
        .select-armadura:hover, .select-escudo:hover { background: #444; }

        .controle-bonus-extra { display: flex; align-items: center; justify-content: space-between; background: #333; border: 1px solid #555; border-radius: 4px; overflow: hidden; font-size: 0.75rem; color: #aaa; font-weight: bold; padding: 0; min-width: 90px; }
        .controle-bonus-extra button { background: #222; border: none; color: white; padding: 5px 8px; cursor: pointer; transition: 0.2s; }
        .controle-bonus-extra button:hover:not(:disabled) { background: #555; color: #fff; }
        .controle-bonus-extra button:disabled { opacity: 0.3; cursor: not-allowed; }

        .calculo-resumo { display: flex; gap: 8px; font-size: 0.7rem; color: #888; padding-left: 2px; }
      `}</style>
    </div>
  );
}