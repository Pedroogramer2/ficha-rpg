// src/components/ModalDescanso.jsx
import { useState } from 'react';

export function ModalDescanso({ dados, aoFechar, aoCurar, aoGastarDado, aoFinalizar }) {
  const [rolagem, setRolagem] = useState(null);
  
  const hdTotal = dados.dadosVida?.total || dados.nivel || 1;
  const hdGastos = dados.dadosVida?.gastos || 0;
  const hdTipo = dados.dadosVida?.tipo || 8; 
  const hdDisponiveis = hdTotal - hdGastos;

  const con = dados.constituicao || 10;
  const modCon = Math.floor((con - 10) / 2);

  function rolarHitDie() {
    if (hdDisponiveis <= 0) return;

    const resultadoDado = Math.ceil(Math.random() * hdTipo);
    const totalCura = Math.max(1, resultadoDado + modCon); 

    setRolagem({ dado: resultadoDado, total: totalCura });

    aoCurar(totalCura);
    aoGastarDado(); 
  }

  return (
    <div className="overlay-modal">
      <div className="modal-descanso">
        <div className="header-descanso">
          <h3>☕ Descanso Curto</h3>
          <button className="btn-fechar-modal" onClick={aoFechar}>X</button>
        </div>

        <div className="corpo-descanso">
          <p style={{color:'#aaa', fontSize:'0.9rem', marginBottom:'15px'}}>
            Gaste seus dados de vida para se curar. Ao concluir, as habilidades de Descanso Curto serão restauradas.
          </p>
          
          <div className="status-dados">
            <span className="label-dado">Dados Restantes:</span>
            <div className="track-dados">
              {Array.from({ length: hdTotal }).map((_, i) => (
                <div 
                  key={i} 
                  className={`bolinha-hd ${i < hdDisponiveis ? 'cheia' : 'vazia'}`}
                ></div>
              ))}
            </div>
            <strong style={{marginLeft:'10px', fontSize:'1.2rem'}}>
              {hdDisponiveis} / {hdTotal} <small style={{color:'#888'}}>(d{hdTipo})</small>
            </strong>
          </div>

          <div className="area-acao-rolar" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            {hdDisponiveis > 0 ? (
              <button className="btn-rolar-hd" onClick={rolarHitDie} style={{ flex: 1 }}>
                🎲 Rolar 1d{hdTipo} + {modCon}
              </button>
            ) : (
              <p className="aviso-sem-dados" style={{ flex: 1, margin: 0, alignSelf: 'center' }}>Sem dados.</p>
            )}
          </div>

          {rolagem && (
            <div className="resultado-cura fade-in" style={{ padding: '10px', background: '#111', borderRadius: '6px', marginTop: '15px' }}>
              <div className="numero-grande-cura" style={{ fontSize: '2rem' }}>+{rolagem.total} PV</div>
              <small style={{ color: '#888' }}>Dado ({rolagem.dado}) + Con ({modCon})</small>
            </div>
          )}

          {/* NOVO BOTÃO DE CONCLUIR */}
          <button 
            onClick={aoFinalizar} 
            style={{ width: '100%', padding: '12px', background: '#333', color: '#ffcc00', border: '1px solid #555', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', transition: '0.2s' }}
            onMouseOver={(e) => e.target.style.background = '#444'}
            onMouseOut={(e) => e.target.style.background = '#333'}
          >
            ✔ Concluir Descanso
          </button>
        </div>
      </div>
    </div>
  );
}