// src/components/Defesas.jsx
import { useState } from 'react';

export function Defesas(props) {
  const dados = props.dados || {};
  
  // Vamos usar strings simples separadas por vírgula para facilitar
  const [resistencias, setResistencias] = useState(dados.resistenciasDano || "");
  const [imunidades, setImunidades] = useState(dados.imunidades || "");

  function salvar(campo, valor) {
    if (props.aoSalvar) props.aoSalvar(campo, valor);
  }

  return (
    <div className="painel-lateral-box">
      <h3 className="titulo-lateral">🛡️ Defesas</h3>
      
      <div className="campo-defesa">
        <label>Resistências</label>
        <textarea
          placeholder="Ex: Fogo, Veneno..."
          value={resistencias}
          onChange={(e) => setResistencias(e.target.value)}
          onBlur={() => salvar("resistenciasDano", resistencias)}
          rows={2}
        />
      </div>

      <div className="campo-defesa">
        <label>Imunidades</label>
        <textarea
          placeholder="Ex: Sono, Doença..."
          value={imunidades}
          onChange={(e) => setImunidades(e.target.value)}
          onBlur={() => salvar("imunidades", imunidades)}
          rows={2}
          style={{color: '#aaffaa'}} // Um leve verde para imunidade
        />
      </div>
    </div>
  );
}