// src/components/Avatar.jsx
import { useState } from 'react';

export function Avatar(props) {
  // Se não tiver foto, usa um quadrado cinza
  const imagemAtual = props.url || null;

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // Leitor de arquivos do navegador
      const reader = new FileReader();
      reader.onloadend = () => {
        // O resultado é uma string gigante que representa a imagem
        if (props.aoSalvar) {
          props.aoSalvar("foto", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="avatar-container">
      <label className="avatar-wrapper" title="Clique para alterar a foto">
        {imagemAtual ? (
          <img src={imagemAtual} alt="Personagem" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            <span>📷</span>
            <small>Adicionar Foto</small>
          </div>
        )}
        
        {/* Input invisível que abre a janela de arquivos */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{display: 'none'}} 
        />
      </label>
    </div>
  );
}