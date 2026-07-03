// src/components/criador/PassoClasse.jsx
import { useState } from 'react';
import { CLASSES_DETALHADAS } from '../../data/classesDetalhado';
import { SUBCLASSES } from '../../data/subclasses';
import { INVOCACOES } from '../../data/invocacoes';
import { METAMAGIAS } from '../../data/metamagias';
import { MANOBRAS } from '../../data/manobras';
import { calcularVidaMaxima } from '../../utils/calculadoras';

// 👇 IMPORTAMOS O CÉREBRO 👇
import { useCriador } from '../../context/CriadorContext';

const IMAGENS_CLASSES = {
  "Bárbaro": "https://www.dndbeyond.com/attachments/0/679/c3barbarianintro.png",
  "Bardo": "https://www.dndbeyond.com/attachments/0/684/c3bardintro.png", 
  "Clérigo": "https://www.dndbeyond.com/attachments/0/687/c3clericintro.png",
  "Druida": "https://www.dndbeyond.com/attachments/0/693/c3druidintro.png",
  "Guerreiro": "https://www.dndbeyond.com/attachments/0/697/c3fighterintro.png",
  "Ladino": "https://www.dndbeyond.com/attachments/0/709/c3rogueintro.png",
  "Mago": "https://www.dndbeyond.com/attachments/0/717/c3wizardintro.png",
  "Monge": "https://www.dndbeyond.com/attachments/0/700/c3monkintro.png",
  "Paladino": "https://www.dndbeyond.com/attachments/0/701/c3paladinintro.png",
  "Patrulheiro": "https://www.dndbeyond.com/attachments/0/707/c3rangerintro.png",
  "Bruxo": "https://www.dndbeyond.com/attachments/0/716/c3warlockintro.png",
  "Feiticeiro": "https://www.dndbeyond.com/attachments/0/712/c3sorcererintro.png",
};

// 👇 TIRAMOS AS PROPS DAQUI 👇
export function PassoClasse() {
  
  // 👇 E PUXAMOS ELAS DA NUVEM (Batizando com os nomes antigos para não quebrar nada!) 👇
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const [confirmado, setConfirmado] = useState(false);
  const [exibirDetalhes, setExibirDetalhes] = useState(true);

  function selecionarClasse(chaveClasse) {
    const infoClasse = CLASSES_DETALHADAS[chaveClasse];
    atualizar(prev => ({
      ...prev,
      classe: chaveClasse,
      vidaMaxima: infoClasse.dadoVida, 
      vidaAtual: infoClasse.dadoVida,
      nivel: 1,
      escolhasClasse: {},
      magiasConhecidas: { truques: [], nivel1: [] } 
    }));
    setConfirmado(false);
    setExibirDetalhes(true); 
  }

  function confirmarClasse() { if (dados.classe) setConfirmado(true); }

  function alterarNivel(delta) {
    const novoNivel = Math.min(20, Math.max(1, (dados.nivel || 1) + delta));
    const vidaBase = calcularVidaMaxima(dados.classe, novoNivel, dados.atributos?.constituicao || 10);

    atualizar(prev => ({
      ...prev,
      nivel: novoNivel,
      vidaMaxima: vidaBase,
      vidaAtual: vidaBase
    }));
  }

  function setSubEscolha(titulo, valor, descricao) {
    atualizar(prev => ({
      ...prev,
      escolhasClasse: {
        ...prev.escolhasClasse,
        [titulo]: { nome: valor, desc: descricao }
      }
    }));
  }

  function getOpcoesParaEscolha(escolha, nivelAtual) {
    if (escolha.opcoes && escolha.opcoes.length > 0) return escolha.opcoes;
    switch (escolha.tipo) {
      case "invocacao": return INVOCACOES.filter(inv => inv.nivelMinimo <= nivelAtual);
      case "metamagia": return METAMAGIAS; 
      case "manobra": return MANOBRAS;
      default: return [];
    }
  }

  function getTodasEscolhas(info, nivelAtual) {
    let lista = [];
    for (let i = 1; i <= nivelAtual; i++) {
      const chave = `escolhasNivel${i}`;
      if (info[chave]) lista = [...lista, ...info[chave]];
    }
    return lista;
  }

  const getNomeHabilidade = (hab) => typeof hab === 'string' ? hab : hab.nome;
  const listaClasses = Object.keys(CLASSES_DETALHADAS);
  const classeInfo = dados.classe ? CLASSES_DETALHADAS[dados.classe] : null;

  let fundoEstilo = {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #444',
    padding: '25px',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    transition: 'all 0.3s ease-in-out',
    borderRadius: '8px'
  };

  if (!confirmado && classeInfo && IMAGENS_CLASSES[dados.classe]) {
    const imageUrl = IMAGENS_CLASSES[dados.classe];
    if (exibirDetalhes) {
      fundoEstilo.backgroundImage = `linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.9) 35%, rgba(26,26,26,1) 100%), url(${imageUrl})`;
    } else {
      fundoEstilo.backgroundImage = `url(${imageUrl})`;
    }
  } else {
    fundoEstilo.backgroundColor = '#1e1e1e';
  }

  if (!confirmado) {
    return (
      <div className="layout-criador-duplo">
        <div className="coluna-selecao">
          <h3 className="subtitulo-criador">Escolha sua Classe</h3>
          <div className="grid-cartas-classe">
            {listaClasses.map(chave => (
              <div 
                key={chave} 
                className={`carta-classe ${dados.classe === chave ? 'ativa' : ''}`}
                onClick={() => selecionarClasse(chave)}
                style={{ position: 'relative', overflow: 'hidden' }} // Força o card a segurar o nome dentro dele
              >
                <div className="carta-icone" style={{ width: '100%', height: '100%' }}>
                  {IMAGENS_CLASSES[chave] ? (
                    <img src={IMAGENS_CLASSES[chave]} alt={chave} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '4px' }} />
                  ) : (
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem'}}>{chave.charAt(0)}</span> 
                  )}
                </div>
                
                {/* 👇 O NOME FORÇADO VIA CSS INLINE (IMPOSSÍVEL DAR ERRO) 👇 */}
                <div className="carta-nome" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '25px 5px 8px 5px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize: '1.2rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textShadow: '2px 2px 4px #000',
                  boxSizing: 'border-box'
                }}>
                  {chave}
                </div>
                
                {dados.classe === chave && <div className="brilho-borda"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="coluna-detalhes">
          {classeInfo ? (
            <div className="painel-info-classe fade-in" style={fundoEstilo}>
              
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 100, 
                  color: exibirDetalhes ? '#ffcc00' : 'rgba(255,255,255,0.3)', 
                  transition: 'all 0.2s'
                }}
                onClick={() => setExibirDetalhes(prev => !prev)}
                title={exibirDetalhes ? "Esconder informações" : "Mostrar informações"}
              >
                {exibirDetalhes ? '👁️' : '🙈'}
              </div>

              <div className="info-overlay-scroll" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                opacity: exibirDetalhes ? 1 : 0, 
                visibility: exibirDetalhes ? 'visible' : 'hidden',
                transition: 'all 0.3s ease-in-out', 
                pointerEvents: exibirDetalhes ? 'all' : 'none',
                overflowY: 'auto',
                paddingRight: '10px' 
              }}>
                
                <div className="cabecalho-info" style={{ flexShrink: 0, marginTop: '10px' }}>
                  <h2 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>{classeInfo.nome}</h2>
                  <span className="badge-dado-vida" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #555' }}>
                    Dado de Vida: d{classeInfo.dadoVida}
                  </span>
                </div>
                
                <p className="descricao-longa" style={{ flexShrink: 0, textShadow: '1px 1px 2px rgba(0,0,0,0.9)', color: '#eee' }}>
                  {classeInfo.descricao}
                </p>
                
                <button 
                  className="btn-confirmar-classe" 
                  onClick={confirmarClasse}
                  style={{ flexShrink: 0, marginBottom: '20px', position: 'relative', zIndex: 10 }}
                >
                  Selecionar {classeInfo.nome}
                </button>
                
                <h4 className="titulo-tabela" style={{ flexShrink: 0 }}>Visão Geral</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '20px' }}>
                  {classeInfo.tabelaNiveis.map((nivelInfo) => (
                    <div key={nivelInfo.nivel} className="linha-tabela-classe" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}>
                      <div className="col-nivel"><span className="numero-nivel">{nivelInfo.nivel}</span></div>
                      <div className="col-recursos">
                        {nivelInfo.habilidades.map((hab, i) => (
                          <span key={i} className="tag-habilidade" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #555' }}>
                            {getNomeHabilidade(hab)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div> 
            </div>
          ) : (
            <div className="painel-vazio"><p>👈 Selecione uma classe para começar.</p></div>
          )}
        </div>
      </div>
    );
  }

  const escolhasDisponiveis = getTodasEscolhas(classeInfo, dados.nivel);

  return (
    <div className="painel-config-classe">
      <div className="barra-topo-config">
        <div className="info-classe-topo">
          <div className="icone-pequeno">{classeInfo.nome.charAt(0)}</div>
          <div>
            <h2>{classeInfo.nome}</h2>
            <span className="link-voltar" onClick={() => setConfirmado(false)}>Alterar Classe</span>
          </div>
        </div>

        <div className="controle-nivel-box">
          <label>Nível da Classe</label>
          <div className="stepper-nivel">
            <button onClick={() => alterarNivel(-1)} disabled={dados.nivel <= 1}>-</button>
            <span>{dados.nivel}</span>
            <button onClick={() => alterarNivel(1)} disabled={dados.nivel >= 20}>+</button>
          </div>
        </div>

        <div className="stats-resumo">
          <div className="stat-box"><small>Proficiência</small><strong>+{Math.ceil(dados.nivel / 4) + 1}</strong></div>
          <div className="stat-box"><small>PV Base</small><strong>{dados.vidaMaxima}</strong></div>
        </div>
      </div>

      <div className="layout-config-interno">
        <div className="coluna-escolhas-classe">
          {escolhasDisponiveis.length > 0 ? (
            <div className="box-escolhas-obrigatorias">
              <h3>⚡ Decisões Importantes</h3>
              
              {escolhasDisponiveis.map((escolha, idx) => {
                const valorAtual = dados.escolhasClasse?.[escolha.titulo]?.nome || "";
                const opcoesReais = getOpcoesParaEscolha(escolha, dados.nivel);

                return (
                  <div key={idx} className="item-escolha-classe">
                    <label>
                      {escolha.titulo} 
                      {escolha.tipo === "invocacao" && <small style={{color:'#888', marginLeft:'5px'}}>(Nível Min: {dados.nivel})</small>}
                    </label>
                    <select 
                      className="select-classe-feature"
                      value={valorAtual}
                      onChange={(e) => {
                        const op = opcoesReais.find(o => o.nome === e.target.value);
                        if (op) {
                          setSubEscolha(escolha.titulo, op.nome, op.desc);
                        }
                      }}
                    >
                      <option value="" disabled>-- Selecione --</option>
                      {opcoesReais.map(op => (
                        <option key={op.nome} value={op.nome}>
                          {op.nome} {op.custo ? `(${op.custo})` : ""}
                        </option>
                      ))}
                    </select>
                    {valorAtual && (
                      <p className="desc-escolha-feita">
                        {dados.escolhasClasse?.[escolha.titulo]?.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{color:'#666', fontStyle:'italic'}}>Nenhuma escolha para este nível.</p>
          )}
        </div>

        <div className="lista-features-ativas">
          <h3>Características Ativas</h3>
          
          {classeInfo.tabelaNiveis
            .filter(n => n.nivel <= dados.nivel)
            .reverse()
            .map(nivelInfo => {
              
              let featuresDoNivel = [...nivelInfo.habilidades];

              const nomeSubclasse = Object.values(dados.escolhasClasse || {})
                .find(val => SUBCLASSES[val.nome])?.nome;

              if (nomeSubclasse) {
                const featsSub = SUBCLASSES[nomeSubclasse]?.features[nivelInfo.nivel];
                if (featsSub) {
                  featuresDoNivel = [...featuresDoNivel, ...featsSub];
                }
              }

              return (
                <div key={nivelInfo.nivel} className="grupo-nivel-feature">
                  <div className="marcador-nivel">Nível {nivelInfo.nivel}</div>
                  <div className="lista-feats-nivel">
                    {featuresDoNivel.map((hab, i) => {
                      const isObj = typeof hab === 'object';
                      const nome = isObj ? hab.nome : hab;
                      
                      if (nome === "Recurso de Arquétipo" || 
                          nome === "Arquétipo Marcial (Subclasse)" ||
                          nome === "Domínio Divino" ||
                          nome === "Círculo Druídico" ||
                          nome === "Origem da Feitiçaria" ||
                          nome === "Tradição Monástica" ||
                          nome === "Juramento Sagrado" ||
                          nome === "Conclave de Patrulheiro" ||
                          nome === "Patrono Extraplanar" ||
                          nome === "Tradição Arcana"
                         ) return null;

                      const desc = isObj ? hab.desc : "Descrição indisponível.";
                      const usos = isObj && hab.usos ? hab.usos : null;
                      const rec = isObj && hab.recuperacao ? hab.recuperacao : null;

                      return (
                        <div key={i} className="card-feature-ativa">
                          <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h4>{nome}</h4>
                            {usos && <span className="badge-usos">{usos} / {rec === "Descanso Curto" ? "SR" : "LR"}</span>}
                          </div>
                          <p>{desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}