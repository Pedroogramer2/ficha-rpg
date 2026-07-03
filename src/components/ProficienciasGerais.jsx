// src/components/ProficienciasGerais.jsx
import { useState } from 'react';

export function ProficienciasGerais(props) {
  const dados = props.dados || {};
  
  const [idiomas, setIdiomas] = useState(dados.idiomas || "");
  const [armasArmaduras, setArmasArmaduras] = useState(dados.profArmasArmaduras || "");

  function salvar(campo, valor) {
    if (props.aoSalvar) props.aoSalvar(campo, valor);
  }

  return (
    <div className="painel-lateral-box">
      <h3 className="titulo-lateral">⚙️ Proficiências & Idiomas</h3>
      
      <div className="campo-defesa">
        <label>Armas & Armaduras</label>
        <textarea
          placeholder="Ex: Leves, Marciais, Escudos..."
          value={armasArmaduras}
          onChange={(e) => setArmasArmaduras(e.target.value)}
          onBlur={() => salvar("profArmasArmaduras", armasArmaduras)}
          rows={3}
        />
      </div>

      <div className="campo-defesa">
        <label>Idiomas</label>
        <textarea
          placeholder="Ex: Comum, Élfico, Dracônico..."
          value={idiomas}
          onChange={(e) => setIdiomas(e.target.value)}
          onBlur={() => salvar("idiomas", idiomas)}
          rows={2}
          style={{color: '#ccccff'}}
        />
      </div>
    </div>
  );
}