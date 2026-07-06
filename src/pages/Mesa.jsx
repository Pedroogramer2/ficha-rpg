// src/pages/Mesa.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { MapaVirtual } from '../components/MapaVirtual';
import { CaixaDeDados } from '../components/CaixaDeDados';
import { BESTIARIO } from '../data/bestiario';

const LISTA_CONDICOES = [
  { id: "Agarrado", icon: "🤼" }, { id: "Amedrontado", icon: "😱" },
  { id: "Atordoado", icon: "💫" }, { id: "Caído", icon: "⏬" },
  { id: "Cego", icon: "🦇" }, { id: "Enfeitiçado", icon: "💖" },
  { id: "Envenenado", icon: "🤢" }, { id: "Exaustão", icon: "😫" },
  { id: "Impedido", icon: "⛓️" }, { id: "Incapacitado", icon: "😵" },
  { id: "Inconsciente", icon: "😴" }, { id: "Invisível", icon: "👻" },
  { id: "Paralisado", icon: "⚡" }, { id: "Petrificado", icon: "🗿" },
  { id: "Surdo", icon: "🙉" }
];

export function Mesa() {
  const { codigoSala } = useParams();
  const [mesaDados, setMesaDados] = useState(null);
  const [jogadores, setJogadores] = useState({});
  const [erro, setErro] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [minhasFichasDados, setMinhasFichasDados] = useState([]);
  const [carregandoFichas, setCarregandoFichas] = useState(false);
  
  const [modalHp, setModalHp] = useState(null); 
  const [modalHpNpc, setModalHpNpc] = useState(null);
  const [modalNpcAberto, setModalNpcAberto] = useState(false);
  const [valorHpInput, setValorHpInput] = useState("");

  const [fichaParaRemover, setFichaParaRemover] = useState(null);
  const [menuCondicoesFicha, setMenuCondicoesFicha] = useState(null);

  const [textoChat, setTextoChat] = useState("");
  const scrollRef = useRef(null);

  const minhasFichasIDs = JSON.parse(localStorage.getItem('minhasFichas') || '[]');
  const mesasQueSouMestre = JSON.parse(localStorage.getItem('mesasQueSouMestre') || '[]');
  const isMestre = mesasQueSouMestre.includes(codigoSala);

  const minhaFichaNaMesaID = mesaDados?.jogadores?.find(id => minhasFichasIDs.includes(id));
  const meuPersonagem = minhaFichaNaMesaID ? jogadores[minhaFichaNaMesaID] : null;
  const nomeRemetente = isMestre ? "👑 Mestre" : (meuPersonagem ? meuPersonagem.nome : "👻 Espectador");

  const [abaAtiva, setAbaAtiva] = useState('combate');
  const [mostrarChat, setMostrarChat] = useState(true);

  const [usarDado3D, setUsarDado3D] = useState(localStorage.getItem('usarDado3D') !== 'false');
  const [dadoPendenteNome, setDadoPendenteNome] = useState(null);

  useEffect(() => {
    const mesaRef = doc(db, "mesas", codigoSala);
    const unsubscribeMesa = onSnapshot(mesaRef, (docSnap) => {
      if (docSnap.exists()) setMesaDados(docSnap.data());
      else setErro(true);
    });
    return () => unsubscribeMesa();
  }, [codigoSala]);

  useEffect(() => {
    if (!mesaDados || !mesaDados.jogadores || mesaDados.jogadores.length === 0) {
      setJogadores({}); 
      return;
    }
    const unsubscribes = [];
    mesaDados.jogadores.forEach(idFicha => {
      const fichaRef = doc(db, "personagens", idFicha);
      const unsub = onSnapshot(fichaRef, (docSnap) => {
        if (docSnap.exists()) {
          setJogadores(prev => ({ ...prev, [idFicha]: { id: idFicha, ...docSnap.data() } }));
        } else {
           if (isMestre) removerDaMesa(idFicha); 
        }
      });
      unsubscribes.push(unsub);
    });

    setJogadores(prev => {
      const novo = { ...prev };
      Object.keys(novo).forEach(key => { if (!mesaDados.jogadores.includes(key)) delete novo[key]; });
      return novo;
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [mesaDados?.jogadores]); 

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [mesaDados?.historico, mostrarChat]);

  useEffect(() => {
    if (!isMestre && mesaDados?.mapaBloqueado && abaAtiva === 'mapa') {
      setAbaAtiva('combate');
    }
  }, [mesaDados?.mapaBloqueado, isMestre, abaAtiva]);

  let indiceUltimoCombate = -1;
  if (mesaDados?.historico) {
    for (let i = mesaDados.historico.length - 1; i >= 0; i--) {
      if (mesaDados.historico[i].tipo === 'limpar_iniciativa') {
        indiceUltimoCombate = i; break;
      }
    }
  }
  const historicoCombate = mesaDados?.historico ? mesaDados.historico.slice(indiceUltimoCombate + 1) : [];
  
  const iniciativaTracker = {};
  
  historicoCombate.forEach(msg => {
    if (msg.tipo === 'remover_iniciativa') {
       const match = msg.conteudo.match(/--- REMOVER INICIATIVA: (.*) ---/);
       if (match && iniciativaTracker[match[1]] !== undefined) {
         delete iniciativaTracker[match[1]];
       }
    }
    if (msg.conteudo.includes('rolou **Iniciativa**')) {
      const match = msg.conteudo.match(/\*\*\s*\[\s*(-?\d+)\s*\]\s*\*\*/);
      if (match) iniciativaTracker[msg.remetente] = parseInt(match[1], 10);
    }
  });

  const ordemIniciativa = Object.entries(iniciativaTracker).sort((a,b) => b[1] - a[1]);
  const turnoAtual = mesaDados?.turnoAtual || 0;

  async function avancarTurno() {
    if (!isMestre) return;
    const proximo = (turnoAtual + 1) % ordemIniciativa.length;
    await updateDoc(doc(db, "mesas", codigoSala), { turnoAtual: proximo });
  }

  function adicionarMonstroIniciativa() {
    const nome = prompt("Nome do Monstro/NPC:");
    if (!nome) return;
    const ini = prompt(`Valor da Iniciativa de ${nome}:`);
    if (!ini) return;
    enviarMensagemOuDado(nome, `rolou **Iniciativa**: d20(?) = **[ ${ini} ]**`, "sistema");
  }

  function removerDaIniciativa(nome) {
    if (!isMestre) return;
    enviarMensagemOuDado("Sistema", `--- REMOVER INICIATIVA: ${nome} ---`, "remover_iniciativa");
  }

  const listaNpcs = mesaDados?.npcs || [];

  // ==========================================
  // 👹 ADICIONAR MONSTRO COM RETRATO E FACÇÃO
  // ==========================================
  async function adicionarCapanga() {
    if (!isMestre) return;
    const nome = prompt("Nome do Inimigo/NPC (Ex: Goblin 1):");
    if (!nome) return;
    const hp = parseInt(prompt(`Vida Máxima de ${nome}:`), 10);
    if (!hp || hp <= 0) return;
    
    const urlFoto = prompt("Cole a URL da imagem do token (ou deixe em branco para usar emoji):") || "";

    // 👇 NOVA PERGUNTA: FACÇÃO 👇
    const faccaoOpcao = prompt("Qual a aliança desse NPC?\n1 = 🔴 Hostil (Inimigo)\n2 = 🟡 Neutro (Povo local)\n3 = 🟢 Aliado (Amigo)", "1");
    let faccao = "hostil";
    if (faccaoOpcao === "2") faccao = "neutro";
    if (faccaoOpcao === "3") faccao = "aliado";

    const novoNPC = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      nome: nome,
      vidaMaxima: hp,
      vidaAtual: hp,
      foto: urlFoto.trim(),
      faccao: faccao // 👈 SALVANDO A FACÇÃO NO BANCO
    };

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: arrayUnion(novoNPC) });
    } catch (e) { console.error("Erro ao adicionar NPC:", e); }
  }

  async function adicionarNpcDoBestiario(nomeBase, dadosNpc) {
    if (!isMestre) return;

    // A MÁGICA DA NUMERAÇÃO: Se já tem "Goblin", ele cria o "Goblin 2", "Goblin 3", etc.
    const qtdExistente = listaNpcs.filter(n => n.nome.startsWith(nomeBase)).length;
    const nomeFinal = qtdExistente > 0 ? `${nomeBase} ${qtdExistente + 1}` : nomeBase;

    const novoNPC = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      nome: nomeFinal,
      vidaMaxima: dadosNpc.hp,
      vidaAtual: dadosNpc.hp,
      foto: dadosNpc.foto || "",
      faccao: dadosNpc.faccao || "hostil"
    };

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: arrayUnion(novoNPC) });
      setModalNpcAberto(false); // Fecha o modal depois de invocar!
    } catch (e) { console.error("Erro ao adicionar NPC do bestiário:", e); }
  }

  async function apagarCapanga(npcId) {
    if (!isMestre) return;
    const novaLista = listaNpcs.filter(n => n.id !== npcId);
    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: novaLista });
    } catch (e) { console.error("Erro ao remover NPC:", e); }
  }

  async function alterarVidaNpc(acao) {
    if (!isMestre || !modalHpNpc) return;
    const npcAlvo = listaNpcs.find(n => n.id === modalHpNpc);
    if (!npcAlvo) return;

    const valor = parseInt(valorHpInput) || 0;
    if (valor <= 0) return;

    let novaVida = npcAlvo.vidaAtual;
    if (acao === 'dano') novaVida = Math.max(0, npcAlvo.vidaAtual - valor);
    if (acao === 'cura') novaVida = Math.min(npcAlvo.vidaMaxima, npcAlvo.vidaAtual + valor);

    const novaLista = listaNpcs.map(n => n.id === modalHpNpc ? { ...n, vidaAtual: novaVida } : n);

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: novaLista });
      enviarMensagemOuDado("👑 Mestre", `${acao === 'dano' ? 'causou' : 'curou'} **${valor} PV** em *${npcAlvo.nome}*`, "sistema");
      setModalHpNpc(null);
      setValorHpInput("");
    } catch (error) { console.error("Erro ao alterar vida NPC:", error); }
  }

  async function abrirModalDeFichas() {
    setModalAberto(true);
    if (minhasFichasDados.length > 0) return;
    setCarregandoFichas(true);
    try {
      const carregadas = [];
      for (let id of minhasFichasIDs) {
        const snap = await getDoc(doc(db, "personagens", id));
        if (snap.exists()) carregadas.push({ id: snap.id, ...snap.data() });
      }
      setMinhasFichasDados(carregadas);
    } catch (error) { console.error(error); } finally { setCarregandoFichas(false); }
  }

  async function entrarNaMesaComFicha(idEscolhido) {
    try {
      await updateDoc(doc(db, "mesas", codigoSala), { jogadores: arrayUnion(idEscolhido) });
      setModalAberto(false);
    } catch (error) { console.error(error); }
  }

  async function removerDaMesa(idFicha) {
    if (!isMestre && !minhasFichasIDs.includes(idFicha)) return; 
    try {
      await updateDoc(doc(db, "mesas", codigoSala), { jogadores: arrayRemove(idFicha) });
      setFichaParaRemover(null);
    } catch (error) { console.error(error); }
  }

  async function alterarVidaDoJogador(acao) {
    if (!isMestre || !modalHp) return; 
    const fichaAfetada = jogadores[modalHp];
    if (!fichaAfetada) return;

    const valor = parseInt(valorHpInput) || 0;
    if (valor <= 0) return;

    const vidaMax = fichaAfetada.vidaMaxima || 1;
    const vidaAtual = fichaAfetada.vidaAtual !== undefined ? fichaAfetada.vidaAtual : vidaMax;
    
    let novaVida = vidaAtual;
    if (acao === 'dano') novaVida = Math.max(0, vidaAtual - valor);
    if (acao === 'cura') novaVida = Math.min(vidaMax, vidaAtual + valor);

    try {
      await updateDoc(doc(db, "personagens", modalHp), { vidaAtual: novaVida });
      enviarMensagemOuDado("👑 Mestre", `${acao === 'dano' ? 'causou' : 'curou'} **${valor} PV** em *${fichaAfetada.nome}*`, "sistema");
      setModalHp(null);
      setValorHpInput("");
    } catch (error) { console.error(error); }
  }

  async function alternarCondicao(fichaId, nomeFicha, condicaoId) {
    const ficha = jogadores[fichaId];
    if (!ficha) return;
    const temCondicao = ficha.condicoes?.includes(condicaoId);
    try {
      await updateDoc(doc(db, "personagens", fichaId), {
        condicoes: temCondicao ? arrayRemove(condicaoId) : arrayUnion(condicaoId)
      });
      if (!temCondicao) enviarMensagemOuDado("👑 Mestre", `O herói *${nomeFicha}* agora está **${condicaoId}**!`, "sistema");
      else enviarMensagemOuDado("👑 Mestre", `O herói *${nomeFicha}* curou a condição **${condicaoId}**!`, "sistema");
    } catch (error) { console.error("Erro ao aplicar condição:", error); }
  }

  async function enviarMensagemOuDado(remetente, conteudo, tipo = "chat") {
    try {
      await updateDoc(doc(db, "mesas", codigoSala), {
        historico: arrayUnion({
          id: Date.now() + Math.random(),
          remetente, conteudo, tipo,
          hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        })
      });
    } catch (error) { console.error(error); }
  }

  async function rolarDadoRapido(faces) {
    if (usarDado3D && window.dispararDado3D) {
      window.dispararDado3D(`1d${faces}`);
    } else {
      const r = Math.floor(Math.random() * faces) + 1;
      enviarMensagemOuDado(nomeRemetente, `rolou um d${faces} 🎲 Resultado: **[ ${r} ]**`, "dado");
    }
  }

  // 👇 VERSÃO ADAPTADA PARA A MESA: ROLAGEM RÁPIDA DO MESTRE 👇
  function finalizarRolagem3D(total) {
    // Se o mestre tinha um dado rápido esperando para cair (ex: "d20", "d6")
    if (dadoPendenteNome) {
      enviarMensagemOuDado(
        nomeRemetente, 
        `rolou um ${dadoPendenteNome} 3D 🎲 Resultado: **[ ${total} ]**`, 
        "dado"
      );
      setDadoPendenteNome(null); // Limpa a trava
    }
  }

  async function limparChat() {
    if (!isMestre) return;
    if (window.confirm("Tem certeza que deseja apagar todo o histórico da mesa?")) {
      await updateDoc(doc(db, "mesas", codigoSala), { historico: [] });
    }
  }

  async function handleEnviarImagem(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Aviso visual pro mestre/jogador saber que a foto tá subindo
    enviarMensagemOuDado(nomeRemetente, "⏳ Enviando imagem para a mesa...", "sistema");

    const formData = new FormData();
    formData.append("image", file);

    try {
      // 🛡️ Manda pro "Guarda-Costas" (A sua rota /api/upload na Vercel)
      const resposta = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const dados = await resposta.json();

      if (dados.success) {
        // Sucesso! Envia a URL limpa pro chat!
        enviarMensagemOuDado(nomeRemetente, dados.url, "imagem");
      } else {
        alert("Erro ao subir a imagem.");
        enviarMensagemOuDado(nomeRemetente, "❌ Falha no envio da imagem.", "sistema");
      }
    } catch (error) {
      console.error("Erro no Upload do Chat:", error);
      alert("Ocorreu um erro na conexão. Verifique sua internet.");
    }
  }

  if (erro) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Mesa não encontrada! O código {codigoSala} está correto?</div>;
  if (!mesaDados) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Carregando a Taverna...</div>;

  return (
    <div className="mesa-layout-global" onClick={() => setMenuCondicoesFicha(null)}>

      <CaixaDeDados aoTerminarDeRolar={finalizarRolagem3D} />
      
      {modalAberto && (
        <div className="overlay-modal" onClick={() => setModalAberto(false)}>
          <div className="modal-fichas" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContext: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#ffcc00' }}>Escolha seu Herói</h3>
              <button onClick={() => setModalAberto(false)} style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.2rem' }}>✖</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '20px' }}>Selecione com qual personagem você deseja entrar na mesa <strong>{mesaDados.nome}</strong>.</p>
            <div className="lista-fichas-modal">
              {carregandoFichas && <p style={{textAlign: 'center', color: '#666'}}>Buscando na taverna...</p>}
              {!carregandoFichas && minhasFichasDados.length === 0 && <p style={{textAlign: 'center', color: '#ff5555'}}>Você não possui nenhuma ficha criada neste PC.</p>}
              {!carregandoFichas && minhasFichasDados.map(ficha => {
                const jaEstaNaMesa = mesaDados.jogadores?.includes(ficha.id);
                return (
                  <div key={ficha.id} className="card-ficha-modal" onClick={() => !jaEstaNaMesa && entrarNaMesaComFicha(ficha.id)} style={{ opacity: jaEstaNaMesa ? 0.5 : 1, cursor: jaEstaNaMesa ? 'not-allowed' : 'pointer' }}>
                    <div className="modal-avatar-circle">{ficha.foto ? <img src={ficha.foto} alt={ficha.nome} /> : <span>{ficha.nome?.charAt(0) || "?"}</span>}</div>
                    <div className="modal-ficha-info">
                      <strong style={{ display: 'block', color: '#fff' }}>{ficha.nome}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{ficha.classe} (Lv {ficha.nivel})</span>
                    </div>
                    {jaEstaNaMesa && <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#4caf50', fontWeight: 'bold' }}>Já na Mesa</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {modalHp && isMestre && (
        <div className="overlay-modal" onClick={() => { setModalHp(null); setValorHpInput(""); }}>
          <div className="modal-fichas" onClick={(e) => e.stopPropagation()} style={{ width: '300px', textAlign: 'center', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#fff' }}>Alterar HP (Jogador)</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>Modificando a vida de <strong>{jogadores[modalHp]?.nome}</strong></p>
            <input type="number" placeholder="Digite o valor..." value={valorHpInput} onChange={e => setValorHpInput(e.target.value)} onFocus={e => e.target.select()} style={{ width: '100%', padding: '15px', fontSize: '1.2rem', textAlign: 'center', background: '#111', border: '1px solid #444', color: '#fff', borderRadius: '8px', marginBottom: '20px', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button onClick={() => alterarVidaDoJogador('dano')} style={{ flex: 1, padding: '12px', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💔 Dano</button>
              <button onClick={() => alterarVidaDoJogador('cura')} style={{ flex: 1, padding: '12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💚 Cura</button>
            </div>
          </div>
        </div>
      )}

      {modalNpcAberto && isMestre && (
        <div className="overlay-modal" onClick={() => setModalNpcAberto(false)}>
          <div className="modal-fichas" onClick={(e) => e.stopPropagation()} style={{ border: '2px solid #ff4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#ff4444' }}>Adicionar Ameaça</h3>
              <button onClick={() => setModalNpcAberto(false)} style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.2rem' }}>✖</button>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '15px' }}>Escolha um NPC do Bestiário para adicionar rapidamente à mesa:</p>

            <div className="lista-fichas-modal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Object.entries(BESTIARIO).map(([nome, info]) => (
                <div
                  key={nome}
                  onClick={() => adicionarNpcDoBestiario(nome, info)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#252525', border: '1px solid #444', padding: '10px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#ff4444'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#444'}
                >
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    {info.foto ? <img src={info.foto} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👹'}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'white' }}>{nome}</strong>
                    <span style={{ fontSize: '0.7rem', color: '#aaa' }}>{info.hp} HP | {info.faccao}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '15px', textAlign: 'center' }}>
              <button 
                onClick={() => { setModalNpcAberto(false); adicionarCapanga(); }} 
                style={{ background: 'transparent', color: '#ffcc00', border: '1px dashed #ffcc00', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                + Criar NPC Customizado (Prompt)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mesa-header">
        <Link to="/" className="btn-voltar-lobby">⬅ Sair da Mesa</Link>
        <div>
          <h1>⚔️ {mesaDados.nome} {isMestre && <span title="Você é o Mestre!" style={{cursor:'help'}}>👑</span>}</h1>
          <p>Código de Convite: <strong style={{color:'#ffcc00', letterSpacing:'2px'}}>{codigoSala}</strong></p>
        </div>
        
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
           <button 
             onClick={() => setAbaAtiva('combate')} 
             style={{ background: abaAtiva === 'combate' ? '#ffcc00' : '#333', color: abaAtiva === 'combate' ? 'black' : 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: '0.2s' }}
           >
             ⚔️ Combate
           </button>
           <button 
             onClick={() => setAbaAtiva('mapa')} 
             style={{ background: abaAtiva === 'mapa' ? '#3498db' : '#333', color: abaAtiva === 'mapa' ? 'white' : 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: '0.2s' }}
           >
             🗺️ Mapa Virtual
           </button>

           {isMestre && (
             <button
               onClick={async () => {
                 await updateDoc(doc(db, "mesas", codigoSala), { mapaBloqueado: !mesaDados?.mapaBloqueado });
               }}
               style={{
                 background: mesaDados?.mapaBloqueado ? '#f44336' : '#4caf50',
                 color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
               }}
               title={mesaDados?.mapaBloqueado ? "Desbloquear Mapa para Jogadores" : "Bloquear Mapa para Jogadores"}
             >
               {mesaDados?.mapaBloqueado ? '🔒 Trancado' : '🔓 Liberado'}
             </button>
           )}
           
           <button 
             onClick={() => setMostrarChat(!mostrarChat)} 
             style={{ background: mostrarChat ? '#f44336' : '#4caf50', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: '0.2s' }}
             title={mostrarChat ? "Esconder o painel lateral" : "Mostrar o painel lateral"}
           >
             {mostrarChat ? '💬 Ocultar Chat' : '💬 Abrir Chat'}
           </button>

           <button className="btn-entrar-ficha" onClick={abrirModalDeFichas} style={{marginLeft: '10px'}}>➕ Entrar com Ficha</button>
        </div>
      </div>

      <div className="grid-mesa-com-chat" style={{ gridTemplateColumns: mostrarChat ? '1fr 350px' : '1fr' }}>
        
        {abaAtiva === 'mapa' ? (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#111', borderRadius: '10px', overflow: 'hidden', border: '1px solid #333' }}>
            <MapaVirtual 
              mesaId={codigoSala} 
              mesaDados={mesaDados} 
              jogadores={jogadores} 
              npcs={listaNpcs} 
              isMestre={isMestre} 
              minhasFichasIDs={minhasFichasIDs}
            />
          </div>
        ) : (
          <div className="area-principal-cards">
            
            <h2 className="titulo-secao-mesa">🛡️ Heróis da Mesa</h2>
            <div className="area-cards-jogadores">
              {!mesaDados.jogadores || mesaDados.jogadores.length === 0 ? (
                <div className="aviso-vazio-mesa"><p>Nenhum herói na mesa.</p></div>
              ) : (
                Object.values(jogadores).map(ficha => {
                  const vidaMax = ficha.vidaMaxima || 1;
                  const vidaAtual = ficha.vidaAtual !== undefined ? ficha.vidaAtual : vidaMax;
                  const porcentagem = (vidaAtual / vidaMax) * 100;
                  const corVida = porcentagem > 50 ? '#4caf50' : porcentagem > 20 ? '#ff9800' : '#f44336';

                  const modDes = Math.floor(((ficha.destreza || 10) - 10) / 2);
                  const valorCA = ficha.ca || ficha.classeArmadura || (10 + modDes + (ficha.bonusCA || 0));
                  const valorDeslocamento = ficha.deslocamento || 30;

                  const profBonus = Math.ceil((ficha.nivel || 1) / 4) + 1;
                  const modSab = Math.floor(((ficha.sabedoria || 10) - 10) / 2);
                  let bonusTreinoPerc = 0;
                  if (ficha.periciasTreinadas?.["Percepção"] === "proficiente") bonusTreinoPerc = profBonus;
                  if (ficha.periciasTreinadas?.["Percepção"] === "expertise") bonusTreinoPerc = profBonus * 2;
                  const valorPercPassiva = 10 + modSab + bonusTreinoPerc;

                  const possoRemover = isMestre || minhasFichasIDs.includes(ficha.id);
                  const exibindoConfirmacao = fichaParaRemover === ficha.id;
                  
                  const condicoesAtivas = ficha.condicoes || [];
                  const estaMorto = vidaAtual === 0;

                  return (
                    <div key={ficha.id} className="card-mestre" style={{ borderColor: estaMorto ? '#ff4444' : '#444' }}>
                      <div className="card-mestre-topo">
                        <div className="mestre-avatar" style={{ filter: estaMorto ? 'grayscale(100%) brightness(50%)' : 'none' }}>
                          {ficha.foto ? <img src={ficha.foto} alt={ficha.nome} /> : <span>{ficha.nome?.charAt(0) || "?"}</span>}
                        </div>
                        <div className="mestre-info" style={{ flex: 1 }}>
                          <h3 style={{margin: 0, color: estaMorto ? '#ff4444' : '#ffcc00'}}>{ficha.nome}</h3>
                          <span style={{fontSize: '0.8rem', color: '#aaa'}}>{ficha.classe} (Lv {ficha.nivel})</span>
                        </div>
                        
                        {possoRemover && (
                          <div className="acoes-card-mestre">
                            {exibindoConfirmacao ? (
                              <button onClick={() => removerDaMesa(ficha.id)} style={{ background: '#f44336', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>Certeza?</button>
                            ) : (
                              <button onClick={() => setFichaParaRemover(ficha.id)} style={{ background: 'transparent', color: '#666', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Sair</button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="card-mestre-status">
                        <div className="status-item"><span className="label">🛡️ CA</span><span className="valor">{valorCA}</span></div>
                        <div className="status-item"><span className="label">🏃 Desl.</span><span className="valor">{valorDeslocamento}</span></div>
                        <div className="status-item" title="Percepção Passiva"><span className="label">👀 P.P</span><span className="valor">{valorPercPassiva}</span></div>
                      </div>

                      <div className="area-condicoes" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '-5px' }}>
                        {estaMorto && <span className="badge-condicao" style={{borderColor:'#ff4444', color:'#ff4444fixed'}} title="Inconsciente">😴 Inconsciente</span>}
                        {condicoesAtivas.map(c => {
                           const condInfo = LISTA_CONDICOES.find(lc => lc.id === c);
                           return (
                             <span key={c} className="badge-condicao" title={`Remover ${c}`} onClick={(e) => { e.stopPropagation(); isMestre && alternarCondicao(ficha.id, ficha.nome, c); }}>
                               {condInfo?.icon || '❓'} {c}
                             </span>
                           );
                        })}
                        {isMestre && (
                          <div style={{ position: 'relative' }}>
                            <button className="btn-add-condicao" onClick={(e) => { e.stopPropagation(); setMenuCondicoesFicha(menuCondicoesFicha === ficha.id ? null : ficha.id); }}>+ Status</button>
                            {menuCondicoesFicha === ficha.id && (
                              <div className="menu-condicoes-flutuante" onClick={(e) => e.stopPropagation()}>
                                 <div style={{fontSize:'0.65rem', color:'#888', padding:'2px 8px', textTransform:'uppercase', borderBottom:'1px solid #333', marginBottom:'4px'}}>Aplicar Condição</div>
                                 {LISTA_CONDICOES.map(cond => (
                                   <div key={cond.id} className={`item-condicao ${condicoesAtivas.includes(cond.id) ? 'ativo' : ''}`} onClick={() => alternarCondicao(ficha.id, ficha.nome, cond.id)}>
                                     <span>{cond.icon}</span> {cond.id}
                                   </div>
                                 ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="barra-vida-mestre" onClick={() => isMestre && setModalHp(ficha.id)} style={{ cursor: isMestre ? 'pointer' : 'default', marginTop: '5px' }}>
                        <div className="info-vida">
                          <span>HP Atual</span>
                          <div>{isMestre && <span className="texto-editar-hp">✎ Editar</span>}<strong>{vidaAtual} / {vidaMax}</strong></div>
                        </div>
                        <div className="trilho-vida">
                          <div className="preenchimento-vida" style={{ width: `${Math.max(0, porcentagem)}%`, background: corVida }}></div>
                        </div>
                      </div>

                      <a href={`/ficha/${ficha.id}?mesa=${codigoSala}`} target="_blank" rel="noreferrer" className="btn-abrir-ficha-nova-aba">
                        Abrir Ficha Completa ↗
                      </a>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', borderBottom: '2px solid #ff4444', paddingBottom: '10px', marginBottom: '20px' }}>
              <h2 className="titulo-secao-mesa" style={{ margin: 0, border: 'none', padding: 0, color: '#ff4444' }}>Ameaças & NPCs</h2>
              {isMestre && (
                <button onClick={() => setModalNpcAberto(true)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                ➕ Novo NPC
                </button>
              )}
            </div>

            {/* 👇 EXIBIÇÃO DE RETRATOS NOS CARDS DE MONSTROS 👇 */}
            <div className="area-cards-npcs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
              {listaNpcs.length === 0 ? (
                <p style={{ color: '#666', gridColumn: '1 / -1' }}>Nenhuma ameaça na mesa no momento.</p>
              ) : (
                listaNpcs.map(npc => {
                  const porcentagemNpc = Math.min(100, (npc.vidaAtual / npc.vidaMaxima) * 100);
                  const isMorto = npc.vidaAtual === 0;

                  // 👇 LÓGICA DAS CORES E ÍCONES BASEADA NA FACÇÃO 👇
                  let corBaseNpc = '#ff4444'; // Hostil padrão (Vermelho)
                  let iconeFaccao = '👹';
                  if (npc.faccao === 'neutro') { corBaseNpc = '#ffcc00'; iconeFaccao = '😐'; }
                  if (npc.faccao === 'aliado') { corBaseNpc = '#4caf50'; iconeFaccao = '🛡️'; }

                  const corVidaNpc = porcentagemNpc > 50 ? corBaseNpc : porcentagemNpc > 0 ? '#ff9800' : '#555';

                  return (
                    <div key={npc.id} className="card-npc" style={{ background: '#1a1a1a', border: `1px solid ${corBaseNpc}`, borderRadius: '8px', padding: '15px', position: 'relative', opacity: isMorto ? 0.6 : 1 }}>
                      {isMestre && (
                        <button onClick={() => apagarCapanga(npc.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: corBaseNpc, cursor: 'pointer', fontSize: '1rem' }} title="Remover NPC">✖</button>
                      )}

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{
                          width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden',
                          border: isMorto ? '2px solid #555' : `2px solid ${corBaseNpc}`, background: '#111',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.2rem', flexShrink: 0,
                          filter: isMorto ? 'grayscale(100%) brightness(40%)' : 'none'
                        }}>
                          {npc.foto ? (
                            <img src={npc.foto} alt={npc.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span>{isMorto ? '💀' : iconeFaccao}</span>
                          )}
                        </div>
                        <h4 style={{ margin: '0', color: isMorto ? '#888' : '#fff', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                          {npc.nome}
                        </h4>
                      </div>

                      <div className="barra-vida-mestre" onClick={() => isMestre && setModalHpNpc(npc.id)} style={{ cursor: isMestre ? 'pointer' : 'default', padding: '8px', border: `1px solid ${corBaseNpc}` }}>
                        <div className="info-vida" style={{ fontSize: '0.75rem' }}>
                          <span style={{color: '#ccc'}}>{isMorto ? 'Morto' : 'HP'}</span>
                          <div>{isMestre && <span className="texto-editar-hp" style={{color: corBaseNpc}}>✎ Editar</span>}<strong>{npc.vidaAtual} / {npc.vidaMaxima}</strong></div>
                        </div>
                        <div className="trilho-vida" style={{ height: '6px', background: '#333' }}>
                          <div className="preenchimento-vida" style={{ width: `${Math.max(0, porcentagemNpc)}%`, background: corVidaNpc }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {mostrarChat && (
          <div className="painel-lateral-chat" onClick={(e) => e.stopPropagation()}>
            {ordemIniciativa.length > 0 && (
              <div className="painel-iniciativa" style={{ background: '#181818', borderBottom: '2px solid #ffcc00', padding: '12px' }}>
                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                    <span style={{color: '#ffcc00', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase'}}>⚔️ Turnos de Combate</span>
                    {isMestre && (
                       <div style={{display: 'flex', gap: '8px'}}>
                          <button onClick={adicionarMonstroIniciativa} style={{background:'#f44336', border:'none', color:'white', fontSize:'0.7rem', padding:'4px 8px', borderRadius:'3px', cursor:'pointer', fontWeight: 'bold'}} title="Rolar Iniciativa Falsa pro Monstro">+ NPC</button>
                          <button onClick={avancarTurno} style={{background:'#4caf50', border:'none', color:'white', fontSize:'0.7rem', padding:'4px 8px', borderRadius:'3px', cursor:'pointer', fontWeight: 'bold'}}>Passar Turno ➡</button>
                          <button onClick={() => {
                             enviarMensagemOuDado("Sistema", "--- FIM DO COMBATE ---", "limpar_iniciativa");
                             updateDoc(doc(db, "mesas", codigoSala), { turnoAtual: 0 }); 
                          }} style={{background:'transparent', border:'1px solid #555', color:'#aaa', fontSize:'0.7rem', padding:'4px 8px', borderRadius:'3px', cursor:'pointer'}}>Encerrar</button>
                       </div>
                    )}
                 </div>

                 <div style={{display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'5px'}}>
                   {ordemIniciativa.map(([nome, valor], index) => {
                     const isVezDeste = index === turnoAtual;
                     return (
                       <div key={nome} style={{
                         background: isVezDeste ? '#332b00' : '#111', 
                         border: isVezDeste ? '2px solid #ffcc00' : '1px solid #444', 
                         borderRadius: '6px', padding: '5px 10px', display: 'flex', flexDirection: 'column', 
                         alignItems: 'center', minWidth: '65px', transition: 'all 0.3s', position: 'relative'
                       }}>
                         {isMestre && (
                           <button 
                             onClick={() => removerDaIniciativa(nome)}
                             style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#f44336', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                             title="Remover do Combate"
                           >✖</button>
                         )}
                         <span style={{fontSize: '1.2rem', fontWeight: 'bold', color: isVezDeste ? '#ffcc00' : 'white'}}>{valor}</span>
                         <span style={{fontSize: '0.65rem', color: isVezDeste ? '#fff' : '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%'}}>{nome}</span>
                       </div>
                     );
                   })}
                 </div>
              </div>
            )}

            {isMestre && (
              <div className="aba-rolamento-mestre" style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px'}}>
                    <span style={{fontSize: '0.7rem', color: '#aaa'}}>🎲 Rolar d20 Rápido:</span>
                    <label style={{fontSize: '0.7rem', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
                      <input type="checkbox" checked={usarDado3D} onChange={(e) => {
                        setUsarDado3D(e.target.checked);
                        localStorage.setItem('usarDado3D', e.target.checked);
                      }} />
                      Ver Dados 3D
                    </label>
                  </div>
                  <div className="botoes-dados-mestre">
                    {[20, 12, 10, 8, 6, 4].map(f => <button key={f} onClick={() => rolarDadoRapido(f)}>d{f}</button>)}
                  </div>
                </div>
                <button onClick={limparChat} style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', height: 'fit-content' }} title="Limpar Histórico">🗑️ Limpar Chat</button>
              </div>
            )}

            <div className="historico-mensagens-scroll" ref={scrollRef}>
              {(!mesaDados.historico || mesaDados.historico.length === 0) && (
                <p style={{textAlign:'center', color:'#555', fontSize:'0.9rem', marginTop:'30px'}}>Nenhum dado rolado na sessão ainda...</p>
              )}
              {mesaDados.historico?.map(msg => {
                if (msg.tipo === 'remover_iniciativa') return null;
                if (msg.tipo === 'limpar_iniciativa') {
                  return (
                    <div key={msg.id} style={{ textAlign: 'center', color: '#f44336', fontWeight: 'bold', margin: '15px 0', borderBottom: '1px dashed #f44336', lineHeight: '0.1em' }}>
                      <span style={{ background: '#111', padding: '0 10px' }}>⚔️ Combate Encerrado ⚔️</span>
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className={`item-msg-chat ${msg.tipo}`}>
                    <div className="meta-msg">
                      <span className="autor" style={{ color: msg.remetente === "👑 Mestre" ? "#ffcc00" : "" }}>{msg.remetente}</span>
                      <span className="hora">{msg.hora}</span>
                    </div>
                    {msg.tipo === 'imagem' ? (
                      <img src={msg.conteudo} alt="Handout" style={{maxWidth: '100%', borderRadius: '6px', marginTop: '5px', cursor: 'zoom-in', border: '1px solid #444fixed'}} onClick={() => window.open(msg.conteudo, '_blank')} />
                    ) : (
                      <div className="corpo-msg" dangerouslySetInnerHTML={{__html: msg.conteudo.replace(/\*\/(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}}></div>
                    )}
                  </div>
                );
              })}
            </div>

            <form className="input-chat-container" onSubmit={(e) => {
              e.preventDefault();
              if(!textoChat.trim()) return;
              enviarMensagemOuDado(nomeRemetente, textoChat.trim(), "chat");
              setTextoChat("");
            }}>
              <label className="btn-upload-imagem-chat" title="Enviar Imagem">
                🖼️
                <input type="file" accept="image/*" onChange={handleEnviarImagem} hidden />
              </label>
              <input type="text" placeholder={`Falar como ${nomeRemetente}...`} value={textoChat} onChange={e => setTextoChat(e.target.value)} />
              <button type="submit">Enviar</button>
            </form>
          </div>
        )}
      </div>
      
      <style>{`
        .overlay-modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-fichas { background: #1a1a1a; padding: 25px; border-radius: 12px; border: 1px solid #444; width: 450px; max-width: 90%; max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.8); animation: fadeIn 0.2s ease-out; }
        .lista-fichas-modal { overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 5px; }
        .card-ficha-modal { display: flex; align-items: center; gap: 15px; padding: 12px; background: #252525; border: 1px solid #333; border-radius: 8px; transition: 0.2s; }
        .card-ficha-modal:hover { background: #333; border-color: #ffcc00; transform: translateX(5px); }
        .modal-avatar-circle { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; background: #111; border: 1px solid #555; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #ffcc00; flex-shrink: 0; }
        .modal-avatar-circle img { width: 100%; height: 100%; object-fit: cover; }

        .mesa-layout-global { padding: 25px; max-width: 1400px; margin: 0 auto; color: white; display: flex; flex-direction: column; height: 95vh; box-sizing: border-box; }
        .mesa-header { display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; padding: 15px 25px; border-radius: 10px; border: 1px solid #333; margin-bottom: 20px; flex-shrink: 0; }
        .mesa-header h1 { margin: 0; font-size: 1.6rem; }
        .mesa-header p { margin: 2px 0 0 0; color: #888; font-size: 0.9rem; }
        
        .btn-voltar-lobby { background: #333; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: 0.2s; }
        .btn-voltar-lobby:hover { background: #555; }
        .btn-entrar-ficha { background: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 1rem; }
        .btn-entrar-ficha:hover { background: #45a049; }

        .grid-mesa-com-chat { display: grid; gap: 25px; flex: 1; min-height: 0; transition: grid-template-columns 0.3s ease; }
        
        .area-principal-cards { display: flex; flex-direction: column; overflow-y: auto; align-content: start; padding-right: 10px; }
        .titulo-secao-mesa { font-size: 1.2rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 15px; margin-top: 0;}
        .area-cards-jogadores { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

        .aviso-vazio-mesa { grid-column: 1 / -1; text-align: center; padding: 50px; background: #1a1a1a; border-radius: 12px; border: 1px dashed #444; color: #666; }
        .aviso-vazio-mesa p { font-size: 1.5rem; margin-bottom: 10px; }

        .card-mestre { background: #222; border: 1px solid #444; border-radius: 10px; padding: 20px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); position: relative; transition: 0.3s; }
        .card-mestre-topo { display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #333; padding-bottom: 15px; }
        .mestre-avatar { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #555; overflow: hidden; background: #111; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; color: #888; flex-shrink: 0; transition: 0.3s; }
        .mestre-avatar img { width: 100%; height: 100%; object-fit: cover; }
        
        .card-mestre-status { display: flex; justify-content: space-between; background: #111; padding: 10px; border-radius: 6px; border: 1px solid #333; }
        .status-item { display: flex; flex-direction: column; align-items: center; }
        .status-item .label { font-size: 0.7rem; color: #aaa; text-transform: uppercase; margin-bottom: 3px; }
        .status-item .valor { font-weight: bold; font-size: 1.1rem; color: #fff; }

        .badge-condicao { background: #332b00; border: 1px solid #ffcc00; color: #ffcc00; padding: 2px 6px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s; }
        .badge-condicao:hover { background: #ffcc00; color: black; }
        .btn-add-condicao { background: transparent; border: 1px dashed #666; color: #aaa; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; cursor: pointer; transition: 0.2s; }
        .btn-add-condicao:hover { border-color: #ffcc00; color: #ffcc00; }
        
        .menu-condicoes-flutuante { position: absolute; top: 100%; left: 0; margin-top: 5px; background: #1a1a1a; border: 1px solid #444; border-radius: 6px; padding: 5px; width: 180px; z-index: 50; max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .item-condicao { padding: 5px 8px; font-size: 0.8rem; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 8px; color: #ccc; transition: 0.1s; }
        .item-condicao:hover { background: #333; color: white; }
        .item-condicao.ativo { background: #4caf5022; color: #4caf50; border-left: 2px solid #4caf50; }

        .barra-vida-mestre { background: #111; padding: 10px; border-radius: 6px; border: 1px solid #333; transition: 0.2s; position: relative; }
        .barra-vida-mestre:hover { border-color: #ffcc00; box-shadow: 0 0 8px rgba(255, 204, 0, 0.3); }

        .texto-editar-hp { font-size: 0.75rem; color: #ffcc00; opacity: 0; transition: 0.2s; margin-right: 10px; }
        .barra-vida-mestre:hover .texto-editar-hp { opacity: 1; }

        .info-vida { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; margin-bottom: 5px; color: #ccc; }
        .trilho-vida { width: 100%; height: 10px; background: #333; border-radius: 5px; overflow: hidden; }
        .preenchimento-vida { height: 100%; transition: width 0.3s ease, background-color 0.3s ease; }

        .btn-abrir-ficha-nova-aba { text-align: center; display: block; padding: 8px; background: #333; color: #aaa; text-decoration: none; border-radius: 4px; font-size: 0.85rem; transition: 0.2s; }
        .btn-abrir-ficha-nova-aba:hover { background: #ffcc00; color: black; font-weight: bold; }

        .painel-lateral-chat { background: #1a1a1a; border: 1px solid #333; border-radius: 10px; display: flex; flex-direction: column; overflow: hidden; height: 100%; box-shadow: 0 4px 10px rgba(0,0,0,0.4); animation: fadeIn 0.2s ease-out; }
        .aba-rolamento-mestre { background: #222; padding: 10px; border-bottom: 1px solid #333; font-size: 0.8rem; color: #aaa; }
        .botoes-dados-mestre { display: flex; gap: 5px; margin-top: 5px; }
        .botoes-dados-mestre button { flex: 1; padding: 6px; background: #333; border: 1px solid #444; border-radius: 4px; color: #ffcc00; font-weight: bold; cursor: pointer; font-size: 0.85rem; transition: 0.2s; }
        .botoes-dados-mestre button:hover { background: #ffcc00; color: #000; }

        .historico-mensagens-scroll { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: #111; }
        .item-msg-chat { padding: 8px 12px; border-radius: 6px; background: #1e1e1e; border-left: 3px solid #666; max-width: 95%; font-size: 0.9rem; animation: fadeIn 0.2s ease-out; }
        .item-msg-chat.dado { border-left-color: #ffcc00; background: linear-gradient(90deg, rgba(255,204,0,0.05) 0%, #1e1e1e 100%); }
        .item-msg-chat.sistema { border-left-color: #4caf50; background: rgba(76,175,80,0.02); font-style: italic; color: #aaa; }
        .item-msg-chat.imagem { border-left-color: #3498db; background: transparent; padding: 0; }

        .meta-msg { display: flex; justify-content: space-between; font-size: 0.7rem; color: #666; margin-bottom: 4px; }
        .meta-msg .autor { font-weight: bold; color: #aaa; }
        .item-msg-chat.dado .meta-msg .autor { color: #ffcc00; }
        .corpo-msg { color: #eee; line-height: 1.4; word-break: break-word; }

        .input-chat-container { display: flex; padding: 10px; background: #222; border-top: 1px solid #333; gap: 8px; align-items: stretch; }
        .btn-upload-imagem-chat { background: #333; border: 1px solid #444; border-radius: 4px; display: flex; align-items: center; justify-content: center; padding: 0 15px; cursor: pointer; transition: 0.2s; font-size: 1.2rem; }
        .btn-upload-imagem-chat:hover { background: #444; border-color: #ffcc00; }
        .input-chat-container input[type="text"] { flex: 1; padding: 10px; background: #111; border: 1px solid #444; color: white; border-radius: 4px; font-size: 0.9rem; }
        .input-chat-container button { padding: 0 15px; background: #4caf50; border: none; color: white; font-weight: bold; border-radius: 4px; cursor: pointer; transition: 0.2s; }
        .input-chat-container button:hover { background: #45a049; }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}