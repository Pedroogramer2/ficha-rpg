// src/components/MapaVirtual.jsx
import { useState, useRef, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export function MapaVirtual({ mesaId, mesaDados, jogadores, npcs, isMestre, minhasFichasIDs }) {
  const [tokenSelecionado, setTokenSelecionado] = useState(null);
  
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ isDown: false, startX: 0, startY: 0, sl: 0, st: 0, moved: false });
  const areaRef = useRef(null);
  
  const [modoRegua, setModoRegua] = useState(false);
  const [tipoRegua, setTipoRegua] = useState('linha'); 
  const [modoNevoa, setModoNevoa] = useState(false);
  const [medida, setMedida] = useState({ ativo: false, x1: 0, y1: 0, x2: 0, y2: 0 });

  const [pingVisivel, setPingVisivel] = useState(false);

  // Estados da Névoa
  const [pintandoNevoa, setPintandoNevoa] = useState(false);
  const [modoPincel, setModoPincel] = useState('add'); 
  const [nevoaLocal, setNevoaLocal] = useState(null); 
  const ultimaCelulaPintada = useRef(null);

  const [opacidadeGrid, setOpacidadeGrid] = useState(() => {
    const salva = localStorage.getItem('opacidadeGrid');
    return salva !== null ? parseFloat(salva) : 0.15;
  });

  const TAMANHO_GRID = 70; 

  const cenas = mesaDados?.cenas || {
    padrao: { id: 'padrao', nome: 'Mapa Inicial', bg: mesaDados?.mapaBg || null }
  };
  const cenaAtivaId = mesaDados?.cenaAtivaId || 'padrao';
  const mapaBg = cenas[cenaAtivaId]?.bg || null;

  const posicoes = mesaDados?.posicoesTokens || {}; 
  const nevoaGuerra = mesaDados?.nevoa || [];
  const pingAtivo = mesaDados?.ping || null;
  
  const tamanhosTokens = mesaDados?.tamanhosTokens || {};
  const aurasTokens = mesaDados?.aurasTokens || {};

  const marcadores = mesaDados?.marcadores || [];
  const [modoPino, setModoPino] = useState(false);
  const [telaCheia, setTelaCheia] = useState(false);

  useEffect(() => {
    function apertouEsc(e) {
      if (e.key === 'Escape') setTelaCheia(false);
    }
    window.addEventListener('keydown', apertouEsc);
    return () => window.removeEventListener('keydown', apertouEsc);
  }, []);

  useEffect(() => {
    if (pingAtivo?.time) {
      setPingVisivel(true);
      const timer = setTimeout(() => setPingVisivel(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [pingAtivo?.time]);

  function alterarOpacidadeGrid(e) {
    const novoValor = parseFloat(e.target.value);
    setOpacidadeGrid(novoValor);
    localStorage.setItem('opacidadeGrid', novoValor.toString());
  }

  async function handleUploadMapa(e) {
    if (!isMestre) return;
    
    const nomeCena = prompt("Digite um nome para este novo cenário (Ex: Covil do Dragão, Esgotos):");
    if (!nomeCena) return; 

    const file = e.target.files[0];
    if (!file) return;

    alert(`Subindo o mapa "${nomeCena}" para o servidor... Aguarde.`);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const resposta = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const dados = await resposta.json();

      if (dados.success) {
        const urlMapa = dados.url; 
        const novaCenaId = "scene_" + Date.now();

        const novasCenas = {
          ...cenas,
          [novaCenaId]: { id: novaCenaId, nome: nomeCena, bg: urlMapa }
        };

        await updateDoc(doc(db, "mesas", mesaId), { 
          cenas: novasCenas,
          cenaAtivaId: novaCenaId
        });
        
        alert("Mapa subiu com sucesso!");
      } else {
        alert("Erro ao subir a imagem no Servidor.");
      }
    } catch (error) {
      console.error("Erro no Upload:", error);
      alert("Ocorreu um erro na conexão.");
    }
  }

  async function apagarCenaAtual() {
    if (!isMestre) return;
    
    if (Object.keys(cenas).length <= 1) {
      alert("Você não pode apagar a última cena da mesa!");
      return;
    }

    if (!window.confirm(`Tem certeza que deseja DESTRUIR a cena "${cenas[cenaAtivaId].nome}"?`)) return;

    const novasCenas = { ...cenas };
    delete novasCenas[cenaAtivaId];
    const novaCenaAtiva = Object.keys(novasCenas)[0];

    try {
      await updateDoc(doc(db, "mesas", mesaId), {
        cenas: novasCenas,
        cenaAtivaId: novaCenaAtiva
      });
    } catch (error) {
      console.error("Erro ao apagar cena:", error);
    }
  }

  function clicarToken(e, idToken, isNpc) {
    e.stopPropagation(); 
    if (modoRegua || modoNevoa) return; 
    if (!isMestre && isNpc) return; 
    if (!isMestre && !minhasFichasIDs.includes(idToken)) return; 
    setTokenSelecionado(tokenSelecionado === idToken ? null : idToken);
  }

  function handleMouseDown(e) {
    if (modoRegua || modoNevoa) return; 
    if (e.target.closest('.token-peca')) return; 
    setPan({
        isDown: true,
        startX: e.clientX,
        startY: e.clientY,
        sl: areaRef.current.scrollLeft,
        st: areaRef.current.scrollTop,
        moved: false
    });
  }

  function handleMouseMove(e) {
    if (!pan.isDown) return;
    const dx = e.clientX - pan.startX;
    const dy = e.clientY - pan.startY;
    
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setPan(prev => ({...prev, moved: true}));
        areaRef.current.scrollLeft = pan.sl - dx;
        areaRef.current.scrollTop = pan.st - dy;
    }
  }

  function handleMouseUp() {
    setPan(prev => ({...prev, isDown: false}));
  }

  function handleGridMouseDown(e) {
    if (modoNevoa && isMestre) {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / zoom;
      const offsetY = (e.clientY - rect.top) / zoom;
      const gridX = Math.floor(offsetX / TAMANHO_GRID);
      const gridY = Math.floor(offsetY / TAMANHO_GRID);
      const coordenada = `${gridX},${gridY}`;

      const intençãoRemover = nevoaGuerra.includes(coordenada);
      setModoPincel(intençãoRemover ? 'remove' : 'add');
      setPintandoNevoa(true);

      let novaTinta = [...nevoaGuerra];
      if (intençãoRemover) {
        novaTinta = novaTinta.filter(c => c !== coordenada);
      } else {
        novaTinta.push(coordenada);
      }
      
      setNevoaLocal(novaTinta);
      ultimaCelulaPintada.current = coordenada;
      return;
    }

    if (modoRegua) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      setMedida({ ativo: true, x1: x, y1: y, x2: x, y2: y });
      return;
    }
  }

  function handleGridMouseMove(e) {
    if (modoNevoa && isMestre && pintandoNevoa && nevoaLocal) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / zoom;
      const offsetY = (e.clientY - rect.top) / zoom;
      const gridX = Math.floor(offsetX / TAMANHO_GRID);
      const gridY = Math.floor(offsetY / TAMANHO_GRID);
      const coordenada = `${gridX},${gridY}`;

      if (ultimaCelulaPintada.current === coordenada) return; 

      let novaTinta = [...nevoaLocal];
      if (modoPincel === 'remove') {
        novaTinta = novaTinta.filter(c => c !== coordenada);
      } else {
        if (!novaTinta.includes(coordenada)) novaTinta.push(coordenada);
      }
      
      setNevoaLocal(novaTinta);
      ultimaCelulaPintada.current = coordenada;
      return;
    }

    if (modoRegua && medida.ativo) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      setMedida(prev => ({ ...prev, x2: x, y2: y }));
    }
  }

  function handleGridMouseUp() {
    if (modoNevoa && isMestre && pintandoNevoa) {
      setPintandoNevoa(false);
      if (nevoaLocal) {
        updateDoc(doc(db, "mesas", mesaId), { nevoa: nevoaLocal }).catch(e => console.error(e));
        setNevoaLocal(null);
      }
      ultimaCelulaPintada.current = null;
      return;
    }

    if (modoRegua) {
      setMedida(prev => ({ ...prev, ativo: false }));
    }
  }

 async function handleGridClick(e) {
    if (pan.moved) return; 
    if (modoNevoa || modoRegua) return; 

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / zoom;
    const offsetY = (e.clientY - rect.top) / zoom;

    // 👇 MODO PINO - AQUI ESTAVA O ERRO DE VARIÁVEL 👇
    if (modoPino && isMestre) {
      const icone = prompt("Digite um Emoji para o pino (Ex: 📍, ⛺, 💀, 🏰, ❓):", "📍");
      if (!icone) { setModoPino(false); return; }
      
      const anotacao = prompt("Qual o texto ou nome deste local?");
      if (!anotacao) { setModoPino(false); return; }

      const novoPino = {
        id: "pino_" + Date.now(),
        x: offsetX,
        y: offsetY,
        icone: icone.trim(),
        texto: anotacao,
        cenaId: cenaAtivaId 
      };

      try {
        await updateDoc(doc(db, "mesas", mesaId), { marcadores: arrayUnion(novoPino) });
      } catch (err) {
        console.error("Erro ao salvar marcador no banco: ", err);
      }

      setModoPino(false);
      return; // 👈 O return impede que o clique se confunda com movimento de token
    }

    // MODO NORMAL DE MOVIMENTO
    if (!tokenSelecionado) return;
    const gridX = Math.floor(offsetX / TAMANHO_GRID);
    const gridY = Math.floor(offsetY / TAMANHO_GRID);

    const novasPosicoes = { ...posicoes, [tokenSelecionado]: { x: gridX, y: gridY } };
    setTokenSelecionado(null); 

    try { updateDoc(doc(db, "mesas", mesaId), { posicoesTokens: novasPosicoes }); } catch (e) {}
  }

  async function apagarPino(e, pinoId) {
    e.preventDefault(); // Previne abrir o menu do navegador
    e.stopPropagation();
    if (!isMestre) return;
    
    if (window.confirm("Deseja remover este marcador do mapa?")) {
      const novaLista = marcadores.filter(p => p.id !== pinoId);
      try {
        await updateDoc(doc(db, "mesas", mesaId), { marcadores: novaLista });
      } catch(err) {}
    }
  }

  async function soltarTokenArrastado(e) {
    e.preventDefault();
    const tokenId = e.dataTransfer.getData("text/plain");
    if (!tokenId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / zoom;
    const offsetY = (e.clientY - rect.top) / zoom;

    const gridX = Math.floor(offsetX / TAMANHO_GRID);
    const gridY = Math.floor(offsetY / TAMANHO_GRID);

    const novasPosicoes = { ...posicoes, [tokenId]: { x: gridX, y: gridY } };
    try { await updateDoc(doc(db, "mesas", mesaId), { posicoesTokens: novasPosicoes }); } catch (e) {}
  }

  async function dispararPing(e) {
    if (modoRegua || modoNevoa || modoPino) return; 
    
    const rect = e.currentTarget.getBoundingClientRect();
    // NÃO divida pelo zoom aqui! Salve o pixel bruto da tela!
    const offsetX = (e.clientX - rect.left) / zoom;
    const offsetY = (e.clientY - rect.top) / zoom;

    try {
      await updateDoc(doc(db, "mesas", mesaId), {
         ping: { x: offsetX, y: offsetY, time: Date.now() }
      });
    } catch (e) {}
  }

  const listaTokens = [];
  Object.values(jogadores).forEach(ficha => {
    listaTokens.push({
      id: ficha.id, nome: ficha.nome, foto: ficha.foto, vidaAtual: ficha.vidaAtual, vidaMaxima: ficha.vidaMaxima || 1,
      isNpc: false, corBorda: minhasFichasIDs.includes(ficha.id) ? '#4caf50' : '#3498db' 
    });
  });

  (npcs || []).forEach(npc => {
    let corDaBorda = '#ff4444'; 
    let icone = '👹';
    
    if (npc.faccao === 'neutro') { corDaBorda = '#ffcc00'; icone = '😐'; }
    if (npc.faccao === 'aliado') { corDaBorda = '#4caf50'; icone = '🛡️'; }

    listaTokens.push({
      id: npc.id, 
      nome: npc.nome, 
      foto: npc.foto || null, 
      vidaAtual: npc.vidaAtual, 
      vidaMaxima: npc.vidaMaxima || 1,
      isNpc: true, 
      corBorda: corDaBorda, 
      iconeFaccao: icone 
    });
  });

  const distanciaPixels = Math.sqrt(Math.pow(medida.x2 - medida.x1, 2) + Math.pow(medida.y2 - medida.y1, 2));
  const distanciaFeet = Math.round(distanciaPixels / TAMANHO_GRID) * 5;
  
  const anguloRad = Math.atan2(medida.y2 - medida.y1, medida.x2 - medida.x1);
  const aberturaCone = 0.46; 
  const coneP2x = medida.x1 + distanciaPixels * Math.cos(anguloRad - aberturaCone);
  const coneP2y = medida.y1 + distanciaPixels * Math.sin(anguloRad - aberturaCone);
  const coneP3x = medida.x1 + distanciaPixels * Math.cos(anguloRad + aberturaCone);
  const coneP3y = medida.y1 + distanciaPixels * Math.sin(anguloRad + aberturaCone);

  const iconesRegua = { 'linha': '📏 Linha', 'esfera': '🔴 Esfera', 'cone': '🔺 Cone', 'cubo': '🟦 Cubo' };
  function alternarTipoRegua() {
    const tipos = ['linha', 'esfera', 'cone', 'cubo'];
    const atual = tipos.indexOf(tipoRegua);
    setTipoRegua(tipos[(atual + 1) % tipos.length]);
    setModoRegua(true); setModoNevoa(false);
  }

  const tokenAlvo = listaTokens.find(t => t.id === tokenSelecionado);
  const podeMudarTamanho = tokenAlvo && (isMestre || minhasFichasIDs.includes(tokenAlvo.id));

  const nevoaParaExibir = nevoaLocal || nevoaGuerra;

  return (
    <div className={`container-mapa-virtual ${telaCheia ? 'tela-cheia' : ''}`}>
      
      <div className="controles-mapa">
        <div style={{display:'flex', gap:'15px', alignItems:'center', flexWrap: 'wrap'}}>
          <h2 style={{margin:0, color:'#ffcc00'}}>🗺️ Arena Tática</h2>
          
          {isMestre && Object.keys(cenas).length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select 
                value={cenaAtivaId} 
                onChange={async (e) => {
                  await updateDoc(doc(db, "mesas", mesaId), { cenaAtivaId: e.target.value });
                }}
                style={{ padding: '6px 12px', background: '#222', color: '#ffcc00', border: '1px solid #444', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                {Object.values(cenas).map(c => (
                  <option key={c.id} value={c.id}>🎬 {c.nome}</option>
                ))}
              </select>

              {Object.keys(cenas).length > 1 && (
                <button 
                  onClick={apagarCenaAtual}
                  style={{ background: '#f44336', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                  title="Apagar Cena Atual"
                >
                  🗑️
                </button>
              )}
            </div>
          )}

          {tokenSelecionado && podeMudarTamanho && (
            <>
              {/* MENU DE ESCALA (TAMANHO DO TOKEN) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#222', padding: '4px 12px', borderRadius: '15px', border: '1px solid #444' }}>
                <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', fontWeight: 'bold', marginRight: '4px' }}>Escala:</span>
                {[1, 2, 3, 4].map(sz => {
                  const labels = ['M', 'G', 'E', 'GG'];
                  const tamanhoAtual = tamanhosTokens[tokenSelecionado] || 1;
                  return (
                    <button
                      key={sz}
                      onClick={async () => {
                        await updateDoc(doc(db, "mesas", mesaId), {
                          [`tamanhosTokens.${tokenSelecionado}`]: sz
                        });
                      }}
                      style={{
                        background: tamanhoAtual === sz ? '#ffcc00' : '#333',
                        color: tamanhoAtual === sz ? 'black' : 'white',
                        border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.1s'
                      }}
                    >
                      {labels[sz-1]}
                    </button>
                  );
                })}
              </div>

              {/* 👇 NOVO MENU DE AURAS VISUAIS 👇 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#111', padding: '4px 12px', borderRadius: '15px', border: '1px solid #3498db' }}>
                <span style={{ fontSize: '0.7rem', color: '#3498db', textTransform: 'uppercase', fontWeight: 'bold', marginRight: '4px' }}>✨ Aura (ft):</span>
                {[0, 5, 10, 15, 30].map(raio => {
                  const raioAtual = aurasTokens[tokenSelecionado] || 0;
                  return (
                    <button
                      key={raio}
                      title={raio === 0 ? "Desligar Aura" : `Ligar Aura de ${raio}ft`}
                      onClick={async () => {
                        await updateDoc(doc(db, "mesas", mesaId), {
                          [`aurasTokens.${tokenSelecionado}`]: raio
                        });
                      }}
                      style={{
                        background: raioAtual === raio ? '#3498db' : '#333',
                        color: raioAtual === raio ? 'white' : '#aaa',
                        border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.1s'
                      }}
                    >
                      {raio === 0 ? 'Desligar' : raio}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <span style={{fontSize:'0.85rem', color: modoNevoa ? '#ff4444' : modoRegua ? '#ffcc00' : '#aaa', background: '#222', padding: '4px 10px', borderRadius: '15px', border: '1px solid', borderColor: modoNevoa ? '#ff4444' : modoRegua ? '#ffcc00' : 'transparent'}}>
            {modoNevoa ? '🌫️ Pincel de Névoa Ativado (Clique e Arraste)' : modoRegua ? `📏 Medindo ${iconesRegua[tipoRegua]}` : '👆 Arraste as peças ou dê Duplo Clique no mapa para Pingar'}
          </span>
        </div>

        {isMestre && (
          <label className="btn-upload-mapa">
            ➕ Adicionar Nova Cena
            <input type="file" accept="image/*" onChange={handleUploadMapa} hidden />
          </label>
        )}
      </div>

      <div className="painel-zoom-flutuante">
        {isMestre && (
          <button 
            onClick={() => { setModoNevoa(!modoNevoa); setModoRegua(false); }} 
            style={{ marginRight: '10px', color: modoNevoa ? '#ff4444' : 'white', fontWeight: modoNevoa ? 'bold' : 'normal', borderRight: '1px solid #555', paddingRight: '15px' }}
            title="Pincel de Névoa de Guerra"
          >
            🌫️ Névoa
          </button>
        )}
        {isMestre && (
          <button 
            onClick={() => { setModoPino(!modoPino); setModoNevoa(false); setModoRegua(false); }} 
            style={{ marginRight: '10px', color: modoPino ? '#4caf50' : 'white', fontWeight: modoPino ? 'bold' : 'normal', borderRight: '1px solid #555', paddingRight: '15px' }}
            title="Adicionar Marcador no Mapa"
          >
            📍 Pino
          </button>
        )}
        
        <button 
          onClick={() => setTelaCheia(!telaCheia)} 
          style={{ borderRight: '1px solid #555', paddingRight: '15px', marginRight: '10px', color: telaCheia ? '#ffcc00' : 'white' }}
          title="Tela Cheia (ESC para sair)"
        >
          {telaCheia ? '✖ Restaurar' : '🔲 Expandir'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', borderRight: '1px solid #555', paddingRight: '15px', marginRight: '10px' }} title="Visibilidade das linhas do Grid">
          <span style={{ fontSize: '0.9rem' }}>🕸️</span>
          <input 
            type="range" 
            min="0" max="1" step="0.05" 
            value={opacidadeGrid} 
            onChange={alterarOpacidadeGrid}
            style={{ width: '60px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #555', paddingRight: '15px', marginRight: '10px' }}>
          <button onClick={() => { setModoRegua(!modoRegua); setModoNevoa(false); }} style={{ color: modoRegua ? '#ffcc00' : 'white' }} title="Ligar/Desligar Medição">
            {iconesRegua[tipoRegua]}
          </button>
          <button onClick={alternarTipoRegua} style={{ background: '#333', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', marginLeft: '5px' }}>🔄</button>
        </div>

        <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} title="Afastar (Zoom Out)">➖</button>
        <button onClick={() => setZoom(1)} title="Voltar ao Normal">🔍 {Math.round(zoom * 100)}%</button>
        <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} title="Aproximar (Zoom In)">➕</button>
      </div>

      <div 
        className={`area-scroll-mapa ${pan.isDown ? 'arrastando' : ''} ${modoRegua ? 'modo-regua' : ''}`}
        ref={areaRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {mapaBg ? (
          <div 
            className="tabuleiro-grid"
            onClick={handleGridClick}
            onDoubleClick={dispararPing} 
            
            onMouseDown={handleGridMouseDown}
            onMouseMove={handleGridMouseMove}
            onMouseUp={handleGridMouseUp}
            onMouseLeave={handleGridMouseUp}

            onDragOver={(e) => e.preventDefault()} 
            onDrop={soltarTokenArrastado}         
            style={{
              backgroundImage: `url(${mapaBg})`,
              backgroundSize: 'contain', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat',
              width: '1600px', height: '1200px',
              position: 'relative',
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
              cursor: modoNevoa || modoRegua ? 'crosshair' : 'default',
              backgroundColor: '#0a0a0a'
            }}
          >
            <div className="overlay-linhas-grid" style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,${opacidadeGrid}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${opacidadeGrid}) 1px, transparent 1px)`,
              backgroundSize: `${TAMANHO_GRID}px ${TAMANHO_GRID}px`, pointerEvents: 'none' 
            }}></div>

            {nevoaParaExibir.map(celula => {
              const [x, y] = celula.split(',').map(Number);
              return (
                <div key={celula} style={{
                    position: 'absolute', left: `${x * TAMANHO_GRID}px`, top: `${y * TAMANHO_GRID}px`,
                    width: `${TAMANHO_GRID}px`, height: `${TAMANHO_GRID}px`,
                    background: isMestre ? 'rgba(0, 0, 0, 0.65)' : 'rgba(5, 5, 5, 0.98)',
                    border: isMestre ? '1px dashed rgba(255,255,255,0.15)' : 'none', zIndex: 5, pointerEvents: 'none', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#444'
                }}>{isMestre && "🌫️"}</div>
              );
            })}

            {pingVisivel && pingAtivo && (
              <div style={{
                position: 'absolute',
                left: `${pingAtivo.x - 25}px`,
                top: `${pingAtivo.y - 25}px`,
                width: '50px', height: '50px',
                borderRadius: '50%',
                border: '3px solid #ff4444',
                background: 'rgba(255, 68, 68, 0.3)',
                pointerEvents: 'none',
                zIndex: 60,
                animation: 'pingarRadar 1s ease-out infinite'
              }}></div>
            )}

            {modoRegua && medida.ativo && (
              <svg style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:40}}>
                 {tipoRegua === 'linha' && (<line x1={medida.x1} y1={medida.y1} x2={medida.x2} y2={medida.y2} stroke="#ffcc00" strokeWidth="4" strokeDasharray="8,8" />)}
                 {tipoRegua === 'esfera' && (<><line x1={medida.x1} y1={medida.y1} x2={medida.x2} y2={medida.y2} stroke="#ffcc00" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" /><circle cx={medida.x1} cy={medida.y1} r={distanciaPixels} fill="rgba(255, 68, 68, 0.3)" stroke="#ff4444" strokeWidth="3" /></>)}
                 {tipoRegua === 'cone' && (<polygon points={`${medida.x1},${medida.y1} ${coneP2x},${coneP2y} ${coneP3x},${coneP3y}`} fill="rgba(52, 152, 219, 0.3)" stroke="#3498db" strokeWidth="3" />)}
                 {tipoRegua === 'cubo' && (<rect x={medida.x1 - distanciaPixels} y={medida.y1 - distanciaPixels} width={distanciaPixels * 2} height={distanciaPixels * 2} fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" strokeWidth="3" />)}
                 <rect x={((medida.x1 + medida.x2) / 2) - 30} y={((medida.y1 + medida.y2) / 2) - 15} width="60" height="30" rx="5" fill="#111" stroke="#ffcc00" strokeWidth="2" />
                 <text x={(medida.x1 + medida.x2) / 2} y={((medida.y1 + medida.y2) / 2) + 5} fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">{Math.max(0, distanciaFeet)}ft</text>
              </svg>
            )}

            {/* 👇 DESENHANDO OS PINOS / MARCADORES 👇 */}
            {marcadores.filter(p => p.cenaId === cenaAtivaId).map(pino => (
              <div 
                key={pino.id}
                className="pino-mapa"
                onContextMenu={(e) => apagarPino(e, pino.id)}
                style={{
                  position: 'absolute',
                  left: `${pino.x}px`,
                  top: `${pino.y}px`,
                  transform: 'translate(-50%, -100%)', // O fundo do pino toca o chão!
                  zIndex: 25,
                  fontSize: '2rem',
                  cursor: isMestre ? 'context-menu' : 'help',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                {pino.icone}
                <div className="tooltip-pino">
                  {pino.texto}
                  {isMestre && <small style={{display:'block', color:'#ff4444', fontSize:'0.5rem', marginTop:'3px'}}>(Botão Direito p/ Apagar)</small>}
                </div>
              </div>
            ))}

            {/* 👇 RENDERIZANDO TOKENS E AURAS 👇 */}
            {listaTokens.map(tk => {
              const posX = posicoes[tk.id]?.x || 0;
              const posY = posicoes[tk.id]?.y || 0;
              const isSelecionado = tokenSelecionado === tk.id;
              const estaMorto = tk.vidaAtual === 0;
              const possoArrastar = isMestre || minhasFichasIDs.includes(tk.id);
              
              const multiplicador = tamanhosTokens[tk.id] || 1; 

              // Lógica Matemática da Aura Visual
              const temAura = aurasTokens[tk.id] > 0;
              const raioFeet = aurasTokens[tk.id] || 0;
              const auraSizePx = ((raioFeet / 5) * TAMANHO_GRID * 2) + (TAMANHO_GRID * multiplicador);
              const centerXPx = (posX * TAMANHO_GRID) + ((TAMANHO_GRID * multiplicador) / 2);
              const centerYPx = (posY * TAMANHO_GRID) + ((TAMANHO_GRID * multiplicador) / 2);

              return (
                <div key={tk.id}>
                  
                  {/* ✨ DESENHANDO A AURA MÁGICA POR BAIXO DO TOKEN ✨ */}
                  {temAura && !estaMorto && (
                    <div className="aura-visual" style={{
                      position: 'absolute',
                      left: `${centerXPx}px`,
                      top: `${centerYPx}px`,
                      width: `${auraSizePx}px`,
                      height: `${auraSizePx}px`,
                      borderRadius: '50%',
                      background: tk.corBorda, // Usa a mesma cor do token!
                      border: `2px dashed ${tk.corBorda}`,
                      pointerEvents: 'none',
                      zIndex: 8, // Fica abaixo do Token que é 10
                    }}></div>
                  )}

                  {/* O TOKEN FÍSICO */}
                  <div 
                    className={`token-peca ${isSelecionado ? 'selecionado' : ''}`}
                    draggable={possoArrastar && !modoRegua && !modoNevoa}
                    onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", tk.id); 
                        e.dataTransfer.effectAllowed = "move";
                        setTokenSelecionado(tk.id); 
                    }}
                    onClick={(e) => clicarToken(e, tk.id, tk.isNpc)}
                    title={`${tk.nome} (${tk.vidaAtual}/${tk.vidaMaxima})`}
                    style={{
                      width: `${TAMANHO_GRID * multiplicador}px`, 
                      height: `${TAMANHO_GRID * multiplicador}px`,
                      left: `${posX * TAMANHO_GRID}px`, 
                      top: `${posY * TAMANHO_GRID}px`,
                      borderColor: tk.corBorda,
                      filter: estaMorto ? 'grayscale(100%) brightness(40%)' : 'none'
                    }}
                  >
                    {tk.foto ? (
                      <img src={tk.foto} alt={tk.nome} />
                    ) : (
                      <span className="token-emoji" style={{ fontSize: `${1.5 * multiplicador}rem` }}>
                        {tk.isNpc ? (estaMorto ? '💀' : tk.iconeFaccao) : tk.nome.charAt(0)}
                      </span>
                    )}
                    <div className="token-hp-bar"><div style={{width: `${Math.min(100, (tk.vidaAtual/tk.vidaMaxima)*100)}%`, background: tk.vidaAtual > 0 ? tk.corBorda : '#000', height:'100%'}}></div></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="aviso-mapa-vazio">
            <p>O Mestre ainda não desenhou a arena de combate.</p>
            {isMestre && <p style={{fontSize:'0.9rem', color:'#aaa'}}>Clique no botão "Adicionar Nova Cena" lá em cima!</p>}
          </div>
        )}
      </div>

      <style>{`
        .container-mapa-virtual { display: flex; flex-direction: column; height: 100%; background: #111; border-radius: 10px; border: 1px solid #333; overflow: hidden; position: relative; }
        .controles-mapa { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #1a1a1a; border-bottom: 2px solid #ffcc00; z-index: 50; }
        .btn-upload-mapa { background: #333; color: white; padding: 8px 15px; border-radius: 6px; cursor: pointer; border: 1px dashed #666; font-size: 0.9rem; transition: 0.2s; font-weight: bold; }
        .btn-upload-mapa:hover { background: #444; border-color: #ffcc00; color: #ffcc00; }
        .area-scroll-mapa { flex: 1; overflow: auto; background: #0a0a0a; position: relative; cursor: grab; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;}
        .area-scroll-mapa.arrastando { cursor: grabbing; user-select: none; }
        .area-scroll-mapa.modo-regua { cursor: crosshair; }
        .area-scroll-mapa::-webkit-scrollbar { display: none; }
        .area-scroll-mapa { -ms-overflow-style: none; scrollbar-width: none; }
        
        .painel-zoom-flutuante { position: absolute; bottom: 20px; right: 20px; background: #222; border: 2px solid #ffcc00; border-radius: 20px; display: flex; gap: 5px; padding: 5px 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.8); z-index: 100; align-items: center; }
        .painel-zoom-flutuante button { background: transparent; border: none; color: white; font-weight: bold; font-size: 1rem; cursor: pointer; transition: 0.2s; display: flex; align-items: center; }
        .painel-zoom-flutuante button:hover { transform: scale(1.05); }
        
        .aviso-mapa-vazio { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 1.2rem; cursor: default; }
        .token-peca { position: absolute; border: 3px solid; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; box-sizing: border-box; cursor: pointer; transition: left 0.3s ease, top 0.3s ease, transform 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.5); z-index: 10; }
        .token-peca:hover { transform: scale(1.05); z-index: 20; }
        .token-peca img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; pointer-events: none; }
        .token-emoji { font-weight: bold; color: white; text-shadow: 1px 1px 2px black; pointer-events: none; }
        .token-peca.selecionado { animation: piscarMira 1s infinite alternate; box-shadow: 0 0 15px rgba(255, 204, 0, 0.8); z-index: 30; }
        
        @keyframes piscarMira { 0% { border-color: #ffcc00; transform: scale(1.02); } 100% { border-color: white; transform: scale(1.06); } }
        @keyframes pingarRadar { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }

        /* 👇 A MAGIA DA AURA PULSANDO 👇 */
        .aura-visual {
          animation: pulsarAura 3s infinite alternate;
          transition: left 0.3s ease, top 0.3s ease;
        }
        @keyframes pulsarAura {
          0% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1.02); opacity: 0.25; }
        }

        .pino-mapa { position: relative; transition: transform 0.2s; }
        .pino-mapa:hover { transform: translate(-50%, -105%) scale(1.1) !important; z-index: 50 !important; }
        
        .tooltip-pino {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
          background: rgba(0,0,0,0.9); color: white; border: 1px solid #4caf50;
          padding: 8px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: bold;
          white-space: nowrap; pointer-events: none; opacity: 0; visibility: hidden;
          transition: 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          margin-bottom: 5px;
        }
        .tooltip-pino::after {
          content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          border-width: 6px; border-style: solid; border-color: rgba(0,0,0,0.9) transparent transparent transparent;
        }
        .pino-mapa:hover .tooltip-pino { opacity: 1; visibility: visible; }

        .token-hp-bar { position: absolute; bottom: -8px; left: 10%; width: 80%; height: 5px; background: #000; border-radius: 3px; border: 1px solid #444; overflow: hidden; pointer-events: none; }

        .container-mapa-virtual.tela-cheia {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99999 !important;
          border-radius: 0 !important;
          border: none !important;
        }

      `}</style>
    </div>
  );
}