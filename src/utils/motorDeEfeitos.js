// src/utils/motorDeEfeitos.js

export const EFEITOS_GLOBAIS = {
  "Bless": { gatilhos: ["ataque", "save"], dadoBonus: 4, texto: "Bênção" },
  "Bane": { gatilhos: ["ataque", "save"], dadoPenalty: 4, texto: "Perdição" },
  "Fúria": { gatilhos: ["dano"], bonusFixo: 2, texto: "Fúria" },
  "Matador de Colossos": { gatilhos: ["dano"], dadoBonus: 8, texto: "Colossos" },
  "Ataque Furtivo": { gatilhos: ["dano"], dadoBonus: 6, texto: "Furtivo" },
  "Marca do Caçador": { gatilhos: ["dano"], dadoBonus: 6, texto: "Marca" }
};

export function aplicarEfeitos(tipoDeRolagem, condicoesAtivas) {
  let totalExtra = 0;
  let logsAvisos = [];
  let detalhesDados = [];

  if (!condicoesAtivas || condicoesAtivas.length === 0) {
    return { totalExtra: 0, logs: "" };
  }

  condicoesAtivas.forEach(cond => {
    const efeito = EFEITOS_GLOBAIS[cond];
    if (efeito && efeito.gatilhos.includes(tipoDeRolagem)) {
      if (efeito.dadoBonus) {
        const r = Math.floor(Math.random() * efeito.dadoBonus) + 1;
        totalExtra += r;
        detalhesDados.push(`+d${efeito.dadoBonus}(${r})`);
        logsAvisos.push(`✨ ${efeito.texto}`);
      }
      if (efeito.dadoPenalty) {
        const r = Math.floor(Math.random() * efeito.dadoPenalty) + 1;
        totalExtra -= r;
        detalhesDados.push(`-d${efeito.dadoPenalty}(${r})`);
        logsAvisos.push(`☠️ ${efeito.texto}`);
      }
      if (efeito.bonusFixo) {
        totalExtra += efeito.bonusFixo;
        detalhesDados.push(`+${efeito.bonusFixo}`);
        logsAvisos.push(`💢 ${efeito.texto}`);
      }
    }
  });

  let stringLog = "";
  if (logsAvisos.length > 0) {
    stringLog = `<br/><small style="color:#ffcc00">${logsAvisos.join(' | ')} ➔ 🎲 ${detalhesDados.join(' ')}</small>`;
  }

  return { totalExtra, logs: stringLog, rolagensDetalhadas: detalhesDados.join(' ') };
}