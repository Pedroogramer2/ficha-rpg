// src/components/AbaCaracteristicas.jsx
import { useState } from 'react';

export function AbaCaracteristicas(props) {
  const [talentos, setTalentos] = useState(props.dados.talentos || []);
  const [tracosRaciais, setTracosRaciais] = useState(props.dados.tracosRaciais || []);
  const [tracosClasse, setTracosClasse] = useState(props.dados.tracosClasse || []); 

  function atualizarLista(chaveBanco, novaLista, setLocal) {
    setLocal(novaLista);
    if (props.aoSalvar) props.aoSalvar(chaveBanco, novaLista);
  }

  const ItemFeature = ({ item, lista, setLista, chaveBanco }) => {
    const [expandido, setExpandido] = useState(false);
    
    // 👇 ESTADO LOCAL PARA CONFIRMAÇÃO DO DOUBLE-TAP 👇
    const [itemParaDeletar, setItemParaDeletar] = useState(false);
    
    function toggleUso(index) {
      const usosMax = item.usosMax || 0;
      const gastosAtuais = item.usosGastos?.length || 0;
      const disponiveisAtuais = usosMax - gastosAtuais;

      let novosDisponiveis;
      
      if (index < disponiveisAtuais) {
        novosDisponiveis = index;
      } else {
        novosDisponiveis = index + 1;
      }

      const novosGastos = usosMax - novosDisponiveis;

      const novaLista = lista.map(it => {
        if (it.id === item.id) return { ...it, usosGastos: Array(novosGastos).fill(true) };
        return it;
      });
      atualizarLista(chaveBanco, novaLista, setLista);
    }

    function setMaxUsos() {
      const max = prompt("Quantos usos por descanso?", item.usosMax || 0);
      if (max !== null) {
        const novaLista = lista.map(it => it.id === item.id ? { ...it, usosMax: parseInt(max) } : it);
        atualizarLista(chaveBanco, novaLista, setLista);
      }
    }

    function toggleRecuperacao() {
      const recAtual = item.recuperacao || "Descanso Longo";
      const novaRec = recAtual === "Descanso Longo" ? "Descanso Curto" : "Descanso Longo";
      const novaLista = lista.map(it => it.id === item.id ? { ...it, recuperacao: novaRec } : it);
      atualizarLista(chaveBanco, novaLista, setLista);
    }

    function editarDesc(txt) {
      const novaLista = lista.map(it => it.id === item.id ? { ...it, descricao: txt } : it);
      atualizarLista(chaveBanco, novaLista, setLista);
    }

    const usosMax = item.usosMax || 0;
    const gastos = item.usosGastos?.length || 0;
    const disponiveis = usosMax - gastos;
    const tagDescanso = item.recuperacao === "Descanso Curto" ? "☕ SR" : "🌙 LR";

    return (
      <div className={`item-feature-complexo ${expandido ? 'aberto' : ''}`}>
        <div className="feature-header" onClick={() => { setExpandido(!expandido); setItemParaDeletar(false); }}>
          <span className="feat-nome">
            {item.nome}
            {item.usosMax > 0 && <span style={{marginLeft:'8px', fontSize:'0.7rem', background:'#111', padding:'2px 6px', borderRadius:'4px', color:'#aaa'}}>{tagDescanso}</span>}
          </span>
          
          {item.usosMax > 0 && (
            <div className="feat-usos" onClick={(e) => e.stopPropagation()}>
              {Array.from({ length: usosMax }).map((_, i) => (
                <div 
                  key={i} 
                  className={`bolinha-uso ${i < disponiveis ? 'gasto' : ''}`}
                  onClick={() => toggleUso(i)}
                  title={i < disponiveis ? "Gastar carga" : "Recuperar carga"}
                ></div>
              ))}
            </div>
          )}
          
          <span className="seta">{expandido ? "▲" : "▼"}</span>
        </div>

        {expandido && (
          <div className="feature-body">
            <textarea 
              className="desc-editavel"
              value={item.descricao || ""}
              onChange={(e) => editarDesc(e.target.value)}
              placeholder="Digite a descrição da habilidade..."
            />
            
            <div className="feature-footer" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              <button onClick={setMaxUsos}>⚙️ Qtd Usos</button>
              
              {item.usosMax > 0 && (
                <button onClick={toggleRecuperacao} title="Mudar tipo de descanso" style={{ color: item.recuperacao === "Descanso Curto" ? '#ffcc00' : '#88ccff' }}>
                  {item.recuperacao === "Descanso Curto" ? "☕ Volta no Curto" : "🌙 Volta no Longo"}
                </button>
              )}

              {/* 👇 INVERSÃO DO CONFIRM FEIO PELO BOTÃO INTEGRADO 👇 */}
              {itemParaDeletar ? (
                <button 
                  onClick={() => atualizarLista(chaveBanco, lista.filter(x => x.id !== item.id), setLista)}
                  style={{ marginLeft: 'auto', background: '#cc0000', color: 'white', fontWeight: 'bold', border: '1px solid #cc0000', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Certeza?
                </button>
              ) : (
                <button 
                  className="btn-del" 
                  onClick={() => setItemParaDeletar(true)} 
                  style={{ marginLeft: 'auto' }}
                >
                  🗑️ Deletar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  function criarNovo(lista, setLista, chaveBanco) {
    const nome = prompt("Nome da Habilidade:");
    if (nome) {
      const novo = { id: Date.now(), nome, descricao: "", usosMax: 0, usosGastos: [] };
      atualizarLista(chaveBanco, [...lista, novo], setLista);
    }
  }

  return (
    <div className="painel-caracteristicas">
      
      {/* Bloco Talentos */}
      <div className="bloco-lista-feat" style={{borderColor: '#ffcc00'}}>
        <div className="titulo-bloco" style={{color: '#ffcc00'}}>
          <h4>Talentos</h4>
          <button onClick={() => criarNovo(talentos, setTalentos, "talentos")}>+</button>
        </div>
        {talentos.map(item => (
          <ItemFeature key={item.id} item={item} lista={talentos} setLista={setTalentos} chaveBanco="talentos" />
        ))}
      </div>

      {/* Bloco Raciais */}
      <div className="bloco-lista-feat" style={{borderColor: '#44ff44'}}>
        <div className="titulo-bloco" style={{color: '#44ff44'}}>
          <h4>Traços Raciais</h4>
          <button onClick={() => criarNovo(tracosRaciais, setTracosRaciais, "tracosRaciais")}>+</button> 
        </div>
        {tracosRaciais.map(item => (
          <ItemFeature key={item.id} item={item} lista={tracosRaciais} setLista={setTracosRaciais} chaveBanco="tracosRaciais" />
        ))}
      </div>

      {/* Bloco Classe */}
      <div className="bloco-lista-feat" style={{borderColor: '#ff4444'}}>
        <div className="titulo-bloco" style={{color: '#ff4444'}}>
          <h4>Características de Classe</h4>
          <button onClick={() => criarNovo(tracosClasse, setTracosClasse, "tracosClasse")}>+</button>
        </div>
        {tracosClasse.map(item => (
          <ItemFeature key={item.id} item={item} lista={tracosClasse} setLista={setTracosClasse} chaveBanco="tracosClasse" />
        ))}
      </div>

    </div>
  );
}