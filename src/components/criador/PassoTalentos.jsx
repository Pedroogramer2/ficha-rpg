// src/components/criador/PassoTalentos.jsx
import { useState, useEffect } from 'react';
import { TALENTOS } from '../../data/talentos';
import { MAGIAS } from '../../data/magias'; // 👈 IMPORTANTE: Puxando as magias!
import { useCriador } from '../../context/CriadorContext';

const MAPA_ATRIBUTOS = { forca: "Força", destreza: "Destreza", constituicao: "Constituição", inteligencia: "Inteligência", sabedoria: "Sabedoria", carisma: "Carisma" };

function avaliarRequisitos(reqTexto, dados) {
  if (!reqTexto || reqTexto.toLowerCase() === "nenhum") return true;

  const str = reqTexto.toLowerCase();
  const n = dados.nivel || 1;
  const forca = dados.atributos?.forca || dados.forca || 10;
  const des = dados.atributos?.destreza || dados.destreza || 10;
  const con = dados.atributos?.constituicao || dados.constituicao || 10;
  const intel = dados.atributos?.inteligencia || dados.inteligencia || 10;
  const sab = dados.atributos?.sabedoria || dados.sabedoria || 10;
  const car = dados.atributos?.carisma || dados.carisma || 10;

  if (str.includes("nível 4+") && n < 4) return false;
  if (str.includes("nível 8+") && n < 8) return false;
  if (str.includes("força ou destreza 13+") && forca < 13 && des < 13) return false;
  if (str.includes("inteligência ou sabedoria 13+") && intel < 13 && sab < 13) return false;
  if (str.includes("sabedoria ou carisma 13+") && sab < 13 && car < 13) return false;
  if (str.includes("força 13+") && !str.includes("ou") && forca < 13) return false;
  if (str.includes("destreza 13+") && !str.includes("ou") && des < 13) return false;
  if (str.includes("constituição 13+") && con < 13) return false;
  if (str.includes("inteligência 13+") && !str.includes("ou") && intel < 13) return false;
  if (str.includes("sabedoria 13+") && !str.includes("ou") && sab < 13) return false;
  if (str.includes("carisma 13+") && !str.includes("ou") && car < 13) return false;

  if (str.includes("armaduras leves") && ["Mago", "Feiticeiro", "Monge"].includes(dados.classe)) return false;
  if (str.includes("armaduras médias") && ["Mago", "Feiticeiro", "Monge", "Bardo", "Ladino", "Bruxo"].includes(dados.classe)) return false;
  if (str.includes("armaduras pesadas") && !["Guerreiro", "Paladino"].includes(dados.classe)) return false;

  if (str.includes("conjuração")) {
    const rascunhoString = JSON.stringify(dados || {}).toLowerCase();
    const isMistico = ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Paladino", "Patrulheiro"].includes(dados.classe);
    const isTercoConjurador = rascunhoString.includes("arcano") || rascunhoString.includes("eldritch") || rascunhoString.includes("trapaceiro");
    if (!isMistico && !isTercoConjurador) return false;
  }

  return true;
}

function ModalTalentos({ aoFechar, aoSelecionar, slotId, tipoFiltro, atual, dadosPersonagem, talentoFixoNome }) {
  const [termo, setTermo] = useState("");
  const [expandido, setExpandido] = useState(null);
  const [escolhaAttrTemp, setEscolhaAttrTemp] = useState([]);

  // 👇 Estados do Mini-Grimório do Iniciado em Magia 👇
  const [miClasse, setMiClasse] = useState("");
  const [miAttr, setMiAttr] = useState("");
  const [miTruques, setMiTruques] = useState(["", ""]);
  const [miNivel1, setMiNivel1] = useState("");

  const listaFiltrada = Object.values(TALENTOS).filter(t => {
    // Se for um slot fixo de antecedente, força exibir SÓ o talento dele!
    if (tipoFiltro === 'fixo') return talentoFixoNome && talentoFixoNome.includes(t.nome.split(" (")[0]);

    const passaTexto = t.nome.toLowerCase().includes(termo.toLowerCase());
    let passaRegra = false;
    if (tipoFiltro === 'origem') passaRegra = t.categoria === 'Origem';
    else if (tipoFiltro === 'epico') passaRegra = t.categoria === 'Épico' || t.categoria === 'Geral'; 
    else passaRegra = t.categoria === 'Geral'; 

    return passaTexto && passaRegra;
  });

  function clicarNoTalento(talento, liberado) {
    if (!liberado) return;

    const jaSelecionado = atual?.nome === talento.nome;
    if (jaSelecionado) {
      aoSelecionar(slotId, null);
      aoFechar();
      return;
    }

    const isIniciado = talento.nome.includes("Iniciado em Magia");

    if (!talento.aumentaAtributo && !isIniciado) {
      aoSelecionar(slotId, { nome: talento.nome, bonusAtributos: [] });
      aoFechar();
      return;
    }

    // Trava para não fazer nada se clicar no checkbox de um talento complexo
    // A expansão da linha cuida do resto!
  }

  function confirmarTalentoComAtributo(talento) {
    if (escolhaAttrTemp.includes("")) {
      alert("Por favor, selecione os atributos ganhos pelo talento!");
      return;
    }
    
    aoSelecionar(slotId, { 
      nome: talento.nome, 
      bonusAtributos: escolhaAttrTemp 
    });
    aoFechar();
  }

  function confirmarIniciadoMagia(talento) {
    if (!miClasse || !miAttr || !miTruques[0] || !miTruques[1] || !miNivel1) {
      alert("Por favor, selecione todas as opções mágicas do talento!");
      return;
    }
    if (miTruques[0] === miTruques[1]) {
      alert("Você deve escolher dois truques diferentes!");
      return;
    }

    aoSelecionar(slotId, {
      nome: talento.nome,
      bonusAtributos: [],
      magiasExtras: { // 👈 Salvando o pacotão mágico
        classe: miClasse,
        atributo: miAttr,
        truques: miTruques,
        nivel1: miNivel1
      }
    });
    aoFechar();
  }

  return (
    <div className="overlay-modal" style={{zIndex: 999}}>
      <div className="modal-magias">
        <div className="modal-header">
          <h3>
            {tipoFiltro === 'origem' ? "Talentos de Origem" : tipoFiltro === 'epico' ? "Dádivas Épicas" : tipoFiltro === 'fixo' ? "Configurar Origem" : "Biblioteca de Talentos"}
          </h3>
          <button className="btn-cancelar" onClick={aoFechar}>Fechar</button>
        </div>

        {tipoFiltro !== 'fixo' && (
          <div className="barra-pesquisa-modal">
            <input 
              type="text" 
              placeholder="🔍 Pesquisar talento..." 
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
        )}

        <div className="modal-lista-scroll">
          {listaFiltrada.length === 0 && <p style={{textAlign: 'center', opacity: 0.5}}>Nenhum talento encontrado para este slot.</p>}
          
          {listaFiltrada.map(talento => {
            const isSelected = atual?.nome === talento.nome || (tipoFiltro === 'fixo' && atual?.magiasExtras);
            const isExpanded = expandido === talento.nome;
            const liberado = avaliarRequisitos(talento.prerequisito, dadosPersonagem);
            
            const isIniciado = talento.nome.includes("Iniciado em Magia");

            return (
              <div key={talento.nome} className={`linha-modal ${isSelected ? 'ativo' : ''} ${!liberado ? 'bloqueado' : ''}`}>
                <div className="linha-resumo" onClick={() => {
                  if (!liberado) return;
                  const vaiExpandir = expandido !== talento.nome;
                  setExpandido(vaiExpandir ? talento.nome : null);
                  
                  if (vaiExpandir) {
                    if (talento.aumentaAtributo) setEscolhaAttrTemp(Array(talento.aumentaAtributo.qtd).fill(""));
                    
                    if (isIniciado) {
                      // Se o talento for "Iniciado em Magia (Clérigo)", tranca a classe no dropdown!
                      const matchDaClasse = talentoFixoNome?.match(/\((.*?)\)/) || talento.nome.match(/\((.*?)\)/);
                      if (matchDaClasse && ["Clérigo", "Druida", "Mago"].includes(matchDaClasse[1])) {
                        setMiClasse(matchDaClasse[1]);
                      } else {
                        setMiClasse("");
                      }
                      setMiAttr("");
                      setMiTruques(["", ""]);
                      setMiNivel1("");
                    }
                  }
                }}>
                  
                  <div className="check-area-clicavel" onClick={(e) => { 
                    e.stopPropagation(); 
                    clicarNoTalento(talento, liberado);
                  }}>
                    <div className="check-box-modal">
                      {!liberado ? "🔒" : isSelected ? "✔" : ""}
                    </div>
                  </div>

                  <div className="magia-infos-modal">
                    <span className="nome-m">{talentoFixoNome && tipoFiltro === 'fixo' ? talentoFixoNome : talento.nome}</span>
                    <span className="tags-m" style={{color: !liberado ? '#ff5555' : (talento.aumentaAtributo || isIniciado) ? '#4caf50' : '#888'}}>
                      {!liberado ? `🚫 Faltam Requisitos: ${talento.prerequisito}` : isIniciado ? `✨ Seleção de Magias` : talento.aumentaAtributo ? `⭐ Dá Bônus de Atributo` : `Pré-req: ${talento.prerequisito}`}
                    </span>
                  </div>
                  
                  <div className="seta-expandir">{isExpanded ? "▲" : "▼"}</div>
                </div>

                {isExpanded && liberado && (
                  <div className="magia-detalhe-modal">
                    <p style={{fontStyle: 'italic', marginBottom: '15px'}}>{talento.descricao}</p>
                    
                    {/* 👇 CAIXAS DE ATRIBUTO PADRÃO 👇 */}
                    {talento.aumentaAtributo && !isSelected && (
                      <div style={{background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #4caf50'}}>
                        <h4 style={{margin: '0 0 10px 0', color: '#4caf50', fontSize: '0.9rem', textTransform: 'uppercase'}}>
                          Selecione o Bônus de Atributo:
                        </h4>
                        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                          {escolhaAttrTemp.map((val, index) => (
                            <div key={index} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                              <span style={{color: '#fff', fontWeight: 'bold'}}>+{talento.aumentaAtributo.qtd === 2 && escolhaAttrTemp[0] === escolhaAttrTemp[1] && val !== "" ? "2" : "1"} em:</span>
                              <select 
                                style={{padding: '8px', background: '#111', color: '#fff', border: '1px solid #555', borderRadius: '4px', flex: 1}}
                                value={val}
                                onChange={(e) => {
                                  const novoArray = [...escolhaAttrTemp];
                                  novoArray[index] = e.target.value;
                                  setEscolhaAttrTemp(novoArray);
                                }}
                              >
                                <option value="" disabled>-- Selecione --</option>
                                {talento.aumentaAtributo.opcoes.map(opt => <option key={opt} value={opt}>{MAPA_ATRIBUTOS[opt]}</option>)}
                              </select>
                            </div>
                          ))}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); confirmarTalentoComAtributo(talento); }} style={{marginTop: '15px', width: '100%', background: '#4caf50', color: '#000', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', border: 'none'}}>
                          Confirmar Talento
                        </button>
                      </div>
                    )}

                    {/* 👇 O NOVO MINI-GRIMÓRIO DO INICIADO EM MAGIA 👇 */}
                    {isIniciado && !isSelected && (
                      <div style={{background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #9b59b6', marginTop: '10px'}}>
                         <h4 style={{margin: '0 0 15px 0', color: '#9b59b6', fontSize: '0.9rem', textTransform: 'uppercase'}}>
                           ✨ Configurar Magias do Talento
                         </h4>
                         
                         <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                           <select 
                             value={miClasse} 
                             onChange={e => { setMiClasse(e.target.value); setMiTruques(["",""]); setMiNivel1(""); }} 
                             disabled={!!(talentoFixoNome?.match(/\((.*?)\)/) || talento.nome.match(/\((.*?)\)/))} 
                             style={{flex: 1, padding: '8px', background: '#111', color: 'white', border: '1px solid #555', borderRadius:'4px', opacity: (talentoFixoNome?.match(/\((.*?)\)/) || talento.nome.match(/\((.*?)\)/)) ? 0.6 : 1}}
                           >
                             <option value="" disabled>Lista de Magia</option>
                             <option value="Clérigo">Clérigo</option>
                             <option value="Druida">Druida</option>
                             <option value="Mago">Mago</option>
                           </select>

                           <select value={miAttr} onChange={e => setMiAttr(e.target.value)} style={{flex: 1, padding: '8px', background: '#111', color: 'white', border: '1px solid #555', borderRadius:'4px'}}>
                             <option value="" disabled>Atributo Chave</option>
                             <option value="inteligencia">Inteligência</option>
                             <option value="sabedoria">Sabedoria</option>
                             <option value="carisma">Carisma</option>
                           </select>
                         </div>

                         {miClasse && (
                           <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                             <select value={miTruques[0]} onChange={e => setMiTruques([e.target.value, miTruques[1]])} style={{padding: '8px', background: '#111', color: 'white', border: '1px solid #555', borderRadius:'4px'}}>
                               <option value="">-- 1º Truque ({miClasse}) --</option>
                               {MAGIAS.filter(m => m.nivel === 0 && m.classes.includes(miClasse)).map(m => <option key={m.id} value={m.nome}>{m.nome}</option>)}
                             </select>

                             <select value={miTruques[1]} onChange={e => setMiTruques([miTruques[0], e.target.value])} style={{padding: '8px', background: '#111', color: 'white', border: '1px solid #555', borderRadius:'4px'}}>
                               <option value="">-- 2º Truque ({miClasse}) --</option>
                               {MAGIAS.filter(m => m.nivel === 0 && m.classes.includes(miClasse)).map(m => <option key={m.id} value={m.nome}>{m.nome}</option>)}
                             </select>

                             <select value={miNivel1} onChange={e => setMiNivel1(e.target.value)} style={{padding: '8px', background: '#111', color: 'white', border: '1px solid #555', borderRadius:'4px'}}>
                               <option value="">-- Magia 1º Nível ({miClasse}) --</option>
                               {MAGIAS.filter(m => m.nivel === 1 && m.classes.includes(miClasse)).map(m => <option key={m.id} value={m.nome}>{m.nome}</option>)}
                             </select>
                           </div>
                         )}

                         <button
                           onClick={(e) => { e.stopPropagation(); confirmarIniciadoMagia(talento); }}
                           style={{marginTop: '15px', width: '100%', background: '#9b59b6', color: 'white', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', border: 'none'}}
                         >
                           Confirmar Magias
                         </button>
                      </div>
                    )}

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

// --- COMPONENTE PRINCIPAL ---
export function PassoTalentos() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const [escolhas, setEscolhas] = useState(dados.escolhasTalentos || {});
  const [modalAberto, setModalAberto] = useState(false);
  const [slotAtivo, setSlotAtivo] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('geral');
  const [talentoFixoAtivo, setTalentoFixoAtivo] = useState(null);
  
  const [qtdExtras, setQtdExtras] = useState(dados.qtdTalentosExtras || 0);

  const ASI_POR_CLASSE = {
    "Guerreiro": [4, 6, 8, 12, 14, 16, 19],
    "Ladino": [4, 8, 10, 12, 16, 19],
    "Padrão": [4, 8, 12, 16, 19]
  };

  const classeAtual = dados.classe || "Padrão";
  const niveisASI = ASI_POR_CLASSE[classeAtual] || ASI_POR_CLASSE["Padrão"];
  const nivelAtual = dados.nivel || 1;

  const slotsDisponiveis = [];

  if (dados.talentoOrigem) {
    slotsDisponiveis.push({ id: 'antecedente', tipo: 'fixo', titulo: 'Do Antecedente (Fixo)', valor: dados.talentoOrigem });
  }

  if (dados.raca === "Humano") {
    slotsDisponiveis.push({ id: 'raca', tipo: 'origem', titulo: 'Da Espécie (Humano)' });
  }

  niveisASI.filter(n => n <= nivelAtual).forEach(n => {
    slotsDisponiveis.push({ id: `nivel_${n}`, tipo: n === 19 ? 'epico' : 'geral', titulo: `Do Nível ${n}` });
  });

  for (let i = 0; i < qtdExtras; i++) {
    slotsDisponiveis.push({ id: `extra_${i}`, tipo: 'geral', titulo: `✨ Dádiva / Talento Extra` });
  }

  useEffect(() => {
    const arrayTalentos = [];
    const magiasAutomacao = []; // 👈 Array para salvar as magias do talento no personagem
    
    slotsDisponiveis.forEach(slot => {
      const objTalento = slot.tipo === 'fixo' ? (escolhas[slot.id] || { nome: slot.valor }) : escolhas[slot.id];
      
      if (objTalento && objTalento.nome) {
        const infoTalento = Object.values(TALENTOS).find(t => 
          objTalento.nome.toLowerCase().includes(t.nome.toLowerCase().split(" (")[0])
        );

        arrayTalentos.push({ 
          id: `${slot.id}-${objTalento.nome}`, 
          nome: slot.tipo === 'fixo' ? slot.valor : objTalento.nome,
          bonusAtributos: objTalento.bonusAtributos || [], 
          descricao: infoTalento ? infoTalento.descricao : "Benefícios descritos no Livro do Jogador." 
        });

        // 👇 Se o talento tem magias, a gente puxa do banco de magias e injeta na ficha 👇
        if (objTalento.magiasExtras) {
          const t1 = MAGIAS.find(m => m.nome === objTalento.magiasExtras.truques[0]);
          const t2 = MAGIAS.find(m => m.nome === objTalento.magiasExtras.truques[1]);
          const n1 = MAGIAS.find(m => m.nome === objTalento.magiasExtras.nivel1);

          if (t1) magiasAutomacao.push({ ...t1, atributoCast: objTalento.magiasExtras.atributo, origem: "Talento" });
          if (t2) magiasAutomacao.push({ ...t2, atributoCast: objTalento.magiasExtras.atributo, origem: "Talento" });
          if (n1) magiasAutomacao.push({ ...n1, atributoCast: objTalento.magiasExtras.atributo, origem: "Talento", usoGratuito: true });
        }
      }
    });

    atualizar(prev => ({ 
      ...prev, 
      escolhasTalentos: escolhas, 
      talentos: arrayTalentos,
      magiasDeTalento: magiasAutomacao // 👈 SALVO NA FICHA!
    }));
  }, [escolhas, dados.talentoOrigem, dados.raca, dados.nivel, dados.classe, atualizar, qtdExtras]);

  function abrirModal(idSlot, tipoFiltro, nomeFixo = null) {
    setSlotAtivo(idSlot);
    setFiltroAtivo(tipoFiltro);
    setTalentoFixoAtivo(nomeFixo);
    setModalAberto(true);
  }

  function selecionarTalento(idSlot, dadosTalento) {
    setEscolhas(prev => {
      const novo = { ...prev };
      if (dadosTalento) novo[idSlot] = dadosTalento;
      else delete novo[idSlot]; 
      return novo;
    });
  }

  function removerSlotExtra(idSlot) {
    const indexParaRemover = parseInt(idSlot.replace('extra_', ''));
    
    setEscolhas(prev => {
      const novo = { ...prev };
      delete novo[`extra_${indexParaRemover}`];
      
      for (let i = indexParaRemover + 1; i < qtdExtras; i++) {
        if (novo[`extra_${i}`]) {
          novo[`extra_${i - 1}`] = novo[`extra_${i}`];
          delete novo[`extra_${i}`];
        }
      }
      return novo;
    });

    const novoTotal = qtdExtras - 1;
    setQtdExtras(novoTotal);
    atualizar(prev => ({ ...prev, qtdTalentosExtras: novoTotal }));
  }

  return (
    <div className="layout-criador-duplo">
      {modalAberto && (
        <ModalTalentos 
          aoFechar={() => setModalAberto(false)}
          aoSelecionar={selecionarTalento}
          slotId={slotAtivo}
          tipoFiltro={filtroAtivo}
          atual={escolhas[slotAtivo]}
          dadosPersonagem={dados} 
          talentoFixoNome={talentoFixoAtivo} // Passa o nome se for o Acólito, por exemplo
        />
      )}

      <div className="coluna-selecao">
        <h3 className="subtitulo-criador">Painel de Talentos</h3>
        <p className="desc-passo">Substitua Melhorias de Atributo por Talentos e gerencie suas origens.</p>
        
        <div className="lista-slots-talentos">
          {slotsDisponiveis.map(slot => {
            
            // 👇 LÓGICA DO CADEADO DESTRAVADO (Para o Acólito) 👇
            if (slot.tipo === 'fixo') {
              const baseTalent = Object.values(TALENTOS).find(t => slot.valor.includes(t.nome.split(' (')[0]));
              const precisaConfigurar = baseTalent && (baseTalent.aumentaAtributo || baseTalent.nome.includes('Iniciado em Magia'));
              const escolhido = escolhas[slot.id];
              const jaConfigurou = escolhido && (escolhido.bonusAtributos?.length > 0 || escolhido.magiasExtras);

              return (
                <div key={slot.id} className="box-slot-talento fixo">
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom: precisaConfigurar ? '10px' : '0'}}>
                    <h4 className="titulo-slot" style={{margin: 0}}>{slot.titulo}</h4>
                    <span style={{fontSize:'0.7rem', color:'#888'}}>🔒 Fixo</span>
                  </div>

                  {precisaConfigurar ? (
                    <div className="slot-preenchido" onClick={() => abrirModal(slot.id, 'fixo', slot.valor)} style={{borderColor: jaConfigurou ? '#4caf50' : '#ffcc00'}}>
                       <span className="nome-talento-slot" style={{color: jaConfigurou ? '#4caf50' : '#ffcc00', fontSize: '0.9rem'}}>
                         {jaConfigurou ? `✔ ${slot.valor}` : `⚠️ Configurar: ${slot.valor}`}
                       </span>
                       <button className="btn-trocar-slot">{jaConfigurou ? "Editar" : "Configurar"}</button>
                    </div>
                  ) : (
                    <div className="conteudo-slot-travado">{slot.valor}</div>
                  )}
                </div>
              );
            }

            const escolhido = escolhas[slot.id];
            const isExtra = slot.id.startsWith('extra_');
            
            return (
              <div key={slot.id} className="box-slot-talento">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h4 className="titulo-slot" style={{ margin: 0 }}>{slot.titulo}</h4>
                  {isExtra && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); removerSlotExtra(slot.id); }} 
                      style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1rem', padding: 0 }} 
                      title="Apagar este Slot Extra"
                    >
                      ✖
                    </button>
                  )}
                </div>

                {escolhido ? (
                  <div className="slot-preenchido" onClick={() => abrirModal(slot.id, slot.tipo)}>
                    <span className="nome-talento-slot">{escolhido.nome}</span>
                    <button className="btn-trocar-slot">Trocar</button>
                  </div>
                ) : (
                  <button className="btn-abrir-slot-vazio" onClick={() => abrirModal(slot.id, slot.tipo)}>
                    + Selecionar Talento
                  </button>
                )}
              </div>
            );
          })}

          {slotsDisponiveis.length === 0 && (
            <div className="box-recurso">
              <p style={{margin: 0, color: '#aaa', textAlign: 'center'}}>Nenhum talento disponível ainda.</p>
            </div>
          )}

          <button 
            className="btn-abrir-slot-vazio" 
            style={{ borderStyle: 'solid', borderColor: '#e67e22', color: '#e67e22', marginTop: '10px' }}
            onClick={() => {
              const novoValor = qtdExtras + 1;
              setQtdExtras(novoValor);
              atualizar(prev => ({ ...prev, qtdTalentosExtras: novoValor }));
            }}
          >
            🎁 Adicionar Slot Manual Extra
          </button>

        </div>
      </div>

      <div className="coluna-detalhes">
        <div className="painel-info-classe">
          <div className="cabecalho-info">
            <h2>Habilidades Adquiridas</h2>
            <span className="badge-dado-vida">{dados.talentos?.length || 0}</span>
          </div>
          
          <div className="tabela-scroll">
            {(!dados.talentos || dados.talentos.length === 0) && <p className="painel-vazio">Seus talentos aparecerão aqui.</p>}
            
            {dados.talentos && dados.talentos.map(t => (
              <div key={t.id} className="item-magia-direita">
                <div className="resumo-dir">
                  <span className="nome-dir" style={{color: t.id.includes('extra_') ? '#e67e22' : '#eee'}}>{t.nome}</span>
                  {t.bonusAtributos && t.bonusAtributos.length > 0 && (
                    <span style={{fontSize:'0.75rem', color:'#4caf50', display:'block'}}>
                      +{t.bonusAtributos.length === 2 && t.bonusAtributos[0] === t.bonusAtributos[1] ? "2" : "1"} em {MAPA_ATRIBUTOS[t.bonusAtributos[0]]}
                    </span>
                  )}
                </div>
                <div className="detalhe-dir">
                  <p>{t.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lista-slots-talentos { display: flex; flex-direction: column; gap: 15px; }
        .box-slot-talento { background: #222; border: 1px solid #444; border-radius: 8px; padding: 12px 15px; }
        .box-slot-talento.fixo { background: #1a1a1a; border-color: #333; }
        .titulo-slot { margin: 0 0 10px 0; color: #ffcc00; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .conteudo-slot-travado { color: #888; font-style: italic; font-size: 1rem; padding: 5px 0; opacity: 0.8; }
        .btn-abrir-slot-vazio { width: 100%; padding: 12px; background: transparent; border: 1px dashed #666; color: #aaa; border-radius: 6px; cursor: pointer; transition: 0.2s; font-size: 1rem; }
        .btn-abrir-slot-vazio:hover { border-color: #ffcc00; color: #ffcc00; background: rgba(255, 204, 0, 0.05); }
        .slot-preenchido { display: flex; justify-content: space-between; align-items: center; background: #333; padding: 10px 15px; border-radius: 6px; border: 1px solid #555; cursor: pointer; transition: 0.2s; }
        .slot-preenchido:hover { border-color: #fff !important; }
        .nome-talento-slot { font-weight: bold; color: #fff; font-size: 1.1rem; }
        .btn-trocar-slot { background: transparent; border: 1px solid #777; color: #ccc; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; }
        .slot-preenchido:hover .btn-trocar-slot { border-color: #ffcc00; color: #ffcc00; }
        
        .linha-modal.bloqueado { opacity: 0.4; filter: grayscale(100%); cursor: not-allowed; }
        .linha-modal.bloqueado:hover { background: #222; }
      `}</style>
    </div>
  );
}