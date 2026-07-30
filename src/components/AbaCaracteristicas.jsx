// src/components/AbaCaracteristicas.jsx
import { useState } from 'react';

function formatarTexto(texto) {
  if (!texto) return "";
  return texto.split('\n').map((paragrafo, indexPara) => (
    <p key={indexPara} style={{ margin: '0 0 8px 0' }}>
      {paragrafo.split(/\*\*(.*?)\*\*/g).map((parte, index) => {
        if (index % 2 === 1) {
          return <strong key={index} style={{ color: '#fff' }}>{parte}</strong>;
        }
        return parte;
      })}
    </p>
  ));
}

const ItemFeature = ({ item, lista, chaveBanco, aoSalvar }) => {
  const [expandido, setExpandido] = useState(false);
  const [itemParaDeletar, setItemParaDeletar] = useState(false);
  
  const textoExibicao = item.descricao || item.desc || "";
  
  function atualizarLista(novaLista) {
    if (aoSalvar) aoSalvar(chaveBanco, novaLista);
  }

  function toggleUso(index) {
    const usosMax = item.usosMax || 0;
    const gastosAtuais = item.usosGastos?.length || 0;
    const disponiveisAtuais = usosMax - gastosAtuais;
    let novosDisponiveis = index < disponiveisAtuais ? index : index + 1;
    const novosGastos = usosMax - novosDisponiveis;

    const novaLista = lista.map(it => it.id === item.id ? { ...it, usosGastos: Array(novosGastos).fill(true) } : it);
    atualizarLista(novaLista);
  }

  function setMaxUsos() {
    const max = prompt("Quantos usos por descanso?", item.usosMax || 0);
    if (max !== null) {
      const novaLista = lista.map(it => it.id === item.id ? { ...it, usosMax: parseInt(max) } : it);
      atualizarLista(novaLista);
    }
  }

  function toggleRecuperacao() {
    const recAtual = item.recuperacao || "Descanso Longo";
    const novaRec = recAtual === "Descanso Longo" ? "Descanso Curto" : "Descanso Longo";
    const novaLista = lista.map(it => it.id === item.id ? { ...it, recuperacao: novaRec } : it);
    atualizarLista(novaLista);
  }

  function editarDesc(txt) {
    const novaLista = lista.map(it => it.id === item.id ? { ...it, desc: txt, descricao: txt } : it);
    atualizarLista(novaLista);
  }

  const usosMax = item.usosMax || 0;
  const gastos = item.usosGastos?.length || 0;
  const disponiveis = usosMax - gastos;
  const tagDescanso = item.recuperacao === "Descanso Curto" ? "☕ SR" : "🌙 LR";

  return (
    <div className={`item-feature-complexo ${expandido ? 'aberto' : ''}`} style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <div className="feature-header" onClick={() => { setExpandido(!expandido); setItemParaDeletar(false); }} style={{ background: '#1e1e1e', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <span className="feat-nome" style={{ fontWeight: 'bold', color: '#e0e0e0' }}>
          {item.nome}
          {item.usosMax > 0 && <span style={{marginLeft:'8px', fontSize:'0.7rem', background:'#111', border: '1px solid #444', padding:'2px 6px', borderRadius:'4px', color:'#ffcc00'}}>{tagDescanso}</span>}
        </span>
        
        {item.usosMax > 0 && (
          <div className="feat-usos" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '5px' }}>
            {Array.from({ length: usosMax }).map((_, i) => (
              <div 
                key={i} 
                style={{ width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer', border: '1px solid #ffcc00', background: i < disponiveis ? '#ffcc00' : 'transparent' }}
                onClick={() => toggleUso(i)}
                title={i < disponiveis ? "Gastar carga" : "Recuperar carga"}
              ></div>
            ))}
          </div>
        )}
        
        <span className="seta" style={{ color: '#666', fontSize: '0.8rem', marginLeft: '10px' }}>{expandido ? "▲" : "▼"}</span>
      </div>

      {expandido && (
        <div className="feature-body" style={{ background: '#111', padding: '15px', borderTop: '1px solid #333' }}>
          <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '15px', background: '#0a0a0a', padding: '10px', borderRadius: '6px', border: '1px solid #222' }}>
            {formatarTexto(textoExibicao)}
          </div>

          <textarea 
            className="desc-editavel"
            value={textoExibicao}
            onChange={(e) => editarDesc(e.target.value)}
            placeholder="Digite a descrição da habilidade..."
            style={{ width: '100%', minHeight: '60px', background: '#1a1a1a', color: '#aaa', border: '1px dashed #444', borderRadius: '4px', padding: '8px', marginBottom: '10px', fontSize: '0.8rem' }}
          />
          
          <div className="feature-footer" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={setMaxUsos} style={{ background: '#222', border: '1px solid #444', color: '#aaa', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>⚙️ Usos</button>
            {item.usosMax > 0 && (
              <button onClick={toggleRecuperacao} title="Mudar tipo de descanso" style={{ background: '#222', border: '1px solid #444', color: item.recuperacao === "Descanso Curto" ? '#ffcc00' : '#88ccff', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>
                {item.recuperacao === "Descanso Curto" ? "☕ Restaura em Descanso Curto" : "🌙 Restaura em Descanso Longo"}
              </button>
            )}
            {itemParaDeletar ? (
              <button onClick={() => atualizarLista(lista.filter(x => x.id !== item.id))} style={{ marginLeft: 'auto', background: '#cc0000', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem' }}>Certeza?</button>
            ) : (
              <button onClick={() => setItemParaDeletar(true)} style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid #cc0000', color: '#cc0000', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️ Deletar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export function AbaCaracteristicas(props) {
  const talentos = props.dados.talentos || [];
  const tracosClasse = props.dados.tracosClasse || []; 
  const [abaAtiva, setAbaAtiva] = useState('classe'); 

  // 🧠 O CÉREBRO DA MATEMÁTICA (Agora a aba de Características sabe calcular o dragão!) 🧠
  const nivelAtivo = props.dados.nivel || 1;
  const profBonus = Math.ceil(nivelAtivo / 4) + 1;

  const tracosRaciais = (props.dados.tracosRaciais || []).map(traco => {
    let usosCalculados = traco.usosMax || 0;
    const nomeLower = (traco.nome || "").toLowerCase();
    
    // Injeta a mesma matemática da aba de combate aqui
    if (nomeLower.includes("arma de sopro")) usosCalculados = profBonus;
    else if (nomeLower.includes("voo dracônico") && nivelAtivo >= 5) usosCalculados = 1;

    return { ...traco, usosMax: usosCalculados };
  });

  function criarNovo(lista, chaveBanco) {
    const nome = prompt("Nome da Habilidade:");
    if (nome) {
      const novo = { id: Date.now(), nome, desc: "", usosMax: 0, usosGastos: [] };
      if (props.aoSalvar) props.aoSalvar(chaveBanco, [...lista, novo]);
    }
  }

  const btnStyle = (ativa, cor) => ({
    padding: '10px 20px', background: ativa ? cor : '#1a1a1a', color: ativa ? '#fff' : '#666',
    border: '1px solid', borderColor: ativa ? cor : '#333', borderRadius: '8px',
    fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px'
  });

  return (
    <div className="painel-caracteristicas" style={{ display: 'flex', flexDirection: 'column', width: '100%' , alignItems: 'center'}}>
      <div style={{ display: 'flex', gap: '15px', borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '20px'}}>
        <button style={btnStyle(abaAtiva === 'classe', '#ff4444')} onClick={() => setAbaAtiva('classe')}>⚔️ Classe</button>
        <button style={btnStyle(abaAtiva === 'raciais', '#44ff44')} onClick={() => setAbaAtiva('raciais')}>🧬 Raça</button>
        <button style={btnStyle(abaAtiva === 'talentos', '#ffcc00')} onClick={() => setAbaAtiva('talentos')}>⭐ Talentos</button>
      </div>

      <div style={{ width: '100%' }}>
        {abaAtiva === 'classe' && (
          <div className="bloco-dinamico fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#ff4444', margin: 0 }}>Características de Classe</h3>
              <button onClick={() => criarNovo(tracosClasse, "tracosClasse")} style={{ background: '#ff4444', color: '#111', border: 'none', borderRadius: '6px', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '15px' }}>
              {tracosClasse.map(item => <ItemFeature key={item.id} item={item} lista={tracosClasse} chaveBanco="tracosClasse" aoSalvar={props.aoSalvar} />)}
            </div>
          </div>
        )}
        {abaAtiva === 'raciais' && (
          <div className="bloco-dinamico fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#44ff44', margin: 0 }}>Traços Raciais</h3>
              <button onClick={() => criarNovo(tracosRaciais, "tracosRaciais")} style={{ background: '#44ff44', color: '#111', border: 'none', borderRadius: '6px', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '15px' }}>
              {tracosRaciais.map(item => <ItemFeature key={item.id} item={item} lista={tracosRaciais} chaveBanco="tracosRaciais" aoSalvar={props.aoSalvar} />)}
            </div>
          </div>
        )}
        {abaAtiva === 'talentos' && (
          <div className="bloco-dinamico fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#ffcc00', margin: 0 }}>Talentos</h3>
              <button onClick={() => criarNovo(talentos, "talentos")} style={{ background: '#ffcc00', color: '#111', border: 'none', borderRadius: '6px', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '15px' }}>
              {talentos.map(item => <ItemFeature key={item.id} item={item} lista={talentos} chaveBanco="talentos" aoSalvar={props.aoSalvar} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}