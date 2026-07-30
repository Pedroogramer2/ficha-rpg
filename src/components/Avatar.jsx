// src/components/Avatar.jsx
import { useState } from 'react';

export function Avatar(props) {
  const imagemAtual = props.url || null;
  const [carregando, setCarregando] = useState(false);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setCarregando(true); // Mostra feedback visual!

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // 👇 O COMPRESSOR INVISÍVEL 👇
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300; // Tamanho ideal para VTT
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        // Mantém a proporção da imagem
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

        // 🪄 Transforma em JPEG com 70% de qualidade (Fica minúsculo em KBs!)
        const base64Reduzida = canvas.toDataURL('image/jpeg', 0.7);

        if (props.aoSalvar) {
          props.aoSalvar("foto", base64Reduzida);
        }
        setCarregando(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="avatar-container" style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #444', backgroundColor: '#111' }}>
      <label className="avatar-wrapper" title="Clique para alterar a foto" style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}>
        
        {carregando ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffcc00' }}>
            ⏳...
          </div>
        ) : imagemAtual ? (
          <img src={imagemAtual} alt="Personagem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="avatar-placeholder" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            <span style={{ fontSize: '2rem' }}>📷</span>
            <small style={{ fontSize: '0.7rem' }}>Foto</small>
          </div>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{ display: 'none' }} 
        />
      </label>
    </div>
  );
}