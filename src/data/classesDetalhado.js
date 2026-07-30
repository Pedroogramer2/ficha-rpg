// src/data/classesDetalhado.js
import { ARMAS, PROPRIEDADES_MAESTRIA } from './armas'; // <--- IMPORTAMOS O ARSENAL
import { opcoesDeArmas } from './armas';

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
            nome: "Mestre de Batalha (Battle Master)", 
            desc: "Você ganha 4 Dados de Superioridade (d8). Aprende 3 Manobras (ex: Derrubar, Ripostar). Estudante da Guerra: ganha 1 ferramenta e 1 perícia."
          },
          { 
            nome: "Campeão (Champion)", 
            desc: "Crítico Aprimorado (rola 19 ou 20). Atleta Notável: Vantagem em Iniciativa e Atletismo. Ao critar, move metade do deslocamento."
          },
          { 
            nome: "Cavaleiro Arcano (Eldritch Knight)", 
            desc: "Ganha Conjuração (Inteligência), Truques e Espaços de Magia. Vínculo com Arma: Pode invocar sua arma como ação bônus."
          },
          { 
            nome: "Guerreiro Psiônico (Psi Warrior)", 
            desc: "Ganha Dados Psiônicos (d6). Usa para reduzir dano recebido, aumentar dano causado (Golpe Psiônico) ou mover objetos com telecinese."
          },
          // --- LEGADO & EXTRAS ---
          {
            nome: "Arqueiro Arcano (Arcane Archer - Legado)",
            desc: "Disparo Arcano: Imbui flechas com magia (ex: Flecha Explosiva, Flecha de Sombras). Aprende Prestidigitação ou Druidismo."
          },
          {
            nome: "Cavaleiro (Cavalier - Legado)",
            desc: "Nascido para a Sela (não cai da montaria). Marca Inabalável: Marca inimigos atingidos; eles têm desvantagem contra outros e tomam ataque extra."
          },
          {
            nome: "Cavaleiro Eco (Echo Knight - Legado)",
            desc: "Manifestar Eco: Cria um clone sombrio. Pode atacar do lugar dele e trocar de lugar. Ganha ataques extras a partir do Eco."
          },
          {
            nome: "Cavaleiro Rúnico (Rune Knight - Legado)",
            desc: "Inscreve runas em equipamentos para efeitos passivos e ativos. Poder do Gigante: Fica Grande, ganha vantagem em Força e dano extra."
          },
          {
            nome: "Samurai (Legado)",
            desc: "Espírito de Lutador: Ação Bônus para ganhar Vantagem em TODOS os ataques do turno e 5 PV temporários. Ganha bônus social em Persuasão."
          },
          {
            nome: "Cavaleiro Estandarte (Banneret - Legado)",
            desc: "Enviado Real (perícias sociais). Recuperação em Grupo: Ao usar Retomar o Fôlego, você também cura 3 aliados próximos."
          }
        ]
      }
    ],

    escolhasNivel4: [
      {
        titulo: "Maestria em Arma (Escolha 4)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel10: [
      {
        titulo: "Maestria em Arma (Escolha 5)",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel16: [
      {
        titulo: "Maestria em Arma (Escolha 6)",
        opcoes: opcoesDeArmas
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { 
            nome: "Estilo de Luta", 
            tipoAcao: "passiva",
            desc: "Você adota um estilo de combate particular que será sua especialidade (escolhido na criação). Toda vez que você sobe um nível de Guerreiro, você pode trocar esse estilo por outro." 
          },
          { 
            nome: "Retomar o Fôlego (Second Wind)", 
            tipoAcao: "bonus", // ⚡ Ação Bônus Principal
            usosMax: 2, 
            recuperacao: "Descanso Longo", // Mas recupera 1 no curto!
            desc: "**Ação Bônus:** Você puxa fôlego da sua reserva de estamina para recuperar Pontos de Vida iguais a 1d10 + seu Nível de Guerreiro.\n*(Sua reserva recupera 1 uso gasto ao final de um Descanso Curto, e TODOS os usos ao final de um Descanso Longo).* " 
          },
          {
            nome: "Maestria em Armas",
            tipoAcao: "passiva",
            desc: "Você domina e pode utilizar as propriedades de Maestria de 3 tipos de armas Marciais ou Simples à sua escolha. Você pode trocar uma dessas escolhas ao realizar um Descanso Longo."
          }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          {
            nome: "Surto de Ação (Action Surge)",
            tipoAcao: "livre", // 💨 Não gasta ação pra ativar!
            usosMax: 1,
            recuperacao: "Descanso Curto",
            desc: "**Gatilho:** No seu turno.\n**Efeito:** Você leva seu corpo além do limite e ganha 1 Ação adicional neste turno. *(Restrição: Essa ação adicional não pode ser usada para a ação Mágica / Conjurar Magia).* "
          },
          {
            nome: "Mente Tática",
            tipoAcao: "livre", // 💨 Gatilho ao falhar em teste
            desc: "**Gatilho:** Quando você falhar em um Teste de Atributo/Perícia.\n**Efeito:** Você pode gastar 1 uso do seu *Retomar o Fôlego* para adicionar 1d10 à rolagem, potencialmente transformando a falha em um sucesso. Se o teste falhar mesmo com o d10, o seu uso de Retomar o Fôlego NÃO é gasto!"
          }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Arquétipo Marcial (Subclasse)", tipoAcao: "passiva", desc: "Você escolhe um arquétipo que define seu estilo de combate (ex: Campeão, Mestre de Batalha)." }
        ] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." },
          { nome: "Retomar o Fôlego (Second Wind) (Upgrade Nv 4)", tipoAcao: "passiva", usosMax: 3, recuperacao: "Descanso Longo", desc: "Seus usos de Retomar o Fôlego aumentam para 3." } 
        ] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", tipoAcao: "passiva", desc: "Sempre que você realizar a Ação de Ataque no seu turno, você pode atacar duas vezes em vez de uma." },
          { nome: "Deslocamento Tático", tipoAcao: "passiva", desc: "Sempre que você ativar seu *Retomar o Fôlego* usando uma Ação Bônus, você pode se mover até metade do seu deslocamento imediatamente, sem provocar Ataques de Oportunidade." },
          { nome: "Maestria em Armas (Upgrade Nv 5)", tipoAcao: "passiva", desc: "Você agora domina a propriedade de 4 armas." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { 
            nome: "Indomável (Indomitable)", 
            tipoAcao: "livre", // 💨 Gatilho reativo (não gasta a Reação normal do turno)
            usosMax: 1,
            recuperacao: "Descanso Longo",
            desc: "**Gatilho:** Você falha em um Teste de Resistência (Save).\n**Efeito:** Você pode rolar o dado novamente somando um bônus igual ao seu Nível de Guerreiro! Você deve usar o resultado da nova rolagem."
          },
          { 
            nome: "Mestre Tático", 
            tipoAcao: "livre", 
            desc: "No momento em que você ataca com uma arma cuja propriedade de Maestria você domina, você pode substituir a propriedade original da arma por Empurrar (Push), Debilitar (Sap) ou Lentidão (Slow) especificamente para aquele ataque." 
          }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso do Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Retomar o Fôlego (Second Wind) (Upgrade Nv 10)", tipoAcao: "passiva", usosMax: 4, recuperacao: "Descanso Longo", desc: "Seus usos de Retomar o Fôlego aumentam para 4." },
          { nome: "Maestria em Armas (Upgrade Nv 10)", tipoAcao: "passiva", desc: "Você agora domina a propriedade de 5 armas." }
        ] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Dois Ataques Extras", tipoAcao: "passiva", desc: "Sempre que você realizar a Ação de Ataque no seu turno, você pode atacar três vezes em vez de uma." }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Indomável (Indomitable) (Upgrade Nv 13)", tipoAcao: "passiva", usosMax: 2, recuperacao: "Descanso Longo", desc: "Seus usos de Indomável aumentam para 2." },
          { 
            nome: "Ataques Estudados", 
            tipoAcao: "passiva", // É um buff passivo ao errar
            desc: "Se você fizer uma rolagem de ataque contra uma criatura e errar, você ganha Vantagem na próxima rolagem de ataque que fizer contra essa mesma criatura até o fim do seu próximo turno." 
          }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." },
          { nome: "Maestria em Armas (Upgrade Nv 16)", tipoAcao: "passiva", desc: "Você agora domina a propriedade de 6 armas." }
        ] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Surto de Ação (Action Surge) (Upgrade Nv 17)", tipoAcao: "passiva", usosMax: 2, recuperacao: "Descanso Curto", desc: "Você agora pode usar o Surto de Ação 2 vezes antes de descansar (porém, continua limitado a 1 uso por turno)." },
          { nome: "Indomável (Indomitable) (Upgrade Nv 17)", tipoAcao: "passiva", usosMax: 3, recuperacao: "Descanso Longo", desc: "Seus usos de Indomável aumentam para 3." }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [{ nome: "Recurso do Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica." }] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Três Ataques Extras", tipoAcao: "passiva", desc: "Sempre que você realizar a Ação de Ataque no seu turno, você pode atacar quatro vezes em vez de uma." }
        ] 
      }
    ]
  },
  "Mago": {
    nome: "Mago",
    descricao: "Um estudioso supremo da magia arcana. Capaz de manipular a realidade através de feitiços meticulosamente estudados e anotados em seu grimório.",
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
        titulo: "Kit de Estudioso (Opção A)",
        itens: ["2 Adagas", "Foco Arcano (Bordão)", "Robe", "Grimório", "Pacote de Estudioso", "5 PO"],
        ouro: 5
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 55
      }
    },

    magiasInicial: {
      truquesConhecidos: 3,
      // O Mago ESCREVE 6 no grimório, mas só PREPARA 4 (no nível 1)
      magiasNoGrimorio: 6, 
      magiasPreparadasIniciais: 4, 
      espacosMagia: 2 
    },

    escolhasNivel2: [
      {
        titulo: "Erudito (Scholar)",
        tipo: "pericia_expertise",
        opcoes: [
          { nome: "Arcanismo", desc: "Você ganha Especialização (Dobra a Proficiência)." },
          { nome: "História", desc: "Você ganha Especialização (Dobra a Proficiência)." },
          { nome: "Investigação", desc: "Você ganha Especialização (Dobra a Proficiência)." },
          { nome: "Medicina", desc: "Você ganha Especialização (Dobra a Proficiência)." },
          { nome: "Natureza", desc: "Você ganha Especialização (Dobra a Proficiência)." },
          { nome: "Religião", desc: "Você ganha Especialização (Dobra a Proficiência)." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Tradição Arcana (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // D&D 2024 Core
          { nome: "Abjurador (Abjurer)", desc: "Mestre da proteção e banimento. Cria um escudo de magia em si e nos aliados." },
          { nome: "Adivinho (Diviner)", desc: "Vê o futuro. Altera o destino substituindo rolagens de dados por visões." },
          { nome: "Evocador (Evoker)", desc: "Destruição elemental brutal. Consegue isolar aliados das próprias explosões." },
          { nome: "Ilusionista (Illusionist)", desc: "Engana os sentidos. Lança ilusões furtivas e as transforma em realidade física." },
          
          // Legado
          { nome: "Lâmina Cantante (Bladesinger)", desc: "Combina espada e magia. Ganha grande CA e mobilidade na Canção da Lâmina." },
          { nome: "Cronurgista (Chronurgy)", desc: "Manipula o tempo, forçando rerolagens e congelando inimigos temporais." },
          { nome: "Graviturgista (Graviturgy)", desc: "Dobra a gravidade, alterando o peso de seres e empurrando inimigos com magia." },
          { nome: "Necromante (Necromancy)", desc: "Magia de vida e morte. Cura-se ao matar e comanda hordas de zumbis buffados." },
          { nome: "Transmutador (Transmutation)", desc: "Altera a matéria. Forja pedras mágicas com melhorias passivas contínuas." },
          { nome: "Mago de Guerra (War Magic)", desc: "Focado em combate. Grande iniciativa e reações defensivas potentes." },
          { nome: "Ordem dos Escribas (Scribes)", desc: "Grimório senciente. Muda o dano das magias e conjura através de avatares." },
          { nome: "Encantador (Enchantment)", desc: "Dominação mental, olhares hipnóticos e desvio de ataques passivos." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração (Mago)", tipoAcao: "acao", desc: "A cada Descanso Longo, você estuda seu Grimório e prepara uma lista de magias para o dia. Inteligência é o seu atributo mágico. Você adiciona +2 magias gratuitas no seu livro sempre que sobe de nível de Mago." },
          { nome: "Adepto de Rituais", tipoAcao: "passiva", desc: "Você pode conjurar qualquer magia que tenha a tag 'Ritual' contanto que ela esteja no seu grimório (mesmo que você NÃO a tenha preparado para o dia). Castar como ritual demora 10 minutos a mais, mas não gasta slot." },
          { nome: "Recuperação Arcana", tipoAcao: "livre", desc: "Sempre que terminar um Descanso Curto, você pode recuperar Espaços de Magia gastos. O nível somado dos slots recuperados não pode ultrapassar METADE do seu nível de Mago (arredondado para cima). Slots nv 6+ não podem ser recuperados assim.\n*(Uso: 1 vez por Descanso Longo).* ", usosMax: 1, recuperacao: "Descanso Longo" }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Erudito (Scholar)", tipoAcao: "passiva", desc: "Você ganha *Especialização* (Expertise) na perícia acadêmica que escolheu, dobrando o seu bônus nela." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Tradição Arcana", tipoAcao: "passiva", desc: "Você escolhe em qual escola de magia avançada você vai focar seus estudos." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Memorizar Magia", tipoAcao: "livre", desc: "Sempre que você terminar um Descanso Curto, você pode estudar seu grimório e trocar UMA magia que você havia preparado por qualquer outra magia contida no livro." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
        habilidades: [{ nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
        habilidades: [{ nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
          { nome: "Maestria em Magia", tipoAcao: "passiva", desc: "Escolha uma magia de Nv 1 e uma magia de Nv 2 do seu grimório. Elas estão sempre preparadas, não contam no seu limite, e você pode conjurá-las ao seu bel-prazer SEM GASTAR SLOTS (apenas no nível base da magia).\nVocê pode trocar as duas magias escolhidas estudando por 8 horas no Descanso Longo." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva da Memória Arcana)." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Magias de Assinatura", tipoAcao: "passiva", desc: "Escolha DUAS magias de Nv 3 do seu grimório. Elas estão sempre preparadas (não contam no limite) e você pode conjurar cada uma delas 1x de graça (Sem slot) por Descanso Curto ou Longo." }
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
      armas: ["Simples", "Marciais (com propriedade Acuidade ou Leve)"],
      ferramentas: ["Ferramentas de Ladrão"],
      testes: ["Destreza", "Inteligência"]
    },

    escolhaPericias: {
      qtd: 4,
      lista: ["Acrobacia", "Atletismo", "Enganação", "Furtividade", "Intimidação", "Intuição", "Investigação", "Percepção", "Persuasão", "Prestidigitação"]
    },

    equipamentoInicial: {
      a: {
        titulo: "Kit de Emboscada (Opção A)",
        itens: ["Armadura de Couro", "2 Adagas", "Espada Curta", "Arco Curto", "20 Flechas", "Aljava", "Ferramentas de Ladrão", "Pacote de Assaltante"],
        ouro: 8
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 100
      }
    },

    // 👇 2 Escolhas de Maestria no Nível 1 (D&D 2024)
    escolhasNivel1: [
      {
        titulo: "Maestria em Arma (Escolha 1)",
        tipo: "maestria",
        opcoes: opcoesDeArmas
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        tipo: "maestria",
        opcoes: opcoesDeArmas
      }
    ],

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
          // Extras / Legado
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
          { nome: "Ataque Furtivo (1d6)", tipoAcao: "livre", desc: "1x por turno: +1d6 dano se tiver Vantagem ou aliado a 1,5m do alvo. (Requer arma de Acuidade ou à Distância)." },
          { nome: "Especialização (Expertise)", tipoAcao: "passiva", desc: "Dobre seu bônus de proficiência em 2 perícias treinadas (ou em 1 perícia + Ferramentas de Ladrão)." },
          { nome: "Gíria de Ladrão (Thieves' Cant)", tipoAcao: "passiva", desc: "Você conhece o dialeto secreto criminoso e aprende +1 idioma adicional à sua escolha." },
          { nome: "Maestria em Armas", tipoAcao: "passiva", desc: "Você domina e pode utilizar as propriedades de Maestria de 2 tipos de armas à sua escolha." }
        ] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Ação Astuta (Cunning Action)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você pode usar uma Ação Bônus em cada um dos seus turnos para realizar as ações de **Disparada (Dash)**, **Desengajar (Disengage)** ou **Esconder-se (Hide)**." }
        ] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Arquétipo Ladino (Subclasse)", tipoAcao: "passiva", desc: "Você escolhe seu arquétipo de especialização." },
          { nome: "Ataque Furtivo (2d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 2d6." },
          { nome: "Mira Firme (Steady Aim)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você ganha Vantagem na sua próxima jogada de ataque no turno atual. *(Restrição: Você só pode usar isso se NÃO tiver se movido neste turno, e seu deslocamento vira 0 até o final do turno).* " }
        ] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Esquiva Sobrenatural (Uncanny Dodge)", tipoAcao: "reacao", desc: "**Reação:** Quando um atacante que você possa ver te acertar com um ataque, reduza o dano desse ataque pela metade." },
          { nome: "Ataque Furtivo (3d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 3d6." },
          { nome: "Golpes Astutos (Cunning Strike)", tipoAcao: "livre", desc: "Ao causar Ataque Furtivo, você pode abdicar de dados de dano (ex: -1d6) para aplicar efeitos táticos:\n- **Veneno (-1d6):** Save CON ou fica Envenenado (1 min).\n- **Derrubar (-1d6):** Save DES ou cai Caído (Prone) [alvos Grandes ou menores].\n- **Recuar (-1d6):** Move-se até metade da velocidade sem gerar Ataques de Oportunidade." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Especialização (Upgrade Nv 6)", tipoAcao: "passiva", desc: "Escolha mais 2 perícias treinadas (ou 1 perícia + Ferramentas de Ladrão) para dobrar seu bônus de proficiência." }] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Evasão (Evasion)", tipoAcao: "passiva", desc: "Em efeitos que exigem Save de DES para metade do dano: você não sofre NENHUM dano se passar, e sofre apenas METADE do dano se falhar." },
          { nome: "Talento Confiável (Reliable Talent)", tipoAcao: "passiva", desc: "Sempre que fizer um Teste de Atributo usando uma perícia ou ferramenta na qual seja proficiente, qualquer rolagem de 9 ou menos no d20 é tratada como um 10." },
          { nome: "Ataque Furtivo (4d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 4d6." }
        ] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso de Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Ataque Furtivo (5d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 5d6." }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Golpes Astutos Aprimorados", tipoAcao: "passiva", desc: "Você agora pode aplicar até DOIS efeitos de Golpes Astutos no mesmo Ataque Furtivo, pagando o custo em dados de cada um." },
          { nome: "Ataque Furtivo (6d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 6d6." }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Recurso de Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Ataque Furtivo (7d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 7d6." }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Golpes Desonestos (Devious Strikes)", tipoAcao: "passiva", desc: "Sua lista de Golpes Astutos ganha opções de elite:\n- **Atordoar (-2d6):** Save CON ou só pode fazer Movimento, Ação OU Bônus no próximo turno.\n- **Obscurecer (-3d6):** Save DES ou fica Cego (Blinded) até o fim do próximo turno dele.\n- **Nocautear (-6d6):** Save CON ou fica Inconsciente por 1 min (ou até tomar dano)." }
        ] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Mente Escorregadia (Slippery Mind)", tipoAcao: "passiva", desc: "Sua mente se torna uma fortaleza. Você ganha proficiência em Testes de Resistência de **Sabedoria** e **Carisma**." },
          { nome: "Ataque Furtivo (8d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 8d6." }
        ] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso de Arquétipo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Ataque Furtivo (9d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 9d6." }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [{ nome: "Elusivo (Elusive)", tipoAcao: "passiva", desc: "Nenhuma rolagem de ataque pode ter Vantagem contra você, a menos que você esteja com a condição Incapacitado." }] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva do Espírito Noturno)." },
          { nome: "Ataque Furtivo (10d6)", tipoAcao: "passiva", desc: "Seu dano extra de Ataque Furtivo aumenta para 10d6." }
        ] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Golpe de Sorte (Stroke of Luck)", tipoAcao: "livre", desc: "**Gatilho:** Quando falhar em qualquer Teste de d20 (Ataque, Resistência ou Perícia).\n**Efeito:** Você transforma o resultado da rolagem do d20 em um 20 natural.\n*(Uso: 1x por Descanso Curto ou Longo).* " }
        ] 
      }
    ]
  },

  "Clérigo": {
    nome: "Clérigo",
    descricao: "Um campeão sacerdotal que empunha magia divina a serviço de um poder superior. Consegue canalizar a energia dos planos exteriores para curar aliados e obliterar inimigos.",
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
        titulo: "Sacerdote Combatente (Opção A)",
        itens: ["Cota de Malha", "Escudo", "Maça", "Símbolo Sagrado", "Pacote de Sacerdote", "7 PO"],
        ouro: 7
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 110
      }
    },

    magiasInicial: {
      truquesConhecidos: 3,
      // O Clérigo tem acesso a toda a lista divina, mas só pode preparar um número X por dia.
      magiasPreparadasIniciais: 4, 
      espacosMagia: 2
    },

    escolhasNivel1: [
      {
        titulo: "Ordem Divina",
        tipo: "feature_base", 
        opcoes: [
          { 
            nome: "Protetor (Protector)", 
            desc: "Treinado para a batalha. Você ganha Proficiência com Armas Marciais e com Armaduras Pesadas." 
          },
          { 
            nome: "Taumaturgo (Thaumaturge)", 
            desc: "Focado no oculto. Você aprende 1 Truque extra da lista do Clérigo. Além disso, ganha um bônus igual ao seu Modificador de Sabedoria (mín. +1) nos testes de Religião e Arcanismo." 
          }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Domínio Divino (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // D&D 2024 Core
          { nome: "Domínio da Vida (Life)", desc: "O curandeiro supremo. Cura mais PV, canaliza vida em área e se cura ao curar outros." },
          { nome: "Domínio da Luz (Light)", desc: "Queima inimigos com fogo e luz. Impõe desvantagem em ataques como reação." },
          { nome: "Domínio da Trapaça (Trickery)", desc: "Cria ilusões duplicatas, teleporta e melhora a furtividade do grupo." },
          { nome: "Domínio da Guerra (War)", desc: "Combate linha de frente. Ataca com ação bônus e garante acertos certeiros." },
          
          // Legado
          { nome: "Domínio do Conhecimento (Knowledge)", desc: "Estudiosos e espiões. Lê pensamentos e ganha proficiências temporárias." },
          { nome: "Domínio Arcano (Arcana)", desc: "Mistura magia de Mago com Clérigo. Expulsa extraplanares." },
          { nome: "Domínio da Morte (Death)", desc: "Foca em dano necrótico e ceifar a vida. Ignora resistência a necrótico." },
          { nome: "Domínio da Forja (Forge)", desc: "Ferreiro divino. Cria itens mágicos temporários e resiste ao fogo." },
          { nome: "Domínio da Sepultura (Grave)", desc: "Sentinela da morte. Maximiza a cura em aliados caídos e previne críticos." },
          { nome: "Domínio da Natureza (Nature)", desc: "Protetor dos ermos. Controla plantas/animais e ganha armadura pesada." },
          { nome: "Domínio da Ordem (Order)", desc: "Comanda o campo. Faz aliados atacarem fora do turno com magias de buff." },
          { nome: "Domínio da Paz (Peace)", desc: "Cria laços protetores entre aliados para somar d4 em jogadas e dividir dano." },
          { nome: "Domínio da Tempestade (Tempest)", desc: "Senhor dos raios. Empurra inimigos e maximiza o dano de trovão/relâmpago." },
          { nome: "Domínio do Crepúsculo (Twilight)", desc: "Protetor noturno. Aura infinita de PV temporários e visão no escuro absurda." }
        ]
      }
    ],

    escolhasNivel7: [
      {
        titulo: "Golpes Abençoados (Blessed Strikes)",
        tipo: "feature_base",
        opcoes: [
          { nome: "Golpe Divino (Divine Strike)", desc: "Feito para armas: 1x por turno, ao acertar um ataque armado, cause +1d8 de dano extra (Necrótico ou Radiante)." },
          { nome: "Conjuração Potente (Potent Spellcasting)", desc: "Feito para magia: Adicione seu Modificador de Sabedoria nas rolagens de dano de todos os seus truques de Clérigo." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração (Clérigo)", tipoAcao: "acao", desc: "Você prepara uma lista de magias divinas diariamente após um Descanso Longo. Sabedoria é o seu atributo de conjuração. Você pode usar um Símbolo Sagrado como foco." },
          { nome: "Ordem Divina", tipoAcao: "passiva", desc: "Você se dedica ao papel de Protetor (Combate pesado) ou Taumaturgo (Focado em magias/truques)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Canalizar Divindade", tipoAcao: "acao", desc: "Você canaliza energia direto dos Planos Exteriores. Você possui 2 usos deste recurso. Você recupera UM uso gasto em um Descanso Curto, e TODOS os usos em um Descanso Longo.", usosMax: 2, recuperacao: "Descanso Curto/Longo" },
          { nome: "CD: Centelha Divina", tipoAcao: "acao", desc: "**Ação Mágica (Gasta 1 uso de Canalizar):** Aponte para uma criatura a 30 pés. Role 1d8 + Mod. SAB.\n- **Aliado:** Você cura ele nesse valor.\n- **Inimigo:** Faz Save de CON. Falha: Toma Dano Necrótico ou Radiante nesse valor. Sucesso: Metade." },
          { nome: "CD: Expulsar Mortos-Vivos", tipoAcao: "acao", desc: "**Ação Mágica (Gasta 1 uso de Canalizar):** Mortos-Vivos a 30 pés fazem Save de SAB. Falha: Ficam *Amedrontados* e *Incapacitados* por 1 minuto (Obrigados a fugir de você). O efeito quebra se eles tomarem qualquer dano." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Domínio Divino", tipoAcao: "passiva", desc: "Você escolhe sua Subclasse de Clérigo (que lhe concederá habilidades e magias de domínio preparadas automaticamente)." }], 
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }], 
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [{ nome: "Chamuscar Mortos-Vivos", tipoAcao: "passiva", desc: "Quando você usar o *Expulsar Mortos-Vivos*, você rola uma quantidade de d8s igual ao seu Mod. de Sabedoria. Os mortos-vivos que falharem no Save sofrem Dano Radiante igual ao total rolado (e esse dano não anula a fuga deles)." }], 
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso de Domínio", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Canalizar Divindade (Upgrade Nv 6)", tipoAcao: "passiva", desc: "Seus usos de Canalizar Divindade aumentam para 3.", usosMax: 3, recuperacao: "Descanso Curto/Longo" }
        ], 
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Golpes Abençoados", tipoAcao: "passiva", desc: "Você escolhe potencializar os seus ataques com armas (*Golpe Divino*) ou os seus truques mágicos (*Conjuração Potente*)." },
          { nome: "Upgrade na Centelha Divina", tipoAcao: "passiva", desc: "O poder do seu *Canalizar Divindade: Centelha Divina* sobe para 2d8 + Mod. SAB." }
        ], 
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }], 
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
        habilidades: [{ nome: "Intervenção Divina", tipoAcao: "acao", desc: "**Ação Mágica:** Chame por seu deus! Escolha QUALQUER magia da lista de Clérigo de Nível 5 ou menor que não custe uma Reação. Você conjura essa magia instantaneamente, SEM gastar Slot de Magia e SEM precisar de nenhum Componente Material.\n*(Uso: 1 vez por Descanso Longo).* ", usosMax: 1, recuperacao: "Descanso Longo" }], 
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }], 
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [{ nome: "Upgrade na Centelha Divina", tipoAcao: "passiva", desc: "O poder do seu *Canalizar Divindade: Centelha Divina* sobe para 3d8 + Mod. SAB." }], 
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Golpes Abençoados Aprimorados", tipoAcao: "passiva", desc: "A opção que você escolheu no Nv 7 melhora:\n- *Golpe Divino:* O dano extra sobe para 2d8.\n- *Conjuração Potente:* Ao dar dano com truques, você pode curar (PV Temporários = 2x Mod. SAB) a você ou a um aliado a 60 pés." }
        ], 
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }], 
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [{ nome: "Recurso de Domínio", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }], 
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Canalizar Divindade (Upgrade Nv 18)", tipoAcao: "passiva", desc: "Seus usos de Canalizar Divindade aumentam para 4.", usosMax: 4, recuperacao: "Descanso Curto/Longo" },
          { nome: "Upgrade na Centelha Divina", tipoAcao: "passiva", desc: "O poder do seu *Canalizar Divindade: Centelha Divina* sobe para 4d8 + Mod. SAB." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva do Destino)." }], 
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [{ nome: "Intervenção Divina Maior", tipoAcao: "acao", desc: "Ao usar a sua habilidade *Intervenção Divina*, em vez de escolher uma magia de Clérigo, você pode escolher conjurar a magia *DESEJO* (Wish). Se fizer isso, você não poderá usar a Intervenção Divina novamente até concluir 2d4 Descansos Longos." }], 
        slots: [4,3,3,3,3,2,2,1,1] 
      }
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
          { 
            nome: "Fúria (Rage)", 
            tipoAcao: "bonus", // ⚡ Ação Bônus!
            desc: "**Ação Bônus:** Você entra em Fúria (dura até o fim do seu próximo turno). Você ganha:\n- Vantagem em testes de Força e Saves de Força.\n- Bônus de Dano em ataques corpo-a-corpo usando Força.\n- Resistência a dano de Concussão, Cortante e Perfurante.\n- Não pode conjurar ou manter concentração em magias.\n*(Para manter a Fúria ativa no próximo turno, você precisa atacar um inimigo, forçar um inimigo a fazer um Save, ou usar uma Ação Bônus para estendê-la. Dura no máximo 10 min. Ela acaba antes se você vestir Armadura Pesada ou ficar Incapacitado. Você recupera 1 uso ao fim de um Descanso Curto e todos em um Longo).* ", 
            usosMax: 2, 
            recuperacao: "Descanso Longo" // Recupera todos no Longo, e 1 no Curto
          },
          { 
            nome: "Defesa Sem Armadura", 
            tipoAcao: "passiva",
            desc: "Enquanto você não estiver vestindo nenhuma armadura, sua CA será 10 + seu Modificador de Destreza + seu Modificador de Constituição. Você pode usar um escudo e manter esse benefício." 
          },
          { 
            nome: "Maestria em Armas", 
            tipoAcao: "passiva",
            desc: "Você domina a propriedade de Maestria de 2 tipos de armas Simples ou Marciais corpo-a-corpo. Você pode trocar uma dessas escolhas ao realizar um Descanso Longo." 
          }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { 
            nome: "Senso de Perigo", 
            tipoAcao: "passiva",
            desc: "Você tem Vantagem em Testes de Resistência de Destreza, a não ser que você esteja com a condição Incapacitado." 
          },
          { 
            nome: "Ataque Descuidado (Reckless Attack)", 
            tipoAcao: "livre", // 💨 Ações Livres!
            desc: "**Gatilho:** Ao fazer sua primeira rolagem de ataque no seu turno.\n**Efeito:** Você pode decidir atacar de forma descuidada. Você ganha Vantagem em todas as rolagens de ataque usando Força até o início do seu próximo turno, mas os ataques contra você também têm Vantagem durante esse tempo." 
          }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Caminho Primitivo (Subclasse)", tipoAcao: "passiva", desc: "Você escolhe o seu Caminho Primitivo que moldará a natureza da sua fúria." },
          { nome: "Conhecimento Primitivo", tipoAcao: "passiva", desc: "Você ganha proficiência em mais uma perícia da classe. Enquanto estiver em Fúria, você pode usar Força em vez do atributo normal para rolar Acrobacia, Intimidação, Percepção, Furtividade ou Sobrevivência." },
          { nome: "Fúria (Rage) (Upgrade Nv 3)", tipoAcao: "passiva", desc: "Seus usos de Fúria aumentam para 3.", usosMax: 3, recuperacao: "Descanso Longo" }
        ]
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente seus atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", tipoAcao: "passiva", desc: "Você pode atacar duas vezes, em vez de uma, sempre que realizar a ação de Ataque no seu turno." },
          { nome: "Movimento Rápido", tipoAcao: "passiva", desc: "Seu deslocamento aumenta em +10 pés (+3m) enquanto você não estiver vestindo armadura pesada." }
        ] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso do Caminho Primitivo", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." },
          { nome: "Fúria (Rage) (Upgrade Nv 6)", tipoAcao: "passiva", desc: "Seus usos de Fúria aumentam para 4.", usosMax: 4, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Instinto Feral", tipoAcao: "passiva", desc: "Seus instintos são tão aguçados que você tem Vantagem nas rolagens de Iniciativa." },
          { nome: "Bote Instintivo", tipoAcao: "passiva", desc: "Como parte da Ação Bônus que você usa para entrar em Fúria, você pode se mover até a metade do seu deslocamento." }
        ] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente seus atributos ou escolha um Talento." }] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { 
            nome: "Golpe Brutal (Brutal Strike)", 
            tipoAcao: "livre", // 💨 Ação Livre
            desc: "**Gatilho:** Ao usar seu Ataque Descuidado, você pode abdicar da Vantagem em UM ataque (esse ataque não pode ter Desvantagem).\n**Efeito:** Se acertar, causa +1d10 de dano e você aplica um efeito:\n- **Golpe Forçoso:** Empurra o alvo 15 pés p/ longe. Você pode então se mover metade do seu deslocamento em direção a ele sem provocar Ataques de Oportunidade.\n- **Golpe Incapacitante:** Reduz o deslocamento do alvo em 15 pés até o início do seu próximo turno." 
          },
          { nome: "Fúria (Rage) (Upgrade Nv 9: Dano +3)", tipoAcao: "passiva", desc: "O seu bônus de dano para ataques realizados em Fúria aumenta para +3." }
        ] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Caminho Primitivo", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." }] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { 
            nome: "Fúria Implacável", 
            tipoAcao: "livre", 
            desc: "**Gatilho:** Se você cair a 0 PV com a Fúria ativa e não morrer na hora.\n**Efeito:** Você faz um Save de CON (CD 10). Se passar, você fica com PV igual a 2x seu Nível de Bárbaro.\n*(A CD aumenta em +5 a cada uso. Volta para 10 após um Descanso Curto ou Longo).* " 
          }
        ] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente seus atributos ou escolha um Talento." },
          { nome: "Fúria (Rage) (Upgrade Nv 12)", tipoAcao: "passiva", desc: "Seus usos de Fúria aumentam para 5.", usosMax: 5, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Golpe Brutal (Brutal Strike) (Upgrade Nv 13: Aprimorado)", tipoAcao: "passiva", desc: "Novas opções pro Golpe Brutal:\n- **Golpe Atordoante:** O alvo tem Desvantagem no próximo Save dele e não pode fazer Ataques de Oportunidade até o início do seu próximo turno.\n- **Golpe Fendido:** O próximo ataque feito por OUTRA criatura contra o alvo ganha +5 de bônus na rolagem." }
        ] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Caminho Primitivo", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." }] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Fúria (Rage) (Upgrade Nv 15: Persistente)", tipoAcao: "passiva", desc: "Sua fúria agora dura 10 minutos (não precisa estendê-la a cada turno). Ela só acaba antes se você ficar Inconsciente ou vestir Armadura Pesada. Além disso, ao rolar Iniciativa, você recupera TODOS os usos gastos de Fúria (1x por Descanso Longo)." }
        ] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente seus atributos ou escolha um Talento." },
          { nome: "Fúria (Rage) (Upgrade Nv 16: Dano +4)", tipoAcao: "passiva", desc: "Seu bônus de dano de fúria aumenta para +4." }
        ] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Golpe Brutal (Brutal Strike) (Upgrade Nv 17)", tipoAcao: "passiva", desc: "O dano extra do seu Golpe Brutal aumenta para 2d10 e você pode usar DUAS opções de efeito diferentes simultaneamente." },
          { nome: "Fúria (Rage) (Upgrade Nv 17)", tipoAcao: "passiva", desc: "Seus usos de Fúria aumentam para 6.", usosMax: 6, recuperacao: "Descanso Longo" }
        ] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Força Indomável", tipoAcao: "passiva", desc: "Se o total de um Teste de Atributo de Força OU Teste de Resistência de Força seu for menor que o seu valor no atributo Força, você pode usar o seu valor no lugar daquele total." }
        ] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Epic Boon)." }] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Campeão Primitivo", tipoAcao: "passiva", desc: "Sua Força e Constituição aumentam em +4, e o limite máximo para esses atributos se torna 25." }
        ] 
      }
    ]
  },

  "Bardo": {
    nome: "Bardo",
    descricao: "Um artista inspirador cujo poder ecoa a música da criação. Mestre em magias de suporte, ilusão, feitiçaria e uma versatilidade incomparável.",
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
        titulo: "Artista Viajante (Opção A)",
        itens: ["Armadura de Couro", "2 Adagas", "Instrumento Musical (à escolha)", "Pacote de Artista", "19 PO"],
        ouro: 19
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 90
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      // Em 2024 o Bardo prepara magias como o Clérigo/Mago
      magiasPreparadasIniciais: 4, 
      espacosMagia: 2 
    },

    escolhasNivel2: [
      {
        titulo: "Especialização (Expertise)",
        tipo: "pericia_expertise",
        opcoes: [
          { nome: "Acrobacia", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Adestrar Animais", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Arcanismo", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Atletismo", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Enganação", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Furtividade", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "História", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Intimidação", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Intuição", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Investigação", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Medicina", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Natureza", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Percepção", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Performance", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Persuasão", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Prestidigitação", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Religião", desc: "Dobra a Proficiência (se tiver)." },
          { nome: "Sobrevivência", desc: "Dobra a Proficiência (se tiver)." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Colégio de Bardo (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // D&D 2024 Core
          { nome: "Colégio da Dança (Dance)", desc: "Bardo ágil e desarmado. Usa Inspiração para atacar e desviar. Compartilha evasão com aliados." },
          { nome: "Colégio do Glamour (Glamour)", desc: "Encanta com beleza feérica. Dá PV temporário e movimento tático instantâneo ao grupo." },
          { nome: "Colégio do Conhecimento (Lore)", desc: "O mago dos bardos. Pega magias extras cedo e corta a rolagem dos inimigos com palavras." },
          { nome: "Colégio da Bravura (Valor)", desc: "Bardo combatente. Ganha armadura média/escudo, ataque extra e a Inspiração bufa dano ou CA." },
          // Legado
          { nome: "Colégio da Criação (Creation)", desc: "Anima objetos para lutar e cria itens do nada. Inspiração gera efeitos adicionais cósmicos." },
          { nome: "Colégio da Eloquência (Eloquence)", desc: "Mestre da lábia diplomática. Falhar em Persuasão é impossível. Quebra saves inimigos." },
          { nome: "Colégio dos Espíritos (Spirits)", desc: "Conta histórias com auxílio de espíritos ancestrais gerando efeitos mágicos aleatórios." },
          { nome: "Colégio das Espadas (Swords)", desc: "Duelista puro. Usa floreios de lâmina ao atacar para aumentar a própria CA ou empurrar." },
          { nome: "Colégio dos Sussurros (Whispers)", desc: "Espião sombrio. Rouba sombras de inimigos mortos para se disfarçar e causa dano extra psíquico." }
        ]
      }
    ],

    escolhasNivel9: [
      {
        titulo: "Especialização Aprimorada (Upgrade Nv 9)",
        tipo: "pericia_expertise",
        opcoes: [
          // Repete o menu de Expertise para o VTT pegar mais duas no nível 9
          { nome: "Acrobacia", desc: "Dobra a Proficiência." }, { nome: "Enganação", desc: "Dobra a Proficiência." }, { nome: "Performance", desc: "Dobra a Proficiência." }, { nome: "Persuasão", desc: "Dobra a Proficiência." }, { nome: "Furtividade", desc: "Dobra a Proficiência." }, { nome: "Percepção", desc: "Dobra a Proficiência." }
          // O VTT vai listar todas as proficiências que ele possui aqui
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Inspiração de Bardo (d6)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você entrega um dado de Inspiração (d6) a um aliado a até 60 pés que possa te ouvir/ver. Nos próximos 60 minutos, se o aliado FALHAR num Teste de d20 (Ataque, Save ou Perícia), ele pode rolar a Inspiração e somar ao resultado, podendo transformar a falha num sucesso!\n*(Usos: Igual ao Mod. de Carisma por Descanso Longo).* ", usosMax: "Carisma", recuperacao: "Descanso Longo" },
          { nome: "Conjuração (Bardo)", tipoAcao: "acao", desc: "Você conjura magias preparando-as após um Descanso Longo. Carisma é o seu atributo mágico. Você pode usar um Instrumento Musical como seu Foco Arcano." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Especialização (Expertise)", tipoAcao: "passiva", desc: "Você escolhe 2 Perícias que possui Proficiência para dobrar o seu bônus de proficiência nelas." },
          { nome: "Faz-Tudo (Jack of All Trades)", tipoAcao: "passiva", desc: "Você adiciona metade do seu Bônus de Proficiência (arredondado para baixo) em QUALQUER Teste de Atributo ou Perícia que você já não tenha proficiência (Isso inclui a sua rolagem de Iniciativa e a magia Contramágica)." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Colégio de Bardo", tipoAcao: "passiva", desc: "Escolha a sua subclasse (seu colégio de especialização musical ou retórica)." }],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Inspiração de Bardo (d8)", tipoAcao: "passiva", desc: "Sua Inspiração de Bardo fica mais poderosa. O dado vira um d8." },
          { nome: "Fonte de Inspiração", tipoAcao: "livre", desc: "**Recuperação:** Você agora recupera TODOS os seus usos de Inspiração em Descansos Curtos ou Longos.\n**Combustão:** A qualquer momento (ação livre), você pode queimar 1 Slot de Magia para recuperar imediatamente 1 uso da sua Inspiração de Bardo." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Colégio", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Contra-Encanto (Countercharm)", tipoAcao: "reacao", desc: "**Reação:** Se você ou uma criatura a 30 pés de você falhar num Teste de Resistência (Save) contra um efeito que deixe *Enfeitiçado* ou *Amedrontado*, você toca uma nota de poder para forçar a rolagem a ser refeita, e a nova rolagem ganha VANTAGEM." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Especialização Aprimorada", tipoAcao: "passiva", desc: "Você escolhe mais 2 Perícias nas quais é proficiente para ganhar Expertise (Dobrar a proficiência)." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Segredos Mágicos", tipoAcao: "passiva", desc: "O seu repertório foi quebrado! Daqui em diante, sempre que você for preparar as suas magias diárias ou aprender novas magias para o dia, você pode escolher magias das listas do Mago, Clérigo, Druida OU Bardo. Elas sempre contarão como Magias de Bardo para você." },
          { nome: "Inspiração de Bardo (d10)", tipoAcao: "passiva", desc: "Sua Inspiração de Bardo fica ainda mais poderosa. O dado vira um d10." }
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
        habilidades: [{ nome: "Recurso do Colégio", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Inspiração de Bardo (d12)", tipoAcao: "passiva", desc: "O auge da sua influência. O seu dado de Inspiração vira um d12." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
          { nome: "Inspiração Superior", tipoAcao: "passiva", desc: "Sempre que você rolar a sua Iniciativa no começo de um combate, se você estiver com menos de 2 usos da sua Inspiração de Bardo, você recupera usos imediatamente até ficar com 2." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva da Memória Arcana)." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Palavras da Criação", tipoAcao: "passiva", desc: "Você domina o tecido do multiverso. Você sempre tem as magias *Palavra de Poder: Curar* e *Palavra de Poder: Matar* preparadas (elas não contam no seu limite). Sempre que você conjurar qualquer uma das duas, você pode atingir uma SEGUNDA criatura gratuitamente, contanto que ela esteja a até 10 pés da primeira." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },

  "Druida": {
    nome: "Druida",
    descricao: "Um sacerdote da Velha Fé, empunhando os poderes da natureza, dos elementos e capaz de assumir formas de bestas ferozes em combate.",
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
        titulo: "Guardião da Natureza (Opção A)",
        itens: ["Armadura de Couro", "Escudo", "Foice", "Foco Druídico (Bordão)", "Pacote de Explorador", "Kit de Herbalismo", "9 PO"],
        ouro: 9
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 50
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      magiasPreparadasIniciais: 4, 
      espacosMagia: 2 
    },

    escolhasNivel1: [
      {
        titulo: "Ordem Primitiva",
        tipo: "feature_base",
        opcoes: [
          { 
            nome: "Mágico (Magician)", 
            desc: "Focado no oculto e na conjuração. Você aprende 1 Truque extra de Druida. Você também ganha um bônus numérico nos seus Testes de Arcanismo ou Natureza igual ao seu Modificador de Sabedoria." 
          },
          { 
            nome: "Guardião (Warden)", 
            desc: "Focado no combate físico. Você ganha Proficiência passiva em Armaduras Médias e Armas Marciais." 
          }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Círculo Druídico (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // D&D 2024 Core
          { nome: "Círculo da Terra (Land)", desc: "Mestre elemental e do terreno. Tem magias bônus e recupera slots de magia em descansos curtos." },
          { nome: "Círculo da Lua (Moon)", desc: "O combatente bestial. Transforma-se como Ação Bônus, ganha formas muito mais fortes e ataca ferozmente." },
          { nome: "Círculo do Mar (Sea)", desc: "Controlador de tempestades. Cria auras de oceano que empurram, causam dano de raio e dão mobilidade." },
          { nome: "Círculo das Estrelas (Stars)", desc: "O astrólogo. Usa a Forma Selvagem para virar constelações (Arqueiro, Cálice ou Dragão) de buff e cura." },
          // Legado
          { nome: "Círculo dos Sonhos (Dreams)", desc: "Protetor das fadas. Cura aliados à distância com dados puros sem gastar magias e protege descansos." },
          { nome: "Círculo do Pastor (Shepherd)", desc: "O mestre dos tótens espirituais que geram auras de buff massivo para as bestas que o grupo invoca." },
          { nome: "Círculo dos Esporos (Spores)", desc: "O necromante vegetal. Usa a Forma para ganhar HP e parasitar inimigos próximos com dano de necrose." },
          { nome: "Círculo do Fogo Selvagem (Wildfire)", desc: "Invocador. Cria um espírito de fogo constante no campo que atira, cura e teleporta o grupo inteiro." }
        ]
      }
    ],

    escolhasNivel7: [
      {
        titulo: "Fúria Elemental (Elemental Fury)",
        tipo: "feature_base",
        opcoes: [
          { nome: "Conjuração Potente (Potent Spellcasting)", desc: "Para magos puros: Você adiciona o seu Mod. de Sabedoria nas rolagens de dano de todos os seus Truques." },
          { nome: "Golpe Primitivo (Primal Strike)", desc: "Para combatentes: 1x por turno, ao acertar um ataque (Arma ou garra de Forma Selvagem), você causa +1d8 de Dano extra de Fogo, Frio, Raio ou Trovão." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração (Druida)", tipoAcao: "acao", desc: "Você prepara uma lista de magias naturais diariamente após um Descanso Longo. Sabedoria é o seu atributo mágico. Você pode usar um Foco Druídico." },
          { nome: "Idioma Druídico", tipoAcao: "passiva", desc: "Você entende o idioma sagrado dos druidas (usado para mensagens secretas). Por causa disso, você SEMPRE tem a magia *Falar com Animais* preparada gratuitamente." },
          { nome: "Ordem Primitiva", tipoAcao: "passiva", desc: "Escolha se você é Mágico (Truques extras) ou Guardião (Armaduras médias/Armas Marciais)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Forma Selvagem (Wild Shape)", tipoAcao: "bonus", desc: "**Ação Bônus:** Transforme-se em um Animal (Besta) conhecido por até (Nível/2) horas.\n- **Regras:** Você NÃO GANHA o HP da fera; em vez disso, você ganha Pontos de Vida Temporários iguais ao seu Nível de Druida (Se perder o Temp HP, a forma NÃO QUEBRA). Você substitui Força, Destreza e Ataques pelos do bicho.\n- **Limites:** No Nv 2, CR Máximo é 1/4 e NÃO PODE ter Deslocamento de Voo.\n*(Usos: 2 vezes por Descanso Curto/Longo).* ", usosMax: 2, recuperacao: "Descanso Curto" },
          { nome: "Companheiro Selvagem", tipoAcao: "acao", desc: "Você pode queimar 1 uso da sua *Forma Selvagem* (ou gastar 1 Slot) para conjurar *Encontrar Familiar* (Find Familiar) na hora, sem gastar nenhum componente. O animal evocado é uma Fada e desaparece no Descanso Longo." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [{ nome: "Círculo Druídico", tipoAcao: "passiva", desc: "Escolha sua subclasse druídica (seu círculo de especialização natural)." }],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Evolução da Forma Selvagem", tipoAcao: "passiva", desc: "Sua Forma Selvagem evolui: Agora você pode se transformar em bestas de até **CR 1/2**." }
        ],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ressurgimento Selvagem", tipoAcao: "livre", desc: "**Combustão:** 1x por turno, você pode gastar 1 Slot de Magia de qualquer nível para recuperar 1 uso da sua *Forma Selvagem* imediatamente.\n**Sacrifício:** 1x por Descanso Longo, você pode fazer o inverso: Gastar 1 uso de Forma Selvagem para recuperar 1 Slot de Magia Nível 1 gasto." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Círculo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Fúria Elemental", tipoAcao: "passiva", desc: "Sua conexão com o dano aumenta. Você escolhe entre aprimorar seus Truques de Dano ou seus Golpes Armados/Desarmados." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Evolução da Forma Selvagem (Voo)", tipoAcao: "passiva", desc: "Sua Forma Selvagem chega ao limite base: Agora você pode virar bestas de até **CR 1** e a restrição de Voar acaba (Você PODE virar pássaros, morcegos, etc)." }
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
        habilidades: [{ nome: "Recurso do Círculo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
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
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
        habilidades: [{ nome: "Recurso do Círculo", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Fúria Elemental Aprimorada", tipoAcao: "passiva", desc: "O bônus escolhido no Nv 7 melhora:\n- Se escolheu Truques: O alcance de todos os truques aumenta em absurdos 300 pés.\n- Se escolheu Golpes Primitivos: O dano extra elemental no ataque sobe para 2d8." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Forma Selvagem (Upgrade Nv 17)", tipoAcao: "passiva", desc: "Seus usos de Forma Selvagem aumentam para 4.", usosMax: 4, recuperacao: "Descanso Curto/Longo" }
        ],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Magias Bestiais (Beast Spells)", tipoAcao: "passiva", desc: "Você agora PODE conjurar magias normalmente enquanto estiver transformado na sua Forma Selvagem. (Exceção: Não pode conjurar magias que consumam o material ou que o material tenha custo em Ouro)." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica." }],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Arquidruida", tipoAcao: "passiva", desc: "**Renovação:** Sempre que você rolar Iniciativa e não tiver usos de Forma Selvagem, você recupera 1 uso no ato.\n**Mago da Natureza:** 1x por Descanso Longo, converta usos de Forma Selvagem em 1 Slot de Magia puro (Cada Uso gasto te dá 2 Níveis de Slot. Ex: Gastou 2 Usos, gerou um Slot Nível 4).\n**Longevidade:** A cada 10 anos reais, seu corpo envelhece apenas 1." }
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
          { 
            nome: "Artes Marciais (d6)", 
            tipoAcao: "passiva",
            desc: "Sua maestria desarmada (que se aplica a Ataques Desarmados e armas de Monge) concede 3 benefícios:\n- **Ataque Bônus:** Imediatamente após usar a Ação de Ataque, você pode dar um Ataque Desarmado extra como Ação Bônus.\n- **Dano Marcial:** Você pode rolar 1d6 no lugar do dano normal.\n- **Ataques Destros:** Pode usar Destreza em vez de Força para rolagens de acerto e dano. Além disso, ao usar a opção de Agarrar (Grapple) ou Empurrar (Shove), você usa sua Destreza para definir a CD do Teste de Resistência do alvo." 
          },
          { 
            nome: "Defesa Sem Armadura", 
            tipoAcao: "passiva",
            desc: "Enquanto não usar armadura ou escudo, sua CA é 10 + Modificador de Destreza + Modificador de Sabedoria." 
          }
        ]
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { 
            nome: "Foco do Monge (Ki)", 
            tipoAcao: "bonus", // ⚡ Gaveta de Ação Bônus
            usosMax: 2, 
            recuperacao: "Descanso Curto",
            desc: "Você possui uma reserva de energia mística. A CD para seus efeitos de Foco é (8 + SAB + Proficiência).\n- **Rajada de Golpes:** Gaste 1 Ponto para realizar dois Ataques Desarmados como Ação Bônus.\n- **Defesa Paciente:** Pode usar a ação Desengajar como Ação Bônus de graça. Ou, gastar 1 Ponto para usar Desengajar E Esquivar juntos como Ação Bônus.\n- **Passo do Vento:** Pode usar a ação Disparada como Ação Bônus de graça. Ou, gastar 1 Ponto para usar Disparada E Desengajar juntos como Ação Bônus, e dobrar sua distância de salto no turno." 
          },
          { 
            nome: "Movimento Sem Armadura (+10 ft)", 
            tipoAcao: "passiva",
            desc: "Seu deslocamento base aumenta em +10 ft (3 metros) enquanto você não estiver usando armaduras ou escudos." 
          },
          { 
            nome: "Metabolismo Estranho", 
            tipoAcao: "livre", // 💨 Ações Livres/Gatilhos
            usosMax: 1,
            recuperacao: "Descanso Longo",
            desc: "**Gatilho (Rolar Iniciativa):** Ao rolar iniciativa, você pode escolher recuperar todos os seus pontos de Foco (Ki) gastos. Quando fizer isso, role seu Dado de Artes Marciais e recupere Pontos de Vida igual ao número rolado + seu Nível de Monge." 
          }
        ]
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { 
            nome: "Tradição Monástica", 
            tipoAcao: "passiva",
            desc: "Você escolhe uma Tradição Monástica (Subclasse), moldando sua técnica." 
          },
          { 
            nome: "Desviar Ataques", 
            tipoAcao: "reacao", // 🛡️ Aba de Reações
            desc: "**Reação:** Quando atingido por um ataque de Concussão, Cortante ou Perfurante, você reduz o dano sofrido em 1d10 + seu Mod. Destreza + seu Nível de Monge.\n**Redirecionar:** Se o dano for reduzido a 0, você pode gastar 1 Ponto de Foco para redirecionar o golpe. Escolha um alvo a até 5 pés (se melee) ou a 60 pés (se ranged e sem cobertura total). Ele faz um Save de DEX. Se falhar, sofre dano do mesmo tipo do ataque original igual a: 2x seu Dado de Artes Marciais + seu Mod. Destreza." 
          },
          { nome: "Foco do Monge (Upgrade Nv 3)", tipoAcao: "passiva", usosMax: 3, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco (Ki) aumenta para 3 pontos." }
        ]
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo em +2, dois atributos em +1, ou escolha um Talento." },
          { 
            nome: "Queda Lenta", 
            tipoAcao: "reacao", 
            desc: "**Reação:** Ao cair, você pode reduzir o dano de queda sofrido em um valor igual a 5 vezes o seu Nível de Monge." 
          },
          { nome: "Foco do Monge (Upgrade Nv 4)", tipoAcao: "passiva", usosMax: 4, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco (Ki) aumenta para 4 pontos." }
        ]
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", tipoAcao: "passiva", desc: "Sempre que usar a Ação de Ataque, você pode atacar duas vezes." },
          { 
            nome: "Ataque Atordoante (Stunning Strike)", 
            tipoAcao: "livre", 
            desc: "**Gatilho:** Uma vez por turno, ao acertar um ataque com arma de monge ou desarmado.\n**Efeito:** Você pode gastar 1 Ponto de Foco para forçar um Save de Constituição:\n- **Falha:** Alvo fica Atordoado (Stunned) até o início do seu próximo turno.\n- **Sucesso:** A velocidade do alvo cai pela metade e o próximo ataque contra ele tem Vantagem até o início do seu próximo turno." 
          },
          { nome: "Artes Marciais (d8)", tipoAcao: "passiva", desc: "Seu dado de Artes Marciais aumenta para 1d8." },
          { nome: "Foco do Monge (Upgrade Nv 5)", tipoAcao: "passiva", usosMax: 5, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco (Ki) aumenta para 5 pontos." }
        ]
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { 
            nome: "Golpes Empoderados", 
            tipoAcao: "livre", 
            desc: "Sempre que causar dano com um Ataque Desarmado, você pode escolher causar dano de Força (Force) ao invés do tipo normal." 
          },
          { nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." },
          { nome: "Movimento Sem Armadura (+15 ft)", tipoAcao: "passiva", desc: "Seu deslocamento base aumenta em +15 ft (4,5 metros)." },
          { nome: "Foco do Monge (Upgrade Nv 6)", tipoAcao: "passiva", usosMax: 6, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 6 pontos." }
        ]
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { 
            nome: "Evasão", 
            tipoAcao: "passiva",
            desc: "Quando for alvo de um efeito que permite um Save de Destreza para metade do dano, você não sofre dano se passar, e sofre só metade se falhar. Você não ganha esse benefício se estiver Incapacitado." 
          },
          { nome: "Foco do Monge (Upgrade Nv 7)", tipoAcao: "passiva", usosMax: 7, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 7 pontos." }
        ]
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo em +2, dois atributos em +1, ou escolha um Talento." },
          { nome: "Foco do Monge (Upgrade Nv 8)", tipoAcao: "passiva", usosMax: 8, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 8 pontos." }
        ]
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Movimento Acrobático", tipoAcao: "passiva", desc: "Enquanto não estiver usando armaduras ou escudos, você pode mover-se ao longo de superfícies verticais (paredes) e sobre líquidos sem cair durante o seu turno." },
          { nome: "Foco do Monge (Upgrade Nv 9)", tipoAcao: "passiva", usosMax: 9, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 9 pontos." }
        ]
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { 
            nome: "Foco Elevado", 
            tipoAcao: "passiva", 
            desc: "Suas opções de Foco do Monge (Nível 2) são aprimoradas:\n- **Rajada de Golpes:** Agora realiza **3** Ataques Desarmados em vez de 2.\n- **Defesa Paciente:** Ao gastar Ponto de Foco nela, você ganha PV Temporários iguais a 2 rolagens do seu Dado de Artes Marciais.\n- **Passo do Vento:** Ao gastar Ponto de Foco nela, você pode arrastar uma criatura voluntária Grande ou menor a até 5 pés de você até o final do seu turno sem provocar Ataques de Oportunidade." 
          },
          { 
            nome: "Auto-Restauração", 
            tipoAcao: "passiva",
            desc: "Ao final do seu turno, se estiver Enfeitiçado (Charmed), Amedrontado (Frightened) ou Envenenado (Poisoned), a condição termina em você imediatamente. Além disso, privação de comida/água não te dá Exaustão." 
          },
          { nome: "Movimento Sem Armadura (+20 ft)", tipoAcao: "passiva", desc: "Seu deslocamento base aumenta em +20 ft (6 metros)." },
          { nome: "Foco do Monge (Upgrade Nv 10)", tipoAcao: "passiva", usosMax: 10, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 10 pontos." }
        ]
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." },
          { nome: "Artes Marciais (d10)", tipoAcao: "passiva", desc: "Seu dado de Artes Marciais aumenta para 1d10." },
          { nome: "Foco do Monge (Upgrade Nv 11)", tipoAcao: "passiva", usosMax: 11, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 11 pontos." }
        ]
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo em +2, dois atributos em +1, ou escolha um Talento." },
          { nome: "Foco do Monge (Upgrade Nv 12)", tipoAcao: "passiva", usosMax: 12, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 12 pontos." }
        ]
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { 
            nome: "Desviar Energia", 
            tipoAcao: "passiva", 
            desc: "Você agora pode usar sua Reação de **Desviar Ataques** contra ataques de **QUALQUER tipo de dano**." 
          },
          { nome: "Foco do Monge (Upgrade Nv 13)", tipoAcao: "passiva", usosMax: 13, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 13 pontos." }
        ]
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { 
            nome: "Sobrevivente Disciplinado", 
            tipoAcao: "livre", 
            desc: "**Passiva:** Você ganha proficiência em TODOS os Testes de Resistência.\n**Gatilho:** Quando você falhar em um Teste de Resistência, você pode gastar 1 Ponto de Foco para rolar novamente. Você deve usar o novo resultado." 
          },
          { nome: "Movimento Sem Armadura (+25 ft)", tipoAcao: "passiva", desc: "Seu deslocamento base aumenta em +25 ft (7,5 metros)." },
          { nome: "Foco do Monge (Upgrade Nv 14)", tipoAcao: "passiva", usosMax: 14, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 14 pontos." }
        ]
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { 
            nome: "Foco Perfeito", 
            tipoAcao: "livre", 
            desc: "**Gatilho (Rolar Iniciativa):** Se você rolar Iniciativa, tiver 3 Pontos de Foco ou menos, e NÃO usar sua habilidade de *Metabolismo Estranho*, você recupera Pontos de Foco até ficar com 4." 
          },
          { nome: "Foco do Monge (Upgrade Nv 15)", tipoAcao: "passiva", usosMax: 15, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 15 pontos." }
        ]
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo em +2, dois atributos em +1, ou escolha um Talento." },
          { nome: "Foco do Monge (Upgrade Nv 16)", tipoAcao: "passiva", usosMax: 16, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 16 pontos." }
        ]
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso da Tradição", tipoAcao: "passiva", desc: "Você ganha uma habilidade da sua Subclasse." },
          { nome: "Artes Marciais (d12)", tipoAcao: "passiva", desc: "Seu dado de Artes Marciais aumenta para 1d12." },
          { nome: "Foco do Monge (Upgrade Nv 17)", tipoAcao: "passiva", usosMax: 17, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 17 pontos." }
        ]
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { 
            nome: "Defesa Superior", 
            tipoAcao: "livre", // 💨 Ação Livre (No início do turno, sem custo de Ação!)
            desc: "**Gatilho:** No início do seu turno.\n**Efeito:** Você pode gastar 3 Pontos de Foco para ganhar Resistência a TODOS os tipos de dano, exceto Força (Force). Esse efeito dura por 1 minuto ou até você ficar Incapacitado." 
          },
          { nome: "Movimento Sem Armadura (+30 ft)", tipoAcao: "passiva", desc: "Seu deslocamento base aumenta em +30 ft (9 metros)." },
          { nome: "Foco do Monge (Upgrade Nv 18)", tipoAcao: "passiva", usosMax: 18, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 18 pontos." }
        ]
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Epic Boon)." },
          { nome: "Foco do Monge (Upgrade Nv 19)", tipoAcao: "passiva", usosMax: 19, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco aumenta para 19 pontos." }
        ]
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Corpo e Mente", tipoAcao: "passiva", desc: "Sua Destreza e Sabedoria aumentam em +4 permanentemente (limite máximo sobe para 25)." },
          { nome: "Foco do Monge (Upgrade Nv 20)", tipoAcao: "passiva", usosMax: 20, recuperacao: "Descanso Curto", desc: "Sua reserva de Foco atinge o máximo de 20 pontos." }
        ]
      }
    ]
  },

  "Paladino": {
    nome: "Paladino",
    descricao: "Um guerreiro santo preso a um juramento sagrado. Combina habilidade marcial com cura de ação bônus, defesas em aura impenetráveis e dano radiante avassalador.",
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
        titulo: "Cavaleiro Blindado (Opção A)",
        itens: ["Cota de Malha (Pesada)", "Escudo", "Espada Longa", "6 Azagaias", "Símbolo Sagrado", "Pacote de Sacerdote", "9 PO"],
        ouro: 9
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 150
      }
    },

    magiasInicial: {
      truquesConhecidos: 0,
      magiasPreparadasIniciais: 2, 
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
        tipo: "talento_lutador", 
        opcoes: [
          { nome: "Defesa", desc: "Você ganha +1 na CA passiva enquanto estiver vestindo qualquer armadura." },
          { nome: "Duelo", desc: "Você ganha +2 nas rolagens de dano ao atacar com uma arma corpo a corpo em uma mão (e escudo na outra ou mão livre)." },
          { nome: "Combate com Armas Grandes", desc: "Quando rolar 1 ou 2 no dano de uma arma que você segure com duas mãos, você rerola o dado e usa o novo resultado." },
          { nome: "Proteção", desc: "Use sua Reação para impor Desvantagem no ataque de um inimigo contra um aliado a 5 pés (exige usar Escudo)." },
          { nome: "Guerreiro Abençoado", desc: "Você aprende 2 Truques da lista do Clérigo. Eles contam como magias de Paladino para você (usa Carisma)." }
        ]
      }
    ],

    escolhasNivel3: [
      {
        titulo: "Juramento Sagrado (Subclasse)",
        tipo: "subclasse",
        opcoes: [
          // D&D 2024 Core
          { nome: "Juramento da Devoção (Devotion)", desc: "O cavaleiro de luz clássico. Arma sagrada brilha para acertos perfeitos, e a aura defende contra feitiços de charme." },
          { nome: "Juramento da Glória (Glória)", desc: "O atleta divino. Smites geram PV temporário em área e a aura aumenta a velocidade passiva do grupo." },
          { nome: "Juramento dos Anciões (Ancients)", desc: "O cavaleiro verde. Magia enraíza inimigos e a aura protege contra magias inimigas incrivelmente bem." },
          { nome: "Juramento da Vingança (Vengeance)", desc: "Caçador implacável. Marca um inimigo para vantagem absoluta de ataque e persegue-o ao bater." },
          // Legado
          { nome: "Juramento da Coroa (Crown)", desc: "Guardião da lei e da realeza. Obriga inimigos a não fugirem de você e atrai o dano de aliados." },
          { nome: "Juramento da Conquista (Conquest)", desc: "Tirano assustador. Sua aura dá dano passivo e congela no lugar os inimigos amedrontados por você." },
          { nome: "Juramento da Redenção (Redemption)", desc: "O pacifista com limite. Reflete o dano recebido de volta no inimigo para proteger o grupo." },
          { nome: "Juramento dos Vigias (Watchers)", desc: "Caçador de extraplanares. Bane criaturas de outras dimensões e a aura dá super iniciativa para a PT." },
          { nome: "Quebrador de Juramento (Oathbreaker)", desc: "Paladino caído nas trevas. Controla mortos-vivos e fortalece o dano de monstros próximos (incluindo você)." }
        ]
      }
    ],

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Cura Pelas Mãos (Lay on Hands)", tipoAcao: "bonus", desc: "**Ação Bônus:** Toque uma criatura. Você tem uma reserva diária (Pool) de energia de cura igual a (5 x Nível de Paladino). Você gasta pontos dessa reserva para curar PV na mesma proporção. Alternativamente, você gasta 5 pontos da reserva apenas para remover a condição *Envenenado* do alvo.\n*(Reserva recarrega no Descanso Longo).* ", usosMax: "Pool de Cura", recuperacao: "Descanso Longo" },
          { nome: "Conjuração (Paladino)", tipoAcao: "acao", desc: "Você prepara uma lista de magias divinas diariamente após um Descanso Longo. Carisma é o seu atributo de conjuração. Você pode usar um Símbolo Sagrado como foco." },
          { nome: "Maestria em Armas", tipoAcao: "passiva", desc: "Você domina os segredos marciais e pode usar as Propriedades de Maestria de 2 tipos de armas à sua escolha (podendo trocar a escolha no Descanso Longo)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] // AGORA SIM! 2 Slots no Nível 1!
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Estilo de Luta", tipoAcao: "passiva", desc: "Você escolhe uma técnica passiva de combate avançado (ou Truques Divinos)." },
          { nome: "Destruição do Paladino (Smite)", tipoAcao: "bonus", desc: "Você sempre tem a magia *Destruição Divina* (Divine Smite) preparada (Ela agora conta como Ação Bônus a ser castada LOGO APÓS você acertar o ataque com arma/desarmado).\nVocê também pode conjurar *Destruição Divina* 1 vez sem gastar nenhum Slot de Magia por Descanso Longo." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Juramento Sagrado", tipoAcao: "passiva", desc: "Escolha sua subclasse, selando seus votos de vida." },
          { nome: "Canalizar Divindade", tipoAcao: "acao", desc: "Você usa poder dos deuses para ativar habilidades do seu juramento ou detectar o mal. Você possui 2 Usos diários.", usosMax: 2, recuperacao: "Descanso Curto/Longo" },
          { nome: "CD: Sentido Divino", tipoAcao: "bonus", desc: "**Ação Bônus:** Por 10 minutos, detecta Celestial, Corruptor ou Morto-Vivo a até 60 pés." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", tipoAcao: "passiva", desc: "Você pode atacar DUAS vezes, em vez de uma, sempre que usar a Ação de Ataque no seu turno." },
          { nome: "Montaria Fiel", tipoAcao: "acao", desc: "Sempre tem *Encontrar Montaria* (Find Steed) preparada. Conjura 1x de graça por Descanso Longo." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Aura de Proteção (10 ft)", tipoAcao: "passiva", desc: "Você e aliados a 10 pés somam seu Modificador de Carisma em TODOS os Saves." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Juramento", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Abjurar Inimigos", tipoAcao: "acao", desc: "**Ação Mágica (Gasta Canalizar Divindade):** Amedronta inimigos (Qtd = Mod CAR) a 60 pés. Eles perdem ações no turno." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Aura de Coragem", tipoAcao: "passiva", desc: "Você e aliados na sua Aura são imunes a *Amedrontado*." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Golpes Radiantes", tipoAcao: "passiva", desc: "Sempre que acertar um ataque Corpo a Corpo, causa +1d8 de Dano Radiante EXTRA." },
          { nome: "Canalizar Divindade (Upgrade)", tipoAcao: "passiva", desc: "Seus usos diários sobem para 3.", usosMax: 3, recuperacao: "Descanso Curto/Longo" }
        ],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
          { nome: "Toque Restaurador", tipoAcao: "passiva", desc: "Sua *Cura Pelas Mãos* pode gastar 5 PVs para remover: Cego, Enfeitiçado, Surdo, Amedrontado, Paralisado ou Atordoado." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Juramento", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
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
          { nome: "Expansão de Aura", tipoAcao: "passiva", desc: "O alcance da sua *Aura de Proteção* aumenta para 30 pés (9m)." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva da Visão Verdadeira)." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [{ nome: "Campeão do Juramento", tipoAcao: "passiva", desc: "Habilidade de transformação suprema da sua subclasse." }],
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
        titulo: "Caçador Furtivo (Opção A)",
        itens: ["Corselete de Couro Batido", "Cimitarra", "Espada Curta", "Arco Longo", "20 Flechas", "Foco Druídico (ramo de visco)", "Pacote de Explorador", "7 PO"],
        ouro: 7
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 150
      }
    },

    magiasInicial: {
      truquesConhecidos: 0, // Ranger base não tem truques (exceto se pegar o Estilo Guerreiro Druídico)
      magiasConhecidas: 2, 
      espacosMagia: 2 
    },

    escolhasNivel1: [
      {
        titulo: "Maestria em Arma (Escolha 1)",
        tipo: "maestria",
        opcoes: opcoesDeArmas
      },
      {
        titulo: "Maestria em Arma (Escolha 2)",
        tipo: "maestria",
        opcoes: opcoesDeArmas
      }
    ],

    escolhasNivel2: [
      {
        titulo: "Estilo de Luta",
        tipo: "talento_lutador", 
        opcoes: [
          { nome: "Arquearia", desc: "+2 em jogadas de ataque com armas à distância." },
          { nome: "Defesa", desc: "+1 na CA enquanto usar armadura." },
          { nome: "Duelismo", desc: "+2 de dano com arma de uma mão (se a outra estiver vazia ou com escudo)." },
          { nome: "Combate com Duas Armas", desc: "Adiciona seu modificador de atributo no dano do ataque da segunda arma." },
          { nome: "Guerreiro Druídico", desc: "Aprende 2 truques da lista do Druida (Orientação e Brilho Estelar recomendados)." }
        ]
      },
      {
        titulo: "Explorador Hábil (Especialização 1)",
        tipo: "pericia_expertise",
        opcoes: [
          { nome: "Adestrar Animais", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Atletismo", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Furtividade", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Intuição", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Investigação", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Natureza", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Percepção", desc: "Expertise: Dobra o bônus de proficiência." },
          { nome: "Sobrevivência", desc: "Expertise: Dobra o bônus de proficiência." }
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

    // 👇 O SISTEMA VAI PEDIR AS DUAS PERÍCIAS NOVAS AQUI 👇
    escolhasNivel9: [
      {
        titulo: "Especialização Adicional (Escolha 1)",
        tipo: "pericia_expertise",
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
      },
      {
        titulo: "Especialização Adicional (Escolha 2)",
        tipo: "pericia_expertise",
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

    tabelaNiveis: [
      { 
        nivel: 1, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conjuração (Patrulheiro)", tipoAcao: "acao", desc: "Você conjura magias da lista do Patrulheiro. Sabedoria é o seu atributo de conjuração. Você pode usar um Foco Druídico." },
          { nome: "Inimigo Favorito (Hunter's Mark)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você tem a magia *Marca do Caçador* (Hunter's Mark) sempre preparada (não conta no limite). Você pode conjurá-la 2 vezes sem gastar espaço de magia. Dano extra: 1d6.", usosMax: 2, recuperacao: "Descanso Longo" },
          { nome: "Maestria em Armas", tipoAcao: "passiva", desc: "Você domina e pode utilizar as propriedades de Maestria de 2 tipos de armas à sua escolha (pode trocar no Descanso Longo)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Explorador Hábil (Deft Explorer)", tipoAcao: "passiva", desc: "Você ganha *Especialização* (Expertise) em uma perícia da sua classe, dobrando seu bônus. Além disso, você aprende 2 idiomas à sua escolha." },
          { nome: "Estilo de Luta", tipoAcao: "passiva", desc: "Você adota um estilo de combate especializado ou aprende feitiços druídicos." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Conclave de Patrulheiro (Subclasse)", tipoAcao: "passiva", desc: "Você escolhe sua especialização de Patrulheiro." },
          { nome: "Inimigo Favorito (Upgrade Nv 3)", tipoAcao: "passiva", desc: "Seus usos gratuitos de *Marca do Caçador* aumentam para 3.", usosMax: 3, recuperacao: "Descanso Longo" }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Ataque Extra", tipoAcao: "passiva", desc: "Você pode atacar duas vezes, em vez de uma, sempre que usar a Ação de Ataque no seu turno." },
          { nome: "Inimigo Favorito (Upgrade Nv 5)", tipoAcao: "passiva", desc: "Seus usos gratuitos de *Marca do Caçador* aumentam para 4.", usosMax: 4, recuperacao: "Descanso Longo" }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Andarilho (Roving)", tipoAcao: "passiva", desc: "Seu deslocamento aumenta em +10 pés (3m) enquanto você NÃO estiver usando Armadura Pesada. Você também ganha Deslocamento de Escalada e de Natação iguais ao seu deslocamento terrestre." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Conclave", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Especialização (Expertise)", tipoAcao: "passiva", desc: "Você escolhe mais 2 perícias treinadas para dobrar o seu bônus de proficiência." },
          { nome: "Inimigo Favorito (Upgrade Nv 9)", tipoAcao: "passiva", desc: "Seus usos gratuitos de *Marca do Caçador* aumentam para 5.", usosMax: 5, recuperacao: "Descanso Longo" }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Incansável (Tireless)", tipoAcao: "acao", desc: "**Ação Mágica:** Você ganha PV Temporários iguais a 1d8 + seu Mod. de Sabedoria (Mín. 1). Você pode usar essa Ação um número de vezes igual ao seu Mod. de Sabedoria por Descanso Longo.\n**Passiva:** Sempre que você terminar um Descanso Curto, seu nível de Exaustão (se houver) diminui em 1." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Conclave", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Caçador Implacável (Relentless Hunter)", tipoAcao: "passiva", desc: "Sofrer dano não pode mais quebrar a sua Concentração na magia *Marca do Caçador*." },
          { nome: "Inimigo Favorito (Upgrade Nv 13)", tipoAcao: "passiva", desc: "Seus usos gratuitos de *Marca do Caçador* aumentam para 6.", usosMax: 6, recuperacao: "Descanso Longo" }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Véu da Natureza (Nature's Veil)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você invoca espíritos da natureza e ganha a condição Invisível até o final do seu próximo turno.\n*(Uso: Igual ao seu Modificador de Sabedoria por Descanso Longo).* " }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Conclave", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente um atributo ou escolha um Talento." }],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Caçador Preciso (Precise Hunter)", tipoAcao: "passiva", desc: "Você tem Vantagem nas jogadas de ataque contra a criatura que estiver marcada pela sua *Marca do Caçador*." },
          { nome: "Inimigo Favorito (Upgrade Nv 17)", tipoAcao: "passiva", desc: "Seus usos gratuitos de *Marca do Caçador* continuam sendo 6.", usosMax: 6, recuperacao: "Descanso Longo" }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Sentidos Ferais (Feral Senses)", tipoAcao: "passiva", desc: "Sua conexão com as forças da natureza lhe concede Percepção às Cegas (Blindsight) com um alcance de 30 pés (9m)." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva da Viagem Dimensional)." }],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Matador de Inimigos (Foe Slayer)", tipoAcao: "passiva", desc: "O dado de dano extra da sua *Marca do Caçador* (Hunter's Mark) aumenta para 1d10 (em vez de 1d6)." }
        ],
        slots: [4,3,3,3,2,0,0,0,0] 
      }
    ]
  },

  "Bruxo": {
    nome: "Bruxo",
    descricao: "Um conjurador que ganha poderes através de um pacto com uma entidade extraplanar. A Magia de Pacto recarrega em descanso curto.",
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
        titulo: "Estudioso do Oculto (Opção A)",
        itens: ["Armadura de Couro", "Foice", "2 Adagas", "Foco Arcano (Orbe)", "Livro de Ocultismo", "Pacote de Estudioso", "15 PO"],
        ouro: 15
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 100
      }
    },

    magiasInicial: {
      truquesConhecidos: 2,
      magiasConhecidas: 2, 
      espacosMagia: 1 
    },

    // --- ESCOLHAS DE INVOCAÇÕES (GATILHOS DO VTT) ---
    escolhasNivel1: [
      { titulo: "Invocação Mística (1ª)", tipo: "invocacao", opcoes: [] }
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
          // D&D 2024
          { nome: "Arquifada (Archfey)", desc: "Pacto com fadas nobres. Ilusão e teleporte." },
          { nome: "Celestial (Celestial)", desc: "Pacto com anjos. Cura e luz." },
          { nome: "Corruptor (Fiend)", desc: "Pacto com demônios. Fogo e PV temporário." },
          { nome: "Grande Antigo (Great Old One)", desc: "Pacto com o desconhecido. Telepatia e psíquico." },
          // Legado
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
          { nome: "Magia de Pacto", tipoAcao: "acao", desc: "Você conjura magias usando Carisma. Ao contrário das outras classes, os seus Espaços de Magia (Slots) são sempre nivelados automaticamente para o maior nível possível. Você recupera todos os seus Slots ao terminar um Descanso Curto ou Longo." },
          { nome: "Invocações Místicas (1)", tipoAcao: "passiva", desc: "Você descobre uma Invocação Mística (como Pacto da Lâmina, Tomo ou Corrente). Sempre que você subir de nível nesta classe, você pode trocar uma invocação aprendida por uma nova." }
        ],
        slots: [1,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Astúcia Mágica (Magical Cunning)", tipoAcao: "acao", desc: "**Ritual de 1 Minuto:** Você realiza um rito esotérico. Ao final dele, você recupera um número de Espaços de Magia de Pacto gastos equivalente à metade do seu máximo atual (arredondado para cima).\n*(Uso: 1 vez por Descanso Longo).* ", usosMax: 1, recuperacao: "Descanso Longo" },
          { nome: "Invocações Místicas (Upgrade Nv 2)", tipoAcao: "passiva", desc: "Você aprende mais duas invocações (Total: 3)." }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Patrono Extraplanar", tipoAcao: "passiva", desc: "Escolha a entidade misteriosa com a qual você forjou o seu pacto." }
        ],
        slots: [0,2,0,0,0,0,0,0,0] // A mágica começa: Os slots evoluem pro Nv 2
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade Nv 5)", tipoAcao: "passiva", desc: "Você aprende mais duas invocações (Total: 5)." },
          { nome: "Nota de Combate (Se tiver Lâmina)", tipoAcao: "passiva", desc: "Se você escolheu a invocação *Pacto da Lâmina*, este é o nível em que você DEVE pegar a invocação *Lâmina Sedenta (Thirsting Blade)* para ganhar a habilidade de Ataque Extra." }
        ],
        slots: [0,0,2,0,0,0,0,0,0] // Slots evoluem pro Nv 3
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [{ nome: "Recurso do Patrono", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [0,0,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade Nv 7)", tipoAcao: "passiva", desc: "Você aprende mais uma invocação (Total: 6)." }
        ],
        slots: [0,0,0,2,0,0,0,0,0] // Slots evoluem pro Nv 4
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,0,0,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Contatar Patrono", tipoAcao: "acao", desc: "**Ação (Ritual):** Você conjura *Contato Extraplanar* (Contact Other Plane) sem gastar slot de magia. Você falha no requisito de teste e passa na magia automaticamente para falar com seu Patrono.\n*(Uso: 1 vez por Descanso Longo).* ", usosMax: 1, recuperacao: "Descanso Longo" },
          { nome: "Invocações Místicas (Upgrade Nv 9)", tipoAcao: "passiva", desc: "Você aprende mais uma invocação (Total: 7)." }
        ],
        slots: [0,0,0,0,2,0,0,0,0] // Slots evoluem pro Nv 5 (Teto do Pact Magic)
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [{ nome: "Recurso do Patrono", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [0,0,0,0,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Arcanum Místico (6º Círculo)", tipoAcao: "acao", desc: "O Patrono te ensina um Segredo. Escolha UMA magia de Nv 6 de Bruxo. Você pode conjurar essa magia 1 vez sem gastar espaço de magia. (Recarrega em Descanso Longo).\nSempre que subir de nível de Bruxo, pode trocar essa magia por outra de Nv 6.", usosMax: 1, recuperacao: "Descanso Longo" }
        ],
        slots: [0,0,0,0,3,0,0,0,0] // Sobe para 3 slots totais (Nv 5)
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Invocações Místicas (Upgrade Nv 12)", tipoAcao: "passiva", desc: "Você aprende mais uma invocação (Total: 8)." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Arcanum Místico (7º Círculo)", tipoAcao: "acao", desc: "Escolha UMA magia de Nv 7 de Bruxo. Você pode conjurá-la 1 vez sem gastar espaço de magia. (Recarrega em Descanso Longo).", usosMax: 1, recuperacao: "Descanso Longo" }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [{ nome: "Recurso do Patrono", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." }],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Arcanum Místico (8º Círculo)", tipoAcao: "acao", desc: "Escolha UMA magia de Nv 8 de Bruxo. Você pode conjurá-la 1 vez sem gastar espaço de magia. (Recarrega em Descanso Longo).", usosMax: 1, recuperacao: "Descanso Longo" },
          { nome: "Invocações Místicas (Upgrade Nv 15)", tipoAcao: "passiva", desc: "Você aprende mais uma invocação (Total: 9)." }
        ],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [{ nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." }],
        slots: [0,0,0,0,3,0,0,0,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Arcanum Místico (9º Círculo)", tipoAcao: "acao", desc: "Escolha UMA magia de Nv 9 de Bruxo. Você pode conjurá-la 1 vez sem gastar espaço de magia. (Recarrega em Descanso Longo).", usosMax: 1, recuperacao: "Descanso Longo" }
        ],
        slots: [0,0,0,0,4,0,0,0,0] // Sobe para 4 slots totais (Nv 5)
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Invocações Místicas (Upgrade Nv 18)", tipoAcao: "passiva", desc: "Você aprende mais uma invocação (Total: 10)." }
        ],
        slots: [0,0,0,0,4,0,0,0,0] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [{ nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva do Destino)." }],
        slots: [0,0,0,0,4,0,0,0,0] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Mestre do Oculto (Eldritch Master)", tipoAcao: "passiva", desc: "Sempre que você utilizar a sua habilidade *Astúcia Mágica* (ritual de 1 min), em vez de recuperar apenas metade dos slots gastos, você recupera **TODOS** os seus slots de Magia de Pacto gastos." }
        ],
        slots: [0,0,0,0,4,0,0,0,0] 
      }
    ]
  },

  "Feiticeiro": {
    nome: "Feiticeiro",
    descricao: "Um conjurador que possui magia latente em sua linhagem, alma ou por influência cósmica. Usa Pontos de Feitiçaria e Metamagia para dobrar as regras da magia à sua vontade.",
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
        titulo: "Conjurador Inato (Opção A)",
        itens: ["Lança", "2 Adagas", "Foco Arcano (Cristal)", "Pacote de Masmorra", "28 PO"],
        ouro: 28
      },
      b: {
        titulo: "Riqueza Inicial (Opção B)",
        ouro: 50
      }
    },

    magiasInicial: {
      truquesConhecidos: 4,
      magiasConhecidas: 2, 
      espacosMagia: 2 
    },

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
          // D&D 2024
          { nome: "Feitiçaria Aberrante (Aberrant)", desc: "Poder psíquico, tentáculos e telepatia." },
          { nome: "Feitiçaria Mecânica (Clockwork)", desc: "Magia da ordem, relógios e proteção cósmica." },
          { nome: "Feitiçaria Dracônica (Draconic)", desc: "Escamas, dano elemental, voo e sopro." },
          { nome: "Magia Selvagem (Wild Magic)", desc: "Caos, surtos mágicos e manipulação de sorte." },
          // Legado
          { nome: "Alma Divina (Divine Soul)", desc: "Magia celestial, cura e acesso ao grimório de Clérigo." },
          { nome: "Feitiçaria Lunar (Lunar)", desc: "Fases da lua, luz e escuridão." },
          { nome: "Magia das Sombras (Shadow)", desc: "Trevas, resiliência sombria e cão do infortúnio." },
          { nome: "Feitiçaria da Tempestade (Storm)", desc: "Voo com ventos, trovão e relâmpagos." }
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
          { nome: "Conjuração (Feiticeiro)", tipoAcao: "acao", desc: "Você conjura magias arcanas de forma inata. Carisma é o seu atributo de conjuração. Diferente de magos, você não precisa preparar magias; as que você conhece estão sempre prontas para uso." },
          { nome: "Feitiçaria Inata (Innate Sorcery)", tipoAcao: "bonus", desc: "**Ação Bônus:** Você libera sua magia latente por 1 minuto. Durante esse estado:\n- A CD (Classe de Dificuldade) das suas magias de Feiticeiro aumenta em +1.\n- Você tem Vantagem nas jogadas de ataque de qualquer magia de Feiticeiro.\n*(Uso: 2 vezes por Descanso Longo).* ", usosMax: 2, recuperacao: "Descanso Longo" }
        ],
        slots: [2,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 2, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Fonte de Magia", tipoAcao: "bonus", desc: "Você ganha uma reserva de Pontos de Feitiçaria (Sorcery Points) igual ao seu nível de Feiticeiro (recupera todos no Descanso Longo).\n- **Criar Slot:** Como Ação Bônus, gaste pontos para criar um Slot de magia (Nv 1 custa 2 pts; Nv 2 custa 3 pts; Nv 3 custa 5 pts; Nv 4 custa 6 pts; Nv 5 custa 7 pts).\n- **Converter Slot:** Como Ação Livre, queime um Slot para ganhar pontos iguais ao nível do Slot." },
          { nome: "Metamagia", tipoAcao: "passiva", desc: "Você escolhe 2 opções de Metamagia para alterar como seus feitiços funcionam (ex: Magia Duplicada, Acelerada, Cuidadosa), gastando Pontos de Feitiçaria." }
        ],
        slots: [3,0,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 3, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Origem da Feitiçaria (Subclasse)", tipoAcao: "passiva", desc: "Você escolhe a origem do seu poder latente." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 3 Pontos de Feitiçaria." }
        ],
        slots: [4,2,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 4, 
        proficiencia: 2, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 4 Pontos de Feitiçaria." }
        ],
        slots: [4,3,0,0,0,0,0,0,0] 
      },
      { 
        nivel: 5, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Restauração Mística (Sorcerous Restoration)", tipoAcao: "passiva", desc: "Sempre que você terminar um Descanso Curto, você pode recuperar Pontos de Feitiçaria gastos até um limite igual à metade do seu Nível de Feiticeiro (arredondado para baixo).\n*(Uso: 1 vez por Descanso Longo).* ", usosMax: 1, recuperacao: "Descanso Longo" },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 5 Pontos de Feitiçaria." }
        ],
        slots: [4,3,2,0,0,0,0,0,0] 
      },
      { 
        nivel: 6, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Recurso da Origem", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 6 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,0,0,0,0,0,0] 
      },
      { 
        nivel: 7, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Feitiçaria Encarnada (Sorcery Incarnate)", tipoAcao: "livre", desc: "**Ativação Alternativa:** Se não tiver mais usos de *Feitiçaria Inata*, você pode ativá-la gastando 2 Pontos de Feitiçaria.\n**Dupla Metamagia:** Enquanto sua *Feitiçaria Inata* estiver ativa, você pode aplicar até DUAS opções de Metamagia em uma única magia conjurada (pagando o custo de ambas)." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 7 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,1,0,0,0,0,0] 
      },
      { 
        nivel: 8, 
        proficiencia: 3, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 8 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,2,0,0,0,0,0] 
      },
      { 
        nivel: 9, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 9 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,1,0,0,0,0] 
      },
      { 
        nivel: 10, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Metamagia (Upgrade Nv 10)", tipoAcao: "passiva", desc: "Você escolhe mais 2 opções de Metamagia." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 10 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,2,0,0,0,0] 
      },
      { 
        nivel: 11, 
        proficiencia: 4, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 11 Pontos de Feitiçaria." }],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 12, 
        proficiencia: 4, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 12 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,2,1,0,0,0] 
      },
      { 
        nivel: 13, 
        proficiencia: 5, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 13 Pontos de Feitiçaria." }],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 14, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Recurso da Origem", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 14 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,2,1,1,0,0] 
      },
      { 
        nivel: 15, 
        proficiencia: 5, 
        habilidades: [{ nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 15 Pontos de Feitiçaria." }],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 16, 
        proficiencia: 5, 
        habilidades: [
          { nome: "Melhoria de Atributo ou Talento", tipoAcao: "", desc: "Aumente atributos ou escolha um Talento." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 16 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,2,1,1,1,0] 
      },
      { 
        nivel: 17, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Metamagia (Upgrade Nv 17)", tipoAcao: "passiva", desc: "Você escolhe mais 2 opções de Metamagia." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 17 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,2,1,1,1,1] 
      },
      { 
        nivel: 18, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Recurso da Origem", tipoAcao: "passiva", desc: "Habilidade concedida pela sua subclasse." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 18 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,3,1,1,1,1] 
      },
      { 
        nivel: 19, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Dádiva Épica", tipoAcao: "", desc: "Escolha um talento de Dádiva Épica (Recomendado: Dádiva da Viagem Dimensional)." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 19 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,3,2,1,1,1] 
      },
      { 
        nivel: 20, 
        proficiencia: 6, 
        habilidades: [
          { nome: "Apoteose Arcana", tipoAcao: "passiva", desc: "Sempre que a sua *Feitiçaria Inata* estiver ativa, 1 vez em CADA um dos seus turnos, você pode usar UMA Metamagia sem gastar nenhum Ponto de Feitiçaria." },
          { nome: "Pontos de Feitiçaria (Upgrade)", tipoAcao: "passiva", desc: "Seu total máximo agora é 20 Pontos de Feitiçaria." }
        ],
        slots: [4,3,3,3,3,2,2,1,1] 
      }
    ]
  },

  // ... Você pode adicionar as outras aqui depois
};