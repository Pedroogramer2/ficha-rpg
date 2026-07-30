// src/utils/motorDeEfeitos.js

// Exportamos o dicionário global para não quebrar a Ficha.jsx!
export const EFEITOS_GLOBAIS = {
  "Bless": { gatilhos: ["ataque", "save"], dadoBonus: 4, qtdDados: 1, texto: "Bênção" },
  "Bane": { gatilhos: ["ataque", "save"], dadoPenalty: 4, qtdDados: 1, texto: "Perdição" },
  "Fúria": { gatilhos: ["dano"], bonusFixo: 2, exigeAtributo: "forca", texto: "Fúria" },
  "Matador de Colossos": { gatilhos: ["dano"], dadoBonus: 8, qtdDados: 1, texto: "Colossos" },
  "Ataque Furtivo": { gatilhos: ["dano"], dadoBonus: 6, qtdDados: 1, texto: "Furtivo" },
  "Marca do Caçador": { gatilhos: ["dano"], dadoBonus: 6, qtdDados: 1, texto: "Marca" }
};

export function aplicarEfeitos(tipoDeRolagem, condicoesAtivas, nivelPersonagem = 1, atributoUsado = "forca") {
  let totalExtra = 0;
  let logsAvisos = [];
  let detalhesDados = [];

  if (!condicoesAtivas || condicoesAtivas.length === 0) {
    return { totalExtra: 0, logs: "", rolagensDetalhadas: "" };
  }

  // 👇 O MOTOR AGORA CALCULA O SCALING POR NÍVEL 👇
  // Fúria: +2 (Nv 1-8), +3 (Nv 9-15), +4 (Nv 16-20)
  let bonusFuriaAtual = 2;
  if (nivelPersonagem >= 16) bonusFuriaAtual = 4;
  else if (nivelPersonagem >= 9) bonusFuriaAtual = 3;

  // Furtivo: 1d6 nos níveis ímpares (Nv 1=1d6, Nv 3=2d6, Nv 5=3d6...)
  const dadosFurtivoAtual = Math.ceil(nivelPersonagem / 2);

  condicoesAtivas.forEach(cond => {
    const baseEfeito = EFEITOS_GLOBAIS[cond];
    
    // Verifica se o efeito é pro gatilho certo
    if (baseEfeito && baseEfeito.gatilhos.includes(tipoDeRolagem)) {
      
      // Clonamos o efeito para não sujar o original global!
      let efeito = { ...baseEfeito };

      // Atualiza os valores dinâmicos de acordo com o nível
      if (cond === "Fúria") efeito.bonusFixo = bonusFuriaAtual;
      if (cond === "Ataque Furtivo") efeito.qtdDados = dadosFurtivoAtual;

      // Se a regra exigir FORÇA (como a fúria) e o cara bater de DESTREZA (Arco), ele ignora!
      if (efeito.exigeAtributo && efeito.exigeAtributo !== atributoUsado) {
        return; // Pula pro próximo efeito
      }

      // Rola múltiplos dados se for Ataque Furtivo ou similar
      if (efeito.dadoBonus) {
        const qtd = efeito.qtdDados || 1;
        let somaDados = 0;
        let rolagens = [];
        for (let i = 0; i < qtd; i++) {
          const r = Math.floor(Math.random() * efeito.dadoBonus) + 1;
          somaDados += r;
          rolagens.push(r);
        }
        totalExtra += somaDados;
        detalhesDados.push(`+${qtd}d${efeito.dadoBonus}(${rolagens.join()})`);
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