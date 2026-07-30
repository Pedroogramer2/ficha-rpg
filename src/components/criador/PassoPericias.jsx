// src/components/criador/PassoPericias.jsx
import { useState, useEffect } from 'react';
import { LISTA_PERICIAS } from '../../regras';
import { CLASSES_DETALHADAS } from '../../data/classesDetalhado';
import { ANTECEDENTES } from '../../data/antecedentes';
import { useCriador } from '../../context/CriadorContext';

export function PassoPericias() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const classeInfo = CLASSES_DETALHADAS[dados.classe];
  const bgInfo = ANTECEDENTES[dados.antecedente];

  let qtdEscolhasClasse = classeInfo?.escolhaPericias?.qtd || 2;
  if (dados.classe === "Bárbaro" && (dados.nivel || 1) >= 3) {
    qtdEscolhasClasse += 1;
  }

  const listaPermitidaClasse = classeInfo?.escolhaPericias?.lista || [];
  const periciasBG = bgInfo?.pericias || [];
  const periciaEspecie = dados.periciaRacial; 

  // 👇 AUTOMAÇÃO DOS TALENTOS 👇
  let qtdExtraTalentos = 0;
  let ganhouExpertiseTalento = false;

  if (dados.talentos) {
    dados.talentos.forEach(t => {
      if (t.nome.includes("Habilidoso")) qtdExtraTalentos += 3;
      if (t.nome.includes("Especialista em Perícia")) {
        qtdExtraTalentos += 1;
        ganhouExpertiseTalento = true;
      }
      // Aqui a gente pode adicionar Observador, Mente Aguçada no futuro!
    });
  }

  // Verifica se pode usar a 👑 (Expertise)
  const classesComExpertise = ["Ladino", "Bardo", "Patrulheiro"];
  const podeTerExpertise = classesComExpertise.includes(dados.classe) || ganhouExpertiseTalento;

  const [escolhasClasse, setEscolhasClasse] = useState([]);
  const [escolhasTalentos, setEscolhasTalentos] = useState([]); // 👈 Novo estado pros talentos!

  // --- MEMÓRIA DA CLASSE ---
  useEffect(() => {
    setEscolhasClasse(prev => {
      if (prev.length === qtdEscolhasClasse) return prev;
      
      const salvas = Object.entries(dados.periciasTreinadas || {})
        .filter(([nome]) => listaPermitidaClasse.includes(nome) && !periciasBG.includes(nome) && periciaEspecie !== nome)
        .map(([nome, status]) => ({ nome, expertise: status === "expertise" }));

      return Array(qtdEscolhasClasse).fill(null).map((_, i) => salvas[i] || { nome: "", expertise: false });
    });
  }, [qtdEscolhasClasse, listaPermitidaClasse, periciasBG, periciaEspecie]);

  // --- MEMÓRIA DOS TALENTOS ---
  useEffect(() => {
    setEscolhasTalentos(prev => {
      if (prev.length === qtdExtraTalentos) return prev;
      return Array(qtdExtraTalentos).fill(null).map((_, i) => prev[i] || { nome: "", expertise: false });
    });
  }, [qtdExtraTalentos]);

  // --- SALVAR NA NUVEM (MAPA FINAL) ---
  useEffect(() => {
    const mapaFinal = {};
    
    periciasBG.forEach(p => mapaFinal[p] = "proficiente");
    if (periciaEspecie) mapaFinal[periciaEspecie] = "proficiente";
    
    // Junta as escolhas da classe e dos talentos
    const todasEscolhas = [...escolhasClasse, ...escolhasTalentos];

    todasEscolhas.forEach(obj => { 
      if(obj.nome) {
        mapaFinal[obj.nome] = obj.expertise ? "expertise" : "proficiente";
      }
    });

    // Só atualiza se houver diferença, para não dar loop
    const jsonAntigo = JSON.stringify(dados.periciasTreinadas || {});
    const jsonNovo = JSON.stringify(mapaFinal);
    if (jsonAntigo !== jsonNovo) {
      atualizar(prev => ({ ...prev, periciasTreinadas: mapaFinal }));
    }
  }, [escolhasClasse, escolhasTalentos, periciasBG, periciaEspecie, atualizar, dados.periciasTreinadas]);

  function mudarNome(index, novoNome, origem) {
    if (origem === 'classe') {
      const novas = [...escolhasClasse];
      novas[index] = { ...novas[index], nome: novoNome };
      setEscolhasClasse(novas);
    } else {
      const novas = [...escolhasTalentos];
      novas[index] = { ...novas[index], nome: novoNome };
      setEscolhasTalentos(novas);
    }
  }

  function toggleExpertise(index, origem) {
    if (origem === 'classe') {
      const novas = [...escolhasClasse];
      novas[index] = { ...novas[index], expertise: !novas[index].expertise };
      setEscolhasClasse(novas);
    } else {
      const novas = [...escolhasTalentos];
      novas[index] = { ...novas[index], expertise: !novas[index].expertise };
      setEscolhasTalentos(novas);
    }
  }

  // Pegar as skills já selecionadas para não deixar repetir
  const todasSelecionadas = [
    ...periciasBG, 
    periciaEspecie, 
    ...escolhasClasse.map(e => e.nome), 
    ...escolhasTalentos.map(e => e.nome)
  ].filter(Boolean);

  const nivel = dados.nivel || 1;
  const profBonus = Math.ceil(nivel / 4) + 1;

  function getMod(atributo) {
    const val = dados.atributos?.[atributo] || dados[atributo] || 10;
    return Math.floor((val - 10) / 2);
  }

  return (
    <div className="layout-criador-duplo">
      
      <div className="coluna-selecao" style={{ overflowY: 'auto', maxHeight: '75vh', paddingRight: '10px' }}>
        <h3 className="subtitulo-criador">Suas Proficiências</h3>
        <p className="desc-passo" style={{marginBottom: '20px'}}>
          Suas origens e talentos definem o que você sabe fazer de melhor.
        </p>
        
        {/* ESCOLHAS DA CLASSE */}
        <div className="box-recurso" style={{ padding: '20px' }}>
          <h4 style={{ color: '#ffcc00', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
            ⚔️ Classe ({dados.classe}) - Escolha {qtdEscolhasClasse}
          </h4>
          
          <div className="corpo-opcao">
            {escolhasClasse.map((_, idx) => (
              <div key={`c-${idx}`} className="linha-select-pericia expertise-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <select 
                  value={escolhasClasse[idx]?.nome || ""}
                  onChange={(e) => mudarNome(idx, e.target.value, 'classe')}
                  style={{ flex: 1, background: '#111', color: '#fff', border: '1px solid #555', padding: '8px', borderRadius: '4px' }}
                >
                  <option value="">-- Selecione uma Perícia --</option>
                  {listaPermitidaClasse.map(pericia => {
                    const jaSelecionado = todasSelecionadas.includes(pericia) && escolhasClasse[idx]?.nome !== pericia;
                    if (jaSelecionado) return null;
                    return <option key={pericia} value={pericia}>{pericia}</option>;
                  })}
                </select>

                <button 
                  className={`btn-expertise ${escolhasClasse[idx]?.expertise ? 'ativo' : ''}`}
                  onClick={() => toggleExpertise(idx, 'classe')}
                  disabled={!escolhasClasse[idx]?.nome || !podeTerExpertise} 
                  title={podeTerExpertise ? "Ativar Especialização (Expertise)" : "Sua classe não possui Especialização"}
                  style={{ 
                    background: escolhasClasse[idx]?.expertise ? '#ffcc00' : '#222', 
                    border: '1px solid #555', borderRadius: '4px', padding: '0 12px', 
                    cursor: (!escolhasClasse[idx]?.nome || !podeTerExpertise) ? 'not-allowed' : 'pointer',
                    filter: (!escolhasClasse[idx]?.nome || !podeTerExpertise) ? 'grayscale(100%) opacity(0.3)' : 'none'
                  }}
                >
                  👑
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 👇 NOVO: ESCOLHAS DE TALENTOS (Só aparece se o cara pegou o talento!) 👇 */}
        {qtdExtraTalentos > 0 && (
          <div className="box-recurso" style={{ padding: '20px', border: '1px solid #4caf50', background: 'rgba(76, 175, 80, 0.05)' }}>
            <h4 style={{ color: '#4caf50', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
              🧩 Talentos Extras - Escolha {qtdExtraTalentos}
            </h4>
            
            <div className="corpo-opcao">
              {escolhasTalentos.map((_, idx) => (
                <div key={`t-${idx}`} className="linha-select-pericia expertise-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <select 
                    value={escolhasTalentos[idx]?.nome || ""}
                    onChange={(e) => mudarNome(idx, e.target.value, 'talento')}
                    style={{ flex: 1, background: '#111', color: '#fff', border: '1px solid #555', padding: '8px', borderRadius: '4px' }}
                  >
                    <option value="">-- Qualquer Perícia --</option>
                    {/* Talentos como Habilidoso deixam pegar QUALQUER perícia, não só as da classe! */}
                    {LISTA_PERICIAS.map(p => {
                      const jaSelecionado = todasSelecionadas.includes(p.nome) && escolhasTalentos[idx]?.nome !== p.nome;
                      if (jaSelecionado) return null;
                      return <option key={p.nome} value={p.nome}>{p.nome}</option>;
                    })}
                  </select>

                  <button 
                    className={`btn-expertise ${escolhasTalentos[idx]?.expertise ? 'ativo' : ''}`}
                    onClick={() => toggleExpertise(idx, 'talento')}
                    disabled={!escolhasTalentos[idx]?.nome || !podeTerExpertise} 
                    title={podeTerExpertise ? "Ativar Especialização (Expertise)" : "Sua classe não possui Especialização"}
                    style={{ 
                      background: escolhasTalentos[idx]?.expertise ? '#ffcc00' : '#222', 
                      border: '1px solid #555', borderRadius: '4px', padding: '0 12px', 
                      cursor: (!escolhasTalentos[idx]?.nome || !podeTerExpertise) ? 'not-allowed' : 'pointer',
                      filter: (!escolhasTalentos[idx]?.nome || !podeTerExpertise) ? 'grayscale(100%) opacity(0.3)' : 'none'
                    }}
                  >
                    👑
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="box-recurso" style={{ padding: '20px' }}>
          <h4 style={{ color: '#aaa', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
            📜 Antecedente ({dados.antecedente})
          </h4>
          <div className="tags-container">
            {periciasBG.length > 0 ? (
              periciasBG.map(p => <span key={p} className="tag-pericia" style={{ background: '#333', padding: '5px 10px', borderRadius: '4px', border: '1px solid #555', display: 'inline-block', marginRight: '8px', marginBottom: '8px' }}>✔ {p}</span>)
            ) : (
              <span style={{color: '#666'}}>Nenhuma perícia selecionada.</span>
            )}
          </div>
        </div>

        {periciaEspecie && (
          <div className="box-recurso" style={{ padding: '20px' }}>
            <h4 style={{ color: '#aaa', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
              🧬 Espécie ({dados.raca})
            </h4>
            <div className="tags-container">
              <span className="tag-pericia" style={{ background: '#333', padding: '5px 10px', borderRadius: '4px', border: '1px solid #555', display: 'inline-block' }}>
                ✔ {periciaEspecie}
              </span>
            </div>
          </div>
        )}
        
        <p style={{fontSize:'0.75rem', color:'#888', margin: '15px 0 0 0', fontStyle: 'italic'}}>
          * A coroa 👑 (Expertise) dobra sua proficiência.
        </p>

      </div>

      <div className="coluna-detalhes">
        <div className="tabela-pericias-ddb" style={{ background: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', padding: '15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="ddb-row header" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '2px solid #444', paddingBottom: '10px', marginBottom: '10px', fontWeight: 'bold', color: '#aaa', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            <span className="col-nome">Perícia</span>
            <span className="col-ab" style={{textAlign: 'center'}}>Mod</span>
            <span className="col-val" style={{textAlign: 'center'}}>Prof</span>
            <span className="col-val" style={{textAlign: 'center', color: '#ffcc00'}}>Total</span>
          </div>

          <div className="ddb-scroll-area" style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
            {LISTA_PERICIAS.map(p => {
              const mod = getMod(p.atributo);
              
              const isBG = periciasBG.includes(p.nome);
              const isEspecie = periciaEspecie === p.nome;
              
              // Verifica se a perícia foi escolhida na aba da classe ou dos talentos extras
              const itemEscolhaClasse = escolhasClasse.find(e => e.nome === p.nome);
              const itemEscolhaTalento = escolhasTalentos.find(e => e.nome === p.nome);
              const itemEscolha = itemEscolhaClasse || itemEscolhaTalento;
              
              let bonusProf = 0;
              let icone = "—";

              if (isBG || isEspecie) {
                bonusProf = profBonus;
                icone = "●";
              } else if (itemEscolha) {
                if (itemEscolha.expertise) {
                  bonusProf = profBonus * 2;
                  icone = "👑";
                } else {
                  bonusProf = profBonus;
                  icone = "●";
                }
              }

              const total = mod + bonusProf;

              return (
                <div key={p.nome} className="ddb-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid #333', alignItems: 'center' }}>
                  <span className="col-nome" style={{ fontWeight: (bonusProf > 0) ? 'bold' : 'normal', color: (bonusProf > 0) ? '#fff' : '#aaa' }}>{p.nome}</span>
                  <span className="col-val escuro" style={{ textAlign: 'center', color: '#888' }}>{mod >= 0 ? `+${mod}` : mod}</span>
                  <span className="col-val" style={{textAlign: 'center', color: bonusProf > profBonus ? '#ffcc00' : '#888'}}>
                    {icone} {bonusProf > 0 ? `+${bonusProf}` : ""}
                  </span>
                  <span className="col-val destaque" style={{ textAlign: 'center', fontWeight: 'bold', color: total >= 0 ? '#4caf50' : '#ff5555' }}>
                    {total >= 0 ? `+${total}` : total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}