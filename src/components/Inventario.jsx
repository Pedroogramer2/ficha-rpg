// src/components/Inventario.jsx
import { useState, useEffect } from 'react';

import { INVOCACOES } from '../data/invocacoes'; 
import { ARMAS } from '../data/armas'; 

export function Inventario(props) {
  const [itens, setItens] = useState([]);
  const [moedas, setMoedas] = useState({ pc: 0, pp: 0, pe: 0, po: 0, pl: 0 });
  const [novoItem, setNovoItem] = useState("");
  const [expandido, setExpandido] = useState(null); // O Segredo da Sanfona
  const [itemParaDeletar, setItemParaDeletar] = useState(null); // Fim do 'alert' feio

  useEffect(() => {
    setItens(props.dados.inventario || []);
    setMoedas(props.dados.moedas || { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 });
  }, [props.dados]);

  function atualizarBanco(novosItens, novasMoedas) {
    if (novosItens) setItens(novosItens);
    if (novasMoedas) setMoedas(novasMoedas);
    
    if (props.aoSalvar) {
      if (novosItens) props.aoSalvar("inventario", novosItens);
      if (novasMoedas) props.aoSalvar("moedas", novasMoedas);
    }
  }

  // --- MATEMÁTICA DA RIQUEZA E PESO ---
  // Puxa a Força da ficha (ou 10 se não tiver) para calcular a regra de Carga
  const forca = props.dados.forca || 10;
  const capacidadeCarga = forca * 15;
  const pesoTotal = itens.reduce((acc, item) => acc + ((parseFloat(item.peso) || 0) * item.qtd), 0);
  
  // O Contador Automático do Tio Patinhas (Tudo vira Ouro)
  const patrimonioPO = 
    (moedas.pc / 100) + 
    (moedas.pp / 10) + 
    (moedas.pe / 2) + 
    (moedas.po || 0) + 
    (moedas.pl * 10);

  // --- MOEDAS ---
  function mudarMoeda(tipo, valor) {
    const novaCarteira = { ...moedas, [tipo]: parseInt(valor) || 0 };
    atualizarBanco(null, novaCarteira);
  }

  // --- DICIONÁRIO INVISÍVEL DE PESOS (D&D 2024) ---
  const PESOS_PADRAO = {
    "adaga": 1,
    "espada longa": 3,
    "espada curta": 2,
    "rapiere": 2,
    "arco longo": 2,
    "arco curto": 2,
    "flechas (20)": 1,
    "poção de cura": 0.5,
    "corda": 10,
    "mochila": 5,
    "saco de dormir": 7,
    "rações": 2, // 2 lbs por dia
    "tocha": 1,
    "foco arcano": 1,
    "bordão": 4,
    "símbolo sagrado": 1,
    "livro": 5,
    "cota de malha": 55,
    "armadura de couro": 10
  };

// Você pode remover o objeto PESOS_PADRAO estático de dentro do componente e usar a busca inteligente:
function adicionar() {
  if (!novoItem.trim()) return; 

  const nomeFormatado = novoItem.trim().toLowerCase();
  let pesoEncontrado = 0;

  // Percorre o nosso novo dicionário unificado
  // Mapeamos chaves simples para cruzar dados com o que o usuário digita
  const chavesDicionario = {
    "adaga": 1, "espada longa": 3, "espada curta": 2, "rapiera": 2,
    "arco longo": 2, "arco curto": 2, "flechas": 1, "poção": 0.5,
    "corda": 5, "mochila": 5, "dormir": 7, "rações": 2, "tocha": 1,
    "cota de malha": 55, "couro": 10, "couro batido": 13, "explorador": 59,
    "masmorra": 34, "estudioso": 30, "grimório": 3
  };

  for (const [chave, peso] of Object.entries(chavesDicionario)) {
    if (nomeFormatado.includes(chave)) {
      pesoEncontrado = peso;
      break;
    }
  }

  const item = { 
    id: Date.now(), 
    nome: novoItem.trim(), 
    qtd: 1, 
    peso: pesoEncontrado,
    descricao: "" 
  };
  
  atualizarBanco([...itens, item], null);
  setNovoItem("");
}

  function mudarQtd(id, delta) {
    const novaLista = itens.map(item => {
      if (item.id === id) {
        return { ...item, qtd: Math.max(0, item.qtd + delta) };
      }
      return item;
    });
    atualizarBanco(novaLista, null);
  }

  function atualizarDetalhes(id, campo, valor) {
    const novaLista = itens.map(item => {
      if (item.id === id) {
        return { ...item, [campo]: valor };
      }
      return item;
    });
    atualizarBanco(novaLista, null);
  }

  function remover(id) {
    atualizarBanco(itens.filter(item => item.id !== id), null);
    setExpandido(null);
    setItemParaDeletar(null);
  }

  function toggleExpandir(id) {
    setExpandido(expandido === id ? null : id);
    setItemParaDeletar(null); // Reseta o botão de deletar se o cara abrir outro item
  }

  return (
    <div className="painel-inventario">
      
      {/* --- MOEDAS E RIQUEZA --- */}
      <div className="carteira-container">
        {['pl', 'po', 'pe', 'pp', 'pc'].map(tipo => (
          <div key={tipo} className={`moeda-box ${tipo}`}>
            <label>{tipo.toUpperCase()}</label>
            <input 
              type="number" 
              value={moedas[tipo] === 0 ? '' : moedas[tipo]} // Some o 0 para ser mais fácil de digitar
              placeholder="0"
              onChange={(e) => mudarMoeda(tipo, e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: '#888', fontSize: '0.9rem' }}>
        Patrimônio Total: <strong style={{ color: '#ffd700' }}>{patrimonioPO.toFixed(2)} PO</strong>
      </div>

      {/* --- BARRA DE CARGA VISUAL --- */}
      <div className="carga-container" style={{ background: '#111', padding: '15px', borderRadius: '8px', border: '1px solid #333', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
          <strong>Capacidade de Carga</strong>
          <span style={{ color: pesoTotal > capacidadeCarga ? '#ff4444' : '#aaa' }}>
            {pesoTotal.toFixed(1)} / {capacidadeCarga} lbs
          </span>
        </div>
        <div style={{ width: '100%', height: '10px', background: '#000', borderRadius: '5px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              background: pesoTotal > capacidadeCarga ? '#ff4444' : '#4caf50',
              width: `${Math.min((pesoTotal / capacidadeCarga) * 100, 100)}%`,
              transition: 'width 0.3s ease, background 0.3s ease'
            }}
          ></div>
        </div>
        {pesoTotal > capacidadeCarga && (
          <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            ⚠️ Você está sobrecarregado! (Deslocamento reduzido em 10ft)
          </p>
        )}
      </div>

      <h3>🎒 Mochila</h3>

      {/* --- ADD ITEM --- */}
      <div className="add-item-box" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nome do Novo Item..." 
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && adicionar()}
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
        />
        <button onClick={adicionar} style={{ padding: '10px 25px', borderRadius: '6px', background: '#333', border: '1px solid #555', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          Adicionar
        </button>
      </div>

      {/* --- LISTA DE ITENS SANFONADA --- */}
      <div className="lista-itens">
        {itens.length === 0 && <p className="vazio" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Sua mochila está vazia...</p>}

        {itens.map((item) => {
          const isOpen = expandido === item.id;

          return (
            <div key={item.id} className="item-card" style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
              
              {/* CABEÇALHO DO ITEM (Clica para expandir) */}
              <div 
                className="item-row-click"
                onClick={() => toggleExpandir(item.id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', cursor: 'pointer', background: isOpen ? '#222' : 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{isOpen ? '📂' : '📁'}</span>
                  <span className="item-nome" style={{ fontWeight: 'bold' }}>
                    {item.nome}
                    {item.origem && <small className="tag-origem" style={{ marginLeft: '10px', background: '#333', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#aaa' }}>{item.origem}</small>}
                  </span>
                </div>
                
                {/* CONTROLES DE QTD (e.stopPropagation impede que o clique abra/feche a sanfona) */}
                <div className="controles-qtd" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0a0a0a', padding: '4px 8px', borderRadius: '20px', border: '1px solid #333' }}>
                  <button onClick={() => mudarQtd(item.id, -1)} style={{ background: '#222', border: 'none', color: '#fff', cursor: 'pointer', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{item.qtd}</span>
                  <button onClick={() => mudarQtd(item.id, 1)} style={{ background: '#222', border: 'none', color: '#fff', cursor: 'pointer', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>

              {/* MIOLO DO ITEM (Detalhes de Peso e Descrição) */}
              {isOpen && (
                <div className="item-detalhes" style={{ padding: '15px', borderTop: '1px solid #333', background: '#111' }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    
                    {/* Descrição */}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Descrição / Efeitos Mágicos</label>
                      <textarea 
                        value={item.descricao || ""}
                        onChange={(e) => atualizarDetalhes(item.id, "descricao", e.target.value)}
                        placeholder="Adicione notas, efeitos de poção, etc..."
                        style={{ width: '100%', height: '80px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '6px', resize: 'none' }}
                      />
                    </div>

                    {/* Peso e Botão de Deletar */}
                    <div style={{ width: '130px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Peso (Unidade)</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#0a0a0a', border: '1px solid #333', borderRadius: '6px', paddingRight: '10px' }}>
                          <input 
                            type="number" 
                            step="0.1"
                            value={item.peso === 0 ? '' : item.peso}
                            onChange={(e) => atualizarDetalhes(item.id, "peso", e.target.value)}
                            placeholder="0"
                            style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '10px' }}
                          />
                          <span style={{ fontSize: '0.8rem', color: '#666' }}>lbs</span>
                        </div>
                      </div>

                      {/* Botão Dinâmico de Exclusão (Substitui o Confirm) */}
                      {itemParaDeletar === item.id ? (
                        <button 
                          onClick={() => remover(item.id)}
                          style={{ background: '#ff4444', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          Certeza?
                        </button>
                      ) : (
                        <button 
                          onClick={() => setItemParaDeletar(item.id)}
                          style={{ background: 'transparent', color: '#ff4444', border: '1px solid #ff4444', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          🗑️ Jogar Fora
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}