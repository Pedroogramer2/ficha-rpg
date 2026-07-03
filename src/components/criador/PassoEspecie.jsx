// src/components/criador/PassoEspecie.jsx
import { useState } from 'react';
import { RACAS } from '../../data/racas';
import { LISTA_PERICIAS } from '../../regras'; 

import { useCriador } from '../../context/CriadorContext';

const IMAGENS_RACAS = {
  "Humano": "https://www.dndbeyond.com/attachments/thumbnails/0/629/250/423/human.png",
  "Aasimar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdISXCMxkteioAEjJJj2JABS7Lljnp0bXmZYt2Gzjx2ZJNUqcwH7C3hYsd&s=10",
  "Anão": "https://www.dndbeyond.com/attachments/thumbnails/0/612/300/382/dwarf.png",
  "Elfo": "https://www.dndbeyond.com/attachments/thumbnails/0/620/250/436/elf.png",
  "Halfling": "https://www.dndbeyond.com/attachments/thumbnails/0/626/250/364/halfling.png",
  "Gnomo": "https://www.dndbeyond.com/attachments/thumbnails/0/637/300/300/gnome.png",  
  "Draconato (Dragonborn)": "https://www.dndbeyond.com/attachments/thumbnails/0/633/260/603/dragonborn.png",
  "Orc": "https://www.dndbeyond.com/attachments/0/728/c3orcintro.png",
  "Golias (Goliath)": "https://www.dndbeyond.com/attachments/0/744/c3goliathintro.png",
  "Tiefling": "https://www.dndbeyond.com/attachments/thumbnails/0/646/260/410/tiefling.png"
};

export function PassoEspecie() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();
  const [exibirDetalhes, setExibirDetalhes] = useState(true);
  
  function selecionarRaca(chave) {
    const info = RACAS[chave];
    
    // Atualiza base, mas reseta as escolhas (para evitar que o cara troque de Elfo pra Draconato e fique com o Legado Infernal salvo KKKK)
    atualizar(prev => ({
      ...prev,
      raca: chave,
      deslocamento: info.deslocamento,
      visaoEscuro: info.visaoEscuro || "",
      resistenciasRaciais: info.resistenciasPadrao || [],
      tracosRaciais: info.tracos.map(t => ({ id: t.nome, nome: t.nome, descricao: t.desc })),
      periciaRacial: null,
      escolhaRacialDetalhes: null 
    }));
    setExibirDetalhes(true);
  }

  function setPericiaRacial(periciaNome) {
    atualizar(prev => ({ ...prev, periciaRacial: periciaNome }));
  }

  // 👇 LIDA COM A ESCOLHA DINÂMICA (Ex: Sopro, Legado) 👇
  function lidarComEscolhaRacial(nomeDaOpcao) {
    if (!racaSelecionada || !racaSelecionada.escolhaRacial) return;
    
    const opcaoObj = racaSelecionada.escolhaRacial.opcoes.find(o => o.nome === nomeDaOpcao);
    if (!opcaoObj) return;

    atualizar(prev => ({
      ...prev,
      escolhaRacialDetalhes: opcaoObj
    }));
  }

  const listaRacas = Object.keys(RACAS);
  const racaSelecionada = dados.raca ? RACAS[dados.raca] : null;

  // Calculando valores dinâmicos para exibição:
  const visaoEscuroFinal = dados.escolhaRacialDetalhes?.visaoEscuroExtra || racaSelecionada?.visaoEscuro;
  const resistenciasFinais = [
    ...(racaSelecionada?.resistenciasPadrao || []),
    ...(dados.escolhaRacialDetalhes?.resistenciaExtra ? [dados.escolhaRacialDetalhes.resistenciaExtra] : [])
  ];

  let fundoEstilo = {
    display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden',
    border: '1px solid #444', padding: '25px', backgroundSize: 'cover', backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat', transition: 'all 0.3s ease-in-out' 
  };

  if (racaSelecionada && IMAGENS_RACAS[dados.raca]) {
    const imageUrl = IMAGENS_RACAS[dados.raca];
    if (exibirDetalhes) {
      fundoEstilo.backgroundImage = `linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.9) 35%, rgba(26,26,26,1) 100%), url(${imageUrl})`;
    } else {
      fundoEstilo.backgroundImage = `url(${imageUrl})`;
    }
  } else {
    fundoEstilo.backgroundColor = '#1e1e1e';
  }

  return (
    <div className="layout-criador-duplo">
      
      <div className="coluna-selecao">
        <h3 className="subtitulo-criador">Escolha sua Espécie</h3>
        <p className="desc-passo" style={{ marginBottom: '20px' }}>
          No D&D 2024, sua espécie afeta seu deslocamento, tamanho e habilidades natas.
        </p>
        
        <div className="grid-cartas-classe">
          {listaRacas.map(chave => {
            const isSelected = dados.raca === chave;
            return (
              <div key={chave} className={`carta-classe ${isSelected ? 'ativa' : ''}`} onClick={() => selecionarRaca(chave)}>
                <div className="carta-icone">
                  {IMAGENS_RACAS[chave] ? (
                    <img src={IMAGENS_RACAS[chave]} alt={chave} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '4px' }} />
                  ) : (chave.charAt(0))}
                </div>
                <div className="carta-nome">{chave}</div>
                {isSelected && <div className="brilho-borda"></div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="coluna-detalhes">
        {racaSelecionada ? (
          <div className="painel-info-classe fade-in" style={fundoEstilo}>
            
            <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '1.5rem', cursor: 'pointer', zIndex: 100, color: exibirDetalhes ? '#ffcc00' : 'rgba(255,255,255,0.3)', transition: 'all 0.2s' }} onClick={() => setExibirDetalhes(prev => !prev)} title={exibirDetalhes ? "Esconder informações" : "Mostrar informações"}>
              {exibirDetalhes ? '👁️' : '🙈'} 
            </div>

            <div className="info-overlay-scroll" style={{ display: 'flex', flexDirection: 'column', height: '100%', opacity: exibirDetalhes ? 1 : 0, visibility: exibirDetalhes ? 'visible' : 'hidden', transition: 'all 0.3s ease-in-out', pointerEvents: exibirDetalhes ? 'all' : 'none', overflowY: 'auto', paddingRight: '10px' }}>
              
              <div className="cabecalho-info" style={{ flexShrink: 0, marginTop: '10px' }}>
                <h2 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>{racaSelecionada.nome}</h2>
                <div style={{display:'flex', gap:'10px', flexWrap: 'wrap'}}>
                  <span className="badge-dado-vida" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #555' }}>🏃 {racaSelecionada.deslocamento}ft</span>
                  <span className="badge-dado-vida" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #555' }}>📏 {racaSelecionada.tamanho}</span>
                  {visaoEscuroFinal && <span className="badge-dado-vida" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #555', color: '#ffcc00' }}>👀 Visão {visaoEscuroFinal}</span>}
                </div>
              </div>
              
              {resistenciasFinais.length > 0 && (
                <div style={{marginTop: '10px'}}>
                  <strong style={{color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase'}}>🛡️ Resistências: </strong>
                  {resistenciasFinais.map(res => <span key={res} style={{background: '#330000', color: '#ff4444', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', marginLeft: '5px', border: '1px solid #ff4444'}}>{res}</span>)}
                </div>
              )}
              
              <p className="descricao-longa" style={{ flexShrink: 0, textShadow: '1px 1px 2px rgba(0,0,0,0.9)', color: '#eee' }}>
                {racaSelecionada.descricao}
              </p>

              {/* 👇 CAIXA MÁGICA DE ESCOLHA RACIAL AUTOMÁTICA 👇 */}
              {racaSelecionada.escolhaRacial && (
                <div className="box-escolhas-obrigatorias" style={{ marginBottom: '20px', flexShrink: 0, background: 'rgba(34,34,34,0.8)' }}>
                  <h4 style={{ color: '#ffcc00', marginTop: 0 }}>{racaSelecionada.escolhaRacial.titulo}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Escolha a variação da sua espécie para definir suas características exclusivas.</p>
                  <select 
                    className="select-classe-feature"
                    value={dados.escolhaRacialDetalhes?.nome || ""}
                    onChange={(e) => lidarComEscolhaRacial(e.target.value)}
                    style={{ background: '#111' }}
                  >
                    <option value="" disabled>-- Selecione uma Opção --</option>
                    {racaSelecionada.escolhaRacial.opcoes.map(op => (
                      <option key={op.nome} value={op.nome}>{op.nome}</option> 
                    ))}
                  </select>

                  {dados.escolhaRacialDetalhes && dados.escolhaRacialDetalhes.tracoExtra && (
                    <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(76, 175, 80, 0.1)', borderLeft: '3px solid #4caf50', fontSize: '0.85rem' }}>
                      <strong style={{color: '#4caf50'}}>Habilidade Adquirida:</strong> {dados.escolhaRacialDetalhes.tracoExtra}
                    </div>
                  )}
                </div>
              )}

              {/* 👇 O CASO EXCEPCIONAL DO HUMANO 👇 */}
              {racaSelecionada.nome === "Humano" && (
                <div className="box-escolhas-obrigatorias" style={{ marginBottom: '20px', flexShrink: 0, background: 'rgba(34,34,34,0.8)' }}>
                  <h4 style={{ color: '#ffcc00', marginTop: 0 }}>Escolha de Proficiência (Habilidoso)</h4>
                  <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Escolha uma perícia extra concedida pela sua espécie.</p>
                  <select className="select-classe-feature" value={dados.periciaRacial || ""} onChange={(e) => setPericiaRacial(e.target.value)} style={{ background: '#111' }}>
                    <option value="" disabled>-- Selecione uma Perícia --</option>
                    {LISTA_PERICIAS.map(p => (
                      <option key={p.nome} value={p.nome}>{p.nome}</option> 
                    ))}
                  </select>
                </div>
              )}

              <h4 className="titulo-tabela" style={{ flexShrink: 0 }}>Traços Raciais Básicos</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '20px' }}>
                {racaSelecionada.tracos.map((traco) => (
                  <div key={traco.nome} style={{display:'block', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '6px'}}>
                    <strong style={{color: '#ffcc00'}}>{traco.nome}</strong>
                    <p style={{margin: '5px 0 0 0', fontSize: '0.9rem', color: '#ddd'}}>{traco.desc}</p>
                  </div>
                ))}
              </div>
              
            </div> 
            
          </div>
        ) : (
          <div className="painel-vazio">
            <p>👈 Selecione uma espécie para ver os traços.</p>
          </div>
        )}
      </div>

    </div>
  );
}