// src/components/Sentidos.jsx
export function Sentidos(props) {
  const dados = props.dados || {};
  
  // Cálculos de Modificadores
  const modWis = Math.floor(((dados.sabedoria || 10) - 10) / 2);
  const modInt = Math.floor(((dados.inteligencia || 10) - 10) / 2);

  // Bônus de Proficiência
  const nivel = dados.nivel || 1;
  const prof = Math.ceil(nivel / 4) + 1;

  // Verifica se é treinado (lê do objeto periciasTreinadas que criamos antes)
  const pericias = dados.periciasTreinadas || {};

  function calcPassiva(mod, treinado) {
    return 10 + mod + (treinado ? prof : 0);
  }

  return (
    <div className="painel-sentidos">
      <h3 className="titulo-lateral">Sentidos Passivos</h3>
      
      <div className="linha-sentido">
        <span>Investigação (Int)</span>
        <strong>{calcPassiva(modInt, pericias["Investigação"])}</strong>
      </div>

      <div className="linha-sentido">
        <span>Intuição (Sab)</span>
        <strong>{calcPassiva(modWis, pericias["Intuição"])}</strong>
      </div>

      <div className="linha-sentido">
        <span>Percepção (Sab)</span>
        <strong>{calcPassiva(modWis, pericias["Percepção"])}</strong>
      </div>

      <hr style={{borderColor: '#444', margin: '10px 0'}}/>
      
      <div className="linha-sentido">
        <span>Visão no Escuro</span>
        {/* Por enquanto manual, depois puxamos da raça */}
        <input 
          type="text" 
          placeholder="0m" 
          value={dados.visaoEscuro || ""}
          onChange={(e) => props.aoSalvar && props.aoSalvar("visaoEscuro", e.target.value)}
          style={{width: '50px', background: 'transparent', border:'none', color:'white', textAlign:'right'}}
        />
      </div>
      
      {props.dados.visaoEspecial && (
        <div className="linha-sentido" style={{marginTop:'5px', color:'#ffcc00'}}>
          <span>Especial</span>
          <strong style={{fontSize:'0.8rem'}}>{props.dados.visaoEspecial}</strong>
        </div>
      )}
    </div>
  );
}