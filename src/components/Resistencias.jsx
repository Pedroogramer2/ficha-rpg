// src/components/Resistencias.jsx
import { CLASSES_DETALHADAS } from '../data/classesDetalhado'; 

export function Resistencias(props) {
  const dados = props.dados || {};
  const classeAtual = dados.classe || "Guerreiro";
  const regrasClasse = CLASSES_DETALHADAS[classeAtual];
  
  const proficienciasClasse = regrasClasse?.proficiencias?.testes || [];
  const talentos = dados.talentos || [];

  const nivel = dados.nivel || 1;
  const bonusProficiencia = Math.ceil(nivel / 4) + 1;

  const atributos = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];
  
  const MAPA_NOMES = {
    forca: "Força", destreza: "Destreza", constituicao: "Constituição",
    inteligencia: "Inteligência", sabedoria: "Sabedoria", carisma: "Carisma"
  };

  function getMod(nomeAtributo) {
    // Puxa do objeto 'atributos' que a gente arrumou hoje mais cedo, ou cai pro root
    const valor = dados.atributos?.[nomeAtributo] || dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }

  return (
    <div className="painel-resistencias">
      <h3>Testes de Resistência</h3>
      <div className="lista-resistencias">
        {atributos.map((attr) => {
          const nomeLegivel = MAPA_NOMES[attr];
          
          // 1. Checa a Classe Base
          let isProficiente = proficienciasClasse.includes(nomeLegivel);
          
          // 2. Checa o Talento "Resiliente" (Ex: "Resiliente (Destreza)")
          if (!isProficiente && talentos.some(t => t.nome.toLowerCase().includes(`resiliente (${nomeLegivel.toLowerCase()})`))) {
            isProficiente = true;
          }

          // 3. Checa a Alma de Diamante (Monge Nível 14 ganha proficiência em TUDO)
          if (!isProficiente && classeAtual === "Monge" && nivel >= 14) {
            isProficiente = true;
          }
          
          const total = getMod(attr) + (isProficiente ? bonusProficiencia : 0);
          const textoFinal = total >= 0 ? `+${total}` : total;

          return (
            <div key={attr} className={`item-resistencia ${isProficiente ? 'ativo' : ''}`}>
              <span className="res-nome">
                 {attr.substring(0,3).toUpperCase()}
              </span>
              <span className="res-valor">{textoFinal}</span>
              <div className="res-bolinha"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}