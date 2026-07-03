// src/components/BarraVida.jsx
import { useState } from 'react';
import { ModalDescanso } from './ModalDescanso';

export function BarraVida(props) {
  const [valorInput, setValorInput] = useState("");
  const [mostrarDescanso, setMostrarDescanso] = useState(false);
  
  const [toast, setToast] = useState(null);
  const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);

  const vidaAt = props.vidaAtual ?? props.vidaMaxima;
  const vidaT = props.vidaTemp || 0;

  const deathSaves = props.dados?.deathSaves || { sucessos: 0, falhas: 0 };

  function exibirToast(mensagem) {
    setToast(mensagem);
    setTimeout(() => setToast(null), 3500); 
  }

  function salvar(novaVida, novaTemp) {
    if (props.aoSalvar) {
      props.aoSalvar("vidaAtual", novaVida);
      props.aoSalvar("vidaTemp", novaTemp);
      if (novaVida > 0 && (deathSaves.sucessos > 0 || deathSaves.falhas > 0)) {
        props.aoSalvar("deathSaves", { sucessos: 0, falhas: 0 });
      }
    }
    setValorInput(""); 
  }

  function aplicarDano() {
    const dano = parseInt(valorInput) || 0;
    if (dano <= 0) return;

    let danoRestante = dano;
    let novaTemp = vidaT;
    let novaVida = vidaAt;

    if (novaTemp > 0) {
      if (danoRestante >= novaTemp) { 
        danoRestante -= novaTemp; 
        novaTemp = 0; 
      } else { 
        novaTemp -= danoRestante; 
        danoRestante = 0; 
      }
    }
    
    if (danoRestante > 0) {
      novaVida = Math.max(0, vidaAt - danoRestante);
    }
    
    salvar(novaVida, novaTemp);
    
    if (novaVida === 0 && danoRestante >= props.vidaMaxima) {
      exibirToast(`💀 DANO MASSIVO! Morte Instantânea!`);
    } else {
      exibirToast(`💥 Sofreu ${dano} de dano!`);
    }
  }

  function aplicarCura() {
    const cura = parseInt(valorInput) || 0;
    if (cura <= 0) return;
    const novaVida = Math.min(props.vidaMaxima, vidaAt + cura);
    salvar(novaVida, vidaT);
    exibirToast(`💚 Curou +${cura} PV!`);
  }

  function alterarVidaManual(e) {
    const valor = parseInt(e.target.value) || 0;
    const novaVida = Math.min(props.vidaMaxima, Math.max(0, valor));
    if (props.aoSalvar) props.aoSalvar("vidaAtual", novaVida);
    if (novaVida > 0 && props.aoSalvar) props.aoSalvar("deathSaves", { sucessos: 0, falhas: 0 });
  }

  function alterarTempManual(e) {
    const valor = parseInt(e.target.value) || 0;
    const novaTemp = Math.max(0, valor);
    if (props.aoSalvar) props.aoSalvar("vidaTemp", novaTemp);
  }

  function curarDoDescanso(qtd) {
    const novaVida = Math.min(props.vidaMaxima, vidaAt + qtd);
    salvar(novaVida, vidaT);
    exibirToast(`☕ Recuperou ${qtd} PV no Descanso Curto!`);
  }

  function gastarDadoVida() {
    const dadosAtuais = props.dadosVida || { total: 1, gastos: 0, tipo: 8 };
    const novosGastos = Math.min(dadosAtuais.total, dadosAtuais.gastos + 1);
    if (props.aoSalvar) props.aoSalvar("dadosVida", { ...dadosAtuais, gastos: novosGastos });
  }

  function executarDescansoLongo() {
    if (props.aoSalvar) {
      props.aoSalvar("vidaAtual", props.vidaMaxima);
      props.aoSalvar("vidaTemp", 0);
      props.aoSalvar("deathSaves", { sucessos: 0, falhas: 0 }); 
      
      const dv = props.dadosVida || { total: 1, gastos: 0, tipo: 8 };
      const recuperar = Math.max(1, Math.floor(dv.total / 2));
      const novosGastos = Math.max(0, dv.gastos - recuperar);
      props.aoSalvar("dadosVida", { ...dv, gastos: novosGastos });

      if (props.dados && props.dados.slotsGastos) props.aoSalvar("slotsGastos", {}); 

      if (props.dados) {
        if (props.dados.tracosClasse) props.aoSalvar("tracosClasse", props.dados.tracosClasse.map(t => ({ ...t, usosGastos: [] })));
        if (props.dados.tracosRaciais) props.aoSalvar("tracosRaciais", props.dados.tracosRaciais.map(t => ({ ...t, usosGastos: [] })));
        if (props.dados.talentos) props.aoSalvar("talentos", props.dados.talentos.map(t => ({ ...t, usosGastos: [] })));
      }

      setMostrarModalConfirmacao(false); 
      exibirToast("🏕️ Descanso Longo concluído! Ficha totalmente restaurada.");
    }
  }

  function executarDescansoCurto() {
    if (props.aoSalvar && props.dados) {
      const renovarTracos = (lista) => {
        if (!lista) return lista;
        return lista.map(t => {
           if (t.recuperacao === "Descanso Curto") return { ...t, usosGastos: [] };
           return t; 
        });
      };

      props.aoSalvar("tracosClasse", renovarTracos(props.dados.tracosClasse));
      props.aoSalvar("tracosRaciais", renovarTracos(props.dados.tracosRaciais));
      props.aoSalvar("talentos", renovarTracos(props.dados.talentos));

      if (props.dados.classe === "Bruxo" && props.dados.slotsGastos) props.aoSalvar("slotsGastos", {});

      exibirToast("☕ Descanso Curto concluído!");
    }
    setMostrarDescanso(false); 
  }

  // ==========================================
  // 👇 ROLADOR DE TR MULTIPLAYER CONTRA A MORTE 👇
  // ==========================================
  function rolarMorte() {
    if (deathSaves.sucessos >= 3 || deathSaves.falhas >= 3) return;

    const d20 = Math.floor(Math.random() * 20) + 1;
    let novosSucessos = deathSaves.sucessos;
    let novasFalhas = deathSaves.falhas;
    
    let mensagemToast = "";
    let mensagemChat = "";

    if (d20 === 1) {
      novasFalhas += 2;
      mensagemToast = "💀 Falha Crítica (1)! Duas falhas anotadas.";
      mensagemChat = `rolou **Teste contra a Morte**: d20(1) = **[ Falha Crítica! 💀💀 ]**`;
    } else if (d20 >= 2 && d20 <= 9) {
      novasFalhas += 1;
      mensagemToast = `🔴 Falhou (${d20}).`;
      mensagemChat = `rolou **Teste contra a Morte**: d20(${d20}) = **[ Falha 🔴 ]**`;
    } else if (d20 >= 10 && d20 <= 19) {
      novosSucessos += 1;
      mensagemToast = `🟢 Sucesso (${d20})!`;
      mensagemChat = `rolou **Teste contra a Morte**: d20(${d20}) = **[ Sucesso 🟢 ]**`;
    } else if (d20 === 20) {
      if (props.aoSalvar) {
        props.aoSalvar("vidaAtual", 1);
        props.aoSalvar("deathSaves", { sucessos: 0, falhas: 0 });
      }
      exibirToast("✨ 20 NATURAL! Você acordou com 1 PV!");
      
      if (props.aoMandarChatMesa) {
        props.aoMandarChatMesa(`rolou **Teste contra a Morte**: d20(20) = **[ ✨ MILAGRE! 20 Natural! Levantou com 1 PV! ✨ ]**`);
      }
      return; 
    }

    if (props.aoSalvar) {
      props.aoSalvar("deathSaves", { sucessos: novosSucessos, falhas: novasFalhas });
    }

    // Adiciona o veredito final caso atinja o limite de 3 bolinhas
    if (novosSucessos >= 3) {
      mensagemToast += " 🎉 ESTÁVEL! Você sobreviveu.";
      mensagemChat += `<br/>🎉 **ESTABILIZOU!** Conseguiu resistir à morte e não está mais sangrando!`;
    } else if (novasFalhas >= 3) {
      mensagemToast += " 🪦 MORTO. Seu personagem se foi...";
      mensagemChat += `<br/>🪦 **MORTO!** O herói tombou em combate e sua alma partiu...`;
    }

    exibirToast(mensagemToast);
    
    // Dispara a fofoca em tempo real pro chat do mestre!
    if (props.aoMandarChatMesa) {
      props.aoMandarChatMesa(mensagemChat);
    }
  }

  const porcentagem = Math.min(100, (vidaAt / props.vidaMaxima) * 100);
  let corBarra = '#44cc44'; 
  if (porcentagem < 30) corBarra = '#ff4444'; 
  else if (porcentagem < 50) corBarra = '#ff9800'; 

  const estaCaido = vidaAt === 0;

  return (
    <div className={`painel-vida-completo ${estaCaido ? 'modo-morte' : ''}`}>
      
      {toast && <div className="toast-alerta-custom">{toast}</div>}

      {mostrarModalConfirmacao && (
        <div className="overlay-rolagem" onClick={() => setMostrarModalConfirmacao(false)}>
          <div className="card-rolagem" onClick={(e) => e.stopPropagation()} style={{ minWidth: '280px', padding: '25px' }}>
            <h3 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>🏕️ Montar Acampamento?</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.4' }}>
              Um descanso longo irá restaurar completamente seus Pontos de Vida, dados de vida gastos, slots de magia e habilidades de classe.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-fechar" style={{ margin: 0, background: '#333' }} onClick={() => setMostrarModalConfirmacao(false)}>Cancelar</button>
              <button className="btn-fechar" style={{ margin: 0, background: '#cc0000', color: 'white', fontWeight: 'bold' }} onClick={executarDescansoLongo}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {mostrarDescanso && (
        <ModalDescanso 
          dados={{ ...props, dadosVida: props.dadosVida, constituicao: props.constituicao }} 
          aoFechar={() => setMostrarDescanso(false)}
          aoCurar={curarDoDescanso}
          aoGastarDado={gastarDadoVida}
          aoFinalizar={executarDescansoCurto}
        />
      )}

      <div className="header-vida-titulo">
        <span style={{ color: estaCaido ? '#ff4444' : 'inherit' }}>
          {estaCaido ? 'INCONSCIENTE' : 'HIT POINTS'}
        </span>
        <span style={{fontSize: '0.8rem', cursor: 'pointer'}} title="A Ficha está salva na Nuvem!">☁️</span>
      </div>

      <div className="vida-corpo">
        
        {!estaCaido && (
          <>
            <div className="bloco-hp-principal">
              <div className="display-numeros">
                <input type="number" className="hp-atual-input" value={vidaAt} onFocus={(e) => e.target.select()} onChange={alterarVidaManual} />
                <span className="barra-separadora">/</span>
                <span className="hp-max">{props.vidaMaxima}</span>
              </div>
              <div className="barra-fina-container">
                <div className="barra-fina-fill" style={{ width: `${porcentagem}%`, backgroundColor: corBarra }}></div>
              </div>
              <div className="labels-hp"><small>Current</small><small>Max</small></div>
            </div>

            <div className="bloco-temp">
              <input type="number" className="input-temp" placeholder="0" value={vidaT > 0 ? vidaT : ''} onFocus={(e) => e.target.select()} onChange={alterarTempManual} />
              <small>Temp</small>
            </div>

            <div className="bloco-controles-novo">
              <div className="linha-acao">
                <button className="btn-acao dano" onClick={aplicarDano}>❤️</button>
                <input type="number" className="input-acao" placeholder="0" value={valorInput} onFocus={(e) => e.target.select()} onChange={(e) => setValorInput(e.target.value)} />
                <button className="btn-acao cura" onClick={aplicarCura}>💚</button>
              </div>
              <div className="linha-botoes-descanso">
                <button className="btn-descanso" onClick={() => setMostrarDescanso(true)}>☕ Short</button>
                <button className="btn-descanso longo" onClick={() => setMostrarModalConfirmacao(true)}>🌙 Long</button>
              </div>
            </div>
          </>
        )}

        {estaCaido && (
          <div className="bloco-death-saves" style={{ width: '100%', padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              
              <div className="ds-box">
                <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Sucessos</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={`suc-${i}`} className={`ds-circle ${deathSaves.sucessos >= i ? 'sucesso' : ''}`}></div>
                  ))}
                </div>
              </div>

              <button 
                onClick={rolarMorte} 
                disabled={deathSaves.sucessos >= 3 || deathSaves.falhas >= 3}
                style={{
                  background: (deathSaves.sucessos >= 3 || deathSaves.falhas >= 3) ? '#333' : '#ffcc00',
                  color: (deathSaves.sucessos >= 3 || deathSaves.falhas >= 3) ? '#666' : '#000',
                  border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold',
                  cursor: (deathSaves.sucessos >= 3 || deathSaves.falhas >= 3) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: '0.2s', fontSize: '0.9rem'
                }}
              >
                {deathSaves.sucessos >= 3 ? "ESTÁVEL" : deathSaves.falhas >= 3 ? "MORTO" : "🎲 Rolar d20"}
              </button>

              <div className="ds-box" style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Falhas</span>
                <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                  {[1, 2, 3].map(i => (
                    <div key={`fal-${i}`} className={`ds-circle ${deathSaves.falhas >= i ? 'falha' : ''}`}></div>
                  ))}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
               <input 
                 type="number" placeholder="Cura..." value={valorInput} 
                 onChange={(e) => setValorInput(e.target.value)} 
                 style={{ width: '60px', padding: '5px', background: '#111', border: '1px solid #444', color: 'white', textAlign: 'center', borderRadius: '4px' }}
               />
               <button onClick={aplicarCura} style={{ background: '#4caf50', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                 Acordar 💚
               </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .toast-alerta-custom {
          position: fixed; top: 20px; right: 20px; background: #222; color: #ffcc00; border: 1px solid #444; border-left: 4px solid #ffcc00;
          padding: 12px 24px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.6); font-weight: bold; font-size: 0.95rem;
          z-index: 9999; display: flex; align-items: center; gap: 10px; animation: animarToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes animarToast {
          0% { transform: translateY(-30px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .painel-vida-completo.modo-morte {
          border-color: #ff4444;
          background: linear-gradient(180deg, #2a0a0a 0%, #1a1a1a 100%);
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.2);
        }
        .ds-circle {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #555; background: #111; transition: 0.3s;
        }
        .ds-circle.sucesso { background: #4caf50; border-color: #4caf50; box-shadow: 0 0 8px #4caf50; }
        .ds-circle.falha { background: #f44336; border-color: #f44336; box-shadow: 0 0 8px #f44336; }
      `}</style>
    </div>
  );
}