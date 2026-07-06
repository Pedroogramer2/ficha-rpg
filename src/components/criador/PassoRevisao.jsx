// src/components/criador/PassoRevisao.jsx
import { useState, useEffect } from 'react';
import { IDIOMAS } from '../../data/idiomas';
import { CLASSES_DETALHADAS } from '../../data/classesDetalhado';
import { useCriador } from '../../context/CriadorContext';

export function PassoRevisao() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const [idiomasSelecionados, setIdiomasSelecionados] = useState(
    dados.listaIdiomas || ["Comum (Common)", "", ""]
  );
  
  const [imagemPreview, setImagemPreview] = useState(dados.foto || null);

  useEffect(() => {
    if (!dados.classe) return; 

    const infoClasse = CLASSES_DETALHADAS[dados.classe];
    if (infoClasse) {
      
      // 👇 O NOVO ANTIVÍRUS (Agora lê fichas velhas e novas!) 👇
      let atributosLimpos = { ...dados.atributos };
      let precisouAjustar = false;

      ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"].forEach(attr => {
        // Tenta pegar da pasta nova, se não tiver, pega da raiz da ficha!
        let valorBruto = atributosLimpos[attr] !== undefined ? atributosLimpos[attr] : dados[attr];
        let valor = Number(valorBruto);

        if (isNaN(valor) || valor <= 0) {
          valor = 10; // Failsafe em caso de corrupção real
          precisouAjustar = true;
        } else if (atributosLimpos[attr] === undefined && dados[attr] !== undefined) {
          // Se achou na raiz, copia pra pasta nova para padronizar o banco de dados
          precisouAjustar = true;
        }
        
        atributosLimpos[attr] = valor;
      });

      const con = atributosLimpos.constituicao;
      const modCon = Math.floor((con - 10) / 2);
      const nivel = dados.nivel || 1;
      
      let vidaCalculada = infoClasse.dadoVida + modCon;

      if (nivel > 1) {
        const mediaDado = (infoClasse.dadoVida / 2) + 1;
        vidaCalculada += Math.floor((mediaDado + modCon) * (nivel - 1));
      }
      
      if (dados.vidaMaxima !== vidaCalculada || precisouAjustar) {
        atualizar(prev => ({ 
          ...prev, 
          vidaMaxima: vidaCalculada,
          vidaAtual: vidaCalculada,
          ...(precisouAjustar ? { atributos: atributosLimpos } : {})
        }));
      }
    }
  }, [dados.atributos, dados.classe, dados.nivel, atualizar, dados.vidaMaxima, dados.forca, dados.destreza, dados.constituicao, dados.inteligencia, dados.sabedoria, dados.carisma]); 

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        const MAX_WIDTH = 250;
        const MAX_HEIGHT = 250;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }

        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        setImagemPreview(compressedBase64);
        atualizar(prev => ({ ...prev, foto: compressedBase64 }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    atualizar(prev => ({ ...prev, listaIdiomas: idiomasSelecionados }));
  }, [idiomasSelecionados, atualizar]);

  function mudarIdioma(index, valor) {
    const novaLista = [...idiomasSelecionados];
    novaLista[index] = valor;
    setIdiomasSelecionados(novaLista);
  }

  const setInput = (campo, valor) => atualizar(prev => ({ ...prev, [campo]: valor }));

  const BotaoAlinhamento = ({ valor, texto }) => {
    const selecionado = dados.alinhamento === valor;
    return (
      <div 
        onClick={() => setInput("alinhamento", valor)}
        style={{ 
          background: selecionado ? '#ae00ff80' : '#111', 
          color: selecionado ? '#000' : '#ddd', 
          padding: '10px 4px', 
          textAlign: 'center', 
          cursor: 'pointer', 
          border: selecionado ? '2px solid #fff' : '1px solid transparent',
          transition: '0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: selecionado ? 'bold' : 'normal',
          fontSize: '0.75rem'
        }}
      >
        {texto}
      </div>
    );
  };

  const qtdPericias = Object.keys(dados.periciasTreinadas || {}).length;
  const qtdItens = dados.inventario?.length || 0;
  const qtdTruques = dados.magiasConhecidas?.truques?.length || 0;
  const qtdTalentos = (dados.talentos?.length || 0) + (dados.talentoOrigem ? 1 : 0);

  return (
    <div className="passo-revisao-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div className="revisao-topo" style={{ flexShrink: 0, textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#ffcc00', textTransform: 'uppercase', margin: 0 }}>📝 Identidade & Revisão</h3>
        <p style={{ color: '#aaa', margin: '5px 0 0 0' }}>Escolha um rosto, defina sua moral e revise sua ficha final.</p>
      </div>

      <div className="layout-criador-duplo" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
        
        <div className="coluna-roleplay" style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', overflowY: 'auto', height: '100%' }}>
          
          <div className="box-foto-revisao" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', padding: '15px', background: '#252525', borderRadius: '8px', border: '1px solid #444' }}>
            <label className="avatar-upload-grande" style={{ cursor: 'pointer', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '2px dashed #ffcc00', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>
              {imagemPreview ? (
                <img src={imagemPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="placeholder-upload" style={{ textAlign: 'center', color: '#666' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block' }}>📷</span>
                  <small style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>Foto</small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            <div className="texto-foto">
              <strong style={{ color: '#fff', fontSize: '1.1rem', display: 'block' }}>Aparência do Herói</strong>
              <p style={{ margin: '5px 0 0 0', color: '#aaa', fontSize: '0.85rem' }}>Clique no círculo ao lado para enviar uma imagem.</p>
            </div>
          </div>

          <div className="grupo-input" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#ffcc00', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Nome do Personagem</label>
            <input type="text" value={dados.nome || ""} onChange={e => setInput("nome", e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #555', borderRadius: '4px', color: '#fff' }} placeholder="Ex: Valeros" />
          </div>

          <div className="grupo-input" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#ffcc00', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Alinhamento Moral</label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', gap: '2px', background: '#333', border: '1px solid #555', borderRadius: '6px', overflow: 'hidden' }}>
              
              {/* Cabeçalho */}
              <div style={{ background: '#ae00ff80' }}></div>
              <div style={{ background: '#ae00ff80', color: 'white', padding: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>LEAL</div>
              <div style={{ background: '#ae00ff80', color: 'white', padding: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>NEUTRO</div>
              <div style={{ background: '#ae00ff80', color: 'white', padding: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>CAÓTICO</div>

              {/* Linha Bom */}
              <div style={{ background: '#888', color: 'white', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>Bom</div>
              <BotaoAlinhamento valor="Leal e Bom" texto="Leal e Bom (LB) — Justo" />
              <BotaoAlinhamento valor="Neutro e Bom" texto="Neutro e Bom (NB) — Benfeitor" />
              <BotaoAlinhamento valor="Caótico e Bom" texto="Caótico e Bom (CB) — Revolucionário" />

              {/* Linha Neutro */}
              <div style={{ background: '#666', color: 'white', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>Neutro</div>
              <BotaoAlinhamento valor="Leal e Neutro" texto="Leal e Neutro (LN) — Juiz" />
              <BotaoAlinhamento valor="Neutro" texto="Neutro (N) — Realista" />
              <BotaoAlinhamento valor="Caótico e Neutro" texto="Caótico e Neutro (CN) — Individualista" />

              {/* Linha Mau */}
              <div style={{ background: '#444', color: 'white', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>Mau</div>
              <BotaoAlinhamento valor="Leal e Mau" texto="Leal e Mau (LM) — Tirano" />
              <BotaoAlinhamento valor="Neutro e Mau" texto="Neutro e Mau — Mercenário" />
              <BotaoAlinhamento valor="Caótico e Mau" texto="Caótico e Mau — Destruidor" />
            </div>
          </div>

          <div className="grupo-input" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#ffcc00', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Divindade de Adoração</label>
            <input type="text" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #555', borderRadius: '4px', color: '#fff', fontSize: '0.9rem' }} placeholder="Ex: Lathander, Selûne, Nenhuma..." value={dados.crenca || ""} onChange={e => setInput("crenca", e.target.value)} />
          </div>

          <div className="grupo-input painel-idiomas" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#ffcc00', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Idiomas</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4caf50', borderRadius: '4px', color: '#ccc', fontSize: '0.9rem' }}>
                <span>🗣️ Comum (Common)</span>
                <span style={{ background: '#4caf50', color: '#000', padding: '1px 6px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 'bold' }}>Automático</span>
              </div>
              {[1, 2].map(idx => (
                <select 
                  key={idx} value={idiomasSelecionados[idx]} onChange={(e) => mudarIdioma(idx, e.target.value)}
                  style={{ padding: '8px', background: '#111', border: '1px solid #555', borderRadius: '4px', color: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="">-- Escolha --</option>
                  {IDIOMAS.map(lang => (
                    <option key={lang} value={lang} disabled={idiomasSelecionados.includes(lang) && idiomasSelecionados[idx] !== lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          <div className="grupo-input">
            <label style={{ display: 'block', color: '#ffcc00', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>História (Backstory)</label>
            <textarea rows={4} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #555', borderRadius: '4px', color: '#ddd', fontFamily: 'inherit', resize: 'vertical' }} placeholder="Escreva a lenda do seu herói..." value={dados.historia || ""} onChange={e => setInput("historia", e.target.value)} />
          </div>

        </div>

        <div className="coluna-resumo-mecanico" style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', height: '100%', minHeight: 0 }}>
          
          <div className="card-resumo" style={{ background: '#252525', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ccc', textTransform: 'uppercase', fontSize: '0.9rem' }}>Resumo da Ficha</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}><span style={{ color: '#888' }}>Classe:</span> <strong>{dados.classe} (Lv {dados.nivel})</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}><span style={{ color: '#888' }}>Espécie:</span> <strong>{dados.raca}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span style={{ color: '#888' }}>Antecedente:</span> <strong>{dados.antecedente}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '8px', borderRadius: '4px', border: '1px solid #4caf50' }}>
              <span style={{color: '#aaa', fontWeight: 'bold'}}>Vida Máxima:</span> 
              <strong style={{color:'#4caf50', fontSize:'1.2rem'}}>{dados.vidaMaxima} PV</strong>
            </div>
          </div>
          
          <div className="card-resumo" style={{ background: '#252525', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Atributos Finais</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"].map((attr) => {
                
                // 👇 AQUI A TELA TAMBÉM LÊ O DADO DA RAIZ PRA NÃO RENDERIZAR 10 ERRADO 👇
                let valBruto = dados.atributos?.[attr] !== undefined ? dados.atributos[attr] : dados[attr];
                let val = Number(valBruto);
                if (isNaN(val) || val <= 0) val = 10; 
                
                const mod = Math.floor((val - 10) / 2);
                return (
                  <div key={attr} style={{ background: '#111', border: '1px solid #333', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' }}>{attr.substring(0,3)}</span>
                    <span style={{ display: 'block', fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>{val}</span>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: mod >= 0 ? '#4caf50' : '#ff5555' }}>{mod >= 0 ? `+${mod}` : mod}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-resumo" style={{ background: '#252525', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Recursos Preparados</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#ddd', fontSize: '0.9rem' }}>
              <li style={{ background: '#111', padding: '6px 10px', borderRadius: '4px' }}>🛠️ {qtdPericias} Perícias Treinadas</li>
              <li style={{ background: '#111', padding: '6px 10px', borderRadius: '4px' }}>🎒 {qtdItens} Itens na Mochila</li>
              <li style={{ background: '#111', padding: '6px 10px', borderRadius: '4px' }}>✨ {qtdTruques} Truques de Magia</li>
              <li style={{ background: '#111', padding: '6px 10px', borderRadius: '4px' }}>🧩 {qtdTalentos} Talentos de Origem</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}