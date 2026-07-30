// src/components/PainelIdentidade.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PainelIdentidade(props) {
  const dados = props.dados || {};
  const [imagem, setImagem] = useState(dados.foto || null);
  const navigate = useNavigate();

  // 👇 COMPRESSOR DE IMAGEM INJETADO (Adeus Bomba-Relógio!) 👇
  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height *= MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width *= MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const base64Reduzida = canvas.toDataURL('image/jpeg', 0.7);
        setImagem(base64Reduzida);
        if (props.aoSalvar) props.aoSalvar("foto", base64Reduzida);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  const salvar = (campo, valor) => props.aoSalvar && props.aoSalvar(campo, valor);

  function alternarInspiracao() {
    salvar("inspiracao", !dados.inspiracao);
  }

  const TABELA_XP = {
    1: 0, 2: 300, 3: 900, 4: 2700, 5: 6500, 
    6: 14000, 7: 23000, 8: 34000, 9: 48000, 10: 64000, 
    11: 85000, 12: 100000, 13: 120000, 14: 140000, 15: 165000, 
    16: 195000, 17: 225000, 18: 265000, 19: 305000, 20: 355000
  };

  const xpAtual = dados.xp || 0;
  const nivelAtual = dados.nivel || 1;
  const xpProximo = nivelAtual < 20 ? TABELA_XP[nivelAtual + 1] : "MAX";
  
  const porcentagemXP = nivelAtual < 20 
    ? Math.min(100, Math.max(0, (xpAtual / xpProximo) * 100)) 
    : 100;

  return (
    <div className="identity-card" style={{ position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
        <div className="inspiracao-box">
          <span className="inspiracao-label">Inspiração</span>
          <button 
            className={`btn-inspiracao ${dados.inspiracao ? 'ativa' : ''}`}
            onClick={alternarInspiracao}
            title={dados.inspiracao ? "Você tem Inspiração! (Role com Vantagem)" : "Sem inspiração no momento."}
          >
            {dados.inspiracao ? "⭐" : "♢"}
          </button>
        </div>
      </div>

      <div className="identity-avatar">
        <label className="avatar-click">
          {imagem ? <img src={imagem} alt="Avatar do Personagem" /> : <span className="placeholder-img">📷</span>}
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>

      <div className="identity-info" style={{ paddingRight: '70px' }}>
        <input 
          type="text" 
          className="input-nome-hero" 
          placeholder="Nome do Personagem"
          value={dados.nome || ""}
          onChange={(e) => salvar("nome", e.target.value)}
        />

        <div className="identity-sub">
          {/* 👇 NIVEL E CLASSE AGORA SÃO DISPLAY. O BOTÃO CHAMA O LAVA JATO 👇 */}
          <span className="badge-nivel-display" style={{ background: '#333', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
            Nível {nivelAtual}
          </span>
          
          <span className="separador">•</span>
          
          <span className="classe-display-label" style={{ color: '#ffcc00', fontWeight: 'bold' }}>
            {dados.classe || "Sem Classe"}
          </span>

          <span className="separador">•</span>

          <input 
            type="text" className="input-inline"
            placeholder="Espécie"
            value={dados.raca || ""}
            onChange={(e) => salvar("raca", e.target.value)}
          />
        </div>

        <div className="identity-footer">
           <input 
            type="text" className="input-small"
            placeholder="Antecedente (Background)"
            value={dados.antecedente || ""}
            onChange={(e) => salvar("antecedente", e.target.value)}
          />
        </div>

        <div className="xp-wrapper">
          <div className="xp-container" title={`${xpAtual} / ${xpProximo} XP`}>
            <div className="xp-fill" style={{ width: `${porcentagemXP}%` }}></div>
            <div className="xp-text">
              XP: {xpAtual} / {xpProximo}
            </div>
          </div>
          <div className="xp-input-area">
            <span>Editar XP:</span>
            <input
              type="number"
              className="xp-input"
              value={xpAtual === 0 ? "" : xpAtual}
              placeholder="0"
              onChange={(e) => salvar("xp", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}