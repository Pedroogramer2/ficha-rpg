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

  const qtdEscolhas = classeInfo?.escolhaPericias?.qtd || 2;
  const listaPermitida = classeInfo?.escolhaPericias?.lista || [];
  const periciasBG = bgInfo?.pericias || [];
  const periciaEspecie = dados.periciaRacial; 

  const classesComExpertise = ["Ladino", "Bardo", "Patrulheiro"];
  const podeTerExpertise = classesComExpertise.includes(dados.classe);

  const [escolhas, setEscolhas] = useState([]);

  // 👇 RETENÇÃO DE MEMÓRIA: Inicializa o array de perícias buscando o que já estava salvo 👇
  useEffect(() => {
    setEscolhas(prev => {
      if (prev.length === qtdEscolhas) return prev;
      
      // Filtra do rascunho global quais perícias vieram das escolhas livres da classe
      const salvasNaClasse = Object.entries(dados.periciasTreinadas || {})
        .filter(([nome]) => listaPermitida.includes(nome) && !periciasBG.includes(nome) && periciaEspecie !== nome)
        .map(([nome, status]) => ({ nome, expertise: status === "expertise" }));

      // Monta o array mantendo as que o usuário já tinha clicado antes
      return Array(qtdEscolhas).fill(null).map((_, i) => {
        return salvasNaClasse[i] || { nome: "", expertise: false };
      });
    });
  }, [qtdEscolhas, listaPermitida, periciasBG, periciaEspecie]); // Removido dados.periciasTreinadas daqui para evitar loops!

  useEffect(() => {
    const mapaFinal = {};
    
    periciasBG.forEach(p => mapaFinal[p] = "proficiente");
    
    if (periciaEspecie) {
      mapaFinal[periciaEspecie] = "proficiente";
    }
    
    escolhas.forEach(obj => { 
      if(obj.nome) {
        mapaFinal[obj.nome] = obj.expertise ? "expertise" : "proficiente";
      }
    });

    atualizar(prev => ({ ...prev, periciasTreinadas: mapaFinal }));
  }, [escolhas, periciasBG, periciaEspecie, atualizar]);

  function mudarNome(index, novoNome) {
    const novas = [...escolhas];
    novas[index] = { ...novas[index], nome: novoNome };
    setEscolhas(novas);
  }

  function toggleExpertise(index) {
    const novas = [...escolhas];
    novas[index] = { ...novas[index], expertise: !novas[index].expertise };
    setEscolhas(novas);
  }

  const nivel = dados.nivel || 1;
  const profBonus = Math.ceil(nivel / 4) + 1;

  function getMod(atributo) {
    const val = dados.atributos?.[atributo] || 10;
    return Math.floor((val - 10) / 2);
  }

  return (
    <div className="layout-criador-duplo">
      
      <div className="coluna-selecao">
        <h3 className="subtitulo-criador">Suas Proficiências</h3>
        <p className="desc-passo" style={{marginBottom: '20px'}}>
          Suas origens definem o que você sabe fazer de melhor.
        </p>
        
        <div className="box-recurso" style={{ padding: '20px' }}>
          <h4 style={{ color: '#ffcc00', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
            ⚔️ Classe ({dados.classe}) - Escolha {qtdEscolhas}
          </h4>
          
          <div className="corpo-opcao">
            {escolhas.map((_, idx) => (
              <div key={idx} className="linha-select-pericia expertise-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <select 
                  value={escolhas[idx]?.nome || ""}
                  onChange={(e) => mudarNome(idx, e.target.value)}
                  style={{ flex: 1, background: '#111', color: '#fff', border: '1px solid #555', padding: '8px', borderRadius: '4px' }}
                >
                  <option value="">-- Selecione uma Perícia --</option>
                  {listaPermitida.map(pericia => {
                    const jaTemNoBG = periciasBG.includes(pericia);
                    const jaTemNaEspecie = periciaEspecie === pericia;
                    const jaSelecionado = escolhas.find((e, i) => e.nome === pericia && i !== idx);
                    
                    if (jaTemNoBG || jaTemNaEspecie || jaSelecionado) return null;
                    
                    return <option key={pericia} value={pericia}>{pericia}</option>;
                  })}
                </select>

                <button 
                  className={`btn-expertise ${escolhas[idx]?.expertise ? 'ativo' : ''}`}
                  onClick={() => toggleExpertise(idx)}
                  disabled={!escolhas[idx]?.nome || !podeTerExpertise} 
                  title={podeTerExpertise ? "Ativar Especialização (Expertise)" : "Sua classe não possui Especialização"}
                  style={{ 
                    background: escolhas[idx]?.expertise ? '#ffcc00' : '#222', 
                    border: '1px solid #555', 
                    borderRadius: '4px', 
                    padding: '0 12px', 
                    cursor: (!escolhas[idx]?.nome || !podeTerExpertise) ? 'not-allowed' : 'pointer',
                    filter: (!escolhas[idx]?.nome || !podeTerExpertise) ? 'grayscale(100%) opacity(0.3)' : 'none'
                  }}
                >
                  👑
                </button>
              </div>
            ))}
            <p style={{fontSize:'0.75rem', color:'#888', margin: '5px 0 0 0', fontStyle: 'italic'}}>
              * A coroa 👑 (Expertise) dobra sua proficiência. Use apenas se sua classe possuir esta habilidade (Ex: Ladinos, Bardos).
            </p>
          </div>
        </div>

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
              const itemEscolha = escolhas.find(e => e.nome === p.nome);
              
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