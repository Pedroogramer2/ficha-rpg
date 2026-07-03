// src/components/criador/PassoMagias.jsx
import { useState, useEffect } from 'react';
import { MAGIAS } from '../../data/magias';
import { CLASSES_DETALHADAS } from '../../data/classesDetalhado';
// 👇 IMPORTAMOS O CÉREBRO 👇
import { useCriador } from '../../context/CriadorContext';

// --- MODAL SIMPLIFICADO ---
function ModalSelecao({ titulo, listaDisponivel, selecionados, maximo, aoSalvar, aoFechar }) {
  const [tempSelecionados, setTempSelecionados] = useState([...selecionados]);
  const [expandida, setExpandida] = useState(null);

  function toggle(magia) {
    if (tempSelecionados.find(m => m.id === magia.id)) {
      setTempSelecionados(prev => prev.filter(m => m.id !== magia.id));
    } else {
      setTempSelecionados(prev => [...prev, magia]);
    }
  }

  const estourou = maximo > 0 && tempSelecionados.length > maximo;
  const corContador = estourou ? '#ff5555' : '#fff';

  return (
    <div className="overlay-modal">
      <div className="modal-magias">
        <div className="modal-header">
          <h3>
            {titulo} 
            <span style={{marginLeft:'10px', color: corContador, fontSize:'0.9em'}}>
              ({tempSelecionados.length}/{maximo || '∞'})
            </span>
          </h3>
          <div className="modal-acoes">
            <button className="btn-cancelar" onClick={aoFechar}>Cancelar</button>
            <button className="btn-salvar-modal" onClick={() => aoSalvar(tempSelecionados)}>
              ✔ Confirmar
            </button>
          </div>
        </div>

        <div className="modal-lista-scroll">
          {listaDisponivel.length === 0 && <p className="aviso-vazio">Nenhuma magia disponível.</p>}
          
          {listaDisponivel.map(magia => {
            const isSelected = tempSelecionados.some(m => m.id === magia.id);
            const isExpanded = expandida === magia.id;

            return (
              <div key={magia.id} className={`linha-modal ${isSelected ? 'ativo' : ''}`}>
                <div className="linha-resumo" onClick={() => setExpandida(isExpanded ? null : magia.id)}>
                  <div className="check-area-clicavel" onClick={(e) => { e.stopPropagation(); toggle(magia); }}>
                    <div className="check-box-modal">{isSelected && "✔"}</div>
                  </div>
                  <div className="magia-infos-modal">
                    <span className="nome-m">{magia.nome}</span>
                    <div className="tags-m">
                      <span className="tag-escola">{magia.escola?.substring(0,3)}</span>
                      {magia.concentracao && <span className="tag-c" title="Concentração">C</span>}
                      {magia.ritual && <span className="tag-r" title="Ritual">R</span>}
                    </div>
                  </div>
                  <div className="seta-expandir">{isExpanded ? "▲" : "▼"}</div>
                </div>

                {isExpanded && (
                  <div className="magia-detalhe-modal">
                    <div className="grid-detalhe">
                      <span><strong>Tempo:</strong> {magia.tempoConjuracao}</span>
                      <span><strong>Alcance:</strong> {magia.alcance}</span>
                      <span><strong>Duração:</strong> {magia.duracao}</span>
                    </div>
                    <p className="desc-texto">{magia.descricao}</p>
                    {magia.dano && <p className="dano-txt">💥 {magia.dano} ({magia.tipoDano})</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 👇 TIRAMOS AS PROPS DAQUI 👇
export function PassoMagias() {
  
  // 👇 E PUXAMOS DA NUVEM AQUI 👇
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const infoClasse = CLASSES_DETALHADAS[dados.classe];

  if (!dados.classe || !infoClasse) {
    return (
      <div className="painel-vazio">
        <p>Você precisa escolher uma Classe (Passo 1) antes de selecionar magias.</p>
      </div>
    );
  }

  const nivelPersonagem = dados.nivel || 1;
  
  let attrKey = "inteligencia"; 
  if (["Bardo", "Bruxo", "Feiticeiro", "Paladino"].includes(dados.classe)) attrKey = "carisma";
  if (["Clérigo", "Druida", "Patrulheiro", "Monge"].includes(dados.classe)) attrKey = "sabedoria";
  
  const valAttr = dados.atributos?.[attrKey] || 10;
  const modAttr = Math.floor((valAttr - 10) / 2);
  const bonusProf = Math.ceil(nivelPersonagem / 4) + 1;
  
  const linhaNivel = infoClasse?.tabelaNiveis?.find(l => l.nivel === nivelPersonagem);
  const slotsDoNivel = linhaNivel?.slots || [0,0,0,0,0,0,0,0,0];
  let maxCirculo = 0;
  slotsDoNivel.forEach((qtd, i) => { if (qtd > 0) maxCirculo = i + 1; });

  const [selecao, setSelecao] = useState(dados.magiasConhecidas || { truques: [], nivel1: [] });
  const [modalAberto, setModalAberto] = useState(null); 
  const [magiaExpandidaDireita, setMagiaExpandidaDireita] = useState(null);

  useEffect(() => {
    atualizar(prev => ({ ...prev, magiasConhecidas: selecao }));
  }, [selecao]);

  useEffect(() => {
    let precisaLimpar = false;
    const novaSelecao = { ...selecao };

    Object.keys(novaSelecao).forEach(chave => {
      if (chave.startsWith('nivel')) {
        const numCirculo = parseInt(chave.replace('nivel', ''));
        if (numCirculo > maxCirculo && novaSelecao[chave].length > 0) {
          novaSelecao[chave] = []; 
          precisaLimpar = true;
        }
      }
    });

    if (precisaLimpar) {
      setSelecao(novaSelecao);
    }
  }, [maxCirculo]);

  function salvarNivel(nivelKey, lista) {
    setSelecao(prev => ({ ...prev, [nivelKey]: lista }));
    setModalAberto(null);
  }

  function getLimites() {
    const baseTruques = infoClasse.magiasInicial?.truquesConhecidos || 0;
    let extraTruques = 0;
    if (["Feiticeiro", "Bardo", "Bruxo", "Clérigo", "Druida", "Mago"].includes(dados.classe)) {
      if (nivelPersonagem >= 4) extraTruques++;
      if (nivelPersonagem >= 10) extraTruques++;
    }
    const maxTruques = baseTruques + extraTruques;

    let maxMagias = 0;
    if (dados.classe === "Mago") maxMagias = 6 + ((nivelPersonagem - 1) * 2); 
    else if (["Clérigo", "Druida"].includes(dados.classe)) maxMagias = Math.max(1, nivelPersonagem + modAttr);
    else if (dados.classe === "Paladino") maxMagias = Math.max(1, Math.floor(nivelPersonagem/2) + modAttr);
    else if (dados.classe === "Patrulheiro") maxMagias = Math.ceil(nivelPersonagem/2) + 1; 
    else maxMagias = Math.min(22, nivelPersonagem + 1); 

    return { maxTruques, maxMagias };
  }

  const limites = getLimites();

  const qtdTruques = selecao.truques?.length || 0;
  let qtdMagiasTotal = 0;
  for(let i=1; i<=9; i++) qtdMagiasTotal += (selecao[`nivel${i}`] || []).length;

  const estourouGlobal = qtdMagiasTotal > limites.maxMagias;

  const renderSeletor = (nivel) => {
    const nivelKey = nivel === 0 ? "truques" : `nivel${nivel}`;
    const lista = selecao[nivelKey] || [];
    const label = nivel === 0 ? "Truques" : `Círculo ${nivel}`;
    const qtdSlots = nivel === 0 ? 0 : slotsDoNivel[nivel - 1];

    let textoLimite = "";
    let estourouLocal = false;

    if (nivel === 0) {
      textoLimite = `${qtdTruques}/${limites.maxTruques}`;
      estourouLocal = qtdTruques > limites.maxTruques;
    } else {
      textoLimite = lista.length > 0 ? `Selecionadas: ${lista.length}` : "Nenhuma selecionada";
    }

    return (
      <div key={nivelKey} className="box-controle-magia">
        <div className="header-controle">
          <h4 style={{margin:0, fontSize:'0.9rem'}}>{label}</h4>
          
          {nivel > 0 && qtdSlots > 0 && (
             <div className="mini-slots" title={`${qtdSlots} Slots disponíveis para conjurar`}>
               {Array(qtdSlots).fill(0).map((_,i) => <div key={i} className="ponto-slot"></div>)}
             </div>
          )}
        </div>
        
        <div className="status-selecao">
          <span style={{fontSize:'0.8rem', color: estourouLocal ? '#ff5555' : '#aaa', fontWeight: estourouLocal ? 'bold' : 'normal'}}>
            {textoLimite}
          </span>
        </div>

        <button className="btn-abrir-modal" onClick={() => setModalAberto(nivelKey)}>
          {lista.length === 0 ? "Adicionar Magias" : `Alterar Magias`}
        </button>
      </div>
    );
  };

  const renderListaDireita = (nivel) => {
    const nivelKey = nivel === 0 ? "truques" : `nivel${nivel}`;
    const lista = selecao[nivelKey] || [];
    if (lista.length === 0) return null;

    return (
      <div key={nivelKey} className="grupo-magia-direita">
        <h4 className="titulo-nivel-resumo">{nivel === 0 ? "Truques" : `Círculo ${nivel}`}</h4>
        {lista.map(m => (
          <MagiaItemDireita 
            key={m.id} magia={m} 
            expandida={magiaExpandidaDireita === m.id}
            onClick={() => setMagiaExpandidaDireita(magiaExpandidaDireita === m.id ? null : m.id)}
          />
        ))}
      </div>
    );
  };

  if (maxCirculo === 0 && !infoClasse.magiasInicial) return <div className="painel-vazio">Classe sem conjuração.</div>;

  return (
    <div className="passo-magias-container">
      
      {modalAberto && (
        <ModalSelecao 
          titulo={modalAberto === "truques" ? "Truques" : `Círculo ${modalAberto.replace('nivel','')}`}
          listaDisponivel={MAGIAS.filter(m => {
            const nv = modalAberto === "truques" ? 0 : parseInt(modalAberto.replace('nivel',''));
            return m.nivel === nv && m.classes.includes(dados.classe);
          })}
          selecionados={selecao[modalAberto] || []}
          maximo={modalAberto === "truques" ? limites.maxTruques : limites.maxMagias}
          aoFechar={() => setModalAberto(null)}
          aoSalvar={(lista) => salvarNivel(modalAberto, lista)}
        />
      )}

      <div className="stats-bar-fixa">
        <div className="grupo-stat">
          <label>Atributo</label>
          <div className="valor-stat">{attrKey.substring(0,3).toUpperCase()}</div>
        </div>
        <div className="separador-stat"></div>
        <div className="grupo-stat">
          <label>CD (DC)</label>
          <div className="valor-stat destaque">{8 + bonusProf + modAttr}</div>
        </div>
        <div className="separador-stat"></div>
        <div className="grupo-stat">
          <label>Ataque</label>
          <div className="valor-stat">+{bonusProf + modAttr}</div>
        </div>
      </div>

      <div className="layout-magias-grid">
        <div className="coluna-botoes">
          <h3 className="titulo-coluna">Grimório</h3>
          
          {maxCirculo > 0 && (
            <div className="painel-limite-global" style={{ padding: '15px', background: '#111', borderBottom: '1px solid #444', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>
                Total de Magias Preparadas
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: estourouGlobal ? '#ff5555' : '#ffcc00' }}>
                {qtdMagiasTotal} / {limites.maxMagias}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px', fontStyle: 'italic' }}>
                {dados.classe === "Mago" ? (
                  `Fórmula: 6 (Iniciais) + 2 por Nível.`
                ) : ["Clérigo", "Druida", "Paladino"].includes(dados.classe) ? (
                  `Fórmula: Nível (${nivelPersonagem}) + Mod. de ${attrKey.substring(0,3).toUpperCase()} (${modAttr}).`
                ) : (
                  `Fórmula fixa baseada na tabela da classe.`
                )}
              </div>
              {estourouGlobal && <div style={{ color: '#ff5555', fontSize: '0.75rem', marginTop: '5px', fontWeight: 'bold' }}>Remova magias para igualar ao limite!</div>}
            </div>
          )}

          <div className="lista-botoes-scroll">
            {infoClasse.magiasInicial?.truquesConhecidos > 0 && renderSeletor(0)}
            {Array.from({ length: maxCirculo }).map((_, i) => renderSeletor(i + 1))}
          </div>
        </div>

        <div className="coluna-resumo">
          <h3 className="titulo-coluna">Magias Preparadas</h3>
          <div className="lista-resumo-scroll">
            {(qtdTruques === 0 && qtdMagiasTotal === 0) ? (
              <div className="msg-inicial">
                👈 Acesse seu Grimório e comece a selecionar suas magias.
              </div>
            ) : (
              <>
                {infoClasse.magiasInicial?.truquesConhecidos > 0 && renderListaDireita(0)}
                {Array.from({ length: maxCirculo }).map((_, i) => renderListaDireita(i + 1))}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .passo-magias-container { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
        
        .stats-bar-fixa { 
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-around;
          background: #1a1a1a; padding: 10px 20px; 
          border-radius: 8px; margin-bottom: 15px; border: 1px solid #444; 
        }
        .grupo-stat { text-align: center; }
        .grupo-stat label { display: block; font-size: 0.7rem; color: #888; margin-bottom: 2px; text-transform: uppercase; }
        .valor-stat { font-size: 1.1rem; font-weight: bold; color: white; }
        .valor-stat.destaque { color: #ffcc00; font-size: 1.3rem; }
        .separador-stat { width: 1px; height: 30px; background: #444; }

        .layout-magias-grid { 
          display: grid; 
          grid-template-columns: 250px 1fr; 
          gap: 20px; 
          flex: 1; 
          min-height: 0;
        }

        .coluna-botoes { 
          background: #1e1e1e; border-right: 1px solid #333; 
          display: flex; flex-direction: column;
          border-radius: 8px 0 0 8px;
          overflow: hidden;
        }
        .coluna-resumo { 
          display: flex; flex-direction: column; 
          overflow: hidden;
        }

        .titulo-coluna { 
          background: #2a2a2a; color: #ccc; font-size: 0.85rem; text-transform: uppercase; 
          padding: 10px; margin: 0; text-align: center; border-bottom: 1px solid #444;
        }

        .lista-botoes-scroll, .lista-resumo-scroll { 
          overflow-y: auto; padding: 15px; flex: 1; 
        }

        .box-controle-magia { background: #2a2a2a; padding: 10px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #333; transition: 0.2s; }
        .box-controle-magia:hover { background: #333; }
        
        .header-controle { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .mini-slots { display: flex; gap: 3px; }
        .ponto-slot { width: 6px; height: 6px; background: #ffcc00; border-radius: 50%; box-shadow: 0 0 3px #ffcc00; }
        
        .btn-abrir-modal { width: 100%; background: #444; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; margin-top: 5px; font-size: 0.8rem; }
        .btn-abrir-modal:hover { background: #ffcc00; color: black; }

        .titulo-nivel-resumo { color: #ffcc00; border-bottom: 1px solid #444; padding-bottom: 5px; margin: 15px 0 10px 0; font-size: 1rem; }
        .msg-inicial { color: #666; font-style: italic; text-align: center; margin-top: 50px; }

        .item-magia-direita { background: #252525; padding: 10px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #333; cursor: pointer; transition: 0.2s; }
        .item-magia-direita:hover { border-color: #777; transform: translateX(3px); }
        
        .resumo-dir { display: flex; justify-content: space-between; align-items: center; }
        .nome-dir { font-weight: bold; color: #eee; }
        .meta-dir { font-size: 0.75rem; color: #888; }
        .icon-conc { background: #444; color: white; padding: 1px 5px; border-radius: 3px; margin-left: 5px; font-size: 0.65rem; }

        .detalhe-dir { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #444; color: #ccc; font-size: 0.9rem; line-height: 1.5; animation: fadeIn 0.3s; }
      `}</style>
    </div>
  );
}

function MagiaItemDireita({ magia, expandida, onClick }) {
  return (
    <div className="item-magia-direita" onClick={onClick}>
      <div className="resumo-dir">
        <span className="nome-dir">{magia.nome}</span>
        <div className="meta-dir">
          {magia.componentes?.[0]} 
          {magia.concentracao && <span className="icon-conc">C</span>}
        </div>
      </div>
      {expandida && (
        <div className="detalhe-dir">
          <div style={{marginBottom:'5px', color:'#ffcc00', fontSize:'0.8rem', textTransform:'uppercase'}}>
            {magia.escola} • {magia.tempoConjuracao} • {magia.alcance}
          </div>
          <p>{magia.descricao}</p>
        {magia.upcast && (
             <div style={{ marginTop: '8px', padding: '6px', background: '#1a1a1a', borderLeft: '3px solid #66b2ff', borderRadius: '0 4px 4px 0' }}>
               <span style={{ color: '#66b2ff', fontSize: '0.85rem', fontWeight: 'bold' }}>🔼 EM NÍVEIS SUPERIORES: </span>
               <span style={{ color: '#ccc', fontSize: '0.85rem' }}>{magia.upcast}</span>
             </div>
          )}
        </div>
      )}
    </div>
  );
}