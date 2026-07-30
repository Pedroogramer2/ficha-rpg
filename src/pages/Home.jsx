// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { db } from '../firebase';
import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore'; 
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function Home() {
  const navigate = useNavigate();
  const [listaPersonagens, setListaPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [minhasFichas, setMinhasFichas] = useState(() => JSON.parse(localStorage.getItem('minhasFichas') || '[]'));
  const [minhasMesas, setMinhasMesas] = useState(() => JSON.parse(localStorage.getItem('minhasMesas') || '[]'));

  // 👇 SISTEMA DE DIÁLOGOS CUSTOMIZADOS (Adeus alertas feios!) 👇
  const [dialogo, setDialogo] = useState({ ativo: false, tipo: '', titulo: '', mensagem: '', acaoConfirmar: null, placeholder: '' });
  const [inputDialogo, setInputDialogo] = useState('');

  function abrirAlert(titulo, mensagem, acaoConfirmar = null) {
    setDialogo({ ativo: true, tipo: 'alert', titulo, mensagem, acaoConfirmar, placeholder: '' });
  }

  function abrirConfirm(titulo, mensagem, acaoConfirmar) {
    setDialogo({ ativo: true, tipo: 'confirm', titulo, mensagem, acaoConfirmar, placeholder: '' });
  }

  function abrirPrompt(titulo, mensagem, placeholder, acaoConfirmar) {
    setInputDialogo('');
    setDialogo({ ativo: true, tipo: 'prompt', titulo, mensagem, placeholder, acaoConfirmar });
  }

  function fecharDialogo() {
    setDialogo({ ativo: false, tipo: '', titulo: '', mensagem: '', acaoConfirmar: null, placeholder: '' });
  }
  // 👆 FIM DO SISTEMA DE DIÁLOGOS 👆

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          if (minhasFichas.length === 0) {
            setListaPersonagens([]);
            setCarregando(false);
            return;
          }

          const promessas = minhasFichas.map(id => getDoc(doc(db, "personagens", id)));
          const resultados = await Promise.all(promessas);
          
          const listaLimpa = [];
          const fichasValidas = [];

          resultados.forEach(docSnap => {
            if (docSnap.exists()) {
              listaLimpa.push({ id: docSnap.id, ...docSnap.data() });
              fichasValidas.push(docSnap.id);
            }
          });

          if (fichasValidas.length !== minhasFichas.length) {
            localStorage.setItem('minhasFichas', JSON.stringify(fichasValidas));
            setMinhasFichas(fichasValidas);
          }

          setListaPersonagens(listaLimpa);
        } catch (error) {
          console.error("Erro ao carregar a taverna:", error);
        } finally {
          setCarregando(false);
        }
      }
    });

    return () => unsubscribeAuth();
  }, [minhasFichas]);

  function deletarPersonagem(e, id) {
    e.preventDefault(); 
    abrirConfirm(
      "🔥 Deletar Herói", 
      "Tem certeza que deseja apagar esta ficha para sempre? Não tem volta!",
      async () => {
        try {
          await deleteDoc(doc(db, "personagens", id));
          setListaPersonagens(prev => prev.filter(p => p.id !== id));
          
          const novaListaLocal = minhasFichas.filter(meuId => meuId !== id);
          localStorage.setItem('minhasFichas', JSON.stringify(novaListaLocal));
          setMinhasFichas(novaListaLocal);
        } catch (error) {
          console.error("Erro ao deletar:", error);
        }
      }
    );
  }

  function criarNovaMesa() {
    abrirPrompt(
      "👑 Criar Nova Campanha",
      "Qual será o nome da sua nova aventura épica?",
      "Ex: A Taverna do Dragão...",
      async (nomeMesa) => {
        if (!nomeMesa) return;

        const codigoSala = Math.random().toString(36).substring(2, 7).toUpperCase();

        try {
          await setDoc(doc(db, "mesas", codigoSala), {
            nome: nomeMesa,
            criadoEm: new Date().toISOString(),
            jogadores: [] 
          });

          const mesasAtualizadas = [...minhasMesas, codigoSala];
          localStorage.setItem('minhasMesas', JSON.stringify(mesasAtualizadas));
          setMinhasMesas(mesasAtualizadas);

          const mesasMestre = JSON.parse(localStorage.getItem('mesasQueSouMestre') || '[]');
          localStorage.setItem('mesasQueSouMestre', JSON.stringify([...new Set([...mesasMestre, codigoSala])]));

          abrirAlert(
            "🎉 Campanha Criada!",
            `Sua mesa foi forjada com sucesso. O código de convite é: ${codigoSala}`,
            () => navigate(`/mesa/${codigoSala}`)
          );
        } catch (error) {
          console.error(error);
          abrirAlert("Erro", "Falha ao criar a mesa de RPG.");
        }
      }
    );
  }

  function entrarEmMesa() {
    abrirPrompt(
      "🚪 Entrar na Taverna",
      "Cole ou digite o Código da Mesa que o Mestre te enviou:",
      "Ex: X7B9P",
      async (codigoInput) => {
        if (!codigoInput) return;
        const codigoLimpo = codigoInput.toUpperCase().trim();

        try {
          const mesaSnap = await getDoc(doc(db, "mesas", codigoLimpo));
          if (mesaSnap.exists()) {
            if (!minhasMesas.includes(codigoLimpo)) {
              const mesasAtualizadas = [...minhasMesas, codigoLimpo];
              localStorage.setItem('minhasMesas', JSON.stringify(mesasAtualizadas));
              setMinhasMesas(mesasAtualizadas);
            }
            navigate(`/mesa/${codigoLimpo}`);
          } else {
            abrirAlert("Mesa Inexistente", "Nenhuma mesa encontrada com esse código! Tem certeza que o Mestre te passou direito?");
          }
        } catch (error) {
          console.error(error);
          abrirAlert("Erro", "Falha ao buscar a mesa nos arquivos.");
        }
      }
    );
  }

  function esquecerMesa(e, codigo) {
    e.preventDefault();
    abrirConfirm(
      "Remover Histórico",
      `Deseja remover a mesa ${codigo} do seu histórico rápido?`,
      () => {
        const novaLista = minhasMesas.filter(m => m !== codigo);
        localStorage.setItem('minhasMesas', JSON.stringify(novaLista));
        setMinhasMesas(novaLista);
      }
    );
  }

  return (
    <div className="home-container fade-in">
      
      {/* 👇 A INTERFACE DOS DIÁLOGOS RENDERIZADA AQUI 👇 */}
      {dialogo.ativo && (
        <div className="overlay-dialogo">
          <div className="caixa-dialogo">
            <h3>{dialogo.titulo}</h3>
            <p>{dialogo.mensagem}</p>
            
            {dialogo.tipo === 'prompt' && (
              <input 
                type="text" 
                className="input-dialogo"
                placeholder={dialogo.placeholder}
                value={inputDialogo}
                onChange={(e) => setInputDialogo(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    fecharDialogo();
                    if (dialogo.acaoConfirmar) dialogo.acaoConfirmar(inputDialogo);
                  }
                }}
              />
            )}
            
            <div className="botoes-dialogo">
              {(dialogo.tipo === 'confirm' || dialogo.tipo === 'prompt') && (
                <button className="btn-dialogo-cancelar" onClick={fecharDialogo}>Cancelar</button>
              )}
              
              <button 
                className="btn-dialogo-confirmar" 
                onClick={() => {
                  fecharDialogo();
                  if (dialogo.acaoConfirmar) {
                    dialogo.tipo === 'prompt' ? dialogo.acaoConfirmar(inputDialogo) : dialogo.acaoConfirmar();
                  }
                }}
              >
                {dialogo.tipo === 'alert' ? 'Entendido' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#ffcc00', textShadow: '0 4px 10px rgba(0,0,0,0.8)', margin: '0 0 10px 0' }}>Grimório D&D</h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem', margin: 0 }}>Seu VTT de bolso para Aventuras Épicas.</p>
      </div>
      
      <div className="painel-multiplayer">
        <h3 style={{color: '#ffcc00', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px'}}>🌐 Salão Multijogador</h3>
        <div className="botoes-multi">
          <button className="btn-multi mestre" onClick={criarNovaMesa}>
            👑 Sou o Mestre (Criar Mesa)
          </button>
          <button className="btn-multi jogador" onClick={entrarEmMesa}>
            🎲 Sou Jogador (Entrar com Código)
          </button>
        </div>

        {minhasMesas.length > 0 && (
          <div className="lista-mesas-rapida fade-in">
             <p style={{fontSize: '0.85rem', color: '#888', marginTop: '20px', marginBottom: '10px'}}>Suas Campanhas Recentes:</p>
             <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
               {minhasMesas.map(codigo => (
                 <div key={codigo} style={{ position: 'relative' }}>
                   <Link to={`/mesa/${codigo}`} className="badge-mesa-link">
                     🚪 Mesa: {codigo}
                   </Link>
                   <button 
                     onClick={(e) => esquecerMesa(e, codigo)}
                     style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff4444', border: 'none', color: 'white', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.6rem', cursor: 'pointer', fontWeight: 'bold' }}
                     title="Remover do Histórico"
                   >
                     X
                   </button>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      <div className="menu-acoes" style={{marginTop: '40px'}}>
        <Link to="/criar">
          <button className="btn-criar">➕ Criar Novo Herói</button>
        </Link>
      </div>

      <div style={{ textAlign: 'left', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h3 style={{ color: '#fff', margin: 0 }}>🛡️ Seus Personagens</h3>
      </div>

      {carregando ? (
        <div style={{ padding: '40px', color: '#ffcc00', fontWeight: 'bold' }}>Consultando os arquivos da guilda...</div>
      ) : (
        <div className="lista-personagens">
          {listaPersonagens.map((personagem) => (
            <div key={personagem.id} style={{ position: 'relative' }} className="card-wrapper">
              <Link to={`/ficha/${personagem.id}`} className="card-personagem">
                <div className="home-avatar-circle">
                  {personagem.foto ? (
                    <img src={personagem.foto} alt={personagem.nome} className="home-avatar-img" />
                  ) : (
                    <div className="avatar-fake">
                      {(personagem.nome && personagem.nome.length > 0) ? personagem.nome.charAt(0) : "?"}
                    </div>
                  )}
                </div>
                <div className="info-personagem">
                  <h3>{personagem.nome || "Herói Anônimo"}</h3>
                  <span>Lvl {personagem.nivel || 1} - {personagem.classe || "Iniciante"}</span>
                </div>
              </Link>

              <button className="btn-lixo-card" onClick={(e) => deletarPersonagem(e, personagem.id)} title="Deletar Minha Ficha">
                🗑️
              </button>
            </div>
          ))}
          
          {listaPersonagens.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '40px', background: '#1a1a1a', border: '1px dashed #444', borderRadius: '12px', color: '#888' }}>
              <p style={{ margin: 0, fontSize: '1.1rem' }}>Sua lista de aventureiros está vazia.</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Clique no botão amarelo acima para forjar um novo destino!</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        /* 👇 CSS DOS NOSSOS ALERTAS LINDÕES 👇 */
        .overlay-dialogo { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 99999; animation: fadeIn 0.2s; }
        .caixa-dialogo { background: #1a1a1a; border: 2px solid #ffcc00; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.9); animation: popIn 0.3s; }
        .caixa-dialogo h3 { color: #ffcc00; margin: 0 0 15px 0; font-size: 1.5rem; }
        .caixa-dialogo p { color: #ddd; margin: 0 0 20px 0; font-size: 1rem; line-height: 1.4; }
        .input-dialogo { width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #555; background: #0a0a0a; color: white; font-size: 1rem; margin-bottom: 20px; box-sizing: border-box; text-align: center; }
        .input-dialogo:focus { outline: none; border-color: #ffcc00; }
        .botoes-dialogo { display: flex; gap: 10px; justify-content: center; }
        .btn-dialogo-cancelar { flex: 1; padding: 10px; border-radius: 6px; border: none; background: #333; color: white; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-dialogo-cancelar:hover { background: #555; }
        .btn-dialogo-confirmar { flex: 1; padding: 10px; border-radius: 6px; border: none; background: #4caf50; color: white; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 10px rgba(76,175,80,0.4); }
        .btn-dialogo-confirmar:hover { background: #45a049; transform: scale(1.05); }

        .home-container { text-align: center; padding: 40px; color: white; max-width: 900px; margin: 0 auto; }
        
        .painel-multiplayer { background: linear-gradient(145deg, #1a1a1a 0%, #111 100%); border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .botoes-multi { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .btn-multi { padding: 15px 20px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: transform 0.2s, background 0.2s; flex: 1; min-width: 250px; }
        .btn-multi:hover { transform: translateY(-3px); }
        .btn-multi.mestre { background: rgba(255, 204, 0, 0.1); border: 2px solid #ffcc00; color: #ffcc00; }
        .btn-multi.mestre:hover { background: #ffcc00; color: #000; }
        .btn-multi.jogador { background: #4caf50; color: white; box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3); }
        .btn-multi.jogador:hover { background: #45a049; }
        
        .badge-mesa-link { display: inline-block; background: #222; color: #ccc; text-decoration: none; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: bold; border: 1px solid #555; transition: 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
        .badge-mesa-link:hover { background: #ffcc00; color: #000; border-color: #ffcc00; transform: scale(1.05); }

        .menu-acoes { margin-bottom: 40px; }
        .btn-criar { padding: 15px 40px; font-size: 1.2rem; background: #ffcc00; color: #000; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; transition: transform 0.2s; box-shadow: 0 0 20px rgba(255, 204, 0, 0.4); }
        .btn-criar:hover { transform: scale(1.05); background: #ffd633; }
        
        .lista-personagens { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .card-personagem { background: #222; border: 1px solid #444; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px; text-decoration: none; color: white; transition: all 0.2s; width: 100%; box-sizing: border-box; position: relative; overflow: hidden; }
        .card-personagem::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #4caf50; opacity: 0.5; transition: 0.2s; }
        .card-personagem:hover { background: #2a2a2a; border-color: #666; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
        .card-personagem:hover::before { opacity: 1; }
        
        .btn-lixo-card { position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.6); border: 1px solid transparent; color: #ff5555; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; display: none; z-index: 10; font-size: 1rem; transition: 0.2s; }
        .card-wrapper:hover .btn-lixo-card { display: flex; align-items: center; justify-content: center; }
        .btn-lixo-card:hover { background: #ff4444; color: white; border-color: #ff4444; transform: scale(1.1); }
        
        .home-avatar-circle { width: 60px; height: 60px; border-radius: 50%; background: #111; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; border: 2px solid #555; }
        .home-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-fake { font-size: 28px; font-weight: bold; color: #ffcc00; }
        
        .info-personagem { text-align: left; }
        .info-personagem h3 { margin: 0; font-size: 1.2rem; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .info-personagem span { font-size: 0.9rem; color: #aaa; font-weight: bold; }
      `}</style>
    </div>
  );
}