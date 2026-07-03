// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { db } from '../firebase';
// 👇 Adicionamos setDoc para podermos criar as Mesas com IDs customizados!
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function Home() {
  const navigate = useNavigate();
  const [listaPersonagens, setListaPersonagens] = useState([]);

  // Lemos as fichas locais
  const minhasFichas = JSON.parse(localStorage.getItem('minhasFichas') || '[]');
  // Lemos as mesas locais que participamos/criamos
  const minhasMesas = JSON.parse(localStorage.getItem('minhasMesas') || '[]');

  useEffect(() => {
    // onAuthStateChanged fica "vigiando". Assim que o login anônimo der certo, ele roda o código de dentro.
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        async function carregarLista() {
          try {
            const listaTemp = [];
            const querySnapshot = await getDocs(collection(db, "personagens"));
            querySnapshot.forEach((doc) => {
              listaTemp.push({ id: doc.id, ...doc.data() });
            });
            setListaPersonagens(listaTemp);
          } catch (error) {
            console.error("Erro ao carregar a taverna:", error);
          }
        }
        carregarLista();
      }
    });

    // Limpa o observador quando o componente for desmontado
    return () => unsubscribeAuth();
  }, []);

  async function deletarPersonagem(e, id) {
    e.preventDefault(); 
    if (confirm("Tem certeza que deseja apagar esta ficha para sempre?")) {
      try {
        await deleteDoc(doc(db, "personagens", id));
        setListaPersonagens(prev => prev.filter(p => p.id !== id));
        const novaListaLocal = minhasFichas.filter(meuId => meuId !== id);
        localStorage.setItem('minhasFichas', JSON.stringify(novaListaLocal));
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }

  // ==========================================
  // 🎲 LÓGICA DO MULTIPLAYER (SISTEMA DE MESAS)
  // ==========================================
  async function criarNovaMesa() {
    const nomeMesa = prompt("Digite o nome da sua Campanha:");
    if (!nomeMesa) return;

    // Gera um código aleatório de 5 letras/números (Ex: X7B9P)
    const codigoSala = Math.random().toString(36).substring(2, 7).toUpperCase();

    try {
      // Cria a sala no banco de dados
      await setDoc(doc(db, "mesas", codigoSala), {
        nome: nomeMesa,
        criadoEm: new Date().toISOString(),
        jogadores: [] // Array que vai guardar os IDs das fichas
      });

      // Salva no meu PC que eu sou o dono/participante dessa mesa
      const mesasAtualizadas = [...minhasMesas, codigoSala];
      localStorage.setItem('minhasMesas', JSON.stringify(mesasAtualizadas));

      const mesasMestre = JSON.parse(localStorage.getItem('mesasQueSouMestre') || '[]');
      localStorage.setItem('mesasQueSouMestre', JSON.stringify([...mesasMestre, codigoSala]));

      alert(`Mesa criada com sucesso! O Código de convite é: ${codigoSala}`);
      navigate(`/mesa/${codigoSala}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar mesa.");
    }
  }

  async function entrarEmMesa() {
    const codigoInput = prompt("Digite o Código da Mesa (5 caracteres):");
    if (!codigoInput) return;
    const codigoLimpo = codigoInput.toUpperCase().trim();

    try {
      // Verifica se a mesa existe no banco
      const mesaSnap = await getDoc(doc(db, "mesas", codigoLimpo));
      if (mesaSnap.exists()) {
        
        // Se eu não tiver o código salvo no meu PC, eu salvo agora
        if (!minhasMesas.includes(codigoLimpo)) {
          const mesasAtualizadas = [...minhasMesas, codigoLimpo];
          localStorage.setItem('minhasMesas', JSON.stringify(mesasAtualizadas));
        }

        navigate(`/mesa/${codigoLimpo}`);
      } else {
        alert("Nenhuma mesa encontrada com esse código! Verifique com o seu Mestre.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar a mesa.");
    }
  }

  return (
    <div className="home-container">
      <h1>Grimório D&D 2024</h1>
      <p>Selecione seu herói, crie um novo destino ou junte-se a uma mesa.</p>
      
      {/* 👇 PAINEL DE MULTIPLAYER (LOBBY) 👇 */}
      <div className="painel-multiplayer">
        <h3 style={{color: '#ffcc00', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px'}}>🌐 Multijogador</h3>
        <div className="botoes-multi">
          <button className="btn-multi mestre" onClick={criarNovaMesa}>
            👑 Sou o Mestre (Criar Mesa)
          </button>
          <button className="btn-multi jogador" onClick={entrarEmMesa}>
            🎲 Sou Jogador (Entrar com Código)
          </button>
        </div>

        {/* Lista de Mesas Rápidas */}
        {minhasMesas.length > 0 && (
          <div className="lista-mesas-rapida">
             <p style={{fontSize: '0.8rem', color: '#aaa', marginTop: '15px'}}>Suas Mesas Recentes:</p>
             <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
               {minhasMesas.map(codigo => (
                 <Link key={codigo} to={`/mesa/${codigo}`} className="badge-mesa-link">
                   Mesa: {codigo}
                 </Link>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* PAINEL DE FICHAS (Mantido Intacto) */}
      <div className="menu-acoes" style={{marginTop: '40px'}}>
        <Link to="/criar">
          <button className="btn-criar">➕ Criar Novo Personagem</button>
        </Link>
      </div>

      <div className="lista-personagens">
        {listaPersonagens.map((personagem) => {
          const euSouODono = minhasFichas.includes(personagem.id);

          return (
            <div key={personagem.id} style={{ position: 'relative' }}>
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
                  <h3>{personagem.nome || "Sem Nome"}</h3>
                  <span>Lvl {personagem.nivel || 1} - {personagem.classe || "Iniciante"}</span>
                </div>
              </Link>

              {euSouODono && (
                <button className="btn-lixo-card" onClick={(e) => deletarPersonagem(e, personagem.id)} title="Deletar Minha Ficha">
                  🗑️
                </button>
              )}
            </div>
          );
        })}
        {listaPersonagens.length === 0 && <p style={{opacity: 0.5}}>Nenhum personagem encontrado...</p>}
      </div>

      {/* 👇 ADICIONAMOS O CSS NOVO DO LOBBY 👇 */}
      <style>{`
        .home-container { text-align: center; padding: 40px; color: white; max-width: 800px; margin: 0 auto; }
        
        .painel-multiplayer { background: #1a1a1a; border: 1px solid #333; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.5); }
        .botoes-multi { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .btn-multi { padding: 12px 20px; font-size: 1rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; flex: 1; min-width: 200px; }
        .btn-multi.mestre { background: transparent; border: 2px solid #ffcc00; color: #ffcc00; }
        .btn-multi.mestre:hover { background: #ffcc00; color: #000; }
        .btn-multi.jogador { background: #4caf50; color: white; }
        .btn-multi.jogador:hover { background: #45a049; }
        .badge-mesa-link { background: #333; color: #ccc; text-decoration: none; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; border: 1px solid #555; transition: 0.2s; }
        .badge-mesa-link:hover { background: #ffcc00; color: #000; border-color: #ffcc00; }

        .menu-acoes { margin-bottom: 40px; }
        .btn-criar { padding: 15px 40px; font-size: 1.2rem; background: #ffcc00; color: #000; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; transition: transform 0.2s; box-shadow: 0 0 15px rgba(255, 204, 0, 0.3); }
        .btn-criar:hover { transform: scale(1.05); background: #ffd633; }
        .lista-personagens { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .card-personagem { background: #2a2a2a; border: 1px solid #444; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px; text-decoration: none; color: white; transition: all 0.2s; width: 100%; box-sizing: border-box; }
        .card-personagem:hover { background: #333; border-color: #777; transform: translateY(-5px); }
        .btn-lixo-card { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); border: none; color: #ff5555; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: none; z-index: 10; }
        div[style*="position: relative"]:hover .btn-lixo-card { display: flex; align-items: center; justify-content: center; }
        .btn-lixo-card:hover { background: #ff0000; color: white; }
        .home-avatar-circle { width: 50px; height: 50px; border-radius: 50%; background: #444; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; border: 1px solid #666; }
        .home-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-fake { font-size: 24px; font-weight: bold; color: #ffcc00; }
        .info-personagem { text-align: left; }
        .info-personagem h3 { margin: 0; font-size: 1.1rem; }
        .info-personagem span { font-size: 0.9rem; color: #aaa; }
      `}</style>
    </div>
  );
}