// src/components/Resistencias.jsx
import { CLASSES_DETALHADAS } from '../data/classesDetalhado'; // 🧠 Usando o banco novo

export function Resistencias(props) {
  const dados = props.dados || {};
  const classeAtual = dados.classe || "Guerreiro";
  const regrasClasse = CLASSES_DETALHADAS[classeAtual];
  
  // Pega a lista de testes proficientes (ex: ['Força', 'Constituição'])
  const proficiencias = regrasClasse?.proficiencias?.testes || [];

  const nivel = dados.nivel || 1;
  const bonusProficiencia = Math.ceil(nivel / 4) + 1;

  const atributos = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];
  
  // Dicionário para cruzar a chave do banco com o nome legível das proficiências
  const MAPA_NOMES = {
    forca: "Força",
    destreza: "Destreza",
    constituicao: "Constituição",
    inteligencia: "Inteligência",
    sabedoria: "Sabedoria",
    carisma: "Carisma"
  };

  function getMod(nomeAtributo) {
    const valor = dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }

  return (
    <div className="painel-resistencias">
      <h3>Testes de Resistência</h3>
      <div className="lista-resistencias">
        {atributos.map((attr) => {
          const nomeLegivel = MAPA_NOMES[attr];
          
          // Verifica se a classe é proficiente conferindo o nome formatado
          const isProficiente = proficiencias.includes(nomeLegivel);
          
          // Modificador + Bônus de Proficiência (se aplicável)
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