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

  return (
    <div className="identity-card" style={{ position: 'relative' }}>
      
      {/* 👇 A MOEDA DE INSPIRAÇÃO FLUTUANTE 👇 */}
      <div 
        onClick={alternarInspiracao}
        title={dados.inspiracao ? "Gastar Inspiração" : "Dar Inspiração"}
        style={{
          position: 'absolute',
          top: '25px',
          right: '20px',
          background: dados.inspiracao ? '#ffcc00' : '#333',
          border: dados.inspiracao ? '3px solid #fff' : '3px solid #555',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: dados.inspiracao ? '0 0 15px rgba(255, 204, 0, 0.8)' : '0 2px 5px rgba(0,0,0,0.5)',
          transition: 'all 0.3s',
          zIndex: 10,
          filter: dados.inspiracao ? 'none' : 'grayscale(100%) opacity(0.5)',
          transform: dados.inspiracao ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {dados.inspiracao ? '✨' : '🪙'}
      </div>

      <div className="identity-avatar">
        <label className="avatar-click">
          {imagem ? <img src={imagem} alt="Avatar do Personagem" /> : <span className="placeholder-img">📷</span>}
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>

      <div className="identity-info">
        <input 
          type="text" 
          className="input-nome-hero" 
          placeholder="Nome do Personagem"
          value={dados.nome || ""}
          onChange={(e) => salvar("nome", e.target.value)}
        />

        <div className="identity-sub">
          
          <span className="badge-nivel-display" style={{ background: '#333', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
            Nível {dados.nivel || 1}
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
      </div>
    </div>
  );
}