// src/components/criador/PassoAtributos.jsx
import { useEffect, useCallback } from 'react';
import { useCriador } from '../../context/CriadorContext';

const ATRIBUTOS = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];
const NOMES = { forca: "Força", destreza: "Destreza", constituicao: "Constituição", inteligencia: "Inteligência", sabedoria: "Sabedoria", carisma: "Carisma" };
const ARRAY_PADRAO = [15, 14, 13, 12, 10, 8];

export function PassoAtributos() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const getBonusAntecedente = useCallback((chaveAttr) => {
    const nomeFormatado = NOMES[chaveAttr]; 
    const bonus = dados.bonusAtributos || {};
    
    if (bonus.terciario) {
      if (bonus.principal === nomeFormatado) return 1;
      if (bonus.secundario === nomeFormatado) return 1;
      if (bonus.terciario === nomeFormatado) return 1;
      return 0;
    } 
    
    if (bonus.principal === nomeFormatado) return 2;
    if (bonus.secundario === nomeFormatado) return 1;
    return 0;
  }, [dados.bonusAtributos]);

  // 👇 SINGLE SOURCE OF TRUTH: Lendo direto da nuvem, sem useState! 👇
  const metodo = dados.metodoCriacaoAtributos || (dados.atributos && Object.keys(dados.atributos).length > 0 ? 'manual' : 'padrao');
  const rolagens = dados.dadosRoladosSalvos || [];
  const alocacoes = dados.alocacoesSalvas || {};
  
  const valoresSimples = dados.valoresSimplesSalvos || {
    forca: (dados.atributos?.forca || 10) - getBonusAntecedente('forca'),
    destreza: (dados.atributos?.destreza || 10) - getBonusAntecedente('destreza'),
    constituicao: (dados.atributos?.constituicao || 10) - getBonusAntecedente('constituicao'),
    inteligencia: (dados.atributos?.inteligencia || 10) - getBonusAntecedente('inteligencia'),
    sabedoria: (dados.atributos?.sabedoria || 10) - getBonusAntecedente('sabedoria'),
    carisma: (dados.atributos?.carisma || 10) - getBonusAntecedente('carisma')
  };

  // 👇 O MOTOR MATEMÁTICO BLINDADO 👇
  useEffect(() => {
    let resultadoFinal = {};

    if (metodo === 'manual' || metodo === 'pointbuy') {
      Object.keys(valoresSimples).forEach(k => {
        resultadoFinal[k] = valoresSimples[k] + getBonusAntecedente(k);
      });
    } else {
      const pool = metodo === 'padrao' ? ARRAY_PADRAO : rolagens;
      ATRIBUTOS.forEach(attr => {
        const index = alocacoes[attr];
        const valorBase = (index !== undefined && index !== "" && pool[index] !== undefined) ? pool[index] : 10;
        resultadoFinal[attr] = valorBase + getBonusAntecedente(attr);
      });
    }
    
    // Anti-Loop Infinito: Só manda salvar se a matemática gerar um número diferente do que já está na ficha
    const mudouAlgo = ATRIBUTOS.some(attr => dados.atributos?.[attr] !== resultadoFinal[attr]);
    
    if (mudouAlgo) {
      atualizar(prev => ({ ...prev, atributos: resultadoFinal }));
    }
  }, [valoresSimples, alocacoes, rolagens, metodo, getBonusAntecedente, atualizar, dados.atributos]);

  // --- FUNÇÕES DE INTERAÇÃO (Salvando direto no Cérebro) ---
  function setMetodo(m) {
    if (metodo !== m) {
      atualizar(prev => ({ ...prev, metodoCriacaoAtributos: m, alocacoesSalvas: {} }));
    }
  }

  function rolarTudo() {
    const novasRolagens = [];
    for (let i = 0; i < 6; i++) {
      const d = [0,0,0,0].map(() => Math.ceil(Math.random() * 6));
      d.sort((a, b) => b - a);
      novasRolagens.push(d[0] + d[1] + d[2]);
    }
    atualizar(prev => ({ ...prev, dadosRoladosSalvos: novasRolagens, alocacoesSalvas: {} }));
  }

  function alocar(atributo, indexDoArray) {
    atualizar(prev => ({ 
      ...prev, 
      alocacoesSalvas: { ...prev.alocacoesSalvas, [atributo]: indexDoArray } 
    }));
  }

  const CUSTO = { 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9 };
  function mudarPointBuy(attr, delta) {
    const val = valoresSimples[attr];
    const novo = val + delta;
    if (novo < 8 || novo > 15) return;
    
    let gasto = 0;
    Object.keys(valoresSimples).forEach(k => gasto += CUSTO[valoresSimples[k]]);
    const diferenca = CUSTO[novo] - CUSTO[val];
    if (gasto + diferenca > 27) return;

    atualizar(prev => ({ 
      ...prev, 
      valoresSimplesSalvos: { ...prev.valoresSimplesSalvos, [attr]: novo } 
    }));
  }

  function renderSeletor(attr) {
    const pool = metodo === 'padrao' ? ARRAY_PADRAO : rolagens;
    const selecionadoAqui = alocacoes[attr];

    return (
      <select 
        className="select-atributo-box"
        value={selecionadoAqui !== undefined ? selecionadoAqui : ""}
        onChange={(e) => alocar(attr, e.target.value)}
      >
        <option value="">--</option>
        {pool.map((valor, index) => {
          const jaUsado = Object.entries(alocacoes).some(([key, val]) => key !== attr && val == index);
          if (jaUsado) return null;
          return <option key={index} value={index}>{valor}</option>;
        })}
      </select>
    );
  }

  const getValorBaseDisplay = (attr) => {
    if (metodo === 'manual' || metodo === 'pointbuy') return valoresSimples[attr];
    const pool = metodo === 'padrao' ? ARRAY_PADRAO : rolagens;
    const idx = alocacoes[attr];
    return (idx !== undefined && idx !== "" && pool[idx] !== undefined) ? pool[idx] : "-";
  };

  const pontosGastos = Object.values(valoresSimples).reduce((acc, v) => acc + (CUSTO[v]||0), 0);

  return (
    <div className="passo-atributos-container">
      
      <div className="abas-metodo">
        {['padrao', 'pointbuy', 'rolagem', 'manual'].map(m => (
          <button key={m} className={metodo === m ? 'ativo' : ''} onClick={() => setMetodo(m)}>
            {m === 'padrao' ? "Padrão" : m === 'pointbuy' ? "Point Buy" : m === 'rolagem' ? "Rolagem" : "Manual"}
          </button>
        ))}
      </div>

      <div className="area-pool-info">
        {metodo === 'padrao' && <p>Atribua os valores do array padrão.</p>}
        {metodo === 'pointbuy' && (
          <div className="pb-info">Pontos: <strong style={{color: 27-pontosGastos < 0 ? 'red' : '#ffcc00'}}>{27 - pontosGastos}</strong> / 27</div>
        )}
        {metodo === 'rolagem' && (
          <div className="rolagem-box">
            {rolagens.length === 0 ? (
              <button className="btn-rolar-destaque" onClick={rolarTudo}>🎲 Rolar (4d6)</button>
            ) : (
              <div className="numeros-rolados">
                <span>Seus números:</span>
                {rolagens.map((n, i) => <div key={i} className="bolinha-numero">{n}</div>)}
                <button className="btn-reroll" onClick={rolarTudo}>Rolar Novamente</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid-atributos-cards">
        {ATRIBUTOS.map(attr => {
          const valorBase = getValorBaseDisplay(attr);
          const bonus = getBonusAntecedente(attr); 
          
          const valorTotal = valorBase !== "-" ? (valorBase + bonus) : "-";
          const mod = valorTotal !== "-" ? Math.floor((valorTotal - 10) / 2) : null;
          const modTexto = mod !== null ? (mod >= 0 ? `+${mod}` : mod) : "--";

          return (
            <div key={attr} className="card-atrib-moderno">
              <div className="header-atrib">
                {NOMES[attr]}
                {bonus > 0 && <span style={{marginLeft:'5px', color:'#00ff00', fontSize:'0.8rem'}}>+{bonus}</span>}
              </div>
              
              <div className="body-atrib">
                <div className="input-area-atrib">
                  {(metodo === 'padrao' || (metodo === 'rolagem' && rolagens.length > 0)) && renderSeletor(attr)}
                  
                  {metodo === 'pointbuy' && (
                    <div className="pb-controles">
                      <button onClick={() => mudarPointBuy(attr, -1)} disabled={valorBase<=8}>-</button>
                      <span className="valor-grande">{valorBase}</span>
                      <button onClick={() => mudarPointBuy(attr, 1)} disabled={valorBase>=15}>+</button>
                    </div>
                  )}

                  {metodo === 'manual' && (
                    <input 
                      type="number" className="input-manual-fino"
                      value={valoresSimples[attr]}
                      onChange={(e) => {
                        const novoVal = parseInt(e.target.value) || 10;
                        atualizar(prev => ({
                          ...prev,
                          valoresSimplesSalvos: { ...prev.valoresSimplesSalvos, [attr]: novoVal }
                        }));
                      }}
                    />
                  )}
                </div>

                <div className="mod-shield">
                  <span className="mod-valor">{modTexto}</span>
                  <span className="mod-label">MOD</span>
                </div>
                
                {valorTotal !== "-" && (
                  <div style={{textAlign:'center', fontSize:'0.8rem', color:'#666', marginTop:'5px'}}>
                    Total: {valorTotal}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}