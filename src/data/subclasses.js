// src/data/subclasses.js

import { ARMAS, PROPRIEDADES_MAESTRIA } from './armas';
import { opcoesDeArmas } from './armas';

export const SUBCLASSES = {
  // --- GUERREIRO ---
  "Mestre de Batalha (Battle Master)": {
    escolhasNivel3: [
      { titulo: "Manobra (Escolha 1)", tipo: "manobra" },
      { titulo: "Manobra (Escolha 2)", tipo: "manobra" },
      { titulo: "Manobra (Escolha 3)", tipo: "manobra" }
    ],
    escolhasNivel7: [
      { titulo: "Manobra Adicional 1 (Nv 7)", tipo: "manobra" },
      { titulo: "Manobra Adicional 2 (Nv 7)", tipo: "manobra" }
    ],
    escolhasNivel10: [
      { titulo: "Manobra Adicional 3 (Nv 10)", tipo: "manobra" },
      { titulo: "Manobra Adicional 4 (Nv 10)", tipo: "manobra" }
    ],
    escolhasNivel15: [
      { titulo: "Manobra Adicional 5 (Nv 15)", tipo: "manobra" },
      { titulo: "Manobra Adicional 6 (Nv 15)", tipo: "manobra" }
    ],
    features: {
      3: [
        { 
          nome: "Superioridade em Combate", 
          tipoAcao: "livre", 
          desc: "Você ganha 4 Dados de Superioridade (d8). Você os gasta para abastecer suas Manobras (Você aprende 3 manobras à sua escolha. A CD delas é 8 + FOR ou DES + Proficiência).",
          usosMax: 4, 
          recuperacao: "Descanso Curto"
        },
        { 
          nome: "Estudante da Guerra", 
          tipoAcao: "passiva",
          desc: "Você ganha proficiência em uma ferramenta de artesão à sua escolha e em mais 1 perícia da lista do Guerreiro." 
        }
      ],
      7: [
        { 
          nome: "Conheça seu Inimigo", 
          tipoAcao: "bonus", // ⚡ Ação Bônus
          desc: "**Ação Bônus:** Você descobre as defesas de um alvo a até 30 pés (9m) de você. Você descobre se ele possui Imunidades, Resistências ou Vulnerabilidades, e quais são elas.\n*(Uso: 1x por Descanso Longo. Você pode usar de novo gastando 1 Dado de Superioridade).* " 
        },
        { 
          nome: "Superioridade em Combate (Upgrade Nv 7)", 
          tipoAcao: "passiva",
          desc: "Você ganha +1 Dado de Superioridade (Total: 5) e aprende +2 manobras.", 
          usosMax: 5, 
          recuperacao: "Descanso Curto" 
        }
      ],
      10: [
        { 
          nome: "Superioridade Aprimorada", 
          tipoAcao: "passiva",
          desc: "Seus Dados de Superioridade aumentam para d10s. Você também aprende +2 manobras." 
        }
      ],
      15: [
        { 
          nome: "Implacável", 
          tipoAcao: "livre", // 💨 Manobras infinitas!
          desc: "**Passiva Absurda:** Uma vez por turno, quando você utilizar uma manobra de Mestre de Batalha, você pode rolar 1d8 e usar o número rolado **no lugar** de gastar um dos seus Dados de Superioridade originais." 
        },
        { 
          nome: "Superioridade em Combate (Upgrade Nv 15)", 
          tipoAcao: "passiva",
          desc: "Você ganha +1 Dado de Superioridade (Total: 6) e aprende +2 manobras.", 
          usosMax: 6, 
          recuperacao: "Descanso Curto" 
        }
      ],
      18: [
        { 
          nome: "Superioridade Suprema", 
          tipoAcao: "passiva",
          desc: "A letalidade de suas manobras atinge o ápice. Seus Dados de Superioridade agora são d12s." 
        }
      ]
    }
  },

  "Campeão (Champion)": {
    escolhasNivel7: [
      { 
        titulo: "Estilo de Luta Adicional", 
        tipo: "talento", 
        opcoes: [
          { nome: "Arquearia (Archery)" },
          { nome: "Combate às Cegas (Blind Fighting)" },
          { nome: "Defesa (Defense)" },
          { nome: "Duelismo (Dueling)" },
          { nome: "Luta com Armas Grandes (Great Weapon Fighting)" },
          { nome: "Intercepção (Interception)" },
          { nome: "Proteção (Protection)" },
          { nome: "Luta com Armas de Arremesso (Thrown Weapon Fighting)" },
          { nome: "Combate com Duas Armas (Two Weapon Fighting)" },
          { nome: "Luta Desarmada (Unarmed Fighting)" }
        ] 
      }
    ],
    features: {
      3: [
        { 
          nome: "Crítico Aprimorado", 
          tipoAcao: "passiva",
          desc: "Seus ataques com armas e Ataques Desarmados conquistam um Acerto Crítico quando você rolar um 19 ou 20 no d20." 
        },
        { 
          nome: "Atleta Notável", 
          tipoAcao: "livre", 
          desc: "**Passiva:** Você tem Vantagem em testes de Iniciativa e Atletismo.\n**Gatilho:** Sempre que você causar um Acerto Crítico, você pode se mover até metade do seu deslocamento imediatamente sem provocar Ataques de Oportunidade." 
        }
      ],
      7: [
        { 
          nome: "Estilo de Luta Adicional", 
          tipoAcao: "passiva",
          desc: "Você pode escolher um segundo Estilo de Luta da classe Guerreiro." 
        }
      ],
      10: [
        { 
          nome: "Guerreiro Heroico", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Início do Turno):** Em combate, se você começar o seu turno sem possuir Inspiração Heroica, você ganha 1 Inspiração Heroica automaticamente." 
        }
      ],
      15: [
        { 
          nome: "Crítico Aprimorado (Upgrade Nv 15: Superior)", 
          tipoAcao: "passiva",
          desc: "Sua margem de Acerto Crítico se expande novamente. Seus ataques com arma/desarmados agora causam Acerto Crítico num 18, 19 ou 20 no d20." 
        }
      ],
      18: [
        { 
          nome: "Sobrevivente", 
          tipoAcao: "livre", 
          desc: "**Desafiar a Morte:** Vantagem em Death Saves. Se rolar 18-20, vale como se fosse um 20 natural (levanta com 1 PV).\n**Gatilho (Início do Turno):** Se você possuir menos da metade dos seus Pontos de Vida máximos e estiver vivo, recupere automaticamente 5 + seu Modificador de CON em PV." 
        }
      ]
    }
  },

  "Cavaleiro Arcano (Eldritch Knight)": {
    features: {
      3: [
        { 
          nome: "Vínculo de Guerra", 
          tipoAcao: "bonus", // ⚡ Ação Bônus de Invocação
          desc: "Você realiza um ritual de 1 hora para vincular até 2 armas a você. Você não pode ser desarmado dessas armas enquanto não estiver incapacitado.\n**Ação Bônus:** Você pode teleportar uma arma vinculada (que esteja no mesmo plano de existência) direto para a sua mão." 
        },
        { 
          nome: "Conjuração (Cavaleiro Arcano)", 
          tipoAcao: "acao",
          desc: "Você aprende feitiços da lista do Mago. Inteligência é o seu atributo de conjuração. Você começa conhecendo 2 Truques e preparando 3 Magias de Nível 1. Pode usar Foco Arcano." 
        }
      ],
      7: [
        { 
          nome: "Magia de Guerra", 
          tipoAcao: "livre", // 💨 Combina ataque com magia
          desc: "**Ação Especial:** Quando você usa a Ação de Ataque no seu turno, você pode substituir UM dos seus ataques pela conjuração de um Truque de Mago (que tenha tempo de conjuração de 1 Ação)." 
        }
      ],
      10: [
        { 
          nome: "Golpe Místico", 
          tipoAcao: "livre", // 💨 Gatilho ao bater
          desc: "**Gatilho:** Você acerta uma criatura com um ataque armado.\n**Efeito:** O alvo sofre Desvantagem no próximo Teste de Resistência (Save) que fizer contra uma magia sua lançada antes do final do seu próximo turno." 
        }
      ],
      15: [
        { 
          nome: "Investida Arcana", 
          tipoAcao: "livre", // 💨 Buff automático no Action Surge
          desc: "Sempre que você utilizar o seu *Surto de Ação* (Action Surge), você pode se teleportar até 30 pés (9m) para um espaço desocupado que possa ver (você pode fazer isso antes ou depois da ação adicional)." 
        }
      ],
      18: [
        { 
          nome: "Magia de Guerra (Upgrade Nv 18: Aprimorada)", 
          tipoAcao: "passiva",
          desc: "Quando você usar a Ação de Ataque, você pode substituir DOIS dos seus ataques pela conjuração de uma magia de Mago de Nível 1 ou Nível 2 (que tenha tempo de conjuração de 1 Ação)." 
        }
      ]
    }
  },

  "Guerreiro Psiônico (Psi Warrior)": {
    features: {
      3: [
        { 
          nome: "Poder Psiônico", 
          tipoAcao: "passiva", // A pool base
          desc: "Você ganha uma reserva de Dados de Energia Psiônica (d6). Você recupera 1 dado no Descanso Curto, e TODOS no Descanso Longo.\n- **Campo Protetor (Reação):** Se você ou um aliado a 30 pés tomar dano, gaste 1 Dado para reduzir o dano sofrido em (Dado Rolado + INT).\n- **Golpe Psiônico (Livre - 1x/turno):** Ao acertar um ataque armado, gaste 1 Dado para causar dano extra de Energia (Force) igual a (Dado Rolado + INT).",
          usosMax: 4, 
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "Movimento Telecinético", 
          tipoAcao: "acao", // ⚔️ Ação Mágica
          desc: "**Ação Mágica:** Mova um objeto solto (Grande ou menor) ou criatura voluntária em até 30 pés (9m) pelo ar. Se for um objeto minúsculo, pode ir pra sua mão.\n*(Uso: 1x por Descanso Curto/Longo. Pode usar de novo gastando 1 Dado Psiônico).* " 
        }
      ],
      4: [
        { nome: "Poder Psiônico (Upgrade Nv 4)", tipoAcao: "passiva", desc: "Seus Dados Psiônicos aumentam para d8. O total de dados sobe para 5.", usosMax: 5, recuperacao: "Descanso Longo" }
      ],
      6: [
        { nome: "Poder Psiônico (Upgrade Nv 6)", tipoAcao: "passiva", desc: "O total de dados sobe para 6.", usosMax: 6, recuperacao: "Descanso Longo" }
      ],
      7: [
        { 
          nome: "Adepto Telecinético", 
          tipoAcao: "bonus", // ⚡ Ação bônus de voo
          desc: "- **Salto Psiônico (Bônus):** Você ganha Deslocamento de Voo igual ao dobro da sua velocidade até o fim do turno. (1x grátis por Descanso Curto/Longo ou custa 1 Dado).\n- **Empurrão Telecinético (Passiva):** Ao causar dano com o Golpe Psiônico, você força o alvo a um Save de FOR (CD 8 + INT + Prof). Falha: Ele cai Caído (Prone) ou é arremessado 10 pés (3m)." 
        }
      ],
      8: [
        { nome: "Poder Psiônico (Upgrade Nv 8)", tipoAcao: "passiva", desc: "O total de dados sobe para 8.", usosMax: 8, recuperacao: "Descanso Longo" }
      ],
      10: [
        { 
          nome: "Mente Protegida", 
          tipoAcao: "livre", 
          desc: "**Passiva:** Resistência a dano Psíquico.\n**Gatilho (Início do Turno):** Se estiver Enfeitiçado (Charmed) ou Amedrontado (Frightened), você pode gastar 1 Dado Psiônico (sem gastar ação) para encerrar todas essas condições em você." 
        }
      ],
      11: [
        { nome: "Poder Psiônico (Upgrade Nv 11)", tipoAcao: "passiva", desc: "Seus Dados Psiônicos aumentam para d10." }
      ],
      13: [
        { nome: "Poder Psiônico (Upgrade Nv 13)", tipoAcao: "passiva", desc: "O total de dados sobe para 10.", usosMax: 10, recuperacao: "Descanso Longo" }
      ],
      15: [
        { 
          nome: "Baluarte de Força", 
          tipoAcao: "bonus", // ⚡ Ação Bônus 
          desc: "**Ação Bônus:** Você concede Meia-Cobertura (+2 na CA e Saves de DEX) para um número de criaturas a até 30 pés (incluindo você) igual ao seu Mod. de INT por 1 minuto.\n*(Uso: 1x por Descanso Longo. Pode usar de novo gastando 1 Dado Psiônico).* " 
        }
      ],
      17: [
        { nome: "Poder Psiônico (Upgrade Nv 17)", tipoAcao: "passiva", desc: "Seus Dados Psiônicos aumentam para d12. O total de dados sobe para 12.", usosMax: 12, recuperacao: "Descanso Longo" }
      ],
      18: [
        { 
          nome: "Mestre Telecinético", 
          tipoAcao: "acao", // ⚔️ Ação Mágica
          desc: "**Ação Mágica:** Você conjura a magia *Telecinesia (Telekinesis)* sem gastar slots ou componentes (INT é o atributo).\n**Ação Bônus:** Enquanto mantiver a concentração na magia, você pode fazer 1 ataque com arma como Ação Bônus a cada turno.\n*(Uso: 1x por Descanso Longo. Pode usar de novo gastando 1 Dado Psiônico).* " 
        }
      ]
    }
  },

  "Cavaleiro Estandarte (Banneret)": {
    features: {
      3: [
        { 
          nome: "Recuperação em Grupo", 
          tipoAcao: "livre", // 💨 Combina com o Second Wind
          desc: "**Gatilho:** Ao usar seu *Retomar o Fôlego* (Second Wind).\n**Efeito:** Escolha um número de aliados a até 30 pés (9m) igual ao seu Modificador de Carisma. Eles recuperam PV igual a 1d4 + seu Nível de Guerreiro.\n*(Uso desta cura em área: 1x por Descanso Curto/Longo).* " 
        },
        { 
          nome: "Enviado de Cavalaria", 
          tipoAcao: "passiva",
          desc: "Ganha proficiência em Intuição, Intimidação, Persuasão ou Performance. Aprende 1 idioma (pode trocar num Long Rest). Pode conjurar *Compreender Idiomas* como Ritual (CAR)." 
        }
      ],
      7: [
        { 
          nome: "Táticas de Equipe", 
          tipoAcao: "passiva", // Buff atrelado à Recuperação
          desc: "Quando você usar sua *Recuperação em Grupo* (Nível 3), os aliados curados ganham Vantagem em TODOS os seus Testes de d20 (Ataques, Testes e Saves) até o início do seu próximo turno." 
        }
      ],
      10: [
        { 
          nome: "Surto Inspirador", 
          tipoAcao: "livre", // 💨 Combina com o Action Surge
          desc: "**Gatilho:** Ao usar seu *Surto de Ação* (Action Surge).\n**Efeito:** Escolha aliados a até 30 pés igual ao seu Mod. de Carisma. Eles podem usar a Reação deles imediatamente para atacar (1 ataque armado ou desarmado) OU mover-se metade do deslocamento sem gerar Ataques de Oportunidade." 
        }
      ],
      15: [
        { 
          nome: "Resiliência Compartilhada", 
          tipoAcao: "reacao", // 🛡️ Reação violenta
          desc: "**Reação:** Se um aliado a até 60 pés (18m) falhar num Teste de Resistência (Save), você pode gastar 1 uso da sua habilidade *Indomável* (Indomitable) do Guerreiro. O aliado pode rolar o dado novamente somando um bônus igual ao SEU Nível de Guerreiro (deve usar a nova rolagem)." 
        }
      ],
      18: [
        { 
          nome: "Comandante Inspirador", 
          tipoAcao: "passiva",
          desc: "Sua *Recuperação em Grupo* e seu *Surto Inspirador* agora afetam aliados a até 60 pés (18m). Além disso, você se torna imune às condições Enfeitiçado (Charmed) e Amedrontado (Frightened)." 
        }
      ]
    }
  },
  "Arqueiro Arcano (Arcane Archer - Legado)": {
    features: {
      3: [
        { 
          nome: "Lore do Arqueiro Arcano", 
          tipoAcao: "passiva",
          desc: "Você ganha proficiência em Arcanismo ou Natureza. Aprende o truque *Prestidigitação* ou *Druidismo*." 
        },
        { 
          nome: "Tiro Arcano", 
          tipoAcao: "livre", // 💨 Gatilho ao acertar a flechada!
          desc: "**Gatilho:** Ao atirar uma flecha (Arco Curto ou Longo) e ela atingir o alvo (limite de 1x por turno).\n**Efeito:** Você aplica um dos seus Efeitos Arcanos escolhidos à flecha (Banimento, Explosão, Sombra, Enfraquecimento, etc). A CD para os efeitos é (8 + INT + Proficiência).\n*(Usos: 2 vezes. Você recupera todos os usos ao final de um Descanso Curto ou Longo. Você aprende 2 opções no Nv 3, e ganha mais opções nos Nvs 7, 10, 15 e 18).* ",
          usosMax: 2,
          recuperacao: "Descanso Curto"
        }
      ],
      7: [
        { 
          nome: "Flecha Mágica", 
          tipoAcao: "passiva",
          desc: "Toda flecha não-mágica que você atirar com um Arco Curto/Longo passa a ser considerada mágica para o propósito de superar resistências e imunidades." 
        },
        { 
          nome: "Tiro Curvado", 
          tipoAcao: "bonus", // ⚡ Ação Bônus ao errar
          desc: "**Ação Bônus:** Quando você fizer uma rolagem de ataque com uma flecha mágica e errar, você pode redirecionar a flecha, rerolando o ataque contra um alvo diferente que esteja a até 60 pés do alvo original." 
        }
      ],
      10: [
        { nome: "Tiro Arcano (Novas Opções Nv 10)", tipoAcao: "passiva", desc: "Você aprende +1 opção de Tiro Arcano." }
      ],
      15: [
        { 
          nome: "Tiro Sempre Pronto", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Rolar Iniciativa):** Se você rolar Iniciativa e não tiver nenhum uso restante de Tiro Arcano, você recupera 1 uso imediatamente." 
        }
      ],
      18: [
        { 
          // 👇 O sistema vai upar as opções lá da carta do Nv 3!
          nome: "Tiro Arcano (Upgrade Nv 18: Dano Letal)", 
          tipoAcao: "passiva",
          desc: "O dano de todas as suas opções de Tiro Arcano aumenta (geralmente saltando de 2d6 para 4d6 de dano extra)." 
        }
      ]
    }
  },

  "Cavaleiro (Cavalier - Legado)": {
    features: {
      3: [
        { 
          nome: "Proficiência Bônus & Nascido para a Sela", 
          tipoAcao: "passiva",
          desc: "**Passivas:** Ganha proficiência em (Lidar com Animais, História, Intuição, Atuação ou Persuasão) ou aprende 1 idioma. Montar e desmontar custa apenas 5 pés de movimento. Vantagem em saves para não cair da montaria (e se cair menos de 10 pés, cai em pé)." 
        },
        { 
          nome: "Marca Inabalável", 
          tipoAcao: "bonus", // ⚡ Mistura de Gatilho e Ação Bônus
          desc: "**Gatilho (Marcar):** Ao acertar um inimigo corpo-a-corpo, você o Marca até o final do seu próximo turno. Alvos marcados têm Desvantagem para atacar qualquer outra pessoa.\n**Ação Bônus (Retaliação):** Se um alvo marcado der dano em um aliado seu, você ganha Vantagem para atacá-lo no seu próximo turno, podendo fazer esse ataque como uma Ação Bônus. Se acertar, causa Dano Extra = Metade do seu Nível de Guerreiro.\n*(Uso da Ação Bônus: Igual ao seu Modificador de Força por Descanso Longo).* " 
        }
      ],
      7: [
        { 
          nome: "Manobra de Proteção", 
          tipoAcao: "reacao", // 🛡️ Reação Defensiva
          desc: "**Reação:** Se você (ou aliado a 5 pés) for atingido por um ataque, empunhando uma arma melee ou escudo, role 1d8 e adicione na CA do alvo. Se mesmo assim o ataque acertar, o alvo tem Resistência ao dano desse ataque.\n*(Uso: Igual ao seu Mod. de Constituição por Descanso Longo).* " 
        }
      ],
      10: [
        { 
          nome: "Segurar a Linha", 
          tipoAcao: "passiva", // Buff na reação passiva
          desc: "Inimigos geram Ataques de Oportunidade se moverem 5 pés ou mais DENTRO do seu alcance. Se você acertar um Ataque de Oportunidade, o deslocamento do inimigo é reduzido a 0 pelo resto do turno." 
        }
      ],
      15: [
        { 
          nome: "Investida Feroz", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** 1 vez por turno, se você se mover pelo menos 10 pés (3m) em linha reta antes de atacar e acertar o alvo.\n**Efeito:** O alvo deve fazer um Save de FOR (CD 8 + FOR + Proficiência) ou cairá Caído (Prone)." 
        }
      ],
      18: [
        { 
          nome: "Defensor Vigilante", 
          tipoAcao: "passiva", // Economia de ação absurda
          desc: "Em combate, você ganha uma Reação Especial em CADA turno de outras criaturas (exceto o seu). Você só pode usar essa reação especial para realizar Ataques de Oportunidade (não comba com sua Reação normal)." 
        }
      ]
    }
  },

  "Cavaleiro Eco (Echo Knight - Legado)": {
    features: {
      3: [
        { 
          nome: "Manifestar Eco", 
          tipoAcao: "bonus", // ⚡ Ação Bônus principal
          desc: "**Ação Bônus:** Você invoca uma imagem cinzenta sua a até 15 pés (CA= 14+Prof, 1 PV, Imune a condições). Movê-lo 30 pés não custa ação (se afastar mais de 30 pés de você, é destruído).\n- **Troca (Ação Bônus):** Teleporte trocando de lugar com o eco (custa 15 pés de movimento).\n- **Ataque (Passiva):** Ao usar a Ação de Ataque, o ataque pode originar de você OU do eco.\n- **Oportunidade (Reação):** Se um inimigo se afastar do eco, você pode atacar como se estivesse lá." 
        },
        { 
          nome: "Liberar Encarnação", 
          tipoAcao: "livre", // 💨 Combina com o Ataque
          desc: "**Gatilho:** Quando você usar a Ação de Ataque no seu turno.\n**Efeito:** Você pode fazer 1 ataque corpo-a-corpo adicional originando da posição do seu Eco.\n*(Usos: Igual ao seu Modificador de Constituição por Descanso Longo).* " 
        }
      ],
      7: [
        { 
          nome: "Avatar do Eco", 
          tipoAcao: "acao", // ⚔️ Ação utilitária
          desc: "**Ação:** Você cede sua consciência ao Eco. Por 10 minutos (enquanto estiver assim, você é Cego/Surdo), você enxerga e ouve pelos sentidos do Eco, que pode se afastar até 1.000 pés de você sem ser destruído." 
        }
      ],
      10: [
        { 
          nome: "Mártir das Sombras", 
          tipoAcao: "reacao", // 🛡️ Reação salvadora
          desc: "**Reação:** Antes de uma rolagem de ataque atingir um aliado, teleporte seu Eco para até 5 pés do aliado. O ataque do inimigo é direcionado ao seu Eco.\n*(Uso: 1 vez por Descanso Curto/Longo).* " 
        }
      ],
      15: [
        { 
          nome: "Recuperar Potencial", 
          tipoAcao: "livre",
          desc: "**Gatilho:** Quando seu Eco for destruído sofrendo dano.\n**Efeito:** Se você não possuir PV Temporários, você ganha 2d6 + Mod. de Constituição em PV Temporários.\n*(Uso: Igual ao seu Modificador de Constituição por Descanso Longo).* " 
        }
      ],
      18: [
        { 
          nome: "Legião de Um", 
          tipoAcao: "bonus",
          desc: "**Ação Bônus:** Agora você pode usar sua habilidade para criar DOIS Ecos ao mesmo tempo (tudo que serve pra 1, serve pro outro).\n**Iniciativa:** Se rolar Iniciativa sem usos de *Liberar Encarnação*, você recupera 1 uso." 
        }
      ]
    }
  },

  "Cavaleiro Rúnico (Rune Knight - Legado)": {
    features: {
      3: [
        { 
          nome: "Entalhador de Runas", 
          tipoAcao: "acao", // ⚔️ Usar as runas pode variar, mas entalhar e ativar são essenciais
          desc: "**Passiva:** Ao fim de um Descanso Longo, você entalha suas Runas Conhecidas em peças do seu equipamento. Aprende 2 Runas (sobe pra 3 no Nv 7, 4 no Nv 10, e 5 no Nv 15).\n**Ativação:** Cada runa concede um Buff Passivo constante. E cada runa pode ser Invocada (ativação) para gerar um efeito poderoso.\n*(Uso: Cada runa pode ser Invocada 1 vez por Descanso Curto/Longo. A CD é 8 + CON + Prof).* " 
        },
        { 
          nome: "Poder do Gigante", 
          tipoAcao: "bonus", // ⚡ Ação Bônus
          desc: "**Ação Bônus:** Por 1 minuto você fica de tamanho Grande (se tiver espaço). Você tem Vantagem em Testes/Saves de Força. Uma vez por turno, um dos seus ataques causará +1d6 de dano extra.\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        }
      ],
      7: [
        { 
          nome: "Escudo Rúnico", 
          tipoAcao: "reacao", // 🛡️ Reação
          desc: "**Reação:** Quando uma criatura a até 60 pés (18m) de você for atingida por um ataque, force o atacante a rerolar o d20 e usar o novo resultado.\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        }
      ],
      10: [
        { 
          nome: "Grande Estatura", 
          tipoAcao: "passiva",
          desc: "Você cresce permanentemente (3d4 polegadas). O dano extra do seu *Poder do Gigante* aumenta para 1d8." 
        }
      ],
      15: [
        { 
          nome: "Mestre das Runas", 
          tipoAcao: "passiva",
          desc: "Cada Runa que você entalha no seu equipamento agora pode ser Invocada **DUAS vezes** por Descanso Curto/Longo, em vez de uma." 
        }
      ],
      18: [
        { 
          nome: "Juggernaut Rúnico", 
          tipoAcao: "passiva",
          desc: "Ao usar *Poder do Gigante*, você pode crescer para o tamanho Enorme, e enquanto for desse tamanho, seu alcance aumenta em +5 pés (1,5m). O dano extra aumenta para 1d10." 
        }
      ]
    }
  },

  "Samurai (Legado)": {
    features: {
      3: [
        { 
          nome: "Proficiência Bônus", 
          tipoAcao: "passiva",
          desc: "Ganha proficiência em (História, Intuição, Atuação ou Persuasão) ou aprende 1 idioma." 
        },
        { 
          nome: "Espírito Lutador", 
          tipoAcao: "bonus", // ⚡ Ação Bônus clássica
          desc: "**Ação Bônus:** Você ganha Vantagem em TODOS os ataques com arma que você realizar neste turno. Você também ganha 5 PV Temporários.\n*(Uso: 3 vezes por Descanso Longo).* ",
          usosMax: 3,
          recuperacao: "Descanso Longo"
        }
      ],
      7: [
        { 
          nome: "Cortesão Elegante", 
          tipoAcao: "passiva",
          desc: "Adiciona seu Modificador de Sabedoria nos seus testes de Persuasão (Carisma). Você também ganha proficiência em Testes de Resistência de Sabedoria." 
        }
      ],
      10: [
        { 
          nome: "Espírito Incansável", 
          tipoAcao: "livre",
          desc: "**Gatilho (Rolar Iniciativa):** Se rolar Iniciativa e não tiver usos de *Espírito Lutador* restantes, recupera 1 uso imediatamente." 
        },
        { 
          // 👇 O sistema vai upar a carta do Nv 3!
          nome: "Espírito Lutador (Upgrade Nv 10)", 
          tipoAcao: "passiva",
          desc: "O número de PV Temporários concedidos aumenta para 10." 
        }
      ],
      15: [
        { 
          nome: "Ataque Rápido", 
          tipoAcao: "livre", // 💨 Combina no ataque
          desc: "**Gatilho:** Ao usar a Ação de Ataque.\n**Efeito:** Se você tiver Vantagem no ataque contra um alvo, pode abdicar da vantagem neste ataque para fazer 1 Ataque com Arma a mais contra ele (limitado a 1 vez por turno)." 
        },
        { 
          nome: "Espírito Lutador (Upgrade Nv 15)", 
          tipoAcao: "passiva",
          desc: "O número de PV Temporários concedidos aumenta para 15." 
        }
      ],
      18: [
        { 
          nome: "Força Antes da Morte", 
          tipoAcao: "reacao", // 🛡️ Reação Suprema
          desc: "**Reação:** Se você tomar dano que o reduziria a 0 PV, você pode adiar a queda para inconsciência e tomar um **Turno Extra Imediato**. Você ainda sofre os efeitos normais de dano estando com 0 PV durante esse turno. Quando o turno extra acabar, se ainda estiver com 0 PV, cai Inconsciente.\n*(Uso: 1 vez por Descanso Longo).* " 
        }
      ]
    }
  },

  // --- LADINO (ROGUE) ---
  
  "Ladrão (Thief)": {
    features: {
      3: [
        { 
          nome: "Mãos Rápidas", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você pode usar sua Ação Bônus concedida pela Ação Astuta para:\n- Fazer um teste de Prestidigitação (Sleight of Hand) para abrir fechaduras/desarmar armadilhas com Ferramentas de Ladrão, ou bater carteiras.\n- Usar a ação *Utilizar um Objeto* (Utilize) ou a ação *Mágica* para usar um Item Mágico que requeira uma ação." 
        },
        { 
          nome: "Trabalho de Segundo Andar", 
          tipoAcao: "passiva", 
          desc: "Você ganha Deslocamento de Escalada igual ao seu deslocamento base. Além disso, você pode usar seu valor de Destreza em vez de Força para determinar a distância dos seus saltos." 
        }
      ],
      9: [
        { 
          nome: "Ataque Furtivo (Upgrade Nv 9: Ataque Silencioso)", 
          tipoAcao: "passiva", 
          desc: "Sua lista de Golpes Astutos (Cunning Strike) ganha uma nova opção:\n- **Ataque Silencioso (-1d6):** Se você possuir a condição Invisível provinda da ação de Esconder-se, este ataque não encerra a sua invisibilidade contanto que você termine o seu turno atrás de Três-Quartos de Cobertura ou Cobertura Total." 
        }
      ],
      13: [
        { 
          nome: "Usar Dispositivo Mágico", 
          tipoAcao: "passiva", 
          desc: "**Sintonia:** Pode sintonizar até 4 itens mágicos simultaneamente.\n**Cargas:** Sempre que gastar uma carga de um item mágico, role 1d6. Se cair 6, a carga não é gasta.\n**Pergaminhos:** Você pode usar qualquer Pergaminho de Magia (usa Inteligência). Truques e magias de Nv 1 funcionam direto; níveis maiores exigem teste de Arcanismo (CD 10 + Nível da Magia) para não destruir o pergaminho." 
        }
      ],
      17: [
        { 
          nome: "Reflexos de Ladrão", 
          tipoAcao: "passiva", 
          desc: "Você age com uma velocidade sobrenatural ao montar emboscadas. Você pode realizar **DOIS TURNOS** durante a primeira rodada de qualquer combate: O primeiro na sua Iniciativa normal, e o segundo na sua Iniciativa - 10." 
        }
      ]
    }
  },

  "Assassino (Assassin)": {
    features: {
      3: [
        { 
          nome: "Assassinato", 
          tipoAcao: "passiva", 
          desc: "Você tem Vantagem em testes de Iniciativa.\n**Golpes Surpresa:** Na primeira rodada de cada combate, você tem Vantagem nas jogadas de ataque contra qualquer criatura que ainda não tenha agido. Se o seu Ataque Furtivo atingir qualquer alvo nessa rodada, o alvo sofre dano extra (do tipo da arma) igual ao seu Nível de Ladino." 
        },
        { 
          nome: "Ferramentas de Assassino", 
          tipoAcao: "passiva", 
          desc: "Você ganha um Kit de Disfarce e um Kit de Envenenador, e possui proficiência com ambos." 
        }
      ],
      9: [
        { 
          nome: "Especialista em Infiltração", 
          tipoAcao: "passiva", 
          desc: "**Mimetismo:** Você pode imitar perfeitamente a voz e caligrafia de alguém se estudá-la por 1 hora.\n**Mira Móvel:** O uso da sua habilidade *Mira Firme* (Steady Aim) não reduz mais o seu deslocamento para 0." 
        }
      ],
      13: [
        { 
          nome: "Armas Envenenadas", 
          tipoAcao: "passiva", 
          desc: "Quando você usa a opção Veneno (Poison) dos seus Golpes Astutos (Cunning Strike), se o alvo falhar no Save de CON, ele sofre 2d6 de Dano de Veneno extra imediatamente. Esse dano extra ignora Resistência a veneno." 
        }
      ],
      17: [
        { 
          nome: "Ataque Mortal", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você acertar o seu Ataque Furtivo durante a PRIMEIRA rodada de um combate.\n**Efeito:** O alvo deve ser bem-sucedido em um Save de Constituição (CD 8 + DES + Proficiência). Falha: Todo o dano daquele ataque é **DOBRADO** contra o alvo." 
        }
      ]
    }
  },

  "Trapaceiro Arcano (Arcane Trickster)": {
    magiasBonus: {
      truques: [{ nome: "Mãos Mágicas" }] // Formato para o Lava-Jato de Magias!
    },
    features: {
      3: [
        { 
          nome: "Conjuração (Trapaceiro Arcano)", 
          tipoAcao: "acao", 
          desc: "Você aprende magias da lista do Mago. Inteligência é o seu atributo de conjuração. Você começa conhecendo o truque *Mãos Mágicas* e mais dois outros. Você também possui slots de magia baseados no seu nível (Use a aba Grimório para selecionar magias de Ilusão e Encantamento)." 
        },
        { 
          nome: "Mãos Mágicas Ladinas", 
          tipoAcao: "bonus", 
          desc: "Quando você conjura *Mãos Mágicas* (Mage Hand), você pode fazê-la Invisível. Você pode controlar a mão usando uma Ação Bônus, e através dela, pode realizar testes de Prestidigitação (bater carteiras, abrir trancas, desarmar armadilhas) à distância." 
        }
      ],
      9: [
        { 
          nome: "Emboscada Mágica", 
          tipoAcao: "passiva", 
          desc: "Se você possuir a condição Invisível (escondido) no momento em que conjurar uma magia contra uma criatura, a criatura sofre Desvantagem em qualquer Teste de Resistência que ela fizer contra a sua magia naquele turno." 
        }
      ],
      13: [
        { 
          nome: "Trapaceiro Versátil", 
          tipoAcao: "passiva", 
          desc: "Sua Mãos Mágicas pode causar distrações. Quando você for usar a opção Derrubar (Trip) do seu Golpe Astuto contra uma criatura, você pode aplicar o efeito do Derrubar em UMA OUTRA criatura simultaneamente, desde que essa segunda criatura esteja a até 5 pés da sua mão espectral." 
        }
      ],
      17: [
        { 
          nome: "Ladrão de Magia", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Imediatamente após uma criatura conjurar uma magia que tenha você como alvo ou na área de efeito, você força a criatura a um Save de INT (CD da sua magia). Falha: O efeito da magia é negado em você, e se a magia for de um nível que você consiga conjurar, você rouba o conhecimento dela. Por 8 horas, você tem essa magia preparada e o alvo esquece como conjurá-la.\n*(Uso: 1 vez por Descanso Longo).* " 
        }
      ]
    }
  },

  "Lâmina da Alma (Soulknife)": {
    features: {
      3: [
        { 
          nome: "Poder Psiônico", 
          tipoAcao: "passiva", 
          desc: "Você possui Dados Psiônicos (d6). Você recupera 1 no Descanso Curto e todos no Longo.\n- **Habilidade Fortalecida:** Ao falhar num teste de perícia/ferramenta, role 1 Dado e some ao resultado. O dado SÓ é gasto se isso transformar a falha em sucesso.\n- **Sussurros:** Como ação mágica, ligue telepaticamente você e um número de criaturas = sua Proficiência. Role 1 Dado; a conexão dura horas iguais ao resultado (Alcance de 1 milha).", 
          usosMax: 4, 
          recuperacao: "Descanso Longo" 
        },
        { 
          nome: "Lâminas Psíquicas", 
          tipoAcao: "passiva", 
          desc: "Ao usar a Ação de Ataque ou Oportunidade, você manifesta uma lâmina psíquica na mão livre (Acuidade/Arremesso 60-120ft / Maestria: Vex). Ela causa 1d6 + DES de dano Psíquico e desaparece ao acertar ou errar (sem deixar marcas).\n**Ação Bônus:** Após atacar com ela, você pode manifestar uma segunda lâmina para fazer um ataque adicional como Ação Bônus (Dano: 1d4 + DES Psíquico)." 
        }
      ],
      9: [
        { 
          nome: "Lâminas da Alma", 
          tipoAcao: "livre", 
          desc: "- **Golpes Teleguiados:** Ao errar um ataque com a lâmina, você pode rolar 1 Dado Psiônico e somar ao ataque. O dado só é gasto se acertar.\n- **Teleporte (Ação Bônus):** Gaste 1 Dado Psiônico e o arremesse. Você se teleporta para o local onde a lâmina cair (Distância: O valor rolado no dado x 10 em pés)." 
        }
      ],
      13: [
        { 
          nome: "Véu Psíquico", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Você fica Invisível por 1 hora. A invisibilidade termina imediatamente se você causar dano a alguém ou forçar uma criatura a um Teste de Resistência.\n*(Uso: 1x grátis por Descanso Longo. Você pode usar de novo gastando 1 Dado Psiônico).* " 
        }
      ],
      17: [
        { 
          nome: "Rasgar Mente", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você usar suas Lâminas Psíquicas para causar dano de Ataque Furtivo.\n**Efeito:** O alvo faz um Save de SAB (CD 8 + DES + Proficiência). Falha: Fica Atordoado (Stunned) por 1 minuto. Ele pode repetir o save no final de cada turno dele para se curar.\n*(Uso: 1x grátis por Descanso Longo. Pode usar de novo gastando 3 Dados Psiônicos).* " 
        }
      ]
    }
  },

  "Herdeiro dos Três (Scion of the Three)": {
    // 👇 O SEGREDO DO VTT PRA RENDERIZAR O MENU DE ESCOLHA DOS DEUSES 👇
    escolhasNivel3: [
      {
        titulo: "Lealdade Sombria (Deus Patrono)",
        tipo: "talento", // Vai funcionar perfeitamente com o nosso getOpcoesParaEscolha blindado
        opcoes: [
          { nome: "Bane (Tirano)", desc: "Você ganha Resistência a Dano Psíquico e aprende o truque Ilusão Menor (Minor Illusion)." },
          { nome: "Bhaal (Assassino)", desc: "Você ganha Resistência a Dano de Veneno e aprende o truque Proteção contra Lâminas (Blade Ward)." },
          { nome: "Myrkul (Morte)", desc: "Você ganha Resistência a Dano Necrótico e aprende o truque Toque Arrepiante (Chill Touch)." }
        ]
      }
    ],
    features: {
      3: [
        { 
          nome: "Sede de Sangue", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando um inimigo a até 30 pés tomar dano e ficar Sangrando (Bloodied / Metade da Vida) mas não morrer, você pode se teleportar para até 5 pés dele e fazer um ataque corpo-a-corpo gratuito.\n*(Uso: Igual ao seu Modificador de Inteligência por Descanso Longo).* "
        },
        { 
          nome: "Lealdade Sombria", 
          tipoAcao: "passiva", 
          desc: "Sua escolha de patrono divino lhe concede uma Resistência e um Truque (Inteligência é seu atributo conjurador). Pode ser trocado no Descanso Longo." 
        }
      ],
      9: [
        { 
          nome: "Golpe do Medo", 
          tipoAcao: "passiva", 
          desc: "Você ganha uma nova opção de Golpe Astuto (Cunning Strike):\n- **Aterrorizar (-1d6):** O alvo deve passar em um Save de SAB ou fica Amedrontado (Frightened) por 1 minuto. Enquanto estiver amedrontado, você tem Vantagem para atacá-lo." 
        }
      ],
      13: [
        { 
          nome: "Aura de Malevolência", 
          tipoAcao: "passiva", 
          desc: "Quando você usar sua Reação de *Sede de Sangue* para teleportar, toda criatura à sua escolha que estiver a até 10 pés da sua origem OU do seu destino sofre dano igual ao seu Modificador de Inteligência. O dano é do mesmo tipo da Resistência do seu deus patrono e ignora resistências." 
        }
      ],
      17: [
        { 
          nome: "Encarnação do Pavor", 
          tipoAcao: "passiva", 
          desc: "**Corte na Garganta:** Você recupera 1 uso de *Sede de Sangue* em um Descanso Curto.\n**Intenção Assassina:** Toda vez que rolar os dados do seu Ataque Furtivo, você trata qualquer número 1 ou 2 nos dados como se fossem um 3." 
        }
      ]
    }
  },

  "Investigativo (Inquisitive)": {
    features: {
      3: [
        { 
          nome: "Ouvido para Mentiras", 
          tipoAcao: "passiva", 
          desc: "Sempre que fizer um teste de Sabedoria (Intuição) para determinar se uma criatura está mentindo, trate qualquer rolagem de 7 ou menos no d20 como um 8." 
        },
        { 
          nome: "Olho para Detalhes", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você pode fazer um teste de Sabedoria (Percepção) para notar uma criatura/objeto escondido ou um teste de Inteligência (Investigação) para decifrar pistas." 
        },
        { 
          nome: "Combate Intuitivo", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você faz um teste de Intuição contra a Enganação do alvo. Se passar, você pode usar o seu Ataque Furtivo (Sneak Attack) contra ele por 1 minuto mesmo sem ter Vantagem (desde que não tenha Desvantagem)." 
        }
      ],
      9: [
        { 
          nome: "Olho Atento", 
          tipoAcao: "passiva", 
          desc: "Você tem Vantagem em qualquer teste de Sabedoria (Percepção) ou Inteligência (Investigação) contanto que se mova, no máximo, metade do seu deslocamento no mesmo turno." 
        }
      ],
      13: [
        { 
          nome: "Olho Infalível", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você detecta a presença de ilusões, metamorfos disfarçados e magias de enganação a até 30 pés de você. Você sente que está sendo enganado, mas não descobre a verdadeira forma do que está escondido.\n*(Uso: Igual ao seu Modificador de Sabedoria por Descanso Longo).* " 
        }
      ],
      17: [
        { 
          nome: "Olho para Fraqueza", 
          tipoAcao: "passiva", 
          desc: "Enquanto um alvo estiver sob o efeito do seu *Combate Intuitivo*, o seu dano de Ataque Furtivo (Sneak Attack) contra essa criatura aumenta em +3d6." 
        }
      ]
    }
  },

  "Mentor (Mastermind)": {
    features: {
      3: [
        { 
          nome: "Mestre da Intriga", 
          tipoAcao: "passiva", 
          desc: "**Proficiências:** Kit de Disfarce, Kit de Falsificação e 1 Jogo à sua escolha. Você também aprende 2 idiomas.\n**Mimetismo:** Você pode imitar perfeitamente o sotaque e o padrão de fala de alguém se ouvi-lo falar por 1 minuto, passando-se por nativo da terra dele." 
        },
        { 
          nome: "Mestre Tático", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você pode usar a Ação de *Ajuda* (Help) como uma Ação Bônus. Além disso, se for usar a Ajuda para auxiliar um aliado a atacar, você pode ajudar à distância (até 30 pés), desde que o aliado possa te ouvir e ver." 
        }
      ],
      9: [
        { 
          nome: "Manipulador Perspicaz", 
          tipoAcao: "passiva", 
          desc: "Se você observar/interagir com uma criatura por 1 minuto fora de combate, o Mestre deve revelar se ela é superior, inferior ou igual a você em 2 destas opções: INT, SAB, CAR ou Nível de Classe." 
        }
      ],
      13: [
        { 
          nome: "Desorientação", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se você for alvo de um ataque enquanto uma criatura estiver a até 5 pés de você lhe concedendo cobertura, você redireciona o ataque, fazendo o inimigo atacar essa criatura que te protege." 
        }
      ],
      17: [
        { 
          nome: "Alma do Engano", 
          tipoAcao: "passiva", 
          desc: "Você se torna imune a telepatia e a qualquer magia que force você a dizer a verdade ou detecte mentiras. Se quiser, você pode apresentar falsos pensamentos a um leitor de mentes rolando Enganação vs Intuição do inimigo." 
        }
      ]
    }
  },

  "Fantasma (Phantom)": {
    features: {
      3: [
        { 
          nome: "Lamentos do Túmulo", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Imediatamente após causar dano de Ataque Furtivo.\n**Efeito:** Você alveja uma SEGUNDA criatura a até 30 pés do alvo original. Role metade dos seus dados de Ataque Furtivo (arredondado para cima). A segunda criatura sofre esse valor em Dano Necrótico automático (lamentos dos mortos).\n*(Uso: Igual ao Mod. de Destreza por Descanso Longo).* " 
        },
        { 
          nome: "Sussurros dos Mortos", 
          tipoAcao: "passiva", 
          desc: "Ao final de cada Descanso Curto ou Longo, os espíritos compartilham conhecimento com você. Escolha uma Perícia ou Ferramenta qualquer que você não possua; você ganha proficiência nela até que use esse recurso novamente." 
        }
      ],
      9: [
        { 
          nome: "Tokens dos Partidos", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se alguém morrer a 30 pés, arranque um pedaço da alma formando um Trinket (Máx. 2 simultâneos).\n- **Essência:** Segurar 1 trinket te dá Vantagem em Saves de CON e nos Saves de Morte.\n- **Toque Final:** Ao causar Sneak Attack, você pode quebrar 1 trinket para usar o *Lamentos do Túmulo* sem gastar seu limite diário.\n- **Interrogatório (Ação):** Quebre 1 trinket para conjurar *Augúrio*. Se conhecia a criatura morta, pode fazer 1 pergunta aberta ao espírito dela em vez da magia normal." 
        },
        { 
          nome: "Voz da Morte", 
          tipoAcao: "acao", 
          desc: "Você pode conjurar a magia *Falar com os Mortos* 1 vez sem gastar magia (recupera em Descanso Curto/Longo). Você pode focar o alvo da magia em um dos seus Trinkets, para falar com a alma que está presa ali em vez de um cadáver físico." 
        }
      ],
      13: [
        { 
          nome: "Caminhar Fantasma", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você vira espectro por 10 minutos. Você ganha Deslocamento de Voo 10ft (podendo pairar), Ataques contra você têm Desvantagem, e você pode atravessar objetos e criaturas como terreno difícil (sofre 1d10 Energia se terminar o turno dentro deles).\n*(Uso: 1x grátis por Descanso Longo. Você pode usar de novo se destruir 1 Trinket).* " 
        }
      ],
      17: [
        { 
          nome: "Amigo da Morte", 
          tipoAcao: "passiva", 
          desc: "O seu *Lamentos do Túmulo* agora atinge os DOIS alvos: Tanto o alvo primário (do seu Sneak Attack) quanto o secundário tomam o dano necrótico extra.\nAlém disso, se rolar Iniciativa sem ter nenhum Trinket, você ganha 1 Trinket automaticamente." 
        }
      ]
    }
  },

  "Batedor (Scout)": {
    features: {
      3: [
        { 
          nome: "Escaramuçador", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se um inimigo terminar o turno dele a até 5 pés de você, você pode se mover até metade do seu deslocamento imediatamente. Esse movimento NÃO gera Ataques de Oportunidade." 
        },
        { 
          nome: "Sobrevivencialista", 
          tipoAcao: "passiva", 
          desc: "Você ganha proficiência nas perícias Natureza e Sobrevivência. Você automaticamente aplica *Especialização* (Expertise) a elas, dobrando seu bônus de proficiência." 
        }
      ],
      9: [
        { 
          nome: "Mobilidade Superior", 
          tipoAcao: "passiva", 
          desc: "Seu deslocamento de caminhada aumenta em +10 pés (+3m). Se tiver deslocamento de escalada ou natação, eles também aumentam em +10 pés." 
        }
      ],
      13: [
        { 
          nome: "Mestre de Emboscada", 
          tipoAcao: "passiva", 
          desc: "Você tem Vantagem nas rolagens de Iniciativa. Além disso, no 1º turno do combate, a primeira criatura que você atingir fica marcada: Você e todos os seus aliados terão Vantagem nos ataques contra ela até o início do seu próximo turno." 
        }
      ],
      17: [
        { 
          nome: "Ataque Repentino", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Se você usar a Ação de Ataque no seu turno, pode fazer +1 ataque como Ação Bônus.\nVocê **PODE** aplicar seu Ataque Furtivo (Sneak Attack) nesse segundo ataque, mesmo que já o tenha usado no primeiro, **desde que o alvo seja diferente**." 
        }
      ]
    }
  },

  "Espadachim (Swashbuckler)": {
    features: {
      3: [
        { 
          nome: "Jogo de Pés (Fancy Footwork)", 
          tipoAcao: "passiva", 
          desc: "Sempre que você fizer um ataque corpo-a-corpo contra uma criatura, você a impede de fazer Ataques de Oportunidade contra você até o final deste turno (mesmo se você errar o ataque)." 
        },
        { 
          nome: "Audácia Astuta", 
          tipoAcao: "passiva", 
          desc: "Você adiciona o seu Modificador de Carisma nas suas rolagens de Iniciativa.\n**Sneak Attack x1:** Você pode aplicar o Ataque Furtivo mesmo sem Vantagem e sem aliados por perto, contanto que: O alvo esteja a até 5 pés de você, NÃO haja nenhuma outra criatura a 5 pés de você, e você não tenha Desvantagem." 
        }
      ],
      9: [
        { 
          nome: "Charme (Panache)", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você faz um teste de Persuasão contra a Intuição de um alvo que entenda o seu idioma (1 min de duração).\n- **Inimigo:** Sofre Desvantagem em ataques contra qualquer um que não seja você, e não pode dar Ataque de Oportunidade em aliados.\n- **Neutro:** Fica *Enfeitiçado* (Charmed) por você, te tratando como um velho amigo." 
        }
      ],
      13: [
        { 
          nome: "Manobra Elegante", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você ganha Vantagem no próximo teste de Acrobacia ou Atletismo que você fizer durante este turno." 
        }
      ],
      17: [
        { 
          nome: "Duelista Mestre", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Se você errar uma rolagem de ataque.\n**Efeito:** Você pode rolar o d20 novamente, agora com Vantagem.\n*(Uso: 1 vez por Descanso Curto ou Longo).* ", 
          usosMax: 1, 
          recuperacao: "Descanso Curto" 
        }
      ]
    }
  },

  // --- MAGO (WIZARD) ---

  "Abjurador (Abjurer)": {
    features: {
      3: [
        { 
          nome: "Sábio da Abjuração", 
          tipoAcao: "passiva", 
          desc: "Sempre que você ganhar acesso a um novo nível de Magia de Mago, você pode adicionar uma magia de Abjuração de graça no seu Grimório." 
        },
        { 
          nome: "Proteção Arcana (Arcane Ward)", 
          tipoAcao: "passiva", 
          desc: "**Gatilho:** Ao conjurar uma magia de Abjuração gastando Slot (Ou gastando a magia de uso gratuito de nível 1).\n**Escudo Mágico:** Você cria um escudo passivo com PV igual a (2x seu Nível de Mago + Mod. INT). Esse escudo sofre qualquer dano ANTES de você (se você tiver resistência, o escudo sofre o dano reduzido). Ele dura até o Descanso Longo.\n**Recarga:** Conjurar outra magia de Abjuração recarrega os PV do escudo em 2x o nível da magia (Ou você pode gastar uma Ação Bônus e queimar um slot para recarregá-lo sem conjurar nada).\n*(Criar escudo do zero: 1x por Descanso Longo).* ", 
          usosMax: 1, 
          recuperacao: "Descanso Longo" 
        }
      ],
      6: [
        { 
          nome: "Proteção Projetada", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a até 30 pés sofrer dano, você projeta a sua *Proteção Arcana* sobre ela. O seu escudo absorve o dano em vez da criatura." 
        }
      ],
      10: [
        { 
          nome: "Quebrador de Magias", 
          tipoAcao: "passiva", 
          desc: "Você sempre tem *Contramágica* e *Dissipar Magia* preparadas. Você pode conjurar *Dissipar Magia* como uma Ação Bônus e adiciona seu Bônus de Proficiência no teste de habilidade para dissipar magias.\nSe qualquer uma das duas magias falhar em parar/dissipar a magia do alvo, você não gasta o seu Slot de Magia." 
        }
      ],
      14: [
        { 
          nome: "Resistência a Magia", 
          tipoAcao: "passiva", 
          desc: "Você tem Vantagem em Testes de Resistência contra magias e possui Resistência passiva a QUALQUER dano causado por magias." 
        }
      ]
    }
  },

  "Lâmina Cantante (Bladesinger)": {
    features: {
      3: [
        { 
          nome: "Treinamento de Guerra e Canção", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência com todas as armas Corpo a Corpo Marciais (que não tenham 2 Mãos). Você pode usar essa arma como o Foco Arcano de suas magias. Além disso, ganha proficiência em Acrobacia, Atletismo, Atuação ou Persuasão." 
        },
        { 
          nome: "Canção da Lâmina (Bladesong)", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Se não estiver usando armadura, inicie a Canção por 1 minuto:\n- **Agilidade:** Soma o Mod. INT na Classe de Armadura. Ganha +10 pés de deslocamento. Tem Vantagem em Acrobacia.\n- **Foco:** Soma o Mod. INT nos Saves de Constituição para manter Concentração.\n- **Trabalho de Lâmina:** Usa o Mod. INT (em vez de FOR/DES) para ataque e dano com a arma corpo a corpo.\n*(A canção acaba se você usar 2 mãos na arma ou usar escudo/armadura).* \n*(Usos: Igual ao Mod. INT por Descanso Longo. O Arcane Recovery recupera 1 uso).* ", 
          recuperacao: "Descanso Longo" 
        }
      ],
      6: [
        { 
          nome: "Ataque Extra (Cantante)", 
          tipoAcao: "passiva", 
          desc: "Você pode atacar DUAS vezes na sua Ação de Ataque. Além disso, você pode trocar um desses ataques pela conjuração de um Truque de Mago que custe 1 Ação (Ex: Lâmina Estrondosa, Toque Chocante)." 
        }
      ],
      10: [
        { 
          nome: "Canção de Defesa", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Ao sofrer dano enquanto a *Canção da Lâmina* estiver ativa, você pode queimar 1 Slot de Magia para reduzir o dano sofrido em uma quantidade igual a (5 x Nível do Slot gasto)." 
        }
      ],
      14: [
        { 
          nome: "Canção da Vitória", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Imediatamente APÓS você conjurar uma magia gastando uma Ação, você pode fazer um ataque corpo a corpo com a sua arma." 
        }
      ]
    }
  },

  "Adivinho (Diviner)": {
    features: {
      3: [
        { 
          nome: "Sábio da Adivinhação", 
          tipoAcao: "passiva", 
          desc: "Sempre que você ganhar acesso a um novo nível de Magia de Mago, você pode adicionar uma magia de Adivinhação de graça no seu Grimório." 
        },
        { 
          nome: "Augúrio (Portent)", 
          tipoAcao: "livre", 
          desc: "**Visão do Futuro:** Após um Descanso Longo, você rola e anota o resultado de DOIS D20s. Durante o dia, ANTES de qualquer criatura (você, aliado ou inimigo) que você consiga ver fazer uma rolagem de d20, você pode obrigá-la a usar um dos valores que você anotou (gastando aquele dado). Você perde os dados se não usar até o próximo descanso longo." 
        }
      ],
      6: [
        { 
          nome: "Adivinhação Especialista", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Sempre que você conjurar uma magia de Adivinhação usando um slot de Nível 2 ou superior.\n**Efeito:** Você imediatamente recupera 1 Slot de Magia gasto de um nível INFERIOR (até Nível 5) ao que você acabou de usar." 
        }
      ],
      10: [
        { 
          nome: "O Terceiro Olho", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você ganha um dos seguintes sentidos até o fim de um Descanso (Curto/Longo):\n- Visão no Escuro de 120 pés.\n- Pode ler qualquer idioma.\n- Conjura *Ver o Invisível* (See Invisibility) de graça (Sem slot).\n*(Uso: 1x por Descanso).* ", 
          usosMax: 1, 
          recuperacao: "Descanso" 
        }
      ],
      14: [
        { 
          nome: "Augúrio Maior", 
          tipoAcao: "passiva", 
          desc: "Você agora rola e anota TRÊS D20s para a sua habilidade de *Augúrio* (Portent) no Descanso Longo, tendo ainda mais controle sobre o destino da batalha." 
        }
      ]
    }
  },

  "Evocador (Evoker)": {
    features: {
      3: [
        { 
          nome: "Sábio da Evocação", 
          tipoAcao: "passiva", 
          desc: "Sempre que você ganhar acesso a um novo nível de Magia de Mago, você pode adicionar uma magia de Evocação de graça no seu Grimório." 
        },
        { 
          nome: "Truque Potente", 
          tipoAcao: "passiva", 
          desc: "Seus feitiços cantrip que causam dano são implacáveis. Se um inimigo passar no Teste de Resistência do seu truque, ou se você errar a jogada de ataque dele, o inimigo toma METADE do dano (mas ignora efeitos adicionais do truque)." 
        }
      ],
      6: [
        { 
          nome: "Esculpir Magias", 
          tipoAcao: "livre", 
          desc: "Ao conjurar magias em área de Evocação (ex: Bola de Fogo), você escolhe criaturas (até 1 + Nível da magia). Elas passam no Save automaticamente e tomam ZERO de dano, permitindo que você jogue bombas na cabeça do seu guerreiro de linha de frente em segurança." 
        }
      ],
      10: [
        { 
          nome: "Evocação Empoderada", 
          tipoAcao: "passiva", 
          desc: "Sempre que conjurar uma magia de Evocação (qualquer que seja), você adiciona o seu Modificador de Inteligência a UMA rolagem de dano da magia (podendo aumentar bastante o dano em magias de múltiplos acertos como Mísseis Mágicos)." 
        }
      ],
      14: [
        { 
          nome: "Sobrecarga (Overchannel)", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao conjurar uma magia que cause dano de Nível 1 a 5.\n**Efeito:** Você MAXIMIZA todos os dados de dano da magia. A primeira vez no dia é de graça. Se usar novamente antes de um Descanso Longo, você sofre 2d12 de Dano Necrótico (que não pode ser resistido) para cada nível do slot da magia usada. Esse dano auto-infligido aumenta +1d12 nas conjurações seguintes." 
        }
      ]
    }
  },

  "Ilusionista (Illusionist)": {
    magiasBonus: {
      truques: ["Ilusão Menor"]
    },
    features: {
      3: [
        { 
          nome: "Sábio da Ilusão", 
          tipoAcao: "passiva", 
          desc: "Sempre que você ganhar acesso a um novo nível de Magia de Mago, você pode adicionar uma magia de Ilusão de graça no seu Grimório." 
        },
        { 
          nome: "Ilusões Aprimoradas", 
          tipoAcao: "passiva", 
          desc: "Você conjura magias de Ilusão de forma extremamente furtiva (Ignora componentes Verbais), e todas com alcance de 10 pés ou mais ganham +60 pés no alcance.\nSeu truque de *Ilusão Menor* agora custa apenas uma Ação Bônus e você cria tanto o som quanto a imagem juntos de uma vez." 
        }
      ],
      6: [
        { 
          nome: "Criaturas Fantasmagóricas", 
          tipoAcao: "acao", 
          desc: "Você sempre tem *Invocar Fada* e *Invocar Besta* preparadas. Quando as conjura, elas viram da escola Ilusão (sendo espectrais). Você pode conjurá-las 1 vez de graça sem slot (Ao fazer isso, os PV da criatura caem pela metade). *(Uso gratuito recarrega no Descanso Longo).* ", 
          usosMax: 1, 
          recuperacao: "Descanso Longo" 
        }
      ],
      10: [
        { 
          nome: "Eu Ilusório", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando for atingido por um ataque, você manifesta um clone instintivo e faz com que o ataque erre automaticamente, destruindo a ilusão no processo.\n*(Uso: 1x por Descanso Curto ou Longo, mas você pode usar de novo queimando 1 slot de nível 2 ou superior).* ", 
          usosMax: 1, 
          recuperacao: "Descanso Curto" 
        }
      ],
      14: [
        { 
          nome: "Realidade Ilusória", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Enquanto mantiver uma ilusão (com slot) ativa, você escolhe 1 objeto não-mágico inanimado da ilusão e o torna FÍSICO E REAL por 1 minuto (O objeto nunca pode causar dano nem causar condições em oponentes). Ex: Criar uma ponte ilusória sobre um buraco e solidificá-la para atravessar." 
        }
      ]
    }
  },

  "Cronurgista (Chronurgy)": {
    features: {
      3: [ // Habilidades movidas do Nv 2 para o Nv 3
        { 
          nome: "Consciência Temporal", 
          tipoAcao: "passiva", 
          desc: "Você adiciona o seu Modificador de Inteligência às suas rolagens de Iniciativa." 
        },
        { 
          nome: "Deslocamento Cronal", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Após você (ou uma criatura a 30 pés) rolar um ataque, teste ou save, você pode forçar a criatura a rerolar o dado. A criatura é obrigada a usar o segundo resultado.\n*(Uso: 2 vezes por Descanso Longo).* ", 
          usosMax: 2, 
          recuperacao: "Descanso Longo" 
        }
      ],
      6: [
        { 
          nome: "Estase Momentânea", 
          tipoAcao: "acao", 
          desc: "**Ação:** Force uma criatura Grande ou menor a 60 pés a fazer um Save de CON. Falha: Ela fica presa no tempo (Incapacitada e Deslocamento 0) até o final do seu próximo turno ou até sofrer dano.\n*(Usos: Igual ao Mod. de INT por Descanso Longo).* ",
          recuperacao: "Descanso Longo" 
        }
      ],
      10: [
        { 
          nome: "Abeyance Arcano", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao conjurar uma magia de Nv 4 ou menor.\n**Efeito:** Você congela a magia numa conta (bead) minúscula por 1 hora. Qualquer criatura segurando a conta pode usar a Ação dela para liberar a magia (usando o seu bônus de ataque e CD). Se a conta for destruída ou o tempo passar, a magia é perdida.\n*(Uso: 1x por Descanso Curto/Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      14: [
        { 
          nome: "Futuro Convergente", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 60 pés for rolar um dado, você ignora a rolagem e decide se o resultado é o mínimo necessário para passar ou exatamente 1 a menos que o necessário (garantindo o acerto ou a falha). Ao fazer isso, você sofre 1 nível de Exaustão (que só sai com Descanso Longo)." 
        }
      ]
    }
  },

  "Graviturgista (Graviturgy)": {
    features: {
      3: [ // Habilidades movidas do Nv 2 para o Nv 3
        { 
          nome: "Ajustar Densidade", 
          tipoAcao: "acao", 
          desc: "**Ação:** Altere o peso de uma criatura/objeto Grande ou menor a 30 pés por 1 min (Exige Concentração).\n- **Metade do Peso:** +10ft Speed, pula o dobro, Desvantagem em testes/saves de Força.\n- **Dobro do Peso:** -10ft Speed, Vantagem em testes/saves de Força." 
        }
      ],
      6: [
        { 
          nome: "Poço Gravitacional", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Sempre que você conjurar uma magia num alvo (seja aliado voluntário, ou inimigo que tomou ataque/falhou no save).\n**Efeito:** Você pode mover o alvo 5 pés para um espaço vazio." 
        }
      ],
      10: [
        { 
          nome: "Atração Violenta", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando um aliado a 60 pés acertar um ataque com arma, aumente o dano em 1d10. OU, se alguém a 60 pés tomar dano de queda, aumente o dano da queda em 2d10.\n*(Usos: Igual ao Mod. de INT por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Horizonte de Eventos", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você emite uma aura gravitacional de 30 pés por 1 min (Exige Concentração). Inimigos que comecem o turno na aura fazem Save de FOR. Falha: 2d10 de Energia e Speed 0. Sucesso: Metade do dano, mas todo movimento custa o dobro.\n*(Uso: 1x por Descanso Longo, ou gastando slot de Nv 3+).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Necromante (Necromancy)": {
    magiasBonus: {
      nivel3: ["Animar os Mortos"]
    },
    features: {
      3: [
        { 
          nome: "Sábio da Necromancia", 
          tipoAcao: "passiva", 
          desc: "O ouro e o tempo para copiar magias de Necromancia para o grimório são reduzidos pela metade." 
        },
        { 
          nome: "Colheita Sombria", 
          tipoAcao: "livre", 
          desc: "**Gatilho (1x/turno):** Quando você mata uma criatura com uma magia de Nível 1 ou maior.\n**Efeito:** Você recupera PV igual a (2x Nível da Magia), ou (3x Nível da Magia) se for de Necromancia. (Não funciona em Construtos ou Mortos-Vivos)." 
        }
      ],
      6: [
        { 
          nome: "Servos Mortos-Vivos", 
          tipoAcao: "passiva", 
          desc: "Ao usar *Animar os Mortos*, você pode criar 1 morto-vivo adicional. As criaturas criadas por suas magias de necromancia ganham PV Máximo extra igual ao seu Nível de Mago e somam seu Bônus de Proficiência ao dano dos ataques deles." 
        }
      ],
      10: [
        { 
          nome: "Habituado à Morte", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência a Dano Necrótico. O seu limite de Pontos de Vida Máximos não pode ser reduzido por nenhum efeito." 
        }
      ],
      14: [
        { 
          nome: "Comandar Mortos-Vivos", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você tenta subjugar um morto-vivo a até 60 pés (Mesmo que criado por outro mago). Ele faz um Save de CAR (Se tiver INT 8+ ele tem Vantagem). Falha: Fica amigável e obedece seus comandos permanentemente.\nSe ele tiver INT 12+, ele pode refazer o Save de hora em hora." 
        }
      ]
    }
  },

  "Transmutador (Transmutation)": {
    features: {
      3: [
        { 
          nome: "Sábio da Transmutação", 
          tipoAcao: "passiva", 
          desc: "O ouro e o tempo para copiar magias de Transmutação para o grimório são reduzidos pela metade." 
        },
        { 
          nome: "Alquimia Menor", 
          tipoAcao: "acao", 
          desc: "Gastando 10 minutos para cada pé cúbico, você pode transmutar madeira, pedra, ferro, cobre ou prata inteiramente em outro desses materiais. Dura 1 hora (Exige Concentração)." 
        }
      ],
      6: [
        { 
          nome: "Pedra do Transmutador", 
          tipoAcao: "passiva", 
          desc: "Você pode gastar 8 horas para criar uma Pedra que garante UM dos buffs passivos a quem estiver segurando:\n- Visão no Escuro de 60 pés.\n- +10 pés de Deslocamento.\n- Proficiência em Saves de Constituição.\n- Resistência a Ácido, Frio, Fogo, Raio ou Trovão.\n(Sempre que conjurar magia de transmutação Nv 1+, você pode trocar o buff da pedra)." 
        }
      ],
      10: [
        { 
          nome: "Metamorfo", 
          tipoAcao: "acao", 
          desc: "Você sempre tem *Metamorfose* (Polymorph) no grimório. Você pode conjurá-la 1x de graça (sem slot) visando apenas você mesmo, para virar uma Besta de CR 1 ou menor.\n*(Uso gratuito recarrega no Descanso Curto/Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      14: [
        { 
          nome: "Transmutador Mestre", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você destrói sua Pedra do Transmutador para gerar um milagre (A pedra só pode ser refeita no Descanso Longo):\n- *Transformação:* Transmuta um objeto grande (5x5ft) em outro objeto do mesmo valor ou menor.\n- *Panaceia:* Remove maldições, doenças e venenos do alvo e o cura completamente.\n- *Restaurar Vida:* Conjura *Reviver os Mortos* (Raise Dead) sem gastar slot ou componentes.\n- *Juventude:* Reduz a idade aparente do alvo em 3d10 anos (Mínimo de 13 anos, não altera expectativa de vida real)." 
        }
      ]
    }
  },

  "Mago de Guerra (War Magic)": {
    features: {
      3: [ // Movido do Nv 2 para o Nv 3
        { 
          nome: "Engenhosidade Tática", 
          tipoAcao: "passiva", 
          desc: "Você adiciona o seu Modificador de Inteligência às suas rolagens de Iniciativa." 
        },
        { 
          nome: "Deflexão Arcana", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Ao ser atingido por um ataque ou falhar num Teste de Resistência (Save), ganha +2 de CA contra aquele ataque ou +4 no Save. Se fizer isso, você não pode conjurar magias que custem Slot até o fim do seu próximo turno (Só Truques)." 
        }
      ],
      6: [
        { 
          nome: "Surto de Poder", 
          tipoAcao: "livre", 
          desc: "Você armazena Surtos (Máximo = Mod INT, mínimo de 1 que recarrega no Descanso Longo). Ao dissipar ou anular uma magia com Dispel/Counterspell com sucesso, você ganha +1 Surto.\n1x por turno, ao causar dano mágico, gaste 1 Surto para causar Dano de Energia extra igual a metade do seu Nível de Mago." 
        }
      ],
      10: [
        { 
          nome: "Magia Durável", 
          tipoAcao: "passiva", 
          desc: "Enquanto estiver Mantendo a Concentração em uma magia, você ganha um bônus passivo de +2 na Classe de Armadura (CA) e +2 em TODOS os Testes de Resistência." 
        }
      ],
      14: [
        { 
          nome: "Manto Defletor", 
          tipoAcao: "passiva", 
          desc: "Sempre que usar a sua Reação *Deflexão Arcana*, você escolhe até 3 criaturas a até 60 pés. Cada uma delas sofre Dano de Energia igual a metade do seu Nível de Mago." 
        }
      ]
    }
  },

  "Ordem dos Escribas (Scribes)": {
    features: {
      3: [ // Movido do Nv 2 para o Nv 3
        { 
          nome: "Pena Mágica", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Cria uma pena mágica que não precisa de tinta. Com ela, copiar magias para o grimório leva apenas 2 minutos por nível da magia. A pena pode apagar qualquer texto que você escrever." 
        },
        { 
          nome: "Grimório Desperto", 
          tipoAcao: "passiva", 
          desc: "O seu grimório é seu Foco Arcano. Ao conjurar magia com slot, você pode trocar temporariamente o tipo de dano da magia pelo tipo de dano de *outra* magia de mesmo nível contida no livro. Você pode conjurar magias de Ritual no tempo de Ação Normal (1x por Long Rest)." 
        }
      ],
      6: [
        { 
          nome: "Mente Manifestada", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Invoca o espírito do livro (fantasma, luz ou livro). Você vê/ouve através dele (Darkvision 60ft). Sempre que você conjurar uma magia, pode dispará-la a partir do espaço da Mente Manifestada.\n*(Disparar magia pela mente: Igual à Proficiência por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      10: [
        { 
          nome: "Mestre Escriba", 
          tipoAcao: "acao", 
          desc: "No final de um Descanso Longo, cria um pergaminho mágico grátis com uma magia de Nível 1 ou 2 do grimório. A magia no pergaminho é castada com 1 nível de poder ACIMA do normal. Gasta 1 Ação para usar. Se não usar, o pergaminho derrete no próximo descanso." 
        }
      ],
      14: [
        { 
          nome: "Um com a Palavra", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se você for tomar dano enquanto sua *Mente Manifestada* estiver ativa, o livro absorve e previne 100% daquele dano. Você rola 3d6, e o grimório apaga temporariamente magias que somadas equivalham àquele número. (Se rolar 9, apaga uma magia Nv 9, ou três de Nv 3). As magias voltam após 1d6 Descansos Longos.\n*(Uso: 1x por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Encantador (Enchantment)": {
    features: {
      3: [ // Movido do Nv 2 para o Nv 3
        { 
          nome: "Sábio do Encantamento", 
          tipoAcao: "passiva", 
          desc: "O ouro e o tempo para copiar magias de Encantamento para o grimório são reduzidos pela metade." 
        },
        { 
          nome: "Olhar Hipnótico", 
          tipoAcao: "acao", 
          desc: "**Ação:** Fixe o olhar num alvo a 5 pés. Ele faz Save de SAB. Falha: Fica Enfeitiçado, Incapacitado e com Speed 0.\nVocê deve gastar sua Ação em todos os turnos seguintes para manter o efeito. Termina se você se afastar mais de 5 pés ou se ele tomar dano.\n*(Uso: 1 vez por alvo por Descanso Longo).* " 
        }
      ],
      6: [
        { 
          nome: "Charme Instintivo", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando alguém a 30 pés for te atacar e houver outra criatura ao alcance do ataque dele, você o força a um Save de SAB. Falha: O atacante DEVE mudar o alvo do ataque para a outra criatura que estiver mais perto dele (exceto ele mesmo).\n*(Imunidades a encanto ignoram isso).* " 
        }
      ],
      10: [
        { 
          nome: "Encantamento Duplo", 
          tipoAcao: "passiva", 
          desc: "Sempre que você conjurar uma magia de Encantamento de Nível 1 ou superior que normalmente tenha apenas UM alvo, você pode escolher mirar em uma SEGUNDA criatura ao mesmo tempo." 
        }
      ],
      14: [
        { 
          nome: "Alterar Memórias", 
          tipoAcao: "acao", 
          desc: "Quando você enfeitiçar criaturas, você pode ocultar o fato de que usou magia, impedindo que saibam que foram enfeitiçadas. Além disso, ANTES do encanto terminar, você pode usar uma Ação para forçá-las a um Save de INT. Falha: Elas esquecem do tempo que passaram encantadas (até 1 hora + Mod CAR de amnésia)." 
        }
      ]
    }
  },
  
  "Conjurador (Conjuration)": {
    features: {
      3: [ // Movido do Nv 2 para o Nv 3
        { 
          nome: "Sábio da Conjuração", 
          tipoAcao: "passiva", 
          desc: "O ouro e o tempo para copiar magias de Conjuração para o grimório são reduzidos pela metade." 
        },
        { 
          nome: "Conjuração Menor", 
          tipoAcao: "acao", 
          desc: "**Ação:** Conjura um objeto inanimado não-mágico pequeno na mão ou no chão a 10 pés. O objeto pesa até 10lb (4,5kg), emite meia-luz e dura 1 hora. Some se tomar qualquer dano ou causar dano." 
        }
      ],
      6: [
        { 
          nome: "Transporte Benigno", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você teleporta até 30 pés para um espaço vazio. Alternativamente, você mira num espaço ocupado por um aliado; você e o aliado se teleportam, trocando de lugar no campo de batalha.\n*(Uso: 1x por Descanso Longo, MAS recarrega toda vez que conjurar uma magia de Conjuração Nv 1+).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      10: [
        { 
          nome: "Conjuração Focada", 
          tipoAcao: "passiva", 
          desc: "Sempre que você estiver mantendo a Concentração em uma magia da escola de Conjuração, o seu estado de Concentração JAMAIS pode ser quebrado por sofrer dano." 
        }
      ],
      14: [
        { 
          nome: "Invocações Duráveis", 
          tipoAcao: "passiva", 
          desc: "Qualquer criatura que você invocar ou criar com uma magia de Conjuração surge no mundo recebendo 30 Pontos de Vida Temporários extras." 
        }
      ]
    }
  },

  // --- CLÉRIGO (CLERIC) ---

  "Domínio do Conhecimento (Knowledge)": {
    magiasBonus: {
      nivel1: ["Comando", "Compreender Idiomas", "Detectar Magia", "Detectar Pensamentos", "Identificar", "Mente Farpada"],
      nivel2: ["Dissipar Magia", "Dificultar Detecção", "Idiomas"],
      nivel3: ["Olho Arcano", "Banimento", "Confusão"],
      nivel4: ["Lendas e Histórias", "Vidência", "Estática Sináptica"] // Níveis ajustados pro VTT (Spell Slots)
    },
    features: {
      3: [
        { 
          nome: "Bênçãos do Conhecimento", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência com uma Ferramenta de Artesão à sua escolha. Você também escolhe DUAS perícias entre Arcanismo, História, Natureza ou Religião e ganha *Especialização* (Expertise) nelas." 
        },
        { 
          nome: "CD: Magia Mental", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Você escolhe uma magia de Adivinhação (Divination) da sua lista do Domínio do Conhecimento que esteja preparada e a conjura SEM gastar Espaço de Magia (Slot) e SEM precisar de Componentes Materiais." 
        }
      ],
      6: [
        { 
          nome: "Mente Livre", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Testes de Resistência de Inteligência (Se já tiver, escolha outra). Você também ganha Telepatia com alcance de 60 pés (18m). Pode contatar telepaticamente até (Mod. SAB) criaturas ao mesmo tempo." 
        }
      ],
      17: [
        { 
          nome: "Previsão Divina", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você expande sua mente para o futuro. Por 1 hora, você tem VANTAGEM em todos os Testes de d20 (Ataques, Saves e Perícias).\n*(Uso: 1x por Descanso Longo, ou gastando um Slot de Nível 6+).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Domínio da Vida (Life)": {
    magiasBonus: {
      nivel1: ["Auxílio", "Abençoar", "Curar Ferimentos", "Restauração Menor"],
      nivel2: ["Palavra Curativa em Massa", "Revivificar"],
      nivel3: ["Aura de Vida", "Proteção contra a Morte"],
      nivel4: ["Restauração Maior", "Curar Ferimentos em Massa"]
    },
    features: {
      3: [
        { 
          nome: "Discípulo da Vida", 
          tipoAcao: "passiva", 
          desc: "Sempre que conjurar uma magia gastando um Slot que restaure Pontos de Vida, o alvo recupera PV adicionais iguais a (2 + Nível da Magia)." 
        },
        { 
          nome: "CD: Preservar a Vida", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Você gera uma cura total igual a (5 x Nível de Clérigo). Escolha criaturas *Sangrando* (Bloodied - vida abaixo da metade) a até 30 pés e divida essa cura entre elas. Essa habilidade não cura ninguém acima de 50% dos PV máximos." 
        }
      ],
      6: [
        { 
          nome: "Curandeiro Abençoado", 
          tipoAcao: "passiva", 
          desc: "Sempre que você conjurar uma magia com Slot que cure PV de QUALQUER outra criatura (que não seja você), você mesmo recupera Pontos de Vida iguais a (2 + Nível da Magia)." 
        }
      ],
      17: [
        { 
          nome: "Cura Suprema", 
          tipoAcao: "passiva", 
          desc: "Sempre que você for rolar dados para restaurar Pontos de Vida com uma Magia ou Canalizar Divindade, NÃO ROLE OS DADOS. Você cura automaticamente o valor MÁXIMO possível de cada dado (Ex: 2d6 viram 12 diretos)." 
        }
      ]
    }
  },

  "Domínio da Luz (Light)": {
    magiasBonus: {
      nivel1: ["Mãos Flamejantes", "Fogo das Fadas", "Raio Ardente", "Ver o Invisível"],
      nivel2: ["Luz do Dia", "Bola de Fogo"],
      nivel3: ["Olho Arcano", "Muralha de Fogo"],
      nivel4: ["Coluna de Chamas", "Vidência"]
    },
    features: {
      3: [
        { 
          nome: "CD: Resplendor do Amanhecer", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Você emite luz num raio de 30 pés. Qualquer Escuridão Mágica na área é dissipada. Inimigos na área fazem Save de CON. Falha: 2d10 + Nv de Clérigo (Dano Radiante). Sucesso: Metade." 
        },
        { 
          nome: "Clarão Protetor", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 30 pés te atacar, você emite um clarão, impondo Desvantagem no ataque dela.\n*(Usos: Igual ao Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      6: [
        { 
          nome: "Clarão Aprimorado", 
          tipoAcao: "reacao", 
          desc: "Seu *Clarão Protetor* agora recarrega também no Descanso Curto! Além disso, você pode usá-lo para proteger aliados a 30 pés, e a criatura protegida ganha PV Temporários iguais a (2d6 + Mod. SAB)." 
        }
      ],
      17: [
        { 
          nome: "Coroa de Luz", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Você cria uma aura de luz (60 pés brilhante, 30 pés penumbra) por 1 minuto. Inimigos na Luz Brilhante têm DESVANTAGEM nos Testes de Resistência contra seu *Resplendor do Amanhecer* e qualquer magia sua que dê Dano de Fogo ou Radiante.\n*(Usos: Igual ao Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Domínio da Trapaça (Trickery)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa", "Disfarce", "Invisibilidade", "Passos sem Pegadas"],
      nivel2: ["Padrão Hipnótico", "Dificultar Detecção"],
      nivel3: ["Confusão", "Porta Dimensional"],
      nivel4: ["Dominar Pessoa", "Modificar Memória"]
    },
    features: {
      3: [
        { 
          nome: "Bênção do Trapaceiro", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Você concede a si mesmo ou a um aliado voluntário (a até 30 pés) Vantagem em testes de Furtividade. Dura até o Descanso Longo ou até você usar de novo." 
        },
        { 
          nome: "CD: Invocar Duplicidade", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Cria uma ilusão intangível sua a até 30 pés por 1 minuto. Você pode conjurar magias a partir do espaço dela. Se você e ela estiverem a 5 pés de um inimigo, você tem Vantagem nos ataques. Você pode usar uma Ação Bônus para movê-la 30 pés (até 120 pés de você)." 
        }
      ],
      6: [
        { 
          nome: "Transposição do Trapaceiro", 
          tipoAcao: "livre", 
          desc: "Sempre que você usar sua Ação Bônus para conjurar ou mover a sua *Duplicidade*, você pode se Teleportar, trocando de lugar instantaneamente com a ilusão." 
        }
      ],
      17: [
        { 
          nome: "Duplicidade Aprimorada", 
          tipoAcao: "passiva", 
          desc: "Sua *Duplicidade* agora garante Vantagem nos ataques para TODOS os seus aliados que estiverem a 5 pés dela. Além disso, quando a ilusão termina (duração ou dismiss), você ou um aliado a 5 pés dela recupera PV iguais ao seu Nível de Clérigo." 
        }
      ]
    }
  },

  "Domínio da Guerra (War)": {
    magiasBonus: {
      nivel1: ["Raio Guiador", "Arma Mágica", "Escudo da Fé", "Arma Espiritual"],
      nivel2: ["Manto do Cruzado", "Guardiões Espirituais"],
      nivel3: ["Escudo de Fogo", "Movimentação Livre"],
      nivel4: ["Imobilizar Monstro", "Ataque do Vento de Aço"]
    },
    features: {
      3: [
        { 
          nome: "Sacerdote de Guerra", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você pode fazer 1 Ataque com Arma ou Ataque Desarmado extra.\n*(Usos: Igual ao Mod. SAB por Descanso Curto ou Longo).* ",
          recuperacao: "Descanso Curto/Longo"
        },
        { 
          nome: "CD: Golpe Guiado", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Quando você ou um aliado a 30 pés errarem um ataque, você adiciona um bônus de +10 na rolagem, podendo transformar o erro num acerto. (Se usar num aliado, consome sua Reação)." 
        }
      ],
      6: [
        { 
          nome: "Bênção do Deus da Guerra", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Você conjura *Escudo da Fé* ou *Arma Espiritual* SEM gastar slot de magia. Além disso, se usar dessa forma, a magia NÃO EXIGE CONCENTRAÇÃO (Dura 1 minuto, a não ser que conjure de novo)." 
        }
      ],
      17: [
        { 
          nome: "Avatar de Batalha", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência passiva e permanente a dano Cortante, Perfurante e Contundente." 
        }
      ]
    }
  },
  "Domínio Arcano (Arcana)": {
    magiasBonus: {
      nivel1: ["Detectar Magia", "Mísseis Mágicos"],
      nivel2: ["Arma Mágica", "Aura Mágica de Nystul"],
      nivel3: ["Dissipar Magia", "Círculo Mágico"],
      nivel4: ["Olho Arcano", "Baú Secreto de Leomund"],
      nivel5: ["Âncora Planar", "Círculo de Teletransporte"]
    },
    features: {
      3: [ // Níveis 1 e 2 movidos para o 3
        { 
          nome: "Iniciado Arcano", 
          tipoAcao: "passiva", 
          desc: "Você ganha proficiência na perícia Arcanismo. Você escolhe dois Truques da lista de magias do Mago; para você, eles contam como truques de Clérigo." 
        },
        { 
          nome: "CD: Abjuração Arcana", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Um Celestial, Elemental, Fada ou Corruptor (Fiend) a até 30 pés faz Save de SAB. Falha: Fica Expulso por 1 minuto (igual ao Turn Undead). A partir do Nv 5 de Clérigo, criaturas expulsas com CR baixo são Banidas de volta ao plano de origem por 1 minuto." 
        }
      ],
      6: [
        { 
          nome: "Quebrador de Magias", 
          tipoAcao: "livre", 
          desc: "Sempre que você restaurar PV de um aliado com uma magia de Nível 1+, você pode também encerrar UMA magia que esteja afetando aquela criatura. O nível da magia encerrada deve ser igual ou menor que o slot gasto na cura." 
        }
      ],
      17: [
        { 
          nome: "Maestria Arcana", 
          tipoAcao: "passiva", 
          desc: "Você escolhe 4 magias da lista do Mago (uma de Nv 6, uma de Nv 7, uma de Nv 8 e uma de Nv 9). Elas são adicionadas ao seu Grimório de Domínio, ficam sempre preparadas e contam como magias divinas de Clérigo." 
        }
      ]
    }
  },

  "Domínio da Morte (Death)": {
    magiasBonus: {
      nivel1: ["Falsa Vida", "Raio Adoecente"],
      nivel2: ["Cegueira/Surdez", "Raio do Enfraquecimento"],
      nivel3: ["Animar os Mortos", "Toque Vampírico"],
      nivel4: ["Praga", "Proteção contra a Morte"],
      nivel5: ["Cúpula Antivida", "Névoa Mortal"]
    },
    features: {
      3: [
        { 
          nome: "Ceifador", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência com Armas Marciais. Você aprende um Truque de Necromancia de qualquer classe. Quando conjura um truque necromântico de alvo único, você pode mirar em 2 criaturas que estejam a 5 pés de distância uma da outra." 
        },
        { 
          nome: "CD: Toque da Morte", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Ao acertar um ataque Corpo a Corpo numa criatura, você pode adicionar Dano Necrótico extra igual a (5 + 2x seu Nível de Clérigo)." 
        }
      ],
      6: [
        { 
          nome: "Destruição Inescapável", 
          tipoAcao: "passiva", 
          desc: "Qualquer dano necrótico causado pelas suas Magias de Clérigo ou pelo seu Canalizar Divindade IGNORA Resistência a Dano Necrótico." 
        }
      ],
      17: [
        { 
          nome: "Ceifador Aprimorado", 
          tipoAcao: "passiva", 
          desc: "Quando conjura magias de Necromancia de Nível 1 a 5 de alvo único, você pode mirar em 2 criaturas que estejam a 5 pés uma da outra (Se a magia gastar material, você deve pagar o dobro)." 
        }
      ]
    }
  },

  "Domínio da Forja (Forge)": {
    magiasBonus: {
      nivel1: ["Identificar", "Destruição Estonteante"],
      nivel2: ["Esquentar Metal", "Arma Mágica"],
      nivel3: ["Arma Elemental", "Proteção contra Energia"],
      nivel4: ["Fabricar", "Muralha de Fogo"],
      nivel5: ["Animar Objetos", "Criação"]
    },
    features: {
      3: [
        { 
          nome: "Alma do Ferreiro", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Armaduras Pesadas e Ferramentas de Ferreiro.\n**Bênção da Forja:** Ao fim de um Descanso Longo, toque uma arma/armadura não-mágica. Ela se torna mágica, recebendo +1 em CA (Armadura) ou +1 em Ataque e Dano (Arma) até o próximo descanso longo." 
        },
        { 
          nome: "CD: Bênção do Artesão", 
          tipoAcao: "acao", 
          desc: "**Ação (Ritual de 1h, Gasta Canalizar):** Você cria qualquer item não-mágico contendo metal (armadura, arma, ferramenta, chave) de até 100 PO. Você precisa sacrificar materiais ou moedas equivalentes ao valor durante o ritual para formar o objeto." 
        }
      ],
      6: [
        { 
          nome: "Alma da Forja", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência a Dano de Fogo. Além disso, se estiver vestindo uma Armadura Pesada, você ganha +1 de bônus permanente na CA." 
        }
      ],
      17: [
        { 
          nome: "Santo da Forja e Fogo", 
          tipoAcao: "passiva", 
          desc: "Sua resistência a Fogo evolui para IMUNIDADE total a Dano de Fogo. Além disso, enquanto veste Armadura Pesada, você possui Resistência a dano Físico (Cortante, Perfurante, Contundente) Não-Mágico." 
        }
      ]
    }
  },
  "Domínio da Sepultura (Grave)": {
    magiasBonus: {
      truques: ["Estabilizar"],
      nivel1: ["Detectar o Bem e Mal", "Falsa Vida", "Repouso Tranquilo", "Raio do Enfraquecimento", "Estabilizar"],
      nivel2: ["Revivificar", "Toque Vampírico"],
      nivel3: ["Praga", "Proteção contra a Morte"],
      nivel4: ["Dissipar o Bem e Mal", "Reviver os Mortos"]
    },
    features: {
      3: [
        { 
          nome: "Círculo da Mortalidade", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Pode conjurar *Estabilizar* (Spare the Dying).\n**Puxar para a Morte:** 1x por turno, ao dar dano numa criatura que já perdeu PV, cause +1d4 de Dano Necrótico (+1d6 no Nv 11).\n**Retorno Maxinizado:** Ao usar Magia/CD para curar uma criatura que está com 0 PV, NÃO ROLE OS DADOS. A criatura cura o valor máximo dos dados." 
        },
        { 
          nome: "CD: Caminho para a Sepultura", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Amaldiçoa um inimigo a 30 pés até o seu próximo turno (ele ganha Desvantagem em ataques e Saves). O primeiro ataque que o acertar acaba com a maldição, mas ganha Dano Extra (Necrótico ou Radiante) IGUAL AO SEU NÍVEL DE CLÉRIGO." 
        }
      ],
      6: [
        { 
          nome: "Sentinela na Porta da Morte", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você (ou um aliado Sangrando a 60 pés) sofrer um ataque, corte o dano daquele ataque pela METADE. Se o ataque for um Acerto Crítico, ele perde o efeito crítico (vira dano normal dividido pela metade).\n*(Usos: Igual ao Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      17: [
        { 
          nome: "Ceifador Divino", 
          tipoAcao: "passiva", 
          desc: "**Necromancia Aprimorada:** Ao usar magia de Necromancia Nv 1-5 que mire num alvo, use o CD para clonar a magia para um segundo alvo.\n**Guardião de Almas:** Quando inimigo morre a 60 pés, você ou aliado cura PV = (2x seu Nível). *(1x por Descanso, ou gaste Slot Nv 6+ para recarregar).* " 
        }
      ]
    }
  },
  "Domínio da Natureza (Nature)": {
    magiasBonus: {
      nivel1: ["Amizade Animal", "Falar com Animais"],
      nivel2: ["Pele de Árvore", "Crescer Espinhos"],
      nivel3: ["Crescimento de Plantas", "Muralha de Vento"],
      nivel4: ["Dominar Besta", "Vinha Esmagadora"],
      nivel5: ["Praga de Insetos", "Caminho em Árvore"]
    },
    features: {
      3: [
        { 
          nome: "Acólito da Natureza", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Armaduras Pesadas. Você aprende um Truque da lista de Druida (conta como Clérigo) e escolhe Proficiência em Adestrar Animais, Natureza ou Sobrevivência." 
        },
        { 
          nome: "CD: Enfeitiçar Animais e Plantas", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Bestas e Plantas a 30 pés fazem Save de SAB. Falha: Ficam Enfeitiçadas por você por 1 minuto (ficam amigáveis)." 
        }
      ],
      6: [
        { 
          nome: "Amortecer Elementos", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você ou aliado a 30 pés sofrer dano Ácido, Frio, Fogo, Elétrico ou Trovão, você garante Resistência contra aquele golpe específico para a criatura." 
        }
      ],
      17: [
        { 
          nome: "Mestre da Natureza", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Enquanto criaturas estiverem Enfeitiçadas pelo seu Canalizar Divindade, você pode ditar verbalmente e comandar as ações que elas devem realizar no próximo turno delas." 
        }
      ]
    }
  },

  "Domínio da Ordem (Order)": {
    magiasBonus: {
      nivel1: ["Comando", "Heroísmo"],
      nivel2: ["Imobilizar Pessoa", "Zona da Verdade"],
      nivel3: ["Palavra Curativa em Massa", "Lentidão"],
      nivel4: ["Compulsão", "Localizar Criatura"],
      nivel5: ["Comunhão", "Dominar Pessoa"]
    },
    features: {
      3: [
        { 
          nome: "Autoridade", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Armaduras Pesadas e escolhe Persuasão ou Intimidação.\n**Voz da Autoridade:** Ao conjurar qualquer magia de Nv 1+ num aliado, você pode escolher esse aliado. Ele pode usar a própria Reação na mesma hora para fazer um ataque armado contra um inimigo à sua escolha." 
        },
        { 
          nome: "CD: Demanda da Ordem", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Criaturas à sua escolha a 30 pés fazem Save de SAB. Falha: Ficam Enfeitiçadas por você até o fim do seu próximo turno e derrubam as armas que estão segurando." 
        }
      ],
      6: [
        { 
          nome: "Encarnação da Lei", 
          tipoAcao: "livre", 
          desc: "Sempre que você for conjurar uma magia da escola de Encantamento que normalmente custa uma Ação, você pode castá-la usando apenas uma Ação Bônus.\n*(Uso: Igual ao Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      17: [
        { 
          nome: "Ira da Ordem", 
          tipoAcao: "livre", 
          desc: "Sempre que você der dano extra no inimigo usando a habilidade *Golpes Abençoados* (Nível 7), você o amaldiçoa até o início do seu próximo turno. O PRIMEIRO aliado que acertá-lo enquanto amaldiçoado causa +2d8 de Dano Psíquico bônus nele." 
        }
      ]
    }
  },

  "Domínio da Paz (Peace)": {
    magiasBonus: {
      nivel1: ["Heroísmo", "Santuário"],
      nivel2: ["Auxílio", "Vínculo Protetor"],
      nivel3: ["Farol de Esperança", "Enviar Mensagem"],
      nivel4: ["Aura de Pureza", "Esfera Resiliente de Otiluke"],
      nivel5: ["Restauração Maior", "Ligação Telepática de Rary"]
    },
    features: {
      3: [
        { 
          nome: "Vínculo Encorajador", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você vincula criaturas a 30 pés (Lmite = Proficiência) por 10 min. Enquanto duas criaturas vinculadas estiverem a até 30 pés uma da outra, elas podem rolar 1d4 e somar a UM ataque, save ou teste uma vez por turno.\n*(Uso: Igual ao Bônus de Proficiência por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "CD: Bálsamo da Paz", 
          tipoAcao: "acao", 
          desc: "**Ação (Gasta Canalizar Divindade):** Você caminha o seu deslocamento sem causar ataque de oportunidade. Para CADA criatura que você passar a 5 pés de distância nesse movimento, você cura a criatura em (2d6 + Mod. SAB)." 
        }
      ],
      6: [
        { 
          nome: "Vínculo Protetor", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura do seu *Vínculo Encorajador* for tomar dano, UMA OUTRA criatura do mesmo vínculo a até 30 pés pode usar a própria reação para teleportar para o lado do aliado e absorver 100% daquele dano nela mesma." 
        }
      ],
      17: [
        { 
          nome: "Vínculo Expansivo", 
          tipoAcao: "passiva", 
          desc: "O alcance dos seus vínculos salta de 30 para 60 pés (18m). Além disso, quando um aliado usar o *Vínculo Protetor* (Nv 6) para absorver o dano do amigo, ele ganha Resistência àquele dano absorvido." 
        }
      ]
    }
  },

  "Domínio da Tempestade (Tempest)": {
    magiasBonus: {
      nivel1: ["Névoa Escurecedora", "Onda Trovejante"],
      nivel2: ["Lufada de Vento", "Despedaçar"],
      nivel3: ["Convocar Relâmpagos", "Nevasca"],
      nivel4: ["Controlar a Água", "Tempestade de Gelo"],
      nivel5: ["Onda Destrutiva", "Praga de Insetos"]
    },
    features: {
      3: [
        { 
          nome: "Ira da Tempestade", 
          tipoAcao: "reacao", 
          desc: "**Passiva:** Proficiência em Armadura Pesada e Armas Marciais.\n**Reação:** Quando um inimigo a 5 pés te acerta, force ele a um Save de DES. Falha: Toma 2d8 de Raio ou Trovão. Sucesso: Metade.\n*(Usos: Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "CD: Ira Destrutiva", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Quando você rolar dano de Eletricidade (Raio) ou Trovão.\n**Efeito:** Você NÃO ROLA OS DADOS, e automaticamente causa o Dano Máximo da magia." 
        }
      ],
      6: [
        { 
          nome: "Golpe Trovejante", 
          tipoAcao: "passiva", 
          desc: "Sempre que você causar Dano de Eletricidade (Raio) a uma criatura Grande ou menor, você também empurra a criatura até 10 pés (3m) para longe de você." 
        }
      ],
      17: [
        { 
          nome: "Nascido da Tormenta", 
          tipoAcao: "passiva", 
          desc: "Enquanto não estiver no subsolo e nem em locais totalmente fechados, você possui Deslocamento de Voo igual à sua caminhada normal." 
        }
      ]
    }
  },

  "Domínio do Crepúsculo (Twilight)": {
    magiasBonus: {
      nivel1: ["Fogo das Fadas", "Sono"],
      nivel2: ["Raio de Lua", "Ver o Invisível"],
      nivel3: ["Aura de Vitalidade", "Pequena Cabana de Leomund"],
      nivel4: ["Aura de Vida", "Invisibilidade Maior"],
      nivel5: ["Círculo de Poder", "Despistar"]
    },
    features: {
      3: [
        { 
          nome: "Protetor do Limiar", 
          tipoAcao: "acao", 
          desc: "**Passivas:** Armadura Pesada e Armas Marciais. Você ganha Visão no Escuro de 300 pés (90m).\n**Ação (Olhos da Noite):** Compartilhe sua visão absurda com aliados (Lmite = Mod SAB) por 1 hora. *(1x por Long Rest, ou gasta slot).* \n**Ação (Bênção):** Toque alguém. O alvo ganha Vantagem na próxima rolagem de Iniciativa." 
        },
        { 
          nome: "CD: Santuário do Crepúsculo", 
          tipoAcao: "acao", 
          desc: "**Ação (Gasta Canalizar Divindade):** Esfera de penumbra em você (Raio de 30 pés) por 1 min. Aliados que terminarem o turno na esfera recebem UM dos benefícios:\n- Ganha PV Temporários = 1d6 + Nível de Clérigo.\n- Você anula uma condição *Enfeitiçado* ou *Amedrontado* que esteja nele." 
        }
      ],
      6: [
        { 
          nome: "Passos da Noite", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Se estiver na Penumbra ou Escuridão, ganha Deslocamento de Voo igual à sua caminhada por 1 minuto.\n*(Uso: Igual ao Bônus de Proficiência por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      17: [
        { 
          nome: "Manto do Crepúsculo", 
          tipoAcao: "passiva", 
          desc: "A sombra invocada pelo seu *Santuário do Crepúsculo* agora é tão densa e protetora que você e TODOS os seus aliados recebem cobertura natural, ganhando o benefício de Meia Cobertura (+2 de CA e nos Saves de Destreza) enquanto estiverem dentro dela." 
        }
      ]
    }
  },
  // --- BÁRBARO (BARBARIAN) ---
  
  "Caminho do Berserker": {
    features: {
      3: [
        { 
          nome: "Frenesi", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao utilizar seu Ataque Descuidado (Reckless Attack) enquanto estiver em Fúria.\n**Efeito:** O primeiro ataque baseado em Força que você acertar no turno causará +Xd6 de dano extra (onde X é igual ao seu bônus de dano de Fúria atual). O dano é do mesmo tipo da arma." 
        }
      ],
      6: [
        { 
          nome: "Fúria Sem Mente", 
          tipoAcao: "passiva", 
          desc: "Você tem Imunidade às condições Enfeitiçado (Charmed) e Amedrontado (Frightened) enquanto sua Fúria estiver ativa. Se você já estiver sob um desses efeitos ao entrar em Fúria, a condição termina (é curada) em você." 
        }
      ],
      10: [
        { 
          nome: "Retaliação", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você sofre dano de uma criatura que esteja a até 5 pés (1,5m) de você, você pode usar sua Reação para fazer imediatamente um ataque corpo-a-corpo contra ela." 
        }
      ],
      14: [
        { 
          nome: "Presença Intimidante", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você emana uma aura aterradora de 30 pés (9m). Inimigos na área devem fazer um Save de SAB (CD 8 + FOR + Proficiência). Falha: Ficam Amedrontados (Frightened) por 1 minuto. Sucesso: Imunes por 24h. O alvo repete o save no final de cada turno dele para tentar encerrar o efeito.\n*(Uso: 1 vez por Descanso Longo. Você pode usar de novo se gastar 1 uso de Fúria para recarregar).* " 
        }
      ]
    }
  },
  
  "Caminho do Coração Selvagem (Wild Heart)": {
    features: {
      3: [
        { 
          nome: "Fúria dos Ermos", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao entrar em Fúria, escolha uma das opções:\n- **Urso:** Ganha Resistência a todos os danos, exceto Força, Psíquico, Necrótico e Radiante.\n- **Águia:** Você faz a Ação de Desengajar E a Disparada (ambas juntas) como parte da Ação Bônus de entrar em Fúria, e também nos turnos seguintes como Ação Bônus.\n- **Lobo:** Aliados têm Vantagem em ataques corpo-a-corpo contra inimigos a até 5 pés de você." 
        },
        { 
          nome: "Fala Animal", 
          tipoAcao: "passiva", 
          desc: "Você pode conjurar *Falar com Animais* e *Sentido Feral* apenas como rituais. Sabedoria é o atributo de conjuração." 
        }
      ],
      6: [
        { 
          nome: "Aspecto dos Ermos", 
          tipoAcao: "passiva", 
          desc: "Você adquire uma adaptação física. Você pode trocar sua escolha ao final de um Descanso Longo:\n- **Coruja:** Ganha Visão no Escuro 60 pés (ou +60 pés se já tiver).\n- **Pantera:** Ganha Deslocamento de Escalada igual ao seu deslocamento.\n- **Salmão:** Ganha Deslocamento de Natação igual ao seu deslocamento." 
        }
      ],
      10: [
        { 
          nome: "Fala da Natureza", 
          tipoAcao: "passiva", 
          desc: "Você pode conjurar a magia *Comunhão com a Natureza* apenas como ritual. Sabedoria é o atributo de conjuração." 
        }
      ],
      14: [
        { 
          nome: "Poder dos Ermos", 
          tipoAcao: "passiva", 
          desc: "Enquanto estiver em Fúria, escolha uma opção:\n- **Falcão:** Ganha deslocamento de Voo igual ao seu deslocamento normal (desde que não use armadura).\n- **Leão:** Inimigos a até 5 pés de você têm Desvantagem para atacar qualquer outro alvo que não seja você.\n- **Carneiro:** Ao acertar um ataque corpo-a-corpo, você pode forçar uma criatura (Grande ou menor) a cair Caída (Prone)." 
        }
      ]
    }
  },
  
  "Caminho da Árvore do Mundo (World Tree)": {
    features: {
      3: [
        { 
          nome: "Vitalidade da Árvore", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Ao entrar em Fúria):** Você ganha PV Temporários iguais ao seu Nível de Bárbaro.\n**Gatilho (Início do seu turno):** Enquanto estiver em fúria, você pode conceder PV Temporários a outro aliado a até 10 pés (3m). A quantidade é igual a rolar um número de d6 equivalente ao seu Bônus de Dano de Fúria." 
        }
      ],
      6: [
        { 
          nome: "Ramos da Árvore", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se um inimigo começar o turno a até 30 pés (9m) de você e você estiver em fúria, force-o a um Save de Força. Falha: Teleporte-o para um espaço vazio a até 5 pés de você (ou o mais próximo) e reduza o deslocamento dele para 0 até o fim do turno." 
        }
      ],
      10: [
        { 
          nome: "Raízes Esmagadoras", 
          tipoAcao: "passiva", 
          desc: "No seu turno, seu alcance com armas corpo-a-corpo Pesadas (Heavy) ou Versáteis (Versatile) aumenta em +10 pés (+3m). Ao acertar com elas, você pode ativar a Maestria Empurrar (Push) ou Derrubar (Topple) adicionalmente a outra maestria que já estiver usando." 
        }
      ],
      14: [
        { 
          nome: "Viagem pela Árvore", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Ao ativar a Fúria, ou usando uma Ação Bônus nos turnos seguintes, você pode se teleportar até 60 pés. **(1x por Fúria):** Você pode aumentar o alcance desse teleporte para 150 pés e levar até 6 criaturas dispostas (a 10 pés de você) juntas para o destino." 
        }
      ]
    }
  },
  "Caminho do Fanático (Zealot)": {
    features: {
      3: [
        { 
          nome: "Fúria Divina", 
          tipoAcao: "livre", // 💨 Gatilho no ataque
          desc: "**Gatilho:** No primeiro acerto com arma ou ataque desarmado no seu turno enquanto estiver em Fúria.\n**Efeito:** O alvo sofre dano extra igual a 1d6 + metade do seu Nível de Bárbaro (arredondado para baixo). Você escolhe se o tipo de dano é Necrótico ou Radiante a cada vez que causa esse dano." 
        },
        { 
          nome: "Guerreiro dos Deuses", 
          tipoAcao: "bonus", // ⚡ Ação Bônus para se curar
          desc: "**Ação Bônus:** Você possui uma reserva de dados de cura d12 (começa com 4 dados no Nv 3; sobe para 5 no Nv 6, 6 no Nv 12, e 7 no Nv 17). Você pode gastar dados dessa reserva como uma Ação Bônus, rolando-os e curando PV igual ao total.\n*(Sua reserva recupera todos os dados gastos ao final de um Descanso Longo).* " 
        }
      ],
      6: [
        { 
          nome: "Foco Fanático", 
          tipoAcao: "livre", // 💨 Decisão no momento da rolagem
          desc: "**Gatilho:** Uma vez por Fúria ativa, se você falhar em um Teste de Resistência.\n**Efeito:** Você pode rolar novamente o teste adicionando o seu bônus de dano de Fúria, e deve usar o novo resultado." 
        }
      ],
      10: [
        { 
          nome: "Presença Zelosa", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você solta um grito de guerra divino. Até 10 outras criaturas à sua escolha a até 60 pés (18m) de você ganham Vantagem nas jogadas de ataque e em Testes de Resistência até o início do seu próximo turno.\n*(Uso: 1x por Descanso Longo. Você pode usar novamente se gastar 1 uso de Fúria).* " 
        }
      ],
      14: [
        { 
          nome: "Fúria dos Deuses", 
          tipoAcao: "reacao", // 🛡️ Reação de Suporte Divino!
          desc: "**Gatilho (Ao entrar em Fúria):** 1x por Descanso Longo, você assume uma forma divina por 1 minuto (ou até cair a 0 PV). Nessa forma você ganha deslocamento de Voo (podendo pairar) e Resistência a dano Necrótico, Psíquico e Radiante.\n**Reação (Revivificação):** Enquanto estiver nessa forma, se uma criatura a até 30 pés (9m) de você cair a 0 PV, você pode usar sua Reação e gastar 1 uso da sua Fúria para mudar os PV do alvo para um valor igual ao seu Nível de Bárbaro." 
        }
      ]
    }
  },
  
  "Guardião Ancestral (Ancestral Guardian)": {
    features: {
      3: [
        { 
          nome: "Protetores Ancestrais", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** O primeiro ataque que você acertar no seu turno enquanto estiver em Fúria.\n**Efeito:** O alvo é marcado pelos seus ancestrais até o início do seu próximo turno. Ele sofre Desvantagem em qualquer ataque que não seja contra você. Além disso, se ele atingir outra criatura, essa criatura ganha Resistência ao dano daquele ataque." 
        }
      ],
      6: [
        { 
          nome: "Escudo Espiritual", 
          tipoAcao: "reacao", // 🛡️ Reação brilhando na tela!
          desc: "**Reação:** Se você estiver em Fúria e outra criatura a até 30 pés (9m) de você sofrer dano, você pode usar sua Reação para reduzir o dano sofrido em 2d6 (o dano prevenido aumenta para 3d6 no Nv 10 e 4d6 no Nv 14)." 
        }
      ],
      10: [
        { 
          nome: "Consultar Espíritos", 
          tipoAcao: "passiva", 
          desc: "Você pode conjurar as magias *Augúrio* ou *Clarividência* sem gastar espaços de magia ou componentes materiais. (Sabedoria é seu atributo para isso).\n*(Uso: 1 vez por Descanso Curto ou Longo).* " 
        }
      ],
      14: [
        { 
          // 👇 UPGRADE FUNDIDO COM SUCESSO!
          nome: "Escudo Espiritual (Upgrade Nv 14: Ancestrais Vingativos)", 
          tipoAcao: "passiva", 
          desc: "Sempre que você usar o seu Escudo Espiritual para reduzir o dano de um ataque inimigo, o atacante sofre Dano de Força igual ao valor total de dano que o seu escudo preveniu." 
        }
      ]
    }
  },
  
  "Batalhador (Battlerager)": {
    features: {
      3: [
        { 
          nome: "Armadura de Batalha", 
          tipoAcao: "bonus", // ⚡ Ação Bônus 
          desc: "**Ação Bônus:** Enquanto estiver em Fúria e usando uma armadura de espinhos, você pode fazer um ataque corpo-a-corpo com os espinhos contra um alvo a 5 pés (causa 1d4 de dano perfurante usando Força).\n**Gatilho (Agarrar):** Ao usar a ação de Ataque para Agarrar com sucesso, o alvo sofre automaticamente 3 de dano perfurante." 
        }
      ],
      6: [
        { 
          nome: "Abandono Descuidado", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao usar seu Ataque Descuidado (Reckless Attack) enquanto estiver em Fúria.\n**Efeito:** Você ganha Pontos de Vida Temporários iguais ao seu Modificador de Constituição (mínimo de 1). Eles desaparecem quando a Fúria acabar." 
        }
      ],
      10: [
        { 
          nome: "Investida", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Enquanto estiver em Fúria, você pode usar a ação de Disparada (Dash) como uma Ação Bônus." 
        }
      ],
      14: [
        { 
          nome: "Retribuição Espinhosa", 
          tipoAcao: "passiva", 
          desc: "Enquanto estiver em Fúria, não estiver incapacitado e usando sua armadura de espinhos, sempre que uma criatura a até 5 pés de você te acertar com um ataque corpo-a-corpo, ela sofre automaticamente 3 de dano perfurante." 
        }
      ]
    }
  },
  "Caminho da Besta (Beast)": {
    features: {
      3: [
        { 
          nome: "Forma da Besta (Ataques Naturais)", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao entrar em Fúria.\n**Efeito:** Você manifesta uma arma natural (conta como arma simples, usa Força). Escolha uma forma a cada Fúria:\n- **Mordida (1d8 Perfurante):** 1x por turno, se causar dano e estiver com menos da metade dos seus PV, você cura PV igual ao seu Bônus de Proficiência.\n- **Garras (1d6 Cortante):** 1x por turno, se você atacar com a garra, pode fazer 1 ataque adicional com a garra como parte da mesma ação.\n- **Cauda (1d8 Perfurante):** Possui a propriedade Alcance (Reach)." 
        },
        { 
          nome: "Defesa da Cauda", 
          tipoAcao: "reacao", // 🛡️ Gaveta de Reações
          desc: "**Reação:** Se você manifestou a Cauda e uma criatura a até 10 pés (3m) te acertar um ataque, você pode rolar 1d8 e somar à sua CA contra aquele ataque (podendo transformá-lo em um erro)." 
        }
      ],
      6: [
        { 
          nome: "Alma Bestial", 
          tipoAcao: "passiva", 
          desc: "Suas armas naturais contam como mágicas. Além disso, ao terminar um Descanso Curto/Longo, escolha uma adaptação (dura até o próximo descanso): Natação + Respirar na água; Escalada (incluindo tetos); ou Pulo Melhorado (Soma um teste de Atletismo na distância do pulo 1x/turno)." 
        }
      ],
      10: [
        { 
          nome: "Fúria Infecciosa", 
          tipoAcao: "livre", // 💨 Gatilho automático ao acertar
          desc: "**Gatilho:** Ao acertar uma criatura com sua arma natural em Fúria.\n**Efeito:** O alvo faz um Save de Sabedoria (CD 8 + CON + Proficiência). Falha: Você escolhe se ele usa a Reação dele para atacar um alvo que você escolher, OU se ele toma 2d12 de dano Psíquico.\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        }
      ],
      14: [
        { 
          nome: "Chamado da Caça", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao entrar em Fúria.\n**Efeito:** Escolha um número de aliados dispostos a até 30 pés (até o seu mod. de Constituição). Você ganha 5 PV Temporários para cada aliado. Durante a sua fúria, 1 vez no turno deles, quando esses aliados acertarem um ataque, eles causam +1d6 de dano.\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        }
      ]
    }
  },
  
  "Caminho do Gigante (Giant)": {
    features: {
      3: [
        { 
          nome: "Poder do Gigante", 
          tipoAcao: "passiva", 
          desc: "Você aprende o idioma Gigante e um truque à sua escolha: *Druidcraft* ou *Thaumaturgy* (Sabedoria é seu atributo)." 
        },
        { 
          nome: "Caos do Gigante", 
          tipoAcao: "passiva", 
          desc: "Em Fúria: Você soma seu bônus de dano de Fúria em ataques à distância com armas de Arremesso. Seu alcance aumenta em +5 pés e, se você for menor que Grande, você se torna de tamanho Grande." 
        }
      ],
      6: [
        { 
          nome: "Cutelo Elemental", 
          tipoAcao: "bonus", // ⚡ Ação Bônus para trocar de elemento!
          desc: "**Gatilho (Ao entrar em Fúria):** Uma arma empunhada vira elemental (Ácido, Frio, Fogo, Trovejante ou Elétrico). Ela causa +1d6 de dano do tipo escolhido (mudando o tipo base dela), ganha a propriedade Arremesso (20/60) e retorna à sua mão logo após o ataque.\n**Ação Bônus:** Enquanto estiver empunhando a arma, você pode mudar o elemento dela para outro da lista." 
        }
      ],
      10: [
        { 
          nome: "Impulso Poderoso", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Em Fúria, você pode arremessar uma criatura (Média ou menor) que esteja no seu alcance para um espaço vazio a até 30 pés (9m). Criaturas hostis fazem Save de FOR para evitar (CD 8 + FOR + Proficiência). Se o alvo for arremessado no ar e não puder se segurar, ele sofre dano de queda e cai Caído (Prone)." 
        }
      ],
      14: [
        { 
          nome: "Colosso Demiúrgico", 
          tipoAcao: "passiva", 
          desc: "Em Fúria, seu alcance aumenta em +10 pés, você pode escolher ficar de tamanho Grande ou Enorme e pode arremessar criaturas Grandes com seu Impulso Poderoso." 
        },
        // 👇 Upando automaticamente a arma elemental na Aba Combate
        { 
          nome: "Cutelo Elemental (Upgrade Nv 14: Colosso)", 
          tipoAcao: "passiva", 
          desc: "O dano extra do seu Cutelo Elemental aumenta para 2d6." 
        }
      ]
    }
  },
  
  "Arauto da Tempestade (Storm Herald)": {
    features: {
      3: [
        { 
          nome: "Aura da Tempestade", 
          tipoAcao: "bonus", // ⚡ Vai virar a principal Ação Bônus do Bárbaro
          desc: "**Gatilho (Ao entrar em Fúria):** Sua aura de 10 pés se ativa.\n**Ação Bônus:** Nos seus turnos seguintes, você pode reativar a aura (A CD é 8 + CON + Proficiência). O efeito depende do seu ambiente (trocável ao subir de nível):\n- **Deserto:** Outras criaturas na aura sofrem 2 de dano de Fogo (sobe p/ 3 no nv5, 4 no nv10, 5 no nv15 e 6 no nv20).\n- **Mar:** Um alvo faz Save de DEX. Falha: toma 1d6 de dano Elétrico (escala para 2d6, 3d6 e 4d6 nos nvs 10, 15, 20). Sucesso: Metade.\n- **Tundra:** Criaturas à sua escolha na aura ganham 2 PV Temporários (escala p/ 3, 4, 5 e 6)." 
        }
      ],
      6: [
        { 
          nome: "Alma da Tempestade", 
          tipoAcao: "acao", // ⚔️ Tem uma Ação escondida aqui
          desc: "**Passiva:** Deserto (Resistência a Fogo e clima quente); Mar (Resistência a Elétrico, respirar água e natação 30ft); Tundra (Resistência a Frio e clima gelado).\n**Ação:** Deserto (tocar um objeto inflamável e botar fogo); Tundra (tocar um cubo de água de 5ft e congelá-lo por 1 min)." 
        }
      ],
      10: [
        { 
          nome: "Tempestade Protetora", 
          tipoAcao: "passiva", 
          desc: "Aliados à sua escolha ganham a sua Resistência da habilidade 'Alma da Tempestade' enquanto estiverem dentro da sua Aura." 
        }
      ],
      14: [
        { 
          nome: "Tempestade Furiosa", 
          tipoAcao: "reacao", // 🛡️ 2 das 3 opções são Reações brutais!
          desc: "O poder da tempestade evolui:\n- **Deserto (Reação):** Após tomar dano de quem está na aura, faça-o rolar Save de DEX. Falha: toma dano de Fogo = metade do seu nível de Bárbaro.\n- **Mar (Reação):** Ao acertar um ataque em alguém na aura, force um Save de FOR. Falha: o alvo é Derrubado (Prone).\n- **Tundra (Livre):** Sempre que ativar a aura (via Fúria ou Bônus), uma criatura nela faz Save de FOR ou tem deslocamento reduzido a 0 até o seu próximo turno." 
        }
      ]
    }
  },
  "Guerreiro Totêmico (Totem Warrior - Legado)": {
    escolhasNivel3: [
      { 
        titulo: "Espírito Totêmico", 
        tipo: "totem", 
        opcoes: [{ nome: "Urso" }, { nome: "Águia" }, { nome: "Alce" }, { nome: "Tigre" }, { nome: "Lobo" }] 
      }
    ],
    escolhasNivel6: [
      { 
        titulo: "Aspecto da Besta", 
        tipo: "totem", 
        opcoes: [{ nome: "Urso" }, { nome: "Águia" }, { nome: "Alce" }, { nome: "Tigre" }, { nome: "Lobo" }] 
      }
    ],
    escolhasNivel14: [
      { 
        titulo: "Sintonia Totêmica", 
        tipo: "totem", 
        opcoes: [{ nome: "Urso" }, { nome: "Águia" }, { nome: "Alce" }, { nome: "Tigre" }, { nome: "Lobo" }] 
      }
    ],
    features: {
      3: [
        { 
          nome: "Buscador Espiritual", 
          tipoAcao: "passiva", 
          desc: "Você pode conjurar as magias *Sentido Feral* (Beast Sense) e *Falar com Animais* (Speak with Animals) apenas como rituais." 
        },
        { 
          nome: "Espírito Totêmico", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao entrar em Fúria, você ganha o benefício do seu Totem escolhido:\n- **Urso:** Você ganha Resistência a todos os tipos de dano, exceto Psíquico.\n- **Águia:** Você pode usar a ação de Disparada (Dash) como uma Ação Bônus e inimigos têm Desvantagem em ataques de oportunidade contra você (se não usar armadura pesada).\n- **Alce:** Seu deslocamento aumenta em +15 pés (+4,5m).\n- **Tigre:** Adiciona +10 pés à distância do seu salto em distância e +3 pés ao seu salto em altura.\n- **Lobo:** Aliados têm Vantagem em ataques corpo-a-corpo contra inimigos a até 5 pés de você." 
        }
      ],
      6: [
        { 
          nome: "Aspecto da Besta", 
          tipoAcao: "passiva", 
          desc: "Você ganha um benefício utilitário (pode escolher um animal diferente do Nv 3):\n- **Urso:** Capacidade de carga dobrada, Vantagem em testes de Força para empurrar/puxar/quebrar.\n- **Águia:** Visão de 1 milha com perfeição; luz fraca não dá Desvantagem em Percepção.\n- **Alce:** Ritmo de viagem dobrado para você e até 10 companheiros.\n- **Tigre:** Ganha proficiência em 2 perícias (Atletismo, Acrobacia, Furtividade ou Sobrevivência).\n- **Lobo:** Pode rastrear viajando em ritmo rápido e usar furtividade em ritmo normal." 
        }
      ],
      10: [
        { 
          nome: "Andarilho Espiritual", 
          tipoAcao: "passiva", 
          desc: "Você pode conjurar a magia *Comunhão com a Natureza* (Commune with Nature) apenas como ritual." 
        }
      ],
      14: [
        { 
          nome: "Sintonia Totêmica", 
          tipoAcao: "passiva", 
          desc: "Enquanto estiver em Fúria, você ganha um poder:\n- **Urso:** Inimigos a até 5 pés de você têm Desvantagem para atacar qualquer outro alvo que não seja você.\n- **Águia:** Você ganha deslocamento de Voo igual ao seu deslocamento terrestre (você cai se terminar o turno no ar sem suporte).\n- **Alce:** Como uma Ação Bônus durante seu movimento, você pode passar pelo espaço de um inimigo para derrubá-lo (Save FOR) e causar 1d12 + FOR de dano.\n- **Tigre:** Se mover 20 pés em linha reta e atacar, você pode fazer +1 ataque extra como Ação Bônus.\n- **Lobo:** Pode usar uma Ação Bônus para tentar derrubar (Caído) um alvo que você acertou com um ataque." 
        }
      ]
    }
  },
  
  "Magia Selvagem (Wild Magic)": {
    features: {
      3: [
        { 
          nome: "Percepção Mágica", 
          tipoAcao: "acao", // ⚔️ Gaveta de Ação Principal
          desc: "**Ação:** Você abre sua percepção para a magia. Até o fim do seu próximo turno, você sabe a localização de qualquer magia ou item mágico a até 60 pés (18m) que não esteja sob cobertura total, e descobre a escola da magia envolvida.\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        },
        { 
          nome: "Surto Selvagem", 
          tipoAcao: "livre", // 💨 Dispara automático com a Fúria
          desc: "**Gatilho:** Quando você entra em Fúria.\n**Efeito:** A energia mágica entra em erupção. Role 1d8 na tabela de Magia Selvagem do Bárbaro para produzir um efeito aleatório (Teleporte, Raio de luz, Espíritos explodindo, Vinhas no chão, etc.). A CD para os efeitos é 8 + CON + Proficiência. Alguns efeitos geram Ações Bônus que você pode usar enquanto a fúria durar." 
        }
      ],
      6: [
        { 
          nome: "Magia Fortalecedora", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você toca uma criatura (ou a si mesmo) e concede um benefício:\n- **Bônus:** O alvo pode rolar 1d3 e somar ao resultado de qualquer ataque ou teste de atributo pelos próximos 10 minutos.\n- **Recuperação:** O alvo rola 1d3 e recupera um espaço de magia de nível igual ou menor ao resultado (1x por alvo por Descanso Longo).\n*(Uso: Bônus de Proficiência vezes por Descanso Longo).* " 
        }
      ],
      10: [
        { 
          nome: "Reação Instável", 
          tipoAcao: "reacao", // 🛡️ Reação defensiva tática
          desc: "**Reação:** Imediatamente após você sofrer dano ou falhar em um Teste de Resistência enquanto estiver em Fúria, você pode usar sua Reação para rolar novamente na tabela de Magia Selvagem. O novo efeito produzido substitui instantaneamente o seu efeito de fúria atual." 
        }
      ],
      14: [
        { 
          nome: "Surto Controlado", 
          tipoAcao: "passiva", 
          desc: "Sempre que você rolar na tabela de Magia Selvagem, você rola dois dados (2d8) em vez de um e escolhe qual dos dois efeitos irá produzir. Se os dados derem números iguais, você pode ignorar os dados e simplesmente escolher qualquer efeito da tabela à sua vontade." 
        }
      ]
    }
  },
  // --- BARDO (BARD) ---

  "Colégio da Dança (Dance)": {
    features: {
      3: [
        { 
          nome: "Trabalho de Pés Deslumbrante", 
          tipoAcao: "passiva", 
          desc: "Enquanto não estiver usando Armadura nem Escudo, você ganha:\n- **Virtuoso da Dança:** Vantagem em Performance envolvendo dança.\n- **Defesa Sem Armadura:** CA = 10 + Destreza + Carisma.\n- **Dano Bárdico:** Pode usar Destreza para ataque/dano desarmado. O dano vira (Dado de Bardo + Mod. DES) de concussão, sem gastar a sua Inspiração.\n- **Golpes Ágeis:** Sempre que você GASTAR uma Inspiração (em Ação, Bônus ou Reação), você pode fazer 1 Ataque Desarmado junto como parte da mesma ação." 
        }
      ],
      6: [
        { 
          nome: "Movimento Inspirador", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se um inimigo que você vê terminar o turno a 5 pés de você, você pode gastar 1 Inspiração para se mover metade da sua caminhada e permitir que 1 aliado a 30 pés também se mova metade da caminhada dele. Esse movimento NÃO provoca ataques de oportunidade." 
        },
        { 
          nome: "Passo em Tandem", 
          tipoAcao: "livre", 
          desc: "**Iniciativa:** Ao rolar Iniciativa, você pode gastar 1 Inspiração de Bardo. Role o dado; você e todos os aliados a 30 pés que possam te ver/ouvir ganham bônus na iniciativa igual ao resultado do dado." 
        }
      ],
      14: [
        { 
          nome: "Evasão de Líder", 
          tipoAcao: "passiva", 
          desc: "Quando você sofre um efeito que permite Save de Destreza para tomar metade do dano, você toma ZERO dano se passar e só metade se falhar. Você compartilha esse benefício com TODOS os aliados que estiverem a 5 pés de você quando o efeito acontecer." 
        }
      ]
    }
  },

  "Colégio do Glamour (Glamour)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa"],
      nivel2: ["Reflexos", "Comando"]
    },
    features: {
      3: [
        { 
          nome: "Magia Sedutora", 
          tipoAcao: "livre", 
          desc: "Sempre tem *Enfeitiçar Pessoa* e *Reflexos* preparadas. Imediatamente após você conjurar uma magia de Encantamento ou Ilusão com Slot, você obriga alguém a 60 pés a fazer um Save de SAB. Falha: Fica Enfeitiçado ou Amedrontado (sua escolha) por 1 minuto.\n*(Uso: 1x por Descanso Longo, ou recarregue queimando 1 Inspiração de Bardo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "Manto de Inspiração", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você gasta 1 Inspiração e rola o dado. Escolha aliados a 60 pés (Até seu Mod. CAR). Eles ganham PV Temporários iguais a 2x o resultado do dado e podem usar a Reação DELES na mesma hora para se moverem (sem causar ataques de oportunidade)." 
        }
      ],
      6: [
        { 
          nome: "Manto de Majestade", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você assume uma forma feérica por 1 min (Exige Concentração) e conjura *Comando* de graça. Neste 1 min, você pode conjurar *Comando* em todos os seus turnos como Ação Bônus de graça. Criaturas enfeitiçadas por você falham automaticamente nesse Comando.\n*(Uso: 1x por Descanso Longo, ou queimando slot de Nv 3+).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Majestade Inquebrável", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto, qualquer criatura que tentar acertar um ataque contra você na primeira vez no turno dela DEVE fazer um Save de CAR. Falha: O ataque erra automaticamente pois ela fica com medo de sua majestade.\n*(Uso: 1x por Descanso Curto/Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ]
    }
  },

  "Colégio do Conhecimento (Lore)": {
    features: {
      3: [
        { 
          nome: "Proficiências Bônus", 
          tipoAcao: "passiva", 
          desc: "O mundo não tem segredos para você. Você ganha Proficiência em 3 Perícias quaisquer à sua escolha." 
        },
        { 
          nome: "Palavras Cortantes", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 60 pés fizer uma jogada de ataque, teste de habilidade ou jogada de dano, você gasta 1 Inspiração, rola o dado e SUBTRAI o resultado da rolagem do inimigo (podendo transformar acerto em erro ou zerar o dano)." 
        }
      ],
      6: [
        { 
          nome: "Descobertas Mágicas", 
          tipoAcao: "passiva", 
          desc: "Você descobre magias de outras classes cedo. Escolha 2 magias de qualquer classe (Clérigo, Druida, Mago, etc) cujo nível você consiga conjurar. Elas viram magias de Bardo e estão sempre preparadas.\n(Ao subir de nível de Bardo, você pode trocar essas magias)." 
        }
      ],
      14: [
        { 
          nome: "Habilidade Inigualável", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Se VOCÊ falhar num Teste de Atributo (Perícia/Iniciativa) ou Ataque.\n**Efeito:** Você pode gastar a sua própria Inspiração de Bardo, rolar o dado e somar à sua jogada. Se continuar falhando, a Inspiração volta para o seu limite e não é gasta." 
        }
      ]
    }
  },

  "Colégio da Lua (Moon)": {
    magiasBonus: {
      nivel2: ["Raio de Lua"]
    },
    features: {
      3: [
        { 
          nome: "Sabedoria Primitiva", 
          tipoAcao: "passiva", 
          desc: "Você aprende o idioma Druídico e 1 Truque da lista de Druida (conta como Bardo). Você ganha proficiência numa perícia (Adestrar Animais, Intuição, Medicina, Natureza, Percepção ou Sobrevivência)." 
        },
        { 
          nome: "Inspiração da Lua", 
          tipoAcao: "passiva", 
          desc: "Ao dar Inspiração como Ação Bônus, você ganha acesso a dois efeitos:\n- **Eclipse:** Você fica Invisível e se Teleporta 30 pés no ato. Invisibilidade dura até você atacar, conjurar ou iniciar o próximo turno.\n- **Vitalidade Lunar:** 1x por turno, ao curar alguém com magia, você pode queimar 1 Inspiração para curar a pessoa num valor extra igual à rolagem da Inspiração, e dar +10 pés de Speed a ela." 
        }
      ],
      6: [
        { 
          nome: "Bênção do Luar", 
          tipoAcao: "passiva", 
          desc: "Sempre tem *Raio de Lua* (Moonbeam) preparado. Ao conjurá-lo (1x por Descanso Longo), você ganha uma aura de luz de 5 pés. Enquanto a aura durar, se um inimigo falhar no save do Raio, um aliado a 60 pés cura 2d4 PV." 
        }
      ],
      14: [
        { 
          nome: "Esplendor do Entardecer", 
          tipoAcao: "passiva", 
          desc: "Sua magia lunar evolui:\n- **Nova (Eclipse):** Quando der a Inspiração pra um aliado, ELE também ganha Invisibilidade e uma Reação para teleportar 30 pés.\n- **Cheia (Vitalidade):** Se for usar a cura bônus de Inspiração (Vitalidade Lunar), em vez de gastar a Inspiração, você pode usar um dado 1d6 fixo e infinito." 
        }
      ]
    }
  },

  "Colégio da Bravura (Valor)": {
    features: {
      3: [
        { 
          nome: "Treinamento Marcial", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Armaduras Médias, Escudos e Armas Marciais. Você pode usar uma arma Corpo a Corpo como seu Foco Arcano de conjuração." 
        },
        { 
          nome: "Inspiração de Combate", 
          tipoAcao: "livre", 
          desc: "A criatura que tem o seu dado de Inspiração recebe novas utilidades de combate pra ele:\n- **Defesa:** Se ela tomar um ataque, pode gastar a Reação e o dado para somar o valor rolado na própria Classe de Armadura (CA).\n- **Ofensiva:** Após a criatura ACERTAR um ataque armado, ela gasta o dado para somar o valor rolado no DANO daquele ataque." 
        }
      ],
      6: [
        { 
          nome: "Ataque Extra (Bravura)", 
          tipoAcao: "passiva", 
          desc: "Você pode atacar DUAS vezes na sua Ação de Ataque. Além disso, você pode trocar um desses ataques pela conjuração de um Truque de Bardo que custe 1 Ação." 
        }
      ],
      14: [
        { 
          nome: "Magia de Batalha", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Imediatamente APÓS você conjurar uma magia gastando uma Ação, você pode fazer um ataque corpo a corpo com a sua arma." 
        }
      ]
    }
  },

  "Colégio dos Espíritos (Spirits)": {
    magiasBonus: {
      truques: ["Orientação"],
      nivel3: ["Guardiões Espirituais"]
    },
    features: {
      3: [
        { 
          nome: "Canalizador de Espíritos", 
          tipoAcao: "passiva", 
          desc: "Você ganha *Orientação* com alcance absurdo de 60 pés (18m). Você pode usar uma Carta de Tarô, Vela, Orbe ou Caneta como seu Foco Arcano." 
        },
        { 
          nome: "Contos do Além", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Queime uma Inspiração para incorporar um espírito. Role seu dado de inspiração na Tabela de Espíritos e guarde o efeito até o Descanso ou até usá-lo.\n**Canalização Controlada:** Em vez de rolar aleatório, gaste a inspiração e escolha um espírito do 1 até o número máximo do dado.\n**Liberar Espírito:** Gaste uma Ação Mágica, aponte pra alguém a 30 pés e solte o efeito! (Save = sua CD de Bardo)." 
        },
        { 
          nome: "📜 Tabela de Espíritos", 
          tipoAcao: "passiva", 
          desc: "1. Cura PV (Dado + CAR).\n2. Alvo toma Dano de Energia (Dado + CAR).\n3. Fúria: Quem bater no aliado no corpo-a-corpo toma dano de Energia (Dado).\n4. Aliado ganha Reação pra teleportar 30ft.\n5. Aliado tem Vantagem em TODOS os d20 até seu próximo turno.\n6. Aliado ganha Temp PV (Dado + Nv Bardo) e +10ft de Speed.\n7. Inimigo toma 2x Dados de dano Psíquico e Save SAB ou fica Enfeitiçado.\n8. Aliado fica Invisível 1 turno; ao reaparecer, causa 2x Dados de dano Necrótico a 5ft.\n9. Inimigo toma 4x Dados de dano de Fogo (Save DES metade).\n10. Medo em 30ft do alvo. (Save SAB ou Amedrontado + Speed cai pela metade).\n11. Explosão 30ft do alvo. (Save FOR ou 3x Dados Dano de Trovão + Cai no chão).\n12. Cura 2x Dados PV e remove: Cegueira, Charme, Surdez, Paralisia, Veneno ou Atordoamento." 
        }
      ],
      6: [
        { 
          nome: "Canalização Empoderada", 
          tipoAcao: "livre", 
          desc: "**Dano/Cura Bônus:** 1x por turno, ao curar ou causar dano com MAGIA COM SLOT, role 1d6 e some no dano/cura daquela magia.\n**Guardiões:** Conjure *Guardiões Espirituais* 1x/dia de graça. Se quiser, a aura da magia também dá MEIA COBERTURA (+2 CA/Des) pros aliados dentro dela." 
        }
      ],
      14: [
        { 
          nome: "Conexão Mística", 
          tipoAcao: "passiva", 
          desc: "Ao usar seu *Contos do Além*, você rola o dado de Inspiração DUAS VEZES e escolhe qual dos dois efeitos listados na Tabela você quer guardar. Se tirar o mesmo número nos dois dados, você pode escolher QUALQUER efeito da Tabela inteira (incluindo o Nv 12!)." 
        }
      ]
    }
  },
  "Colégio das Espadas (Swords)": {
    features: {
      3: [
        { 
          nome: "Lâmina Bárdica", 
          tipoAcao: "passiva", 
          desc: "Você ganha Proficiência em Armaduras Médias e Cimitarras. Você pode usar uma arma corpo a corpo como seu Foco Arcano.\n**Estilo de Luta:** Você escolhe um estilo passivo: *Duelo* (+2 de Dano se usar arma em uma mão sem escudo) ou *Combate com Duas Armas* (Soma o atributo no dano do ataque da mão inábil)." 
        },
        { 
          nome: "Floreio de Lâmina", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao realizar a Ação de Ataque (seu Deslocamento aumenta em +10 pés nesse turno). Se acertar, você pode queimar 1 Inspiração para fazer um Floreio:\n- **Defensivo:** O dano da arma aumenta no valor do dado, e sua CA aumenta no mesmo valor até seu próximo turno.\n- **Cortante:** O dano da arma aumenta no valor do dado, e você causa esse mesmo dano a qualquer criatura a 5 pés de você.\n- **Móvel:** O dano da arma aumenta no valor do dado, e você empurra o alvo (5 pés + o valor do dado) para longe. Você pode usar sua Reação para se mover para perto dele." 
        }
      ],
      6: [
        { 
          nome: "Ataque Extra (Espadas)", 
          tipoAcao: "passiva", 
          desc: "Você pode atacar DUAS vezes, em vez de uma, sempre que usar a Ação de Ataque no seu turno." 
        }
      ],
      14: [
        { 
          nome: "Floreio Mestre", 
          tipoAcao: "passiva", 
          desc: "Sua maestria com a espada é absoluta. Sempre que for usar um *Floreio de Lâmina*, você pode optar por NÃO gastar o seu dado de Inspiração de Bardo e, em vez disso, rolar um dado 1d6 gratuito e infinito para gerar o efeito." 
        }
      ]
    }
  },

  "Colégio dos Sussurros (Whispers)": {
    features: {
      3: [
        { 
          nome: "Lâminas Psíquicas", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** 1x por turno, ao acertar um ataque com arma numa criatura.\n**Efeito:** Você queima 1 Inspiração de Bardo para causar Dano Psíquico extra no alvo. O dano é 2d6 (Sobe para 3d6 no Nv 5, 5d6 no Nv 10 e 8d6 no Nv 15)." 
        },
        { 
          nome: "Palavras de Terror", 
          tipoAcao: "acao", 
          desc: "Se você conversar a sós com um humanoide por 1 minuto, você planta sementes de paranoia na mente dele. Ele faz um Save de SAB. Falha: Fica *Amedrontado* de você (ou de alguém que você escolher) por 1 hora. Se ele passar, não saberá que você tentou assustá-lo.\n*(Uso: 1x por Descanso Curto/Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      6: [
        { 
          nome: "Manto dos Sussurros", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando um humanoide morrer a até 30 pés, você captura a sombra dele (Dura até o descanso). Como uma Ação, você pode vestir a sombra, assumindo a aparência exata dele (vivo e saudável) por 1 hora. Você ganha acesso a memórias gerais da pessoa e ganha +5 em Enganação para se passar por ela.\n*(Uso: 1x por Descanso Curto/Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      14: [
        { 
          nome: "Saber das Sombras", 
          tipoAcao: "acao", 
          desc: "**Ação:** Sussurre uma frase para alguém a 30 pés. Save de SAB (Imune se for surdo ou não entender a língua). Falha: É *Enfeitiçado* por 8 horas. A criatura acredita cegamente que você sabe o maior segredo da vida dela e a está chantageando. Ela te dá presentes e obedece ordens para manter o segredo a salvo (Não se matará por você).\n*(Uso: 1x por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Colégio da Criação (Creation)": {
    features: {
      3: [
        { 
          nome: "Mote de Potencial", 
          tipoAcao: "passiva", 
          desc: "Quando você dá uma Inspiração a alguém, uma nota musical física passa a orbitar o aliado. Quando ele a usa, gera um efeito extra:\n- **Em Teste:** O aliado rola a Inspiração duas vezes e escolhe o melhor resultado.\n- **Em Ataque:** A nota explode. O inimigo alvo (e quem mais você quiser a 5 pés) sofre Dano de Trovão igual ao resultado da Inspiração (Save CON evita).\n- **Em Save:** O aliado ganha PV Temporários = (Dado + Mod CAR)." 
        },
        { 
          nome: "Performance da Criação", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você canta e cria do nada um objeto não-mágico Médio ou menor a 10 pés. Ele brilha levemente e vale até (20x Nível de Bardo) em Ouro. Desaparece após horas = Bônus de Proficiência. (Tamanho sobe para Grande no Nv 6 e Imenso no Nv 14).\n*(Uso: 1x por Long Rest, ou gaste Slot Nv 2+ para recriar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      6: [
        { 
          nome: "Performance Animada", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você anima um objeto Grande ou menor a 30 pés (Construto Dançante, CA 16, Voo 30ft). Ele age logo após você e obedece aos seus comandos. Se você usar sua Ação Bônus para dar Inspiração a alguém, pode comandar o objeto junto. (Aura do objeto: Aumenta ou diminui a velocidade de quem passar perto dele em 10ft).\n*(Uso: 1x por Long Rest, ou gaste Slot Nv 3+ para reanimar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Crescendo Criativo", 
          tipoAcao: "passiva", 
          desc: "Sua *Performance da Criação* rompe limites. Você agora pode criar simultaneamente até (Mod. CAR) objetos de uma vez. Apenas UM pode ter o tamanho máximo; os outros devem ser Pequenos. Além disso, o limite de valor em Ouro não existe mais (Você pode criar coisas caríssimas)." 
        }
      ]
    }
  },

  "Colégio da Eloquência (Eloquence)": {
    features: {
      3: [
        { 
          nome: "Língua de Prata", 
          tipoAcao: "passiva", 
          desc: "Sempre que você fizer um Teste de Persuasão ou Enganação, qualquer número no d20 que seja 9 ou menor se transforma automaticamente em um 10." 
        },
        { 
          nome: "Palavras Perturbadoras", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você queima 1 Inspiração de Bardo e insulta/zomba de um inimigo a 60 pés. Role o dado; o inimigo DEVE subtrair o valor rolado do próximo Teste de Resistência (Save) que ele for fazer antes do início do seu próximo turno (combina muito bem para quebrar saves antes de soltar uma magia poderosa nele)." 
        }
      ],
      6: [
        { 
          nome: "Fala Universal", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você escolhe aliados ou inimigos (até seu Mod. CAR) a 60 pés. Por 1 hora, eles conseguem entender tudo o que você fala magicamente, independente do idioma que você falar.\n*(Uso: 1x por Descanso Longo, ou gaste qualquer Slot de magia).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "Inspiração Infalível", 
          tipoAcao: "passiva", 
          desc: "Suas palavras inspiradoras se recusam a falhar. Sempre que um aliado usar o seu dado de Inspiração em um Teste, Ataque ou Save e a rolagem FINAL mesmo assim resultar em FALHA, o aliado NÃO GASTA a Inspiração (ele pode manter o dado com ele para tentar de novo)." 
        }
      ],
      14: [
        { 
          nome: "Inspiração Infecciosa", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando um aliado rolar a sua Inspiração e tiver SUCESSO na rolagem, você incentiva outro. Como Reação, você dá 1 dado de Inspiração para outro aliado (que não seja você) a 60 pés SEM GASTAR do seu limite diário.\n*(Usos dessa Reação: Igual ao Mod. CAR por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Círculo da Terra (Land)": {
    features: {
      3: [
        { 
          nome: "Magias do Círculo", 
          tipoAcao: "passiva", 
          desc: "Sempre após um Descanso Longo, escolha um Terreno (Árido, Polar, Temperado ou Tropical). Você ganha magias preparadas extras com base no terreno escolhido.\n- **Árido:** Fogo e barreiras (ex: Bola de Fogo).\n- **Polar:** Gelo e lentidão (ex: Tempestade de Gelo).\n- **Temperado:** Eletricidade e mobilidade (ex: Passo Nebuloso).\n- **Tropical:** Veneno e insetos (ex: Praga de Insetos)." 
        },
        { 
          nome: "Auxílio da Terra", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Forma Selvagem):** Você escolhe um ponto a 60 pés. Uma explosão de flores e espinhos de 10 pés de raio surge. Inimigos na área fazem Save de CON. Falha: 2d6 Dano Necrótico. Sucesso: Metade. Além disso, escolha UMA criatura na área para curar 2d6 PV.\n*(O dano e cura aumentam para 3d6 no Nv 10, e 4d6 no Nv 14).* " 
        }
      ],
      6: [
        { 
          nome: "Recuperação Natural", 
          tipoAcao: "livre", 
          desc: "**Descanso Curto:** 1x por dia em um Descanso Curto, você pode recuperar Slots de Magia gastos. A soma dos níveis dos slots recuperados pode ser igual a no máximo METADE do seu Nível de Druida.\n**Conjuração Gratuita:** 1x por dia, você pode conjurar UMA das suas Magias de Círculo sem gastar Slot." 
        }
      ],
      10: [
        { 
          nome: "Proteção da Natureza", 
          tipoAcao: "passiva", 
          desc: "Você ganha Imunidade total à condição *Envenenado*. Além disso, você ganha Resistência passiva a um dano baseado no Terreno escolhido no seu Descanso Longo:\n- **Árido:** Resistência a Fogo.\n- **Polar:** Resistência a Frio.\n- **Temperado:** Resistência a Elétrico/Raio.\n- **Tropical:** Resistência a Veneno." 
        }
      ],
      14: [
        { 
          nome: "Santuário da Natureza", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Forma Selvagem):** Cria uma área de 15 pés de árvores espectrais a 120 pés de você. Dura 1 min. Todos os aliados na área ganham Meia Cobertura (+2 de CA e Saves DES) e ganham a Resistência do seu Nv 10. Você pode mover as árvores até 60 pés gastando uma Ação Bônus." 
        }
      ]
    }
  },

  "Círculo da Lua (Moon)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos", "Raio Estelar"],
      nivel2: ["Raio de Lua"],
      nivel3: ["Conjurar Animais"],
      nivel4: ["Fonte de Luar"],
      nivel5: ["Curar Ferimentos em Massa"]
    },
    features: {
      3: [
        { 
          nome: "Formas de Combate", 
          tipoAcao: "passiva", 
          desc: "Sua Forma Selvagem vira letal:\n- Você se transforma como Ação Bônus.\n- Seu Limite de CR das feras sobe para (Seu Nível / 3).\n- Sua CA na forma animal vira (13 + Mod. SAB) se for maior que a do bicho.\n- Ao se transformar, em vez do PV normal de Druida, você ganha PV Temporários iguais a 3X O SEU NÍVEL DE DRUIDA." 
        },
        { 
          nome: "Magias da Lua", 
          tipoAcao: "passiva", 
          desc: "Suas magias bônus do Círculo da Lua estão sempre preparadas. Além disso, você PODE conjurar qualquer uma delas livremente enquanto estiver em Forma Selvagem." 
        }
      ],
      6: [
        { 
          nome: "Formas Aprimoradas", 
          tipoAcao: "passiva", 
          desc: "Na sua Forma Selvagem, você pode adicionar o seu Modificador de Sabedoria aos seus Saves de Constituição. Além disso, sempre que acertar um ataque na forma bestial, você pode escolher transformar o dano físico do bicho em Dano Radiante." 
        }
      ],
      10: [
        { 
          nome: "Passo do Luar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você teleporta até 30 pés e ganha Vantagem no seu próximo Ataque neste turno.\n*(Usos: Igual ao Mod. SAB por Descanso Longo, ou gaste um Slot de Nv 2+).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Forma Lunar", 
          tipoAcao: "passiva", 
          desc: "A luz destrói seus inimigos. 1x por turno, ao acertar um ataque em Forma Selvagem, você causa +2d10 de Dano Radiante extra. Além disso, ao usar seu *Passo do Luar*, você pode levar um aliado voluntário a 10 pés com você no teleporte." 
        }
      ]
    }
  },

  "Círculo do Mar (Sea)": {
    magiasBonus: {
      nivel1: ["Névoa Escurecedora", "Raio de Gelo", "Onda Trovejante"],
      nivel2: ["Lufada de Vento", "Respirar na Água"],
      nivel3: ["Relâmpago"],
      nivel4: ["Controlar a Água", "Tempestade de Gelo"],
      nivel5: ["Conjurar Elemental", "Imobilizar Monstro"]
    },
    features: {
      3: [
        { 
          nome: "Ira do Mar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Forma Selvagem):** Você cria uma aura de spray do mar de 5 pés ao seu redor por 10 min. No mesmo turno, e como Ação Bônus nos próximos turnos, você pode forçar um inimigo na aura a fazer Save de CON. Falha: Toma Dano de Frio igual a (Mod. SAB x d6) e é empurrado 15 pés para trás." 
        }
      ],
      6: [
        { 
          nome: "Afinidade Aquática", 
          tipoAcao: "passiva", 
          desc: "O raio da sua *Ira do Mar* aumenta para 10 pés (3m). Além disso, você ganha passivamente Deslocamento de Natação igual ao seu deslocamento de caminhada." 
        }
      ],
      10: [
        { 
          nome: "Nascido da Tormenta", 
          tipoAcao: "passiva", 
          desc: "Enquanto a sua *Ira do Mar* estiver ativa, você ganha Resistência a Dano de Frio, Elétrico (Raio) e Trovão, e também ganha Deslocamento de Voo igual à sua caminhada." 
        }
      ],
      14: [
        { 
          nome: "Dádiva Oceânica", 
          tipoAcao: "livre", 
          desc: "Ao ativar a *Ira do Mar*, em vez de colocar em si mesmo, você pode colocar a aura em um aliado a 60 pés (ele usará a sua CD e Sabedoria para causar dano). Se quiser, você pode queimar 2 usos da Forma Selvagem ao mesmo tempo para ativar a aura nele e em você simultaneamente." 
        }
      ]
    }
  },

  "Círculo das Estrelas (Stars)": {
    magiasBonus: {
      truques: ["Orientação"],
      nivel1: ["Raio Guiador"]
    },
    features: {
      3: [
        { 
          nome: "Mapa Estelar", 
          tipoAcao: "passiva", 
          desc: "Você tem um pequeno Mapa de estrelas (serve como Foco). Ele te dá *Orientação* e *Raio Guiador* preparadas. Você pode conjurar *Raio Guiador* de graça sem gastar slot um número de vezes igual ao seu Mod. de Sabedoria por Descanso Longo." 
        },
        { 
          nome: "Forma Estelar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Forma Selvagem):** Você vira uma constelação brilhante por 10 minutos. Escolha o efeito:\n- **Arqueiro:** No mesmo turno e nos próximos, Ação Bônus para atirar flecha de luz: Ataque mágico a 60 pés, causa 1d8 + Mod. SAB Radiante.\n- **Cálice:** Sempre que curar com magia, você mesmo (ou outro alvo a 30ft) se cura em 1d8 + Mod. SAB.\n- **Dragão:** Vantagem absurda. Qualquer Teste de INT/SAB e Save de CON para manter Concentração que você rolar 9 ou menos no dado, vira automaticamente um 10." 
        }
      ],
      6: [
        { 
          nome: "Presságio Cósmico", 
          tipoAcao: "reacao", 
          desc: "**No Descanso Longo:** Jogue 1d6. Se for Par, o dia é Boa Sorte (Weal). Ímpar é Má Sorte (Woe).\n**Reação (Máx: Mod. SAB por dia):** Quando alguém a 30 pés for rolar um Teste de d20:\n- **Weal:** Adiciona 1d6 na rolagem do aliado.\n- **Woe:** Subtrai 1d6 da rolagem do inimigo." 
        }
      ],
      10: [
        { 
          nome: "Constelações Cintilantes", 
          tipoAcao: "passiva", 
          desc: "Sua Forma Estelar atinge o ápice. O dano do *Arqueiro* e a cura do *Cálice* sobem de 1d8 para 2d8. Enquanto o *Dragão* estiver ativo, você ganha Voo de 20 pés. No início de cada turno, você pode trocar livremente qual Constelação está ativa em você." 
        }
      ],
      14: [
        { 
          nome: "Cheio de Estrelas", 
          tipoAcao: "passiva", 
          desc: "Enquanto a sua Forma Estelar estiver ativada, você fica parcialmente incorpóreo, ganhando Resistência a todos os danos físicos (Cortante, Perfurante e Contundente)." 
        }
      ]
    }
  },

  "Círculo dos Sonhos (Dreams)": {
    features: {
      3: [{ nome: "Bálsamo da Corte de Verão", desc: "Tem dados d6 (Nível). Bônus: Cura aliado e dá +1 PV Temp por dado." }],
      6: [{ nome: "Lar do Luar e Sombra", desc: "Descanso seguro. +5 Furtividade/Percepção na área." }],
      10: [{ nome: "Caminhos Ocultos", desc: "Bônus: Teleporte 60ft (você) ou Ação: 30ft (aliado)." }],
      14: [{ nome: "Caminhante dos Sonhos", desc: "Ao terminar Short Rest, casta Dream, Scrying ou Teleportation Circle sem slot." }]
    }
  },
  "Círculo do Pastor (Shepherd)": {
    features: {
      3: [
        { nome: "Fala dos Bosques", desc: "Fala Silvestre e com animais." },
        { nome: "Totem Espiritual", desc: "Bônus: Aura 30ft. Urso (PV Temp/Força), Falcão (Vantagem Ataque/Percepção) ou Unicórnio (Cura em área)." }
      ],
      6: [{ nome: "Conjurador Poderoso", desc: "Invocações têm +2 PV por dado e armas mágicas." }],
      10: [{ nome: "Espírito Guardião", desc: "Invocações na aura do totem curam (Nível/2) no fim do turno." }],
      14: [{ nome: "Invocações Fiéis", desc: "Se cair a 0 PV, conjura 4 bestas (Conjure Animals nv 9) para te proteger." }]
    }
  },
  "Círculo dos Esporos (Spores)": {
    magiasBonus: {
      truques: ["Toque Arrepiante"]
    },
    features: {
      3: [
        { nome: "Halo de Esporos", desc: "Reação: Dano Necrótico (1d4 a 1d10) em quem chega perto." },
        { nome: "Entidade Simbiótica", desc: "Ação (Gasta Wild Shape): Ganha 4 PV Temp por nível. Dobra dano do Halo e armas causam +1d6 necrótico." }
      ],
      6: [{ nome: "Infestação Fúngica", desc: "Reação se criatura morrer perto: Cria Zumbi com 1 PV." }],
      10: [{ nome: "Espalhar Esporos", desc: "Joga o Halo de Esporos a 30ft." }],
      14: [{ nome: "Corpo Fúngico", desc: "Imune a Cegueira, Surdez, Medo e Veneno. Críticos não te afetam." }]
    }
  },
  "Círculo do Fogo Selvagem (Wildfire)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos", "Mãos Flamejantes"]
    },
    features: {
      3: [
        { nome: "Invocar Espírito de Fogo", desc: "Ação (Gasta Wild Shape): Invoca pet de fogo. Ele ataca e teleporta aliados." },
        { nome: "Magias de Círculo", desc: "Burning Hands, Cure Wounds, Flaming Sphere, etc." }
      ],
      6: [{ nome: "Vínculo Aprimorado", desc: "+d8 em curas ou dano de fogo enquanto espírito está vivo." }],
      10: [{ nome: "Chamas Cauterizantes", desc: "Reação quando algo morre: Cura ou Dano na área." }],
      14: [{ nome: "Renascimento Flamejante", desc: "Se cair a 0 PV, sacrifica espírito para voltar com metade da vida." }]
    }
  },

  // --- MONGE (MONK) ---

  "Guerreiro da Misericórdia (Mercy)": {
    features: {
      3: [
        { 
          nome: "Mão de Cura", 
          tipoAcao: "acao", // ⚔️ Ação Mágica
          desc: "**Ação Mágica:** Você gasta 1 Ponto de Foco (Ki) para tocar uma criatura e curar PV igual a 1 rolagem do seu Dado de Artes Marciais + seu Modificador de Sabedoria.\n*(Dica: Ao usar a Rajada de Golpes, você pode substituir um dos ataques por um uso dessa habilidade sem gastar Foco pela cura).* " 
        },
        { 
          nome: "Mão de Dano", 
          tipoAcao: "livre", // 💨 Gatilho ao acertar
          desc: "**Gatilho:** 1x por turno, quando você acertar um Ataque Desarmado e causar dano.\n**Efeito:** Você pode gastar 1 Ponto de Foco (Ki) para causar dano Necrótico extra igual a 1 rolagem do Dado de Artes Marciais + seu Modificador de Sabedoria." 
        },
        { 
          nome: "Ferramentas de Misericórdia", 
          tipoAcao: "passiva",
          desc: "Você ganha proficiência nas perícias Medicina e Intuição, e também com o Kit de Herbalismo." 
        }
      ],
      6: [
        { 
          // 👇 O sistema vai ler "Mão de Cura" e colar lá na carta original!
          nome: "Mão de Cura (Upgrade Nv 6: Toque do Médico)", 
          tipoAcao: "passiva",
          desc: "Sua Mão de Cura agora também remove uma das seguintes condições do alvo: Cego, Surdo, Paralisado, Envenenado ou Atordoado." 
        },
        { 
          // 👇 O sistema vai ler "Mão de Dano" e colar na carta livre!
          nome: "Mão de Dano (Upgrade Nv 6: Toque do Médico)", 
          tipoAcao: "passiva",
          desc: "Sua Mão de Dano agora também deixa o alvo com a condição Envenenado (Poisoned) até o final do seu próximo turno." 
        }
      ],
      11: [
        { 
          nome: "Rajada de Misericórdia", 
          tipoAcao: "passiva",
          desc: "**Upgrade na Rajada de Golpes:** Quando você usar a Rajada de Golpes, você pode substituir CADA UM dos ataques desarmados por um uso da Mão de Cura (sem gastar Foco por ela). Além disso, se você acertar um ataque na Rajada, pode usar a Mão de Dano nele de graça (ainda restrito a 1 Mão de Dano por turno).\n*(Uso dos benefícios gratuitos: Igual ao seu Modificador de Sabedoria por Descanso Longo).* " 
        }
      ],
      17: [
        { 
          nome: "Mão da Misericórdia Suprema", 
          tipoAcao: "acao", // ⚔️ Gaveta de Ações Principais
          desc: "**Ação Mágica:** Você pode gastar 5 Pontos de Foco (Ki) para tocar o cadáver de uma criatura que morreu nas últimas 24 horas. Ela volta à vida recuperando um número de PV igual a 4d10 + seu Modificador de Sabedoria. As condições Cego, Surdo, Paralisado, Envenenado e Atordoado são curadas ao reviver.\n*(Uso: 1 vez por Descanso Longo).* " 
        }
      ]
    }
  },

  "Guerreiro das Sombras (Shadow)": {
    features: {
      3: [
        { 
          nome: "Artes das Sombras", 
          tipoAcao: "acao", // ⚔️ Usar magia gasta Ação
          desc: "**Passiva:** Você ganha Visão no Escuro (Darkvision) de 60 pés (se já tiver, aumenta em 60). Você aprende o truque *Ilusão Menor*.\n**Ação Mágica:** Você gasta 1 Ponto de Foco para conjurar *Escuridão (Darkness)* sem componentes materiais. Você enxerga normalmente dentro dessa escuridão mágica. No início de cada um de seus turnos, você pode mover a área da magia para um ponto a até 60 pés de você." 
        }
      ],
      6: [
        { 
          nome: "Passo das Sombras", 
          tipoAcao: "bonus", // ⚡ Gaveta de Ação Bônus!
          desc: "**Ação Bônus:** Enquanto estiver totalmente em Meia-luz (Dim Light) ou Escuridão, você pode se teleportar até 60 pés (18m) para outro espaço vazio que também esteja em meia-luz ou escuridão. Ao fazer isso, você tem Vantagem no seu próximo ataque corpo-a-corpo no turno atual." 
        }
      ],
      11: [
        { 
          nome: "Passo das Sombras (Upgrade Nv 11: Aprimorado)", 
          tipoAcao: "passiva", // Cola na Ação Bônus
          desc: "Você pode gastar 1 Ponto de Foco ao usar o Passo das Sombras para ignorar a exigência de estar em meia-luz/escuridão (tanto na origem quanto no destino). Como parte dessa mesma Ação Bônus, você pode fazer um Ataque Desarmado logo após se teleportar." 
        }
      ],
      17: [
        { 
          nome: "Manto de Sombras", 
          tipoAcao: "acao",
          desc: "**Ação Mágica:** Se estiver em Meia-luz ou Escuridão, gaste 3 Pontos de Foco para se envolver em sombras por 1 minuto (ou até terminar seu turno em Luz Plena / ficar Incapacitado). Benefícios:\n- Fica **Invisível**.\n- **Incorpóreo:** Move-se por espaços ocupados como se fossem terreno difícil (se terminar o turno dentro de alguém/algo, é empurrado pra fora e toma 1d10 de Energia).\n- Sua Rajada de Golpes não custa Foco (Ki)." 
        }
      ]
    }
  },

  "Guerreiro dos Elementos (Elements)": {
    features: {
      3: [
        { 
          nome: "Sintonia Elemental", 
          tipoAcao: "livre", // 💨 Agora não custa ação! (Ativa no começo do turno)
          desc: "**Gatilho (Início do seu turno):** Você gasta 1 Ponto de Foco para se sintonizar com os elementos por 10 minutos. Benefícios:\n- Seu alcance com ataques desarmados aumenta em 10 pés (+3m).\n- Ao acertar desarmado, escolha causar Ácido, Frio, Fogo, Elétrico ou Trovejante em vez do dano normal.\n- Se causar dano elemental, force o alvo a um Save de FOR. Falha: você o empurra ou o puxa 10 pés (3m)." 
        },
        { 
          nome: "Manipular Elementos", 
          tipoAcao: "passiva",
          desc: "Você aprende o truque *Elementalismo*. Sabedoria é seu atributo para ele." 
        }
      ],
      6: [
        { 
          nome: "Explosão Elemental", 
          tipoAcao: "acao", // ⚔️ Ação Mágica
          desc: "**Ação Mágica:** Você gasta 2 Pontos de Foco para criar uma esfera elemental de 20 pés centrada num ponto a até 120 pés de você. Escolha Ácido, Frio, Fogo, Elétrico ou Trovejante. Alvos na área fazem Save de DEX. Falha: Sofrem dano igual a 3 rolagens do seu Dado de Artes Marciais. Sucesso: Metade do dano." 
        }
      ],
      11: [
        { 
          nome: "Sintonia Elemental (Upgrade Nv 11: Passo dos Elementos)", 
          tipoAcao: "passiva",
          desc: "Enquanto a sua Sintonia Elemental estiver ativa, você também possui deslocamento de Voo e de Natação iguais ao seu deslocamento base." 
        }
      ],
      17: [
        { 
          nome: "Sintonia Elemental (Upgrade Nv 17: Epítome)", 
          tipoAcao: "passiva",
          desc: "Benefícios extras da Sintonia Elemental ativa:\n- **Resistência:** Escolha um elemento para resistir (pode trocar no início do turno).\n- **Golpe Empoderado (1x/turno):** Causa 1 Dado de Artes Marciais de dano elemental extra ao acertar desarmado.\n- Ao usar *Passo do Vento*, sua velocidade aumenta em +20 pés e criaturas que você passar a 5 pés de distância sofrem 1 Dado Marcial de dano elemental." 
        }
      ]
    }
  },

  "Guerreiro da Mão Aberta (Open Hand)": {
    features: {
      3: [
        { 
          nome: "Técnica da Mão Aberta", 
          tipoAcao: "livre", // 💨 Gatilho ao acertar Rajada de Golpes
          desc: "**Gatilho:** Sempre que você acertar um ataque provindo da sua Rajada de Golpes.\n**Efeito:** Você impõe um efeito extra ao alvo:\n- **Confundir:** O alvo não pode realizar Ataques de Oportunidade até o início do próximo turno dele.\n- **Empurrar:** O alvo faz Save de FOR ou é empurrado 15 pés (4,5m).\n- **Derrubar:** O alvo faz Save de DEX ou cai Caído (Prone)." 
        }
      ],
      6: [
        { 
          nome: "Integridade Corporal", 
          tipoAcao: "bonus", // ⚡ Ação Bônus de cura
          desc: "**Ação Bônus:** Você recupera PV iguais a 1 rolagem do seu Dado de Artes Marciais + seu Modificador de Sabedoria.\n*(Uso: Igual ao seu Modificador de Sabedoria por Descanso Longo).* " 
        }
      ],
      11: [
        { 
          nome: "Passo Veloz", 
          tipoAcao: "passiva", // É uma passiva poderosa de economia de ação
          desc: "Sempre que você utilizar uma Ação Bônus qualquer que NÃO seja o *Passo do Vento*, você pode usar o *Passo do Vento* imediatamente após ela." 
        }
      ],
      17: [
        { 
          nome: "Palma Vibrante", 
          tipoAcao: "livre", // 💨 Pode usar como livre (implantar) e misturado na Ação (detonar)
          desc: "**Implantar:** Ao acertar um Ataque Desarmado, gaste 4 Foco para implantar uma vibração letal por um número de dias igual ao seu Nível de Monge (restrito a 1 alvo vivo por vez).\n**Detonar:** Você pode usar sua **Ação**, OU **abdicar de 1 dos seus ataques** durante sua Ação de Ataque para detoná-la. O alvo faz um Save de CON. Falha: Sofre 10d12 de dano de Força (Force). Sucesso: Metade." 
        }
      ]
    }
  },

  "Caminho da Longa Morte (Long Death)": {
    features: {
      3: [
        { 
          nome: "Toque da Morte", 
          tipoAcao: "livre", // 💨 Gatilho de Sobrevivência
          desc: "**Gatilho:** Você reduz uma criatura a 0 Pontos de Vida (ela deve estar a até 5 pés/1,5m de você).\n**Efeito:** Você extrai a vitalidade dela, ganhando Pontos de Vida Temporários iguais ao seu Modificador de Sabedoria + seu Nível de Monge (mínimo de 1)." 
        }
      ],
      6: [
        { 
          nome: "Hora da Colheita", 
          tipoAcao: "acao", // ⚔️ Ação
          desc: "**Ação:** Você revela uma aura aterrorizante. Cada criatura a até 30 pés (9m) de você que possa te ver deve ser bem sucedida num Save de Sabedoria ou ficará Amedrontada (Frightened) de você até o final do seu próximo turno." 
        }
      ],
      11: [
        { 
          nome: "Maestria da Morte", 
          tipoAcao: "livre", // 💨 Gatilho (Não gasta Reação!)
          desc: "**Gatilho:** Você sofre dano que reduziria seus Pontos de Vida a 0.\n**Efeito:** Você pode gastar 1 Ponto de Foco (Ki) para, em vez disso, ficar com 1 Ponto de Vida. Você pode usar isso múltiplas vezes no mesmo turno, gastando 1 Ki a cada vez que for zerado." 
        }
      ],
      17: [
        { 
          nome: "Toque da Longa Morte", 
          tipoAcao: "acao", // ⚔️ Ação
          desc: "**Ação:** Você toca uma criatura a até 5 pés de você e canaliza energia letal. Você pode gastar de 1 a 10 Pontos de Foco (Ki). O alvo faz um Save de Constituição. Falha: Sofre 2d10 de dano Necrótico para CADA Ponto de Foco gasto. Sucesso: Metade do dano." 
        }
      ]
    }
  },

  "Caminho da Alma Solar (Sun Soul)": {
    features: {
      3: [
        { 
          nome: "Raio Solar Radiant", 
          tipoAcao: "livre", // 💨 Substitui ataque / Tem uso de Ação Bônus embutido
          desc: "**Ataque Especial:** Você pode disparar feixes de luz (Alcance 30 pés). Você usa Destreza, e o dano é igual a 1 rolagem do seu Dado Marcial, tipo Radiante. Você pode substituir qualquer um dos seus ataques na Ação de Ataque por esse disparo.\n**Ação Bônus:** Se usar a Ação de Ataque para fazer pelo menos um disparo, você pode gastar 1 Ponto de Foco (Ki) para fazer mais 2 disparos solares como Ação Bônus." 
        }
      ],
      6: [
        { 
          nome: "Golpe do Arco Flamejante", 
          tipoAcao: "bonus", // ⚡ Ação Bônus
          desc: "**Ação Bônus:** Imediatamente após você realizar a Ação de Ataque no seu turno, você pode gastar 2 Pontos de Foco (Ki) para conjurar *Mãos Flamejantes (Burning Hands)*. Você pode gastar até 3 pontos de Ki extras para aumentar o nível da magia em +1 para cada ponto gasto." 
        }
      ],
      11: [
        { 
          nome: "Explosão Solar", 
          tipoAcao: "acao", // ⚔️ Ação Principal
          desc: "**Ação:** Você cria um globo de luz a até 150 pés (45m) que explode num raio de 20 pés. Alvos fazem Save de Constituição. Falha: Sofrem 2d6 de dano Radiante (ou metade num sucesso).\n*(Você pode gastar até 3 Pontos de Foco. O dano aumenta em +2d6 para cada Ki gasto).* " 
        }
      ],
      17: [
        { 
          nome: "Escudo Solar", 
          tipoAcao: "reacao", // 🛡️ Reação e Bônus
          desc: "**Ação Bônus:** Você pode acender ou apagar uma aura de luz brilhante de 30 pés em torno de você.\n**Reação:** Enquanto a aura estiver brilhando, se uma criatura acertar um ataque corpo-a-corpo em você, use sua Reação para causar dano Radiante nela igual a 5 + seu Modificador de Sabedoria." 
        }
      ]
    }
  },

  "Caminho do Eu Astral (Astral Self)": {
    features: {
      3: [
        { 
          nome: "Braços Astrais", 
          tipoAcao: "bonus", // ⚡ Ação Bônus + Dano em Área
          desc: "**Ação Bônus:** Gaste 1 Ponto de Foco para invocar seus braços astrais por 10 minutos. Ao ativá-los, criaturas a até 10 pés fazem Save de DEX ou tomam dano de Energia (Force) igual a 2x seu Dado Marcial.\n**Passivas:** Com os braços ativos, você usa Sabedoria para testes/saves de Força e para as rolagens de ataque/dano desarmado. Seus ataques desarmados ganham +5 pés de alcance e causam dano de Energia." 
        }
      ],
      6: [
        { 
          nome: "Semblante Astral", 
          tipoAcao: "bonus", // ⚡ Ação Bônus
          desc: "**Ação Bônus:** Gaste 1 Ponto de Foco para invocar a Máscara Astral por 10 minutos (pode invocar junto com os Braços pagando 1 Ki extra). Você ganha:\n- Visão no escuro (mágica e normal) a 120 pés.\n- Vantagem em testes de Intuição e Intimidação.\n- Pode direcionar sua voz a apenas 1 alvo a 60 pés, ou amplificar para todos a 600 pés." 
        }
      ],
      11: [
        { 
          nome: "Corpo Astral", 
          tipoAcao: "reacao", // 🛡️ Reação defensiva
          desc: "Sua armadura astral surge automaticamente quando a Máscara e os Braços estiverem ativos juntos.\n- **Defletir Energia (Reação):** Ao sofrer dano de Ácido, Frio, Fogo, Energia, Elétrico ou Trovejante, reduza-o em 1d10 + Mod. Sabedoria.\n- **Golpe Empoderado:** 1x por turno, cause +1 Dado Marcial de dano extra ao acertar com os Braços Astrais." 
        }
      ],
      17: [
        { 
          nome: "Eu Astral Desperto", 
          tipoAcao: "bonus", // ⚡ Ação Bônus (5 Ki para tudo)
          desc: "**Ação Bônus:** Gaste 5 Pontos de Foco para invocar seu Eu Astral completo (Braços, Máscara e Corpo) por 10 minutos.\n**Benefícios Extras:**\n- Ganha +2 na CA.\n- Quando usar o Ataque Extra e atacar APENAS com os braços astrais, você pode atacar 3 vezes em vez de 2." 
        }
      ]
    }
  },

  "Caminho do Dragão Ascendente (Ascendant Dragon)": {
    features: {
      3: [
        { 
          nome: "Discípulo Dracônico", 
          tipoAcao: "reacao", // 🛡️ Reação de Social / Dano Passivo
          desc: "**Passivas:** Aprende idioma Dracônico. Ao acertar um Ataque Desarmado, pode mudar o dano para Ácido, Frio, Fogo, Elétrico ou Veneno.\n**Reação:** Se falhar num teste de Intimidação ou Persuasão, pode rerolar (1x por Descanso Longo)." 
        },
        { 
          nome: "Sopro do Dragão", 
          tipoAcao: "livre", // 💨 Substitui 1 ataque
          desc: "**Ação Especial:** Ao usar a Ação de Ataque, substitua UM ataque por um sopro (Cone de 20 pés ou Linha de 30 pés). Alvos fazem Save de DEX. Falha: Tomam 2 rolagens do Dado Marcial em dano elemental. Sucesso: Metade.\n*(Usos: Igual ao seu Bônus de Proficiência. Após acabar, gaste 2 Ki por uso).* " 
        }
      ],
      6: [
        { 
          nome: "Asas Desfraldadas", 
          tipoAcao: "passiva", // Anexa no Passo do Vento
          desc: "Quando usar o *Passo do Vento*, você pode abrir asas espectrais. Você ganha deslocamento de Voo igual à sua caminhada até o fim do turno.\n*(Usos: Igual ao seu Bônus de Proficiência por Descanso Longo).* " 
        }
      ],
      11: [
        { 
          nome: "Aspecto da Serpe", 
          tipoAcao: "bonus", // ⚡ Ação Bônus (Aura)
          desc: "**Ação Bônus:** Crie uma aura de 10 pés por 1 minuto. Escolha:\n- **Presença (Ação Bônus contínua):** Todo turno, force 1 criatura na aura a um Save de Sabedoria ou ficará Amedrontada.\n- **Resistência:** Você e aliados na aura ganham Resistência a um elemento dracônico à sua escolha.\n*(1x grátis por Descanso Longo. Após isso, gaste 3 Ki por uso).*" 
        },
        { 
          // 👇 O sistema vai upar a carta do Sopro!
          nome: "Sopro do Dragão (Upgrade Nv 11)", 
          tipoAcao: "passiva",
          desc: "O dano base do seu Sopro do Dragão aumenta para 3 rolagens do Dado Marcial." 
        }
      ],
      17: [
        { 
          nome: "Aspecto Ascendente", 
          tipoAcao: "passiva",
          desc: "Seu dragão desperta:\n- **Visão:** Ganha Percepção às Cegas (Blindsight) a 10 pés.\n- **Sopro Supremo:** Você pode gastar 1 Ki extra ao soprar para virar Cone de 60 pés ou Linha de 90 pés e aumentar o dano para 4 rolagens do Dado Marcial.\n- **Fúria Explosiva:** Ao ativar o Aspecto da Serpe, qualquer número de criaturas à sua escolha na aura fazem Save de DEX ou sofrem 3d10 de dano elemental." 
        }
      ]
    }
  },

  "Caminho do Mestre Bêbado (Drunken Master)": {
    features: {
      3: [
        { 
          nome: "Proficiências Bônus", 
          tipoAcao: "passiva",
          desc: "Você ganha proficiência na perícia Performance (Atuação) e com as Ferramentas de Cervejeiro (Brewer's Supplies)." 
        },
        { 
          nome: "Técnica Bêbada", 
          tipoAcao: "passiva", 
          desc: "**Upgrade na Rajada de Golpes:** Sempre que você utilizar a sua *Rajada de Golpes* (Ação Bônus), você recebe os benefícios da ação de Desengajar (Disengage) gratuitamente, e seu deslocamento aumenta em +10 pés (+3m) até o fim do turno." 
        }
      ],
      6: [
        { 
          nome: "Ginga Embriagada", 
          tipoAcao: "reacao", // 🛡️ A reação brilha na tela!
          desc: "**Passiva (Levantar Rápido):** Quando você estiver Caído (Prone), você pode se levantar gastando apenas 5 pés do seu deslocamento (em vez de metade do deslocamento total).\n**Reação (Redirecionar Ataque):** Quando uma criatura errar um ataque corpo-a-corpo contra você, você pode usar sua Reação e gastar 1 Ponto de Foco (Ki) para forçar esse ataque a atingir outra criatura à sua escolha que você possa ver a até 5 pés de você." 
        }
      ],
      11: [
        { 
          nome: "Sorte de Bêbado", 
          tipoAcao: "livre",
          desc: "**Gatilho:** Você rola um Teste de Atributo, Teste de Resistência (Save) ou Jogada de Ataque com Desvantagem.\n**Efeito:** Você pode gastar 2 Pontos de Foco (Ki) para cancelar a Desvantagem dessa rolagem." 
        }
      ],
      17: [
        { 
          nome: "Frenesi Intoxicado", 
          tipoAcao: "passiva",
          desc: "**Upgrade na Rajada de Golpes:** Quando você usar sua *Rajada de Golpes*, você pode realizar até 3 Ataques Desarmados adicionais com ela (totalizando até 5 ataques na Ação Bônus), contanto que CADA UM dos ataques da Rajada seja feito contra uma criatura diferente neste turno." 
        }
      ]
    }
  },

  "Caminho do Kensei (Kensei)": {
    escolhasNivel3: [
      { titulo: "Arma Kensei 1 (Corpo-a-corpo)", tipo: "arma", opcoes: opcoesDeArmas },
      { titulo: "Arma Kensei 2 (À distância)", tipo: "arma", opcoes: opcoesDeArmas }
    ],
    escolhasNivel6: [
      { titulo: "Nova Arma Kensei (Nv 6)", tipo: "arma", opcoes: opcoesDeArmas }
    ],
    escolhasNivel11: [
      { titulo: "Nova Arma Kensei (Nv 11)", tipo: "arma", opcoes: opcoesDeArmas }
    ],
    escolhasNivel17: [
      { titulo: "Nova Arma Kensei (Nv 17)", tipo: "arma", opcoes: opcoesDeArmas }
    ],
    features: {
      3: [
        { 
          nome: "Caminho do Kensei", 
          tipoAcao: "passiva",
          desc: "**Armas Kensei:** Escolha duas armas (uma corpo-a-corpo e uma à distância) que não possuam a propriedade Pesada (Heavy) ou Especial (Special). O Arco Longo também é válido. Você ganha proficiência com elas e elas viram Armas de Monge para você (você pode escolher +1 arma nova nos níveis 6, 11 e 17).\n**Caminho do Pincel:** Você ganha proficiência com Suprimentos de Calígrafo ou Suprimentos de Pintor." 
        },
        { 
          nome: "Defesa Ágil", 
          tipoAcao: "livre",
          desc: "**Gatilho:** No seu turno, se você fizer um Ataque Desarmado como parte da sua Ação de Ataque e estiver segurando uma Arma Kensei corpo-a-corpo.\n**Efeito:** Você ganha +2 de bônus na sua Classe de Armadura (CA) até o início do seu próximo turno (desde que continue segurando a arma e não fique Incapacitado)." 
        },
        { 
          nome: "Tiro do Kensei", 
          tipoAcao: "bonus", // ⚡ Ação Bônus de Atirador
          desc: "**Ação Bônus:** Você foca sua mira. Até o final do turno atual, qualquer ataque à distância que você acertar usando uma Arma Kensei causará +1d4 de dano extra do mesmo tipo da arma." 
        }
      ],
      6: [
        { 
          nome: "Um com a Lâmina", 
          tipoAcao: "livre", // 💨 Ação Livre de Dano + Passiva
          desc: "**Passiva (Armas Mágicas):** Seus ataques com Armas Kensei agora contam como mágicos para superar resistências e imunidades.\n**Gatilho (Golpe Hábil):** Uma vez por turno, ao acertar um alvo com uma Arma Kensei, você pode gastar 1 Ponto de Foco (Ki) para causar dano extra igual a uma rolagem do seu Dado de Artes Marciais." 
        }
      ],
      11: [
        { 
          nome: "Afiar a Lâmina", 
          tipoAcao: "bonus", // ⚡ Ação Bônus
          desc: "**Ação Bônus:** Você gasta até 3 Pontos de Foco (Ki) para infundir uma Arma Kensei que você tocar. Por 1 minuto, a arma ganha um bônus nas rolagens de ataque e de dano igual à quantidade de Ki gasto. Esse bônus **não tem efeito** se a arma já for um item mágico que concede bônus em ataque e dano." 
        }
      ],
      17: [
        { 
          nome: "Precisão Infalível", 
          tipoAcao: "livre",
          desc: "**Gatilho:** Uma vez por turno, se você errar uma rolagem de ataque utilizando uma Arma de Monge (incluindo Armas Kensei) durante o seu turno.\n**Efeito:** Você pode rolar o ataque novamente." 
        }
      ]
    }
  },

  // --- PALADINO (PALADIN) ---

  "Juramento da Devoção (Devotion)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal", "Escudo da Fé"],
      nivel2: ["Auxílio", "Zona da Verdade"],
      nivel3: ["Farol de Esperança", "Dissipar Magia"],
      nivel4: ["Movimentação Livre", "Guardião da Fé"],
      nivel5: ["Comunhão", "Coluna de Chamas"]
    },
    features: {
      3: [
        { 
          nome: "CD: Arma Sagrada", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Ao realizar a Ação de Ataque, você imbui sua arma corpo a corpo com energia pura por 10 minutos.\n**Efeito:** Você soma o seu Modificador de Carisma (mínimo de +1) nas suas rolagens de Ataque com a arma. Sempre que acertar, você pode escolher se o dano será o normal da arma ou Dano Radiante. A arma emite luz brilhante em 20 pés." 
        }
      ],
      7: [
        { 
          nome: "Aura de Devoção", 
          tipoAcao: "passiva", 
          desc: "Você e todos os seus aliados que estiverem dentro do alcance da sua *Aura de Proteção* recebem imunidade total à condição *Enfeitiçado* (Charmed)." 
        }
      ],
      15: [
        { 
          nome: "Destruição Protetora", 
          tipoAcao: "passiva", 
          desc: "Sua magia resplandece defesa. Sempre que você conjurar a magia *Destruição Divina* (Divine Smite), você e todos os aliados dentro da sua *Aura de Proteção* ganham os benefícios de Meia Cobertura (+2 de CA e +2 em Saves de Destreza) até o início do seu próximo turno." 
        }
      ],
      20: [
        { 
          nome: "Nimbo Sagrado", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você emana luz solar brilhante na sua Aura por 10 minutos.\n- Vantagem em qualquer Teste de Resistência forçado por um Corruptor (Fiend) ou Morto-Vivo.\n- Inimigos que começarem o turno dentro da Aura tomam Dano Radiante automático igual a (Mod. CAR + Bônus de Proficiência).\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento da Glória (Glory)": {
    magiasBonus: {
      nivel1: ["Raio Guiador", "Heroísmo"],
      nivel2: ["Melhorar Habilidade", "Arma Mágica"],
      nivel3: ["Velocidade", "Proteção contra Energia"],
      nivel4: ["Compulsão", "Movimentação Livre"],
      nivel5: ["Lendas e Histórias", "Presença Régia de Yolande"]
    },
    features: {
      3: [
        { 
          nome: "CD: Destruição Inspiradora", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Imediatamente após você conjurar a magia *Destruição Divina* (Divine Smite).\n**Efeito:** Você distribui PV Temporários num total de (2d8 + Nível de Paladino) divididos como você quiser entre quaisquer aliados a até 30 pés (incluindo você)." 
        },
        { 
          nome: "CD: Atleta Inigualável", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Seu corpo vira uma máquina perfeita por 1 hora. Você ganha Vantagem em testes de Atletismo e Acrobacia, e a distância dos seus Saltos longos e em altura aumenta em 10 pés." 
        }
      ],
      7: [
        { 
          nome: "Aura de Rapidez", 
          tipoAcao: "passiva", 
          desc: "Sua velocidade de movimento aumenta passivamente em +10 pés. Além disso, sempre que um aliado entrar na sua *Aura de Proteção* pela primeira vez no turno, ou começar o turno lá dentro, a velocidade dele também aumenta em +10 pés até o fim do próximo turno." 
        }
      ],
      15: [
        { 
          nome: "Defesa Gloriosa", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você (ou um aliado a até 10 pés) for atingido por um ataque, você adiciona o seu Modificador de Carisma na CA do alvo. Se isso fizer o ataque errar, você pode imediatamente fazer 1 Ataque com Arma contra o atacante (se ele estiver no seu alcance).\n*(Usos: Igual ao Mod. CAR por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      20: [
        { 
          nome: "Lenda Viva", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 10 minutos, você encarna suas lendas:\n- Ganha Vantagem em todos os testes de Carisma.\n- Se falhar num Save, pode usar Reação para rerolar (deve usar o novo resultado).\n- 1x por turno, se errar um ataque armado, você pode transformá-lo num acerto automático.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento dos Anciões (Ancients)": {
    magiasBonus: {
      nivel1: ["Golpe Constritor", "Falar com Animais"],
      nivel2: ["Passo Nebuloso", "Raio de Lua"],
      nivel3: ["Crescimento de Plantas", "Proteção contra Energia"],
      nivel4: ["Tempestade de Gelo", "Pele de Pedra"],
      nivel5: ["Comunhão com a Natureza", "Caminho em Árvore"]
    },
    features: {
      3: [
        { 
          nome: "CD: Ira da Natureza", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Você conjura vinhas espectrais. Inimigos à sua escolha num raio de 15 pés fazem Save de FOR. Falha: Ficam *Impedidos* (Restrained) por 1 minuto. O alvo pode repetir o Save no fim de cada turno dele." 
        }
      ],
      7: [
        { 
          nome: "Aura de Proteção Ancestral", 
          tipoAcao: "passiva", 
          desc: "A magia primordial paira sobre você. Você e todos os aliados dentro da sua *Aura de Proteção* ganham Resistência contra Dano Necrótico, Psíquico e Radiante." 
        }
      ],
      15: [
        { 
          nome: "Sentinela Imortal", 
          tipoAcao: "livre", 
          desc: "Sempre que você for reduzido a 0 PV e não morrer na hora, você cai para 1 PV e se cura numa quantidade igual a (3x Nível de Paladino). Além disso, você para de envelhecer visualmente e não pode ter a idade alterada por magia.\n*(Cura mortal: 1x por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      20: [
        { 
          nome: "Campeão Ancião", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto você vira a fúria da natureza:\n- Inimigos na sua aura recebem Desvantagem nos Saves contra suas magias e CD.\n- No início de cada turno seu, você cura 10 PV automaticamente.\n- Você pode conjurar magias que custam 1 Ação usando apenas uma Ação Bônus.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento dos Gênios Nobres (Noble Genies)": {
    magiasBonus: {
      truques: ["Elementalismo"],
      nivel1: ["Orbe Cromática", "Destruição Trovejante"],
      nivel2: ["Reflexos", "Força Fantasmagórica"],
      nivel3: ["Voo", "Forma Gasosa"],
      nivel4: ["Conjurar Elementais Menores", "Invocar Elemental"],
      nivel5: ["Destruição Banidora", "Contato Extraplanar"]
    },
    features: {
      3: [
        { 
          nome: "Esplendor do Gênio", 
          tipoAcao: "passiva", 
          desc: "Enquanto não estiver usando armadura (pode usar escudo), sua CA será = 10 + Destreza + Carisma. Você também ganha Proficiência em Acrobacia, Intimidação, Performance ou Persuasão." 
        },
        { 
          nome: "CD: Destruição Elemental", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Imediatamente após você conjurar a magia *Destruição Divina* (Divine Smite).\n**Efeito:** Escolha um espírito genje:\n- **Dao (Terra):** Alvo fica *Agarrado* e *Impedido* na terra.\n- **Djinni (Ar):** Você teleporta 30 pés e fica incorpóreo (Resiste a danos físicos e fica imune a agarrão/caído) até o fim do seu próximo turno.\n- **Efreeti (Fogo):** Alvo toma +2d4 Dano de Fogo e o fogo pula para outro inimigo (mais 2d4 de dano).\n- **Marid (Água):** Alvo do Smite e inimigos a 10 pés de você fazem Save de FOR ou são empurrados 15 pés e caem *Derrubados*." 
        }
      ],
      7: [
        { 
          nome: "Aura de Escudo Elemental", 
          tipoAcao: "livre", 
          desc: "Você escolhe Ácido, Frio, Fogo, Elétrico ou Trovão. Você e os aliados na sua Aura têm Resistência a esse elemento. No INÍCIO de cada turno seu, você pode trocar o elemento da Resistência sem gastar ação." 
        }
      ],
      15: [
        { 
          nome: "Repreensão Elemental", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você sofrer um ataque, corte o dano PELA METADE. O atacante faz um Save de DES. Falha: Ele sofre Dano (de um dos 5 elementos à sua escolha) igual a 2d10 + Mod CAR. Sucesso: Metade.\n*(Usos: Igual ao Mod. CAR por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      20: [
        { 
          nome: "Descendente Nobre", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 10 minutos, você ganha Voo de 60 pés (podendo pairar). Além disso, sempre que você ou um aliado na sua Aura falhar em uma rolagem de D20, você pode usar uma Reação para transformar essa falha num sucesso absoluto.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento da Vingança (Vengeance)": {
    magiasBonus: {
      nivel1: ["Perdição", "Marca do Caçador"],
      nivel2: ["Imobilizar Pessoa", "Passo Nebuloso"],
      nivel3: ["Velocidade", "Proteção contra Energia"],
      nivel4: ["Banimento", "Porta Dimensional"],
      nivel5: ["Imobilizar Monstro", "Vidência"]
    },
    features: {
      3: [
        { 
          nome: "CD: Voto de Inimizade", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Ao realizar a Ação de Ataque.\n**Efeito:** Fure um inimigo a 30 pés com o olhar. Por 1 minuto, você tem Vantagem em TODOS os ataques contra ele. Se a criatura chegar a 0 PV antes de acabar, você pode transferir a maldição para outro alvo a 30 pés sem gastar ação." 
        }
      ],
      7: [
        { 
          nome: "Vingador Implacável", 
          tipoAcao: "reacao", 
          desc: "Seu foco bloqueia rotas de fuga. Quando você acertar um Ataque de Oportunidade, o deslocamento do inimigo é reduzido para ZERO até o final do turno dele. Como parte dessa mesma Reação, você pode se mover até metade da sua velocidade (sem provocar ataque de oportunidade)." 
        }
      ],
      15: [
        { 
          nome: "Alma da Vingança", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Imediatamente após a criatura afetada pelo seu *Voto de Inimizade* (Nível 3) realizar um ataque (acertando ou errando), você pode usar sua Reação para fazer um ataque corpo a corpo contra ela (se estiver no seu alcance)." 
        }
      ],
      20: [
        { 
          nome: "Anjo Vingador", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você invoca asas de vingança por 10 minutos:\n- Ganha Deslocamento de Voo de 60 pés.\n- Inimigos que começarem o turno na sua Aura de Proteção fazem Save de SAB ou ficam *Amedrontados* (Frightened) por 1 minuto. Você tem Vantagem nos ataques contra eles.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento da Conquista (Conquest)": {
    magiasBonus: {
      nivel1: ["Armadura de Agathys", "Comando"],
      nivel2: ["Imobilizar Pessoa", "Arma Espiritual"],
      nivel3: ["Rogar Maldição", "Medo"],
      nivel4: ["Dominar Besta", "Pele de Pedra"],
      nivel5: ["Névoa Mortal", "Dominar Pessoa"]
    },
    features: {
      3: [
        { 
          nome: "CD: Presença Conquistadora", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Você exala uma aura aterrorizante. Inimigos à sua escolha a 30 pés fazem Save de SAB. Falha: Ficam *Amedrontados* (Frightened) por 1 minuto. Eles podem repetir o save no fim de cada turno deles." 
        },
        { 
          nome: "CD: Golpe Guiado", 
          tipoAcao: "livre", 
          desc: "**Gatilho (Gasta Canalizar Divindade):** Quando você faz uma rolagem de ataque (antes do mestre dizer se acertou ou não), você pode invocar precisão sobrenatural para ganhar um bônus imediato de +10 naquela rolagem." 
        }
      ],
      7: [
        { 
          nome: "Aura da Conquista", 
          tipoAcao: "passiva", 
          desc: "Você emana uma aura opressora. Qualquer inimigo que estiver *Amedrontado* (Frightened) por você tem o seu Deslocamento reduzido a ZERO enquanto estiver dentro da sua *Aura de Proteção*. Além disso, se ele começar o turno na aura, sofre Dano Psíquico igual a metade do seu Nível de Paladino." 
        }
      ],
      15: [
        { 
          nome: "Repreensão Desdenhosa", 
          tipoAcao: "passiva", 
          desc: "Aqueles que ousam te atacar são punidos. Sempre que uma criatura te acertar com um ataque, ela automaticamente sofre Dano Psíquico igual ao seu Modificador de Carisma (mínimo 1)." 
        }
      ],
      20: [
        { 
          nome: "Conquistador Invencível", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto, você vira o avatar da conquista:\n- Você ganha Resistência a TODOS os tipos de dano.\n- Quando usar a Ação de Ataque, pode fazer 1 ataque extra.\n- Seus ataques com arma corpo a corpo causam Acerto Crítico tirando 19 ou 20 no dado.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento da Coroa (Crown)": {
    magiasBonus: {
      nivel1: ["Comando", "Duelo Compelido"],
      nivel2: ["Vínculo Protetor", "Zona da Verdade"],
      nivel3: ["Aura de Vitalidade", "Guardiões Espirituais"],
      nivel4: ["Banimento", "Guardião da Fé"],
      nivel5: ["Círculo de Poder", "Missão"]
    },
    features: {
      3: [
        { 
          nome: "CD: Desafio do Campeão", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Você desafia inimigos a 30 pés. Eles fazem Save de SAB. Falha: A criatura não pode se afastar mais de 30 pés de você voluntariamente. O efeito acaba se você morrer, ficar incapacitado ou for empurrado para longe." 
        },
        { 
          nome: "CD: Virar a Maré", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Você fortalece aliados feridos. Escolha criaturas a 30 pés. Se elas estiverem com no máximo METADE dos seus Pontos de Vida, elas se curam em (1d6 + Mod. CAR)." 
        }
      ],
      7: [
        { 
          nome: "Lealdade Divina", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 5 pés de você for tomar dano, você usa a própria saúde como escudo. A criatura não toma dano nenhum, e VOCÊ recebe 100% daquele dano no lugar dela. (Esse dano que você toma não pode ser reduzido de forma alguma)." 
        }
      ],
      15: [
        { 
          nome: "Santo Inabalável", 
          tipoAcao: "passiva", 
          desc: "Sua dedicação o mantém firme. Você possui Vantagem em qualquer Teste de Resistência contra efeitos que te deixariam *Paralisado* ou *Atordoado*." 
        }
      ],
      20: [
        { 
          nome: "Campeão Exaltado", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 hora, você é a inspiração da lei:\n- Ganha Resistência a dano de armas Não-Mágicas (Cortante, Perfurante, Contundente).\n- Seus aliados a 30 pés ganham Vantagem nos Testes de Resistência contra Morte e de Sabedoria.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Juramento da Redenção (Redemption)": {
    magiasBonus: {
      nivel1: ["Santuário", "Sono"],
      nivel2: ["Acalmar Emoções", "Imobilizar Pessoa"],
      nivel3: ["Contramágica", "Padrão Hipnótico"],
      nivel4: ["Esfera Resiliente de Otiluke", "Pele de Pedra"],
      nivel5: ["Imobilizar Monstro", "Muralha de Força"]
    },
    features: {
      3: [
        { 
          nome: "CD: Emissário da Paz", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus (Gasta Canalizar Divindade):** Por 10 minutos, você exala diplomacia. Você ganha um bônus fixo de +5 em qualquer Teste de Persuasão que fizer nesse período." 
        },
        { 
          nome: "CD: Repreender o Violento", 
          tipoAcao: "reacao", 
          desc: "**Reação (Gasta Canalizar Divindade):** Imediatamente após um atacante a 30 pés causar dano em outra criatura que não seja você, force-o a um Save de SAB. Falha: O atacante sofre Dano Radiante EXATAMENTE IGUAL ao dano que ele acabou de causar. Sucesso: Metade." 
        }
      ],
      7: [
        { 
          nome: "Aura do Guardião", 
          tipoAcao: "reacao", 
          desc: "**Reação:** O alcance é de 10 pés (Sobe para 30 pés no Nv 18). Quando uma criatura na aura sofrer dano, você magicamente absorve 100% daquele dano para você em vez da criatura. (Esse dano não pode ser reduzido de nenhuma forma)." 
        }
      ],
      15: [
        { 
          nome: "Espírito Protetor", 
          tipoAcao: "passiva", 
          desc: "Sua vida se restaura pela sua pureza. No final de cada um dos seus turnos, se você estiver com MENOS da metade da sua vida máxima (e não estiver incapacitado), você regenera (1d6 + Metade do seu Nível de Paladino) Pontos de Vida." 
        }
      ],
      20: [
        { 
          nome: "Emissário da Redenção", 
          tipoAcao: "passiva", 
          desc: "**Passiva Absoluta:** O ápice da paz interior. \n- Você tem Resistência a TODOS os danos causados por outras criaturas.\n- Sempre que uma criatura te acerta, ela toma Dano Radiante igual à metade do dano que você sofreu.\n**Atenção:** Se você atacar a criatura, der dano nela ou castar magia nela, ESSA PROTEÇÃO DESLIGA contra AQUELA criatura específica até o seu próximo descanso longo." 
        }
      ]
    }
  },

  "Juramento dos Vigias (Watchers)": {
    magiasBonus: {
      nivel1: ["Alarme", "Detectar Magia"],
      nivel2: ["Raio de Lua", "Ver o Invisível"],
      nivel3: ["Contramágica", "Dificultar Detecção"],
      nivel4: ["Aura de Pureza", "Banimento"],
      nivel5: ["Imobilizar Monstro", "Vidência"]
    },
    features: {
      3: [
        { 
          nome: "CD: Vontade do Vigia", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Proteção mental para o grupo. Você e um número de criaturas a 30 pés igual ao seu Mod. CAR ganham Vantagem em TODOS os Testes de Resistência de Inteligência, Sabedoria e Carisma por 1 minuto." 
        },
        { 
          nome: "CD: Abjurar o Extraplanar", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Expulsa os invasores. Qualquer Aberração, Celestial, Elemental, Fada ou Corruptor (Fiend) a 30 pés faz Save de SAB. Falha: Fica Expulso por 1 minuto (Não pode se aproximar, só pode fugir gastando Dash)." 
        }
      ],
      7: [
        { 
          nome: "Aura da Sentinela", 
          tipoAcao: "passiva", 
          desc: "Você vigia por todos. Você e qualquer aliado dentro da sua *Aura de Proteção* ganham um bônus em todas as rolagens de Iniciativa igual ao seu Bônus de Proficiência." 
        }
      ],
      15: [
        { 
          nome: "Repreensão Vigilante", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Sempre que você (ou alguém a 30 pés) tiver SUCESSO em um Save de INT, SAB ou CAR forçado por outra criatura, você pode explodir a criatura que forçou o save com (2d8 + Mod. CAR) de Dano de Energia." 
        }
      ],
      20: [
        { 
          nome: "Baluarte Mortal", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto, você é o terror do além:\n- Ganha Visão Verdadeira (Truesight) de 120 pés.\n- Tem Vantagem contra extraplanares (Aberração, Celestial, Elemental, Fada, Fiend).\n- Ao acertar dano nesses monstros, force um Save de CAR. Falha: O monstro é Banido para o plano natal.\n*(Uso: 1x por Descanso Longo, ou gaste um Slot de Nível 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Quebrador de Juramento (Oathbreaker)": {
    magiasBonus: {
      nivel1: ["Infligir Ferimentos", "Repreensão Infernal"],
      nivel2: ["Coroa da Loucura", "Escuridão"],
      nivel3: ["Animar os Mortos", "Rogar Maldição"],
      nivel4: ["Praga", "Confusão"],
      nivel5: ["Contágio", "Dominar Pessoa"]
    },
    features: {
      3: [
        { 
          nome: "CD: Controlar Morto-Vivo", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Domine um Undead. O Morto-Vivo a 30 pés faz Save de SAB. Falha: Ele obedece seus comandos por 24 horas. (Se a CR do monstro for maior ou igual ao seu nível de Paladino, ele é imune)." 
        },
        { 
          nome: "CD: Aspecto Terrível", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica (Gasta Canalizar Divindade):** Terror puro. Inimigos a 30 pés fazem Save de SAB. Falha: Ficam *Amedrontados* (Frightened) por 1 minuto. Se eles correrem para mais de 30 pés de você, podem repetir o Save." 
        }
      ],
      7: [
        { 
          nome: "Aura de Ódio", 
          tipoAcao: "passiva", 
          desc: "Trevas fortalecem trevas. Você, e qualquer Morto-Vivo ou Corruptor (Fiend) que estiver dentro da sua *Aura de Proteção*, somam o seu Modificador de Carisma (mínimo de +1) nas rolagens de dano de todos os ataques Corpo a Corpo." 
        }
      ],
      15: [
        { 
          nome: "Resistência Sobrenatural", 
          tipoAcao: "passiva", 
          desc: "Sua carne vira aço. Você ganha Resistência passiva a dano físico Não-Mágico (Cortante, Perfurante e Contundente de armas mundanas)." 
        }
      ],
      20: [
        { 
          nome: "Lorde do Pavor", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto, uma aura de trevas de 30 pés o cerca:\n- Luzes brilhantes viram penumbra.\n- Inimigos com medo de você que começarem o turno na aura tomam 4d10 de Dano Psíquico.\n- Ataques contra você e aliados na aura têm Desvantagem.\n- Como Ação Bônus nos turnos seguintes, ordene as sombras a atacar alguém (Ataque Mágico): Causa 3d10+CAR Necrótico.\n*(Uso: 1x por Descanso Longo, ou gaste Slot Nv 5 para reativar).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  // --- PATRULHEIRO (RANGER) ---

  "Mestre das Bestas (Beast Master)": {
    features: {
      3: [
        { 
          nome: "Companheiro Primitivo", 
          tipoAcao: "bonus", 
          desc: "**Passiva:** Você invoca uma besta mágica (Terra, Mar ou Ar). Ela age no seu turno e usa sua Reação livremente. Se você cair Incapacitado, ela age por conta própria.\n**Ação Bônus:** Você comanda a besta a usar uma Ação da ficha dela (Atacar, Correr, Desengajar, etc).\n**Ataque Compartilhado:** Ao usar a Ação de Ataque, você pode abdicar de UM dos seus ataques para fazer a Besta atacar." 
        },
        { 
          nome: "Estatísticas da Besta", 
          tipoAcao: "passiva", 
          desc: "**PV Máximo:** 5 + (5 x Nível de Patrulheiro).\n**CA:** 13 + Mod. de SAB.\n**Ataque:** Seu Modificador de Ataque Mágico.\n**Dano (Terra):** 1d8 + 2 + Mod. SAB.\n**Dano (Mar):** 1d6 + 2 + Mod. SAB (Agarra o alvo).\n**Dano (Ar):** 1d4 + 3 + Mod. SAB (Tem Voo-Livre)." 
        }
      ],
      7: [
        { 
          nome: "Treinamento Excepcional", 
          tipoAcao: "passiva", 
          desc: "Quando você usar sua Ação Bônus para comandar a Besta a agir, ela pode usar a Ação Bônus DELA para realizar as ações de Disparada, Desengajar, Esquiva ou Ajuda.\nOs ataques da Besta agora podem causar Dano de Energia (Force) no lugar do dano normal." 
        }
      ],
      11: [
        { 
          nome: "Fúria Bestial", 
          tipoAcao: "passiva", 
          desc: "Quando você comanda sua Besta a realizar a Ação de Ataque, ela pode atacar DUAS vezes em vez de uma.\nSe o alvo do ataque dela estiver marcado pela sua *Marca do Caçador* (Hunter's Mark), o primeiro acerto dela no turno causará dano de Energia extra igual ao dado da sua magia (1d6)." 
        }
      ],
      15: [
        { 
          nome: "Magias Compartilhadas", 
          tipoAcao: "passiva", 
          desc: "Sempre que você conjurar uma magia que tenha você mesmo (Self) como alvo, você pode fazer com que a magia afete a sua Besta também, desde que ela esteja a até 30 pés (9m) de você." 
        }
      ]
    }
  },

  "Peregrino Feérico (Fey Wanderer)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa"],
      nivel2: ["Passo Nebuloso"],
      nivel3: ["Invocar Fada"],
      nivel4: ["Porta Dimensional"],
      nivel5: ["Despistar"]
    },
    features: {
      3: [
        { 
          nome: "Golpes Terríveis", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Uma vez por turno, ao acertar uma criatura com um ataque de arma.\n**Efeito:** Você causa +1d4 de Dano Psíquico extra. (O dano aumenta para 1d6 no Nível 11)." 
        },
        { 
          nome: "Glamour de Outro Mundo", 
          tipoAcao: "passiva", 
          desc: "Sempre que fizer um teste de Carisma, você ganha um bônus igual ao seu Modificador de Sabedoria (mínimo de +1). Além disso, você ganha proficiência em Enganação, Atuação ou Persuasão." 
        }
      ],
      7: [
        { 
          nome: "Distorção Sedutora", 
          tipoAcao: "reacao", 
          desc: "**Passiva:** Vantagem em Saves para evitar ou curar as condições *Enfeitiçado* e *Amedrontado*.\n**Reação:** Quando você (ou um aliado a até 120 pés) passar num Save contra Charme/Medo, você força outra criatura na área a fazer um Save de SAB. Falha: Ela fica Enfeitiçada ou Amedrontada por 1 minuto." 
        }
      ],
      11: [
        { 
          nome: "Reforços Feéricos", 
          tipoAcao: "acao", 
          desc: "Sua magia *Invocar Fada* não exige mais componentes materiais. Você pode conjurá-la 1 vez sem gastar espaço de magia por Descanso Longo.\nAo conjurá-la, você pode remover a necessidade de Concentração (se fizer isso, a magia dura apenas 1 minuto)." 
        },
        { 
          nome: "Golpes Terríveis (Upgrade Nv 11)", 
          tipoAcao: "passiva", 
          desc: "O dano extra do seu Golpe Terrível aumenta para 1d6." 
        }
      ],
      15: [
        { 
          nome: "Viajante Nebuloso", 
          tipoAcao: "bonus", 
          desc: "Você pode conjurar *Passo Nebuloso* sem gastar espaço de magia um número de vezes igual ao seu Mod. de Sabedoria por Descanso Longo. Ao usar a magia, você pode teleportar junto um aliado voluntário que esteja a 5 pés de você." 
        }
      ]
    }
  },

  "Caçador das Sombras (Gloom Stalker)": {
    magiasBonus: {
      nivel1: ["Disfarce"],
      nivel2: ["Truque de Corda"],
      nivel3: ["Medo"],
      nivel4: ["Invisibilidade Maior"],
      nivel5: ["Aparência Falsa"]
    },
    features: {
      3: [
        { 
          nome: "Emboscada Terrível", 
          tipoAcao: "livre", 
          desc: "**Iniciativa:** Você soma seu Mod. de Sabedoria na rolagem de Iniciativa.\n**Início do Combate:** No seu primeiro turno do combate, seu deslocamento aumenta em +10 pés.\n**Golpe Temível (1x/turno):** Ao acertar uma arma, causa +2d6 de Dano Psíquico. *(Uso: Igual ao Mod. SAB por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        },
        { 
          nome: "Visão Umbral", 
          tipoAcao: "passiva", 
          desc: "Você ganha Visão no Escuro de 60 pés (ou soma +60 se já tiver). Além disso, enquanto estiver totalmente na Escuridão, você fica **Invisível** para qualquer criatura que dependa de Visão no Escuro para enxergar." 
        }
      ],
      7: [
        { 
          nome: "Mente de Ferro", 
          tipoAcao: "passiva", 
          desc: "Você ganha proficiência em Testes de Resistência de Sabedoria (se já tiver, escolha entre INT ou CAR)." 
        }
      ],
      11: [
        { 
          nome: "Rajada do Espreitador", 
          tipoAcao: "passiva", 
          desc: "O dano do seu *Golpe Temível* vira 2d8 Psíquico. Ao usá-lo, escolha UM efeito extra:\n- **Ataque Repentino:** Faz 1 ataque extra contra uma criatura DIFERENTE que esteja a 5 pés do alvo.\n- **Medo em Massa:** O alvo e criaturas a 10 pés dele fazem Save de SAB ou ficam *Amedrontados* (Frightened) até o seu próximo turno." 
        }
      ],
      15: [
        { 
          nome: "Esquiva Sombria", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você for alvo de um ataque, você impõe Desvantagem ao atacante. Independentemente de acertar ou errar, após o ataque, você pode se teleportar para um espaço vazio a até 30 pés (9m)." 
        }
      ]
    }
  },

  "Caçador (Hunter)": {
    // 👇 O CAÇADOR PRECISA DOS MENUS DE ESCOLHA! 👇
    escolhasNivel3: [
      {
        titulo: "Presa do Caçador",
        tipo: "talento_cacador",
        opcoes: [
          { nome: "Matador de Colossos", desc: "+1d8 de dano extra (1x/turno) se o alvo não estiver com a vida cheia." },
          { nome: "Quebrador de Hordas", desc: "1x/turno, ao atacar, faça 1 ataque gratuito contra outro inimigo a 5 pés do alvo." }
        ]
      }
    ],
    escolhasNivel7: [
      {
        titulo: "Táticas Defensivas",
        tipo: "talento_cacador",
        opcoes: [
          { nome: "Fuga da Horda", desc: "Ataques de Oportunidade têm Desvantagem contra você." },
          { nome: "Defesa Multiataque", desc: "Ao sofrer um ataque, aquele inimigo terá Desvantagem em todos os outros ataques contra você no turno." }
        ]
      }
    ],
    features: {
      3: [
        { 
          nome: "Saber do Caçador", 
          tipoAcao: "passiva", 
          desc: "Você conhece imediatamente todas as Imunidades, Resistências e Vulnerabilidades da criatura que estiver sob o efeito da sua *Marca do Caçador* (Hunter's Mark)." 
        },
        { 
          nome: "Presa do Caçador", 
          tipoAcao: "passiva", 
          desc: "Tática de combate contra monstros escolhida no Nível 3. (Você pode trocar essa escolha sempre que terminar um Descanso Curto ou Longo)." 
        }
      ],
      7: [
        { 
          nome: "Táticas Defensivas", 
          tipoAcao: "passiva", 
          desc: "Tática defensiva escolhida no Nível 7. (Você pode trocar essa escolha sempre que terminar um Descanso Curto ou Longo)." 
        }
      ],
      11: [
        { 
          nome: "Presa Superior", 
          tipoAcao: "livre", 
          desc: "1x por turno, ao causar o dano extra da sua *Marca do Caçador* em um alvo, você pode aplicar esse mesmo dano extra a UMA OUTRA criatura diferente que esteja a até 30 pés (9m) do alvo original." 
        }
      ],
      15: [
        { 
          nome: "Defesa Superior", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Ao sofrer dano, você ganha Resistência àquele tipo de dano (e a qualquer outro dano do mesmo tipo que ocorrer até o final do turno atual)." 
        }
      ]
    }
  },

  "Enxameante (Swarmkeeper)": {
    magiasBonus: {
      truques: ["Mãos Mágicas"],
      nivel1: ["Fogo das Fadas"],
      nivel2: ["Teia"],
      nivel3: ["Forma Gasosa"],
      nivel4: ["Olho Arcano"],
      nivel5: ["Praga de Insetos"]
    },
    features: {
      3: [
        { 
          nome: "Enxame Reunido", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Uma vez por turno, imediatamente após você acertar uma criatura com um ataque.\n**Efeito:** O seu enxame auxilia no ataque de UMA das seguintes formas:\n- O alvo sofre +1d6 de Dano Perfurante.\n- O alvo faz um Save de FOR. Falha: É empurrado até 15 pés (4,5m) na direção que você quiser.\n- Você é movido 5 pés (1,5m) na direção que quiser." 
        },
        { 
          nome: "Mãos Mágicas do Enxame", 
          tipoAcao: "passiva", 
          desc: "Você aprende o truque *Mãos Mágicas*. Quando o conjura, a mão assume a forma do seu enxame." 
        }
      ],
      7: [
        { 
          nome: "Maré Agitada", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você ganha Deslocamento de Voo de 10 pés (podendo pairar no ar) por 1 minuto ou até ser Incapacitado.\n*(Uso: Igual ao Bônus de Proficiência por Descanso Longo).* " 
        }
      ],
      11: [
        { 
          nome: "Enxame Poderoso", 
          tipoAcao: "passiva", 
          desc: "Melhorias no Enxame Reunido:\n- O dano perfurante extra aumenta para 1d8.\n- Se empurrar uma criatura e ela falhar no Save de FOR, o enxame a derruba (Prone) no chão.\n- Se você usar o enxame para se mover 5 pés, você ganha Meia Cobertura (+2 CA/DES) até o início do seu próximo turno." 
        }
      ],
      15: [
        { 
          nome: "Dispersão do Enxame", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você sofrer dano, você ganha Resistência àquele dano. Imediatamente após, você desaparece e se teleporta para um espaço vazio a até 30 pés (9m).\n*(Uso: Igual ao Bônus de Proficiência por Descanso Longo).* " 
        }
      ]
    }
  },

  "Caminhante do Inverno (Winter Walker)": {
    magiasBonus: {
      nivel1: ["Faca de Gelo"],
      nivel2: ["Imobilizar Pessoa"],
      nivel3: ["Remover Maldição"],
      nivel4: ["Tempestade de Gelo"],
      nivel5: ["Cone de Frio"]
    },
    features: {
      3: [
        { 
          nome: "Explorador Gélido", 
          tipoAcao: "livre", 
          desc: "**Passivas:** Seus ataques e feitiços ignoram Resistência a Frio. Você ganha Resistência a Dano de Frio.\n**Golpe Polar (1x/turno):** Ao acertar uma arma, causa +1d4 de Dano de Frio (Aumenta para 1d6 no nv 11)." 
        },
        { 
          nome: "Rima do Caçador", 
          tipoAcao: "passiva", 
          desc: "Sempre que você conjurar a magia *Marca do Caçador*, você ganha PV Temporários iguais a 1d10 + Nível de Patrulheiro.\nEnquanto a sua marca durar, o alvo marcado NÃO PODE usar a ação de Desengajar." 
        }
      ],
      7: [
        { 
          nome: "Alma Fortalecida", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Escolha aliados a até 30 pés (limite = Mod. SAB). Cada um recupera PV iguais a 1d10 + seu Nível de Patrulheiro e ganham Vantagem contra Ficar Amedrontados por 1 hora.\n*(Uso: 1 vez por Descanso Longo).* " 
        }
      ],
      11: [
        { 
          nome: "Retribuição Gelada", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura te acertar um ataque, force-a a um Save de SAB (Sua CD de Magia). Falha: O atacante fica *Atordoado* (Stunned) e com Deslocamento 0 até o final do seu próximo turno.\n*(Uso: Igual ao Mod. SAB por Descanso Longo).* " 
        },
        { 
          nome: "Explorador Gélido (Upgrade Nv 11)", 
          tipoAcao: "passiva", 
          desc: "O dano extra do seu Golpe Polar aumenta para 1d6." 
        }
      ],
      15: [
        { 
          nome: "Assombração Congelada", 
          tipoAcao: "passiva", 
          desc: "Sempre que conjurar *Marca do Caçador*, você entra em forma espectral até o fim da magia:\n- **Imunidades:** Dano de Frio, Agarrado, Caído e Impedido.\n- **Aura Fria:** No início do seu turno, criaturas a 15 pés tomam 2d4 de Frio.\n- **Incorpóreo:** Atravessa criaturas/objetos como terreno difícil (sofre 1d10 Energia se terminar dentro deles).\n*(1x por Descanso Longo. Recuperável gastando um Slot de Magia Nv 4+).* " 
        }
      ]
    }
  },

  "Guardião Vazio (Hollow Warden)": {
    magiasBonus: {
      nivel1: ["Destruição Colérica"],
      nivel2: ["Alterar-se"],
      nivel3: ["Montaria Fantasma"],
      nivel4: ["Dominar Besta"],
      nivel5: ["Ataque do Vento de Aço"]
    },
    features: {
      3: [
        { 
          nome: "Ira Selvagem", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Gaste 1 uso de *Inimigo Favorito* (Hunter's Mark) para assumir uma forma aterradora (chifres, presas, sombras) por 1 minuto:\n- **Armadura Ancestral:** +1 na sua CA (+2 no Nv 11).\n- **Retaliação:** Dê um Ataque de Oportunidade imediatamente se você ou um aliado a 5 pés sofrer dano.\n- **Aura Enervante:** No início do seu turno, criaturas a 10 pés fazem Save de SAB ou ficam *Amedrontadas*." 
        }
      ],
      7: [
        { 
          nome: "Poder Faminto", 
          tipoAcao: "passiva", 
          desc: "**Resiliência:** Soma o Mod. de Sabedoria nos Saves de Constituição.\n**Sede de Sangue (1x/turno):** Ao acertar um ataque na forma *Ira Selvagem*, se você estiver Sangrando (abaixo da metade da vida), você recupera 1d10 + Mod. SAB de Pontos de Vida." 
        }
      ],
      11: [
        { 
          nome: "Podridão e Violência", 
          tipoAcao: "passiva", 
          desc: "Novos poderes na *Ira Selvagem*:\n- **Aura Ameaçadora:** Quem falhar no Save da Aura não pode recuperar PV nem usar Reações.\n- **Raízes Estranguladoras:** Ao acertar um ataque, você pode usar a Maestria *Lentidão* (Slow) ou *Enfraquecer* (Sap) simultaneamente com a outra maestria da arma." 
        }
      ],
      15: [
        { 
          nome: "Poder Ancestral", 
          tipoAcao: "passiva", 
          desc: "**Golpes Sinistros:** Acertar uma criatura *Amedrontada* causa dano extra igual ao seu Mod. SAB.\n**Imortal (Ira Selvagem):** Se cair a 0 PV, você não morre; você sobe para (2x Nível de Patrulheiro) em PV! (1x por Long Rest ou gastando Slot Nv 4+).\n**Atemporal:** Imunidade à condição Exaustão." 
        }
      ]
    }
  },

  "Andarilho do Horizonte (Horizon Walker)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal"],
      nivel2: ["Passo Nebuloso"],
      nivel3: ["Velocidade"],
      nivel4: ["Banimento"],
      nivel5: ["Círculo de Teletransporte"]
    },
    features: {
      3: [
        { 
          nome: "Detectar Portal", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você detecta a distância e a direção do portal planar mais próximo a até 1 milha de você.\n*(Uso: 1 vez por Descanso Curto ou Longo).* " 
        },
        { 
          nome: "Guerreiro Planar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Escolha um inimigo a até 30 pés.\n**Efeito:** O primeiro ataque armado que você acertar nele neste turno converte TODO o dano (da arma e seus atributos) em Dano de Energia (Force), e causa +1d8 de dano de Energia extra. (Aumenta para 2d8 no Nv 11)." 
        }
      ],
      7: [
        { 
          nome: "Passo Etéreo", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você conjura a magia *Forma Etérea* sem gastar espaço de magia. Ela dura até o final deste turno (permitindo que você atravesse paredes e objetos).\n*(Uso: 1 vez por Descanso Curto ou Longo).* " 
        }
      ],
      11: [
        { 
          nome: "Golpe Distante", 
          tipoAcao: "passiva", 
          desc: "**Passiva:** Sempre que você usar a Ação de Ataque, você pode se teleportar até 10 pés para um espaço vazio antes de CADA ataque que fizer.\n**Ataque Extra:** Se você atacar pelo menos duas criaturas diferentes com a sua Ação de Ataque, você ganha 1 ataque a mais gratuito contra um terceiro alvo diferente." 
        }
      ],
      15: [
        { 
          nome: "Defesa Espectral", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você sofrer dano de um ataque, você ganha Resistência a TODO o dano provindo daquele ataque neste turno." 
        }
      ]
    }
  },

  "Caçador de Monstros (Monster Slayer)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal"],
      nivel2: ["Zona da Verdade"],
      nivel3: ["Círculo Mágico"],
      nivel4: ["Banimento"],
      nivel5: ["Imobilizar Monstro"]
    },
    features: {
      3: [
        { 
          nome: "Sentido do Caçador", 
          tipoAcao: "acao", 
          desc: "**Ação:** Escolha uma criatura a 60 pés. Você descobre imediatamente as Imunidades, Resistências e Vulnerabilidades dela. (Se ela estiver oculta por magia de adivinhação, você sentirá que ela não tem nada).\n*(Uso: Igual ao Mod. SAB por Descanso Longo).* " 
        },
        { 
          nome: "Presa do Matador", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Designe uma criatura a 60 pés como sua presa.\n**Efeito:** Uma vez por turno (no seu turno), o primeiro ataque armado que você acertar nela causa +1d6 de dano extra. Isso dura até você terminar um descanso ou marcar outro alvo." 
        }
      ],
      7: [
        { 
          nome: "Defesa Sobrenatural", 
          tipoAcao: "passiva", 
          desc: "Sempre que a sua *Presa do Matador* forçar você a um Teste de Resistência (Save), ou você fizer um teste de atributo para escapar de um agarrão dela, role 1d6 e SOME ao resultado do seu d20." 
        }
      ],
      11: [
        { 
          nome: "Nêmesis do Mago", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se uma criatura a até 60 pés de você conjurar uma magia ou tentar se teleportar, force-a a um Save de SAB. Falha: A magia ou teleporte falha e a ação/magia é desperdiçada.\n*(Uso: 1 vez por Descanso Curto ou Longo).* " 
        }
      ],
      15: [
        { 
          nome: "Contra-Ataque do Matador", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se a sua *Presa do Matador* te forçar a fazer um Teste de Resistência, você pode fazer um ataque armado contra ela antes de rolar o dado. Se o seu ataque acertar, além de dar dano, você **passa automaticamente** no Teste de Resistência que ela causou!" 
        }
      ]
    }
  },

  "Guardião Dracônico (Drakewarden)": {
    magiasBonus: {
      truques: ["Taumaturgia"]
    },
    features: {
      3: [
        { 
          nome: "Presente Dracônico", 
          tipoAcao: "passiva", 
          desc: "Você aprende o truque *Taumaturgia* (Sabedoria). Você também aprende a falar, ler e escrever Dracônico." 
        },
        { 
          nome: "Companheiro Drake", 
          tipoAcao: "acao", 
          desc: "**Ação:** Invoca um Drake Pequeno (Você escolhe o elemento: Ácido, Frio, Fogo, Elétrico ou Veneno). Ele age logo após você no seu turno. Ele só Esquiva se você não usar Ação Bônus para comandá-lo.\n**Estatísticas:** PV = 5 + (5 x Nv Ranger). CA = 14 + Proficiência.\n**Mordida:** +3 + Prof no ataque. Dano = 1d6 + Prof (Perfurante).\n**Ataque Infundido (Reação):** Quando outra criatura a 30 pés do Drake acertar um ataque, ele infunde a arma, causando +1d6 de dano elemental extra.\n*(Recuperar/Reviver o Drake: 1x Grátis por Long Rest, ou gasta Slot Nv 1+).* " 
        }
      ],
      7: [
        { 
          nome: "Vínculo de Escama", 
          tipoAcao: "passiva", 
          desc: "**Melhoria do Drake:** Ele cresce (vira tamanho Médio e serve de Montaria). Ele ganha Asas (Deslocamento de Voo igual à caminhada, mas não pode voar se alguém estiver montado nele).\n**Magia de Presa:** A mordida dele causa +1d6 de dano do elemento dele.\n**Resistência:** Você ganha Resistência permanente ao elemento do seu Drake." 
        }
      ],
      11: [
        { 
          nome: "Sopro do Drake", 
          tipoAcao: "acao", 
          desc: "**Ação:** Você (ou o seu Drake) exala um Cone de 30 pés de energia elemental (Ácido, Frio, Fogo, Elétrico ou Veneno). Alvos fazem Save de DES (sua CD de Magia). Falha: 8d6 de dano. Sucesso: Metade.\n*(Uso: 1x Grátis por Long Rest, ou gasta Slot Nv 3+).* " 
        }
      ],
      15: [
        { 
          nome: "Vínculo Perfeito", 
          tipoAcao: "reacao", 
          desc: "**Drake Supremo:** Ele cresce para o tamanho Grande (pode ser montado enquanto Voa). A mordida causa +1d6 extra (Total de 2d6 do elemento).\n**Resistência Reflexiva (Reação):** Quando você OU o drake sofrerem dano a até 30 pés de distância um do outro, você dá Resistência a um de vocês contra aquele dano. *(Usos: Igual ao Bônus de Proficiência por Long Rest).* " 
        }
      ]
    }
  },

  // --- BRUXO (WARLOCK) ---

  "Arquifada (Archfey)": {
    magiasBonus: {
      nivel1: ["Acalmar Emoções", "Fogo das Fadas", "Sono", "Raio Adoecente"], // Magias mescladas do Nv 3
      nivel2: ["Passo Nebuloso", "Força Fantasmagórica"],
      nivel3: ["Crescimento de Plantas", "Piscar"],
      nivel4: ["Dominar Besta", "Invisibilidade Maior"],
      nivel5: ["Aparência Falsa", "Dominar Pessoa"]
    },
    features: {
      3: [
        { 
          nome: "Passos da Fada", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você conjura *Passo Nebuloso* (Misty Step) sem gastar slot. Ao conjurar, adicione UM efeito extra:\n- **Passo Revigorante:** Você ou um aliado a 10 pés ganha 1d10 PV Temporários.\n- **Passo Zombeteiro:** Inimigos a 5 pés da sua origem fazem Save de SAB. Falha: Desvantagem para atacar qualquer um que não seja você até seu próximo turno.\n*(Usos: Igual ao Mod. de Carisma por Descanso Longo).* ", 
          recuperacao: "Descanso Longo" 
        }
      ],
      6: [
        { 
          nome: "Fuga Nebulosa", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Você pode usar o seu *Passos da Fada* como uma Reação imediatamente após sofrer dano. Você ganha novas opções de efeito:\n- **Passo Invisível:** Fica Invisível até atacar, conjurar magia ou o turno começar.\n- **Passo Temível:** Inimigos a 5 pés da sua origem OU do seu destino fazem Save de SAB ou sofrem 2d10 de Dano Psíquico." 
        }
      ],
      10: [
        { 
          nome: "Defesas Sedutoras", 
          tipoAcao: "reacao", 
          desc: "**Passiva:** Você é Imune à condição Enfeitiçado (Charmed).\n**Reação:** Ao ser acertado por um ataque, reduz o dano pela metade e o atacante faz um Save de SAB. Falha: Ele toma Dano Psíquico igual ao dano que você acabou de sofrer! *(Uso: 1x por Descanso Longo, ou gastando 1 Slot de Bruxo).* " 
        }
      ],
      14: [
        { 
          nome: "Magia Encantadora", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Imediatamente após você conjurar uma magia de Encantamento ou Ilusão usando uma Ação e gastando um Slot.\n**Efeito:** Você pode conjurar *Passo Nebuloso* gratuitamente como parte dessa mesma Ação (podendo aplicar seus efeitos)." 
        }
      ]
    }
  },

  "Celestial (Celestial)": {
    magiasBonus: {
      truques: ["Luz", "Chama Sagrada"],
      nivel1: ["Curar Ferimentos", "Raio Guiador"],
      nivel2: ["Ajuda", "Restauração Menor"],
      nivel3: ["Luz do Dia", "Revivificar"],
      nivel4: ["Guardião da Fé", "Muralha de Fogo"],
      nivel5: ["Invocar Celestial", "Restauração Maior"]
    },
    features: {
      3: [
        { 
          nome: "Luz Curativa", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você possui um total de d6s igual a (1 + Nível de Bruxo). Você pode gastar uma quantidade de dados (Máximo = Mod. CAR) para curar uma criatura a 60 pés.\n*(Recupera todos os dados no Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      6: [
        { 
          nome: "Alma Radiante", 
          tipoAcao: "passiva", 
          desc: "**Resistência:** Dano Radiante.\n**Potência Divina:** 1x por turno, ao conjurar uma magia que cause dano Radiante ou de Fogo, você pode adicionar seu Modificador de Carisma ao dano contra um dos alvos." 
        }
      ],
      10: [
        { 
          nome: "Resiliência Celestial", 
          tipoAcao: "passiva", 
          desc: "Sempre que usar a *Astúcia Mágica* ou terminar um Descanso (Curto/Longo), você ganha PV Temporários = (Nível de Bruxo + Mod. CAR).\nAlém disso, você pode escolher até 5 aliados; cada um ganha PV Temporários = (Metade do Nível de Bruxo + Mod. CAR)." 
        }
      ],
      14: [
        { 
          nome: "Vingança Escaldante", 
          tipoAcao: "reacao", 
          desc: "**Gatilho (Morte):** Quando você ou um aliado a 60 pés for fazer um Teste de Morte (Death Save), você pode soltar uma explosão divina.\n**Efeito:** O alvo levanta com 50% dos PV totais. Inimigos a 30 pés tomam 2d8 + Mod. CAR de Dano Radiante e ficam *Cegos* até o fim do turno.\n*(Uso: 1 vez por Descanso Longo).* ", 
          usosMax: 1, 
          recuperacao: "Descanso Longo" 
        }
      ]
    }
  },

  "Corruptor (Fiend)": {
    magiasBonus: {
      nivel1: ["Comando", "Mãos Flamejantes"],
      nivel2: ["Raio Ardente", "Sugestão"],
      nivel3: ["Bola de Fogo", "Névoa Fétida"],
      nivel4: ["Escudo de Fogo", "Muralha de Fogo"],
      nivel5: ["Missão (Geas)", "Praga de Insetos"]
    },
    features: {
      3: [
        { 
          nome: "Bênção do Tenebroso", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você reduz um inimigo a 0 PV (ou um aliado a até 10 pés de você o faz).\n**Efeito:** Você ganha PV Temporários iguais ao seu Modificador de Carisma + Nível de Bruxo." 
        }
      ],
      6: [
        { 
          nome: "Sorte do Tenebroso", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Você rola um Teste de Atributo ou Teste de Resistência (após ver o d20, mas antes dos efeitos).\n**Efeito:** Você pode rolar 1d10 e somar ao resultado.\n*(Uso: Igual ao Mod. de Carisma por Descanso Longo).* ", 
          recuperacao: "Descanso Longo" 
        }
      ],
      10: [
        { 
          nome: "Resiliência Diabólica", 
          tipoAcao: "passiva", 
          desc: "Sempre que terminar um Descanso Curto ou Longo, você escolhe UM tipo de dano (exceto Energia/Force). Você ganha Resistência a esse tipo de dano até que troque com essa habilidade." 
        }
      ],
      14: [
        { 
          nome: "Arremessar no Inferno", 
          tipoAcao: "livre", 
          desc: "**Gatilho (1x/turno):** Ao acertar um ataque em uma criatura.\n**Efeito:** O alvo faz um Save de CAR. Falha: É banido pro inferno (Incapacitado) e volta no final do seu próximo turno. Ao voltar, se não for um Demônio (Fiend), sofre 8d10 de Dano Psíquico.\n*(Uso: 1x por Descanso Longo, ou gastando 1 Slot de Bruxo).* " 
        }
      ]
    }
  },

  "Grande Antigo (Great Old One)": {
    magiasBonus: {
      nivel1: ["Riso Histérico de Tasha", "Sussurros Dissonantes"],
      nivel2: ["Detectar Pensamentos", "Força Fantasmagórica"],
      nivel3: ["Clarividência", "Fome de Hadar"],
      nivel4: ["Confusão", "Invocar Aberração"],
      nivel5: ["Modificar Memória", "Telecinese"]
    },
    features: {
      3: [
        { 
          nome: "Mente Desperta", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Link telepático com um alvo a 30 pés (Dura: Nv. Bruxo em minutos). Depois de feito, a telepatia funciona a distâncias em milhas = seu Mod. CAR." 
        },
        { 
          nome: "Magias Psíquicas", 
          tipoAcao: "passiva", 
          desc: "Você pode mudar qualquer dano das suas Magias de Bruxo para Dano Psíquico. Se a magia for de Ilusão ou Encantamento, você conjura SEM componentes Verbais (V) ou Somáticos (S)." 
        }
      ],
      6: [
        { 
          nome: "Combatente Clarividente", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Ao criar um link telepático da *Mente Desperta*.\n**Efeito:** Força o alvo a um Save de SAB. Falha: Ele sofre Desvantagem nos ataques contra você, e você ganha Vantagem nos ataques contra ele enquanto o link durar.\n*(Uso: 1x por Descanso Curto/Longo, ou gastando 1 Slot de Bruxo).* " 
        }
      ],
      10: [
        { 
          nome: "Defesas Alienígenas", 
          tipoAcao: "passiva", 
          desc: "**Hex Diabólico:** Ao conjurar *Praga* (Hex), o alvo também sofre Desvantagem nos Saves do atributo escolhido.\n**Escudo Mental:** Seus pensamentos não podem ser lidos. Você resiste a Dano Psíquico e reflete o dano psíquico sofrido de volta ao atacante." 
        }
      ],
      14: [
        { 
          nome: "Criar Servo", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Ao conjurar *Invocar Aberração*, você ignora a Concentração (a magia passa a durar 1 min travado) e a criatura ganha PV Temp = (Nv. Bruxo + CAR).\nAlém disso, 1x por turno, se a Aberração acertar o alvo do seu *Hex*, ela causa Dano Psíquico extra igual ao dano extra da magia." 
        }
      ]
    }
  },

  "O Insondável (Fathomless)": {
    magiasBonus: {
      nivel1: ["Criar ou Destruir Água", "Onda Trovejante"],
      nivel2: ["Lufada de Vento", "Silêncio"],
      nivel3: ["Nevasca", "Relâmpago"],
      nivel4: ["Controlar a Água", "Invocar Elemental"],
      nivel5: ["Cone de Frio", "Mão de Bigby"]
    },
    features: {
      3: [ // Habilidades do Nv 1 movidas para o Nv 3 (Regra 2024)
        { 
          nome: "Dádiva do Mar", 
          tipoAcao: "passiva", 
          desc: "Você ganha Deslocamento de Natação de 40 pés (12m) e pode respirar debaixo d'água." 
        },
        { 
          nome: "Tentáculo das Profundezas", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você cria um tentáculo espectral a até 60 pés (dura 1 minuto). Ao criá-mo, você faz um Ataque de Magia Corpo a Corpo contra um alvo a 10 pés do tentáculo. Acerto: 1d8 de Dano de Frio e reduz o deslocamento do alvo em 10 pés.\nNos turnos seguintes, você pode usar sua Ação Bônus para mover o tentáculo 30 pés e atacar novamente.\n*(Usos: Igual ao Bônus de Proficiência por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      6: [
        { 
          nome: "Alma Oceânica", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência a Dano de Frio. Quando totalmente submerso, você consegue falar e entender qualquer criatura que também esteja submersa." 
        },
        { 
          nome: "Bobina Guardiã", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você ou um aliado sofrer dano a até 10 pés do seu *Tentáculo das Profundezas*, você usa o tentáculo para defender, reduzindo o dano sofrido em 1d8. (Aumenta para 2d8 no Nv 10)." 
        }
      ],
      10: [
        { 
          nome: "Tentáculos Agarradores", 
          tipoAcao: "acao", 
          desc: "Você aprende a magia *Tentáculos Negros de Evard*. Pode conjurá-la 1 vez sem gastar slot de Bruxo (Recarrega no Descanso Longo).\nSempre que conjurar essa magia, você ganha PV Temporários iguais ao seu Nível de Bruxo e o dano não pode quebrar a sua Concentração nela.",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Mergulho Insondável", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Você e até 5 aliados a 30 pés se teleportam através de um redemoinho de água. Vocês reaparecem a até 1 milha de distância, em um corpo d'água que você já tenha visto ou a até 30 pés dele.\n*(Uso: 1x por Descanso Curto ou Longo).* " 
        }
      ]
    }
  },

  "O Gênio (Genie)": {
    // Menu pro VTT perguntar qual o tipo do Gênio no Nível 3
    escolhasNivel3: [
      {
        titulo: "Tipo de Gênio (Patrono)",
        tipo: "talento",
        opcoes: [
          { nome: "Dao (Terra)", desc: "Dano: Contundente. Magias Extras: Santuário, Crescer Espinhos, Mesclar-se às Rochas, Moldar Rochas, Muralha de Pedra." },
          { nome: "Djinni (Ar)", desc: "Dano: Trovejante. Magias Extras: Onda Trovejante, Lufada de Vento, Muralha de Vento, Invisibilidade Maior, Aparencia Falsa." },
          { nome: "Efreeti (Fogo)", desc: "Dano: Fogo. Magias Extras: Mãos Flamejantes, Raio Ardente, Bola de Fogo, Escudo de Fogo, Coluna de Chamas." },
          { nome: "Marid (Água)", desc: "Dano: Frio. Magias Extras: Névoa Escurecedora, Reflexos, Nevasca, Controlar a Água, Cone de Frio." }
        ]
      }
    ],
    magiasBonus: {
      nivel1: ["Detectar o Bem e Mal"],
      nivel2: ["Força Fantasmagórica"],
      nivel3: ["Criar Alimentos e Água"],
      nivel4: ["Assassino Fantasmagórico"],
      nivel5: ["Criação", "Desejo (Nv 9)"]
    },
    features: {
      3: [ // Movido do Nv 1 pro 3
        { 
          nome: "Ira do Gênio", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** 1x por turno, ao acertar uma rolagem de ataque.\n**Efeito:** Você causa dano extra igual ao seu Bônus de Proficiência. O tipo de dano depende do seu Gênio (Contundente, Trovejante, Fogo ou Frio)." 
        },
        { 
          nome: "Vaso do Gênio (Descanso Engarrafado)", 
          tipoAcao: "acao", 
          desc: "Você ganha um objeto mágico (lâmpada, anel, urna). O Vaso é imune a dano psíquico/veneno, CA = sua CD de magia, PV = (Nv. Bruxo + Prof).\n**Ação:** Você entra no vaso (espaço extradimensional confortável). Você pode ficar lá dentro por horas = (2x sua Proficiência). Você ouve o lado de fora.\n*(Uso de entrar: 1x por Descanso Longo).* " 
        }
      ],
      6: [
        { 
          nome: "Dádiva Elemental", 
          tipoAcao: "bonus", 
          desc: "**Passiva:** Você ganha Resistência ao tipo de dano do seu Gênio.\n**Ação Bônus:** Você ganha Deslocamento de Voo de 30 pés e pode pairar por 10 minutos. *(Usos do Voo: Igual ao Bônus de Proficiência por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      10: [
        { 
          nome: "Vaso Santuário", 
          tipoAcao: "acao", 
          desc: "Ao entrar no seu *Vaso do Gênio*, você pode puxar até 5 aliados a 30 pés para dentro com você. Qualquer um que ficar 10 minutos lá dentro completa os efeitos de um Descanso Curto. Se gastarem Dados de Vida para curar lá dentro, eles somam o seu Bônus de Proficiência na cura." 
        }
      ],
      14: [
        { 
          nome: "Desejo Limitado", 
          tipoAcao: "acao", 
          desc: "**Ação:** Peça um desejo ao vaso. Você conjura instantaneamente QUALQUER MAGIA de Nível 6 ou inferior (de qualquer classe), que tenha tempo de conjuração de 1 Ação. Você ignora TODOS os componentes materiais.\n*(Uso: 1 vez a cada 1d4 Descansos Longos).* " 
        }
      ]
    }
  },

  "Lâmina Maldita (Hexblade)": {
    magiasBonus: {
      nivel1: ["Destruição Colérica", "Escudo Arcano"],
      nivel2: ["Destruição Marcante", "Reflexos"],
      nivel3: ["Arma Elemental", "Piscar"],
      nivel4: ["Assassino Fantasmagórico", "Destruição Estonteante"],
      nivel5: ["Cone de Frio", "Destruição Banidora"]
    },
    features: {
      3: [ // Movido do Nv 1 pro 3
        { 
          nome: "Guerreiro Amaldiçoado (Hex Warrior)", 
          tipoAcao: "passiva", 
          desc: "**Proficiências:** Armaduras Médias, Escudos e Armas Marciais.\n**Arma de Carisma:** Ao fim de um Descanso Longo, toque uma arma (que não seja de Duas Mãos). Você usa seu CARISMA em vez de Força/Destreza para jogadas de ataque e dano com ela. (Se você pegar a Invocação Pacto da Lâmina, isso se aplica automaticamente à sua arma de pacto, independente do tipo)." 
        },
        { 
          nome: "Maldição da Lâmina (Hexblade's Curse)", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Amaldiçoe um inimigo a 30 pés por 1 minuto:\n- Você soma sua Proficiência no dano contra ele.\n- Seus ataques contra ele causam Acerto Crítico tirando 19 ou 20 no dado.\n- Se ele morrer, você cura PV = (Nv. Bruxo + Mod. CAR).\n*(Uso: 1x por Descanso Curto ou Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      6: [
        { 
          nome: "Espectro Amaldiçoado", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você mata um humanoide.\n**Efeito:** Você arranca a alma dele e ergue um *Espectro* (Specter) sob seu controle. Ele ganha PV Temp = metade do seu Nível de Bruxo e soma o seu Mod. de Carisma nos ataques dele. Permanece até o seu próximo Descanso Longo.\n*(Uso: 1x por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      10: [
        { 
          nome: "Armadura de Hex", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Se o alvo que está sob o efeito da sua *Maldição da Lâmina* te acertar um ataque, você rola 1d6. Se cair 4, 5 ou 6, o ataque erra você, ignorando a rolagem do inimigo." 
        }
      ],
      14: [
        { 
          nome: "Mestre dos Hex", 
          tipoAcao: "livre", 
          desc: "Quando o alvo marcado pela sua *Maldição da Lâmina* morrer, você pode imediatamente transferir a maldição para outra criatura a 30 pés (se o fizer, você não ganha a cura passiva pela morte do primeiro alvo)." 
        }
      ]
    }
  },
  "O Morto-Vivo (Undead)": {
    magiasBonus: {
      nivel1: ["Perdição", "Raio Adoecente"],
      nivel2: ["Cegueira/Surdez", "Força Fantasmagórica"],
      nivel3: ["Falar com os Mortos", "Invocar Mortos-Vivos"],
      nivel4: ["Assassino Fantasmagórico", "Invisibilidade Maior"],
      nivel5: ["Cúpula Antivida", "Névoa Mortal"]
    },
    features: {
      3: [
        { 
          nome: "Forma de Pavor", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Transforma-se por 1 minuto:\n- **Fac-símile:** Ganha PV Temp = (1d10 + Nv. Bruxo).\n- **Destemido:** Fica Imune à condição *Amedrontado*.\n- **Aterrorizante (1x/turno):** Ao acertar um ataque, o alvo faz Save de SAB ou fica Amedrontado (Frightened) até o fim do seu próximo turno.\n*(Usos: Igual ao Mod. CAR por Descanso Longo).* ", 
          recuperacao: "Descanso Longo" 
        }
      ],
      6: [
        { 
          nome: "Toque do Túmulo", 
          tipoAcao: "passiva", 
          desc: "**Necrose (1x/turno):** Pode trocar o dano de uma magia de Bruxo por Dano Necrótico (O dano necrótico do Bruxo ignora Resistência a Necrótico).\n**Pavor Necrótico:** Se der dano necrótico enquanto na *Forma de Pavor*, você joga 1 Dado de Dano EXTRA.\n*(Não precisa mais dormir, comer ou respirar).* " 
        }
      ],
      10: [
        { 
          nome: "Casca Necrótica", 
          tipoAcao: "reacao", 
          desc: "**Passiva:** Resistência a Dano Necrótico (Imunidade se estiver na Forma de Pavor).\n**Ressurreição Profana:** Ao cair a 0 PV, você não cai. Uma explosão a 30 pés causa 2d10 + Mod CAR (Necrótico) nos inimigos (Save CON metade). Você fica com PV = (2x Nv de Bruxo) e sofre 1 nível de Exaustão. *(1x por Descanso Curto/Longo).* " 
        }
      ],
      14: [
        { 
          nome: "Pavor Superior", 
          tipoAcao: "passiva", 
          desc: "Na sua *Forma de Pavor*, você ganha:\n- Resistência a ataques físicos (Cortante, Perfurante, Contundente).\n- Voo igual à sua caminhada (Atravessa matéria/paredes. Se acabar o turno dentro, toma 1d10 Energia).\n- Conjura magias de Necromancia e Conjuração do Bruxo **SEM** usar componentes (V/S/M)." 
        }
      ]
    }
  },
  "O Imortal (Undying)": {
    magiasBonus: {
      truques: ["Estabilizar"],
      nivel1: ["Falsa Vida", "Raio Adoecente"],
      nivel2: ["Cegueira/Surdez", "Silêncio"],
      nivel3: ["Falar com os Mortos", "Fingir de Morto"],
      nivel4: ["Aura de Vida", "Proteção contra a Morte"],
      nivel5: ["Contágio", "Lendas e Histórias"]
    },
    features: {
      3: [ // Movido do Nv 1 pro 3
        { 
          nome: "Entre os Mortos", 
          tipoAcao: "passiva", 
          desc: "Você aprende o truque *Estabilizar* (Spare the Dying). Você tem Vantagem em Saves contra Doenças.\n**Santuário Morto-Vivo:** Se um morto-vivo tentar te atacar (ou conjurar magia contra você), ele deve fazer um Save de Sabedoria. Falha: Ele precisa escolher outro alvo ou perde o ataque. (Se ele passar ou você o atacar, ele fica imune a este efeito por 24h)." 
        }
      ],
      6: [
        { 
          nome: "Desafiar a Morte", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você passa em um Teste de Morte (Death Save) ou quando estabiliza alguém usando *Estabilizar*.\n**Efeito:** Você recupera PV iguais a 1d8 + Mod. de Constituição (Mínimo de 1).\n*(Uso: 1 vez por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      10: [
        { 
          nome: "Natureza Imortal", 
          tipoAcao: "passiva", 
          desc: "Você pode prender a respiração indefinidamente. Você não precisa mais comer, beber ou dormir (mas ainda precisa de descansos para recuperar habilidades). Você envelhece apenas 1 ano a cada 10 anos que se passam, e é imune a envelhecimento mágico." 
        }
      ],
      14: [
        { 
          nome: "Vida Indestrutível", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você canaliza os segredos dos imortais para recuperar PV iguais a 1d8 + seu Nível de Bruxo. Se tiver um membro decepado e segurá-lo no lugar ao usar esta habilidade, ele se reconecta perfeitamente ao seu corpo.\n*(Uso: 1 vez por Descanso Curto ou Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ]
    }
  },

  // --- FEITICEIRO (SORCERER) ---

  "Feitiçaria Aberrante (Aberrant)": {
    magiasBonus: {
      truques: ["Lasca Mental"],
      nivel1: ["Braços de Hadar", "Acalmar Emoções", "Sussurros Dissonantes"],
      nivel2: ["Detectar Pensamentos"],
      nivel3: ["Fome de Hadar", "Enviar Mensagem"],
      nivel4: ["Tentáculos Negros de Evard", "Invocar Aberração"],
      nivel5: ["Ligação Telepática de Rary", "Telecinese"]
    },
    features: {
      3: [
        { 
          nome: "Fala Telepática", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você cria um link mental com uma criatura a até 30 pés. Vocês podem se comunicar telepaticamente contanto que estejam a um número de milhas igual ao seu Mod. de Carisma de distância (Dura: Nível de Feiticeiro em minutos)." 
        }
      ],
      6: [
        { 
          nome: "Feitiçaria Psíquica", 
          tipoAcao: "livre", 
          desc: "**Passiva:** Ao conjurar qualquer magia da sua lista bônus de *Magias Psíquicas*, você pode gastar Pontos de Feitiçaria no lugar de Espaços de Magia (Custo = Nível da magia). Se usar Pontos, a magia NÃO exige componentes Verbais, Somáticos, nem Materiais (a menos que o material tenha custo)." 
        },
        { 
          nome: "Defesas Psíquicas", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência a Dano Psíquico e tem Vantagem em Testes de Resistência para evitar ou curar as condições *Enfeitiçado* e *Amedrontado*." 
        }
      ],
      14: [
        { 
          nome: "Revelação na Carne", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Gaste 1 ou mais Pontos de Feitiçaria para alterar seu corpo por 10 minutos. Para cada ponto gasto, ganhe 1 efeito:\n- **Aquático:** Natação (2x seu Deslocamento) e respira na água.\n- **Voo:** Deslocamento de Voo igual ao seu terrestre, podendo pairar.\n- **Ver o Invisível:** Enxerga invisibilidade a 60 pés.\n- **Vermiforme:** Seu corpo fica gosmento. Passa em frestas de até 2,5cm e pode gastar 5 pés de movimento para escapar de agarrões." 
        }
      ],
      18: [
        { 
          nome: "Implosão Distorcida", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Você teleporta 120 pés (36m). Ao sumir, toda criatura a até 30 pés de onde você estava faz um Save de FOR. Falha: Toma 3d10 Dano de Energia (Force) e é puxada para onde você estava. Sucesso: Metade do dano.\n*(Uso: 1x por Descanso Longo, ou gastando 5 Pontos de Feitiçaria).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Feitiçaria Mecânica (Clockwork)": {
    magiasBonus: {
      nivel1: ["Alarme", "Auxílio", "Proteção contra o Bem e o Mal"],
      nivel2: ["Restauração Menor"],
      nivel3: ["Dissipar Magia", "Proteção contra Energia"],
      nivel4: ["Movimentação Livre", "Invocar Construto"],
      nivel5: ["Restauração Maior", "Muralha de Energia"]
    },
    features: {
      3: [
        { 
          nome: "Restaurar Equilíbrio", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 60 pés for rolar o d20 com Vantagem ou Desvantagem, você anula essa Vantagem/Desvantagem, fazendo o dado ser rolado normalmente.\n*(Usos: Igual ao Mod. de Carisma por Descanso Longo).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      6: [
        { 
          nome: "Bastião da Lei", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Gaste de 1 a 5 Pontos de Feitiçaria para criar um escudo ao redor de um aliado a até 30 pés. O escudo tem uma reserva de dados igual aos pontos gastos (Ex: 3pts = 3d8). Quando o aliado tomar dano, ele pode rolar qualquer quantidade desses dados para reduzir o dano sofrido." 
        }
      ],
      14: [
        { 
          nome: "Transe da Ordem", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Por 1 minuto: Inimigos não podem usar Vantagem para te atacar, e sempre que você fizer um teste de d20, qualquer rolagem 9 ou menor no dado vira um 10 automático.\n*(Uso: 1x por Descanso Longo, ou gastando 5 Pontos de Feitiçaria).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      18: [
        { 
          nome: "Cavalgada Mecânica", 
          tipoAcao: "acao", 
          desc: "**Ação Mágica:** Em um cubo de 30 pés, espíritos da Ordem fazem o seguinte:\n- Curam até 100 PV divididos entre os alvos que você quiser.\n- Reparam todos os objetos danificados na área.\n- Dissipam qualquer magia de Nível 6 ou inferior que você escolher.\n*(Uso: 1x por Descanso Longo, ou gastando 7 Pontos de Feitiçaria).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Feitiçaria Dracônica (Draconic)": {
    // Menu pro VTT perguntar o elemento dracônico!
    escolhasNivel3: [
      {
        titulo: "Linhagem Dracônica",
        tipo: "talento",
        opcoes: [
          { nome: "Ácido", desc: "Magias elementais e afinidade focadas em Ácido." },
          { nome: "Frio", desc: "Magias elementais e afinidade focadas em Frio." },
          { nome: "Fogo", desc: "Magias elementais e afinidade focadas em Fogo." },
          { nome: "Eletricidade", desc: "Magias elementais e afinidade focadas em Eletricidade." },
          { nome: "Veneno", desc: "Magias elementais e afinidade focadas em Veneno." }
        ]
      }
    ],
    magiasBonus: {
      nivel1: ["Comando", "Orbe Cromática"],
      nivel2: ["Alterar-se", "Sopro do Dragão"],
      nivel3: ["Medo", "Voo"],
      nivel4: ["Enfeitiçar Monstro", "Olho Arcano"],
      nivel5: ["Lendas e Histórias", "Invocar Dragão"]
    },
    features: {
      3: [
        { 
          nome: "Resiliência Dracônica", 
          tipoAcao: "passiva", 
          desc: "**Vitalidade:** Seu limite de PV Máximo aumenta em +3 no nível 3 (e ganha +1 em cada nível futuro).\n**Escamas:** Se não usar armadura, sua CA base é (10 + Destreza + Carisma)." 
        }
      ],
      6: [
        { 
          nome: "Afinidade Elemental", 
          tipoAcao: "passiva", 
          desc: "Você ganha Resistência ao elemento da sua Linhagem. Além disso, sempre que conjurar uma magia que cause dano desse elemento, você pode somar seu Mod. de Carisma em UMA das rolagens de dano contra um alvo." 
        }
      ],
      14: [
        { 
          nome: "Asas de Dragão", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você manifesta asas de dragão por 1 hora, ganhando Deslocamento de Voo de 60 pés (18m).\n*(Uso: 1x por Descanso Longo, ou gastando 3 Pontos de Feitiçaria).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ],
      18: [
        { 
          nome: "Companheiro Dragão", 
          tipoAcao: "acao", 
          desc: "Você pode conjurar a magia *Invocar Dragão* ignorando os componentes materiais. Você pode usar isso 1x de graça por Descanso Longo.\nAlém disso, você pode conjurar essa magia e optar por remover a Concentração (se o fizer, a duração vira 1 minuto)." 
        }
      ]
    }
  },

  "Magia Selvagem (Wild Magic)": {
    features: {
      3: [
        { 
          nome: "Surto de Magia Selvagem", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Imediatamente após você conjurar uma magia de Feiticeiro (gastando espaço de magia).\n**Efeito:** Role 1d20. Se cair 20, role 1d100 na Tabela de Magia Selvagem do Mestre para gerar um efeito mágico caótico (que não pode ser alterado por Metamagia)." 
        },
        { 
          nome: "Marés do Caos", 
          tipoAcao: "livre", 
          desc: "Antes de rolar qualquer d20, você pode ganhar Vantagem na rolagem. Você recupera esse uso após um Descanso Longo. \n*Atenção:* Se você usar isso, a PRÓXIMA magia de Feiticeiro com slot que você conjurar fará você rolar automaticamente na Tabela de Surto Selvagem (isso recarrega o Marés do Caos)." 
        }
      ],
      6: [
        { 
          nome: "Dobrar a Sorte", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando uma criatura a 60 pés que você possa ver fizer uma rolagem de d20, gaste 1 Ponto de Feitiçaria para rolar 1d4 e somar ou subtrair do resultado dela." 
        }
      ],
      14: [
        { 
          nome: "Caos Controlado", 
          tipoAcao: "passiva", 
          desc: "Sempre que for rolar na Tabela de Magia Selvagem, role DUAS VEZES (dois d100s) e escolha qual dos dois efeitos vai acontecer." 
        }
      ],
      18: [
        { 
          nome: "Surto Domado", 
          tipoAcao: "passiva", 
          desc: "Após conjurar uma magia com slot, em vez de rolar os dados, você escolhe EXATAMENTE o efeito que quiser da Tabela de Magia Selvagem (exceto a última linha de recuperar pontos/vida).\n*(Uso: 1 vez por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Feitiçaria do Fogo Mágico (Spellfire)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos", "Raio Guiador"],
      nivel2: ["Raio Ardente", "Restauração Menor"],
      nivel3: ["Aura de Vitalidade", "Dissipar Magia"],
      nivel4: ["Escudo de Fogo", "Muralha de Fogo"],
      nivel5: ["Coluna de Chamas", "Restauração Maior"]
    },
    features: {
      3: [
        { 
          nome: "Explosão de Fogo Mágico", 
          tipoAcao: "livre", 
          desc: "**Gatilho (1x/turno):** Quando gastar pelo menos 1 Ponto de Feitiçaria numa Ação ou Ação Bônus.\n**Efeito:** Escolha UM (Alvo a 30 pés):\n- *Chamas Fortalecedoras:* Dá 1d4 + Mod. CAR em PV Temporários.\n- *Fogo Radiante:* Causa 1d4 de Dano (Fogo ou Radiante) ao inimigo." 
        }
      ],
      6: [
        { 
          nome: "Absorver Magias", 
          tipoAcao: "passiva", 
          desc: "Você sempre tem *Contramágica* (Counterspell) preparada. Sempre que um inimigo falhar no Save contra a sua Contramágica (sucesso seu em cancelar a magia), você recupera 1d4 Pontos de Feitiçaria." 
        }
      ],
      14: [
        { 
          nome: "Fogo Mágico Afiado", 
          tipoAcao: "passiva", 
          desc: "Sua *Explosão de Fogo Mágico* melhora: A cura adiciona o seu Nível de Feiticeiro no cálculo dos PV temporários, e o dano do *Fogo Radiante* sobe para 1d8." 
        }
      ],
      18: [
        { 
          nome: "Coroa de Fogo Mágico", 
          tipoAcao: "livre", 
          desc: "Ao ativar a sua *Feitiçaria Inata*, você ganha estes bônus na fúria mágica:\n- **Voo:** Ganha Voo de 60 pés (pairar).\n- **Esquiva Mágica:** Em efeitos mágicos que permitem Save para tomar metade do dano, você toma ZERO dano se passar, e apenas metade se falhar.\n- **Queimar Vida:** (Reação) Ao ser atacado, pode queimar Dados de Vida (até seu Mod. CAR). Role os dados e reduza o dano tomado nesse valor.\n*(Uso da Coroa: 1x por Descanso Longo, ou gastando 5 Pontos).* " 
        }
      ]
    }
  },
  "Alma Divina (Divine Soul)": {
    // Menu pro VTT perguntar a Afinidade no Nível 3
    escolhasNivel3: [
      {
        titulo: "Afinidade Divina",
        tipo: "talento",
        opcoes: [
          { nome: "Bem", desc: "Magia Bônus: Curar Ferimentos." },
          { nome: "Mal", desc: "Magia Bônus: Infligir Ferimentos." },
          { nome: "Ordem", desc: "Magia Bônus: Bênção." },
          { nome: "Caos", desc: "Magia Bônus: Perdição." },
          { nome: "Neutralidade", desc: "Magia Bônus: Proteção contra o Bem e o Mal." }
        ]
      }
    ],
    features: {
      3: [ // Habilidades do Nv 1 movidas para o Nv 3
        { 
          nome: "Magia Divina", 
          tipoAcao: "passiva", 
          desc: "Sempre que você aprender uma magia nova de Feiticeiro (ou truque), você pode escolhê-la da lista de Feiticeiro OU da lista do Clérigo. Ela passa a contar como uma Magia de Feiticeiro para você.\nAlém disso, você ganha 1 magia gratuita baseada na Afinidade Divina que você escolheu." 
        },
        { 
          nome: "Favorecido pelos Deuses", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Se você falhar num Teste de Resistência ou errar uma Rolada de Ataque.\n**Efeito:** Role 2d4 e adicione ao resultado, o que pode transformar a falha em sucesso.\n*(Uso: 1 vez por Descanso Curto ou Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Curto"
        }
      ],
      6: [
        { 
          nome: "Cura Potencializada", 
          tipoAcao: "livre", 
          desc: "**Gatilho:** Quando você ou um aliado a até 5 pés rolar dados para recuperar PV através de uma magia.\n**Efeito:** Você pode gastar 1 Ponto de Feitiçaria para rolar novamente qualquer quantidade daqueles dados de cura. Você deve usar os novos resultados.\n*(Limite: Você pode usar essa habilidade apenas 1 vez por turno).* " 
        }
      ],
      14: [
        { 
          nome: "Forma Angélica", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você manifesta asas espectrais, ganhando um Deslocamento de Voo de 30 pés (9m). As asas permanecem até você ficar Incapacitado, morrer, ou dispensá-las (com outra Ação Bônus)." 
        }
      ],
      18: [
        { 
          nome: "Recuperação Sobrenatural", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Se você estiver com a vida abaixo da metade (menos que 50% dos seus PV máximos), você pode recuperar uma quantidade de Pontos de Vida igual à METADE dos seus PV Máximos.\n*(Uso: 1 vez por Descanso Longo).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },

  "Feitiçaria Lunar (Lunar)": {
    magiasBonus: {
      truques: ["Chama Sagrada"],
      // As magias estão agrupadas pela fase da Lua para facilitar a vida do jogador no grimório
      nivel1: ["(Cheia): Escudo Arcano", "(Nova): Raio Adoecente", "(Crescente): Leque Cromático"],
      nivel2: ["(Cheia): Restauração Menor", "(Nova): Cegueira/Surdez", "(Crescente): Alterar-se"],
      nivel3: ["(Cheia): Dissipar Magia", "(Nova): Toque Vampírico", "(Crescente): Montaria Fantasma"],
      nivel4: ["(Cheia): Proteção contra a Morte", "(Nova): Confusão", "(Crescente): Terreno Alucinatório"],
      nivel5: ["(Cheia): Ligação Telepática de Rary", "(Nova): Imobilizar Monstro", "(Crescente): Despistar"]
    },
    features: {
      3: [
        { 
          nome: "Fogo da Lua", 
          tipoAcao: "passiva", 
          desc: "Você aprende o truque *Chama Sagrada* (Sacred Flame). Quando você o conjura, pode mirar em um alvo normalmente, OU mirar em DUAS criaturas, desde que elas estejam a até 5 pés de distância uma da outra." 
        },
        { 
          nome: "Encarnação Lunar", 
          tipoAcao: "passiva", 
          desc: "Você possui acesso às magias das três fases da Lua. Ao fim de cada Descanso Longo, você escolhe qual fase (Cheia, Nova ou Crescente) está ativa.\nVocê pode conjurar UMA magia de Nível 1 daquela fase ativa de graça (sem gastar slot) por descanso." 
        }
      ],
      6: [
        { 
          nome: "Crescer e Minguar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Gaste 1 Ponto de Feitiçaria para mudar a sua fase lunar atual para qualquer outra.\n**Bênçãos Lunares:** Quando você usa Metamagia em uma magia que pertença à Escola de Magia da sua fase atual, o custo diminui em 1 Ponto de Feitiçaria (Mínimo de 0).\n*Escolas por Fase:* Cheia (Abjuração/Adivinhação), Nova (Encantamento/Necromancia), Crescente (Ilusão/Transmutação).\n*(Usos do Desconto: Igual ao Bônus de Proficiência por Long Rest).* ",
          recuperacao: "Descanso Longo"
        }
      ],
      14: [
        { 
          nome: "Empoderamento Lunar", 
          tipoAcao: "passiva", 
          desc: "Enquanto estiver em uma Fase, você ganha um buff passivo:\n- **Cheia:** Ação Bônus para emitir luz (10ft). Na área iluminada, você e aliados têm Vantagem em Investigação e Percepção.\n- **Nova:** Vantagem em Furtividade. Em escuridão total, ataques contra você têm Desvantagem.\n- **Crescente:** Você ganha Resistência a Dano Necrótico e Radiante." 
        }
      ],
      18: [
        { 
          nome: "Fenômeno Lunar", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Você invoca o ápice da sua fase atual (pode ser usado junto com o *Crescer e Minguar*). \n- **Cheia:** Inimigos a 30 pés fazem Save CON ou ficam Cegos até o fim do próximo turno deles. Um aliado a 30 pés cura 3d8 PV.\n- **Nova:** Inimigos a 30 pés fazem Save DES ou tomam 3d10 Necrótico (e speed cai pra 0). Você fica Invisível até atacar/conjurar.\n- **Crescente:** Teleporta 60 pés (pode levar 1 aliado voluntário junto). Ambos ganham Resistência a TODOS os danos até o início do seu próximo turno.\n*(Uso do Fenômeno: 1x por Descanso Longo, ou gastando 5 Pontos de Feitiçaria).* ",
          usosMax: 1,
          recuperacao: "Descanso Longo"
        }
      ]
    }
  },
  "Magia das Sombras (Shadow)": {
    magiasBonus: {
      nivel1: ["Perdição", "Infligir Ferimentos", "Passos sem Pegadas"],
      nivel2: ["Escuridão"],
      nivel3: ["Fome de Hadar", "Dificultar Detecção"],
      nivel4: ["Invisibilidade Maior", "Assassino Fantasmagórico"],
      nivel5: ["Contágio", "Criação"]
    },
    features: {
      3: [
        { 
          nome: "Poder das Sombras", 
          tipoAcao: "passiva", 
          desc: "**Olhos do Escuro:** Visão no Escuro de 120 pés (36m) e Percepção às Cegas (Blindsight) de 10 pés. Se conjurar a magia *Escuridão*, você consegue enxergar perfeitamente através dela.\n**Força da Sepultura:** Se você cair a 0 PV, faça um Save de Carisma (CD 5 + dano sofrido). Se passar, você fica com PV = (Nível + Mod CAR). *(1x por Descanso Longo).* " 
        }
      ],
      6: [
        { 
          nome: "Feras do Mau Agouro", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Gaste 3 Pontos de Feitiçaria para conjurar *Invocar Besta* (sem gastar slot ou materiais). A Besta é feita de sombras. Inimigos a 5 pés dessa Besta recebem Desvantagem em Testes de Resistência contra as SUAS magias.\nVocê pode escolher ignorar a Concentração (a besta dura apenas 1 minuto)." 
        }
      ],
      14: [
        { 
          nome: "Passo das Sombras", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Enquanto você estiver sob Meia-Luz ou Escuridão total, você pode teleportar até 120 pés para um espaço vazio que também esteja no escuro." 
        }
      ],
      18: [
        { 
          nome: "Forma Umbral", 
          tipoAcao: "livre", 
          desc: "Ao ativar a sua *Feitiçaria Inata*, você vira uma Sombra por 1 minuto:\n- **Movimento Incorpóreo:** Atravessa criaturas/objetos (toma 1d10 Energia se terminar dentro deles).\n- **Resiliência Sombria:** Resistência a TODOS os tipos de dano do jogo (exceto Energia e Radiante).\n*(Uso da Forma: 1x por Descanso Longo, ou gastando 6 Pontos).* " 
        }
      ]
    }
  },
  "Feitiçaria da Tempestade (Storm)": {
    features: {
      3: [ // Movido do Nv 1 pro 3
        { 
          nome: "Falante do Vento", 
          tipoAcao: "passiva", 
          desc: "Você aprende a falar, ler e escrever o idioma Primordial (e entende os dialetos Aquan, Auran, Ignan e Terran)." 
        },
        { 
          nome: "Magia Tempestuosa", 
          tipoAcao: "bonus", 
          desc: "**Ação Bônus:** Imediatamente ANTES ou DEPOIS de você conjurar uma magia de Nível 1 ou superior, você usa os ventos para voar até 10 pés (3m) para um espaço vazio. Esse movimento NÃO provoca Ataques de Oportunidade." 
        }
      ],
      6: [
        { 
          nome: "Coração da Tempestade", 
          tipoAcao: "livre", 
          desc: "**Passiva:** Você ganha Resistência a Dano de Eletricidade e Trovão.\n**Erupção:** Sempre que começar a conjurar uma magia de Nível 1+ que cause dano de Eletricidade ou Trovão, você faz uma explosão local: Inimigos (à sua escolha) a até 10 pés tomam dano de Eletricidade ou Trovão igual a metade do seu Nível de Feiticeiro." 
        },
        { 
          nome: "Guia da Tempestade", 
          tipoAcao: "acao", 
          desc: "Você ganha controle sutil sobre o clima.\n**Chuva (Ação):** Cria um escudo invisível de 20 pés ao seu redor onde a chuva não cai.\n**Vento (Ação Bônus):** Você dita a direção do vento natural em uma esfera de 100 pés ao seu redor até o seu próximo turno (não altera a força do vento, apenas a direção)." 
        }
      ],
      14: [
        { 
          nome: "Fúria da Tempestade", 
          tipoAcao: "reacao", 
          desc: "**Reação:** Quando você for acertado por um ataque corpo a corpo, você eletrocuta o atacante. Ele sofre Dano Elétrico igual ao seu Nível de Feiticeiro e deve fazer um Save de FOR. Falha: Ele é empurrado até 20 pés (6m) para longe de você em linha reta." 
        }
      ],
      18: [
        { 
          nome: "Alma do Vento", 
          tipoAcao: "acao", 
          desc: "**Passiva:** Suas resistências viram IMUNIDADE a Dano de Eletricidade e Trovão. Você também ganha Deslocamento de Voo passivo de 60 pés (18m).\n**Ação:** Você pode reduzir seu voo para 30 pés por 1 hora, para poder compartilhar ventos com seus aliados (até 3 + Mod CAR). Eles ganham Voo de 30 pés por 1 hora. *(Compartilhar exige 1 Descanso Curto/Longo para recarregar).* " 
        }
      ]
    }
  }


};