// src/components/Defesas.jsx
import { useState, useEffect } from 'react';
import { RACAS } from '../data/racas'; 

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

    // B) Puxa as Resistências Extras baseadas em Escolhas (Ex: Draconato)
    if (racaDB.escolhaRacial && racaDB.escolhaRacial.opcoes) {
      
      // 1. Pega os traços normais
      const textoTracos = (dados.tracosRaciais || []).map(t => `${t.nome} ${t.descricao}`).join(" ");
      
      // 2. Pega as escolhas feitas nos dropdowns (A gaveta certa!)
      const textoEscolhas = JSON.stringify(dados.escolhaRacialDetalhes || {}); // ✅ CORRIGIDO!
      
      // 🧠 O SUPER ARRASTÃO: Junta as duas gavetas e joga tudo pra minúsculo!
      const superArrastao = (textoTracos + " " + textoEscolhas).toLowerCase();

      racaDB.escolhaRacial.opcoes.forEach(opcao => {
        // Pega só a palavra-chave (Ex: "Fogo", "Abissal")
        const palavraChave = opcao.nome.split("(")[0].trim().toLowerCase();
        
        // Procura no Super Arrastão!
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

  return (
    <div className="painel-lateral-box">
      <h3 className="titulo-lateral">🛡️ Defesas</h3>
      
      <div className="campo-defesa" style={{ marginBottom: '15px' }}>
        <label>Resistências</label>
        
        {autoResistencias.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
            {autoResistencias.map((res, i) => (
              <span key={i} style={{ background: '#332b00', color: '#ffcc00', border: '1px solid #665500', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {res}
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
              <span key={i} style={{ background: '#003311', color: '#aaffaa', border: '1px solid #006622', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {imun}
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