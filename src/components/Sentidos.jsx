// src/components/Sentidos.jsx
export function Sentidos(props) {
  const dados = props.dados || {};
  const nivel = dados.nivel || 1;
  const prof = Math.ceil(nivel / 4) + 1;
  const pericias = dados.periciasTreinadas || {};
  const talentos = dados.talentos || [];

  function getMod(nomeAtributo) {
    const valor = dados.atributos?.[nomeAtributo] || dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }
  
  const modWis = getMod("sabedoria");
  const modInt = getMod("inteligencia");

  // 🧠 RADAR DE HABILIDADES 🧠
  const isBardo = dados.classe === "Bardo" && nivel >= 2;
  const meiaProf = Math.floor(prof / 2);
  
  // Procura se o cara pegou o Talento Observador
  const temObservador = talentos.some(t => t.nome.toLowerCase().includes("observador") || t.nome.toLowerCase().includes("observant"));

  // 👇 CALCULADORA INTELIGENTE 👇
  function calcPassiva(modAtributo, nomePericia) {
    const status = pericias[nomePericia];
    let bonusProf = 0;

    // Resolve o bug da Expertise!
    if (status === "expertise") bonusProf = prof * 2;
    else if (status === "proficiente" || status === true) bonusProf = prof;
    else if (isBardo) bonusProf = meiaProf; // Aplica o Multi-tarefa nos Passivos

    let extraTalento = 0;
    // Bônus absurdo do Talento Observador no D&D 5e
    if (temObservador && (nomePericia === "Percepção" || nomePericia === "Investigação")) {
      extraTalento = 5;
    }

    return 10 + modAtributo + bonusProf + extraTalento;
  }

  return (
    <div className="painel-sentidos">
      <h3 className="titulo-lateral">Sentidos Passivos</h3>
      
      <div className="linha-sentido">
        <span>Investigação (Int)</span>
        <strong title={temObservador ? "Talento Observador ativo (+5)" : ""}>
          {calcPassiva(modInt, "Investigação")}
        </strong>
      </div>

      <div className="linha-sentido">
        <span>Intuição (Sab)</span>
        <strong>{calcPassiva(modWis, "Intuição")}</strong>
      </div>

      <div className="linha-sentido">
        <span>Percepção (Sab)</span>
        <strong title={temObservador ? "Talento Observador ativo (+5)" : ""}>
          {calcPassiva(modWis, "Percepção")}
        </strong>
      </div>

      <hr style={{borderColor: '#444', margin: '10px 0'}}/>
      
      <div className="linha-sentido">
        <span>Visão no Escuro</span>
        {/* Agora é sincronizado com o banco (mas continua editável pra feitiços) */}
        <input 
          type="text" 
          placeholder="0 ft" 
          value={dados.visaoEscuro || ""}
          onChange={(e) => props.aoSalvar && props.aoSalvar("visaoEscuro", e.target.value)}
          style={{width: '70px', background: 'transparent', border:'none', color:'white', textAlign:'right'}}
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