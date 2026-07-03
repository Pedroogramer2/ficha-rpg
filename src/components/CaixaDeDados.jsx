// src/components/CaixaDeDados.jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DiceBox from '@3d-dice/dice-box';

export function CaixaDeDados({ aoTerminarDeRolar }) {
  const iniciou = useRef(false);

  useEffect(() => {
    if (iniciou.current) return;
    iniciou.current = true;

    const somClack = new Audio('/sons/clack.mp3'); 
    somClack.volume = 0.4;

    setTimeout(() => {
      const diceBox = new DiceBox({
        container: "#dice-box-portal",
        assetPath: "/dice-box/", 
        origin: window.location.origin, 
        theme: "default",
        themeColor: "#ffcc00",
        scale: 8, 
        spinForce: 7,
        throwForce: 6,
      });

      diceBox.init().then(() => {
        diceBox.onRollComplete = (resultados) => {
          const total = resultados.reduce((acc, curr) => acc + curr.value, 0);
          if (aoTerminarDeRolar) aoTerminarDeRolar(total);
          setTimeout(() => { diceBox.clear(); }, 3000);
        };
      }).catch(e => console.error("Erro fatal ao carregar 3D:", e));

      window.dispararDado3D = (notacao, cor) => {

        const cloneSom = somClack.cloneNode();
         cloneSom.volume = 0.5; // Ajuste para ficar agradável
         cloneSom.play().catch(e => console.warn("Navegador bloqueou áudio", e));

       if (cor) {
         diceBox.updateConfig({ themeColor: cor }); 
       }
       diceBox.roll(notacao);
    };
    }, 100);

  }, [aoTerminarDeRolar]);

  // Renderiza o Portal e injeta o CSS que obriga o Canvas a esticar!
  return createPortal(
    <>
      <style>{`
        /* 👇 A MÁGICA QUE SOLTA O DADO 👇 */
        .dice-box-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
      `}</style>
      
      <div 
        id="dice-box-portal" 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          pointerEvents: 'none', zIndex: 9999 
        }}
      ></div>
    </>,
    document.body
  );
}