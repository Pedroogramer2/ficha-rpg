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
  // Se for D20, colore o crítico. Se for Dano, deixa neutro ou pode pôr um CSS vermelho!
  if (!resultado.isDano) {
    if (resultado.valorDado === 20) classeCor = "critico";
    else if (resultado.valorDado === 1) classeCor = "falha";
  } else {
    classeCor = "dano"; 
  }

  return (
    <div className="overlay-rolagem" onClick={onFechar}>
      <div className="card-rolagem" onClick={(e) => e.stopPropagation()}>
        <h3>{resultado.nome}</h3>
        
        <div className={`numero-dado ${classeCor}`}>
          {resultado.total}
        </div>

        {/* MUDANÇA: Exibe os dados de Dano diferente do D20 */}
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
    </div>
  );
}