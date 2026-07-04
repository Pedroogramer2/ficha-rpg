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
  "Orc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd3SWl_suxSQ_8UpZjMcnc7VKmgcCgL_u8fMcyle3smd49aWUq09UC8zo&s=10",
  "Golias (Goliath)": "https://preview.redd.it/art-comm-goliath-monk-v0-u63qknjfw0ga1.jpg?width=1080&crop=smart&auto=webp&s=1d66e7fc94d96881beec4db3a868ea2f0b0bdbb6",
  "Tiefling": "https://www.dndbeyond.com/attachments/thumbnails/0/646/260/410/tiefling.png",
  "Dhampir": "https://markberepeterson.com/wp-content/uploads/2021/03/img_6707.jpg?w=640",
  "Sangue-Bruxo (Hexblood)": "https://wa-cdn.nyc3.cdn.digitaloceanspaces.com/user-data/production/81a94115-689c-4302-bcee-8e06d56df3fb/uploads/images/859d78054ec8413355ec851fc6d52f43.png",
  "Lupino (Lupin)": "https://uploads.worldanvil.com/uploads/images/e31dec314f0d3c6168bc89779686c49d.jpg",
  "Renascido (Reborn)": "https://media.dndbeyond.com/compendium-images/vrgtr/U9mBj5XfiTD1mHie/01-007.reborn-phantom-limb.png",
  "Metamorfo (Changeling)": "https://static.wikia.nocookie.net/forgottenrealms/images/4/47/Changeling_MotM.png/revision/latest?cb=20230822130023",
  "Kalashtar": "https://static.wikia.nocookie.net/eberron/images/5/55/Kalashtar-5e.webp/revision/latest?cb=20251002033725",
  "Khoravar (Meio-Elfo)": "https://klubbsaga2015.wdfiles.com/local--files/khoravar/Dragonmarked%20PrC%2003.png",
  "Shifter": "https://arcaneeye.com/wp-content/uploads/2021/07/path-of-the-beast-1.png",
  "Forjado Bélico (Warforged)": "https://static.wikia.nocookie.net/eberron/images/0/09/Warforged3e.jpg/revision/latest/scale-to-width/360?cb=20220414180349",
  "Boggart": "https://static.wikia.nocookie.net/gamelore/images/9/9b/Adder-Staff_Boggart.jpg/revision/latest?cb=20151005124710",
  "Fada (Faerie)": "https://i0.wp.com/dungeonmister.com/wp-content/uploads/2022/07/Fairy.jpg",
  "Flamekin": "https://uploads.worldanvil.com/uploads/images/ba750d1f4cd54e2b7a62add6b2d87478.JPG",
  "Metamorfo de Lorwyn (Lorwyn Changeling)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_gKiTb5YvU9L7DoJ2rItJCh-cXl1cvJTEDRkmKrIeA&s=10",
  "Rimekin": "https://i0.wp.com/dungeonmister.com/wp-content/uploads/2025/11/01-010.rimekin.png?fit=1568%2C944&ssl=1",
  "Aarakocra": "https://static.wikia.nocookie.net/dungeonsdragons/images/a/af/Aarakocra5e.jpg/revision/latest/thumbnail/width/360/height/450?cb=20201006074948",
  "Metamorfo (Multiverso)": "https://www.wargamer.com/wp-content/sites/wargamer/2022/07/dnd-changeling-5e-with-cape.jpg",
  "Gnomo Profundo (Svirfneblin)": "https://static.wikia.nocookie.net/emerald-isles/images/a/af/Gnome_-_Deep.jpg/revision/latest?cb=20200108024247",
  "Duergar": "https://www.dndbeyond.com/avatars/thumbnails/30782/763/1000/1000/638061975214164210.png",
  "Eladrin": "https://www.dndbeyond.com/attachments/thumbnails/3/907/300/494/spring-eladrin.png",
  "Fada (Multiverso)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPC19eOhGGJUKDTfi7mJ4Gu4vB5Z8hawMjsBKbCx8cMvGvk1dq5A1Koo&s=10",
  "Firbolg": "https://static.wikia.nocookie.net/forgottenrealms/images/7/79/Firbolg-5e.jpg/revision/latest?cb=20180623050202",
  "Genasi do Ar (Air Genasi)": "https://static.wikia.nocookie.net/penrith/images/3/32/Air-genasi-2.png/revision/latest?cb=20180627180151",
  "Genasi da Terra (Earth Genasi)": "https://velantis.wordpress.com/wp-content/uploads/2020/01/earth-genasi-1.jpg",
  "Genasi do Fogo (Fire Genasi)": "https://static.wixstatic.com/media/795b3d_960bc813f37244bdb92cecf66e86a855~mv2.png/v1/fill/w_435,h_435,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fire%20Genasi.png",
  "Genasi da Água (Water Genasi)": "https://i.pinimg.com/236x/04/eb/9d/04eb9da5be65971390e2ffea6c7eff4a.jpg",
  "Githyanki": "https://www.wargamer.com/wp-content/sites/wargamer/2023/12/dnd-githyanki-5e-laezel.jpg",
  "Githzerai": "https://static.wikia.nocookie.net/forgottenrealms/images/e/e3/Githzerai_enlightened-5e.jpg/revision/latest?cb=20190223174306",
  "Golias (Goliath - MotM)": "https://preview.redd.it/art-goliath-monk-character-art-v0-0kd1l7uz5jd41.jpg?width=1080&crop=smart&auto=webp&s=0e91467d2ae49380e6bddfde7d88d71237f8c66e",
  "Harengon": "https://static.wikia.nocookie.net/forgottenrealms/images/0/02/Harengon.png/revision/latest?cb=20230807181834",
  "Kenku": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpRXc3qWQ9bledxcCEtNflH0bZJSdfA3Ft6nXSFgksYw&s=10",
  "Locathah": "https://cdn.media.amplience.net/i/wizardsprod/locathah-rising-details-01?w=768&sm=aspect&aspect=1:1&fliph=false&flipv=false&qlt=default&fmt=auto",
  "Owlin": "https://static.wikia.nocookie.net/dungeonsdragons/images/7/7f/Owlin.png/revision/latest?cb=20250715160508",
  "Sátiro (Satyr)": "https://i.redd.it/pm0wii9vjjub1.jpg",
  "Elfo do Mar (Sea Elf)": "https://static.wikia.nocookie.net/forgottenrealms/images/6/6c/Sea_Elf.png/revision/latest?cb=20230807182229",
  "Shadar-Kai": "https://static.wikia.nocookie.net/criticalrole/images/5/52/Shadar-kai.png/revision/latest?cb=20230519182654",
  "Tabaxi": "https://cdn.dribbble.com/userupload/24568951/file/original-28a68aa2e73bb442cb1ecb220fbba6c1.jpg",
  "Tortle": "https://static.wikia.nocookie.net/forgottenrealms/images/7/72/Tortle-5e.png/revision/latest?cb=20170928140158",
  "Tritão (Triton)": "https://i.redd.it/i411rficbf211.jpg",
  "Verdan": "https://i.redd.it/7289xyx7uab61.png",
  "Urso-Coruja (Bugbear)": "https://www.dndbeyond.com/avatars/thumbnails/31312/871/1000/1000/638084425511165687.png",
  "Centauro (Centaur)": "https://koboldpress.com/wp-content/uploads/2020/05/centaur.jpg",
  "Goblin": "https://www.dndbeyond.com/avatars/thumbnails/47138/924/1000/1000/638741964201480855.png",
  "Grung": "https://i.redd.it/7fvul16ops281.jpg",
  "Hobgoblin": "https://images.squarespace-cdn.com/content/v1/5bd88db093a6320f071b1a50/1573570980686-S46GOUMWLN84FIAYGK3P/image-asset.png",
  "Kobold": "https://www.dndbeyond.com/avatars/thumbnails/30832/207/1000/1000/638063832924455756.png",
  "Povo-Lagarto (Lizardfolk)": "https://static.wikia.nocookie.net/forgottenrealms/images/b/be/Lizardfolkadventurer.png/revision/latest?cb=20200428093235",
  "Minotauro": "https://arcaneeye.com/wp-content/uploads/2021/04/wisnu-tan-rage-bellower-uplox.jpg",
  "Shifter (Multiverso)": "https://static.wikia.nocookie.net/forgottenrealms/images/e/e7/Shifter_5e.png/revision/latest?cb=20250721031035",
  "Yuan-Ti": "https://static.wikia.nocookie.net/forgottenrealms/images/7/74/Monster_Manual_5e_-_Yuan-ti_-_p307.jpg/revision/latest?cb=20141116095915",
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
              <div 
                key={chave} 
                className={`carta-classe ${isSelected ? 'ativa' : ''}`} 
                onClick={() => selecionarRaca(chave)}
                style={{ position: 'relative', overflow: 'hidden' }} // 👈 Segura o texto dentro
              >
                <div className="carta-icone" style={{ width: '100%', height: '100%' }}>
                  {IMAGENS_RACAS[chave] ? (
                    <img src={IMAGENS_RACAS[chave]} alt={chave} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '4px' }} />
                  ) : (
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem'}}>{chave.charAt(0)}</span>
                  )}
                </div>
                
                {/* 👇 O NOME FORÇADO COM O GRADIENTE PRETO 👇 */}
                <div className="carta-nome" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '25px 5px 8px 5px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize: '1.2rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textShadow: '2px 2px 4px #000',
                  boxSizing: 'border-box'
                }}>
                  {chave}
                </div>

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