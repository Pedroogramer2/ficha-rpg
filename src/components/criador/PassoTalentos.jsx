// src/components/criador/PassoTalentos.jsx
import { useState, useEffect } from 'react';
import { TALENTOS } from '../../data/talentos';
// 👇 IMPORTAMOS O CÉREBRO 👇
import { useCriador } from '../../context/CriadorContext';

// --- SUB-COMPONENTE: MODAL INTELIGENTE (Mantido Intacto) ---
function ModalTalentos({ aoFechar, aoSelecionar, slotId, tipoFiltro, atual }) {
  const [termo, setTermo] = useState("");
  const [expandido, setExpandido] = useState(null);
  
  const listaFiltrada = Object.values(TALENTOS).filter(t => {
    const passaTexto = t.nome.toLowerCase().includes(termo.toLowerCase());
    const passaRegra = tipoFiltro === 'origem' ? t.prerequisito === "Nenhum" : true;
    return passaTexto && passaRegra;
  });

  return (
    <div className="overlay-modal">
      <div className="modal-magias">
        <div className="modal-header">
          <h3>
            {tipoFiltro === 'origem' ? "Talentos de Origem" : "Biblioteca de Talentos"}
          </h3>
          <button className="btn-cancelar" onClick={aoFechar}>Fechar</button>
        </div>

        <div className="barra-pesquisa-modal">
          <input 
            type="text" 
            placeholder="🔍 Pesquisar talento..." 
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
        </div>

        <div className="modal-lista-scroll">
          {listaFiltrada.length === 0 && <p style={{textAlign: 'center', opacity: 0.5}}>Nenhum talento encontrado para este slot.</p>}
          
          {listaFiltrada.map(talento => {
            const isSelected = atual === talento.nome;
            const isExpanded = expandido === talento.nome;

            return (
              <div key={talento.nome} className={`linha-modal ${isSelected ? 'ativo' : ''}`}>
                <div className="linha-resumo" onClick={() => setExpandido(isExpanded ? null : talento.nome)}>
                  
                  <div className="check-area-clicavel" onClick={(e) => { 
                    e.stopPropagation(); 
                    aoSelecionar(slotId, isSelected ? null : talento.nome);
                    aoFechar(); 
                  }}>
                    <div className="check-box-modal">{isSelected ? "✔" : ""}</div>
                  </div>

                  <div className="magia-infos-modal">
                    <span className="nome-m">{talento.nome}</span>
                    <span className="tags-m">Pré-req: {talento.prerequisito}</span>
                  </div>
                  
                  <div className="seta-expandir">{isExpanded ? "▲" : "▼"}</div>
                </div>

                {isExpanded && (
                  <div className="magia-detalhe-modal">
                    <p>{talento.descricao}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 👇 TIRAMOS AS PROPS DAQUI 👇
export function PassoTalentos() {
  
  // 👇 E PUXAMOS DA NUVEM AQUI 👇
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const [escolhas, setEscolhas] = useState(dados.escolhasTalentos || {});
  
  const [modalAberto, setModalAberto] = useState(false);
  const [slotAtivo, setSlotAtivo] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('geral');

  const ASI_POR_CLASSE = {
    "Guerreiro": [4, 6, 8, 12, 14, 16, 19],
    "Ladino": [4, 8, 10, 12, 16, 19],
    "Padrão": [4, 8, 12, 16, 19]
  };

  const classeAtual = dados.classe || "Padrão";
  const niveisASI = ASI_POR_CLASSE[classeAtual] || ASI_POR_CLASSE["Padrão"];
  const nivelAtual = dados.nivel || 1;

  const slotsDisponiveis = [];

  if (dados.talentoOrigem) {
    slotsDisponiveis.push({
      id: 'antecedente',
      tipo: 'fixo',
      titulo: 'Do Antecedente (Fixo)',
      valor: dados.talentoOrigem
    });
  }

  if (dados.raca === "Humano") {
    slotsDisponiveis.push({
      id: 'raca',
      tipo: 'origem',
      titulo: 'Da Espécie (Humano)'
    });
  }

  niveisASI.filter(n => n <= nivelAtual).forEach(n => {
    slotsDisponiveis.push({
      id: `nivel_${n}`,
      tipo: 'geral',
      titulo: `Do Nível ${n}`
    });
  });

  useEffect(() => {
    const arrayTalentos = [];
    
    slotsDisponiveis.forEach(slot => {
      const nomeTalento = slot.tipo === 'fixo' ? slot.valor : escolhas[slot.id];
      if (nomeTalento) {
        const infoTalento = Object.values(TALENTOS).find(t => 
          nomeTalento.toLowerCase().includes(t.nome.toLowerCase().split(" (")[0])
        );

        arrayTalentos.push({ 
          id: `${slot.id}-${nomeTalento}`, 
          nome: nomeTalento, 
          descricao: infoTalento ? infoTalento.descricao : "Benefícios descritos no Livro do Jogador." 
        });
      }
    });

    atualizar(prev => ({ 
      ...prev, 
      escolhasTalentos: escolhas, 
      talentos: arrayTalentos 
    }));
  }, [escolhas, dados.talentoOrigem, dados.raca, dados.nivel, dados.classe]);

  function abrirModal(idSlot, tipoFiltro) {
    setSlotAtivo(idSlot);
    setFiltroAtivo(tipoFiltro);
    setModalAberto(true);
  }

  function selecionarTalento(idSlot, nomeTalento) {
    setEscolhas(prev => {
      const novo = { ...prev };
      if (nomeTalento) novo[idSlot] = nomeTalento;
      else delete novo[idSlot]; 
      return novo;
    });
  }

  return (
    <div className="layout-criador-duplo">
      {modalAberto && (
        <ModalTalentos 
          aoFechar={() => setModalAberto(false)}
          aoSelecionar={selecionarTalento}
          slotId={slotAtivo}
          tipoFiltro={filtroAtivo}
          atual={escolhas[slotAtivo]}
        />
      )}

      <div className="coluna-selecao">
        <h3 className="subtitulo-criador">Painel de Talentos</h3>
        <p className="desc-passo">Substitua Melhorias de Atributo por Talentos e gerencie suas origens.</p>
        
        <div className="lista-slots-talentos">
          {slotsDisponiveis.map(slot => {
            if (slot.tipo === 'fixo') {
              return (
                <div key={slot.id} className="box-slot-talento fixo">
                  <h4 className="titulo-slot">{slot.titulo}</h4>
                  <div className="conteudo-slot-travado">
                    🔒 {slot.valor}
                  </div>
                </div>
              );
            }

            const escolhido = escolhas[slot.id];
            
            return (
              <div key={slot.id} className="box-slot-talento">
                <h4 className="titulo-slot">{slot.titulo}</h4>
                {escolhido ? (
                  <div className="slot-preenchido" onClick={() => abrirModal(slot.id, slot.tipo)}>
                    <span className="nome-talento-slot">{escolhido}</span>
                    <button className="btn-trocar-slot">Trocar</button>
                  </div>
                ) : (
                  <button className="btn-abrir-slot-vazio" onClick={() => abrirModal(slot.id, slot.tipo)}>
                    + Selecionar Talento
                  </button>
                )}
              </div>
            );
          })}

          {slotsDisponiveis.length === 0 && (
            <div className="box-recurso">
              <p style={{margin: 0, color: '#aaa', textAlign: 'center'}}>Nenhum talento disponível ainda.</p>
            </div>
          )}
        </div>
      </div>

      <div className="coluna-detalhes">
        <div className="painel-info-classe">
          <div className="cabecalho-info">
            <h2>Habilidades Adquiridas</h2>
            <span className="badge-dado-vida">{dados.talentos?.length || 0}</span>
          </div>
          
          <div className="tabela-scroll">
            {(!dados.talentos || dados.talentos.length === 0) && <p className="painel-vazio">Seus talentos aparecerão aqui.</p>}
            
            {dados.talentos && dados.talentos.map(t => (
              <div key={t.id} className="item-magia-direita">
                <div className="resumo-dir">
                  <span className="nome-dir">{t.nome}</span>
                </div>
                <div className="detalhe-dir">
                  <p>{t.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lista-slots-talentos { display: flex; flex-direction: column; gap: 15px; }
        .box-slot-talento { background: #222; border: 1px solid #444; border-radius: 8px; padding: 12px 15px; }
        .box-slot-talento.fixo { background: #1a1a1a; border-color: #333; opacity: 0.8; }
        .titulo-slot { margin: 0 0 10px 0; color: #ffcc00; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .conteudo-slot-travado { color: #888; font-style: italic; font-size: 1rem; padding: 5px 0; }
        .btn-abrir-slot-vazio { width: 100%; padding: 12px; background: transparent; border: 1px dashed #666; color: #aaa; border-radius: 6px; cursor: pointer; transition: 0.2s; font-size: 1rem; }
        .btn-abrir-slot-vazio:hover { border-color: #ffcc00; color: #ffcc00; background: rgba(255, 204, 0, 0.05); }
        .slot-preenchido { display: flex; justify-content: space-between; align-items: center; background: #333; padding: 10px 15px; border-radius: 6px; border: 1px solid #555; cursor: pointer; transition: 0.2s; }
        .slot-preenchido:hover { border-color: #fff; }
        .nome-talento-slot { font-weight: bold; color: #fff; font-size: 1.1rem; }
        .btn-trocar-slot { background: transparent; border: 1px solid #777; color: #ccc; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; }
        .slot-preenchido:hover .btn-trocar-slot { border-color: #ffcc00; color: #ffcc00; }
      `}</style>
    </div>
  );
}