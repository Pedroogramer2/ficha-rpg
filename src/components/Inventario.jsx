// src/components/Inventario.jsx
import { useState, useEffect } from 'react';

import { INVOCACOES } from '../data/invocacoes'; 
import { ARMAS } from '../data/armas'; 
import itensMagicos from '../data/itensMagicos';

export function Inventario(props) {
  const [itens, setItens] = useState([]);
  const [moedas, setMoedas] = useState({ pc: 0, pp: 0, pe: 0, po: 0, pl: 0 });
  const [novoItem, setNovoItem] = useState("");
  const [expandido, setExpandido] = useState(null); 
  const [itemParaDeletar, setItemParaDeletar] = useState(null); 
  const [busca, setBusca] = useState(""); 
  const [modalAberto, setModalAberto] = useState(false);
  const [buscaCompendio, setBuscaCompendio] = useState("");

  const todosOsItensDoBanco = [
    ...ARMAS.map(a => ({ ...a, isMagico: false, tipoItem: "Arma" })),
    ...Object.values(itensMagicos).flatMap(arr => arr).map(i => ({ ...i, isMagico: true }))
  ];

  const resultadosCompendio = buscaCompendio.trim() === "" 
    ? [] 
    : todosOsItensDoBanco.filter(i => i.nome.toLowerCase().includes(buscaCompendio.toLowerCase()));

  // 👇 ADICIONA DIRETO DO BANCO DE DADOS 👇
  function adicionarDoCompendio(itemDoBanco) {
    
    // Expressão regular ninja para extrair "Tem X cargas" ou "possui X cargas" do texto da descrição
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
    
    atualizarBanco([...itens, itemFormatado], null);
    setModalAberto(false);
    setBuscaCompendio("");
  }

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

  const forca = props.dados.forca || 10;
  const capacidadeCarga = forca * 15;
  const pesoTotal = itens.reduce((acc, item) => acc + ((parseFloat(item.peso) || 0) * item.qtd), 0);
  
  const patrimonioPO = 
    (moedas.pc / 100) + 
    (moedas.pp / 10) + 
    (moedas.pe / 2) + 
    (moedas.po || 0) + 
    (moedas.pl * 10);

  function mudarMoeda(tipo, valor) {
    const novaCarteira = { ...moedas, [tipo]: parseInt(valor) || 0 };
    atualizarBanco(null, novaCarteira);
  }

  function adicionar() {
    if (!novoItem.trim()) return; 

    const nomeFormatado = novoItem.trim().toLowerCase();
    let pesoEncontrado = 0;

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
      id: Date.now().toString(), 
      nome: novoItem.trim(), 
      qtd: 1, 
      peso: pesoEncontrado,
      descricao: "",
      equipado: false,     // 👈 NOVA FLAG: Pra armas e armaduras
      sintonizado: false,  // 👈 NOVA FLAG: Pra itens mágicos
      exigeSintonia: false // Para o futuro: puxar automático do banco de itens mágicos
    };
    
    atualizarBanco([...itens, item], null);
    setNovoItem("");
  }

  function mudarCarga(id, delta) {
    const novaLista = itens.map(item => {
      if (item.id === id) {
        const novoValor = Math.max(0, Math.min(item.cargasTotais, (item.cargasAtuais || 0) + delta));
        return { ...item, cargasAtuais: novoValor };
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

  // 👇 MOTOR DAS ALAVANCAS: EQUIPAR 👇
  function toggleEquipar(id) {
    const novaLista = itens.map(item => {
      if (item.id === id) {
        return { ...item, equipado: !item.equipado };
      }
      return item;
    });
    atualizarBanco(novaLista, null);
  }

  // 👇 MOTOR DAS ALAVANCAS: SINTONIZAR (COM TRAVA DE SEGURANÇA) 👇
  function toggleSintonia(id) {
    const itemAtual = itens.find(i => i.id === id);
    
    // Se o cara quer LIGAR a sintonia, verificamos o limite
    if (!itemAtual.sintonizado) {
      const sintonizados = itens.filter(i => i.sintonizado).length;
      if (sintonizados >= 3) {
        // Dispara um Alerta simples na tela (pode trocar por um Toast depois)
        alert("🔒 Limite de Sintonia Atingido! Você já possui 3 itens sintonizados. Desfaça a sintonia de um item primeiro.");
        return;
      }
    }

    const novaLista = itens.map(item => {
      if (item.id === id) {
        return { ...item, sintonizado: !item.sintonizado };
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
    setItemParaDeletar(null);
  }

  const itensFiltrados = itens.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Conta os Sintonizados para o Topo do Inventário
  const qtdSintonizados = itens.filter(i => i.sintonizado).length;

  return (
    <div className="painel-inventario">
      
      {/* --- MOEDAS E RIQUEZA --- */}
      <div className="carteira-container">
        {['pl', 'po', 'pe', 'pp', 'pc'].map(tipo => (
          <div key={tipo} className={`moeda-box ${tipo}`}>
            <label>{tipo.toUpperCase()}</label>
            <input 
              type="number" 
              value={moedas[tipo] === 0 ? '' : moedas[tipo]}
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

      {/* --- TOPBAR: CAPACIDADE E SINTONIA --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        
        {/* CARGA */}
        <div className="carga-container" style={{ flex: 1, background: '#111', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
            <strong>Carga</strong>
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
        </div>

        {/* 👇 SLOTS DE SINTONIA 👇 */}
        <div style={{ background: '#111', padding: '15px', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <strong style={{ fontSize: '0.85rem', marginBottom: '8px', color: '#888' }}>Sintonia</strong>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map(slot => (
              <div 
                key={slot} 
                style={{
                  width: '20px', height: '20px', transform: 'rotate(45deg)',
                  background: slot <= qtdSintonizados ? '#8e44ad' : '#222',
                  border: `2px solid ${slot <= qtdSintonizados ? '#9b59b6' : '#444'}`,
                  boxShadow: slot <= qtdSintonizados ? '0 0 10px #8e44ad' : 'none',
                  transition: 'all 0.3s ease'
                }}
                title={slot <= qtdSintonizados ? 'Slot Ocupado' : 'Slot Livre'}
              />
            ))}
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>🎒 Mochila</h3>
      </div>

      <div className="barra-pesquisa-container">
        <span className="icone-pesquisa">🔍</span>
        <input
          type="text"
          className="input-pesquisa"
          placeholder="Pesquisar item na mochila..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* --- BOTÃO DE ABRIR O COMPÊNDIO --- */}
      <button 
        onClick={() => setModalAberto(true)}
        style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'linear-gradient(90deg, #8e44ad 0%, #3498db 100%)', border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', boxShadow: '0 4px 15px rgba(142, 68, 173, 0.4)' }}
      >
        ✨ Abrir Compêndio Mágico e Adicionar Item
      </button>

      {/* 👇 O SUPER MODAL DE PESQUISA 👇 */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <div style={{ background: '#1a1a1a', width: '90%', maxWidth: '500px', height: '80vh', borderRadius: '12px', border: '1px solid #444', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            
            {/* Header do Modal */}
            <div style={{ padding: '15px 20px', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>📚 Compêndio</h3>
              <button onClick={() => setModalAberto(false)} style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
            </div>

            {/* Barra de Pesquisa do Modal */}
            <div style={{ padding: '15px' }}>
              <input 
                type="text" 
                placeholder="Pesquise uma arma, poção ou item mágico..." 
                value={buscaCompendio}
                onChange={(e) => setBuscaCompendio(e.target.value)}
                autoFocus
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #5c0099', background: '#0a0a0a', color: '#fff', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            {/* Resultados da Pesquisa */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 15px 15px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {buscaCompendio.trim() === "" ? (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Digite o nome do item para pesquisar no banco de dados...</p>
              ) : resultadosCompendio.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', background: '#111', borderRadius: '8px', border: '1px dashed #444' }}>
                  <p style={{ color: '#ffcc00', marginBottom: '15px' }}>Nenhum item encontrado com esse nome.</p>
                  
                  {/* 👇 O botão de fallback pra adicionar item manual 👇 */}
                  <button 
                    onClick={() => {
                      setNovoItem(buscaCompendio); // Joga o nome que ele digitou
                      adicionar(); // Chama a função velha de adicionar manual
                      setModalAberto(false);
                      setBuscaCompendio("");
                    }}
                    style={{ background: '#333', color: '#fff', padding: '10px 15px', border: '1px solid #555', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Criar item comum: "{buscaCompendio}"
                  </button>
                </div>
              ) : (
                resultadosCompendio.map(item => (
                  <div 
                    key={item.nome}
                    onClick={() => adicionarDoCompendio(item)}
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
            </div>
        </div>
      )}

      {/* --- LISTA DE ITENS SANFONADA --- */}
      <div className="lista-itens">
        {itens.length === 0 && <p className="vazio" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Sua mochila está vazia...</p>}
        {itens.length > 0 && itensFiltrados.length === 0 && (
          <p className="vazio" style={{ textAlign: 'center', color: '#ffcc00', padding: '20px' }}>
            Nenhum item encontrado com esse nome.
          </p>
        )}

        {itensFiltrados.map((item) => {
          const isOpen = expandido === item.id;
          const isEquipado = item.equipado;
          const isSintonizado = item.sintonizado;

          return (
            <div key={item.id} className="item-card" style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
              
              <div 
                className="item-row-click"
                onClick={() => toggleExpandir(item.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', cursor: 'pointer', 
                  background: isOpen ? '#222' : 'transparent',
                  borderLeft: isEquipado ? '4px solid #3498db' : isSintonizado ? '4px solid #8e44ad' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{isOpen ? '📂' : '📁'}</span>
                  <span className="item-nome" style={{ fontWeight: 'bold', color: isEquipado ? '#3498db' : '#fff' }}>
                    {item.nome}
                    {isSintonizado && <span style={{ marginLeft: '5px', color: '#9b59b6' }}>✦</span>}
                  </span>
                </div>
                
                <div className="controles-qtd" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0a0a0a', padding: '4px 8px', borderRadius: '20px', border: '1px solid #333' }}>
                  <button onClick={() => mudarQtd(item.id, -1)} style={{ background: '#222', border: 'none', color: '#fff', cursor: 'pointer', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{item.qtd}</span>
                  <button onClick={() => mudarQtd(item.id, 1)} style={{ background: '#222', border: 'none', color: '#fff', cursor: 'pointer', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>

              {isOpen && (
                <div className="item-detalhes" style={{ padding: '15px', borderTop: '1px solid #333', background: '#111' }}>
                  <div style={{ display: 'flex', gap: '35px', flexWrap: 'wrap' }}>
                    
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Descrição / Efeitos Mágicos</label>
                      <textarea 
                        value={item.descricao || ""}
                        onChange={(e) => atualizarDetalhes(item.id, "descricao", e.target.value)}
                        placeholder="Adicione notas, efeitos de poção, etc..."
                        style={{ width: '100%', height: '80px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '6px', resize: 'none' }}
                      />
                    </div>

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
                      {/* 👇 PAINEL DE CARGAS MÁGICAS 👇 */}
                      {item.cargasTotais > 0 && (
                        <div style={{ background: '#2c003e', border: '1px solid #8e44ad', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: '#d7bde2', marginBottom: '5px', fontWeight: 'bold', textTransform: 'uppercase' }}>Cargas Mágicas</label>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', borderRadius: '4px', padding: '4px' }}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); mudarCarga(item.id, -1); }}
                              style={{ background: '#5c0099', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            
                            <span style={{ fontWeight: 'bold', color: item.cargasAtuais === 0 ? '#ff4444' : '#fff' }}>
                              {item.cargasAtuais} <span style={{ color: '#888', fontSize: '0.8rem' }}>/ {item.cargasTotais}</span>
                            </span>
                            
                            <button 
                              onClick={(e) => { e.stopPropagation(); mudarCarga(item.id, 1); }}
                              style={{ background: '#5c0099', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                          {item.cargasAtuais === 0 && (
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#ff4444', marginTop: '5px' }}>Sem cargas!</span>
                          )}
                        </div>
                      )}

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

                  {/* 👇 AS ALAVANCAS DE AÇÃO 👇 */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px dashed #333', paddingTop: '15px' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleEquipar(item.id); }}
                      style={{ background: item.equipado ? '#2980b9' : 'transparent', color: item.equipado ? '#fff' : '#3498db', border: '1px solid #3498db', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', flex: 1 }}
                    >
                      {item.equipado ? '🛡️ Equipado' : 'Equipar'}
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSintonia(item.id); }} 
                      style={{ background: item.sintonizado ? '#8e44ad' : 'transparent', color: item.sintonizado ? '#fff' : '#9b59b6', border: '1px solid #9b59b6', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', flex: 1 }}
                    >
                      {item.sintonizado ? '✨ Sintonizado' : 'Sintonizar'}
                    </button>
                  </div>

                  {/* 👇 OS BOTÕES DE ARMADURA DINÂMICOS 👇 */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    
                    {/* Botão VESTIR ARMADURA */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        const jaVestido = props.dados.armaduraEquipada === item.nome;
                        // Se clicar de novo numa armadura já vestida, ele tira a armadura (joga vazio "")
                        props.aoSalvar && props.aoSalvar("armaduraEquipada", jaVestido ? "" : item.nome); 
                      }}
                      style={{ 
                        background: props.dados.armaduraEquipada === item.nome ? '#27ae60' : 'transparent', 
                        color: props.dados.armaduraEquipada === item.nome ? '#fff' : '#2ecc71', 
                        border: '1px solid #2ecc71', 
                        padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', flex: 1, fontWeight: 'bold' 
                      }}
                      title="Define este item como o cálculo base da sua CA no painel principal"
                    >
                      {props.dados.armaduraEquipada === item.nome ? '👕 Vestindo' : 'Vestir'}
                    </button>

                    {/* Botão EQUIPAR ESCUDO (Aparece em destaque se o item se chamar Escudo/Shield) */}
                    {(item.nome.toLowerCase().includes("escudo") || item.nome.toLowerCase().includes("shield")) && (
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          const escudoJaNaMao = props.dados.escudoCA === 2;
                          // Funciona como um Toggle: clicou de novo, guarda o escudo
                          props.aoSalvar && props.aoSalvar("escudoCA", escudoJaNaMao ? 0 : 2); 
                        }} 
                        style={{ 
                          background: props.dados.escudoCA === 2 ? '#2c3e50' : 'transparent', 
                          color: props.dados.escudoCA === 2 ? '#fff' : '#34495e', 
                          border: '1px solid #34495e', 
                          padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', flex: 1, fontWeight: 'bold' 
                        }}
                      >
                        {props.dados.escudoCA === 2 ? '🛡️ Na Mão (+2)' : 'Equipar Escudo'}
                      </button>
                    )}
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