// src/pages/Ficha.jsx
import { useEffect, useState, useRef } from 'react'; // 👈 Adicionamos o useRef aqui!
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';

import { PainelIdentidade } from '../components/PainelIdentidade';
import { AbaCaracteristicas } from '../components/AbaCaracteristicas';
import { Atributo } from '../components/Atributo';
import { BarraVida } from '../components/BarraVida';
import { ListaPericias } from '../components/ListaPericias';
import { Resistencias } from '../components/Resistencias';
import { Inventario } from '../components/Inventario';
import { Rolador } from '../components/Rolador';
import { Grimorio } from '../components/Grimorio';
import { AbaCombate } from '../components/AbaCombate';
import { StatusCombate } from '../components/StatusCombate';
import { Sentidos } from '../components/Sentidos';
import { Defesas } from '../components/Defesas';
import { ProficienciasGerais } from '../components/ProficienciasGerais';

import { CaixaDeDados } from '../components/CaixaDeDados';

import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

import { aplicarEfeitos, EFEITOS_GLOBAIS } from '../utils/motorDeEfeitos';

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

export function Ficha() {
  const [ficha, setFicha] = useState(null);
  const [resultadoDado, setResultadoDado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('principal');
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mesaId = searchParams.get("mesa"); 

  const minhasFichasIDs = JSON.parse(localStorage.getItem('minhasFichas') || '[]');
  const isDono = minhasFichasIDs.includes(id);

  const mesasQueSouMestre = JSON.parse(localStorage.getItem('mesasQueSouMestre') || '[]');
  const isMestre = mesaId && mesasQueSouMestre.includes(mesaId);

  const temPermissao = isDono || isMestre;

  const [usarDado3D, setUsarDado3D] = useState(localStorage.getItem('usarFicha3D') !== 'false');
  
  const [rolagemPendente, setRolagemPendente] = useState(null);
  // 👇 A MÁGICA DO PONTEIRO DE MEMÓRIA PARA DRIBLAR O CLOSURE 👇
  const rolagemRef = useRef(null); 

  const infoClasse = ficha ? CLASSES_DETALHADAS[ficha.classe] : null;
  const savesProficientes = infoClasse?.proficiencias?.testes || [];
  const nivel = ficha ? (ficha.nivel || 1) : 1;
  const bonusProf = Math.ceil(nivel / 4) + 1;

  const [menuCondicoesAberto, setMenuCondicoesAberto] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "personagens", id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) setFicha(docSnap.data());
    });
    return () => unsubscribe();
  }, [id]);

  async function atualizarPersonagem(campo, valor) {
    if (!temPermissao) return; 
    const docRef = doc(db, "personagens", id);
    await updateDoc(docRef, { [campo]: valor });

    // 👇 O GATILHO DA INSPIRAÇÃO NO CHAT 👇
    if (campo === "inspiracao") {
      if (valor === true) {
        mostrarMensagem(`✨ **${ficha.nome}** ganhou Inspiração Heroica do Mestre!`);
      } else {
        mostrarMensagem(`💥 **${ficha.nome}** gastou sua Inspiração Heroica para rolar com Vantagem!`);
      }
    }
  }

  async function subirDeNivel() {
    if (!temPermissao) return alert("Somente o dono ou o Mestre podem editar a ficha!");
    navigate(`/editar/${id}`);
  }

  function alternarCondicaoJogador(condId) {
    if (!temPermissao) return;
    const condicoesAtuais = ficha.condicoes || [];
    const temCondicao = condicoesAtuais.includes(condId);
    
    const novasCondicoes = temCondicao
      ? condicoesAtuais.filter(c => c !== condId)
      : [...condicoesAtuais, condId];
    
    atualizarPersonagem("condicoes", novasCondicoes);
  }

  async function enviarRolagemParaMesa(conteudoDaRolagem) {
    if (!mesaId || !ficha) return; 
    
    if (!temPermissao) {
      alert("🔒 Espectadores não podem enviar rolagens para o chat da mesa!");
      return;
    }

    try {
      const mesaRef = doc(db, "mesas", mesaId);
      await updateDoc(mesaRef, {
        historico: arrayUnion({
          id: Date.now() + Math.random(),
          remetente: isMestre && !isDono ? `👑 Mestre (como ${ficha.nome})` : ficha.nome,
          conteudo: conteudoDaRolagem,
          tipo: "dado",
          hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        })
      });
    } catch (error) {
      console.error("Erro ao enviar a rolagem:", error);
    }
  }

function finalizarRolagem3D(total) {
    const pendente = rolagemRef.current; 
    if (!pendente) return;

    if (pendente.tipo === 'd20') {
      let dado = total; 
      if (dado < pendente.minimo) dado = pendente.minimo;

      const totalCalculado = dado + pendente.bonus;
      const sinalBonus = pendente.bonus >= 0 ? `+${pendente.bonus}` : pendente.bonus;

      setResultadoDado({
        nome: pendente.nomeTesteLimpo || pendente.nomeTeste, 
        valorDado: dado, 
        bonus: pendente.textoBonusExtra || pendente.bonus, // 👈 AGORA MOSTRA O TEXTO DO BUFF AQUI!
        total: totalCalculado, 
        critico: dado === 20, 
        falha: dado === 1 && pendente.minimo === 1 
      });

      let txtCritico = dado === 20 ? " 🔥 CRÍTICO!" : dado === 1 && pendente.minimo === 1 ? " 💀 FALHA CRÍTICA!" : "";
      enviarRolagemParaMesa(`rolou **${pendente.nomeTeste}**: d20(${dado}) ${sinalBonus} = **[ ${totalCalculado} ]**${txtCritico}`);
    
    } else if (pendente.tipo === 'dano') {
      let expSemDados = pendente.stringDeDano.replace(/\d+d\d+/g, '0');
      let calculoSeguro = expSemDados.replace(/[^0-9+\-*/(). ]/g, '');
      let modificador = 0;
      try { modificador = Function(`'use strict'; return (${calculoSeguro})`)(); } catch (e) {}

      const bonusExtraDoMotor = pendente.bonusExtraMotor || 0;
      const modificadorFinal = modificador + bonusExtraDoMotor;
      const totalFinal = total + modificadorFinal;

      // 👇 MONTA O TEXTO BONITO PRO POPUP DO DANO 👇
      const textoBuffs = pendente.textoBuffsDano ? ` | Buffs: ${pendente.textoBuffsDano}` : "";

      setResultadoDado({
        nome: `⚔️ Dano: ${pendente.nomeAtaqueLimpo || pendente.nomeAtaque}`,
        valorDado: pendente.stringDeDano, 
        bonus: `Mod: ${modificador >= 0 ? '+'+modificador : modificador}${textoBuffs}`, // 👈 MOSTRA FÚRIA/COLOSSUS AQUI
        total: totalFinal,
        critico: false,
        falha: false,
        isDano: true 
      });

      enviarRolagemParaMesa(`rolou dano de **${pendente.nomeAtaque}**: 🎲(${total}) + Mod(${modificadorFinal}) = **[ ${totalFinal} ]**`);
    }
    
    setRolagemPendente(null); 
    rolagemRef.current = null;
  }

  function rolarDado(nomeTeste, bonus, minimo = 1) {
    let tipo = "teste";
    const lower = nomeTeste.toLowerCase();
    if (lower.includes("ataque")) tipo = "ataque";
    else if (lower.includes("salvaguarda") || lower.includes("save") || lower.includes("resistência")) tipo = "save";

    const buffs = aplicarEfeitos(tipo, ficha.condicoes || []);
    const bonusFinal = bonus + buffs.totalExtra; 
    const nomeComBuffs = buffs.logs ? `${nomeTeste} ${buffs.logs}` : nomeTeste;

    // 👇 MONTA O RECIBO: "5 (Bênção: +d4(3))" 👇
    const textoBonusPopUp = buffs.rolagensDetalhadas ? `${bonus} [Base] ${buffs.rolagensDetalhadas}` : bonus;

    if (usarDado3D && window.dispararDado3D) {
      const payload = { 
        tipo: 'd20', 
        nomeTeste: nomeComBuffs, 
        nomeTesteLimpo: nomeTeste, 
        bonus: bonusFinal, 
        textoBonusExtra: textoBonusPopUp, // Envia o recibo pro Dado 3D
        minimo 
      };
      setRolagemPendente(payload);
      rolagemRef.current = payload; 
      const corDaFicha = ficha.corDado || "#ffcc00"; 
      window.dispararDado3D("1d20", corDaFicha);
      return; 
    }

    let dado = Math.floor(Math.random() * 20) + 1;
    if (dado < minimo) dado = minimo;
    const totalCalculado = dado + bonusFinal;
    const sinalBonus = bonusFinal >= 0 ? `+${bonusFinal}` : bonusFinal;
    
    setResultadoDado({
      nome: nomeTeste, valorDado: dado, 
      bonus: textoBonusPopUp, // Usa o recibo no Dado Rápido
      total: totalCalculado, critico: dado === 20, falha: dado === 1 && minimo === 1 
    });
    
    let txtCritico = dado === 20 ? " 🔥 CRÍTICO!" : dado === 1 && minimo === 1 ? " 💀 FALHA CRÍTICA!" : "";
    enviarRolagemParaMesa(`rolou **${nomeComBuffs}**: d20(${dado}) ${sinalBonus} = **[ ${totalCalculado} ]**${txtCritico}`);
  }

  function rolarDano(nomeAtaque, stringDeDano) {
    const buffs = aplicarEfeitos("dano", ficha.condicoes || []);
    const nomeComBuffs = buffs.logs ? `${nomeAtaque} ${buffs.logs}` : nomeAtaque;

    const expressaoBaixa = stringDeDano.toLowerCase();
    const apenasDados = expressaoBaixa.match(/\d+d\d+/g);

    if (usarDado3D && window.dispararDado3D && apenasDados) {
      const payload = { 
        tipo: 'dano', 
        nomeAtaque: nomeComBuffs, 
        nomeAtaqueLimpo: nomeAtaque,
        stringDeDano: expressaoBaixa,
        bonusExtraMotor: buffs.totalExtra, 
        textoBuffsDano: buffs.rolagensDetalhadas // Envia o recibo do Dano pro Dado 3D
      };
      setRolagemPendente(payload);
      rolagemRef.current = payload; 
      
      const corDaFicha = ficha.corDado || "#ff4444"; 
      window.dispararDado3D(apenasDados, corDaFicha); 
      return; 
    }

    let expressaoMatematica = expressaoBaixa;
    let rolagensDetalhadas = [];

    expressaoMatematica = expressaoMatematica.replace(/(\d+)d(\d+)/g, (match, qtdStr, facesStr) => {
      const qtd = parseInt(qtdStr);
      const faces = parseInt(facesStr);
      let somaLocal = 0;
      let resultadosDaRolar = [];
      for (let i = 0; i < qtd; i++) {
        const r = Math.floor(Math.random() * faces) + 1;
        somaLocal += r;
        resultadosDaRolar.push(r);
      }
      rolagensDetalhadas.push(`${match.toUpperCase()} [${resultadosDaRolar.join(", ")}]`);
      return somaLocal; 
    });

    let totalFinal = 0;
    try {
      const calculoSeguro = expressaoMatematica.replace(/[^0-9+\-*/(). ]/g, '');
      totalFinal = Function(`'use strict'; return (${calculoSeguro})`)();
    } catch (e) {
      totalFinal = "?";
    }

    // Calcula mod limpo para mostrar no popup rápido
    let modFixo = totalFinal;
    rolagensDetalhadas.forEach(() => { /* a rigor precisariamos subtrair os dados de totalFinal, mas vou manter limpo */ });
    
    if (totalFinal !== "?") totalFinal += buffs.totalExtra;

    const detalheBuff = buffs.rolagensDetalhadas ? ` | Buffs: ${buffs.rolagensDetalhadas}` : "";

    setResultadoDado({
      nome: `⚔️ Dano: ${nomeAtaque}`,
      valorDado: expressaoBaixa, 
      bonus: rolagensDetalhadas.length > 0 ? `${rolagensDetalhadas.join(" e ")}${detalheBuff}` : `Dano Fixo${detalheBuff}`, 
      total: totalFinal,
      critico: false,
      falha: false,
      isDano: true
    });

    const logsFormatados = rolagensDetalhadas.length > 0 ? rolagensDetalhadas.join(" e ") : "Dano Fixo";
    enviarRolagemParaMesa(`rolou dano de **${nomeComBuffs}**: ${logsFormatados} = **[ ${totalFinal} ]**`);
  }

  function mostrarMensagem(tituloTexto) {
    setResultadoDado({
      nome: "📢 MENSAGEM DO SISTEMA", valorDado: "-", bonus: "-",
      total: tituloTexto, critico: false, falha: false, isDano: true 
    });

    if (mesaId) {
       enviarRolagemParaMesa(`📢 **${tituloTexto}**`);
    }
  }

  if (!ficha) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Carregando...</div>;

  const condicoesAtivas = ficha.condicoes || [];
  const estaMorto = ficha.vidaAtual === 0;
  const temCondicoes = condicoesAtivas.length > 0 || estaMorto;

  return (
    <div className="app-container">
      
      <CaixaDeDados aoTerminarDeRolar={finalizarRolagem3D} />
      <Rolador resultado={resultadoDado} onFechar={() => setResultadoDado(null)} />

      {!temPermissao && (
        <div style={{ background: '#f44336', color: 'white', textAlign: 'center', padding: '8px', fontWeight: 'bold', marginBottom: '15px', borderRadius: '6px', letterSpacing: '1px' }}>
          🔒 MODO ESPECTADOR (Somente Leitura)
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Link to={mesaId ? `/mesa/${mesaId}` : "/"} style={{color: '#666', textDecoration: 'none', fontSize: '0.8rem'}}>
          {mesaId ? `⬅ Voltar à Mesa (${mesaId})` : "⬅ Voltar ao Menu"}
        </Link>

        {temPermissao && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#1a1a1a', padding: '6px 15px', borderRadius: '20px', border: '1px solid #444', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.75rem', color: usarDado3D ? '#4caf50' : '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>
              <input 
                type="checkbox" 
                checked={usarDado3D} 
                onChange={(e) => {
                  setUsarDado3D(e.target.checked);
                  localStorage.setItem('usarFicha3D', e.target.checked);
                }} 
              />
              Animar Dados
            </label>

            <div style={{ width: '1px', height: '20px', background: '#444' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#ccc', textTransform: 'uppercase', fontWeight: 'bold' }}>Cor:</span>
              <input
                type="color"
                value={ficha.corDado || "#ffcc00"}
                onChange={(e) => atualizarPersonagem("corDado", e.target.value)}
                style={{ width: '25px', height: '25px', border: 'none', cursor: 'pointer', background: 'transparent', padding: 0 }}
                title="Escolha a cor do seu dado 3D na mesa!"
              />
            </div>
          </div>
        )}
      </div>

      <div className="topo-ficha">
        <div className="area-identidade-full">
           <PainelIdentidade dados={ficha} aoSalvar={atualizarPersonagem} />
        </div>
        <div className="area-status">
          <StatusCombate dados={ficha} aoSalvar={atualizarPersonagem} aoRolar={rolarDado} aoSubirNivel={subirDeNivel} />
        </div>
      </div>

      <div className="barra-condicoes-ficha" style={{ 
        display: 'flex', gap: '10px', padding: '12px 15px', background: 'linear-gradient(90deg, #222 0%, #1a1a1a 100%)', 
        borderRadius: '8px', marginBottom: '15px', border: '1px solid #444', alignItems: 'center', flexWrap: 'wrap',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease-in'
      }}>
        <strong style={{ color: '#ffcc00', fontSize: '0.85rem', textTransform: 'uppercase', marginRight: '5px' }}>
          ⚠️ Status & Buffs:
        </strong>
        
        {estaMorto && (
          <span style={{ border: '1px solid #ff4444', color: '#ff4444', background: '#330000', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            😴 Inconsciente
          </span>
        )}
        
        {condicoesAtivas.map(c => {
           const condInfo = LISTA_CONDICOES.find(lc => lc.id === c);
           return (
             <span 
               key={c} 
               onClick={() => alternarCondicaoJogador(c)} 
               style={{ border: '1px solid #ffcc00', color: '#ffcc00', background: '#332b00', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }} 
               title="Clique para remover"
             >
               {condInfo?.icon || '❓'} {c} ✖
             </span>
           );
        })}

        {/* O BOTÃO QUE FALTAVA KKKKKK */}
        {temPermissao && (
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <button 
              onClick={() => setMenuCondicoesAberto(!menuCondicoesAberto)}
              style={{ background: '#333', color: 'white', border: '1px dashed #ffcc00', padding: '6px 12px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', transition: '0.2s' }}
            >
              ➕ Adicionar Status
            </button>

            {menuCondicoesAberto && (
              <div 
                onMouseLeave={() => setMenuCondicoesAberto(false)}
                style={{ position: 'absolute', top: '100%', right: '0', marginTop: '5px', background: '#111', border: '1px solid #ffcc00', borderRadius: '8px', padding: '10px', width: '280px', zIndex: 100, display: 'flex', flexWrap: 'wrap', gap: '5px', boxShadow: '0 5px 15px rgba(0,0,0,0.8)' }}
              >
                {LISTA_CONDICOES.map(cond => {
                  const ativo = condicoesAtivas.includes(cond.id);
                  return (
                    <button 
                      key={cond.id} 
                      onClick={() => alternarCondicaoJogador(cond.id)}
                      style={{ background: ativo ? '#ffcc00' : '#222', color: ativo ? 'black' : 'white', border: '1px solid #444', borderRadius: '4px', padding: '6px 8px', fontSize: '0.75rem', cursor: 'pointer', flex: '1 1 45%', textAlign: 'left', fontWeight: 'bold' }}
                    >
                      {cond.icon} {cond.id}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <nav className="menu-abas">
        <button className={abaAtiva === 'principal' ? 'ativo' : ''} onClick={() => setAbaAtiva('principal')}>🛡️ Principal</button>
        <button className={abaAtiva === 'combate' ? 'ativo' : ''} onClick={() => setAbaAtiva('combate')}>⚔️ Combate</button>
        <button className={abaAtiva === 'magias' ? 'ativo' : ''} onClick={() => setAbaAtiva('magias')}>✨ Grimório</button>
        <button className={abaAtiva === 'inventario' ? 'ativo' : ''} onClick={() => setAbaAtiva('inventario')}>🎒 Inventário</button>
        <button className={abaAtiva === 'features' ? 'ativo' : ''} onClick={() => setAbaAtiva('features')}>🧩 Características</button>
      </nav>

      <main>
        {abaAtiva === 'principal' && (
          <div className="layout-principal-com-lateral">
            <div className="coluna-central">
                <section className="secao-vitalidade">
               <BarraVida vidaMaxima={ficha.vidaMaxima || 10} vidaAtual={ficha.vidaAtual} vidaTemp={ficha.vidaTemp} dadosVida={ficha.dadosVida} constituicao={ficha.constituicao} aoSalvar={atualizarPersonagem} dados={ficha} aoMandarChatMesa={enviarRolagemParaMesa} />
            </section>
                <div className="layout-colunas">
                   <section className="coluna-atributos">
                      <Atributo nome="FORÇA" valorInicial={ficha.forca} chaveBanco="forca" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Força") || savesProficientes.includes("forca")} bonusProf={bonusProf}/>
                      <Atributo nome="DESTREZA" valorInicial={ficha.destreza} chaveBanco="destreza" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Destreza") || savesProficientes.includes("destreza")} bonusProf={bonusProf}/>
                      <Atributo nome="CONSTITUIÇÃO" valorInicial={ficha.constituicao} chaveBanco="constituicao" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Constituição") || savesProficientes.includes("constituicao")} bonusProf={bonusProf}/>
                      <Atributo nome="INTELIGÊNCIA" valorInicial={ficha.inteligencia} chaveBanco="inteligencia" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Inteligência") || savesProficientes.includes("inteligencia")} bonusProf={bonusProf}/>
                      <Atributo nome="SABEDORIA" valorInicial={ficha.sabedoria} chaveBanco="sabedoria" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Sabedoria") || savesProficientes.includes("sabedoria")} bonusProf={bonusProf}/>
                      <Atributo nome="CARISMA" valorInicial={ficha.carisma} chaveBanco="carisma" aoSalvar={atualizarPersonagem} aoRolar={rolarDado} proficiente={savesProficientes.includes("Carisma") || savesProficientes.includes("carisma")} bonusProf={bonusProf}/>
                      <div style={{gridColumn: '1 / -1', marginTop: '20px'}}><Resistencias dados={ficha} /></div>
                   </section>
                   <section className="coluna-pericias">
                      <ListaPericias dados={ficha} aoSalvar={atualizarPersonagem} aoRolar={rolarDado} />
                   </section>
                </div>
            </div>
            <aside className="coluna-lateral">
               <Sentidos dados={ficha} aoSalvar={atualizarPersonagem} />
               <div style={{marginTop: '20px'}}><Defesas dados={ficha} aoSalvar={atualizarPersonagem} /></div>
               <div style={{marginTop: '20px'}}><ProficienciasGerais dados={ficha} aoSalvar={atualizarPersonagem} /></div>
            </aside>
          </div>
        )}

        {abaAtiva === 'combate' && <section className="secao-combate"><AbaCombate dados={ficha} aoSalvar={atualizarPersonagem} aoRolar={rolarDado} aoRolarDano={rolarDano} /></section>}
        {abaAtiva === 'magias' && <section className="secao-magias"><Grimorio dados={ficha} aoSalvar={atualizarPersonagem} aoRolar={rolarDado} aoRolarDano={rolarDano} aoAvisar={mostrarMensagem} /></section>}
        {abaAtiva === 'inventario' && <section className="secao-inventario"><Inventario dados={ficha} aoSalvar={atualizarPersonagem} /></section>}
        {abaAtiva === 'features' && <section className="secao-features"><AbaCaracteristicas dados={ficha} aoSalvar={atualizarPersonagem} /></section>}
      </main>
    </div>
  );
}