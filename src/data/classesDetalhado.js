// src/data/classesDetalhado.js
import { ARMAS, PROPRIEDADES_MAESTRIA } from './armas'; // <--- IMPORTAMOS O ARSENAL

const opcoesDeArmas = ARMAS.map(arma => ({
  nome: arma.nome,
  desc: `${arma.dano} ${arma.tipo}. ✨ ${arma.maestria}: ${PROPRIEDADES_MAESTRIA[arma.maestria] || "Efeito especial."}`
}));


export const CLASSES_DETALHADAS = {
  "Guerreiro": {
    nome: "Guerreiro",
    descricao: "Mestres de diversas técnicas de armas e armaduras, os Guerreiros são combatentes superiores, conhecidos tanto pela força bruta quanto pela tática refinada.",
    dadoVida: 10,
    
    proficiencias: {
      armaduras: ["Leves", "Médias", "Pesadas", "Escudos"],
      armas: ["Simples", "Marciais"],
      testes: ["Força", "Constituição"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Acrobacia", "Adestrar Animais", "Atletismo", "História", "Intuição", "Intimidação", "Percepção", "Persuasão", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Kit de Combate (Opção A)",
        itens: ["Cota de Malha", "Espada Grande (Greatsword)", "Mangual", "8 Azagaias", "Pacote de Masmorra"],
        ouro: 4
      },
      b: {
        titulo: "Ágil (Opção B)",
        itens: ["Couro Batido", "Cimitarra", "Espada Curta", "Arco Longo", "20 Flechas", "Aljava", "Pacote de Masmorra"],
        ouro: 11
      },
      c: {
        titulo: "Riqueza Inicial (Opção C)",
        ouro: 155
      }
    },

    // Sub-escolhas no Nível 1 (Estilo de Luta)
    // src/data/classesDetalhado.js (Dentro de Guerreiro)

    escolhasNivel1: [
      {
        titulo: "Estilo de Luta (Fighting Style)",
        tipo: "talento",
        opcoes: [
          { nome: "Arquearia (Archery)", desc: "Você ganha +2 de bônus nas jogadas de ataque com armas à distância." },
          { nome: "Combate às Cegas (Blind Fighting)", desc: "Você tem Percepção às Cegas (Blindsight) com alcance de 10 pés (3m)." },
          { nome: "Defesa (Defense)", desc: "Enquanto estiver usando armadura Leve, Média ou Pesada, você ganha +1 de bônus na CA." },
          { nome: "Duelismo (Dueling)", desc: "Quando empunhar uma arma corpo a corpo em uma mão e nenhuma outra arma, você ganha +2 de dano com ela." },
          { nome: "Luta com Armas Grandes (Great Weapon Fighting)", desc: "Ao rolar dano com arma de duas mãos ou versátil (usada com duas mãos), você trata qualquer 1 ou 2 no dado como sendo 3." },
          { nome: "Intercepção (Interception)", desc: "Reação: Quando criatura a 5ft for atingida, reduza o dano em 1d10 + Proficiência. Requer Escudo ou Arma." },
          { nome: "Proteção (Protection)", desc: "Reação: Quando criatura a 5ft atacar outro alvo, imponha Desvantagem no ataque. Requer Escudo." },
          { nome: "Luta com Armas de Arremesso (Thrown Weapon Fighting)", desc: "Ao acertar ataque à distância com arma de arremesso, ganha +2 de dano." },
          { nome: "Combate com Duas Armas (Two Weapon Fighting)", desc: "Ao fazer ataque extra com arma Leve, você adiciona seu modificador de habilidade ao dano." },
          { nome: "Luta Desarmada (Unarmed Fighting)", desc: "Seus ataques desarmados causam 1d6 + Força (ou 1d8 se duas mãos livres). No início do turno, causa 1d4 em quem estiver agarrado." }
        ]
      },
    
    // 3 Escolhas de Maestria (Guerreiro Nvl 1)
      {
        titulo: "Maestria em Arma (Escolha 1)",
        opcoes: opcoesDeArmas // Usa a lista importada do armas.js
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        opcoes: opcoesDeArmas
      },
      {
        titulo: "Maestria em Arma (Escolha 3)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Arquétipo Marcial (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // --- D&D 2024 ---
          { 
            nome: "Campeão (Champion)", 
            desc: "Crítico Aprimorado (rola 19 ou 20). Atleta Notável: Vantagem em Iniciativa e Atletismo. Ao critar, move metade do deslocamento.",
            usos: 0 // Passivo
          },
          { 
            nome: "Mestre de Batalha (Battle Master)", 
            desc: "Ganha 4 Dados de Superioridade (d8). Aprende 3 Manobras (ex: Derrubar, Ripostar). Estudante da Guerra: ganha 1 ferramenta e 1 perícia.",
            usos: 4,
            recuperacao: "Descanso Curto"
          },
          { 
            nome: "Cavaleiro Arcano (Eldritch Knight)", 
            desc: "Ganha Conjuração (Inteligência), Truques e Espaços de Magia. Vínculo com Arma: Pode invocar sua arma como ação bônus.",
            usos: 0 // Slots de magia são geridos no grimório
          },
          { 
            nome: "Guerreiro Psiônico (Psi Warrior)", 
            desc: "Ganha Dados de Energia Psiônica (2x Proficiência). Usa para reduzir dano (Campo Protetor), aumentar dano (Golpe Psiônico) ou mover objetos.",
            usos: 4, // Começa com 4 (2 * prof 2) aprox, ou tabela fixa
            recuperacao: "Descanso Longo" // Recupera 1 em curto
          },

          // --- LEGADO & EXTRAS ---
          {
            nome: "Arqueiro Arcano (Arcane Archer)",
            desc: "Disparo Arcano: 2 vezes por descanso, imbuia flechas com magia (ex: Flecha Explosiva, Flecha de Sombras). Ganha Prestidigitação ou Druidismo.",
            usos: 2,
            recuperacao: "Descanso Curto"
          },
          {
            nome: "Cavaleiro (Cavalier)",
            desc: "Nascido para a Sela (não cai da montaria). Marca Inabalável: Marca inimigos atingidos; eles têm desvantagem contra outros. Ataque extra se eles baterem em aliados.",
            usos: 3, // Baseado em Força, média 3
            recuperacao: "Descanso Longo"
          },
          {
            nome: "Cavaleiro do Eco (Echo Knight)",
            desc: "Manifestar Eco: Cria um clone de sombra. Pode atacar do lugar dele e trocar de lugar (teleporte). Liberar Encarnação: Ataque extra da posição do eco (Con vezes).",
            usos: 3, // Baseado em Con, média 3
            recuperacao: "Descanso Longo"
          },
          {
            nome: "Cavaleiro Rúnico (Rune Knight)",
            desc: "Entalhador de Runas: Inscreve runas em equipamentos (Fogo, Nuvem, Pedra) para efeitos passivos e ativos. Poder do Gigante: Fica Grande, vantagem em Força e dano extra.",
            usos: 2, // Proficiency Bonus
            recuperacao: "Descanso Longo"
          },
          {
            nome: "Samurai",
            desc: "Espírito de Lutador: Ação bônus para ganhar Vantagem em ataques e 5 PV temporários. Ganha proficiência em Persuasão, História ou Intuição.",
            usos: 3,
            recuperacao: "Descanso Longo"
          },
          {
            nome: "Estandarte / Banneret (PDK)",
            desc: "Enviado Real. Retomar o Fôlego em Grupo: Ao usar Second Wind, cura também 3 aliados próximos.",
            usos: 0 // Passivo (melhora o Second Wind)
          }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { 
            nome: "Estilo de Luta", 
            desc: "Você adota um estilo de combate particular que será sua especialidade (escolhido na criação)." 
          },
          { 
            nome: "Retomar o Fôlego (Second Wind)", 
            desc: "Ação Bônus: Recupere PV igual a 1d10 + Nível de Guerreiro.",
            usos: 2, 
            recuperacao: "Descanso Curto"
          },
          {
            nome: "Maestria em Armas (Weapon Mastery)",
            desc: "Você pode utilizar as propriedades de maestria de 3 armas à sua escolha (ex: Cleave, Nick, Push, Topple). Pode trocar num Descanso Longo."
          }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          {
            nome: "Surto de Ação (Action Surge)",
            desc: "Você pode realizar uma ação adicional no seu turno (exceto a ação de Magia).",
            usos: 1,
            recuperacao: "Descanso Curto"
          },
          {
            nome: "Mente Tática (Tactical Mind)",
            desc: "Quando falhar em um teste de habilidade, gaste um uso de Second Wind para adicionar 1d10 ao teste. Se falhar mesmo assim, o uso não é gasto."
          }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Arquétipo Marcial (Subclasse)", desc: "Você escolhe um arquétipo que define seu estilo de combate (ex: Campeão, Mestre de Batalha)." }
        ] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." },
          { nome: "Retomar o Fôlego (Upgrade)", desc: "Seus usos de Second Wind aumentam para 3.", usos: 3, recuperacao: "Descanso Curto" } // Atualiza visualmente
        ] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", desc: "Você pode atacar duas vezes, em vez de uma, sempre que realizar a ação de Ataque no seu turno." },
          { nome: "Deslocamento Tático (Tactical Shift)", desc: "Sempre que ativar Second Wind, você pode mover-se até metade do seu deslocamento sem provocar ataques de oportunidade." },
          { nome: "Maestria em Armas (Upgrade)", desc: "Agora você domina 4 armas." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso de Arquétipo", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { 
            nome: "Indomável (Indomitable)", 
            desc: "Se falhar em uma salvaguarda, você pode rerolar com um bônus igual ao seu Nível de Guerreiro. Deve usar o novo valor.",
            usos: 1,
            recuperacao: "Descanso Longo"
          },
          { nome: "Mestre Tático (Tactical Master)", desc: "Ao atacar com uma arma que você tem maestria, pode trocar a propriedade dela por Push, Sap ou Slow naquele ataque." }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso de Arquétipo", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Retomar o Fôlego (Upgrade)", desc: "Seus usos de Second Wind aumentam para 4.", usos: 4, recuperacao: "Descanso Curto" },
          { nome: "Maestria em Armas (Upgrade)", desc: "Agora você domina 5 armas." }
        ] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Dois Ataques Extras", desc: "Você agora pode atacar três vezes sempre que realizar a ação de Ataque." }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Indomável (Upgrade)", desc: "Seus usos de Indomável aumentam para 2.", usos: 2, recuperacao: "Descanso Longo" },
          { nome: "Ataques Estudados", desc: "Se você errar um ataque contra uma criatura, você tem Vantagem no próximo ataque contra ela até o fim do seu próximo turno." }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso de Arquétipo", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente um atributo ou escolha um Talento." },
          { nome: "Maestria em Armas (Upgrade)", desc: "Agora você domina 6 armas." }
        ] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Surto de Ação (Upgrade)", desc: "Você pode usar Surto de Ação duas vezes antes de descansar (mas apenas uma vez por turno).", usos: 2, recuperacao: "Descanso Curto" },
          { nome: "Indomável (Upgrade)", desc: "Seus usos de Indomável aumentam para 3.", usos: 3, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [{ nome: "Recurso de Arquétipo", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica (Epic Boon)", desc: "Escolha um talento de Dádiva Épica." }] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [{ nome: "Três Ataques Extras", desc: "Você agora pode atacar quatro vezes sempre que realizar a ação de Ataque." }] 
      }
    ]
  },
  "Mago": {
    nome: "Mago",
    descricao: "Um estudioso da magia arcana, capaz de manipular a realidade com feitiços aprendidos em seu grimório.",
    dadoVida: 6,
    
    proficiencias: {
      armaduras: [],
      armas: ["Simples"],
      testes: ["Inteligência", "Sabedoria"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Arcanismo", "História", "Intuição", "Investigação", "Medicina", "Natureza", "Religião"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Kit de Estudioso",
        itens: ["2 Adagas", "Foco Arcano (Bordão)", "Robe", "Grimório", "Pacote de Estudioso"],
        ouro: 5
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 55
      }
    },

    magiasInicial: {
      truquesConhecidos: 3,
      magiasConhecidas: 6, 
      espacosMagia: 2 
    },

    escolhasNivel2: [
      {
        titulo: "Erudito (Scholar)",
        tipo: "pericia_expertise",
        opcoes: [
          { nome: "Arcanismo", desc: "Ganha Expertise (Dobro de Proficiência)." },
          { nome: "História", desc: "Ganha Expertise." },
          { nome: "Investigação", desc: "Ganha Expertise." },
          { nome: "Medicina", desc: "Ganha Expertise." },
          { nome: "Natureza", desc: "Ganha Expertise." },
          { nome: "Religião", desc: "Ganha Expertise." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Tradição Arcana (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024 Core
          { nome: "Abjurador (Abjurer)", desc: "Especialista em proteção e banimento. Cria uma Proteção Arcana (Ward) que absorve dano." },
          { nome: "Adivinho (Diviner)", desc: "Vê o futuro. Usa 'Portent' para substituir rolagens de dados com valores pré-rolados." },
          { nome: "Evocador (Evoker)", desc: "Mestre da destruição elemental. Pode esculpir magias para não ferir aliados." },
          { nome: "Ilusionista (Illusionist)", desc: "Engana os sentidos. Pode criar ilusões com ação bônus e torná-las semi-reais." },
          
          // Legado & Extras
          { nome: "Lâmina Cantante (Bladesinger)", desc: "Combina espada e magia. Entra na 'Canção da Lâmina' para ganhar CA e Concentração." },
          { nome: "Cronurgista (Chronurgy)", desc: "Manipula o tempo. Pode forçar rerolagens e congelar criaturas no tempo." },
          { nome: "Graviturgista (Graviturgy)", desc: "Manipula a gravidade. Altera o peso de criaturas e move alvos ao acertar magias." },
          { nome: "Necromante (Necromancy)", desc: "Mestre da vida e morte. Cura-se ao matar inimigos e cria mortos-vivos mais fortes." },
          { nome: "Transmutador (Transmutation)", desc: "Altera a matéria. Cria uma Pedra do Transmutador com buffs passivos." },
          { nome: "Mago de Guerra (War Magic)", desc: "Focado em combate tático. Ganha bônus na iniciativa e pode usar reação para aumentar CA/Save." },
          { nome: "Ordem dos Escribas (Scribes)", desc: "O grimório desperta. Pode mudar o tipo de dano das magias e conjurar através de um 'Mente Manifestada'." },
          { nome: "Encantador (Enchantment)", desc: "Mestre da mente. Pode hipnotizar criaturas com o olhar e desviar ataques." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração", desc: "Você tem um Grimório com magias. Pode preparar magias após Long Rest. INT é seu atributo." },
          { nome: "Adepto de Rituais", desc: "Você pode conjurar qualquer magia de ritual do seu grimório sem prepará-la." },
          { nome: "Recuperação Arcana", desc: "1x por dia, em um Short Rest, recupera slots de magia (Nível/2).", usos: 1, recuperacao: "Descanso Longo" }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Erudito (Scholar)", desc: "Você ganha Expertise em uma perícia acadêmica (escolhida na criação)." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Tradição Arcana", desc: "Escolha sua escola de especialização mágica." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Memorizar Magia", desc: "Ao terminar um Short Rest, você pode trocar uma magia preparada por outra do grimório." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Maestria em Magia", desc: "Escolha uma magia de nv 1 e uma de nv 2. Você pode lançá-las sem gastar slot (no nível base)." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Magias de Assinatura", desc: "Escolha duas magias de nv 3. Elas estão sempre preparadas e você pode lançar cada uma 1x por descanso curto sem gastar slot." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },
  "Ladino": {
    nome: "Ladino",
    descricao: "Um trapaceiro que usa furtividade, astúcia e vulnerabilidades dos inimigos para levar a melhor em qualquer situação.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples", "Marciais (Acuidade/Leve)"],
      testes: ["Destreza", "Inteligência"]
    },

    escolhaPericias: {
      qtd: 4,
      lista: ["Acrobacia", "Atletismo", "Enganação", "Furtividade", "Intimidação", "Intuição", "Investigação", "Percepção", "Performance", "Persuasão", "Prestidigitação", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Kit de Emboscada",
        itens: ["Armadura de Couro", "2 Adagas", "Espada Curta", "Arco Curto", "20 Flechas", "Aljava", "Ferramentas de Ladrão", "Pacote de Assaltante"],
        ouro: 8
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 100
      }
    },

    escolhasNivel3: [
      {
        titulo: "Arquétipo Ladino (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Ladrão (Thief)", desc: "Mãos Rápidas, escalada aprimorada e uso de itens mágicos." },
          { nome: "Assassino (Assassin)", desc: "Mestre do disfarce, venenos e dano crítico em alvos surpresos." },
          { nome: "Trapaceiro Arcano (Arcane Trickster)", desc: "Combina furtividade com ilusões e encantamentos mágicos." },
          { nome: "Lâmina da Alma (Soulknife)", desc: "Manifesta lâminas psíquicas e usa telepatia." },
          // Extras/Legado
          { nome: "Herdeiro dos Três (Scion of the Three)", desc: "Agente de Bane, Bhaal ou Myrkul. Usa medo e dano necrótico." },
          { nome: "Investigativo (Inquisitive)", desc: "Mestre em descobrir mentiras e analisar táticas inimigas." },
          { nome: "Mentor (Mastermind)", desc: "Foca em intriga, disfarce e ajudar aliados à distância (Ação de Ajuda Bônus)." },
          { nome: "Fantasma (Phantom)", desc: "Conexão com a morte. Causa dano necrótico extra e atravessa paredes." },
          { nome: "Batedor (Scout)", desc: "Especialista em sobrevivência e emboscada (Misto de Ladino/Ranger)." },
          { nome: "Espadachim (Swashbuckler)", desc: "Duelista carismático focado em x1 e iniciativa." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Ataque Furtivo (1d6)", desc: "1x por turno: +1d6 dano se tiver Vantagem ou aliado a 1,5m do alvo. (Arma Acuidade/Distância)." },
          { nome: "Especialização (Expertise)", desc: "Dobre sua proficiência em 2 perícias (ou ferramentas)." },
          { nome: "Gíria de Ladrão", desc: "Você conhece o dialeto secreto criminoso e mais um idioma." },
          { nome: "Maestria em Armas", desc: "Você domina a propriedade de 2 armas (ex: Nick, Vex)." }
        ] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Ação Astuta (Cunning Action)", desc: "Ação Bônus: Correr (Dash), Desengajar (Disengage) ou Esconder (Hide)." }
        ] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Arquétipo Ladino (Subclasse)", desc: "Escolha seu caminho no crime ou aventura." },
          { nome: "Ataque Furtivo (2d6)", desc: "Seu dano extra aumenta para 2d6." },
          { nome: "Mira Firme (Steady Aim)", desc: "Ação Bônus: Se não mover, ganha Vantagem no próximo ataque." }
        ] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Esquiva Sobrenatural", desc: "Reação: Reduz à metade o dano de um ataque que você possa ver." },
          { nome: "Ataque Furtivo (3d6)", desc: "Seu dano extra aumenta para 3d6." },
          { nome: "Golpes Astutos (Cunning Strike)", desc: "Troque dados de Sneak Attack por efeitos (Desarmar, Derrubar, Recuar, Veneno)." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Especialização (Upgrade)", desc: "Escolha mais 2 perícias para dobrar a proficiência." }] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Evasão", desc: "Em saves de DES para meio dano, você não leva nada se passar e só metade se falhar." },
          { nome: "Talento Confiável (Reliable Talent)", desc: "Em testes de perícia que você treinou, rolagens 9 ou menos viram 10." },
          { nome: "Ataque Furtivo (4d6)", desc: "Seu dano extra aumenta para 4d6." }
        ] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso de Arquétipo", desc: "Habilidade de Subclasse." },
          { nome: "Ataque Furtivo (5d6)", desc: "Seu dano extra aumenta para 5d6." }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Golpes Astutos Aprimorados", desc: "Pode usar 2 efeitos de Cunning Strike ao mesmo tempo." },
          { nome: "Ataque Furtivo (6d6)", desc: "Seu dano extra aumenta para 6d6." }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Recurso de Arquétipo", desc: "Habilidade de Subclasse." },
          { nome: "Ataque Furtivo (7d6)", desc: "Seu dano extra aumenta para 7d6." }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Golpes Desonestos (Devious Strikes)", desc: "Novas opções de Cunning Strike: Atordoar (Daze), Nocautear (Knock Out), Obscurecer (Obscure)." },
          { nome: "Sentido Cego (Blindsense)", desc: "Percebe criaturas escondidas/invisíveis a 3m." }
        ] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Mente Escorregadia", desc: "Proficiência em Saves de Sabedoria e Carisma." },
          { nome: "Ataque Furtivo (8d6)", desc: "Seu dano extra aumenta para 8d6." }
        ] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso de Arquétipo", desc: "Habilidade de Subclasse." },
          { nome: "Ataque Furtivo (9d6)", desc: "Seu dano extra aumenta para 9d6." }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [{ nome: "Elusivo", desc: "Ninguém tem Vantagem contra você (se não estiver incapacitado)." }] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." },
          { nome: "Ataque Furtivo (10d6)", desc: "Seu dano extra aumenta para 10d6." }
        ] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Golpe de Sorte", desc: "Uma vez por descanso curto, transforme uma falha em um 20 natural." }
        ] 
      }
    ]
  },

  "Clérigo": {
    nome: "Clérigo",
    descricao: "Um campeão sacerdotal que empunha magia divina a serviço de um poder superior.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: ["Leves", "Médias", "Escudos"],
      armas: ["Simples"],
      testes: ["Sabedoria", "Carisma"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["História", "Intuição", "Medicina", "Persuasão", "Religião"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Sacerdote Combatente",
        itens: ["Cota de Malha (Chain Shirt)", "Escudo", "Maça", "Símbolo Sagrado", "Pacote de Sacerdote"],
        ouro: 7
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 110
      }
    },

    magiasInicial: {
      truquesConhecidos: 3,
      magiasConhecidas: 4, // Inicial preparado (aproximado)
      espacosMagia: 2
    },

    escolhasNivel1: [
      {
        titulo: "Ordem Divina",
        tipo: "feature_base", // Lógica customizada (texto por enquanto)
        opcoes: [
          { 
            nome: "Protetor (Protector)", 
            desc: "Ganhe proficiência em Armaduras Pesadas e Armas Marciais." 
          },
          { 
            nome: "Taumaturgo (Thaumaturge)", 
            desc: "Ganhe um Truque extra. Ganhe bônus em Arcanismo ou Religião igual ao mod de Sabedoria." 
          }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Domínio Divino (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Domínio do Conhecimento (Knowledge)", desc: "Estudiosos e espiões mentais. Lê pensamentos e ganha expertises." },
          { nome: "Domínio da Vida (Life)", desc: "O curandeiro supremo. Cura mais PV e se cura ao curar outros." },
          { nome: "Domínio da Luz (Light)", desc: "Queima inimigos com fogo e luz. Impõe desvantagem em ataques." },
          { nome: "Domínio da Trapaça (Trickery)", desc: "Cria ilusões duplicatas e melhora furtividade." },
          { nome: "Domínio da Guerra (War)", desc: "Combate corpo a corpo. Ataque com ação bônus e bônus de acerto." },
          // Legado
          { nome: "Domínio Arcano (Arcana)", desc: "Mistura magia de Mago com Clérigo. Expulsa extraplanares." },
          { nome: "Domínio da Morte (Death)", desc: "Foca em dano necrótico e matar inimigos. Ignora resistência a necrótico." },
          { nome: "Domínio da Forja (Forge)", desc: "Cria itens mágicos temporários e resiste ao fogo." },
          { nome: "Domínio da Sepultura (Grave)", desc: "Impede a morte e detecta mortos-vivos. Maximiza cura em quem está morrendo." },
          { nome: "Domínio da Natureza (Nature)", desc: "Controla plantas e animais. Ganha armadura pesada e truque de druida." },
          { nome: "Domínio da Ordem (Order)", desc: "Comanda aliados a atacar e encanta inimigos com autoridade." },
          { nome: "Domínio da Paz (Peace)", desc: "Cria laços entre aliados para somar d4 em jogadas. Teleporta para proteger amigos." },
          { nome: "Domínio da Tempestade (Tempest)", desc: "Usa trovão e relâmpago. Empurra inimigos e maximiza dano." },
          { nome: "Domínio do Crepúsculo (Twilight)", desc: "Protege o grupo com aura de PV temporários e dissipa medo/charme." }
        ]
      }
    ],

    escolhasNivel7: [
      {
        titulo: "Golpes Abençoados (Blessed Strikes)",
        tipo: "feature_base",
        opcoes: [
          { nome: "Golpe Divino (Divine Strike)", desc: "1x por turno: +1d8 dano (Necrótico ou Radiante) com armas." },
          { nome: "Conjuração Potente (Potent Spellcasting)", desc: "Some seu mod de SAB no dano dos seus truques." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração", desc: "Você prepara magias divinas diariamente." },
          { nome: "Ordem Divina", desc: "Escolha entre Protetor ou Taumaturgo." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          // NOME BASE IMPORTANTE PARA FUSÃO
          { nome: "Canalizar Divindade", desc: "Use energia divina para efeitos mágicos.", usos: 2, recuperacao: "Descanso Curto" },
          { nome: "CD: Centelha Divina", desc: "Cure ou cause dano (1d8+SAB)." },
          { nome: "CD: Expulsar Mortos-Vivos", desc: "Mortos-vivos fogem." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { nivel: 3, proficiencia: 2, habilidades: [{ nome: "Domínio Divino", desc: "Subclasse." }], slots: [4,2,0,0,0,0,0,0,0] },
      { nivel: 4, proficiencia: 2, habilidades: [{ nome: "ASI/Talento", desc: "Melhoria." }], slots: [4,3,0,0,0,0,0,0,0] },
      { nivel: 5, proficiencia: 3, habilidades: [{ nome: "Queimar Mortos-Vivos", desc: "Turn Undead causa dano." }], slots: [4,3,2,0,0,0,0,0,0] },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso de Domínio", desc: "Subclasse." },
          // AQUI ESTÁ O TRUQUE: O nome base "Canalizar Divindade" é igual ao do nível 2
          // O sistema vai ver isso e atualizar os usos para 3 em vez de criar novo.
          { nome: "Canalizar Divindade (Upgrade)", desc: "Seus usos aumentam para 3.", usos: 3, recuperacao: "Descanso Curto" }
        ], 
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { nivel: 7, proficiencia: 3, habilidades: [{ nome: "Golpes Abençoados", desc: "Golpe Divino ou Conjuração Potente." }], slots: [4,3,3,1,0,0,0,0,0] },
      { nivel: 8, proficiencia: 3, habilidades: [{ nome: "ASI/Talento", desc: "Melhoria." }], slots: [4,3,3,2,0,0,0,0,0] },
      { nivel: 9, proficiencia: 4, habilidades: [], slots: [4,3,3,3,1,0,0,0,0] },
      { nivel: 10, proficiencia: 4, habilidades: [{ nome: "Intervenção Divina", desc: "Conjure magia nv 5 sem slot.", usos: 1 }], slots: [4,3,3,3,2,0,0,0,0] },
      { nivel: 11, proficiencia: 4, habilidades: [], slots: [4,3,3,3,2,1,0,0,0] },
      { nivel: 12, proficiencia: 4, habilidades: [{ nome: "ASI/Talento", desc: "Melhoria." }], slots: [4,3,3,3,2,1,0,0,0] },
      { nivel: 13, proficiencia: 5, habilidades: [], slots: [4,3,3,3,2,1,1,0,0] },
      { nivel: 14, proficiencia: 5, habilidades: [{ nome: "Golpes Abençoados Aprimorados", desc: "Melhoria de dano/efeito." }], slots: [4,3,3,3,2,1,1,0,0] },
      { nivel: 15, proficiencia: 5, habilidades: [], slots: [4,3,3,3,2,1,1,1,0] },
      { nivel: 16, proficiencia: 5, habilidades: [{ nome: "ASI/Talento", desc: "Melhoria." }], slots: [4,3,3,3,2,1,1,1,0] },
      { nivel: 17, proficiencia: 6, habilidades: [{ nome: "Recurso de Domínio", desc: "Subclasse." }], slots: [4,3,3,3,2,1,1,1,1] },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Canalizar Divindade (Upgrade)", desc: "Seus usos aumentam para 4.", usos: 4, recuperacao: "Descanso Curto" }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { nivel: 19, proficiencia: 6, habilidades: [{ nome: "Dádiva Épica", desc: "Talento Épico." }], slots: [4,3,3,3,3,2,1,1,1] },
      { nivel: 20, proficiencia: 6, habilidades: [{ nome: "Intervenção Divina Maior", desc: "Pode conjurar Desejo." }], slots: [4,3,3,3,3,2,2,1,1] }
    ]
  },
  "Bárbaro": {
    nome: "Bárbaro",
    descricao: "Um guerreiro feroz que usa fúria primitiva para batalhar. Tank de alta resistência e dano explosivo.",
    dadoVida: 12,
    
    proficiencias: {
      armaduras: ["Leves", "Médias", "Escudos"],
      armas: ["Simples", "Marciais"],
      testes: ["Força", "Constituição"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Adestrar Animais", "Atletismo", "Intimidação", "Natureza", "Percepção", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Combatente Pesado",
        itens: ["Machado Grande (Greataxe)", "4 Machadinhas", "Pacote de Explorador"],
        ouro: 15
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 75
      }
    },

    escolhasNivel1: [
      {
        titulo: "Maestria em Arma (Escolha 1)",
        opcoes: opcoesDeArmas // Usa a lista global de armas
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Caminho Primitivo (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Caminho do Berserker", desc: "Foca em violência pura. Causa dano extra em fúria e intimida inimigos." },
          { nome: "Caminho do Coração Selvagem (Wild Heart)", desc: "Conexão com animais. Escolha entre Urso (Resistência), Águia (Mobilidade) ou Lobo (Vantagem para aliados)." },
          { nome: "Caminho da Árvore do Mundo (World Tree)", desc: "Conexão com Yggdrasil. Dá PV temporário, teleporte e alcance aumentado." },
          { nome: "Caminho do Fanático (Zealot)", desc: "Guerreiro divino que se recusa a morrer. Causa dano radiante/necrótico e é fácil de ressuscitar." },
          // Legado
          { nome: "Guardião Ancestral (Ancestral Guardian)", desc: "Invoca espíritos para proteger aliados e atrapalhar inimigos." },
          { nome: "Batalhador (Battlerager)", desc: "Especialista em armadura de espinhos (Apenas Anões, geralmente)." },
          { nome: "Caminho da Besta (Beast)", desc: "Transforma o corpo em armas naturais (Garras, Cauda, Mordida) ao entrar em fúria." },
          { nome: "Caminho do Gigante (Giant)", desc: "Cresce de tamanho, arremessa inimigos e imbui armas com elementos." },
          { nome: "Arauto da Tempestade (Storm Herald)", desc: "Emana uma aura de Fogo, Gelo ou Raio que causa dano constante." },
          { nome: "Guerreiro Totêmico (Totem Warrior)", desc: "(Legado) Similar ao Coração Selvagem, focado em espíritos animais totêmicos." },
          { nome: "Magia Selvagem (Wild Magic)", desc: "Sua fúria causa efeitos mágicos aleatórios (teleporte, raio, luzes)." }
        ]
      },
      {
        titulo: "Conhecimento Primitivo (Perícia Extra)",
        tipo: "pericia", // Lógica para adicionar perícia
        opcoes: [
          { nome: "Acrobacia", desc: "Perícia adicional." },
          { nome: "Adestrar Animais", desc: "Perícia adicional." },
          { nome: "Atletismo", desc: "Perícia adicional." },
          { nome: "Intimidação", desc: "Perícia adicional." },
          { nome: "Natureza", desc: "Perícia adicional." },
          { nome: "Percepção", desc: "Perícia adicional." },
          { nome: "Furtividade", desc: "Perícia adicional." },
          { nome: "Sobrevivência", desc: "Perícia adicional." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Fúria (Rage)", desc: "Bônus: Entre em Fúria. Resistência a Concussão/Cortante/Perfurante, Vantagem em Força, +Dano (+2).", usos: 2, recuperacao: "Descanso Longo" },
          { nome: "Defesa Sem Armadura", desc: "Se não usar armadura, sua CA é 10 + Des + Con (Pode usar escudo)." },
          { nome: "Maestria em Armas", desc: "Domina propriedade de 2 armas." }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Senso de Perigo", desc: "Vantagem em Saves de Destreza (se não estiver cego/surdo/incapacitado)." },
          { nome: "Ataque Descuidado (Reckless Attack)", desc: "Pode atacar com Vantagem (Força), mas inimigos têm Vantagem contra você." }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Caminho Primitivo", desc: "Escolha sua Subclasse." },
          { nome: "Conhecimento Primitivo", desc: "Ganha 1 perícia. Pode usar FORÇA para testes de Acrobacia, Intimidação, Percepção, Furtividade ou Sobrevivência enquanto em Fúria." },
          { nome: "Fúria (Upgrade)", desc: "Você tem 3 usos de Fúria.", usos: 3, recuperacao: "Descanso Longo" }
        ]
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", desc: "Você pode atacar duas vezes por ação de Ataque." },
          { nome: "Movimento Rápido", desc: "+10 ft de deslocamento (se não usar armadura pesada)." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso do Caminho", desc: "Habilidade de Subclasse." },
          { nome: "Fúria (Upgrade)", desc: "Você tem 4 usos de Fúria.", usos: 4, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Instinto Feral", desc: "Vantagem na Iniciativa." },
          { nome: "Bote Instintivo", desc: "Ao entrar em Fúria, pode mover metade do deslocamento." }
        ] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Golpe Brutal (Brutal Strike)", desc: "Troque a Vantagem do Reckless Attack por +1d10 dano e um efeito (Empurrar 15ft ou Reduzir Speed 15ft)." },
          { nome: "Fúria (Dano +3)", desc: "Seu bônus de dano de fúria aumenta para +3." }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Caminho", desc: "Habilidade de Subclasse." }] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Fúria Implacável", desc: "Se cair a 0 PV em fúria, faça Save CON (CD 10). Sucesso: Volta com PV = 2x Nível. CD aumenta a cada uso." }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Fúria (Upgrade)", desc: "Você tem 5 usos de Fúria.", usos: 5, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Golpe Brutal Aprimorado", desc: "Novos efeitos: Desvantagem no próximo Save ou +5 no ataque de um aliado contra o alvo." }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Caminho", desc: "Habilidade de Subclasse." }] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Fúria Persistente", desc: "Fúria dura 10 min e só acaba se ficar Inconsciente. Recupera usos ao rolar Iniciativa." }
        ] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Fúria (Dano +4)", desc: "Seu bônus de dano de fúria aumenta para +4." }
        ] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Golpe Brutal (Upgrade)", desc: "Dano extra aumenta para 2d10. Pode aplicar 2 efeitos ao mesmo tempo." },
          { nome: "Fúria (Upgrade)", desc: "Você tem 6 usos de Fúria.", usos: 6, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Força Indomável", desc: "Se o total de um teste de Força for menor que seu valor de Força, use o valor do atributo no lugar." }
        ] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Campeão Primitivo", desc: "FOR e CON aumentam em +4 (Máximo 25)." }
        ] 
      }
    ]
  },

  "Bardo": {
    nome: "Bardo",
    descricao: "Um artista inspirador cujo poder ecoa a música da criação. Mestre em buffs, debuffs e versatilidade.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples"],
      testes: ["Destreza", "Carisma"]
    },

    escolhaPericias: {
      qtd: 3,
      lista: ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Performance", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Artista Viajante",
        itens: ["Armadura de Couro", "2 Adagas", "Instrumento Musical", "Pacote de Artista"],
        ouro: 19
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 90
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      magiasConhecidas: 4, 
      espacosMagia: 2 
    },

    escolhasNivel2: [
      {
        titulo: "Especialização (Expertise)",
        tipo: "pericia_expertise",
        opcoes: [
          // O Bardo pode escolher expertise em QUALQUER perícia que tenha proficiência
          // O componente de criação deve listar as que ele já tem.
          // Como placeholder, listamos todas, mas o ideal é filtrar visualmente na UI depois.
          { nome: "Acrobacia", desc: "Expertise." },
          { nome: "Adestrar Animais", desc: "Expertise." },
          { nome: "Arcanismo", desc: "Expertise." },
          { nome: "Atletismo", desc: "Expertise." },
          { nome: "Enganação", desc: "Expertise." },
          { nome: "Furtividade", desc: "Expertise." },
          { nome: "História", desc: "Expertise." },
          { nome: "Intimidação", desc: "Expertise." },
          { nome: "Intuição", desc: "Expertise." },
          { nome: "Investigação", desc: "Expertise." },
          { nome: "Medicina", desc: "Expertise." },
          { nome: "Natureza", desc: "Expertise." },
          { nome: "Percepção", desc: "Expertise." },
          { nome: "Performance", desc: "Expertise." },
          { nome: "Persuasão", desc: "Expertise." },
          { nome: "Prestidigitação", desc: "Expertise." },
          { nome: "Religião", desc: "Expertise." },
          { nome: "Sobrevivência", desc: "Expertise." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Colégio de Bardo (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Colégio da Dança (Dance)", desc: "Bardo ágil e desarmado. Usa Inspiração para atacar e desviar. Compartilha evasão com aliados." },
          { nome: "Colégio do Glamour (Glamour)", desc: "Encanta e amedronta com beleza feérica. Dá PV temporário e movimento tático aos aliados." },
          { nome: "Colégio do Conhecimento (Lore)", desc: "O mago dos bardos. Aprende magias de outras classes cedo e usa palavras cortantes para atrapalhar inimigos." },
          { nome: "Colégio da Lua (Moon)", desc: "Conexão druídica. Inspiração cura mais ou deixa invisível. Aprende magias de Druida." },
          { nome: "Colégio da Bravura (Valor)", desc: "Bardo combatente. Ganha armadura média, escudo e ataque extra. Inspiração aumenta dano ou CA." },
          // Legado
          { nome: "Colégio da Criação (Creation)", desc: "Anima objetos para lutar e cria itens do nada. Inspiração gera efeitos adicionais." },
          { nome: "Colégio da Eloquência (Eloquence)", desc: "Mestre da lábia. Não tira menos que 10 em Persuasão. Reduz saves inimigos." },
          { nome: "Colégio dos Espíritos (Spirits)", desc: "Conta histórias de espíritos para gerar efeitos aleatórios poderosos." },
          { nome: "Colégio das Espadas (Swords)", desc: "Duelista exibicionista. Usa floreios de lâmina para aumentar CA, dano ou empurrar." },
          { nome: "Colégio dos Sussurros (Whispers)", desc: "Espião e assassino psíquico. Rouba sombras de mortos para se disfarçar." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Inspiração de Bardo (d6)", desc: "Bônus: Dê um dado (d6) a um aliado. Ele pode somar em Testes, Ataques ou Saves.", usos: "Carisma", recuperacao: "Descanso Longo" },
          { nome: "Conjuração", desc: "Prepara magias arcanas usando Carisma e Instrumentos." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Especialização (Expertise)", desc: "Dobre a proficiência em 2 perícias." },
          { nome: "Pau pra Toda Obra (Jack of All Trades)", desc: "Adiciona metade da proficiência em testes que você não é proficiente (iniciativa inclusa)." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Colégio de Bardo", desc: "Escolha sua subclasse." }],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Fonte de Inspiração", desc: "Recupera Inspiração de Bardo em Descanso Curto. Pode gastar slot para recuperar uso." },
          { nome: "Inspiração de Bardo (d8)", desc: "Seu dado aumenta para d8." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Colégio", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Contra-Encanto (Countercharm)", desc: "Reação: Se você ou aliado falhar em save contra Charme/Medo, rerole com Vantagem." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Especialização (Upgrade)", desc: "Escolha mais 2 perícias para dobrar a proficiência." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Segredos Mágicos", desc: "Pode preparar magias das listas de Clérigo, Druida e Mago como se fossem de Bardo." },
          { nome: "Inspiração de Bardo (d10)", desc: "Seu dado aumenta para d10." }
        ],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Colégio", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Inspiração de Bardo (d12)", desc: "Seu dado aumenta para d12." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Inspiração Superior", desc: "Ao rolar iniciativa, se tiver menos de 2 inspirações, recupera até ter 2." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Palavras da Criação", desc: "Sempre tem Power Word: Heal e Kill preparados. Pode afetar 2 alvos com elas se estiverem próximos." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },

  "Druida": {
    nome: "Druida",
    descricao: "Um sacerdote da Velha Fé, empunhando os poderes da natureza, do luar e do crescimento das plantas, capaz de assumir formas animais.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: ["Leves", "Escudos"],
      armas: ["Simples"],
      testes: ["Inteligência", "Sabedoria"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Adestrar Animais", "Arcanismo", "Intuição", "Medicina", "Natureza", "Percepção", "Religião", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Guardião da Natureza",
        itens: ["Armadura de Couro", "Escudo", "Foice", "Foco Druídico (Bordão)", "Pacote de Explorador", "Kit de Herbalismo"],
        ouro: 9
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 50
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      magiasConhecidas: 4, 
      espacosMagia: 2 
    },

    escolhasNivel1: [
      {
        titulo: "Ordem Primitiva",
        tipo: "feature_base",
        opcoes: [
          { 
            nome: "Mágico (Magician)", 
            desc: "Ganhe um Truque extra. Ganhe bônus em Arcanismo ou Natureza igual ao mod de Sabedoria." 
          },
          { 
            nome: "Guardião (Warden)", 
            desc: "Ganhe proficiência em Armaduras Médias e Armas Marciais." 
          }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Círculo Druídico (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Círculo da Terra (Land)", desc: "Mestre da magia natural. Recupera slots de magia e ganha magias baseadas no terreno (Árido, Polar, Temperado, Tropical)." },
          { nome: "Círculo da Lua (Moon)", desc: "Especialista em Forma Selvagem de combate. Transforma-se como Ação Bônus e ganha formas mais fortes." },
          { nome: "Círculo do Mar (Sea)", desc: "Conexão com oceanos e tempestades. Cria aura de água, empurra inimigos e resiste a frio/raio." },
          { nome: "Círculo das Estrelas (Stars)", desc: "Astrólogo. Assume Forma Estelar (Arqueiro, Cálice ou Dragão) para atacar, curar ou concentrar." },
          // Legado
          { nome: "Círculo dos Sonhos (Dreams)", desc: "Cura com dados de fey energy e protege o descanso do grupo." },
          { nome: "Círculo do Pastor (Shepherd)", desc: "Mestre das invocações. Totens espirituais buffam aliados e invocações." },
          { nome: "Círculo dos Esporos (Spores)", desc: "Usa fungos e necrose. Ganha PV temporário e causa dano em quem chegar perto." },
          { nome: "Círculo do Fogo Selvagem (Wildfire)", desc: "Invoca um espírito de fogo que cura, queima e teleporta." }
        ]
      }
    ],

    escolhasNivel7: [
      {
        titulo: "Fúria Elemental (Elemental Fury)",
        tipo: "feature_base",
        opcoes: [
          { nome: "Conjuração Potente (Potent Spellcasting)", desc: "Some seu mod de SAB no dano dos seus truques." },
          { nome: "Golpe Primitivo (Primal Strike)", desc: "1x por turno: +1d8 dano (Fogo, Frio, Raio ou Trovão) com armas ou ataques de fera." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração", desc: "Prepara magias divinas (Sabedoria). Pode usar Foco Druídico." },
          { nome: "Druídico", desc: "Fala Druídico e sempre prepara Speak with Animals." },
          { nome: "Ordem Primitiva", desc: "Escolha: Mágico (Truques/Skill) ou Guardião (Armadura Média/Marcial)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Forma Selvagem (Wild Shape)", desc: "Bônus: Transforme-se em Besta (Max CR 1/4, sem voo). Dura horas = Nível/2.", usos: 2, recuperacao: "Descanso Curto" },
          { nome: "Companheiro Selvagem", desc: "Gaste um uso de Forma Selvagem para conjurar Find Familiar (Fada)." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Círculo Druídico", desc: "Escolha sua subclasse." }],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Forma Selvagem (CR 1/2)", desc: "Pode se transformar em Bestas de CR 1/2 (sem voo)." }
        ],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ressurgimento Selvagem", desc: "Pode gastar slot para recuperar uso de Forma Selvagem (ou vice-versa 1x/dia)." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Círculo", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Fúria Elemental", desc: "Escolha: Conjuração Potente ou Golpe Primitivo." }],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Forma Selvagem (CR 1 / Voo)", desc: "Pode se transformar em Bestas de CR 1 e com deslocamento de Voo." }
        ],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Círculo", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Círculo", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Fúria Elemental Aprimorada", desc: "Alcance de truques aumenta. Golpe Primitivo causa 2d8 extra." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Forma Selvagem (Upgrade)", desc: "Você tem 4 usos de Forma Selvagem.", usos: 4, recuperacao: "Descanso Curto" }
        ],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Magias de Besta", desc: "Pode conjurar magias em Forma Selvagem (exceto se tiver componente material caro)." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Arquidruida", desc: "Recupera 1 uso de Forma Selvagem ao rolar Iniciativa. Envelhece 1 ano a cada 10. Pode converter usos em slot de magia." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },

  "Monge": {
    nome: "Monge",
    descricao: "Um mestre das artes marciais, aproveitando o poder do corpo e da mente para realizar feitos incríveis.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: [],
      armas: ["Simples", "Marciais (Leves)"],
      testes: ["Força", "Destreza"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Acrobacia", "Atletismo", "História", "Intuição", "Religião", "Furtividade"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Artista Marcial",
        itens: ["Lança (Spear)", "5 Adagas", "Instrumento Musical ou Ferramenta de Artesão", "Pacote de Explorador", "11 PO"],
        ouro: 11
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 50
      }
    },

    // Monge não tem escolha de nível 1 ou 2 além do básico, então pulamos para Nível 3

    escolhasNivel3: [
      {
        titulo: "Tradição Monástica (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Guerreiro da Misericórdia (Mercy)", desc: "Médico de combate. Cura aliados e envenena inimigos com toques de ki." },
          { nome: "Guerreiro das Sombras (Shadow)", desc: "Ninja. Teleporta entre sombras, fica invisível e conjura escuridão/silêncio." },
          { nome: "Guerreiro dos Elementos (Elements)", desc: "Avatar elemental. Alcance aumentado, dano elemental e explosões de área." },
          { nome: "Guerreiro da Mão Aberta (Open Hand)", desc: "O monge clássico. Derruba, empurra e impede reações com Flurry of Blows." },
          // Legado
          { nome: "Caminho do Dragão Ascendente (Ascendant Dragon)", desc: "Cospe fogo/gelo, voa com asas espectrais e causa medo." },
          { nome: "Caminho do Mestre Bêbado (Drunken Master)", desc: "Movimento imprevisível. Ganha Disengage grátis e redireciona ataques." },
          { nome: "Caminho da Longa Morte (Long Death)", desc: "Tanque assustador. Ganha PV temporário ao matar e recusa-se a morrer." },
          { nome: "Caminho da Alma Solar (Sun Soul)", desc: "Lança raios de energia radiante (Hadouken) e cria explosões de luz." },
          { nome: "Caminho do Kensei (Kensei)", desc: "Mestre de armas. Usa espada/arco com ki para dar mais dano e defesa." },
          { nome: "Caminho do Eu Astral (Astral Self)", desc: "Invoca braços espirituais (JoJo). Usa Sabedoria para atacar e ganha alcance." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Artes Marciais (d6)", desc: "Ataque Desarmado como Bônus. Pode usar DES em vez de FOR. Dado de dano: 1d6." },
          { nome: "Defesa Sem Armadura", desc: "Se não usar armadura/escudo, CA = 10 + Des + Sab." }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Foco do Monge (Ki)", desc: "Gaste pontos para Rajada de Golpes, Defesa Paciente ou Passo do Vento.", usos: 2, recuperacao: "Descanso Curto" },
          { nome: "Movimento Sem Armadura (+10 ft)", desc: "Seu deslocamento aumenta." },
          { nome: "Metabolismo Estranho", desc: "Ao rolar Iniciativa, recupera todo o Foco e cura PV (Nível + Dado Marciais). 1x/Long Rest." }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Tradição Monástica", desc: "Escolha sua subclasse." },
          { nome: "Desviar Ataques", desc: "Reação: Reduz dano de concussão/cortante/perfurante. Se zerar, pode gastar 1 Foco para redirecionar." },
          { nome: "Foco (Upgrade)", desc: "Você tem 3 pontos de Foco.", usos: 3, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Queda Lenta", desc: "Reação: Reduz dano de queda em 5x Nível." },
          { nome: "Foco (Upgrade)", desc: "Você tem 4 pontos de Foco.", usos: 4, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", desc: "Ataca 2 vezes." },
          { nome: "Ataque Atordoante (Stunning Strike)", desc: "1 Foco ao acertar: Inimigo faz Save CON ou fica Atordoado (Stunned) ou lento." },
          { nome: "Artes Marciais (d8)", desc: "Seu dado aumenta para d8." },
          { nome: "Foco (Upgrade)", desc: "Você tem 5 pontos de Foco.", usos: 5, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Golpes Empoderados", desc: "Seus ataques desarmados podem causar dano de Força." },
          { nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." },
          { nome: "Movimento Sem Armadura (+15 ft)", desc: "Seu deslocamento aumenta." },
          { nome: "Foco (Upgrade)", desc: "Você tem 6 pontos de Foco.", usos: 6, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Evasão", desc: "Em saves de DES para meio dano, você não toma nada se passar e só metade se falhar." },
          { nome: "Foco (Upgrade)", desc: "Você tem 7 pontos de Foco.", usos: 7, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Foco (Upgrade)", desc: "Você tem 8 pontos de Foco.", usos: 8, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Movimento Acrobático", desc: "Pode andar em paredes e água durante seu turno." },
          { nome: "Foco (Upgrade)", desc: "Você tem 9 pontos de Foco.", usos: 9, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Foco Elevado", desc: "Flurry dá 3 ataques. Patient Defense dá PV Temp. Step of Wind leva aliado junto." },
          { nome: "Auto-Restauração", desc: "Fim do turno: Remove Charme, Medo ou Veneno. Não sofre exaustão por fome/sede." },
          { nome: "Movimento Sem Armadura (+20 ft)", desc: "Seu deslocamento aumenta." },
          { nome: "Foco (Upgrade)", desc: "Você tem 10 pontos de Foco.", usos: 10, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." },
          { nome: "Artes Marciais (d10)", desc: "Seu dado aumenta para d10." },
          { nome: "Foco (Upgrade)", desc: "Você tem 11 pontos de Foco.", usos: 11, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Foco (Upgrade)", desc: "Você tem 12 pontos de Foco.", usos: 12, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Desviar Energia", desc: "Pode usar Desviar Ataques contra qualquer tipo de dano." },
          { nome: "Foco (Upgrade)", desc: "Você tem 13 pontos de Foco.", usos: 13, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Sobrevivente Disciplinado", desc: "Proficiência em todos os Saves. Pode gastar 1 Foco para rerolar falha." },
          { nome: "Movimento Sem Armadura (+25 ft)", desc: "Seu deslocamento aumenta." },
          { nome: "Foco (Upgrade)", desc: "Você tem 14 pontos de Foco.", usos: 14, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Foco Perfeito", desc: "Se rolar iniciativa com menos de 4 Foco, recupera até ter 4." },
          { nome: "Foco (Upgrade)", desc: "Você tem 15 pontos de Foco.", usos: 15, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Foco (Upgrade)", desc: "Você tem 16 pontos de Foco.", usos: 16, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso da Tradição", desc: "Habilidade de Subclasse." },
          { nome: "Artes Marciais (d12)", desc: "Seu dado aumenta para d12." },
          { nome: "Foco (Upgrade)", desc: "Você tem 17 pontos de Foco.", usos: 17, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Defesa Superior", desc: "Gaste 3 Foco para ter Resistência a tudo (exceto Força) por 1 min." },
          { nome: "Movimento Sem Armadura (+30 ft)", desc: "Seu deslocamento aumenta." },
          { nome: "Foco (Upgrade)", desc: "Você tem 18 pontos de Foco.", usos: 18, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." },
          { nome: "Foco (Upgrade)", desc: "Você tem 19 pontos de Foco.", usos: 19, recuperacao: "Descanso Curto" }
        ]
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Corpo e Mente", desc: "DES e SAB aumentam em +4 (Max 25)." },
          { nome: "Foco (Upgrade)", desc: "Você tem 20 pontos de Foco.", usos: 20, recuperacao: "Descanso Curto" }
        ]
      }
    ]
  },

  "Paladino": {
    nome: "Paladino",
    descricao: "Um guerreiro santo preso a um juramento sagrado. Combina habilidade marcial com cura, defesa e dano radiante explosivo.",
    dadoVida: 10,
    
    proficiencias: {
      armaduras: ["Leves", "Médias", "Pesadas", "Escudos"],
      armas: ["Simples", "Marciais"],
      testes: ["Sabedoria", "Carisma"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Atletismo", "Intimidação", "Intuição", "Medicina", "Persuasão", "Religião"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Cavaleiro Blindado",
        itens: ["Cota de Malha (Heavy)", "Escudo", "Espada Longa", "6 Azagaias", "Símbolo Sagrado", "Pacote de Sacerdote", "9 PO"],
        ouro: 9
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 150
      }
    },

    magiasInicial: {
      // Paladino é meio-conjurador, começa com slots no nível 1 agora no 2024?
      // Pela tabela: Nível 1 não tem slots. Nível 2 tem 2 slots.
      // Vou configurar como 0 no nível 1 para a lógica do Grimório funcionar ao subir de nível.
      truquesConhecidos: 0,
      magiasConhecidas: 0, 
      espacosMagia: 0
    },

    escolhasNivel1: [
      {
        titulo: "Maestria em Arma (Escolha 1)",
        opcoes: opcoesDeArmas
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel2: [
      {
        titulo: "Estilo de Luta",
        tipo: "talento_lutador", // Reusa a lógica se tiver, ou lista opções
        opcoes: [
          { nome: "Defesa", desc: "+1 na CA enquanto usar armadura." },
          { nome: "Duelismo", desc: "+2 dano com uma mão." },
          { nome: "Combate com Armas Grandes", desc: "Rerola 1 e 2 no dano." },
          { nome: "Proteção", desc: "Reação para impor desvantagem em ataque contra aliado." },
          { nome: "Guerreiro Abençoado", desc: "Aprende 2 truques de Clérigo (usam Carisma)." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Juramento Sagrado (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Juramento da Devoção (Devotion)", desc: "O paladino clássico. Aura protege contra charme, arma sagrada brilha e acerta mais." },
          { nome: "Juramento da Glória (Glória)", desc: "Atleta divino. Smite dá PV temporário e aura aumenta velocidade." },
          { nome: "Juramento dos Anciões (Ancients)", desc: "Cavaleiro verde. Aura dá resistência a dano de magias (Nec/Psi/Rad)." },
          { nome: "Juramento dos Gênios Nobres (Noble Genies)", desc: "Elemental. Smite causa efeitos de terra, ar, fogo ou água." },
          { nome: "Juramento da Vingança (Vengeance)", desc: "Caçador implacável. Ganha vantagem contra um inimigo e persegue quem foge." },
          // Legado
          { nome: "Juramento da Conquista (Conquest)", desc: "Tirano. Aura causa dano psíquico e imobiliza inimigos amedrontados." },
          { nome: "Juramento da Coroa (Crown)", desc: "Guardião da lei. Obriga inimigos a duelarem e toma dano por aliados." },
          { nome: "Juramento da Redenção (Redemption)", desc: "Pacifista violento. Retorna dano recebido para o atacante." },
          { nome: "Juramento dos Vigias (Watchers)", desc: "Caçador de extraplanares. Aura dá bônus de iniciativa." },
          { nome: "Quebrador de Juramento (Oathbreaker)", desc: "Paladino caído. Controla mortos-vivos e causa dano extra com aura de ódio." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Mão Curativa (Lay on Hands)", desc: "Ação Bônus: Cure tocando. Pool = 5 x Nível. Gaste 5 pontos para curar Veneno.", usos: "Pool de Cura", recuperacao: "Descanso Longo" },
          { nome: "Conjuração", desc: "Prepara magias divinas (Carisma). Usa Símbolo Sagrado." },
          { nome: "Maestria em Armas", desc: "Domina propriedade de 2 armas." }
        ],
        slots: [0,0,0,0,0,0,0,0,0] // Paladino nv 1 não tem slot
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Estilo de Luta", desc: "Escolha um estilo ou Truques de Clérigo." },
          { nome: "Destruição do Paladino (Smite)", desc: "Sempre prepara Divine Smite. Pode conjurar 1x por dia sem gastar slot." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Juramento Sagrado", desc: "Escolha sua subclasse." },
          { nome: "Canalizar Divindade", desc: "Efeitos mágicos do juramento ou Sentido Divino.", usos: 2, recuperacao: "Descanso Curto" },
          { nome: "CD: Sentido Divino", desc: "Bônus: Detecta Celestial, Infernal ou Morto-vivo a 60ft por 10 min." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", desc: "Ataca 2 vezes." },
          { nome: "Montaria Fiel", desc: "Prepara Find Steed. Conjura 1x/dia sem slot." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Aura de Proteção (10 ft)", desc: "Você e aliados na aura somam seu CARISMA em todos os testes de resistência." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Juramento", desc: "Habilidade de Subclasse." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Abjurar Inimigos", desc: "Ação Mágica (CD): Amedronta inimigos (Qtd = Mod CAR) a 60ft. Eles perdem ações." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Aura de Coragem", desc: "Você e aliados na aura são imunes a Medo." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Golpes Radiantes", desc: "Todos os seus ataques com arma causam +1d8 Radiante extra." },
          { nome: "Canalizar Divindade (Upgrade)", desc: "Você tem 3 usos.", usos: 3, recuperacao: "Descanso Curto" }
        ],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Toque Restaurador", desc: "Mão Curativa remove Cego, Charme, Surdo, Medo, Paralisia ou Stun (Custo 5 PV)." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Juramento", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Expansão de Aura", desc: "Suas auras aumentam para 30 ft." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [{ nome: "Campeão do Juramento", desc: "Habilidade suprema da subclasse." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      }
    ]
  },

  "Patrulheiro": {
    nome: "Patrulheiro",
    descricao: "Um guerreiro que usa perícia marcial e magia natural para combater ameaças nos limites da civilização.",
    dadoVida: 10,
    
    proficiencias: {
      armaduras: ["Leves", "Médias", "Escudos"],
      armas: ["Simples", "Marciais"],
      testes: ["Força", "Destreza"]
    },

    escolhaPericias: {
      qtd: 3,
      lista: ["Adestrar Animais", "Atletismo", "Furtividade", "Intuição", "Investigação", "Natureza", "Percepção", "Sobrevivência"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Caçador Furtivo",
        itens: ["Corselete de Couro Batido", "Cimitarra", "Espada Curta", "Arco Longo", "20 Flechas", "Foco Druídico", "Pacote de Explorador", "7 PO"],
        ouro: 7
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 150
      }
    },

    magiasInicial: {
      truquesConhecidos: 0, // Ranger base não tem truques (exceto por Estilo de Luta)
      magiasConhecidas: 2, 
      espacosMagia: 2 
    },

    escolhasNivel1: [
      {
        titulo: "Maestria em Arma (Escolha 1)",
        opcoes: opcoesDeArmas
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel2: [
      {
        titulo: "Estilo de Luta",
        tipo: "talento_lutador", 
        opcoes: [
          { nome: "Arquearia", desc: "+2 acerto com armas à distância." },
          { nome: "Defesa", desc: "+1 na CA enquanto usar armadura." },
          { nome: "Duelismo", desc: "+2 dano com uma mão." },
          { nome: "Combate com Duas Armas", desc: "Adiciona atributo no dano da segunda arma." },
          { nome: "Guerreiro Druídico", desc: "Aprende 2 truques de Druida (Guidance e Starry Wisp recomendados)." }
        ]
      },
      {
        titulo: "Explorador Hábil (Perícia)",
        tipo: "pericia_expertise", // O sistema deve permitir escolher 1 perícia para dobrar
        opcoes: [
          { nome: "Adestrar Animais", desc: "Expertise." },
          { nome: "Atletismo", desc: "Expertise." },
          { nome: "Furtividade", desc: "Expertise." },
          { nome: "Intuição", desc: "Expertise." },
          { nome: "Investigação", desc: "Expertise." },
          { nome: "Natureza", desc: "Expertise." },
          { nome: "Percepção", desc: "Expertise." },
          { nome: "Sobrevivência", desc: "Expertise." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Conclave de Patrulheiro (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // 2024
          { nome: "Mestre das Bestas (Beast Master)", desc: "Comanda um companheiro animal (Terra, Mar ou Ar) que luta ao seu lado." },
          { nome: "Peregrino Feérico (Fey Wanderer)", desc: "Usa magia das fadas. Adiciona dano psíquico e é bom em testes sociais." },
          { nome: "Caçador das Sombras (Gloom Stalker)", desc: "Mestre da emboscada e escuridão. Invisível para darkvision e ataque extra no turno 1." },
          { nome: "Caçador (Hunter)", desc: "Especialista em matar monstros. Causa dano extra em inimigos feridos ou agrupados." },
          { nome: "Caminhante do Inverno (Winter Walker)", desc: "Guerreiro do gelo. Ignora resistência a frio e causa lentidão." },
          // Legado
          { nome: "Andarilho do Horizonte (Horizon Walker)", desc: "Protege contra extraplanares. Teleporta ao atacar e causa dano de Força." },
          { nome: "Caçador de Monstros (Monster Slayer)", desc: "Analisa fraquezas do inimigo e anula magias." },
          { nome: "Enxameante (Swarmkeeper)", desc: "Controla um enxame de espíritos que causa dano ou move inimigos." },
          { nome: "Guardião Dracônico (Drakewarden)", desc: "Tem um dragão companheiro que cresce e ganha sopro elemental." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração", desc: "Prepara magias divinas (Sabedoria)." },
          { nome: "Inimigo Favorito", desc: "Sempre prepara Hunter's Mark. Pode conjurar 2x/dia sem gastar slot.", usos: 2, recuperacao: "Descanso Longo" },
          { nome: "Maestria em Armas", desc: "Domina propriedade de 2 armas." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Explorador Hábil", desc: "Ganha Expertise em 1 perícia e aprende 2 idiomas." },
          { nome: "Estilo de Luta", desc: "Escolha um estilo ou Truques de Druida." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conclave de Patrulheiro", desc: "Escolha sua subclasse." },
          { nome: "Inimigo Favorito (Upgrade)", desc: "Você tem 3 usos gratuitos.", usos: 3, recuperacao: "Descanso Longo" }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", desc: "Ataca 2 vezes." },
          { nome: "Inimigo Favorito (Upgrade)", desc: "Você tem 4 usos gratuitos.", usos: 4, recuperacao: "Descanso Longo" }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Andarilho (Roving)", desc: "+10ft Deslocamento. Ganha Escalada e Natação iguais ao deslocamento." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Conclave", desc: "Habilidade de Subclasse." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Expertise", desc: "Escolha mais 2 perícias para dobrar a proficiência." },
          { nome: "Inimigo Favorito (Upgrade)", desc: "Você tem 5 usos gratuitos.", usos: 5, recuperacao: "Descanso Longo" }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Incansável (Tireless)", desc: "Ação Mágica: Ganha 1d8+SAB PV Temporários (usos=SAB). Remove 1 Exaustão em Short Rest." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Conclave", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Caçador Implacável", desc: "Dano não quebra sua concentração em Hunter's Mark." },
          { nome: "Inimigo Favorito (Upgrade)", desc: "Você tem 6 usos gratuitos.", usos: 6, recuperacao: "Descanso Longo" }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Véu da Natureza", desc: "Bônus (Usos=SAB): Fica Invisível até o fim do próximo turno." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Conclave", desc: "Habilidade de Subclasse." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Caçador Preciso", desc: "Vantagem em ataques contra o alvo do seu Hunter's Mark." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Sentidos Ferais", desc: "Blindsight 30ft." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Matador de Inimigos", desc: "O dano do seu Hunter's Mark vira 1d10." }
        ],
        slots: [4,3,3,3,2,0,0,0,0] 
      }
    ]
  },

  "Bruxo": {
    nome: "Bruxo",
    descricao: "Um conjurador que ganha poderes através de um pacto com uma entidade extraplanar. Magia de Pacto recarrega em descanso curto.",
    dadoVida: 8,
    
    proficiencias: {
      armaduras: ["Leves"],
      armas: ["Simples"],
      testes: ["Sabedoria", "Carisma"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Arcanismo", "Enganação", "História", "Intimidação", "Investigação", "Natureza", "Religião"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Estudioso do Oculto",
        itens: ["Armadura de Couro", "Foice", "2 Adagas", "Foco Arcano (Orbe)", "Livro de Ocultismo", "Pacote de Estudioso", "15 PO"],
        ouro: 15
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 100
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      magiasConhecidas: 2, 
      espacosMagia: 1 // Começa com 1 slot de nível 1
    },

    // --- ESCOLHAS DE INVOCAÇÕES CONFIGURADAS ---
    escolhasNivel1: [
      {
        titulo: "Invocação Mística (1ª - Pacto)",
        tipo: "invocacao", // Isso ativa o menu do invocacoes.js
        opcoes: [] // Deixe vazio, o PassoClasse vai buscar no arquivo
      }
    ],
    escolhasNivel2: [
      { titulo: "Invocação Mística (2ª)", tipo: "invocacao", opcoes: [] },
      { titulo: "Invocação Mística (3ª)", tipo: "invocacao", opcoes: [] }
    ],
    escolhasNivel3: [
      {
        titulo: "Patrono Extraplanar (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          { nome: "Arquifada (Archfey)", desc: "Pacto com fadas nobres. Ilusão e teleporte." },
          { nome: "Celestial (Celestial)", desc: "Pacto com anjos. Cura e luz." },
          { nome: "Corruptor (Fiend)", desc: "Pacto com demônios. Fogo e PV temporário." },
          { nome: "Grande Antigo (Great Old One)", desc: "Pacto com o desconhecido. Telepatia e psíquico." },
          { nome: "Lâmina Maldita (Hexblade)", desc: "Pacto com armas das sombras. Combate corpo a corpo." },
          { nome: "O Gênio (Genie)", desc: "Pacto com Djinni/Efreet. Dano elemental e vaso mágico." },
          { nome: "O Insondável (Fathomless)", desc: "Pacto com o mar. Tentáculos e controle." },
          { nome: "O Morto-Vivo (Undead)", desc: "Pacto com a morte. Forma de pavor." },
          { nome: "O Imortal (Undying)", desc: "Pacto com a vida eterna. Resistência e estabilização." }
        ]
      }
    ],
    escolhasNivel5: [ { titulo: "Invocação Mística (4ª)", tipo: "invocacao", opcoes: [] }, { titulo: "Invocação Mística (5ª)", tipo: "invocacao", opcoes: [] } ],
    escolhasNivel7: [ { titulo: "Invocação Mística (6ª)", tipo: "invocacao", opcoes: [] } ],
    escolhasNivel9: [ { titulo: "Invocação Mística (7ª)", tipo: "invocacao", opcoes: [] } ],
    escolhasNivel12: [ { titulo: "Invocação Mística (8ª)", tipo: "invocacao", opcoes: [] } ],
    escolhasNivel15: [ { titulo: "Invocação Mística (9ª)", tipo: "invocacao", opcoes: [] } ],
    escolhasNivel18: [ { titulo: "Invocação Mística (10ª)", tipo: "invocacao", opcoes: [] } ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Magia de Pacto", desc: "Seus slots são sempre do maior nível possível e recarregam em Descanso Curto." },
          { nome: "Invocações Místicas (1)", desc: "Ganha 1 Invocação (ex: Pacto da Lâmina/Tomo/Corrente)." }
        ],
        // Lógica de Warlock: Slots "sobem" de nível e não acumulam. 
        // Array: [nv1, nv2, nv3, nv4, nv5, ...]
        slots: [1,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Astúcia Mágica", desc: "Ritual de 1 min: Recupera metade dos slots gastos (1x/Long Rest)." },
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 3 Invocações." } // No 2024 ganha +2 no nível 2? O texto diz "Total 3" na tabela? Não, tabela diz 3 invocações no nível 2.
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Patrono Extraplanar", desc: "Escolha sua Subclasse." }],
        slots: [0,2,0,0,0,0,0,0,0] // 2 slots de Nível 2
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 5 Invocações." }, // Tabela diz 5 no nível 5
          { nome: "Ataque Extra (se tiver Lâmina)", desc: "Se tiver Pacto da Lâmina, pegue a invocação Thirsting Blade agora." }
        ],
        slots: [0,0,2,0,0,0,0,0,0] // 2 slots de Nível 3
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Patrono", desc: "Habilidade de Subclasse." }],
        slots: [0,0,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 6 Invocações." }
        ],
        slots: [0,0,0,2,0,0,0,0,0] // 2 slots de Nível 4
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,0,0,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Contatar Patrono", desc: "Conjura Contact Other Plane sem slot e com sucesso automático (1x/dia)." },
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 7 Invocações." }
        ],
        slots: [0,0,0,0,2,0,0,0,0] // 2 slots de Nível 5 (Máximo do Pact Magic)
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Patrono", desc: "Habilidade de Subclasse." }],
        slots: [0,0,0,0,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Arcanum Místico (6º Círculo)", desc: "Escolha uma magia de nv 6. Conjure 1x por dia sem slot." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] // Sobe para 3 slots de Nível 5
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 8 Invocações." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Arcanum Místico (7º Círculo)", desc: "Escolha uma magia de nv 7. Conjure 1x por dia sem slot." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Patrono", desc: "Habilidade de Subclasse." }],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Arcanum Místico (8º Círculo)", desc: "Escolha uma magia de nv 8. Conjure 1x por dia sem slot." },
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 9 Invocações." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Arcanum Místico (9º Círculo)", desc: "Escolha uma magia de nv 9. Conjure 1x por dia sem slot." },
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 9 Invocações." }
        ],
        slots: [0,0,0,0,4,0,0,0,0] // Sobe para 4 slots
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade)", desc: "Total: 10 Invocações." }
        ],
        slots: [0,0,0,0,4,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [0,0,0,0,4,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Mestre do Oculto", desc: "Magical Cunning agora recupera TODOS os slots gastos." }
        ],
        slots: [0,0,0,0,4,0,0,0,0] 
      }
    ]
  },

  "Feiticeiro": {
    nome: "Feiticeiro",
    descricao: "Um conjurador que possui magia latente em sua linhagem ou alma. Usa Metamagia para alterar seus feitiços.",
    dadoVida: 6,
    
    proficiencias: {
      armaduras: [],
      armas: ["Simples"],
      testes: ["Constituição", "Carisma"]
    },

    escolhaPericias: {
      qtd: 2,
      lista: ["Arcanismo", "Enganação", "Intimidação", "Intuição", "Persuasão", "Religião"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Conjurador Simples",
        itens: ["Lança", "2 Adagas", "Foco Arcano (Cristal)", "Pacote de Masmorra", "28 PO"],
        ouro: 28
      },
      b: {
        titulo: "Riqueza Inicial",
        ouro: 50
      }
    },

    magiasInicial: {
      truquesConhecidos: 4,
      magiasConhecidas: 2, 
      espacosMagia: 2 
    },

    // Feiticeiro 2024 não tem escolhas de sub-recurso no nível 1 ou 2 (Metamagia é aberta), então pulamos para Nível 3

   // --- ESCOLHAS DE METAMAGIA CONFIGURADAS ---
    escolhasNivel2: [
      { titulo: "Metamagia (Opção 1)", tipo: "metamagia", opcoes: [] },
      { titulo: "Metamagia (Opção 2)", tipo: "metamagia", opcoes: [] }
    ],
    escolhasNivel3: [
      {
        titulo: "Origem da Feitiçaria (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          { nome: "Feitiçaria Aberrante (Aberrant)", desc: "Psíquico e tentáculos." },
          { nome: "Feitiçaria Mecânica (Clockwork)", desc: "Ordem e proteção." },
          { nome: "Feitiçaria Dracônica (Draconic)", desc: "Escamas, dano elemental e voo." },
          { nome: "Feitiçaria de Magia Selvagem (Wild Magic)", desc: "Caos e sorte." },
          { nome: "Alma Divina (Divine Soul)", desc: "Cura e magia de clérigo." },
          { nome: "Feitiçaria Lunar (Lunar)", desc: "Fases da lua." },
          { nome: "Magia das Sombras (Shadow)", desc: "Trevas e cão sombrio." },
          { nome: "Feitiçaria da Tempestade (Storm)", desc: "Voo e trovão." }
        ]
      }
    ],
    escolhasNivel10: [
      { titulo: "Metamagia (Opção 3)", tipo: "metamagia", opcoes: [] },
      { titulo: "Metamagia (Opção 4)", tipo: "metamagia", opcoes: [] }
    ],
    escolhasNivel17: [
      { titulo: "Metamagia (Opção 5)", tipo: "metamagia", opcoes: [] },
      { titulo: "Metamagia (Opção 6)", tipo: "metamagia", opcoes: [] }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração", desc: "Prepara magias arcanas (Carisma)." },
          { nome: "Feitiçaria Inata", desc: "Bônus (2/Descanso): Por 1 min, +1 na CD das magias e Vantagem em ataques mágicos." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Fonte de Magia", desc: "Você tem Pontos de Feitiçaria (2). Pode converter Pontos <-> Slots." },
          { nome: "Metamagia", desc: "Escolha 2 opções para alterar suas magias gastando pontos." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Origem da Feitiçaria", desc: "Escolha sua subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 3 Pontos." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 4 Pontos." }
        ],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Restauração Mística", desc: "Recupera pontos de feitiçaria em descanso curto (até Nível/2)." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 5 Pontos." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso da Origem", desc: "Habilidade de Subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 6 Pontos." }
        ],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Feitiçaria Encarnada", desc: "Pode gastar 2 Pontos para ativar Feitiçaria Inata. Enquanto ativa, pode usar 2 Metamagias por magia." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 7 Pontos." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 8 Pontos." }
        ],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 9 Pontos." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Metamagia (Upgrade)", desc: "Aprenda +2 opções de Metamagia." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 10 Pontos." }
        ],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 11 Pontos." }],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 12 Pontos." }
        ],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 13 Pontos." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Recurso da Origem", desc: "Habilidade de Subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 14 Pontos." }
        ],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 15 Pontos." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 16 Pontos." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Metamagia (Upgrade)", desc: "Aprenda +2 opções de Metamagia." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 17 Pontos." }
        ],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso da Origem", desc: "Habilidade de Subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 18 Pontos." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", desc: "Escolha um talento de Dádiva Épica." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 19 Pontos." }
        ],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Apoteose Arcana", desc: "Enquanto estiver em Feitiçaria Inata, pode usar 1 Metamagia por turno GRÁTIS." },
          { nome: "Pontos de Feitiçaria (Upgrade)", desc: "Total: 20 Pontos." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },

  // ... Você pode adicionar as outras aqui depois
};