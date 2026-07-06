// src/components/Grimorio.jsx
import { useState } from 'react';
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';
import { escalarDanoTruque } from '../regras';

// --- O MOTOR MATEMÁTICO DE UPCAST ---
function calcularDanoUpcast(danoBase, upcastInfo, niveisAcima) {
  if (!upcastInfo || niveisAcima <= 0) return danoBase;

  // PROTEÇÃO ANTI-CRASH
  if (!danoBase) {
     return `Efeito Ampliado (Upcast: ${niveisAcima}x ${upcastInfo})`;
  }

  const strBase = String(danoBase).trim();
  const strUpcast = String(upcastInfo).trim();

  // CENÁRIO 1: Adição de Dados Padrão (Ex: 8d6 e upcast 1d6)
  // 👇 AGORA O REGEX É FLEXÍVEL! Acha o dado mesmo se tiver texto junto (ex: "8d6 de Fogo") 👇
  const baseMatch = strBase.match(/(\d+)d(\d+)/i);
  const upcastMatch = strUpcast.match(/(\d+)d(\d+)/i);

  if (baseMatch && upcastMatch && baseMatch[2] === upcastMatch[2]) {
    const novaQtd = parseInt(baseMatch[1]) + (parseInt(upcastMatch[1]) * niveisAcima);
    // Substitui SÓ o dado na string original, mantendo textos ao redor vivos!
    return strBase.replace(/(\d+)d(\d+)/i, `${novaQtd}d${baseMatch[2]}`);
  }

  // CENÁRIO 2: Multiplicadores (Ex: Mísseis Mágicos "3x 1d4+1")
  const multiMatch = strBase.match(/(\d+)x\s+(.+)/i);
  const upcastMultiMatch = strUpcast.match(/(\d+)x/i);

  if (multiMatch && upcastMultiMatch) {
    const novaQtd = parseInt(multiMatch[1]) + (parseInt(upcastMultiMatch[1]) * niveisAcima);
    return strBase.replace(/(\d+)x/i, `${novaQtd}x`);
  }

  // CENÁRIO 3: Textos ou Misto
  return `${strBase} (Upcast: ${niveisAcima}x ${strUpcast})`;
}

export function Grimorio(props) {
  const [expandida, setExpandida] = useState(null);
  const dados = props.dados || {};

  const classeMinúscula = dados.classe?.toLowerCase() || '';
  let atributoMagico = 'inteligencia';

  if (['bardo', 'feiticeiro', 'bruxo', 'paladino'].includes(classeMinúscula)) {
    atributoMagico = 'carisma';
  } else if (['clérigo', 'druida', 'patrulheiro'].includes(classeMinúscula)) {
    atributoMagico = 'sabedoria';
  }

  const profBonus = Math.ceil((dados.nivel || 1) / 4) + 1;
  const valorAtributo = dados[atributoMagico] || dados.atributos?.[atributoMagico] || 10;
  const modAtributo = Math.floor((valorAtributo - 10) / 2);

  const cdMagia = 8 + profBonus + modAtributo;
  const ataqueMagico = profBonus + modAtributo;
  
  const infoClasse = CLASSES_DETALHADAS[dados.classe];
  const nivelPersonagem = dados.nivel || 1;
  const linhaNivel = infoClasse?.tabelaNiveis?.find(l => l.nivel === nivelPersonagem);
  const slotsMaximosPorNivel = linhaNivel?.slots || infoClasse?.magiasInicial?.slots || [0,0,0,0,0,0,0,0,0];

  const slotsGastosObj = dados.slotsGastos || {};

  function atualizarGastos(nivel, novoValor) {
    const limiteDoNivel = slotsMaximosPorNivel[nivel - 1] || 0;
    const gastoSeguro = Math.max(0, Math.min(novoValor, limiteDoNivel));
    const novosGastos = { ...slotsGastosObj, [nivel]: gastoSeguro };
    
    if (props.aoSalvar) {
      props.aoSalvar("slotsGastos", novosGastos);
    }
  }

  function toggleSlot(nivel, indexClicado) {
    const gastosAtuais = slotsGastosObj[nivel] || 0;
    if (indexClicado < gastosAtuais) {
      atualizarGastos(nivel, indexClicado);
    } else {
      atualizarGastos(nivel, indexClicado + 1);
    }
  }

  // --- FILTRAGEM E ORGANIZAÇÃO ---
  const todasMagiasConhecidas = [];
  
  if (dados.magiasConhecidas) {
    if (dados.magiasConhecidas.truques) {
      todasMagiasConhecidas.push(...dados.magiasConhecidas.truques.map(m => ({ ...m, nivel: 0 })));
    }
    for (let i = 1; i <= 9; i++) {
      const chaveNivel = `nivel${i}`;
      if (dados.magiasConhecidas[chaveNivel]) {
        todasMagiasConhecidas.push(...dados.magiasConhecidas[chaveNivel].map(m => ({ ...m, nivel: i })));
      }
    }
  }

  const magiasPorNivel = todasMagiasConhecidas.reduce((acc, magia) => {
    const n = magia.nivel;
    if (!acc[n]) acc[n] = [];
    acc[n].push(magia);
    return acc;
  }, {});

  function toggleDetalhes(id) { setExpandida(expandida === id ? null : id); }

  return (
    <div className="painel-grimorio">

      <div style={{ display: 'flex', gap: '15px', background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #444', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#ffcc00' }}>Conjuração: {dados.classe || 'Desconhecida'}</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa', textTransform: 'capitalize' }}>Atributo Chave: {atributoMagico}</p>
        </div>
        
        <div style={{ textAlign: 'center', background: '#333', padding: '10px 20px', borderRadius: '6px', border: '1px solid #555' }}>
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#ccc', textTransform: 'uppercase' }}>CD de Magia</span>
          <strong style={{ fontSize: '1.5rem', color: 'white' }}>{cdMagia}</strong>
        </div>

        <div style={{ textAlign: 'center', background: '#333', padding: '10px 20px', borderRadius: '6px', border: '1px solid #555' }}>
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#ccc', textTransform: 'uppercase' }}>Ataque Mágico</span>
          <strong style={{ fontSize: '1.5rem', color: 'white' }}>+{ataqueMagico}</strong>
        </div>
      </div>
      
      {/* --- NÍVEL 0 (TRUQUES) --- */}
      <div className="nivel-magia-container">
        <h4 className="titulo-nivel">Truques (Cantrips)</h4>
        <div className="grid-magias">
          {(magiasPorNivel[0] || []).map(magia => (
            <CardMagia 
              key={magia.id} 
              magia={magia} 
              nivelPersonagem={nivelPersonagem}
              expandida={expandida} 
              toggle={toggleDetalhes} 
              aoRolar={props.aoRolar}
              aoRolarDano={props.aoRolarDano}
              aoAvisar={props.aoAvisar}
            />
          ))}
          {(!magiasPorNivel[0] || magiasPorNivel[0].length === 0) && <p className="vazio-mini">Nenhum truque.</p>}
        </div>
      </div>

      {/* --- NÍVEIS 1 a 9 --- */}
      {slotsMaximosPorNivel.map((qtdSlots, indexArray) => {
        const nivelMagia = indexArray + 1;
        if (qtdSlots === 0 && (!magiasPorNivel[nivelMagia])) return null;

        const gastos = slotsGastosObj[nivelMagia] || 0;

        return (
          <div key={nivelMagia} className="nivel-magia-container">
            <div className="header-nivel-interativo">
              <h4 className="titulo-nivel" style={{margin:0, border:'none'}}>{nivelMagia}º Círculo</h4>
              <div className="slots-area">
                {qtdSlots > 0 ? (
                  Array.from({ length: qtdSlots }).map((_, i) => {
                    const isGasto = i < gastos;
                    return (
                      <div 
                        key={i} 
                        className={`slot-interativo ${isGasto ? 'gasto' : 'cheio'}`}
                        onClick={() => toggleSlot(nivelMagia, i)}
                        title={isGasto ? "Recuperar Slot" : "Gastar Slot"}
                      ></div>
                    );
                  })
                ) : (
                  <small style={{color:'#666'}}>(Sem slots)</small>
                )}
              </div>
            </div>
            <hr style={{borderColor:'#333', marginBottom:'15px'}}/>

            <div className="grid-magias">
              {(magiasPorNivel[nivelMagia] || []).map(magia => (
                <CardMagia 
                  key={magia.id} 
                  magia={magia} 
                  expandida={expandida} 
                  toggle={toggleDetalhes} 
                  aoRolar={props.aoRolar}
                  aoRolarDano={props.aoRolarDano}
                  aoAvisar={props.aoAvisar}
                  slotsMaximos={slotsMaximosPorNivel}
                  slotsGastos={slotsGastosObj}
                  aoGastarSlot={(nivelUsado) => atualizarGastos(nivelUsado, (slotsGastosObj[nivelUsado] || 0) + 1)} 
                />
              ))}
              {(!magiasPorNivel[nivelMagia] || magiasPorNivel[nivelMagia].length === 0) && (
                <p className="vazio-mini">Nenhuma magia preparada.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- CARD DE MAGIA COM ROLADOR E UPCAST ---
function CardMagia({ magia, nivelPersonagem, expandida, toggle, aoRolar, aoRolarDano, aoAvisar, aoGastarSlot, slotsMaximos = [], slotsGastos = {} }) {
  const isOpen = expandida === magia.id;
  
  // Leitura Automática de Tags
  const isRitual = magia.ritual || (magia.tempo && magia.tempo.includes("Ritual"));
  const isConcentracao = magia.concentracao || (magia.duracao && magia.duracao.includes("Concentração"));

  const [nivelUpcast, setNivelUpcast] = useState(magia.nivel);

  const slotsDisponiveisParaUpcast = [];
  if (magia.nivel > 0) {
    for (let i = magia.nivel; i <= 9; i++) {
      const maximo = slotsMaximos[i - 1] || 0;
      if (maximo > 0) {
        const gastos = slotsGastos[i] || 0;
        slotsDisponiveisParaUpcast.push({
          nivel: i,
          temSlot: gastos < maximo
        });
      }
    }
  }

  const slotAtualSelecionadoEstaVazio = magia.nivel > 0 && slotsDisponiveisParaUpcast.find(s => s.nivel === parseInt(nivelUpcast))?.temSlot === false;
  
  // 👇 A MÁGICA DA MATEMÁTICA ACONTECE AQUI 👇
  let danoExibido = magia.dano;
  const diferencaNivel = parseInt(nivelUpcast) - magia.nivel;

  if (magia.nivel === 0 && nivelPersonagem && magia.dano) {
    danoExibido = escalarDanoTruque(magia.dano, nivelPersonagem);
  } else if (magia.nivel > 0 && diferencaNivel > 0 && magia.upcast) {
    danoExibido = calcularDanoUpcast(magia.dano, magia.upcast, diferencaNivel);
  }

  // 👇 FUNÇÃO ÚNICA E CORRETA DE ROLAR 👇
  function rolarMagia(isRitual = false) {
    // Gasta o Slot
    if (!isRitual && magia.nivel > 0 && aoGastarSlot) {
       aoGastarSlot(parseInt(nivelUpcast));
    }

    // Se tem dano, manda rolar o punhado de dados!
    if (danoExibido && aoRolarDano) {
        aoRolarDano(magia.nome, String(danoExibido));
    } 
    // Se não tem dano (Magia de buff, defesa, etc), manda a mensagem comum
    else if (aoAvisar) {
        const notaUpcast = (magia.nivel > 0 && parseInt(nivelUpcast) > magia.nivel) ? ` (Upcast Nível ${nivelUpcast})` : "";
        const notaRitual = isRitual ? " (Ritual)" : "";
        aoAvisar(`Lançou ${magia.nome}!${notaUpcast}${notaRitual}`); 
    } else {
        alert(`🧙‍♂️ Conjurando ${magia.nome}!`);
    }
  }

  function getTagColor(tempo) {
    if (tempo && tempo.includes("Bônus")) return "tag-bonus";
    if (tempo && tempo.includes("Reação")) return "tag-reacao";
    return "tag-acao";
  }

  return (
    <div className={`card-magia ${isOpen ? 'aberto' : ''}`} onClick={() => toggle(magia.id)}>
      <div className="cabecalho-magia">
        <div className="magia-info-topo">
          <span className="magia-nome">{magia.nome}</span>
          {isConcentracao && <span className="tag-concentracao" title="Concentração">👁️</span>}
          {isRitual && <span className="tag-ritual" title="Ritual" style={{background:'#6a1b9a', color:'white', padding:'2px 6px', borderRadius:'4px', marginLeft:'5px', fontSize:'0.7rem', fontWeight:'bold'}}>R</span>}
        </div>
        <div className="magia-tags">
          <span className={`tag-tempo ${getTagColor(magia.tempo || "")}`}>{magia.tempo || "Ação"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="corpo-magia">
          <div className="info-grid">
            <div><strong>Alcance:</strong> {magia.alcance}</div>
            <div><strong>Comp:</strong> {magia.componentes?.join(", ")}</div>
            <div><strong>Duração:</strong> {magia.duracao}</div>
          </div>
          <p className="descricao-magia">{magia.descricao}</p>
          
          {danoExibido && (
            <div className="box-efeito dano">
              🎲 {danoExibido} {magia.tipoDano ? `(${magia.tipoDano})` : ''}
              {diferencaNivel > 0 && <small style={{marginLeft:5, color:'#ffd700'}}>(Upcast)</small>}
            </div>
          )}
          
          <div className="acoes-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {magia.nivel > 0 && slotsDisponiveisParaUpcast.length > 0 && (
                <select 
                  value={nivelUpcast} 
                  onChange={(e) => setNivelUpcast(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }}
                >
                  {slotsDisponiveisParaUpcast.map(slot => (
                    <option key={slot.nivel} value={slot.nivel}>
                      Círculo {slot.nivel} {slot.temSlot ? "" : "(Vazio)"}
                    </option>
                  ))}
                </select>
              )}
              
              <button 
                className="btn-lancar" 
                disabled={slotAtualSelecionadoEstaVazio}
                style={{ 
                  flex: 1, 
                  margin: 0,
                  opacity: slotAtualSelecionadoEstaVazio ? 0.5 : 1, 
                  cursor: slotAtualSelecionadoEstaVazio ? 'not-allowed' : 'pointer' 
                }}
                onClick={(e) => { e.stopPropagation(); rolarMagia(false); }}
              >
                {magia.nivel > 0 
                  ? (slotAtualSelecionadoEstaVazio ? "❌ Sem Slots" : "⚡ LANÇAR E GASTAR") 
                  : "⚡ Lançar"}
              </button>
            </div>

            {isRitual && (
              <button 
                onClick={(e) => { e.stopPropagation(); rolarMagia(true); }}
                style={{ 
                  width: '100%', padding: '10px', background: 'transparent', border: '1px solid #6a1b9a', 
                  color: '#e1bee7', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >
                🔮 Lançar como Ritual (10 min / Sem Gastar Slot)
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
}