// src/components/Grimorio.jsx
import { MAGIAS } from '../data/magias';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';
import { escalarDanoTruque } from '../regras';

function calcularDanoUpcast(danoBase, upcastInfo, niveisAcima) {
  if (!upcastInfo || niveisAcima <= 0) return danoBase;
  if (!danoBase) return `Efeito Ampliado (Upcast: ${niveisAcima}x ${upcastInfo})`;

  const strBase = String(danoBase).trim();
  const strUpcast = String(upcastInfo).trim();

  const baseMatch = strBase.match(/(\d+)d(\d+)/i);
  const upcastMatch = strUpcast.match(/(\d+)d(\d+)/i);

  if (baseMatch && upcastMatch && baseMatch[2] === upcastMatch[2]) {
    const novaQtd = parseInt(baseMatch[1]) + (parseInt(upcastMatch[1]) * niveisAcima);
    return strBase.replace(/(\d+)d(\d+)/i, `${novaQtd}d${baseMatch[2]}`);
  }

  const multiMatch = strBase.match(/(\d+)x\s+(.+)/i);
  const upcastMultiMatch = strUpcast.match(/(\d+)x/i);

  if (multiMatch && upcastMultiMatch) {
    const novaQtd = parseInt(multiMatch[1]) + (parseInt(upcastMultiMatch[1]) * niveisAcima);
    return strBase.replace(/(\d+)x/i, `${novaQtd}x`);
  }

  return `${strBase} (Upcast: ${niveisAcima}x ${strUpcast})`;
}

export function Grimorio(props) {
  const [expandida, setExpandida] = useState(null);
  const [busca, setBusca] = useState("");
  const [modalMagiaAberto, setModalMagiaAberto] = useState(false);
  const [buscaCompendioMagia, setBuscaCompendioMagia] = useState("");
  const { id } = useParams();

  const dados = props.dados || {};
  const classeMinúscula = dados.classe?.toLowerCase() || '';
  let atributoMagico = 'inteligencia';

  if (['bardo', 'feiticeiro', 'bruxo', 'paladino'].includes(classeMinúscula)) {
    atributoMagico = 'carisma';
  } else if (['clérigo', 'druida', 'patrulheiro'].includes(classeMinúscula)) {
    atributoMagico = 'sabedoria';
  }

  const profBonus = Math.ceil((dados.nivel || 1) / 4) + 1;
  const valorAtributo = dados[atributoMagico] || dados.atributos?.[atributoMagico] || 10;
  const modAtributo = Math.floor((valorAtributo - 10) / 2);

  const cdMagia = 8 + profBonus + modAtributo;
  const ataqueMagico = profBonus + modAtributo;

  const resultadosCompendioMagia = buscaCompendioMagia.trim() === "" 
    ? [] 
    : MAGIAS.filter(m => m.nome.toLowerCase().includes(buscaCompendioMagia.toLowerCase()));

  async function adicionarMagiaDoCompendio(magiaDoBanco) {
    if (!id) return;
    const { classes, id: idBanco, ...restoMagia } = magiaDoBanco;
    const magiaFormatada = { id: "magia_" + Date.now().toString(), ...restoMagia };
    let chaveBanco = magiaDoBanco.nivel === 0 ? "magiasConhecidas.truques" : `magiasConhecidas.nivel${magiaDoBanco.nivel}`;

    try {
      await updateDoc(doc(db, "personagens", id), {
        [chaveBanco]: arrayUnion(magiaFormatada)
      });
      setModalMagiaAberto(false);
      setBuscaCompendioMagia("");
      if (props.aoAvisar) props.aoAvisar(`✨ A magia **${magiaDoBanco.nome}** foi transcrita para o Grimório!`);
    } catch (e) {
      console.error("Erro ao salvar magia:", e);
      alert("Erro ao adicionar magia ao grimório.");
    }
  }
  
  const infoClasse = CLASSES_DETALHADAS[dados.classe];
  const nivelPersonagem = dados.nivel || 1;
  const linhaNivel = infoClasse?.tabelaNiveis?.find(l => l.nivel === nivelPersonagem);
  const slotsMaximosPorNivel = linhaNivel?.slots || infoClasse?.magiasInicial?.slots || [0,0,0,0,0,0,0,0,0];
  const slotsGastosObj = dados.slotsGastos || {};

  function atualizarGastos(nivel, novoValor) {
    const limiteDoNivel = slotsMaximosPorNivel[nivel - 1] || 0;
    const gastoSeguro = Math.max(0, Math.min(novoValor, limiteDoNivel));
    const novosGastos = { ...slotsGastosObj, [nivel]: gastoSeguro };
    if (props.aoSalvar) props.aoSalvar("slotsGastos", novosGastos);
  }

  function toggleSlot(nivel, indexClicado) {
    const gastosAtuais = slotsGastosObj[nivel] || 0;
    if (indexClicado < gastosAtuais) atualizarGastos(nivel, indexClicado);
    else atualizarGastos(nivel, indexClicado + 1);
  }

  // 👇 AUTOMAÇÃO: JUNTA TUDO (Classe + Inatas + Talentos) 👇
  const todasMagiasConhecidas = [];
  
  // 1. Magias da Classe
  if (dados.magiasConhecidas) {
    if (dados.magiasConhecidas.truques) {
      todasMagiasConhecidas.push(...dados.magiasConhecidas.truques.map(m => ({ ...m, nivel: 0 })));
    }
    for (let i = 1; i <= 9; i++) {
      const chaveNivel = `nivel${i}`;
      if (dados.magiasConhecidas[chaveNivel]) {
        todasMagiasConhecidas.push(...dados.magiasConhecidas[chaveNivel].map(m => ({ ...m, nivel: i })));
      }
    }
  }

  // 2. Magias Inatas (Espécie)
  if (dados.magiasInatasRaca) {
    if (dados.magiasInatasRaca.truques) {
      todasMagiasConhecidas.push(...dados.magiasInatasRaca.truques.map(m => ({ ...m, nivel: 0, tagEspecial: "Herança" })));
    }
    for (let i = 1; i <= 9; i++) {
      const chaveNivel = `nivel${i}`;
      if (dados.magiasInatasRaca[chaveNivel]) {
        todasMagiasConhecidas.push(...dados.magiasInatasRaca[chaveNivel].map(m => ({ ...m, nivel: i, tagEspecial: "Herança" })));
      }
    }
  }

  // 3. Magias de Talento (Automação do Iniciado em Magia)
  if (dados.magiasDeTalento && dados.magiasDeTalento.length > 0) {
    todasMagiasConhecidas.push(...dados.magiasDeTalento.map(m => ({ ...m, tagEspecial: "Talento" })));
  }

  // 👇 AVISOS PENDENTES (Silencia o aviso se já estiver automatizado) 👇
  const avisosTalentos = [];
  if (dados.talentos) {
    dados.talentos.forEach(t => {
      // Verifica se a magia deste talento já foi automatizada e salva na ficha
      const jaAutomatizado = dados.magiasDeTalento && dados.magiasDeTalento.length > 0 && t.nome.includes("Iniciado em Magia");

      // Só avisa se for Tocado pelas Fadas/Filho do Sol OU se o Iniciado em Magia for do modelo antigo sem automação
      if (!jaAutomatizado && (t.nome.includes("Iniciado em Magia") || t.nome.includes("Tocado pelas") || t.nome.includes("Filho do Sol"))) {
        avisosTalentos.push(`Talento [${t.nome}]: Use o botão 'Pesquisar Magia' abaixo para adicionar os feitiços do seu talento!`);
      }
    });
  }

  const magiasFiltradas = todasMagiasConhecidas.filter(magia => {
    const nomeMagia = magia?.nome || "";
    return nomeMagia.toLowerCase().includes(busca.toLowerCase());
  });

  const magiasPorNivel = magiasFiltradas.reduce((acc, magia) => {
    const n = magia.nivel;
    if (!acc[n]) acc[n] = [];
    acc[n].push(magia);
    return acc;
  }, {});

  function toggleDetalhes(id) { setExpandida(expandida === id ? null : id); }

  return (
    <div className="painel-grimorio">
      <div style={{ display: 'flex', gap: '15px', background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #444', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#ffcc00' }}>Conjuração: {dados.classe || 'Desconhecida'}</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa', textTransform: 'capitalize' }}>Atributo Chave: {atributoMagico}</p>
        </div>
        <div style={{ textAlign: 'center', background: '#333', padding: '10px 20px', borderRadius: '6px', border: '1px solid #555' }}>
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#ccc', textTransform: 'uppercase' }}>CD de Magia</span>
          <strong style={{ fontSize: '1.5rem', color: 'white' }}>{cdMagia}</strong>
        </div>
        <div style={{ textAlign: 'center', background: '#333', padding: '10px 20px', borderRadius: '6px', border: '1px solid #555' }}>
          <span style={{ display: 'block', fontSize: '0.7rem', color: '#ccc', textTransform: 'uppercase' }}>Ataque Mágico</span>
          <strong style={{ fontSize: '1.5rem', color: 'white' }}>+{ataqueMagico}</strong>
        </div>
      </div>

      {avisosTalentos.length > 0 && (
        <div style={{ background: 'rgba(255, 204, 0, 0.1)', border: '1px solid #ffcc00', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong style={{color: '#ffcc00', fontSize: '0.9rem'}}>🧩 Lembrete de Talentos:</strong>
          <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', color: '#ddd', fontSize: '0.85rem' }}>
            {avisosTalentos.map((aviso, idx) => (
              <li key={idx}>{aviso}</li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={() => setModalMagiaAberto(true)}
        style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'linear-gradient(90deg, #6a1b9a 0%, #283593 100%)', border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', boxShadow: '0 4px 15px rgba(106, 27, 154, 0.4)' }}
      >
        🔮 Pesquisar Magia Arcana e Adicionar ao Grimório
      </button>

      {modalMagiaAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setModalMagiaAberto(false)}>
          <div style={{ background: '#1a1a1a', width: '90%', maxWidth: '550px', height: '80vh', borderRadius: '12px', border: '1px solid #444', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.9)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '15px 20px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#e1bee7' }}>📜 Tomo de Feitiços Universais</h3>
              <button onClick={() => setModalMagiaAberto(false)} style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
            </div>
            <div style={{ padding: '15px' }}>
              <input 
                type="text" 
                placeholder="Pesquise por nome (Ex: Fireball, Cure Wounds)..." 
                value={buscaCompendioMagia}
                onChange={(e) => setBuscaCompendioMagia(e.target.value)}
                autoFocus
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #6a1b9a', background: '#0a0a0a', color: '#fff', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 15px 15px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {buscaCompendioMagia.trim() === "" ? (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Invoque uma palavra-chave para revelar os segredos cósmicos...</p>
              ) : resultadosCompendioMagia.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#ffcc00', padding: '20px' }}>Nenhuma magia atende por este nome.</p>
              ) : (
                resultadosCompendioMagia.map(magia => {
                  const jogadorJaTem = todasMagiasConhecidas.some(m => m.nome === magia.nome);
                  return (
                    <div 
                      key={magia.id}
                      onClick={() => !jogadorJaTem && adicionarMagiaDoCompendio(magia)}
                      style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '12px', cursor: jogadorJaTem ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', borderLeft: '4px solid #6a1b9a', opacity: jogadorJaTem ? 0.5 : 1 }}
                      onMouseOver={(e) => { if (!jogadorJaTem) e.currentTarget.style.background = '#222' }}
                      onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <strong style={{ color: '#e1bee7' }}>{magia.nome} {jogadorJaTem && "✅"}</strong>
                        <span style={{ fontSize: '0.7rem', color: '#fff', background: magia.nivel === 0 ? '#4caf50' : '#d35400', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                          {magia.nivel === 0 ? "Truque" : `Círculo ${magia.nivel}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>
                        <span>{magia.escola}</span><span>•</span><span>{magia.tempo}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#aaa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {magia.descricao}
                      </div>
                      {magia.dano && (
                        <div style={{ marginTop: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: '#ffcc00' }}>
                          🎲 Dano Base: {magia.dano} {magia.tipoDano && `(${magia.tipoDano})`}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="barra-pesquisa-container">
        <span className="icone-pesquisa">🔍</span>
        <input
          type="text"
          className="input-pesquisa"
          placeholder="Pesquisar magia no grimório..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {todasMagiasConhecidas.length > 0 && magiasFiltradas.length === 0 && (
        <p className="vazio" style={{ textAlign: 'center', color: '#ffcc00', padding: '20px' }}>
          Nenhuma magia encontrada com esse nome.
        </p>
      )}

      {/* --- NÍVEL 0 (TRUQUES) --- */}
      <div className="nivel-magia-container">
        <h4 className="titulo-nivel">Truques (Cantrips)</h4>
        <div className="grid-magias">
          {(magiasPorNivel[0] || []).map(magia => (
            <CardMagia 
              key={magia.id} 
              magia={magia} 
              nivelPersonagem={nivelPersonagem}
              expandida={expandida} 
              toggle={toggleDetalhes} 
              aoRolar={props.aoRolar}
              aoRolarDano={props.aoRolarDano}
              aoAvisar={props.aoAvisar}
            />
          ))}
          {(!magiasPorNivel[0] || magiasPorNivel[0].length === 0) && busca === "" && <p className="vazio-mini">Nenhum truque.</p>}
        </div>
      </div>

      {/* --- NÍVEIS 1 a 9 --- */}
      {slotsMaximosPorNivel.map((qtdSlots, indexArray) => {
        const nivelMagia = indexArray + 1;
        
        if (qtdSlots === 0 && (!magiasPorNivel[nivelMagia] || magiasPorNivel[nivelMagia].length === 0)) return null;

        const gastos = slotsGastosObj[nivelMagia] || 0;

        return (
          <div key={nivelMagia} className="nivel-magia-container">
            <div className="header-nivel-interativo">
              <h4 className="titulo-nivel" style={{margin:0, border:'none'}}>{nivelMagia}º Círculo</h4>
              <div className="slots-area">
                {qtdSlots > 0 ? (
                  Array.from({ length: qtdSlots }).map((_, i) => {
                    const isGasto = i < gastos;
                    return (
                      <div 
                        key={i} 
                        className={`slot-interativo ${isGasto ? 'gasto' : 'cheio'}`}
                        onClick={() => toggleSlot(nivelMagia, i)}
                        title={isGasto ? "Recuperar Slot" : "Gastar Slot"}
                      ></div>
                    );
                  })
                ) : (
                  <small style={{color:'#666'}}>(Sem slots / Magia Bônus)</small>
                )}
              </div>
            </div>
            <hr style={{borderColor:'#333', marginBottom:'15px'}}/>

            <div className="grid-magias">
              {(magiasPorNivel[nivelMagia] || []).map(magia => (
                <CardMagia 
                  key={magia.id} 
                  magia={magia} 
                  expandida={expandida} 
                  toggle={toggleDetalhes} 
                  aoRolar={props.aoRolar}
                  aoRolarDano={props.aoRolarDano}
                  aoAvisar={props.aoAvisar}
                  slotsMaximos={slotsMaximosPorNivel}
                  slotsGastos={slotsGastosObj}
                  aoGastarSlot={(nivelUsado) => atualizarGastos(nivelUsado, (slotsGastosObj[nivelUsado] || 0) + 1)} 
                />
              ))}
              {(!magiasPorNivel[nivelMagia] || magiasPorNivel[nivelMagia].length === 0) && busca === "" && (
                <p className="vazio-mini">Nenhuma magia preparada.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- CARD DE MAGIA COM ROLADOR E UPCAST ---
function CardMagia({ magia, nivelPersonagem, expandida, toggle, aoRolar, aoRolarDano, aoAvisar, aoGastarSlot, slotsMaximos = [], slotsGastos = {} }) {
  const isOpen = expandida === magia.id;
  
  const isRitual = magia.ritual || (magia.tempo && magia.tempo.includes("Ritual"));
  const isConcentracao = magia.concentracao || (magia.duracao && magia.duracao.includes("Concentração"));

  const [nivelUpcast, setNivelUpcast] = useState(magia.nivel);

  const slotsDisponiveisParaUpcast = [];
  if (magia.nivel > 0) {
    for (let i = magia.nivel; i <= 9; i++) {
      const maximo = slotsMaximos[i - 1] || 0;
      if (maximo > 0) {
        const gastos = slotsGastos[i] || 0;
        slotsDisponiveisParaUpcast.push({
          nivel: i,
          temSlot: gastos < maximo
        });
      }
    }
  }

  // 👇 Permite lançar direto sem slot se for Herança OU Talento! 👇
  const isEspecial = magia.tagEspecial === "Herança" || magia.tagEspecial === "Talento";
  const slotAtualSelecionadoEstaVazio = !isEspecial && magia.nivel > 0 && slotsDisponiveisParaUpcast.find(s => s.nivel === parseInt(nivelUpcast))?.temSlot === false;
  
  let danoExibido = magia.dano;
  const diferencaNivel = parseInt(nivelUpcast) - magia.nivel;

  if (magia.nivel === 0 && nivelPersonagem && magia.dano) {
    danoExibido = escalarDanoTruque(magia.dano, nivelPersonagem);
  } else if (magia.nivel > 0 && diferencaNivel > 0 && magia.upcast) {
    danoExibido = calcularDanoUpcast(magia.dano, magia.upcast, diferencaNivel);
  }

  function rolarMagia(isRitual = false) {
    // Gasta slot só se não for ritual e nem magia especial gratuita
    if (!isRitual && !isEspecial && magia.nivel > 0 && aoGastarSlot) {
       aoGastarSlot(parseInt(nivelUpcast));
    }

    if (danoExibido && aoRolarDano) {
        aoRolarDano(magia.nome, String(danoExibido));
    } 
    else if (aoAvisar) {
        const notaUpcast = (magia.nivel > 0 && parseInt(nivelUpcast) > magia.nivel) ? ` (Upcast Nível ${nivelUpcast})` : "";
        const notaRitual = isRitual ? " (Ritual)" : "";
        const notaEspecial = isEspecial ? ` (Magia de ${magia.tagEspecial})` : "";
        aoAvisar(`Lançou ${magia.nome}!${notaUpcast}${notaRitual}${notaEspecial}`); 
    } else {
        alert(`🧙‍♂️ Conjurando ${magia.nome}!`);
    }
  }

  function getTagColor(tempo) {
    if (tempo && tempo.includes("Bônus")) return "tag-bonus";
    if (tempo && tempo.includes("Reação")) return "tag-reacao";
    return "tag-acao";
  }

  return (
    <div className={`card-magia ${isOpen ? 'aberto' : ''}`} onClick={() => toggle(magia.id)}>
      <div className="cabecalho-magia" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <div className="magia-info-topo" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <span className="magia-nome">{magia.nome}</span>
          {isConcentracao && <span className="tag-concentracao" title="Concentração">👁️</span>}
          {isRitual && <span className="tag-ritual" title="Ritual" style={{background:'#6a1b9a', color:'white', padding:'2px 6px', borderRadius:'4px', fontSize:'0.7rem', fontWeight:'bold'}}>R</span>}
          {magia.tagEspecial && <span title={`Magia de ${magia.tagEspecial}`} style={{background:'#4caf50', color:'white', padding:'2px 6px', borderRadius:'4px', fontSize:'0.65rem', fontWeight:'bold', textTransform: 'uppercase'}}>{magia.tagEspecial}</span>}
        </div>
        <div className="magia-tags" style={{ flexShrink: 0 }}>
          <span className={`tag-tempo ${getTagColor(magia.tempo || "")}`}>{magia.tempo || "Ação"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="corpo-magia">
          <div className="info-grid">
            <div><strong>Alcance:</strong> {magia.alcance}</div>
            <div><strong>Comp:</strong> {magia.componentes?.join(", ")}</div>
            <div><strong>Duração:</strong> {magia.duracao}</div>
          </div>
          <p className="descricao-magia">{magia.descricao}</p>
          
          {danoExibido && (
            <div className="box-efeito dano">
              🎲 {danoExibido} {magia.tipoDano ? `(${magia.tipoDano})` : ''}
              {diferencaNivel > 0 && <small style={{marginLeft:5, color:'#ffd700'}}>(Upcast)</small>}
            </div>
          )}
          
          <div className="acoes-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {magia.nivel > 0 && slotsDisponiveisParaUpcast.length > 0 && !isEspecial && (
                <select 
                  value={nivelUpcast} 
                  onChange={(e) => setNivelUpcast(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '4px' }}
                >
                  {slotsDisponiveisParaUpcast.map(slot => (
                    <option key={slot.nivel} value={slot.nivel}>
                      Círculo {slot.nivel} {slot.temSlot ? "" : "(Vazio)"}
                    </option>
                  ))}
                </select>
              )}
              
              <button 
                className="btn-lancar" 
                disabled={slotAtualSelecionadoEstaVazio}
                style={{ 
                  flex: 1, 
                  margin: 0,
                  opacity: slotAtualSelecionadoEstaVazio ? 0.5 : 1, 
                  cursor: slotAtualSelecionadoEstaVazio ? 'not-allowed' : 'pointer',
                  background: isEspecial ? '#4caf50' : '' // Destaca botão de inata/talento!
                }}
                onClick={(e) => { e.stopPropagation(); rolarMagia(false); }}
              >
                {isEspecial 
                  ? `⚡ LANÇAR (${magia.tagEspecial.toUpperCase()})`
                  : magia.nivel > 0 
                    ? (slotAtualSelecionadoEstaVazio ? "❌ Sem Slots" : "⚡ LANÇAR E GASTAR") 
                    : "⚡ Lançar"}
              </button>
            </div>

            {isRitual && (
              <button 
                onClick={(e) => { e.stopPropagation(); rolarMagia(true); }}
                style={{ 
                  width: '100%', padding: '10px', background: 'transparent', border: '1px solid #6a1b9a', 
                  color: '#e1bee7', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >
                🔮 Lançar como Ritual (10 min / Sem Gastar Slot)
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
}