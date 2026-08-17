// src/pages/Mesa.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, getDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { MapaVirtual } from '../components/MapaVirtual';
import { CaixaDeDados } from '../components/CaixaDeDados';
import { BESTIARIO } from '../data/bestiario';
import { ARMAS } from '../data/armas'; 
import itensMagicos from '../data/itensMagicos';
import { aplicarEfeitos } from '../utils/motorDeEfeitos';
import { TALENTOS } from '../data/talentos';
import { calcularStatusGlobais } from '../utils/calculadoras';

const LISTA_CONDICOES = [
  { id: "Agarrado", icon: "🤼" }, { id: "Amedrontado", icon: "😱" },
  { id: "Atordoado", icon: "💫" }, { id: "Caído", icon: "⏬" },
  { id: "Cego", icon: "🦇" }, { id: "Enfeitiçado", icon: "💖" },
  { id: "Envenenado", icon: "🤢" }, { id: "Exaustão", icon: "😫" },
  { id: "Impedido", icon: "⛓️" }, { id: "Incapacitado", icon: "😵" },
  { id: "Inconsciente", icon: "😴" }, { id: "Invisível", icon: "👻" },
  { id: "Paralisado", icon: "⚡" }, { id: "Petrificado", icon: "🗿" },
  { id: "Surdo", icon: "🙉" }, { id: "Bless", icon: "🙏" }, { id: "Bane", icon: "☠️" },
  { id: "Fúria", icon: "💢" }, { id: "Matador de Colossos", icon: "🗡️" },
  { id: "Ataque Furtivo", icon: "🥷" }, { id: "Marca do Caçador", icon: "👁️" } 
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

  const [modalLootAberto, setModalLootAberto] = useState(false);
  const [buscaLoot, setBuscaLoot] = useState("");
  const [itemSelecionadoLoot, setItemSelecionadoLoot] = useState(null);

  const [modalTalentoMesaAberto, setModalTalentoMesaAberto] = useState(false);
  const [buscaTalentoMesa, setBuscaTalentoMesa] = useState("");
  const [talentoSelecionadoMesa, setTalentoSelecionadoMesa] = useState(null);

  const [mostrarRolador, setMostrarRolador] = useState(false);
  const [avulsoQtd, setAvulsoQtd] = useState(1);
  const [avulsoFaces, setAvulsoFaces] = useState(20);
  const [avulsoMod, setAvulsoMod] = useState(0);

  // ESTADO DE CRIAÇÃO DO NPC (COMPLETÃO E PADRONIZADO)
  const [modalCustomNpc, setModalCustomNpc] = useState(false);
  const [formNpc, setFormNpc] = useState({ 
    nome: '', hp: '', ca: '', ini: '', foto: '', faccao: 'hostil',
    atributos: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 },
    ataque1: { nome: '', acerto: '', dano: '', tipo: 'Concussão' },
    ataque2: { nome: '', acerto: '', dano: '', tipo: 'Cortante' }
  });
  const [npcEditandoId, setNpcEditandoId] = useState(null);

  const [dialogo, setDialogo] = useState({ ativo: false, tipo: '', titulo: '', mensagem: '', acaoConfirmar: null });

  const [bestiarioCampanha, setBestiarioCampanha] = useState([]);

  useEffect(() => {
    if (!isMestre) return;
    const subColRef = collection(db, "mesas", codigoSala, "bestiario_campanha");
    const unsub = onSnapshot(subColRef, (snap) => {
      const lista = [];
      snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
      setBestiarioCampanha(lista);
    });
    return () => unsub();
  }, [codigoSala, isMestre]);

  function abrirAlert(titulo, mensagem, acaoConfirmar = null) {
    setDialogo({ ativo: true, tipo: 'alert', titulo, mensagem, acaoConfirmar });
  }

  function abrirConfirm(titulo, mensagem, acaoConfirmar) {
    setDialogo({ ativo: true, tipo: 'confirm', titulo, mensagem, acaoConfirmar });
  }

  function fecharDialogo() {
    setDialogo({ ativo: false, tipo: '', titulo: '', mensagem: '', acaoConfirmar: null });
  }

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
  const rodadaAtual = mesaDados?.rodadaAtual || 1;

  async function avancarTurno() {
    if (!isMestre) return;
    const proximo = (turnoAtual + 1) % ordemIniciativa.length;
    
    let novaRodada = rodadaAtual;
    if (proximo === 0 && ordemIniciativa.length > 0) {
      novaRodada += 1;
      enviarMensagemOuDado("Sistema", `🔄 **Início da Rodada ${novaRodada}**`, "sistema");
    }

    await updateDoc(doc(db, "mesas", codigoSala), { 
      turnoAtual: proximo,
      rodadaAtual: novaRodada
    });
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

  // MÉTODOS DE FORMATAÇÃO DE DADOS DE NPC
  function formatarAtaquesNpc() {
    const ataquesFormatados = [];
    if (formNpc.ataque1 && formNpc.ataque1.nome) {
      ataquesFormatados.push({
        nome: formNpc.ataque1.nome,
        bonusAtaque: parseInt(formNpc.ataque1.acerto) || 0,
        dano: formNpc.ataque1.dano || "1",
        tipo: formNpc.ataque1.tipo || "Dano"
      });
    }
    if (formNpc.ataque2 && formNpc.ataque2.nome) {
      ataquesFormatados.push({
        nome: formNpc.ataque2.nome,
        bonusAtaque: parseInt(formNpc.ataque2.acerto) || 0,
        dano: formNpc.ataque2.dano || "1",
        tipo: formNpc.ataque2.tipo || "Dano"
      });
    }
    return ataquesFormatados;
  }

  function formatarAtributosNpc() {
    return {
      for: parseInt(formNpc.atributos?.for) || 10, des: parseInt(formNpc.atributos?.des) || 10,
      con: parseInt(formNpc.atributos?.con) || 10, int: parseInt(formNpc.atributos?.int) || 10,
      sab: parseInt(formNpc.atributos?.sab) || 10, car: parseInt(formNpc.atributos?.car) || 10
    };
  }

  function limparFormularioNpc() {
    setFormNpc({ 
      nome: '', hp: '', ca: '', ini: '', foto: '', faccao: 'hostil',
      atributos: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 },
      ataque1: { nome: '', acerto: '', dano: '', tipo: 'Concussão' },
      ataque2: { nome: '', acerto: '', dano: '', tipo: 'Cortante' }
    });
  }

  function editarNpcBestiario(npc) {
    const atk1 = npc.ataques && npc.ataques[0] ? { nome: npc.ataques[0].nome, acerto: parseInt(npc.ataques[0].bonusAtaque)||0, dano: npc.ataques[0].dano, tipo: npc.ataques[0].tipo } : { nome: '', acerto: '', dano: '', tipo: 'Concussão' };
    const atk2 = npc.ataques && npc.ataques[1] ? { nome: npc.ataques[1].nome, acerto: parseInt(npc.ataques[1].bonusAtaque)||0, dano: npc.ataques[1].dano, tipo: npc.ataques[1].tipo } : { nome: '', acerto: '', dano: '', tipo: 'Cortante' };

    setFormNpc({
      nome: npc.nome || '',
      hp: parseInt(npc.hp) || parseInt(npc.vidaMaxima) || 10,
      ca: parseInt(npc.ca) || 10,
      ini: parseInt(npc.iniciativa) || parseInt(npc.ini) || 0,
      foto: npc.foto || '',
      faccao: npc.faccao || 'hostil',
      atributos: {
        for: parseInt(npc.atributos?.for) || 10,
        des: parseInt(npc.atributos?.des) || 10,
        con: parseInt(npc.atributos?.con) || 10,
        int: parseInt(npc.atributos?.int) || 10,
        sab: parseInt(npc.atributos?.sab) || 10,
        car: parseInt(npc.atributos?.car) || 10
      },
      ataque1: atk1,
      ataque2: atk2
    });
    setNpcEditandoId(npc.id);
    setModalNpcAberto(false);
    setModalCustomNpc(true);
  }

  async function salvarCapangaFormulario(e) {
    e.preventDefault();
    if (!isMestre || !formNpc.nome) return;
    
    const novoNPC = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      nome: formNpc.nome,
      vidaMaxima: parseInt(formNpc.hp) || 1,
      vidaAtual: parseInt(formNpc.hp) || 1,
      foto: formNpc.foto.trim(),
      faccao: formNpc.faccao,
      ca: parseInt(formNpc.ca) || 10,
      iniciativa: parseInt(formNpc.ini) || 0,
      ataques: formatarAtaquesNpc(), 
      atributos: formatarAtributosNpc() 
    };

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: arrayUnion(novoNPC) });
      setModalCustomNpc(false);
      setModalNpcAberto(false);
      setNpcEditandoId(null); // 👇 Evita o bug fantasma! 👇
      limparFormularioNpc();
    } catch (err) { console.error("Erro ao adicionar NPC:", err); }
  }

  async function salvarNpcNoBestiarioCampanha(e) {
    e.preventDefault();
    if (!isMestre || !formNpc.nome) return;

    const novoModelo = {
      nome: formNpc.nome,
      hp: parseInt(formNpc.hp) || 1,
      ca: parseInt(formNpc.ca) || 10,
      iniciativa: parseInt(formNpc.ini) || 0,
      foto: formNpc.foto.trim(),
      faccao: formNpc.faccao,
      ataques: formatarAtaquesNpc(),
      atributos: formatarAtributosNpc()
    };

    try {
      if (npcEditandoId) {
        // Se tem ID, é pq tava editando! Vamos atualizar em vez de criar um novo.
        await updateDoc(doc(db, "mesas", codigoSala, "bestiario_campanha", npcEditandoId), novoModelo);
        abrirAlert("Sucesso", `A Ameaça '${formNpc.nome}' foi atualizada!`);
      } else {
        // Se não tem ID, é um monstro novinho.
        await addDoc(collection(db, "mesas", codigoSala, "bestiario_campanha"), novoModelo);
        abrirAlert("Sucesso", `A Ameaça '${formNpc.nome}' foi imortalizada no Bestiário da Campanha!`);
      }
      
      setModalCustomNpc(false);
      setNpcEditandoId(null);
      limparFormularioNpc();
    } catch (err) {
      console.error(err);
    }
  }

  async function adicionarNpcDoBestiario(nomeBase, dadosNpc) {
    if (!isMestre) return;

    const qtdExistente = listaNpcs.filter(n => n.nome.startsWith(nomeBase)).length;
    const nomeFinal = qtdExistente > 0 ? `${nomeBase} ${qtdExistente + 1}` : nomeBase;

    // Resiliência de leitura de dados de NPCs antigos
    const hpSafe = parseInt(dadosNpc.hp) || parseInt(dadosNpc.vidaMaxima) || 1;
    const caSafe = parseInt(dadosNpc.ca) || 10;
    const iniSafe = parseInt(dadosNpc.iniciativa) || parseInt(dadosNpc.ini) || 0;

    const novoNPC = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      nome: nomeFinal,
      vidaMaxima: hpSafe,
      vidaAtual: hpSafe,
      foto: dadosNpc.foto || "",
      faccao: dadosNpc.faccao || "hostil",
      ca: caSafe,
      iniciativa: iniSafe,
      ataques: dadosNpc.ataques || [],
      atributos: dadosNpc.atributos || { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 } 
    };

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: arrayUnion(novoNPC) });
      setModalNpcAberto(false); 

      const r = Math.floor(Math.random() * 20) + 1;
      const mod = novoNPC.iniciativa;
      const sinal = mod >= 0 ? `+${mod}` : mod;
      enviarMensagemOuDado(nomeFinal, `entrou na batalha e rolou **Iniciativa**: d20(${r}) ${sinal} = **[ ${r + mod} ]**`, "sistema");

    } catch (e) { 
      console.error("Erro ao adicionar NPC do bestiário:", e); 
    }
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

    // Resiliência extra na leitura da vida do NPC
    const maxHP = parseInt(npcAlvo.vidaMaxima) || parseInt(npcAlvo.hp) || 1;
    let vidaBase = npcAlvo.vidaAtual !== undefined ? npcAlvo.vidaAtual : maxHP;
    
    let novaVida = vidaBase;
    if (acao === 'dano') novaVida = Math.max(0, vidaBase - valor);
    if (acao === 'cura') novaVida = Math.min(maxHP, vidaBase + valor);

    let novasCondicoes = npcAlvo.condicoes || [];
    let msgMorte = "";

    if (novaVida === 0 && vidaBase > 0) {
      novasCondicoes = [...new Set([...novasCondicoes, "Inconsciente", "Caído"])];
      msgMorte = `\n💀 **${npcAlvo.nome}** foi abatido e caiu inconsciente!`;
    } 
    else if (novaVida > 0 && novasCondicoes.includes("Inconsciente")) {
      novasCondicoes = novasCondicoes.filter(c => c !== "Inconsciente");
      msgMorte = `\n💖 **${npcAlvo.nome}** se recuperou!`;
    }

    const novaLista = listaNpcs.map(n => n.id === modalHpNpc ? { ...n, vidaAtual: novaVida, condicoes: novasCondicoes } : n);

    try {
      await updateDoc(doc(db, "mesas", codigoSala), { npcs: novaLista });
      enviarMensagemOuDado("👑 Mestre", `${acao === 'dano' ? 'causou' : 'curou'} **${valor} PV** em *${npcAlvo.nome}*${msgMorte}`, "sistema");
      setModalHpNpc(null);
      setValorHpInput("");
    } catch (error) { console.error("Erro ao alterar vida NPC:", error); }
  }

  async function deletarNpcBestiarioCampanha(idDoc) {
    try {
      await deleteDoc(doc(db, "mesas", codigoSala, "bestiario_campanha", idDoc));
    } catch (e) { console.error(e); }
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

    // 👇 SOLUÇÃO AQUI: Resiliência pra ler o HP antigo ou novo
    const vidaMax = parseInt(fichaAfetada.vidaMaxima) || parseInt(fichaAfetada.hp) || 1;
    const vidaAtual = fichaAfetada.vidaAtual !== undefined ? parseInt(fichaAfetada.vidaAtual) : vidaMax;
    
    let novaVida = vidaAtual;
    if (acao === 'dano') novaVida = Math.max(0, vidaAtual - valor);
    if (acao === 'cura') novaVida = Math.min(vidaMax, vidaAtual + valor);

    let novasCondicoes = fichaAfetada.condicoes || [];
    let msgMorte = "";

    if (novaVida === 0 && vidaAtual > 0) {
      novasCondicoes = [...new Set([...novasCondicoes, "Inconsciente", "Caído"])];
      msgMorte = `\n💀 **${fichaAfetada.nome}** caiu a 0 PVs e desmaiou!`;
    } 
    else if (novaVida > 0 && novasCondicoes.includes("Inconsciente")) {
      novasCondicoes = novasCondicoes.filter(c => c !== "Inconsciente");
      msgMorte = `\n💖 **${fichaAfetada.nome}** recuperou a consciência!`;
    }

    try {
      await updateDoc(doc(db, "personagens", modalHp), { 
        vidaAtual: novaVida,
        condicoes: novasCondicoes
      });
      enviarMensagemOuDado("👑 Mestre", `${acao === 'dano' ? 'causou' : 'curou'} **${valor} PV** em *${fichaAfetada.nome}*${msgMorte}`, "sistema");
      setModalHp(null);
      setValorHpInput("");
    } catch (error) { console.error(error); }
  }

  async function alternarCondicao(alvoId, nomeAlvo, condicaoId, tipoAlvo = 'jogador') {
    if (tipoAlvo === 'jogador') {
      const ficha = jogadores[alvoId];
      if (!ficha) return;
      const temCondicao = ficha.condicoes?.includes(condicaoId);
      try {
        await updateDoc(doc(db, "personagens", alvoId), {
          condicoes: temCondicao ? arrayRemove(condicaoId) : arrayUnion(condicaoId)
        });
        enviarMensagemOuDado("👑 Mestre", `O herói *${nomeAlvo}* ${temCondicao ? 'curou a condição' : 'agora está com'} **${condicaoId}**!`, "sistema");
      } catch (error) {}
    } else {
      const npcAlvo = listaNpcs.find(n => n.id === alvoId);
      if (!npcAlvo) return;
      const conds = npcAlvo.condicoes || [];
      const temCondicao = conds.includes(condicaoId);
      const novasConds = temCondicao ? conds.filter(c => c !== condicaoId) : [...conds, condicaoId];
      
      const novaListaNpcs = listaNpcs.map(n => n.id === alvoId ? { ...n, condicoes: novasConds } : n);
      try {
        await updateDoc(doc(db, "mesas", codigoSala), { npcs: novaListaNpcs });
        enviarMensagemOuDado("👑 Mestre", `Ameaça *${nomeAlvo}* ${temCondicao ? 'perdeu' : 'recebeu'} **${condicaoId}**!`, "sistema");
      } catch (e) {}
    }
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

  function finalizarRolagem3D(total) {
    if (dadoPendenteNome) {
      enviarMensagemOuDado(
        nomeRemetente, 
        `rolou um ${dadoPendenteNome} 3D 🎲 Resultado: **[ ${total} ]**`, 
        "dado"
      );
      setDadoPendenteNome(null);
    }
  }

  function limparChat() {
    if (!isMestre) return;
    abrirConfirm(
      "⚠️ Limpar Chat e Iniciativa",
      "ATENÇÃO: Limpar o chat também apagará a ORDEM DE INICIATIVA do combate atual!\n\nTem certeza que deseja apagar todo o histórico da mesa?",
      async () => {
        await updateDoc(doc(db, "mesas", codigoSala), { historico: [] });
      }
    );
  }

  function rolarDadosAvulsos(e) {
    e.preventDefault();
    const qtd = Math.max(1, parseInt(avulsoQtd) || 1);
    const faces = Math.max(2, parseInt(avulsoFaces) || 20);
    const mod = parseInt(avulsoMod) || 0;

    let total = 0;
    let rolagens = [];
    
    for (let i = 0; i < qtd; i++) {
      const r = Math.floor(Math.random() * faces) + 1;
      rolagens.push(r);
      total += r;
    }
    total += mod;

    const strMod = mod > 0 ? `+${mod}` : mod < 0 ? `${mod}` : "";
    const expressao = `${qtd}d${faces}${strMod}`;
    const detalhes = `[ ${rolagens.join(' + ')} ] ${strMod}`;

    enviarMensagemOuDado(
      nomeRemetente, 
      `rolou **${expressao}** 🎲<br/><small>${detalhes}</small> = <strong style="font-size: 1.2rem; color: #ffcc00;">[ ${total} ]</strong>`, 
      "dado"
    );
    
    setMostrarRolador(false); 
  }

  async function handleEnviarImagem(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!isMestre && !minhaFichaNaMesaID) {
      abrirAlert("Acesso Negado", "🔒 Espectadores não podem enviar imagens no chat.");
      return;
    }

    enviarMensagemOuDado(nomeRemetente, "⏳ Enviando imagem para a mesa...", "sistema");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const resposta = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const dados = await resposta.json();

      if (dados.success) {
        enviarMensagemOuDado(nomeRemetente, dados.url, "imagem");
      } else {
        abrirAlert("Erro", "Erro ao subir a imagem.");
        enviarMensagemOuDado(nomeRemetente, "❌ Falha no envio da imagem.", "sistema");
      }
    } catch (error) {
      console.error("Erro no Upload do Chat:", error);
      abrirAlert("Erro Crítico", "Ocorreu um erro na conexão. Verifique sua internet.");
    }
  }

  if (erro) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Mesa não encontrada! O código {codigoSala} está correto?</div>;
  if (!mesaDados) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Carregando a Taverna...</div>;

  const todosOsItensDoBanco = [
    ...ARMAS.map(a => ({ ...a, isMagico: false, tipoItem: "Arma" })),
    ...Object.values(itensMagicos).flatMap(arr => arr).map(i => ({ ...i, isMagico: true }))
  ];

  const resultadosLoot = buscaLoot.trim() === "" 
    ? [] 
    : todosOsItensDoBanco.filter(i => i.nome.toLowerCase().includes(buscaLoot.toLowerCase()));

  const resultadosTalentosMesa = buscaTalentoMesa.trim() === "" 
    ? [] 
    : Object.values(TALENTOS).filter(t => t.nome.toLowerCase().includes(buscaTalentoMesa.toLowerCase()));

  async function entregarLoot(itemDoBanco, jogadorId) {
    if (!isMestre) return;

    let cargasMaximas = 0;
    if (itemDoBanco.descricao) {
      const matchCargas = itemDoBanco.descricao.match(/(\d+)\s+cargas/i);
      if (matchCargas && matchCargas[1]) {
        cargasMaximas = parseInt(matchCargas[1]);
      }
    }

    const itemFormatado = {
      id: Date.now().toString(),
      nome: itemDoBanco.nome,
      qtd: 1,
      peso: itemDoBanco.peso || 0,
      descricao: itemDoBanco.descricao || `Dano: ${itemDoBanco.dano} ${itemDoBanco.tipoDano || itemDoBanco.tipo}`,
      equipado: false,
      sintonizado: false,
      exigeSintonia: itemDoBanco.attunement || false,
      cargasTotais: cargasMaximas, 
      cargasAtuais: cargasMaximas
    };

    const nomeJogador = jogadores[jogadorId]?.nome || "Jogador";

    try {
      await updateDoc(doc(db, "personagens", jogadorId), {
        inventario: arrayUnion(itemFormatado)
      });

      enviarMensagemOuDado("👑 Mestre", `✨ O Mestre concedeu o item **${itemDoBanco.nome}** para *${nomeJogador}*!`, "sistema");
      setItemSelecionadoLoot(null);
      setModalLootAberto(false);
      setBuscaLoot("");
    } catch (e) {
      console.error("Erro ao enviar Loot:", e);
      abrirAlert("Erro", "Erro ao entregar o item pro jogador.");
    }
  }

  async function entregarTalentoMesa(talentoDoBanco, jogadorId) {
    if (!isMestre) return;
    const fichaAlvo = jogadores[jogadorId];
    if (!fichaAlvo) return;

    const qtdExtras = fichaAlvo.qtdTalentosExtras || 0;
    const novoIdSlot = `extra_${qtdExtras}`;
    
    try {
      await updateDoc(doc(db, "personagens", jogadorId), {
        qtdTalentosExtras: qtdExtras + 1, 
        [`escolhasTalentos.${novoIdSlot}`]: { nome: talentoDoBanco.nome, bonusAtributos: [] }, 
        talentos: arrayUnion({ 
          id: `${novoIdSlot}-${talentoDoBanco.nome}`,
          nome: talentoDoBanco.nome,
          bonusAtributos: [],
          descricao: talentoDoBanco.descricao
        })
      });

      enviarMensagemOuDado("👑 Mestre", `🔮 O destino interveio! *${fichaAlvo.nome}* recebeu a dádiva/maldição: **${talentoDoBanco.nome}**!`, "sistema");
      setTalentoSelecionadoMesa(null);
      setModalTalentoMesaAberto(false);
      setBuscaTalentoMesa("");
    } catch (e) {
      console.error("Erro ao dar talento:", e);
      abrirAlert("Erro", "Erro ao entregar o talento.");
    }
  }

  return (
    <div className="mesa-layout-global" onClick={() => setMenuCondicoesFicha(null)}>

      {dialogo.ativo && (
        <div className="overlay-dialogo">
          <div className="caixa-dialogo">
            <h3>{dialogo.titulo}</h3>
            <p>{dialogo.mensagem}</p>
            
            <div className="botoes-dialogo">
              {(dialogo.tipo === 'confirm' || dialogo.tipo === 'prompt') && (
                <button className="btn-dialogo-cancelar" onClick={fecharDialogo}>Cancelar</button>
              )}
              
              <button className="btn-dialogo-confirmar" onClick={() => { fecharDialogo(); if (dialogo.acaoConfirmar) dialogo.acaoConfirmar(); }}>
                {dialogo.tipo === 'alert' ? 'Entendido' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <CaixaDeDados aoTerminarDeRolar={finalizarRolagem3D} />
      
      {/* 👇 TODOS OS MODAIS AQUI 👇 */}
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

      {modalHpNpc && isMestre && (
        <div className="overlay-modal" onClick={() => { setModalHpNpc(null); setValorHpInput(""); }}>
          <div className="modal-fichas" onClick={(e) => e.stopPropagation()} style={{ width: '300px', textAlign: 'center', alignItems: 'center', border: '1px solid #ff4444' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#ff4444' }}>Alterar HP (Ameaça)</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>Modificando a vida de <strong>{listaNpcs.find(n => n.id === modalHpNpc)?.nome}</strong></p>
            <input type="number" placeholder="Digite o valor..." value={valorHpInput} onChange={e => setValorHpInput(e.target.value)} onFocus={e => e.target.select()} style={{ width: '100%', padding: '15px', fontSize: '1.2rem', textAlign: 'center', background: '#111', border: '1px solid #444', color: '#fff', borderRadius: '8px', marginBottom: '20px', boxSizing: 'border-box' }}/>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button onClick={() => alterarVidaNpc('dano')} style={{ flex: 1, padding: '12px', background: '#88160e', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💔 Dano</button>
              <button onClick={() => alterarVidaNpc('cura')} style={{ flex: 1, padding: '12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💚 Cura</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ADICIONAR NPC / BESTIÁRIO */}
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
                    <span style={{ fontSize: '0.7rem', color: '#aaa' }}>{info.hp || info.vidaMaxima} HP | {info.faccao}</span>
                  </div>
                </div>
              ))}
            </div>

            {bestiarioCampanha.length > 0 && (
              <>
                <h4 style={{ color: '#ffcc00', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '5px' }}>📖 Bestiário da Campanha</h4>
                <div className="lista-fichas-modal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {bestiarioCampanha.map(npc => (
                    <div key={npc.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', background: '#332b00', border: '1px solid #ffcc00', padding: '10px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s' }}>
                      
                      {/* 👇 O SEGREDO TÁ AQUI: A div com position absolute grudando eles no canto! 👇 */}
                      <div style={{ position: 'absolute', top: '5px', right: '5px', display: 'flex', gap: '8px' }}>
                        <button onClick={(e) => { e.stopPropagation(); editarNpcBestiario(npc); }} style={{ background: 'transparent', border: 'none', color: '#ffcc00', cursor: 'pointer', fontSize: '0.9rem', padding: '0' }} title="Editar NPC">✏️</button>
                        <button onClick={(e) => { e.stopPropagation(); deletarNpcBestiarioCampanha(npc.id); }} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem', padding: '0' }} title="Apagar do Bestiário">✖</button>
                      </div>

                      <div onClick={() => adicionarNpcDoBestiario(npc.nome, npc)} style={{display:'flex', width:'100%', gap:'10px', alignItems:'center'}}>
                         <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                            {npc.foto ? <img src={npc.foto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={npc.nome} /> : '👹'}
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.9rem', color: '#ffcc00' }}>{npc.nome}</strong>
                            <span style={{ fontSize: '0.7rem', color: '#aaa' }}>{npc.vidaMaxima || npc.hp} HP | {npc.faccao}</span>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '15px', textAlign: 'center' }}>
              <button 
                onClick={() => { setModalNpcAberto(false); setNpcEditandoId(null); limparFormularioNpc(); setModalCustomNpc(true); }} 
                style={{ background: 'transparent', color: '#ffcc00', border: '1px dashed #ffcc00', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                + Forjar NPC Customizado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* O GERADOR CUSTOMIZADO COM OS CAMPOS NOVOS */}
      {modalCustomNpc && isMestre && (
        <div className="overlay-modal" onClick={() => setModalCustomNpc(false)}>
          <div className="modal-fichas" onClick={(e) => e.stopPropagation()} style={{ border: '2px solid #ffcc00' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#ffcc00' }}>Criar Ameaça Manual</h3>
              <button onClick={() => { setModalCustomNpc(false); setNpcEditandoId(null); limparFormularioNpc(); }} style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.2rem' }}>✖</button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Nome do NPC *" required value={formNpc.nome} onChange={e => setFormNpc({...formNpc, nome: e.target.value})} style={{ flex: 2, padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} />
                <select value={formNpc.faccao} onChange={e => setFormNpc({...formNpc, faccao: e.target.value})} style={{ flex: 1, padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }}>
                  <option value="hostil">🔴 Hostil</option>
                  <option value="neutro">🟡 Neutro</option>
                  <option value="aliado">🟢 Aliado</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" placeholder="HP *" required value={formNpc.hp} onChange={e => setFormNpc({...formNpc, hp: e.target.value})} style={{ flex: 1, minWidth: 0, width: '10px', boxSizing: 'border-box', padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} title="Pontos de Vida" />
                <input type="number" placeholder="CA *" required value={formNpc.ca} onChange={e => setFormNpc({...formNpc, ca: e.target.value})} style={{ flex: 1, minWidth: 0, width: '10px', boxSizing: 'border-box', padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} title="Classe de Armadura" />
                <input type="number" placeholder="Ini *" required value={formNpc.ini} onChange={e => setFormNpc({...formNpc, ini: e.target.value})} style={{ flex: 1, minWidth: 0, width: '10px', boxSizing: 'border-box', padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} title="Iniciativa" />
              </div>

              {/* ATRIBUTOS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px', background: '#1a1a1a', padding: '5px', borderRadius: '6px', border: '1px solid #333' }}>
                {['for', 'des', 'con', 'int', 'sab', 'car'].map(attr => {
                  const valorAttr = (formNpc.atributos && formNpc.atributos[attr]) !== undefined ? formNpc.atributos[attr] : 10;
                  return (
                    <div key={attr} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.6rem', color: '#ffcc00', textTransform: 'uppercase', fontWeight: 'bold' }}>{attr}</label>
                      <input type="number" value={valorAttr} onChange={e => setFormNpc({...formNpc, atributos: {...(formNpc.atributos || {}), [attr]: parseInt(e.target.value) || 0}})} style={{ width: '100%', padding: '6px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                  );
                })}
              </div>

              {/* ATAQUES RÁPIDOS */}
              <div style={{ background: '#222', padding: '8px', borderRadius: '6px', border: '1px dashed #555' }}>
                <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Ataques do NPC (Opcional)</span>
                
                <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                  <input type="text" placeholder="Nome" value={formNpc.ataque1.nome} onChange={e => setFormNpc({...formNpc, ataque1: {...formNpc.ataque1, nome: e.target.value}})} style={{ flex: 2, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="number" placeholder="+Hit" value={formNpc.ataque1.acerto} onChange={e => setFormNpc({...formNpc, ataque1: {...formNpc.ataque1, acerto: e.target.value}})} style={{ flex: 1, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="text" placeholder="Dano" value={formNpc.ataque1.dano} onChange={e => setFormNpc({...formNpc, ataque1: {...formNpc.ataque1, dano: e.target.value}})} style={{ flex: 1.5, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="text" placeholder="Tipo" value={formNpc.ataque1.tipo} onChange={e => setFormNpc({...formNpc, ataque1: {...formNpc.ataque1, tipo: e.target.value}})} style={{ flex: 1.5, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: '#ffcc00', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                </div>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input type="text" placeholder="Nome" value={formNpc.ataque2.nome} onChange={e => setFormNpc({...formNpc, ataque2: {...formNpc.ataque2, nome: e.target.value}})} style={{ flex: 2, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="number" placeholder="+Hit" value={formNpc.ataque2.acerto} onChange={e => setFormNpc({...formNpc, ataque2: {...formNpc.ataque2, acerto: e.target.value}})} style={{ flex: 1, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="text" placeholder="Dano" value={formNpc.ataque2.dano} onChange={e => setFormNpc({...formNpc, ataque2: {...formNpc.ataque2, dano: e.target.value}})} style={{ flex: 1.5, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <input type="text" placeholder="Tipo" value={formNpc.ataque2.tipo} onChange={e => setFormNpc({...formNpc, ataque2: {...formNpc.ataque2, tipo: e.target.value}})} style={{ flex: 1.5, minWidth: 0, boxSizing: 'border-box', padding: '8px', background: '#111', color: '#ffcc00', border: '1px solid #444', borderRadius: '4px', fontSize: '0.8rem' }} />
                </div>
              </div>

              <input type="url" placeholder="URL da Imagem (Opcional)" value={formNpc.foto} onChange={e => setFormNpc({...formNpc, foto: e.target.value})} style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} />

              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button type="button" onClick={salvarCapangaFormulario} style={{ flex: 1, background: '#444', color: 'white', border: '1px solid #555', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ⚔️ Apenas Gerar no Mapa
                </button>
                <button type="button" onClick={salvarNpcNoBestiarioCampanha} style={{ flex: 1, background: '#ffcc00', color: 'black', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {npcEditandoId ? "🔄 Atualizar Ficha" : "💾 Salvar no Bestiário"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalLootAberto && isMestre && (
        <div className="overlay-modal" onClick={() => { setModalLootAberto(false); setItemSelecionadoLoot(null); }}>
          <div style={{ background: '#1a1a1a', width: '90%', maxWidth: '550px', height: '80vh', borderRadius: '12px', border: '2px solid #8e44ad', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(142,68,173,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '15px 20px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#9b59b6' }}>🎁 Distribuição de Loot</h3>
              <button onClick={() => { setModalLootAberto(false); setItemSelecionadoLoot(null); }} style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
            </div>

            {!itemSelecionadoLoot ? (
              <>
                <div style={{ padding: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Pesquise o item que o grupo encontrou..." 
                    value={buscaLoot}
                    onChange={(e) => setBuscaLoot(e.target.value)}
                    autoFocus
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #5c0099', background: '#0a0a0a', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0 15px 15px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {buscaLoot.trim() === "" ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>O que estava dentro do baú do dragão?</p>
                  ) : resultadosLoot.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#ffcc00' }}>Item não encontrado no banco.</p>
                  ) : (
                    resultadosLoot.map(item => (
                      <div 
                        key={item.nome}
                        onClick={() => setItemSelecionadoLoot(item)}
                        style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '12px', cursor: 'pointer', transition: 'all 0.2s ease', borderLeft: item.isMagico ? '4px solid #8e44ad' : '4px solid #3498db' }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#222'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <strong style={{ color: item.isMagico ? '#9b59b6' : '#3498db' }}>{item.nome}</strong>
                          <span style={{ fontSize: '0.7rem', color: '#888', background: '#000', padding: '2px 6px', borderRadius: '10px' }}>{item.raridade || "Comum"}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.descricao || `Dano: ${item.dano} ${item.tipo}`}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ background: '#0a0a0a', border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Item Selecionado</span>
                  <h3 style={{ margin: '5px 0', color: itemSelecionadoLoot.isMagico ? '#9b59b6' : '#3498db' }}>{itemSelecionadoLoot.nome}</h3>
                  <button onClick={() => setItemSelecionadoLoot(null)} style={{ background: 'transparent', border: '1px dashed #555', color: '#aaa', padding: '4px 10px', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>⬅ Trocar Item</button>
                </div>
                <h4 style={{ color: '#fff', textAlign: 'center', marginBottom: '15px' }}>Entregar para qual Herói?</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', overflowY: 'auto' }}>
                  {(!mesaDados.jogadores || mesaDados.jogadores.length === 0) ? (
                    <p style={{ color: '#ff4444' }}>Não há jogadores na mesa para receber o item.</p>
                  ) : (
                    Object.values(jogadores).map(ficha => (
                      <div 
                        key={ficha.id} 
                        onClick={() => entregarLoot(itemSelecionadoLoot, ficha.id)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px', background: '#222', border: '1px solid #444', borderRadius: '10px', width: '100px', transition: '0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#4caf50'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#444'}
                      >
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', background: '#111', border: '2px solid #555' }}>
                          {ficha.foto ? <img src={ficha.foto} alt={ficha.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{ficha.nome?.charAt(0) || "?"}</span>}
                        </div>
                        <span style={{ color: 'white', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>{ficha.nome}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {modalTalentoMesaAberto && isMestre && (
        <div className="overlay-modal" onClick={() => { setModalTalentoMesaAberto(false); setTalentoSelecionadoMesa(null); }}>
          <div style={{ background: '#1a1a1a', width: '90%', maxWidth: '550px', height: '80vh', borderRadius: '12px', border: '2px solid #d35400', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(211,84,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '15px 20px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#e67e22' }}>✨ Conceder Dádiva (Regra do Legal)</h3>
              <button onClick={() => { setModalTalentoMesaAberto(false); setTalentoSelecionadoMesa(null); }} style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
            </div>

            {!talentoSelecionadoMesa ? (
              <>
                <div style={{ padding: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Pesquise o talento, dádiva ou maldição..." 
                    value={buscaTalentoMesa}
                    onChange={(e) => setBuscaTalentoMesa(e.target.value)}
                    autoFocus
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d35400', background: '#0a0a0a', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 15px 15px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {buscaTalentoMesa.trim() === "" ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Qual poder você concederá aos mortais?</p>
                  ) : resultadosTalentosMesa.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#ffcc00' }}>Talento não encontrado no banco.</p>
                  ) : (
                    resultadosTalentosMesa.map(talento => (
                      <div 
                        key={talento.nome}
                        onClick={() => setTalentoSelecionadoMesa(talento)}
                        style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '12px', cursor: 'pointer', transition: 'all 0.2s ease', borderLeft: '4px solid #e67e22' }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#222'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <strong style={{ color: '#e67e22' }}>{talento.nome}</strong>
                          <span style={{ fontSize: '0.7rem', color: '#888', background: '#000', padding: '2px 6px', borderRadius: '10px' }}>{talento.categoria}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {talento.descricao}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ background: '#0a0a0a', border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Dádiva Selecionada</span>
                  <h3 style={{ margin: '5px 0', color: '#e67e22' }}>{talentoSelecionadoMesa.nome}</h3>
                  <button onClick={() => setTalentoSelecionadoMesa(null)} style={{ background: 'transparent', border: '1px dashed #555', color: '#aaa', padding: '4px 10px', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>⬅ Trocar Talento</button>
                </div>
                <h4 style={{ color: '#fff', textAlign: 'center', marginBottom: '15px' }}>Amaldiçoar / Abençoar qual Herói?</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', overflowY: 'auto' }}>
                  {(!mesaDados.jogadores || mesaDados.jogadores.length === 0) ? (
                    <p style={{ color: '#ff4444' }}>Não há jogadores na mesa.</p>
                  ) : (
                    Object.values(jogadores).map(ficha => (
                      <div 
                        key={ficha.id} 
                        onClick={() => entregarTalentoMesa(talentoSelecionadoMesa, ficha.id)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px', background: '#222', border: '1px solid #444', borderRadius: '10px', width: '100px', transition: '0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#e67e22'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#444'}
                      >
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', background: '#111', border: '2px solid #555' }}>
                          {ficha.foto ? <img src={ficha.foto} alt={ficha.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{ficha.nome?.charAt(0) || "?"}</span>}
                        </div>
                        <span style={{ color: 'white', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>{ficha.nome}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 👇 O CABEÇALHO FOI TOTALMENTE REESTRUTURADO PARA NÃO BUGAR O FLEXBOX 👇 */}
      <div className="mesa-header-container">
        
        {/* Grupo 1: Info da Sala */}
        <div className="mesa-header-info">
          <Link to="/" className="btn-voltar-lobby">⬅ Sair</Link>
          <div>
            <h1>⚔️ {mesaDados.nome} {isMestre && <span title="Você é o Mestre!" style={{cursor:'help'}}>👑</span>}</h1>
            <p>Código: <strong>{codigoSala}</strong></p>
          </div>
        </div>
        
        {/* Grupo 2: Toolbar de Botões (Alinhados à direita) */}
        <div className="mesa-header-toolbar">
           <button onClick={() => setAbaAtiva('combate')} className={`btn-toolbar ${abaAtiva === 'combate' ? 'ativo-amarelo' : ''}`}>⚔️ Combate</button>
           <button onClick={() => setAbaAtiva('mapa')} className={`btn-toolbar ${abaAtiva === 'mapa' ? 'ativo-azul' : ''}`}>🗺️ Mapa Virtual</button>

           {isMestre && (
             <button onClick={async () => { await updateDoc(doc(db, "mesas", codigoSala), { mapaBloqueado: !mesaDados?.mapaBloqueado }); }} className={`btn-toolbar ${mesaDados?.mapaBloqueado ? 'ativo-vermelho' : 'ativo-verde'}`}>
               {mesaDados?.mapaBloqueado ? '🔒 Trancado' : '🔓 Liberado'}
             </button>
           )}
           
           <button onClick={() => setMostrarChat(!mostrarChat)} className={`btn-toolbar ${mostrarChat ? 'ativo-vermelho' : 'ativo-verde'}`}>
             {mostrarChat ? '💬 Ocultar Chat' : '💬 Abrir Chat'}
           </button>

           <button className="btn-entrar-ficha" onClick={abrirModalDeFichas}>➕ Entrar com Ficha</button>
           
           {isMestre && (
             <>
               <button onClick={() => setModalLootAberto(true)} className="btn-toolbar btn-loot">🎁 Dar Loot</button>
               <button onClick={() => setModalTalentoMesaAberto(true)} className="btn-toolbar btn-dadiva">✨ Dar Dádiva</button>
             </>
           )}
        </div>
      </div>

      <div className="grid-mesa-com-chat" style={{ gridTemplateColumns: mostrarChat ? '1fr 400px' : '1fr' }}>
        
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
            <div className="area-cards-jogadores" style={{ flexShrink: 0, minHeight: 'min-content' }}>
              {!mesaDados.jogadores || mesaDados.jogadores.length === 0 ? (
                <div className="aviso-vazio-mesa"><p>Nenhum herói na mesa.</p></div>
              ) : (
                Object.values(jogadores).map(ficha => {
                  const vidaMax = ficha.vidaMaxima || 1;
                  const vidaAtual = ficha.vidaAtual !== undefined ? ficha.vidaAtual : vidaMax;
                  const porcentagem = (vidaAtual / vidaMax) * 100;
                  const corVida = porcentagem > 50 ? '#4caf50' : porcentagem > 20 ? '#ff9800' : '#f44336';

                  const statusGerais = calcularStatusGlobais(ficha);
                  const valorCA = statusGerais.caFinal;
                  const valorDeslocamento = statusGerais.deslocamentoFinal;
                  const valorPercPassiva = statusGerais.percepcaoPassiva;

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
                                   <div key={cond.id} className={`item-condicao ${condicoesAtivas.includes(cond.id) ? 'ativo' : ''}`} onClick={() => alternarCondicao(ficha.id, ficha.nome, cond.id, 'jogador')}>
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

            <div className="area-cards-npcs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', flexShrink: 0, minHeight: 'min-content', paddingBottom: '30px' }}>
              {listaNpcs.length === 0 ? (
                <p style={{ color: '#666', gridColumn: '1 / -1' }}>Nenhuma ameaça na mesa no momento.</p>
              ) : (
                listaNpcs.map(npc => {
                  
                  // 👇 BLINDAGEM DE LEITURA DE HP 👇
                  const hpMaximaCalculada = parseInt(npc.vidaMaxima) || parseInt(npc.hp) || 1;
                  const hpAtualCalculada = npc.vidaAtual !== undefined ? npc.vidaAtual : hpMaximaCalculada;
                  const porcentagemNpc = Math.min(100, (hpAtualCalculada / hpMaximaCalculada) * 100);
                  const isMorto = hpAtualCalculada === 0;

                  // 👇 BLINDAGEM DOS ATRIBUTOS 👇
                  const attrSalvos = npc.atributos || { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 };

                  let corBaseNpc = '#ff4444'; 
                  let iconeFaccao = '👹';
                  if (npc.faccao === 'neutro') { corBaseNpc = '#ffcc00'; iconeFaccao = '😐'; }
                  if (npc.faccao === 'aliado') { corBaseNpc = '#4caf50'; iconeFaccao = '🛡️'; }

                  const corVidaNpc = porcentagemNpc > 50 ? corBaseNpc : porcentagemNpc > 25 ? '#ff9800' : porcentagemNpc > 1 ? '#f44336' : '#555';

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
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: '0 0 5px 0', color: isMorto ? '#888' : '#fff', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {npc.nome}
                          </h4>
                          
                          <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold' }}>
                            <span title="Classe de Armadura">🛡️ CA {npc.ca || 10}</span>
                            
                            {isMestre && !isMorto && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const r = Math.floor(Math.random() * 20) + 1;
                                  const mod = parseInt(npc.iniciativa) || parseInt(npc.ini) || 0;
                                  const sinal = mod >= 0 ? `+${mod}` : mod;
                                  enviarMensagemOuDado(npc.nome, `rolou **Iniciativa**: d20(${r}) ${sinal} = **[ ${r + mod} ]**`, "sistema");
                                }}
                                style={{ background: 'transparent', border: '1px solid #555', color: '#ffcc00', borderRadius: '4px', cursor: 'pointer', padding: '0 4px' }}
                                title="Rolar Iniciativa pra este NPC"
                              >
                                ⚡ Ini {parseInt(npc.iniciativa) >= 0 ? `+${parseInt(npc.iniciativa)}` : parseInt(npc.iniciativa) || 0}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* MOSTRA ATRIBUTOS BLINDADOS */}
                      {isMestre && !isMorto && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#111', padding: '4px 6px', borderRadius: '4px', marginTop: '6px', fontSize: '0.68rem', color: '#ccc', border: '1px solid #333', marginBottom: '8px' }}>
                          <span title="Força">FOR <strong>{attrSalvos.for}</strong></span>
                          <span title="Destreza">DES <strong>{attrSalvos.des}</strong></span>
                          <span title="Constituição">CON <strong>{attrSalvos.con}</strong></span>
                          <span title="Inteligência">INT <strong>{attrSalvos.int}</strong></span>
                          <span title="Sabedoria">SAB <strong>{attrSalvos.sab}</strong></span>
                          <span title="Carisma">CAR <strong>{attrSalvos.car}</strong></span>
                        </div>
                      )}

                      <div className="barra-vida-mestre" onClick={() => isMestre && setModalHpNpc(npc.id)} style={{ cursor: isMestre ? 'pointer' : 'default', padding: '8px', border: `1px solid ${corBaseNpc}` }}>
                        <div className="info-vida" style={{ fontSize: '0.75rem' }}>
                          <span style={{color: '#ccc'}}>{isMorto ? 'Morto' : 'HP'}</span>
                          <div>{isMestre && <span className="texto-editar-hp" style={{color: corBaseNpc}}>✎ Editar</span>}<strong>{hpAtualCalculada} / {hpMaximaCalculada}</strong></div>
                        </div>
                        <div className="trilho-vida" style={{ height: '6px', background: '#333' }}>
                          <div className="preenchimento-vida" style={{ width: `${Math.max(0, porcentagemNpc)}%`, background: corVidaNpc }}></div>
                        </div>
                      </div>

                      <div className="area-condicoes" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {(npc.condicoes || []).map(c => {
                           const condInfo = LISTA_CONDICOES.find(lc => lc.id === c);
                           return (
                             <span key={c} className="badge-condicao" onClick={(e) => { e.stopPropagation(); alternarCondicao(npc.id, npc.nome, c, 'npc'); }}>
                               {condInfo?.icon || '❓'} {c}
                             </span>
                           );
                        })}
                        {isMestre && !isMorto && (
                          <div style={{ position: 'relative' }}>
                            <button className="btn-add-condicao" onClick={(e) => { e.stopPropagation(); setMenuCondicoesFicha(menuCondicoesFicha === npc.id ? null : npc.id); }}>+ Status</button>
                            {menuCondicoesFicha === npc.id && (
                              <div className="menu-condicoes-flutuante" onClick={(e) => e.stopPropagation()}>
                                 {LISTA_CONDICOES.map(cond => (
                                   <div key={cond.id} className={`item-condicao ${(npc.condicoes||[]).includes(cond.id) ? 'ativo' : ''}`} onClick={() => alternarCondicao(npc.id, npc.nome, cond.id, 'npc')}>
                                     <span>{cond.icon}</span> {cond.id}
                                   </div>
                                 ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* BLINDAGEM DE ATAQUES */}
                      {isMestre && !isMorto && Array.isArray(npc.ataques) && npc.ataques.length > 0 && (
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {npc.ataques.map((atk, i) => {
                            if (!atk || !atk.nome) return null;
                            const bonusAtaqueTratado = parseInt(atk.bonusAtaque) || 0;
                            const danoTratado = atk.dano || "1";

                            return (
                              <div key={i} style={{ display: 'flex', background: '#222', borderRadius: '4px', border: '1px solid #333', overflow: 'hidden' }}>
                                
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const buffs = aplicarEfeitos("ataque", npc.condicoes);
                                    const r = Math.floor(Math.random() * 20) + 1;
                                    
                                    const somaGeral = r + bonusAtaqueTratado + buffs.totalExtra;
                                    const sinal = bonusAtaqueTratado >= 0 ? `+${bonusAtaqueTratado}` : bonusAtaqueTratado;
                                    const txtCrit = r === 20 ? "🔥 CRÍTICO!" : r === 1 ? "💀 FALHA CRÍTICA" : "";
                                    
                                    enviarMensagemOuDado(npc.nome, `atacou com **${atk.nome}**: d20(${r}) ${sinal} = **[ ${somaGeral} ]** ${txtCrit} ${buffs.logs}`, "dado");
                                  }}
                                  style={{ flex: 1, padding: '6px', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', borderRight: '1px solid #333' }}
                                >
                                  ⚔️ {atk.nome} ({bonusAtaqueTratado >= 0 ? `+${bonusAtaqueTratado}` : bonusAtaqueTratado})
                                </button>

                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const buffs = aplicarEfeitos("dano", npc.condicoes);

                                    let expressaoLimpa = danoTratado.toString().toLowerCase().replace(/\s/g, ''); 
                                    let totalDano = 0;
                                    let logDados = "";
                                    let match = expressaoLimpa.match(/(\d+)d(\d+)(?:([+-])(\d+))?/);
                                    
                                    if(match) {
                                        let qtd = parseInt(match[1]);
                                        let faces = parseInt(match[2]);
                                        let sinal = match[3];
                                        let mod = parseInt(match[4]) || 0;
                                        
                                        let rolagens = [];
                                        for(let k = 0; k < qtd; k++){
                                            let r = Math.floor(Math.random() * faces) + 1;
                                            rolagens.push(r);
                                            totalDano += r;
                                        }
                                        if(sinal === '+') totalDano += mod;
                                        if(sinal === '-') totalDano -= mod;
                                        logDados = `[ ${rolagens.join(' + ')} ] ${sinal ? sinal + ' ' + mod : ''}`;
                                    } else {
                                       totalDano = parseInt(expressaoLimpa) || 0;
                                       logDados = `${totalDano}`;
                                    }
                                    
                                    totalDano += buffs.totalExtra;
                                    
                                    enviarMensagemOuDado(npc.nome, `causou dano com **${atk.nome}**: 🎲 ${logDados} = **[ ${totalDano} ]** <br/><small>${atk.tipo || "Dano"}</small> ${buffs.logs}`, "dado");
                                  }}
                                  style={{ padding: '6px 10px', background: '#331a00', border: 'none', color: '#ffcc00', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                  💥 {danoTratado.toString().split(' ').join('')}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
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
                   
                    <span style={{color: '#ffcc00', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase'}}>
                      ⚔️ Combate <span style={{color: '#fff', background: '#333', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px'}}>Rodada {rodadaAtual}</span>
                    </span>
                    
                    {isMestre && (
                       <div style={{display: 'flex', gap: '8px'}}>
                          <button onClick={adicionarMonstroIniciativa} style={{background:'#f44336', border:'none', color:'white', fontSize:'0.7rem', padding:'4px 8px', borderRadius:'3px', cursor:'pointer', fontWeight: 'bold'}} title="Rolar Iniciativa Falsa pro Monstro">+ NPC</button>
                          <button onClick={avancarTurno} style={{background:'#4caf50', border:'none', color:'white', fontSize:'0.7rem', padding:'4px 8px', borderRadius:'3px', cursor:'pointer', fontWeight: 'bold'}}>Passar Turno ➡</button>
                          <button onClick={() => {
                             enviarMensagemOuDado("Sistema", "--- FIM DO COMBATE ---", "limpar_iniciativa");
                             updateDoc(doc(db, "mesas", codigoSala), { turnoAtual: 0, rodadaAtual: 1 }); 
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
                <button onClick={limparChat} style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', height: 'fit-content', }} title="Limpar Histórico">🗑️ Limpar Chat</button>
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

            {mostrarRolador && (
              <form onSubmit={rolarDadosAvulsos} style={{ padding: '10px', background: '#1a1a1a', borderTop: '2px solid #ffcc00', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s' }}>
                <input type="number" min="1" max="50" value={avulsoQtd} onChange={e => setAvulsoQtd(e.target.value)} style={{ width: '45px', padding: '6px', background: '#000', color: 'white', border: '1px solid #555', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }} title="Quantidade de Dados" />
                <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '1.2rem' }}>d</span>
                <select value={avulsoFaces} onChange={e => setAvulsoFaces(e.target.value)} style={{ padding: '6px', background: '#000', color: 'white', border: '1px solid #555', borderRadius: '4px', fontWeight: 'bold' }}>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
                  <option value="100">100</option>
                </select>
                <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '1.2rem' }}>+</span>
                <input type="number" value={avulsoMod} onChange={e => setAvulsoMod(e.target.value)} style={{ width: '55px', padding: '6px', background: '#000', color: 'white', border: '1px solid #555', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }} title="Modificador (Ex: 2 ou -1)" />
                
                <button type="submit" style={{ background: '#ffcc00', color: 'black', border: 'none', padding: '6px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px', textTransform: 'uppercase' }}>Rolar</button>
              </form>
            )}

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

              <button 
                type="button" 
                onClick={() => setMostrarRolador(!mostrarRolador)} 
                title="Rolar Dados Avulsos" 
                style={{ 
                  background: mostrarRolador ? '#ffcc00' : '#333', 
                  color: mostrarRolador ? 'black' : 'white', 
                  border: '1px solid #444', 
                  borderRadius: '4px', 
                  padding: '0 10px', 
                  cursor: 'pointer', 
                  fontSize: '1.2rem', 
                  transition: '0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0
                }}
              >
                🎲
              </button>

              <input 
                type="text" 
                placeholder={`Falar como ${nomeRemetente}...`} 
                value={textoChat} 
                onChange={e => setTextoChat(e.target.value)} 
                style={{ minWidth: 0 }}
              />
              
              <button type="submit" className="btn-enviar-chat">Enviar</button>
            </form>
          </div>
        )}
      </div>
      
      <style>{`
        .overlay-dialogo { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 99999; animation: fadeIn 0.2s; }
        .caixa-dialogo { background: #1a1a1a; border: 2px solid #ffcc00; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.9); animation: popIn 0.3s; }
        .caixa-dialogo h3 { color: #ffcc00; margin: 0 0 15px 0; font-size: 1.5rem; }
        .caixa-dialogo p { color: #ddd; margin: 0 0 20px 0; font-size: 1rem; line-height: 1.4; white-space: pre-wrap; }
        .botoes-dialogo { display: flex; gap: 10px; justify-content: center; }
        .btn-dialogo-cancelar { flex: 1; padding: 10px; border-radius: 6px; border: none; background: #333; color: white; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-dialogo-cancelar:hover { background: #555; }
        .btn-dialogo-confirmar { flex: 1; padding: 10px; border-radius: 6px; border: none; background: #4caf50; color: white; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 10px rgba(76,175,80,0.4); }
        .btn-dialogo-confirmar:hover { background: #45a049; transform: scale(1.05); }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }

        .overlay-modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-fichas { background: #1a1a1a; padding: 25px; border-radius: 12px; border: 1px solid #444; width: 450px; max-width: 90%; max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.8); animation: fadeIn 0.2s ease-out; }
        .lista-fichas-modal { overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 5px; }
        .card-ficha-modal { display: flex; align-items: center; gap: 15px; padding: 12px; background: #252525; border: 1px solid #333; border-radius: 8px; transition: 0.2s; }
        .card-ficha-modal:hover { background: #333; border-color: #ffcc00; transform: translateX(5px); }
        .modal-avatar-circle { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; background: #111; border: 1px solid #555; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #ffcc00; flex-shrink: 0; }
        .modal-avatar-circle img { width: 100%; height: 100%; object-fit: cover; }

        .mesa-layout-global { padding: 25px; max-width: 1400px; margin: 0 auto; color: white; display: flex; flex-direction: column; height: 95vh; box-sizing: border-box; }
        
        .mesa-header-container { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; background: #1a1a1a; padding: 15px 25px; border-radius: 10px; border: 1px solid #333; margin-bottom: 20px; }
        
        .mesa-header-info { display: flex; align-items: center; gap: 15px; flex-wrap: wrap; flex: 1; min-width: 250px; }
        .mesa-header-info h1 { margin: 0; font-size: 1.4rem; display: flex; align-items: center; gap: 10px; }
        .mesa-header-info p { margin: 2px 0 0 0; color: #888; font-size: 0.85rem; }
        .mesa-header-info strong { color: #ffcc00; letter-spacing: 2px; }
        
        .mesa-header-toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: flex-end; }
        
        .btn-voltar-lobby { background: #333; color: white; padding: 10px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: 0.2s; white-space: nowrap; }
        .btn-voltar-lobby:hover { background: #555; }
        
        .btn-toolbar { background: #333; color: white; padding: 10px 15px; border-radius: 6px; font-weight: bold; border: none; cursor: pointer; transition: 0.2s; font-size: 0.9rem; }
        .btn-toolbar:hover { filter: brightness(1.2); }
        
        .ativo-amarelo { background: #ffcc00; color: black; }
        .ativo-azul { background: #3498db; color: white; }
        .ativo-vermelho { background: #f44336; color: white; }
        .ativo-verde { background: #4caf50; color: white; }
        
        .btn-entrar-ficha { background: #4caf50; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 0.9rem; }
        .btn-entrar-ficha:hover { background: #45a049; }
        
        .btn-loot { background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%); box-shadow: 0 2px 8px rgba(142,68,173,0.5); }
        .btn-dadiva { background: linear-gradient(90deg, #d35400 0%, #c0392b 100%); box-shadow: 0 2px 8px rgba(192,57,43,0.5); }

        .btn-voltar-lobby { background: #333; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: 0.2s; white-space: nowrap; flex-shrink: 0; }
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
        .aba-rolamento-mestre { background: #222; padding: 10px; border-bottom: 1px solid #333; font-size: 0.8rem; color: #aaa; gap: 10px; }
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
        .input-chat-container input[type="text"] { flex: 1; min-width: 0; padding: 10px; background: #111; border: 1px solid #444; color: white; border-radius: 4px; font-size: 0.9rem; }
        
        .btn-enviar-chat { padding: 0 15px; background: #4caf50; border: none; color: white; font-weight: bold; border-radius: 4px; cursor: pointer; transition: 0.2s; flex-shrink: 0; }
        .btn-enviar-chat:hover { background: #45a049; }

        .area-principal-cards::-webkit-scrollbar { display: none; }
        .area-principal-cards { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}