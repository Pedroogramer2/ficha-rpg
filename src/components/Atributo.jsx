// src/components/Atributo.jsx
import { useState, useEffect } from 'react';

export function Atributo(props) {
  const [valor, setValor] = useState(props.valorInicial || 10);

  useEffect(() => {
    if (props.valorInicial !== undefined) setValor(props.valorInicial);
  }, [props.valorInicial]); 

  const modificador = Math.floor((valor - 10) / 2);
  const modTexto = modificador >= 0 ? `+${modificador}` : modificador;

  function lidarComBlur() {
    if (props.aoSalvar) props.aoSalvar(props.chaveBanco, valor);
  }

  function rolarCheck() {
    if (props.aoRolar) props.aoRolar(`Teste de ${props.nome}`, modificador);
  }

  // --- LÓGICA NOVA DE SAVE ---
  function rolarSave() {
    // Se for proficiente, soma o bônus. Se não, é só o modificador.
    const bonusTotal = props.proficiente ? (modificador + props.bonusProf) : modificador;
    
    // Texto para o log (ex: "Salvaguarda de FORÇA (Proficiente)")
    const titulo = `Salvaguarda de ${props.nome}` + (props.proficiente ? " (Prof)" : "");
    
    if (props.aoRolar) props.aoRolar(titulo, bonusTotal);
  }

  // Define se o botão deve brilhar
  const classeBotaoSave = props.proficiente ? "btn-roll-attr save proficiente" : "btn-roll-attr save";
  const valorSaveDisplay = props.proficiente ? (modificador + props.bonusProf) : modificador;
  const textoSave = valorSaveDisplay >= 0 ? `+${valorSaveDisplay}` : valorSaveDisplay;

  return (
    <div className="card-atributo">
      <div className="nome-atributo">{props.nome}</div>
      <div className="modificador-destaque roravel" onClick={rolarCheck}>
        {modTexto}
      </div>

      <div className="input-area">
        <small>Valor</small>
        <input 
          type="number" value={valor} 
          onChange={(e) => setValor(parseInt(e.target.value) || 0)} 
          onBlur={lidarComBlur}
        />
      </div>

      <div className="botoes-rolagem-attr">
        <button className="btn-roll-attr" onClick={rolarCheck}>CHECK</button>
        
        {/* BOTÃO SAVE INTELIGENTE */}
        <button className={classeBotaoSave} onClick={rolarSave} title={props.proficiente ? "Proficiente" : ""}>
          SAVE {textoSave}
        </button>
      </div>
    </div>
  );
}