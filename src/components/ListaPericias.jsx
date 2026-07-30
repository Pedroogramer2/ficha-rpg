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
  function ehRacial(nomePericia) {
    return periciasRaciais.some(r => r.trim() === nomePericia.trim());
  }

  // 👇 CLIQUE CORRIGIDO: O Bug Fantasma morreu!
  function togglePericia(nomePericia) {
    const isRacial = ehRacial(nomePericia);
    const statusAtual = treinadas[nomePericia];
    let novoStatus;

    if (!statusAtual) {
      // Se já é treinado pela raça, o primeiro clique PULA para Expertise (Coroa)
      novoStatus = isRacial ? "expertise" : "proficiente";
    } 
    else if (statusAtual === "proficiente" || statusAtual === true) {
      novoStatus = "expertise";
    } 
    else {
      // Se estava com expertise, ou remove tudo, ou volta pro grátis da Raça (que no banco significa deletar)
      novoStatus = null;
    }

    const novasPericias = { ...treinadas };
    if (novoStatus) novasPericias[nomePericia] = novoStatus;
    else delete novasPericias[nomePericia];

    if (props.aoSalvar) props.aoSalvar("periciasTreinadas", novasPericias);
  }

  function getMod(nomeAtributo) {
    const valor = dados.atributos?.[nomeAtributo] || dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }

  // 🧠 O RADAR DO BARDO (Jack of All Trades) 🧠
  const isBardo = dados.classe === "Bardo" && nivel >= 2;
  const meiaProficiencia = Math.floor(profBonus / 2);

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

        // 👇 CASCATA DE BÔNUS INTELIGENTE 👇
        if (statusBanco === "expertise") {
          bonusAdicional = profBonus * 2;
          classeVisual = "expert";
          icone = "👑";
        } 
        else if (statusBanco === "proficiente" || statusBanco === true || isRacial) {
          bonusAdicional = profBonus;
          classeVisual = "treinado";
          icone = "✅";
        } 
        else if (isBardo) {
          // A Automação do Bardo entra aqui! Se não tem proficiência, ganha metade.
          bonusAdicional = meiaProficiencia;
          classeVisual = "meio-treinado"; // (Se quiser, pode botar um text-shadow diferente no CSS dps)
          icone = "🌗";
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
            <div style={{width:'30px', textAlign:'center', fontSize: '0.9rem'}}>{icone}</div>

            <span className="nome-pericia">
              {pericia.nome} 
              <small> ({pericia.atributo.substring(0,3).toUpperCase()})</small>
              {isRacial && statusBanco !== "expertise" && (
                <span style={{fontSize:'0.6em', marginLeft:'5px', color:'#aaffaa'}}>(Raça)</span>
              )}
            </span>

            <span 
              className="valor-pericia roravel"
              onClick={(e) => {
                e.stopPropagation();
                if(props.aoRolar) {
                  const sufixoLog = minimoDado === 10 ? " (Talento Confiável)" : (isBardo && !ehProficiente ? " (Multi-tarefa)" : "");
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