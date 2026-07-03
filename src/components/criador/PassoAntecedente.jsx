// src/components/criador/PassoAntecedente.jsx
import { useState, useEffect } from 'react';
import { ANTECEDENTES } from '../../data/antecedentes';
import { TALENTOS } from '../../data/talentos'; 
import { useCriador } from '../../context/CriadorContext';

// 👇 A PALAVRA "export" AQUI É OBRIGATÓRIA 👇
export function PassoAntecedente() {
  
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const [antecedenteSel, setAntecedenteSel] = useState(dados.antecedente || "");
  const [modoAtributo, setModoAtributo] = useState("padrao"); 
  const [bonusA, setBonusA] = useState(dados.bonusAtributos?.principal || "");
  const [bonusB, setBonusB] = useState(dados.bonusAtributos?.secundario || "");
  const [bonusC, setBonusC] = useState("");

  const listaAntecedentes = Object.keys(ANTECEDENTES);
  const info = ANTECEDENTES[antecedenteSel];

  useEffect(() => {
    if (antecedenteSel && info) {
      atualizar(prev => ({
        ...prev,
        antecedente: antecedenteSel,
        talentoOrigem: info.talento, 
        periciasAntecedente: info.pericias,
        bonusAtributos: {
          principal: bonusA,   
          secundario: bonusB,  
          terciario: modoAtributo === 'trio' ? bonusC : null 
        }
      }));
    }
  }, [antecedenteSel, bonusA, bonusB, bonusC, modoAtributo]);

  const nomeTalentoLimpo = info ? info.talento.split('(')[0].trim() : "";
  const talentoObj = info ? (TALENTOS[info.talento] || TALENTOS[nomeTalentoLimpo]) : null;
  const descTalento = talentoObj ? talentoObj.descricao : "Descrição não disponível no momento.";

  const isAttrDisabled = (atrSelecionado, meuSelect) => {
    if (meuSelect === 'A' && (atrSelecionado === bonusB || (modoAtributo === 'trio' && atrSelecionado === bonusC))) return true;
    if (meuSelect === 'B' && (atrSelecionado === bonusA || (modoAtributo === 'trio' && atrSelecionado === bonusC))) return true;
    if (meuSelect === 'C' && (atrSelecionado === bonusA || atrSelecionado === bonusB)) return true;
    return false;
  };

  return (
    <div className="passo-container">
      <h3>Quem você era antes da aventura?</h3>
      <p className="instrucao">O Antecedente define seus Atributos iniciais (+2 / +1), Perícias e um Talento de Origem.</p>

      <div className="layout-antecedente">
        <div className="lista-selecao-vertical">
          {listaAntecedentes.map(nome => (
            <button 
              key={nome}
              className={`item-lista ${antecedenteSel === nome ? 'ativo' : ''}`}
              onClick={() => {
                setAntecedenteSel(nome);
                setBonusA(""); setBonusB(""); setBonusC("");
                setModoAtributo("padrao");
              }}
            >
              {nome}
            </button>
          ))}
        </div>

        <div className="painel-detalhe">
          {info ? (
            <div className="info-antecedente fade-in">
              <h2>{antecedenteSel}</h2>
              
              <div className="box-recurso">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0 }}>💎 Bônus de Atributo</h4>
                  <select 
                    style={{ background: '#111', color: '#ffcc00', border: '1px solid #444', borderRadius: '4px', padding: '4px', fontSize: '0.8rem' }}
                    value={modoAtributo}
                    onChange={(e) => {
                      setModoAtributo(e.target.value);
                      setBonusA(""); setBonusB(""); setBonusC(""); 
                    }}
                  >
                    <option value="padrao">Modo (+2 / +1)</option>
                    <option value="trio">Modo (+1 / +1 / +1)</option>
                  </select>
                </div>
                
                <p style={{fontSize:'0.85rem', color:'#aaa', marginBottom:'15px'}}>
                  Este antecedente permite melhorias <strong>apenas</strong> em: {info.atributos.join(', ')}.
                </p>
                
                <div className="seletor-atributo">
                  <label><strong>{modoAtributo === 'padrao' ? '+2' : '+1'}</strong> em:</label>
                  <select value={bonusA} onChange={e => setBonusA(e.target.value)}>
                    <option value="" disabled>-- Selecione --</option>
                    {info.atributos.map(atr => (
                      <option key={atr} value={atr} disabled={isAttrDisabled(atr, 'A')}>{atr}</option>
                    ))}
                  </select>
                </div>

                <div className="seletor-atributo">
                  <label><strong>+1</strong> em:</label>
                  <select value={bonusB} onChange={e => setBonusB(e.target.value)}>
                    <option value="" disabled>-- Selecione --</option>
                    {info.atributos.map(atr => (
                      <option key={atr} value={atr} disabled={isAttrDisabled(atr, 'B')}>{atr}</option>
                    ))}
                  </select>
                </div>

                {modoAtributo === 'trio' && (
                  <div className="seletor-atributo fade-in">
                    <label><strong>+1</strong> em:</label>
                    <select value={bonusC} onChange={e => setBonusC(e.target.value)}>
                      <option value="" disabled>-- Selecione --</option>
                      {info.atributos.map(atr => (
                        <option key={atr} value={atr} disabled={isAttrDisabled(atr, 'C')}>{atr}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid-info-duplo">
                <div className="box-recurso">
                  <h4>🧠 Perícias</h4>
                  <div className="tags-container">
                    {info.pericias.map(p => <span key={p} className="tag-pericia">{p}</span>)}
                  </div>
                </div>
                <div className="box-recurso">
                  <h4>🛠️ Ferramenta</h4>
                  <p style={{fontSize: '0.9rem', color: '#ccc'}}>{info.ferramenta}</p>
                </div>
              </div>

              <div className="box-recurso destaque-talento">
                <h4>⭐ Talento: {info.talento}</h4>
                <p className="desc-talento">{descTalento}</p>
              </div>

              <div className="box-recurso">
                <h4>🎒 Equipamento Inicial</h4>
                <p style={{fontSize:'0.9rem', color:'#aaa'}}>{info.equipamento.join(", ")}.</p>
              </div>

            </div>
          ) : (
            <div className="painel-vazio">
              <p>👈 Selecione um antecedente para ver os benefícios.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .layout-antecedente { display: grid; grid-template-columns: 250px 1fr; gap: 20px; min-height: 500px; }
        .lista-selecao-vertical { display: flex; flex-direction: column; gap: 5px; overflow-y: auto; padding-right: 10px; max-height: 650px; }
        .item-lista { padding: 12px; text-align: left; background: #2a2a2a; border: 1px solid #444; color: #ccc; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
        .item-lista:hover { background: #333; }
        .item-lista.ativo { background: #ffcc00; color: #000; border-color: #ffcc00; font-weight: bold; transform: translateX(5px); }
        
        .painel-detalhe { background: #1e1e1e; border-radius: 8px; padding: 20px; overflow-y: auto; border: 1px solid #333; }
        .box-recurso { background: #2b2b2b; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #444; }
        .box-recurso h4 { margin: 0 0 10px 0; color: #ffcc00; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .seletor-atributo { margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; background: #222; padding: 8px; border-radius: 4px; }
        .seletor-atributo select { background: #111; color: white; border: 1px solid #555; padding: 5px; border-radius: 4px; width: 160px; }
        
        .grid-info-duplo { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .tag-pericia { background: #333; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; margin-right: 5px; border: 1px solid #555; display: inline-block; margin-bottom: 5px; }
        
        .destaque-talento { border-left: 4px solid #9b59b6; background: linear-gradient(90deg, #261a2b 0%, #2b2b2b 100%); }
        .destaque-talento h4 { color: #d2b4de; }
        .desc-talento { font-style: italic; color: #ddd; font-size: 0.9rem; line-height: 1.4; }

        @media (max-width: 768px) {
          .layout-antecedente { display: flex !important; flex-direction: column; height: auto; }
          .lista-selecao-vertical { flex-direction: row; overflow-x: auto; max-height: auto; padding-bottom: 10px; }
          .item-lista { white-space: nowrap; padding: 10px 15px; }
          .item-lista.ativo { transform: translateY(-3px); }
          .grid-info-duplo { grid-template-columns: 1fr; }
          .seletor-atributo { flex-direction: column; align-items: stretch; gap: 5px; }
          .seletor-atributo select { width: 100%; }
        }
      `}</style>
    </div>
  );
}