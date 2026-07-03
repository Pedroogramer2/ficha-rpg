// src/components/ListaPericias.jsx
import { LISTA_PERICIAS } from '../regras';
import { RACAS } from '../data/racas';

export function ListaPericias(props) {
  const dados = props.dados || {};
  const nivel = dados.nivel || 1;
  const profBonus = Math.ceil(nivel / 4) + 1;
  const treinadas = dados.periciasTreinadas || {};

  // Pega a lista da raça
  const infoRaca = dados.raca ? RACAS[dados.raca] : null;
  const periciasRaciais = infoRaca?.periciasGratis || [];

  // --- FUNÇÃO DE COMPARAÇÃO ROBUSTA ---
  // Verifica se a perícia está na lista racial ignorando espaços extras
  function ehRacial(nomePericia) {
    return periciasRaciais.some(r => r.trim() === nomePericia.trim());
  }

  function togglePericia(nomePericia) {
    let novoStatus;
    const statusAtual = treinadas[nomePericia];

    if (!statusAtual) novoStatus = "proficiente";
    else if (statusAtual === true || statusAtual === "proficiente") novoStatus = "expertise";
    else novoStatus = null;

    const novasPericias = { ...treinadas };
    if (novoStatus) novasPericias[nomePericia] = novoStatus;
    else delete novasPericias[nomePericia];

    if (props.aoSalvar) props.aoSalvar("periciasTreinadas", novasPericias);
  }

  function getMod(nomeAtributo) {
    const valor = dados.atributos?.[nomeAtributo] || dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }

  return (
  <div className="painel-pericias">
    <h3>Perícias</h3>
    <div className="bonus-pro">Proficiência: <strong>+{profBonus}</strong></div>

    <div className="lista-scroll">
      {LISTA_PERICIAS.map((pericia) => {
        const modAtributo = getMod(pericia.atributo);
        const statusBanco = treinadas[pericia.nome];
        const isRacial = ehRacial(pericia.nome);
        
        let bonusAdicional = 0;
        let classeVisual = "";
        let icone = "⬜";

        if (statusBanco === "expertise") {
          bonusAdicional = profBonus * 2;
          classeVisual = "expert";
          icone = "👑";
        } else if (statusBanco === "proficiente" || statusBanco === true || isRacial) {
          bonusAdicional = profBonus;
          classeVisual = "treinado";
          icone = "✅";
        }

        const valorFinal = modAtributo + bonusAdicional;
        const textoFinal = valorFinal >= 0 ? `+${valorFinal}` : valorFinal;
        
        // --- REGRAS ESPECÍFICAS DO LADINO (RELIABLE TALENT) ---
        const temReliableTalent = dados.classe === "Ladino" && nivel >= 11;
        const ehProficiente = statusBanco === "proficiente" || statusBanco === "expertise" || isRacial;
        const minimoDado = (temReliableTalent && ehProficiente) ? 10 : 1;

        return (
          <div 
            key={pericia.nome} 
            className={`linha-pericia ${classeVisual}`}
            onClick={() => togglePericia(pericia.nome)}
            style={{cursor:'pointer'}}  
          >
            <div style={{width:'30px', textAlign:'center'}}>{icone}</div>

            <span className="nome-pericia">
              {pericia.nome} 
              <small> ({pericia.atributo.substring(0,3).toUpperCase()})</small>
              {isRacial && statusBanco !== "expertise" && (
                <span style={{fontSize:'0.6em', marginLeft:'5px', color:'#aaffaa'}}>(Raça)</span>
              )}
            </span>

            {/* 👇 O GATILHO DA ROLAGEM CORRIGIDO 👇 */}
            <span 
              className="valor-pericia roravel"
              onClick={(e) => {
                e.stopPropagation();
                if(props.aoRolar) {
                  // Enviamos o valor final exato para a rolagem
                  // O título avisa no log se o Talento Confiável está protegendo a jogada!
                  const sufixoLog = minimoDado === 10 ? " (Talento Confiável)" : "";
                  props.aoRolar(`${pericia.nome}${sufixoLog}`, valorFinal, minimoDado); 
                }
              }}
              title={minimoDado === 10 ? "Talento Confiável Ativo (Mínimo 10 no dado)" : ""}
            >
              {textoFinal}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
}