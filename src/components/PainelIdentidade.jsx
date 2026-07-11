// src/components/PainelIdentidade.jsx
import { useState } from 'react';
import { CLASSES_DND } from '../regras';
import { calcularVidaMaxima } from '../utils/calculadoras'; 

export function PainelIdentidade(props) {
  const dados = props.dados || {};
  const [imagem, setImagem] = useState(dados.foto || null);

  // Upload de Foto via Base64
  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
        if (props.aoSalvar) props.aoSalvar("foto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const salvar = (campo, valor) => props.aoSalvar && props.aoSalvar(campo, valor);

  // --- NOVA LÓGICA CENTRALIZADA ---
  function atualizarNivel(novoNivel) {
    salvar("nivel", novoNivel);
    if (dados.classe) {
      const novaVida = calcularVidaMaxima(dados.classe, novoNivel, dados.constituicao);
      salvar("vidaMaxima", novaVida);
    }
  }

  function atualizarClasse(novaClasse) {
    salvar("classe", novaClasse);
    const novaVida = calcularVidaMaxima(novaClasse, dados.nivel || 1, dados.constituicao);
    salvar("vidaMaxima", novaVida);
  }

  // 👇 FUNÇÃO DA INSPIRAÇÃO 👇
  function alternarInspiracao() {
    salvar("inspiracao", !dados.inspiracao);
  }

  // 👇 MATEMÁTICA DO XP 👇
  const TABELA_XP = {
    1: 0, 2: 300, 3: 900, 4: 2700, 5: 6500, 
    6: 14000, 7: 23000, 8: 34000, 9: 48000, 10: 64000, 
    11: 85000, 12: 100000, 13: 120000, 14: 140000, 15: 165000, 
    16: 195000, 17: 225000, 18: 265000, 19: 305000, 20: 355000
  };

  const xpAtual = dados.xp || 0;
  const nivelAtual = dados.nivel || 1;
  const xpProximo = nivelAtual < 20 ? TABELA_XP[nivelAtual + 1] : "MAX";
  
  // Calcula o preenchimento da barrinha
  const porcentagemXP = nivelAtual < 20 
    ? Math.min(100, Math.max(0, (xpAtual / xpProximo) * 100)) 
    : 100;

  return (
    <div className="identity-card" style={{ position: 'relative' }}>
      
      {/* 👇 NOVO BOTÃO DE INSPIRAÇÃO (Mais claro e visual) 👇 */}
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

      <div className="identity-info" style={{ paddingRight: '70px' }}> {/* Padding para não encostar na inspiração */}
        <input 
          type="text" 
          className="input-nome-hero" 
          placeholder="Nome do Personagem"
          value={dados.nome || ""}
          onChange={(e) => salvar("nome", e.target.value)}
        />

        <div className="identity-sub">
          
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

        {/* 👇 BARRA DE XP PROGRESSIVA 👇 */}
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