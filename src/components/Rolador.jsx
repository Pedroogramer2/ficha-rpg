// src/components/Rolador.jsx
import { useEffect, useState } from 'react';

export function Rolador({ resultado, onFechar }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (resultado) setVisivel(true);
    else setVisivel(false);
  }, [resultado]);

  if (!resultado || !visivel) return null;

  let classeCor = "";
  // Se for D20, colore o crítico. Se for Dano, deixa neutro.
  if (!resultado.isDano) {
    if (resultado.valorDado === 20) classeCor = "critico";
    else if (resultado.valorDado === 1) classeCor = "falha";
  } else {
    classeCor = "dano"; 
  }

  return (
    <div className="overlay-rolagem" onClick={onFechar}>
      <div className="card-rolagem" onClick={(e) => e.stopPropagation()}>
        
        {/* 👇 Bedge de Vantagem / Desvantagem 👇 */}
        {resultado.modoRolagem && resultado.modoRolagem !== 'normal' && !resultado.isDano && (
           <div style={{
             background: resultado.modoRolagem === 'vantagem' ? '#4caf50' : '#f44336',
             color: 'white', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase',
             padding: '4px 10px', borderRadius: '15px', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
             boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
           }}>
             {resultado.modoRolagem === 'vantagem' ? '⭐ Vantagem' : '💀 Desvantagem'}
           </div>
        )}

        <h3>{resultado.nome}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', margin: '20px 0' }}>
          
          {/* 👇 O DADO DESCARTADO (Só aparece se rolou com V/D) 👇 */}
          {resultado.dadoDescartado && (
            <div style={{
              fontSize: '2.5rem', fontWeight: 'bold', color: '#555', 
              textDecoration: 'line-through', textDecorationColor: '#ff4444', textDecorationThickness: '4px',
              opacity: 0.6, position: 'relative'
            }}>
              {resultado.dadoDescartado}
              <span style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: '#888', textDecoration: 'none', whiteSpace: 'nowrap' }}>Ignorado</span>
            </div>
          )}

          {/* O DADO OFICIAL (O Maior ou Menor) */}
          <div className={`numero-dado ${classeCor}`} style={{ margin: 0 }}>
            {resultado.total}
          </div>

        </div>

        {resultado.isDano ? (
          <div className="detalhes-conta">
            <span>Dados: <strong>{resultado.valorDado}</strong></span>
            <br />
            <span style={{ fontSize: '0.8rem', color: '#ffd700' }}>Fórmula: {resultado.bonus}</span>
          </div>
        ) : (
          <div className="detalhes-conta">
            <span>Dado: <strong>{resultado.valorDado}</strong></span>
            <span>+</span>
            <span>Bônus: <strong>{resultado.bonus}</strong></span>
          </div>
        )}

        <button className="btn-fechar" onClick={onFechar}>Fechar</button>
      </div>

      <style>{`
        .overlay-rolagem { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 99999; animation: fadeIn 0.2s; }
        .card-rolagem { background: #1a1a1a; padding: 40px; border-radius: 12px; border: 2px solid #5c0099; text-align: center; box-shadow: 0 0 40px rgba(92, 0, 153, 0.5); position: relative; min-width: 300px; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-rolagem h3 { margin: 0 0 10px 0; color: #fff; font-size: 1.4rem; }
        .numero-dado { font-size: 5rem; font-weight: bold; color: #ffcc00; text-shadow: 0 5px 15px rgba(255, 204, 0, 0.4); margin: 20px 0; line-height: 1; }
        .numero-dado.critico { color: #4caf50; text-shadow: 0 5px 15px rgba(76, 175, 80, 0.6); }
        .numero-dado.critico::after { content: "CRÍTICO!"; display: block; font-size: 1rem; color: #4caf50; margin-top: 5px; text-transform: uppercase; }
        .numero-dado.falha { color: #f44336; text-shadow: 0 5px 15px rgba(244, 67, 54, 0.6); }
        .numero-dado.falha::after { content: "FALHA CRÍTICA"; display: block; font-size: 1rem; color: #f44336; margin-top: 5px; text-transform: uppercase; }
        .detalhes-conta { background: #111; padding: 10px; border-radius: 6px; color: #aaa; font-size: 0.9rem; display: flex; justify-content: center; gap: 10px; align-items: center; border: 1px solid #333; margin-bottom: 25px; }
        .btn-fechar { width: 100%; padding: 12px; background: #5c0099; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
        .btn-fechar:hover { background: #7a00cc; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}