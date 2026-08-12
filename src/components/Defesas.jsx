// src/components/Defesas.jsx
import { useState, useEffect } from 'react';
import { RACAS } from '../data/racas'; 
import itensMagicos from '../data/itensMagicos'; // 👈 IMPORTANDO A MÁGICA

export function Defesas(props) {
  const dados = props.dados || {};
  
  const [resistenciasManuais, setResistenciasManuais] = useState("");
  const [imunidadesManuais, setImunidadesManuais] = useState("");

  useEffect(() => {
    setResistenciasManuais(dados.resistenciasDano || "");
    setImunidadesManuais(dados.imunidades || "");
  }, [dados.resistenciasDano, dados.imunidades]);

  function salvar(campo, valor) {
    if (props.aoSalvar) props.aoSalvar(campo, valor);
  }

  let autoResistencias = [];
  let autoImunidades = [];

  const racaNome = dados.raca || "";
  const racaDB = RACAS ? RACAS[racaNome] : null;

  if (racaDB) {
    if (racaDB.resistenciasPadrao && racaDB.resistenciasPadrao.length > 0) {
      racaDB.resistenciasPadrao.forEach(res => autoResistencias.push(`${res} (Raça)`));
    }

    if (racaDB.escolhaRacial && racaDB.escolhaRacial.opcoes) {
      const textoTracos = (dados.tracosRaciais || []).map(t => `${t.nome} ${t.descricao}`).join(" ");
      const textoEscolhas = JSON.stringify(dados.escolhaRacialDetalhes || {}); 
      const superArrastao = (textoTracos + " " + textoEscolhas).toLowerCase();

      racaDB.escolhaRacial.opcoes.forEach(opcao => {
        const palavraChave = opcao.nome.split("(")[0].trim().toLowerCase();
        if (superArrastao.includes(palavraChave) && opcao.resistenciaExtra) {
          autoResistencias.push(`${opcao.resistenciaExtra} (Herança Racial)`);
        }
      });
    }
  }

  const tracosClasse = dados.tracosClasse || [];
  const tracosClasseNomes = tracosClasse.map(t => t.nome.toLowerCase());
  
  if (tracosClasseNomes.some(nome => nome.includes("fúria") || nome.includes("rage"))) {
    autoResistencias.push("Concussão, Cortante, Perfurante (Em Fúria)");
  }

  if (tracosClasseNomes.some(nome => nome.includes("pureza corporal"))) {
    autoImunidades.push("Veneno (Pureza Corporal)");
    autoImunidades.push("Doença (Pureza Corporal)");
  }

  // 👇 O MOTOR DE VARREDURA DE ITENS MÁGICOS 👇
  if (dados.inventario) {
    const itensEmUso = dados.inventario.filter(i => i.equipado || i.sintonizado);
    const todosMagicos = Object.values(itensMagicos).flatMap(arr => arr);

    itensEmUso.forEach(itemUso => {
      const infoMagica = todosMagicos.find(im => im.nome.toLowerCase() === itemUso.nome.toLowerCase());
      if (infoMagica) {
        
        // Pode ser um texto direto ou um Array de resistências (Ex: ["Fogo", "Frio"])
        if (infoMagica.concedeResistencia) {
          const res = Array.isArray(infoMagica.concedeResistencia) ? infoMagica.concedeResistencia : [infoMagica.concedeResistencia];
          res.forEach(r => autoResistencias.push(`${r} (Magia)`));
        }

        if (infoMagica.concedeImunidade) {
          const imu = Array.isArray(infoMagica.concedeImunidade) ? infoMagica.concedeImunidade : [infoMagica.concedeImunidade];
          imu.forEach(i => autoImunidades.push(`${i} (Magia)`));
        }

      }
    });
  }

  return (
    <div className="painel-lateral-box">
      <h3 className="titulo-lateral">🛡️ Defesas</h3>
      
      <div className="campo-defesa" style={{ marginBottom: '15px' }}>
        <label>Resistências</label>
        
        {autoResistencias.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
            {autoResistencias.map((res, i) => (
              <span key={i} style={{ 
                background: res.includes('Magia') ? '#3a005c' : '#332b00', // Roxinho para magia, Amarelo pra raça
                color: res.includes('Magia') ? '#d7bde2' : '#ffcc00', 
                border: res.includes('Magia') ? '1px solid #8e44ad' : '1px solid #665500', 
                padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' 
              }}>
                {res.includes('Magia') ? '✨ ' : ''}{res}
              </span>
            ))}
          </div>
        )}

        <textarea
          placeholder="Outras resistências manuais..."
          value={resistenciasManuais}
          onChange={(e) => setResistenciasManuais(e.target.value)}
          onBlur={() => salvar("resistenciasDano", resistenciasManuais)}
          rows={2}
          style={{ width: '100%', background: '#111', color: '#ccc', border: '1px solid #333', borderRadius: '4px', padding: '5px', fontSize: '0.8rem' }}
        />
      </div>

      <div className="campo-defesa">
        <label>Imunidades</label>
        
        {autoImunidades.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
            {autoImunidades.map((imun, i) => (
              <span key={i} style={{ 
                background: imun.includes('Magia') ? '#3a005c' : '#003311', 
                color: imun.includes('Magia') ? '#d7bde2' : '#aaffaa', 
                border: imun.includes('Magia') ? '1px solid #8e44ad' : '1px solid #006622', 
                padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' 
              }}>
                {imun.includes('Magia') ? '✨ ' : ''}{imun}
              </span>
            ))}
          </div>
        )}

        <textarea
          placeholder="Outras imunidades manuais..."
          value={imunidadesManuais}
          onChange={(e) => setImunidadesManuais(e.target.value)}
          onBlur={() => salvar("imunidades", imunidadesManuais)}
          rows={2}
          style={{ width: '100%', background: '#111', color: '#aaffaa', border: '1px solid #333', borderRadius: '4px', padding: '5px', fontSize: '0.8rem' }}
        />
      </div>
    </div>
  );
}