// src/data/subclasses.js

export const SUBCLASSES = {
  // --- GUERREIRO ---
  "Mestre de Batalha (Battle Master)": {
    features: {
      3: [
        { 
          nome: "Superioridade em Combate", 
          desc: "Você ganha 4 dados de superioridade (d8). Aprende 3 manobras.",
          usos: 4, recuperacao: "Descanso Curto"
        },
        { nome: "Estudante da Guerra", desc: "Ganhou proficiência em uma ferramenta de artesão." }
      ],
      7: [
        { nome: "Conheça seu Inimigo", desc: "Ação Bônus: Descubra se o inimigo é superior a você em Força, Des, Con, CA, PV ou Nível." },
        { nome: "Superioridade (Upgrade)", desc: "Você ganha +1 dado de superioridade (Total: 5). Aprende +2 manobras.", usos: 5, recuperacao: "Descanso Curto" }
      ],
      10: [
        { nome: "Superioridade Aprimorada (d10)", desc: "Seus dados de superioridade viram d10." },
        { nome: "Superioridade (Manobras)", desc: "Aprende +2 manobras." }
      ],
      15: [
        { nome: "Implacável", desc: "Se rolar iniciativa sem dados, recupera 1." },
        { nome: "Superioridade (Upgrade)", desc: "Você ganha +1 dado de superioridade (Total: 6). Aprende +2 manobras.", usos: 6, recuperacao: "Descanso Curto" }
      ],
      18: [
        { nome: "Superioridade Suprema (d12)", desc: "Seus dados de superioridade viram d12." }
      ]
    }
  },

  "Campeão (Champion)": {
    features: {
      3: [
        { nome: "Crítico Aprimorado", desc: "Seus ataques com arma fazem crítico no 19 ou 20." },
        { nome: "Atleta Notável", desc: "Vantagem em Iniciativa e Atletismo. Ao critar, move metade do deslocamento." }
      ],
      7: [
        { nome: "Estilo de Luta Adicional", desc: "Escolha um segundo Estilo de Luta." }
      ],
      10: [
        { nome: "Guerreiro Heroico", desc: "No combate, se começar o turno sem Inspiração Heroica, você ganha uma." }
      ],
      15: [
        { nome: "Crítico Superior", desc: "Seus ataques com arma fazem crítico no 18, 19 ou 20." }
      ],
      18: [
        { nome: "Sobrevivente", desc: "No começo do turno, se tiver menos da metade da vida, recupera 5 + CON." }
      ]
    }
  },

  // --- LADINO (ROGUE) ---
  
  "Ladrão (Thief)": {
    features: {
      3: [
        { nome: "Mãos Rápidas", desc: "Ação Bônus para: Prestidigitação, Usar Objeto ou Desarmar Armadilha/Abrir Fechadura." },
        { nome: "Trabalho de Segundo Andar", desc: "Escalada tem velocidade normal. Pulo usa Destreza em vez de Força." }
      ],
      9: [
        { nome: "Furtividade Suprema", desc: "Vantagem em Furtividade se mover até metade do deslocamento." }
      ],
      13: [
        { nome: "Usar Dispositivo Mágico", desc: "Pode sintonizar 4 itens mágicos. Ignora requisitos de classe/raça em itens. Chance de não gastar cargas de itens (rolar 6 no d6)." }
      ],
      17: [
        { nome: "Reflexos de Ladrão", desc: "No primeiro round, você age duas vezes (na sua iniciativa e na iniciativa -10)." }
      ]
    }
  },

  "Assassino (Assassin)": {
    features: {
      3: [
        { nome: "Assassinato", desc: "Vantagem na Iniciativa. Vantagem em ataques contra quem não agiu. Crítico Automático contra surpresos." },
        { nome: "Ferramentas de Assassino", desc: "Proficiência com Kit de Disfarce e Venenos." }
      ],
      9: [
        { nome: "Especialista em Infiltração", desc: "Pode mimetizar perfeitamente a fala e escrita de outra pessoa. Steady Aim não zera seu movimento." }
      ],
      13: [
        { nome: "Envenenar Armas", desc: "Se usar Cunning Strike (Poison), causa +2d6 de veneno (ignora resistência) na falha." }
      ],
      17: [
        { nome: "Ataque Mortal", desc: "No primeiro round, se acertar Sneak Attack, alvo faz save de CON (CD 8+Des+Prof) ou toma dobro do dano total." }
      ]
    }
  },

  "Trapaceiro Arcano (Arcane Trickster)": {
    magiasBonus: {
      truques: ["Mãos Mágicas"]
    },
    features: {
      3: [
        { nome: "Conjuração (Inteligência)", desc: "Você conjura magias de Mago (Ilusão/Encantamento). (Adicione magias no Grimório)." },
        { nome: "Mãos Mágicas Ladinas", desc: "Mage Hand pode ser invisível, usada como Ação Bônus e fazer prestidigitação à distância." }
      ],
      9: [
        { nome: "Emboscada Mágica", desc: "Se você estiver escondido ao conjurar em uma criatura, ela tem Desvantagem no save." }
      ],
      13: [
        { nome: "Trapaceiro Versátil", desc: "Mage Hand pode distrair alvos, permitindo usar Cunning Strike (Trip) à distância." }
      ],
      17: [
        { nome: "Ladrão de Magia", desc: "Reação: Se alguém conjurar em você, force save de INT. Se falhar, a magia falha e você rouba o conhecimento dela por 8h." }
      ]
    }
  },

  "Lâmina da Alma (Soulknife)": {
    features: {
      3: [
        { nome: "Poder Psiônico", desc: "Você tem Dados Psiônicos (d6). Recupera 1 em Short Rest, todos em Long Rest.", usos: 4, recuperacao: "Descanso Longo" },
        { nome: "Lâminas Psíquicas", desc: "Cria adagas mentais (1d6+Des). Pode atacar com a segunda mão como bônus (1d4). Dano Psíquico." },
        { nome: "Sussurros Psíquicos", desc: "Telepatia com grupo (1 milha) por horas = resultado do dado." }
      ],
      9: [
        { nome: "Lâminas da Alma", desc: "Ataque Homing: Se errar, gaste dado para somar no ataque. Teleporte: Jogue a lâmina e teleporte para onde ela cair." }
      ],
      13: [
        { nome: "Véu Psíquico", desc: "Fica Invisível por 1h. Termina se atacar. Gasta 1 dado psíquico após o primeiro uso gratuito." }
      ],
      17: [
        { nome: "Rasgar Mente", desc: "Sneak Attack força save de SAB ou atordoa (Stun) o alvo por 1 minuto." }
      ]
    }
  },

  "Herdeiro dos Três (Scion of the Three)": {
    features: {
      3: [
        { nome: "Sede de Sangue", desc: "Reação: Se inimigo a 30ft for ferido, teleporte para 5ft e ataque.", usos: 3, recuperacao: "Descanso Longo" },
        { nome: "Aliança do Medo", desc: "Escolha Bane, Bhaal ou Myrkul. Ganha resistência e um truque." }
      ],
      9: [
        { nome: "Golpe do Medo", desc: "Cunning Strike (Terrify): Custa 1d6. Alvo fica Amedrontado." }
      ],
      13: [
        { nome: "Aura de Malevolência", desc: "Ao teleportar com Sede de Sangue, causa dano em área ao redor." }
      ],
      17: [
        { nome: "Encarnação do Pavor", desc: "Trata 1 e 2 no dado de Sneak Attack como 3. Recupera Sede de Sangue em Short Rest." }
      ]
    }
  },

  "Investigativo (Inquisitive)": {
    features: {
      3: [
        { nome: "Ouvido para Mentiras", desc: "Mínimo 8 no dado em Intuição para detectar mentiras." },
        { nome: "Combate Intuitivo", desc: "Ação Bônus: Teste de Intuição vs Enganação. Se passar, ganha Sneak Attack por 1 min mesmo sem vantagem." }
      ],
      9: [
        { nome: "Olho Atento", desc: "Vantagem em Percepção/Investigação se mover metade do deslocamento." }
      ],
      13: [
        { nome: "Olho Infalível", desc: "Ação: Detecta ilusões e metamorfos a 30ft." }
      ],
      17: [
        { nome: "Olho para Fraqueza", desc: "Aumenta o dano de Sneak Attack em +3d6 contra alvo do Combate Intuitivo." }
      ]
    }
  },

  "Mentor (Mastermind)": {
    features: {
      3: [
        { nome: "Mestre da Intriga", desc: "Proficiência com Disfarce, Falsificação e Jogos. Imita falas perfeitamente." },
        { nome: "Mestre Tático", desc: "Pode usar Ação de Ajuda como Bônus e à distância (30ft)." }
      ],
      9: [
        { nome: "Manipulador", desc: "Se observar alvo por 1 min, descobre se stats dele são superiores aos seus." }
      ],
      13: [
        { nome: "Desorientação", desc: "Reação: Se tiver cobertura de uma criatura, redireciona o ataque para ela." }
      ],
      17: [
        { nome: "Alma do Engano", desc: "Imune a telepatia e detecção de mentiras." }
      ]
    }
  },

  "Fantasma (Phantom)": {
    features: {
      3: [
        { nome: "Sussurros dos Mortos", desc: "Ganha 1 perícia/ferramenta flutuante a cada descanso." },
        { nome: "Lamentos do Túmulo", desc: "Ao causar Sneak Attack, causa metade dos dados em necrótico num segundo alvo.", usos: 2, recuperacao: "Descanso Longo" }
      ],
      9: [
        { nome: "Tokens dos Partidos", desc: "Reação: Quando criatura morre, cria um token. Dá vantagem em saves de Con/Morte. Pode quebrar para perguntar algo a espírito." }
      ],
      13: [
        { nome: "Caminhar Fantasma", desc: "Ação Bônus: Vira espectro por 10 min (Voa, atravessa paredes).", usos: 1, recuperacao: "Descanso Longo" }
      ],
      17: [
        { nome: "Amigo da Morte", desc: "Lamentos do Túmulo afeta o alvo principal e o secundário." }
      ]
    }
  },

  "Batedor (Scout)": {
    features: {
      3: [
        { nome: "Escaramuçador", desc: "Reação: Se inimigo terminar turno a 5ft, mova metade do deslocamento sem ataque de oportunidade." },
        { nome: "Sobrevivencialista", desc: "Ganha Natureza e Sobrevivência (com Expertise!)." }
      ],
      9: [
        { nome: "Mobilidade Superior", desc: "+10ft de deslocamento. Ganha escalada e natação." }
      ],
      13: [
        { nome: "Mestre de Emboscada", desc: "Vantagem em Iniciativa. Primeiro ataque no primeiro round tem vantagem (garante Sneak Attack)." }
      ],
      17: [
        { nome: "Ataque Repentino", desc: "Se usar Ataque na ação, pode fazer outro como Bônus (pode aplicar Sneak Attack de novo em outro alvo)." }
      ]
    }
  },

  "Espadachim (Swashbuckler)": {
    features: {
      3: [
        { nome: "Jogo de Pés", desc: "Se atacar criatura, ela não pode fazer ataque de oportunidade contra você." },
        { nome: "Audácia", desc: "Soma Carisma na Iniciativa. Pode usar Sneak Attack em x1 (sem ninguém a 5ft)." }
      ],
      9: [
        { nome: "Charme (Panache)", desc: "Ação: Teste de Persuasão vs Intuição. Hostil = Desvantagem em outros e foca em você. Neutro = Enfeitiçado." }
      ],
      13: [
        { nome: "Manobra Elegante", desc: "Ação Bônus: Vantagem em Acrobacia ou Atletismo." }
      ],
      17: [
        { nome: "Duelista Mestre", desc: "Se errar ataque, pode rerolar com Vantagem (1x por curto descanso).", usos: 1, recuperacao: "Descanso Curto" }
      ]
    }
  },

  // --- MAGO (WIZARD) ---

  "Abjurador (Abjurer)": {
    features: {
      3: [
        { nome: "Sábio da Abjuração", desc: "Copiar magias de abjuração custa metade do tempo e ouro." },
        { nome: "Proteção Arcana (Arcane Ward)", desc: "Ao conjurar Abjuração, cria escudo com PV = (Nível x 2) + INT. Absorve dano antes de você.", usos: 1, recuperacao: "Descanso Longo" }
      ],
      6: [{ nome: "Proteção Projetada", desc: "Pode usar sua Reação para que a Proteção Arcana absorva dano de um aliado a 30ft." }],
      10: [{ nome: "Quebrador de Magias", desc: "Ao usar Dispel Magic ou Counterspell, adiciona Proficiência no teste. Se passar, o slot não é gasto (se usou slot)." }],
      14: [{ nome: "Resistência a Magia", desc: "Vantagem em saves contra magia e resistência a dano de magias." }]
    }
  },

  "Adivinho (Diviner)": {
    features: {
      3: [
        { nome: "Sábio da Adivinhação", desc: "Custo de cópia pela metade." },
        { nome: "Augúrio (Portent)", desc: "Role 2d20 após Long Rest. Pode substituir qualquer d20 (seu ou inimigo) por esses valores.", usos: 2, recuperacao: "Descanso Longo" }
      ],
      6: [{ nome: "Adivinhação Especialista", desc: "Ao conjurar Adivinhação (nv 2+), recupera um slot de nível inferior." }],
      10: [{ nome: "O Terceiro Olho", desc: "Ação Bônus: Ganha Darkvision, Ver Invisibilidade, Ler Idiomas ou Visão Etérea até descanso." }],
      14: [{ nome: "Augúrio Maior", desc: "Você rola 3d20 para o Portent em vez de 2." }]
    }
  },

  "Evocador (Evoker)": {
    features: {
      3: [
        { nome: "Sábio da Evocação", desc: "Custo de cópia pela metade." },
        { nome: "Truque Potente", desc: "Se inimigo passar no save do seu truque, ainda toma metade do dano." }
      ],
      6: [{ nome: "Esculpir Magias", desc: "Ao conjurar Evocação em área, escolha 1+Nível criaturas para não serem afetadas." }],
      10: [{ nome: "Evocação Empoderada", desc: "Adicione INT no dano de magias de Evocação." }],
      14: [{ nome: "Sobrecarga (Overchannel)", desc: "Pode causar dano máximo numa magia (nv 1-5). Primeira vez é grátis, depois custa dano necrótico." }]
    }
  },

  "Ilusionista (Illusionist)": {
    magiasBonus: {
      truques: ["Ilusão Menor"]
    },
    features: {
      3: [
        { nome: "Sábio da Ilusão", desc: "Custo de cópia pela metade." },
        { nome: "Ilusões Aprimoradas", desc: "Ilusões não precisam de componente verbal. Alcance aumenta. Minor Illusion com som e imagem." }
      ],
      6: [{ nome: "Criaturas Fantasmagóricas", desc: "Pode conjurar Summon Beast/Fey como ilusão (sem slot, mas com metade da vida)." }],
      10: [{ nome: "Eu Ilusório", desc: "Reação: Se for atingido, um clone leva o golpe (ataque erra).", usos: 1, recuperacao: "Descanso Curto" }],
      14: [{ nome: "Realidade Ilusória", desc: "Ação Bônus: Torna um objeto da sua ilusão real por 1 minuto." }]
    }
  },

  "Lâmina Cantante (Bladesinger)": {
    features: {
      3: [
        { nome: "Treinamento de Guerra e Canção", desc: "Proficiência em Armas de uma mão e Performance. Usa Arma como foco." },
        { nome: "Canção da Lâmina (Bladesong)", desc: "Bônus: Ganha CA (+Int), Deslocamento (+10), Vantagem em Acrobacia e bônus em Concentração (+Int).", usos: 3, recuperacao: "Descanso Longo" }
      ],
      6: [{ nome: "Ataque Extra", desc: "Pode atacar duas vezes. Pode substituir um ataque por um Truque." }],
      10: [{ nome: "Canção de Defesa", desc: "Reação: Gaste slot de magia para reduzir dano (5 x Nível do Slot)." }],
      14: [{ nome: "Canção da Vitória", desc: "Adicione INT ao dano dos ataques corpo a corpo." }]
    }
  },

  "Cronurgista (Chronurgy)": {
    features: {
      2: [ 
        { nome: "Deslocamento Cronal", desc: "Reação: Force rerolagem de um ataque, teste ou save (2x por dia).", usos: 2, recuperacao: "Descanso Longo" },
        { nome: "Consciência Temporal", desc: "Adicione INT à Iniciativa." }
      ],
      6: [{ nome: "Estase Momentânea", desc: "Ação: Incapacita criatura (CON save) até fim do turno dela.", usos: 3, recuperacao: "Descanso Longo" }],
      10: [{ nome: "Abeyance Arcano", desc: "Pode guardar uma magia em uma conta para ser usada depois por qualquer um." }],
      14: [{ nome: "Futuro Convergente", desc: "Reação: Escolha o resultado de um dado (sucesso ou falha). Ganha 1 Exaustão." }]
    }
  },

  "Graviturgista (Graviturgy)": {
    features: {
      2: [ 
        { nome: "Ajustar Densidade", desc: "Ação: Dobre ou reduza peso do alvo. Afeta velocidade e testes de Força." }
      ],
      6: [{ nome: "Poço Gravitacional", desc: "Ao conjurar em criatura, mova-a 5ft." }],
      10: [{ nome: "Atração Violenta", desc: "Reação: Aumente dano de ataque ou queda em 1d10/2d10." }],
      14: [{ nome: "Horizonte de Eventos", desc: "Ação: Aura de gravidade. Inimigos fazem save de Força ou tomam dano e Speed 0." }]
    }
  },

  "Necromante (Necromancy)": {
    magiasBonus: {
      nivel3: ["Animar os Mortos"]
    },
    features: {
      3: [
        { nome: "Sábio da Necromancia", desc: "Custo de cópia pela metade." },
        { nome: "Colheita Sombria", desc: "Ao matar inimigo com magia, recupera PV (2x Nível da Magia)." }
      ],
      6: [{ nome: "Servos Mortos-Vivos", desc: "Ganha Animate Dead. Zumbis têm +PV e +Dano." }],
      10: [{ nome: "Habituado à Morte", desc: "Resistência a Necrótico. PV Máximo não pode ser reduzido." }],
      14: [{ nome: "Comandar Mortos-Vivos", desc: "Ação: Tente controlar um morto-vivo inimigo (CHA save)." }]
    }
  },

  "Transmutador (Transmutation)": {
    features: {
      3: [
        { nome: "Sábio da Transmutação", desc: "Custo de cópia pela metade." },
        { nome: "Alquimia Menor", desc: "Muda madeira, pedra, ferro, cobre ou prata em outro desses materiais (temporário)." }
      ],
      6: [{ nome: "Pedra do Transmutador", desc: "Cria pedra que dá buff passivo (Darkvision, Velocidade, Con Save, ou Resistência Elemental)." }],
      10: [{ nome: "Metamorfo", desc: "Conjura Polymorph em si mesmo (sem gastar slot) para virar besta CR 1." }],
      14: [{ nome: "Transmutador Mestre", desc: "Consome a pedra para: Cura Total, Ressurreição (Raise Dead), Rejuvenescer ou Transmutar objeto maior." }]
    }
  },

  "Mago de Guerra (War Magic)": {
    features: {
      3: [
        { nome: "Deflexão Arcana", desc: "Reação: +2 CA ou +4 Save. Não pode conjurar magia (exceto truque) no próximo turno." },
        { nome: "Engenhosidade Tática", desc: "Adicione INT à Iniciativa." }
      ],
      6: [{ nome: "Surto de Poder", desc: "Ao usar Dispel/Counterspell, ganha carga. Gaste para causar dano extra de Força.", usos: 1, recuperacao: "N/A" }],
      10: [{ nome: "Magia Durável", desc: "+2 CA e Saves enquanto concentrando." }],
      14: [{ nome: "Manto Defletor", desc: "Ao usar Deflexão, causa dano em inimigos próximos." }]
    }
  },

  "Ordem dos Escribas (Scribes)": {
    features: {
      3: [
        { nome: "Pena Mágica", desc: "Copia magias super rápido (2 min/nível). Pode apagar o que escreveu." },
        { nome: "Grimório Desperto", desc: "Pode mudar tipo de dano da magia. Pode conjurar rituais no tempo normal." }
      ],
      6: [{ nome: "Mente Manifestada", desc: "Cria um espírito do livro. Pode conjurar magias a partir do espaço dele." }],
      10: [{ nome: "Mestre Escriba", desc: "Cria pergaminhos mágicos de graça (1x dia) que são mais fortes." }],
      14: [{ nome: "Um com a Palavra", desc: "Se tomar dano, o livro absorve deletando magias temporariamente." }]
    }
  },

  "Encantador (Enchantment)": {
    features: {
      3: [
        { nome: "Sábio do Encantamento", desc: "Custo de cópia pela metade." },
        { nome: "Olhar Hipnótico", desc: "Ação: Criatura a 5ft fica enfeitiçada/incapacitada enquanto você manter contato visual." }
      ],
      6: [{ nome: "Charme Instintivo", desc: "Reação: Se atacado, desvia o ataque para outra criatura próxima." }],
      10: [{ nome: "Encantamento Duplo", desc: "Magias de encantamento de alvo único afetam dois alvos." }],
      14: [{ nome: "Alterar Memórias", desc: "Faz a criatura esquecer que foi enfeitiçada." }]
    }
  },

  // --- CLÉRIGO (CLERIC) ---

  "Domínio do Conhecimento (Knowledge)": {
    magiasBonus: {
      nivel1: ["Comando", "Identificar"]
    },
    features: {
      3: [
        { nome: "Bênçãos do Conhecimento", desc: "Expertise em 2 perícias (Arcanismo, História, Natureza ou Religião) e proficiência em Ferramentas." },
        { nome: "Magias de Domínio", desc: "Command, Identify, etc." },
        { nome: "CD: Magia Mental", desc: "Gaste Canalizar Divindade para conjurar uma magia de adivinhação do seu domínio sem gastar slot." }
      ],
      6: [{ nome: "Mente Livre", desc: "Telepatia 60ft. Proficiência em Saves de INT." }],
      17: [{ nome: "Previsão Divina", desc: "Bônus: Vantagem em todos os testes d20 por 1 hora. (1x/descanso)." }]
    }
  },
  "Domínio da Vida (Life)": {
    magiasBonus: {
      nivel1: ["Abençoar", "Curar Ferimentos"],
      nivel3: ["Revivificar"]
    },
    features: {
      3: [
        { nome: "Discípulo da Vida", desc: "Curas curam adicional: 2 + Nível da Magia." },
        { nome: "Magias de Domínio", desc: "Bless, Cure Wounds, Revivify, etc." },
        { nome: "CD: Preservar a Vida", desc: "Cura 5x Nível de Clérigo em criaturas a 30ft (até metade da vida delas)." }
      ],
      6: [{ nome: "Curandeiro Abençoado", desc: "Ao curar outro com magia, você se cura em 2 + Nível da Magia." }],
      17: [{ nome: "Cura Suprema", desc: "Curar usa o valor máximo dos dados." }]
    }
  },
  "Domínio da Luz (Light)": {
    magiasBonus: {
      nivel1: ["Mãos Flamejantes", "Fogo das Fadas"],
      nivel3: ["Bola de Fogo"]
    },
    features: {
      3: [
        { nome: "Magias de Domínio", desc: "Burning Hands, Fireball, etc." },
        { nome: "CD: Resplendor do Amanhecer", desc: "Explosão de luz 30ft. Inimigos: Save CON ou 2d10+Nível Radiante." },
        { nome: "Clarão Protetor", desc: "Reação: Impõe desvantagem em ataque contra você (30ft).", usos: 3, recuperacao: "Descanso Longo" }
      ],
      6: [{ nome: "Clarão Aprimorado", desc: "Pode usar Clarão Protetor para proteger aliados. Dá PV temporário também." }],
      17: [{ nome: "Coroa de Luz", desc: "Ação: Aura de 60ft. Inimigos têm desvantagem contra suas magias de Fogo/Radiante." }]
    }
  },
  "Domínio da Trapaça (Trickery)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa", "Disfarce"],
      nivel2: ["Invisibilidade"],
      nivel4: ["Metamorfose"]
    },
    features: {
      3: [
        { nome: "Bênção do Trapaceiro", desc: "Ação: Dá vantagem em Furtividade para alguém." },
        { nome: "Magias de Domínio", desc: "Charm Person, Invisibility, Polymorph, etc." },
        { nome: "CD: Invocar Duplicidade", desc: "Cria ilusão perfeita. Pode conjurar a partir dela e ganha vantagem se ambos estiverem perto do inimigo." }
      ],
      6: [{ nome: "Transposição", desc: "Pode trocar de lugar com sua duplicata (Teleporte)." }],
      17: [{ nome: "Duplicidade Aprimorada", desc: "Duplicata cura aliados quando desaparece e dá vantagem para aliados também." }]
    }
  },
  "Domínio da Guerra (War)": {
    magiasBonus: {
      nivel1: ["Escudo da Fé", "Favor Divino"],
      nivel2: ["Arma Espiritual"]
    },
    features: {
      3: [
        { nome: "Sacerdote de Guerra", desc: "Ação Bônus: Pode fazer um ataque armado extra.", usos: 3, recuperacao: "Descanso Longo" },
        { nome: "Magias de Domínio", desc: "Shield of Faith, Spiritual Weapon, etc." },
        { nome: "CD: Golpe Guiado", desc: "Reação: +10 no ataque (seu ou de aliado)." }
      ],
      6: [{ nome: "Bênção do Deus da Guerra", desc: "Pode usar Canalizar Divindade para conjurar magias de domínio sem concentração." }],
      17: [{ nome: "Avatar de Batalha", desc: "Resistência a Concussão, Cortante e Perfurante." }]
    }
  },
  "Domínio Arcano (Arcana)": {
    magiasBonus: {
      nivel1: ["Mísseis Mágicos", "Arma Mágica"]
    },
    features: {
      3: [ 
        { nome: "Iniciado Arcano", desc: "Ganha proficiência em Arcanismo e 2 truques de Mago." },
        { nome: "CD: Abjuração Arcana", desc: "Expulsa Celestial, Elemental, Fada ou Infernal (como Turn Undead)." },
        { nome: "Magias de Domínio", desc: "Magic Missile, Magic Weapon, etc." }
      ],
      6: [{ nome: "Quebrador de Magias", desc: "Ao curar aliado, remove uma magia afetando ele." }],
      17: [{ nome: "Maestria Arcana", desc: "Adiciona 4 magias de Mago (nv 6, 7, 8, 9) ao seu domínio." }]
    }
  },
  "Domínio da Morte (Death)": {
    magiasBonus: {
      truques: ["Toque Arrepiante"],
      nivel1: ["Falsa Vida", "Raio de Doença"]
    },
    features: {
      3: [
        { nome: "Ceifador", desc: "Ganha truque de necromancia. Truques necróticos afetam 2 alvos se estiverem perto." },
        { nome: "CD: Toque da Morte", desc: "Ao acertar melee, causa + (5 + 2x Nível) dano necrótico." },
        { nome: "Proficiência Bônus", desc: "Armas Marciais." }
      ],
      6: [{ nome: "Destruição Inescapável", desc: "Seu dano necrótico ignora resistência." }],
      17: [{ nome: "Ceifador Aprimorado", desc: "Magias de necromancia (nv 1-5) afetam 2 alvos se estiverem perto." }]
    }
  },
  "Domínio da Forja (Forge)": {
    magiasBonus: {
      nivel1: ["Destruição Estonteante", "Escudo Arcano"]
    },
    features: {
      3: [
        { nome: "Bênção da Forja", desc: "Fim do Long Rest: Transforma arma ou armadura em +1 mágico até próximo descanso." },
        { nome: "CD: Bênção do Artesão", desc: "Ritual 1h: Cria item não-mágico de metal (valor até 100po)." },
        { nome: "Proficiência Bônus", desc: "Armadura Pesada e Ferramentas de Ferreiro." }
      ],
      6: [{ nome: "Alma da Forja", desc: "Resistência a Fogo. +1 CA se usar armadura pesada." }],
      17: [{ nome: "Santo da Forja", desc: "Imunidade a Fogo. Resistência a dano físico não-mágico (se usar armadura pesada)." }]
    }
  },
  "Domínio da Sepultura (Grave)": {
    magiasBonus: {
      truques: ["Estabilizar"],
      nivel1: ["Perdição", "Falsa Vida"]
    },
    features: {
      3: [
        { nome: "Círculo da Mortalidade", desc: "Cura maximizada em criaturas com 0 PV. Ganha Spare the Dying (Bônus, 30ft)." },
        { nome: "Olhos da Sepultura", desc: "Detecta mortos-vivos a 60ft." },
        { nome: "CD: Caminho para a Sepultura", desc: "Ação: Amaldiçoa criatura. Próximo ataque contra ela causa dobro do dano (Vulnerabilidade)." }
      ],
      6: [{ nome: "Sentinela na Porta da Morte", desc: "Reação: Cancela um Acerto Crítico contra você ou aliado a 30ft." }],
      17: [{ nome: "Guardião de Almas", desc: "Quando inimigo morre, você ou aliado recupera vida (igual dados de vida do inimigo)." }]
    }
  },
  "Domínio da Natureza (Nature)": {
    magiasBonus: {
      nivel1: ["Falar com Animais", "Enfeitiçar Animais e Plantas"]
    },
    features: {
      3: [
        { nome: "Acólito da Natureza", desc: "Ganha truque de druida e proficiência (Natureza, Sobrevivência ou Animais)." },
        { nome: "CD: Enfeitiçar Animais/Plantas", desc: "Encanta bestas e plantas a 30ft." },
        { nome: "Proficiência Bônus", desc: "Armadura Pesada." }
      ],
      6: [{ nome: "Amortecer Elementos", desc: "Reação: Dá resistência a Ácido, Frio, Fogo, Raio ou Trovão para criatura atingida." }],
      17: [{ nome: "Mestre da Natureza", desc: "Pode comandar as criaturas encantadas pelo seu Canalizar Divindade." }]
    }
  },
  "Domínio da Ordem (Order)": {
    magiasBonus: {
      nivel1: ["Comando", "Heroísmo"]
    },
    features: {
      3: [
        { nome: "Voz de Autoridade", desc: "Se você conjurar magia em aliado (com slot), ele pode fazer um ataque com reação." },
        { nome: "CD: Demanda da Ordem", desc: "Inimigos a 30ft fazem save ou ficam Enfeitiçados e derrubam armas." },
        { nome: "Proficiência Bônus", desc: "Armadura Pesada e Intimidação/Persuasão." }
      ],
      6: [{ nome: "Encarnação da Lei", desc: "Pode conjurar magias de Encantamento como Ação Bônus (usos = SAB)." }],
      17: [{ nome: "Ira da Ordem", desc: "Seu Golpe Divino marca o inimigo. Próximo ataque de aliado causa +2d8 psíquico." }]
    }
  },
  "Domínio da Paz (Peace)": {
    magiasBonus: {
      nivel1: ["Heroísmo", "Santuário"]
    },
    features: {
      3: [
        { nome: "Vínculo Encorajador", desc: "Víncula aliados (Proficiência pessoas). Podem somar +1d4 em ataque/teste/save 1x por turno." },
        { nome: "CD: Bálsamo da Paz", desc: "Move-se sem ataque de oportunidade. Cura 2d6+SAB em quem passar perto." }
      ],
      6: [{ nome: "Vínculo Protetor", desc: "Aliado vinculado pode usar Reação para teleportar e tomar dano no lugar de outro." }],
      17: [{ nome: "Vínculo Expansivo", desc: "Alcance aumenta para 60ft. Ao tomar dano pelo vínculo, ganha Resistência." }]
    }
  },
  "Domínio da Tempestade (Tempest)": {
    magiasBonus: {
      nivel1: ["Névoa", "Onda Trovejante"]
    },
    features: {
      3: [
        { nome: "Ira da Tempestade", desc: "Reação ao ser atingido: 2d8 Raio/Trovão no atacante (Save DES metade)." },
        { nome: "CD: Ira Destrutiva", desc: "Maximiza dano de Raio ou Trovão." },
        { nome: "Proficiência Bônus", desc: "Armadura Pesada e Marcial." }
      ],
      6: [{ nome: "Golpe Trovejante", desc: "Dano de Raio empurra inimigo 10ft." }],
      17: [{ nome: "Nascido da Tormenta", desc: "Pode voar (apenas fora de locais fechados)." }]
    }
  },
  "Domínio do Crepúsculo (Twilight)": {
    magiasBonus: {
      nivel1: ["Fogo das Fadas", "Sono"]
    },
    features: {
      3: [
        { nome: "Olhos da Noite", desc: "Visão no Escuro 300ft (compartilhável)." },
        { nome: "Bênção Vigilante", desc: "Dá vantagem na iniciativa para uma criatura." },
        { nome: "CD: Santuário do Crepúsculo", desc: "Aura 30ft. Fim do turno na aura: Ganha 1d6+Nível PV Temp ou encerra charme/medo." },
        { nome: "Proficiência Bônus", desc: "Armadura Pesada e Marcial." }
      ],
      6: [{ nome: "Passos da Noite", desc: "Bônus: Ganha voo em luz baixa/escuridão." }],
      17: [{ nome: "Manto do Crepúsculo", desc: "Santuário do Crepúsculo dá meia cobertura para aliados." }]
    }
  },
  // --- BÁRBARO (BARBARIAN) ---
  
  "Caminho do Berserker": {
    features: {
      3: [{ nome: "Frenesi", desc: "Ao usar Reckless Attack em Fúria, causa +Xd6 de dano no primeiro acerto (X = Bônus de Fúria)." }],
      6: [{ nome: "Fúria Sem Mente", desc: "Imune a Charme e Medo enquanto em Fúria." }],
      10: [{ nome: "Retaliação", desc: "Reação: Se tomar dano de criatura a 5ft, pode fazer um ataque corpo a corpo contra ela." }],
      14: [{ nome: "Presença Intimidante", desc: "Ação Bônus: Aura de 30ft. Inimigos fazem Save SAB ou ficam Amedrontados por 1 min." }]
    }
  },
  "Caminho do Coração Selvagem (Wild Heart)": {
    features: {
      3: [
        { nome: "Fúria dos Ermos", desc: "Ao entrar em Fúria, escolha: Urso (Resistência a tudo exceto Força/Psi/Nec/Rad), Águia (Disengage/Dash Bônus) ou Lobo (Vantagem para aliados)." },
        { nome: "Fala Animal", desc: "Pode conjurar Speak with Animals e Beast Sense como ritual." }
      ],
      6: [{ nome: "Aspecto dos Ermos", desc: "Escolha: Coruja (Darkvision 60ft), Pantera (Escalada) ou Salmão (Natação)." }],
      10: [{ nome: "Fala da Natureza", desc: "Pode conjurar Commune with Nature como ritual." }],
      14: [{ nome: "Poder dos Ermos", desc: "Em Fúria, escolha: Falcão (Voo), Leão (Desvantagem para inimigos atacarem outros) ou Carneiro (Derruba inimigos ao acertar)." }]
    }
  },
  "Caminho da Árvore do Mundo (World Tree)": {
    features: {
      3: [
        { nome: "Vitalidade da Árvore", desc: "Ao entrar em Fúria, ganha PV Temp (Nível). Todo turno, dá PV Temp a aliado (Xd6, X=Bônus Fúria)." }
      ],
      6: [{ nome: "Ramos da Árvore", desc: "Reação: Se inimigo começar turno a 30ft, teleporte-o para perto de você e reduza Speed a 0 (Save FOR)." }],
      10: [{ nome: "Raízes Esmagadoras", desc: "Alcance +10ft com armas Pesadas/Versáteis. Ativa maestria Push ou Topple junto com a normal." }],
      14: [{ nome: "Viagem pela Árvore", desc: "Teleporte 60ft ao ativar Fúria e como Bônus. 1x por Fúria pode teleportar 150ft levando aliados." }]
    }
  },
  "Caminho do Fanático (Zealot)": {
    features: {
      3: [
        { nome: "Fúria Divina", desc: "Primeiro ataque do turno causa +1d6 + Metade Nível (Necrótico ou Radiante)." },
        { nome: "Guerreiro dos Deuses", desc: "Tem dados de cura (d12). Gaste como Bônus para se curar. É ressuscitado sem custo material." }
      ],
      6: [{ nome: "Foco Fanático", desc: "1x por Fúria: Se falhar em save, pode rerolar com bônus (+Bônus Fúria)." }],
      10: [{ nome: "Presença Zelosa", desc: "Bônus: Até 10 aliados ganham Vantagem em ataques e saves por 1 rodada (1x/descanso)." }],
      14: [{ nome: "Fúria dos Deuses", desc: "Em Fúria: Voo, Resistência a Nec/Psi/Rad. Reação: Se cair a 0 PV, vira 0 PV em Nível PV (Recusa a morrer)." }]
    }
  },
  "Guardião Ancestral (Ancestral Guardian)": {
    features: {
      3: [{ nome: "Protetores Ancestrais", desc: "Primeiro ataque em Fúria marca inimigo: Desvantagem contra outros e aliados têm resistência ao dano dele." }],
      6: [{ nome: "Escudo Espiritual", desc: "Reação: Reduz dano em aliado a 30ft em 2d6 (aumenta com nível)." }],
      10: [{ nome: "Consultar Espíritos", desc: "Conjura Augury ou Clairvoyance." }],
      14: [{ nome: "Ancestrais Vingativos", desc: "Seu Escudo Espiritual causa dano de Força no atacante igual ao valor prevenido." }]
    }
  },
  "Batalhador (Battlerager)": {
    features: {
      3: [{ nome: "Armadura de Batalha", desc: "Pode atacar com armadura de espinhos como Bônus (1d4). Causa 3 dano ao agarrar." }],
      6: [{ nome: "Abandono Descuidado", desc: "Ao usar Reckless Attack, ganha PV Temp (CON)." }],
      10: [{ nome: "Investida", desc: "Pode usar Dash como Ação Bônus em Fúria." }],
      14: [{ nome: "Retribuição Espinhosa", desc: "Se atacado em melee, atacante toma 3 de dano perfurante." }]
    }
  },
  "Caminho da Besta (Beast)": {
    features: {
      3: [{ nome: "Forma da Besta", desc: "Em Fúria, ganha arma natural: Mordida (Cura), Garras (Ataque extra) ou Cauda (Alcance e Bloqueio)." }],
      6: [{ nome: "Alma Bestial", desc: "Armas naturais são mágicas. Escolha: Natação, Escalada ou Pulo melhorado." }],
      10: [{ nome: "Fúria Infecciosa", desc: "Ao acertar: Alvo ataca aliado dele ou toma 2d12 psíquico (Save SAB)." }],
      14: [{ nome: "Chamado da Caça", desc: "Em Fúria, dá PV Temp a aliados. Eles causam +1d6 dano ao acertar." }]
    }
  },
  "Caminho do Gigante (Giant)": {
    features: {
      3: [
        { nome: "Poder do Gigante", desc: "Aprende idioma Gigante e truque Druidcraft ou Thaumaturgy." },
        { nome: "Caos do Gigante", desc: "Em Fúria: Soma dano de fúria em arremessos. Fica tamanho Grande e +5ft alcance." }
      ],
      6: [{ nome: "Cutelo Elemental", desc: "Imbui arma com elemento (dano vira tipo + 1d6). Arma ganha propriedade Arremesso e retorna." }],
      10: [{ nome: "Impulso Poderoso", desc: "Bônus: Arremessa criatura (Média ou menor) a 30ft." }],
      14: [{ nome: "Colosso Demiúrgico", desc: "Fica tamanho Enorme. Alcance +10ft. Dano extra elemental vira 2d6." }]
    }
  },
  "Arauto da Tempestade (Storm Herald)": {
    features: {
      3: [{ nome: "Aura da Tempestade", desc: "Aura 10ft. Escolha: Deserto (Dano Fogo), Mar (Dano Raio) ou Tundra (PV Temp)." }],
      6: [{ nome: "Alma da Tempestade", desc: "Resistência ao elemento escolhido e adaptação ambiental." }],
      10: [{ nome: "Tempestade Protetora", desc: "Aliados na aura ganham sua resistência." }],
      14: [{ nome: "Tempestade Furiosa", desc: "Deserto (Reação dano fogo), Mar (Derruba inimigo), Tundra (Congela/0 speed)." }]
    }
  },
  "Guerreiro Totêmico (Totem Warrior)": {
    magiasBonus: {
      nivel1: ["Falar com Animais"]
    },
    features: {
      3: [{ nome: "Espírito Totêmico", desc: "Urso (Resistência a tudo), Águia (Dash Bônus/Desvantagem Oportunidade), Lobo (Vantagem Aliados) etc." }],
      6: [{ nome: "Aspecto da Besta", desc: "Habilidade utilitária (Carga, Visão, Rastreio)." }],
      10: [{ nome: "Andarilho Espiritual", desc: "Conjura Commune with Nature." }],
      14: [{ nome: "Sintonia Totêmica", desc: "Habilidade final do animal escolhido." }]
    }
  },
  "Magia Selvagem (Wild Magic)": {
    magiasBonus: {
      nivel1: ["Detectar Magia"]
    },
    features: {
      3: [
        { nome: "Surto Selvagem", desc: "Ao entrar em Fúria, role na tabela de Magia Selvagem (efeito aleatório)." },
        { nome: "Percepção Mágica", desc: "Detecta magia a 60ft." }
      ],
      6: [{ nome: "Magia Fortalecedora", desc: "Ação: Dê bônus (d3) em ataque/teste a aliado ou recupere slot de magia dele." }],
      10: [{ nome: "Reação Instável", desc: "Ao tomar dano, pode rerolar o efeito da Fúria Mágica." }],
      14: [{ nome: "Surto Controlado", desc: "Role 2 vezes na tabela e escolha o efeito." }]
    }
  },
  // --- BARDO (BARD) ---

  "Colégio da Dança (Dance)": {
    features: {
      3: [
        { nome: "Defesa Sem Armadura (Dança)", desc: "CA = 10 + Des + Car (sem armadura/escudo). Vantagem em Performance (Dança)." },
        { nome: "Golpes Ágeis", desc: "Ao usar Inspiração, pode fazer um Ataque Desarmado (bônus/reação). Usa DEX. Dano = Dado de Bardo." }
      ],
      6: [
        { nome: "Movimento Inspirador", desc: "Reação: Se inimigo acabar turno a 5ft, gaste Inspiração para mover (metade speed) e permitir aliado mover também. Sem ataque oportunidade." },
        { nome: "Passo em Tandem", desc: "Iniciativa: Gaste Inspiração para dar bônus na iniciativa do grupo (role o dado)." }
      ],
      14: [{ nome: "Evasão de Líder", desc: "Evasão para você e aliados a 5ft (Saves de Destreza para meio dano)." }]
    }
  },

  "Colégio do Glamour (Glamour)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa"],
      nivel2: ["Reflexos"]
    },
    features: {
      3: [
        { nome: "Magia Sedutora", desc: "Sempre prepara Charm Person e Mirror Image. Ao conjurar Ilusão/Encantamento, pode encantar/amedrontar alguém a 60ft." },
        { nome: "Manto de Inspiração", desc: "Bônus (Gasta Inspiração): Dá PV Temp (2x Dado) para aliados e eles podem mover sem oportunidade." }
      ],
      6: [{ nome: "Manto de Majestade", desc: "Conjura Command como Bônus sem gastar slot por 1 minuto." }],
      14: [{ nome: "Majestade Inquebrável", desc: "Bônus: Por 1 min, quem te atacar deve passar em Save CAR ou erra o ataque." }]
    }
  },
  "Colégio do Conhecimento (Lore)": {
    features: {
      3: [
        { nome: "Proficiências Bônus", desc: "Ganha 3 perícias à escolha." },
        { nome: "Palavras Cortantes", desc: "Reação (Gasta Inspiração): Subtraia o dado de uma jogada de ataque, teste ou dano de um inimigo." }
      ],
      6: [{ nome: "Descobertas Mágicas", desc: "Aprende 2 magias de qualquer classe." }],
      14: [{ nome: "Habilidade Inigualável", desc: "Se falhar num teste, pode gastar Inspiração para somar no próprio teste." }]
    }
  },
  "Colégio da Lua (Moon)": {
    magiasBonus: {
      nivel2: ["Raio Lunar"]
    },
    features: {
      3: [
        { nome: "Inspiração Lunar", desc: "Ao dar inspiração, pode ficar Invisível e Teleportar 30ft. Ou curar com a inspiração (+dado) e dar speed." },
        { nome: "Saber Primitivo", desc: "Aprende 1 truque de Druida e 1 perícia de natureza." }
      ],
      6: [{ nome: "Bênção do Luar", desc: "Prepara Moonbeam. Pode modificar para curar aliados na área." }],
      14: [{ nome: "Esplendor do Entardecer", desc: "Seu teleporte de inspiração agora afeta o aliado também. Cura pode ser usada sem gastar dado (1d6 fixo)." }]
    }
  },

  "Colégio da Bravura (Valor)": {
    features: {
      3: [
        { nome: "Treinamento Marcial", desc: "Armadura Média, Escudo, Armas Marciais." },
        { nome: "Inspiração de Combate", desc: "Aliados podem usar seu dado para aumentar Dano ou CA (reação)." }
      ],
      6: [{ nome: "Ataque Extra", desc: "Ataca 2x. Pode trocar um ataque por um Truque." }],
      14: [{ nome: "Magia de Batalha", desc: "Se conjurar magia (ação), pode atacar com arma (bônus)." }]
    }
  },
  "Colégio dos Espíritos (Spirits)": {
    magiasBonus: {
      truques: ["Orientação"]
    },
    features: {
      3: [
        { nome: "Sussurros Guia", desc: "Aprende Guidance (60ft)." },
        { nome: "Contos do Além", desc: "Bônus (Gasta Inspiração): Rola na tabela de efeitos espirituais (Dano, Cura, Teleporte, etc)." }
      ],
      6: [{ nome: "Sessão Espiritual", desc: "Ritual com grupo: Aprende temporariamente 1 magia de Necromancia ou Adivinhação." }],
      14: [{ nome: "Conexão Mística", desc: "Ao rolar Contos do Além, jogue 2 dados e escolha um." }]
    }
  },
  "Colégio das Espadas (Swords)": {
    features: {
      3: [
        { nome: "Proficiência Bônus", desc: "Armadura Média, Cimitarra." },
        { nome: "Estilo de Luta", desc: "Duelismo ou Duas Armas." },
        { nome: "Floreio de Lâmina", desc: "Ao atacar, gasta Inspiração para: +CA e Dano (Defensivo), Dano em área (Cortante) ou Empurrar e Teleporte (Móvel)." }
      ],
      6: [{ nome: "Ataque Extra", desc: "Ataca 2 vezes." }],
      14: [{ nome: "Floreio Mestre", desc: "Pode usar Floreio com d6 sem gastar Inspiração." }]
    }
  },
  "Colégio dos Sussurros (Whispers)": {
    features: {
      3: [
        { nome: "Lâminas Psíquicas", desc: "Ao acertar ataque, gasta Inspiração para causar +Xd6 Psíquico (X aumenta com nível)." },
        { nome: "Palavras de Terror", desc: "Conversa 1 min para amedrontar alvo (se falhar save)." }
      ],
      6: [{ nome: "Manto dos Sussurros", desc: "Reação quando alguém morre: Rouba a sombra para criar um disfarce perfeito da pessoa." }],
      14: [{ nome: "Saber das Sombras", desc: "Encanta criatura fingindo saber o segredo mais terrível dela." }]
    }
  },
  "Colégio da Criação (Creation)": {
    features: {
      3: [
        { nome: "Mote de Potencial", desc: "Sua inspiração cria um orbe. Se usado em Teste (Rerola), Ataque (Explode Dano) ou Save (Ganha PV Temp)." },
        { nome: "Performance da Criação", desc: "Cria um item não-mágico temporário." }
      ],
      6: [{ nome: "Performance Animada", desc: "Anima um objeto Grande para lutar ao seu lado (Construto Dançante)." }],
      14: [{ nome: "Crescendo Criativo", desc: "Cria múltiplos itens. Ignora limite de valor em ouro." }]
    }
  },
  "Colégio da Eloquência (Eloquence)": {
    features: {
      3: [
        { nome: "Língua de Prata", desc: "Em Persuasão/Enganação, qualquer 9 ou menos no dado vira 10." },
        { nome: "Palavras Perturbadoras", desc: "Bônus (Gasta Inspiração): Reduz o próximo Save do inimigo pelo valor do dado." }
      ],
      6: [
        { nome: "Inspiração Infalível", desc: "Se o aliado usar sua inspiração e falhar, o dado não é gasto." },
        { nome: "Fala Universal", desc: "Todos te entendem magicamente." }
      ],
      14: [{ nome: "Inspiração Infecciosa", desc: "Se aliado usar inspiração e tiver sucesso, você pode dar inspiração a outro de graça (reação)." }]
    }
  },

  // --- DRUIDA (DRUID) ---

  "Círculo da Terra (Land)": {
    features: {
      3: [
        { nome: "Magias de Círculo", desc: "Escolha terreno (Árido, Polar, Temperado, Tropical) após Long Rest para ganhar magias preparadas." },
        { nome: "Auxílio da Terra", desc: "Ação Mágica (Gasta Wild Shape): Explosão de flores/espinhos em 10ft. Dano Necrótico (2d6) e Cura (2d6)." }
      ],
      6: [{ nome: "Recuperação Natural", desc: "Short Rest: Recupera slots de magia (Nível/2). Pode conjurar 1 magia de círculo sem gastar slot (1x/dia)." }],
      10: [{ nome: "Proteção da Natureza", desc: "Imune a Veneno. Resistência a Fogo, Frio, Raio ou Veneno (baseado no terreno)." }],
      14: [{ nome: "Santuário da Natureza", desc: "Ação Mágica (Gasta Wild Shape): Cria árvores espectrais (Cubo 15ft). Meia cobertura e resistência para aliados." }]
    }
  },

  "Círculo da Lua (Moon)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos"],
      nivel2: ["Raio Lunar"]
    },
    features: {
      3: [
        { nome: "Formas de Combate", desc: "Wild Shape como Ação Bônus. Ganha 3x Nível PV Temp. AC = 13+SAB. Max CR = Nível/3." },
        { nome: "Magias da Lua", desc: "Cure Wounds, Moonbeam, Starry Wisp, etc. Pode conjurar em forma de Besta." }
      ],
      6: [{ nome: "Formas Aprimoradas", desc: "Ataques de besta causam dano Radiante (opcional). Soma SAB em saves de CON." }],
      10: [{ nome: "Passo do Luar", desc: "Bônus: Teleporte 30ft. Vantagem no próximo ataque." }],
      14: [{ nome: "Forma Lunar", desc: "+2d10 Radiante em ataques. Teleporte leva aliado junto." }]
    }
  },
  "Círculo do Mar (Sea)": {
    magiasBonus: {
      truques: ["Raio de Gelo"],
      nivel1: ["Névoa"],
      nivel2: ["Rajada de Vento"]
    },
    features: {
      3: [
        { nome: "Ira do Mar", desc: "Bônus (Gasta Wild Shape): Aura de 5ft (spray). Bônus: Causa dano Frio (d6s=SAB) e empurra 15ft." },
        { nome: "Magias do Mar", desc: "Fog Cloud, Gust of Wind, Ray of Frost, etc." }
      ],
      6: [{ nome: "Afinidade Aquática", desc: "Aura aumenta para 10ft. Ganha Natação." }],
      10: [{ nome: "Nascido da Tormenta", desc: "Ganha Voo. Resistência a Frio, Raio e Trovão." }],
      14: [{ nome: "Dádiva Oceânica", desc: "Pode manifestar a aura em um aliado a 60ft." }]
    }
  },
  "Círculo das Estrelas (Stars)": {
    magiasBonus: {
      truques: ["Orientação"],
      nivel1: ["Raio Guiador"]
    },
    features: {
      3: [
        { nome: "Mapa Estelar", desc: "Foco arcano. Prepara Guidance e Guiding Bolt (grátis usos=SAB)." },
        { nome: "Forma Estelar", desc: "Bônus (Gasta Wild Shape): Brilha e ganha benefício (Arqueiro: Ataque Bônus / Cálice: Cura Extra / Dragão: Take 10 em INT/SAB/CON)." }
      ],
      6: [{ nome: "Presságio Cósmico", desc: "Fim do Long Rest: Role d6 (Par/Impar). Reação: Some ou subtraia d6 de uma jogada (Weal/Woe)." }],
      10: [{ nome: "Constelações Cintilantes", desc: "Dano/Cura da forma vira 2d8. Dragão ganha voo 20ft." }],
      14: [{ nome: "Cheio de Estrelas", desc: "Na forma estelar, ganha resistência a Concussão, Cortante e Perfurante." }]
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
        { nome: "Mãos de Cura e Dano", desc: "Gaste 1 Foco para Curar (Ação) ou Causar Dano Necrótico (ao bater). Valor: Dado Marcial + SAB." },
        { nome: "Ferramentas de Misericórdia", desc: "Proficiência em Medicina, Intuição e Kit de Herbalismo." }
      ],
      6: [{ nome: "Toque do Médico", desc: "Mão de Cura remove status (Cego/Surdo/Veneno/Stun). Mão de Dano envenena inimigo." }],
      11: [{ nome: "Rajada de Cura", desc: "Pode substituir ataques da Flurry of Blows por Mão de Cura (sem custo extra)." }],
      17: [{ nome: "Mão da Misericórdia Suprema", desc: "Ressuscita criatura morta há 24h (Custo: 5 Foco)." }]
    }
  },

  "Guerreiro das Sombras (Shadow)": {
    magiasBonus: {
      truques: ["Ilusão Menor"],
      nivel2: ["Escuridão"]
    },
    features: {
      3: [
        { nome: "Artes das Sombras", desc: "Darkvision 60ft (ou +60). Gasta 1 Foco para conjurar Darkness. Sabe Minor Illusion." },
      ],
      6: [{ nome: "Passo das Sombras", desc: "Bônus (em escuro): Teleporte 60ft. Vantagem no próximo ataque." }],
      11: [{ nome: "Passo Aprimorado", desc: "Pode gastar 1 Foco para teleportar mesmo na luz. Pode atacar logo após teleportar." }],
      17: [{ nome: "Manto de Sombras", desc: "Ação (3 Foco): Invisibilidade e incorpóreo por 1 min (se ficar no escuro). Flurry of Blows grátis." }]
    }
  },

  "Guerreiro dos Elementos (Elements)": {
    magiasBonus: {
      truques: ["Elementalismo"]
    },
    features: {
      3: [
        { nome: "Sintonia Elemental", desc: "Gaste 1 Foco: Alcance +10ft. Dano vira Elemental (Fogo/Frio/etc) e empurra/puxa 10ft." },
        { nome: "Manipular Elementos", desc: "Sabe a magia Elementalism." }
      ],
      6: [{ nome: "Explosão Elemental", desc: "Ação (2 Foco): Esfera 20ft. Dano 3x Dado Marcial em área." }],
      11: [{ nome: "Passo dos Elementos", desc: "Ganha Voo e Natação quando Sintonizado." }],
      17: [{ nome: "Epítome Elemental", desc: "Resistência a dano. Step of the Wind dá +20ft speed e causa dano em quem você passar perto." }]
    }
  },
  "Guerreiro da Mão Aberta (Open Hand)": {
    features: {
      3: [{ nome: "Técnica da Mão Aberta", desc: "Flurry of Blows aplica efeito: Derrubar (Prone), Empurrar 15ft ou Impedir Reações." }],
      6: [{ nome: "Integridade Corporal", desc: "Bônus: Cura (Dado Marcial + SAB). Usos = SAB." }],
      11: [{ nome: "Passo Veloz", desc: "Se usar Bônus Action, pode usar Step of the Wind de graça logo depois." }],
      17: [{ nome: "Palma Vibrante", desc: "4 Foco ao acertar: Vibração letal. Ação para detonar: 10d12 Force damage (Save CON metade)." }]
    }
  },
  "Caminho da Longa Morte (Long Death)": {
    features: {
      3: [{ nome: "Toque da Morte", desc: "Ao reduzir criatura a 0 PV, ganha PV Temp (Nível + SAB)." }],
      6: [{ nome: "Hora da Colheita", desc: "Ação: Todos a 30ft fazem Save SAB ou ficam Amedrontados." }],
      11: [{ nome: "Maestria da Morte", desc: "Se cair a 0 PV, gasta 1 Ki para ficar com 1 PV." }],
      17: [{ nome: "Toque da Longa Morte", desc: "Ação (1-10 Ki): Dano 2d10 Necrótico por ponto de Ki gasto." }]
    }
  },
  "Caminho da Alma Solar (Sun Soul)": {
    features: {
      3: [{ nome: "Raio Solar", desc: "Ataque a distância (30ft) que causa dano radiante (Dado Marcial)." }],
      6: [{ nome: "Golpe do Arco Flamejante", desc: "Após atacar, gasta 2 Ki para conjurar Burning Hands (Bônus)." }],
      11: [{ nome: "Explosão Solar", desc: "Ação: Esfera de luz radiante (20ft). Dano 2d6 (aumenta com Ki)." }],
      17: [{ nome: "Escudo Solar", desc: "Aura de luz. Causa dano radiante em quem te bater (Reação)." }]
    }
  },
  "Caminho do Eu Astral (Astral Self)": {
    features: {
      3: [{ nome: "Braços Astrais", desc: "Bônus (1 Ki): Braços espectrais. Alcance +5ft. Usa SAB para ataque/dano." }],
      6: [{ nome: "Semblante Astral", desc: "Visão no escuro mágica e vantagem em Intuição/Intimidação." }],
      11: [{ nome: "Corpo Astral", desc: "Deflete dano elemental. Braços causam dano extra." }],
      17: [{ nome: "Eu Astral Desperto", desc: "+2 CA. Ataque Extra vira 3 ataques se usar braços." }]
    }
  },
  "Caminho do Dragão Ascendente (Ascendant Dragon)": {
    magiasBonus: {
      truques: ["Taumaturgia"]
    },
    features: {
      3: [
        { nome: "Discípulo Dracônico", desc: "Rerola Intimidação. Dano desarmado vira elemental." },
        { nome: "Sopro do Dragão", desc: "Substitui ataque por Cone/Linha de dano elemental (2x Dado Marcial)." }
      ],
      6: [{ nome: "Asas Desfraldadas", desc: "Step of the Wind dá voo temporário." }],
      11: [{ nome: "Aspecto da Serpe", desc: "Aura de Medo ou Resistência." }],
      17: [{ nome: "Aspecto Ascendente", desc: "Blindsight 10ft. Sopro aumenta dano/área. Aura causa dano explosivo." }]
    }
  },
  "Caminho do Mestre Bêbado (Drunken Master)": {
    features: {
      3: [
        { nome: "Proficiências Bônus", desc: "Performance e Ferramenta de Cervejeiro." },
        { nome: "Técnica Bêbada", desc: "Flurry of Blows dá Disengage grátis e +10ft speed." }
      ],
      6: [{ nome: "Ginga Embriagada", desc: "Levanta com 5ft. Redireciona ataque errado inimigo para outro inimigo (1 Ki)." }],
      11: [{ nome: "Sorte de Bêbado", desc: "Cancela desvantagem gastando 2 Ki." }],
      17: [{ nome: "Frenesi Intoxicado", desc: "Flurry of Blows faz até 5 ataques (se forem em alvos diferentes)." }]
    }
  },
  "Caminho do Kensei (Kensei)": {
    features: {
      3: [
        { nome: "Armas Kensei", desc: "Escolha 2 armas (ganha proficiência). São armas de monge." },
        { nome: "Defesa Ágil", desc: "Se atacar desarmado segurando arma Kensei, +2 CA." },
        { nome: "Tiro do Kensei", desc: "Bônus: +1d4 dano em ataques a distância." }
      ],
      6: [
        { nome: "Armas Mágicas", desc: "Armas Kensei contam como mágicas." },
        { nome: "Golpe Hábil", desc: "Gasta 1 Ki para adicionar dano (Dado Marcial) ao acertar." }
      ],
      11: [{ nome: "Afiar a Lâmina", desc: "Bônus (1-3 Ki): Arma ganha +1/+2/+3 de bônus." }],
      17: [{ nome: "Precisão Infalível", desc: "Rerola um ataque errado por turno." }]
    }
  },

  // --- PALADINO (PALADIN) ---

  "Juramento da Devoção (Devotion)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal", "Santuário"]
    },
    features: {
      3: [
        { nome: "Magias de Juramento", desc: "Protection form Evil/Good, Sanctuary, etc." },
        { nome: "CD: Arma Sagrada", desc: "Imbui arma por 1 min: +CAR no acerto, Luz e dano pode ser Radiante." }
      ],
      7: [{ nome: "Aura de Devoção", desc: "Imunidade a Charme na aura." }],
      15: [{ nome: "Destruição Protetora", desc: "Ao usar Smite, você e aliados na aura ganham Meia Cobertura (+2 CA/Des) até próximo turno." }],
      20: [{ nome: "Nimbo Sagrado", desc: "Ação Bônus: Aura de luz solar. Dano radiante em inimigos e vantagem contra Infernal/Morto-vivo." }]
    }
  },

  "Juramento da Glória (Glory)": {
    magiasBonus: {
      nivel1: ["Heroísmo", "Raio Guiador"]
    },
    features: {
      3: [
        { nome: "Destruição Inspiradora", desc: "Após Smite, distribui PV Temp (2d8+Nível) entre aliados." },
        { nome: "CD: Atleta Inigualável", desc: "1 hora: Vantagem em Atletismo/Acrobacia e pulo aumenta 10ft." }
      ],
      7: [{ nome: "Aura de Rapidez", desc: "+10ft de deslocamento para você e aliados na aura." }],
      15: [{ nome: "Defesa Gloriosa", desc: "Reação ao ser atacado: +CAR na CA. Se errar, pode contra-atacar." }],
      20: [{ nome: "Lenda Viva", desc: "10 min: Vantagem em Carisma, Rerola 1 save falho e transforma 1 erro de ataque em acerto por turno." }]
    }
  },

  "Juramento dos Anciões (Ancients)": {
    magiasBonus: {
      nivel1: ["Golpe Constritor"],
      nivel2: ["Passo Nebuloso"]
    },
    features: {
      3: [
        { nome: "Magias de Juramento", desc: "Ensnaring Strike, Misty Step, etc." },
        { nome: "CD: Ira da Natureza", desc: "Vinhas prendem inimigos a 15ft (Save FOR ou Restrained)." }
      ],
      7: [{ nome: "Aura de Proteção", desc: "Resistência a dano Necrótico, Psíquico e Radiante na aura." }],
      15: [{ nome: "Sentinela Imortal", desc: "Se cair a 0 PV, volta com 1 PV. Não envelhece." }],
      20: [{ nome: "Campeão Ancião", desc: "1 min: Inimigos têm desvantagem em saves contra suas magias. Regenera 10 PV/turno. Magias de ação viram Bônus." }]
    }
  },

  "Juramento dos Gênios Nobres (Noble Genies)": {
    magiasBonus: {
      nivel1: ["Detectar o Bem e Mal"]
    },
    features: {
      3: [
        { nome: "Destruição Elemental", desc: "Ao usar Smite, adiciona efeito: Dao (Prende), Djinni (Teleporta), Efreet (Fogo em área) ou Marid (Empurra/Derruba)." },
        { nome: "Esplendor do Gênio", desc: "CA sem armadura = 10+DES+CAR. Ganha perícia de CAR." }
      ],
      7: [{ nome: "Aura de Escudo Elemental", desc: "Escolha resistência (Ácido, Frio, Fogo, Raio, Trovão) para a aura. Pode trocar no turno." }],
      15: [{ nome: "Repreensão Elemental", desc: "Reação ao ser atingido: Reduz dano pela metade e causa 2d10+CAR elemental no atacante." }],
      20: [{ nome: "Descendente Nobre", desc: "Voo 60ft. Reação: Transforma falha de aliado em sucesso." }]
    }
  },

  "Juramento da Vingança (Vengeance)": {
    magiasBonus: {
      nivel1: ["Marca do Caçador"],
      nivel2: ["Imobilizar Pessoa"],
      nivel3: ["Velocidade"]
    },
    features: {
      3: [
        { nome: "Magias de Juramento", desc: "Hunter's Mark, Hold Person, Haste, etc." },
        { nome: "CD: Voto de Inimizade", desc: "Vantagem em ataques contra uma criatura por 1 min. Pode transferir se ela morrer." }
      ],
      7: [{ nome: "Vingador Implacável", desc: "Se acertar Oportunidade, reduz speed do alvo a 0 e você move metade do seu speed." }],
      15: [{ nome: "Alma da Vingança", desc: "Se alvo do Voto atacar, você pode usar reação para atacar ele (melee)." }],
      20: [{ nome: "Anjo Vingador", desc: "Voo 60ft. Aura de Medo." }]
    }
  },

  "Juramento da Conquista (Conquest)": {
    magiasBonus: {
      nivel1: ["Armadura de Agathys", "Comando"]
    },
    features: {
      3: [
        { nome: "Presença Conquistadora", desc: "CD: Amedronta inimigos a 30ft." },
        { nome: "Golpe Guiado", desc: "CD: +10 no acerto." }
      ],
      7: [{ nome: "Aura da Conquista", desc: "Inimigo com medo na aura tem 0 de movimento e toma dano psíquico." }],
      15: [{ nome: "Repreensão Desdenhosa", desc: "Quem te acertar toma dano psíquico (Mod Carisma)." }],
      20: [{ nome: "Conquistador Invencível", desc: "Resistência a tudo. Ataque extra (total 3). Crítico no 19-20." }]
    }
  },
  "Juramento da Coroa (Crown)": {
    magiasBonus: {
      nivel1: ["Comando", "Duelo Compelido"]
    },
    features: {
      3: [
        { nome: "Desafio do Campeão", desc: "CD: Inimigos a 30ft não podem se afastar de você." },
        { nome: "Virar a Maré", desc: "CD: Cura aliados com menos de metade da vida." }
      ],
      7: [{ nome: "Lealdade Divina", desc: "Reação: Toma o dano no lugar de um aliado a 5ft." }],
      15: [{ nome: "Santo Inabalável", desc: "Vantagem em saves contra Paralisia e Stun." }],
      20: [{ nome: "Campeão Exaltado", desc: "Resistência a dano não-mágico. Aliados têm vantagem em Death Saves e Sabedoria." }]
    }
  },
  "Juramento da Redenção (Redemption)": {
    magiasBonus: {
      nivel1: ["Santuário", "Sono"]
    },
    features: {
      3: [
        { nome: "Emissário da Paz", desc: "CD: +5 em Persuasão por 10 min." },
        { nome: "Repreender o Violento", desc: "CD Reação: Atacante toma o mesmo dano que causou (Radiante)." }
      ],
      7: [{ nome: "Aura do Guardião", desc: "Reação: Toma dano no lugar de aliado a 10ft." }],
      15: [{ nome: "Espírito Protetor", desc: "Regenera (1d6+Nível/2) se estiver com menos da metade da vida." }],
      20: [{ nome: "Emissário da Redenção", desc: "Resistência a todo dano de criaturas. Se te baterem, tomam metade do dano de volta." }]
    }
  },
  "Juramento dos Vigias (Watchers)": {
    magiasBonus: {
      nivel1: ["Alarme", "Detectar Magia"]
    },
    features: {
      3: [
        { nome: "Vontade do Vigia", desc: "CD: Vantagem em saves mentais (INT/SAB/CAR) para o grupo." },
        { nome: "Abjurar o Extraplanar", desc: "CD: Expulsa Elementais, Fadas, Infernais, etc." }
      ],
      7: [{ nome: "Aura da Sentinela", desc: "Bônus na Iniciativa para o grupo na aura." }],
      15: [{ nome: "Repreensão Vigilante", desc: "Reação: Se alguém passar em save contra magia, causa dano 2d8+CAR no conjurador." }],
      20: [{ nome: "Baluarte Mortal", desc: "Truesight. Vantagem contra extraplanares. Bane inimigos ao acertar." }]
    }
  },
  "Quebrador de Juramento (Oathbreaker)": {
    magiasBonus: {
      nivel1: ["Infligir Ferimentos", "Repreensão Infernal"]
    },
    features: {
      3: [
        { nome: "Controlar Morto-Vivo", desc: "CD: Domina um morto-vivo (CR < Nível)." },
        { nome: "Aspecto Terrível", desc: "CD: Amedronta inimigos a 30ft." }
      ],
      7: [{ nome: "Aura de Ódio", desc: "Você e mortos-vivos/infernais aliados ganham +CAR no dano." }],
      15: [{ nome: "Resistência Sobrenatural", desc: "Resistência a dano físico não-mágico." }],
      20: [{ nome: "Lorde do pavor", desc: "Aura de escuridão e dano psíquico. Ataque de sombras como bônus." }]
    }
  },

  // --- PATRULHEIRO (RANGER) ---

  "Mestre das Bestas (Beast Master)": {
    features: {
      3: [
        { nome: "Companheiro Primitivo", desc: "Invoca Besta (Terra, Mar ou Ar). Age no seu turno. Ação Bônus para comandar ataque. Se você atacar, pode trocar 1 ataque pelo da Besta." },
        { nome: "Estatísticas da Besta", desc: "PV: 5 + 5x Nível. CA: 13 + SAB. Dano: 1d8+2+SAB (Terra) ou 1d4/1d6 (Ar/Mar)." }
      ],
      7: [{ nome: "Treinamento Excepcional", desc: "Besta pode usar Dash/Disengage/Dodge/Help como Bônus. Ataques dela são mágicos (Force)." }],
      11: [{ nome: "Fúria Bestial", desc: "Besta ataca 2 vezes. Se atacar alvo do Hunter's Mark, causa +d6 extra." }],
      15: [{ nome: "Magias Compartilhadas", desc: "Se conjurar magia em si mesmo (Self), afeta a Besta também se ela estiver a 30ft." }]
    }
  },

  "Peregrino Feérico (Fey Wanderer)": {
    magiasBonus: {
      nivel1: ["Enfeitiçar Pessoa"],
      nivel2: ["Passo Nebuloso"],
      nivel3: ["Invocar Fada"]
    },
    features: {
      3: [
        { nome: "Golpes Terríveis", desc: "1x por turno: +1d4 Psíquico no alvo (vira 1d6 no nv 11)." },
        { nome: "Glamour de Outro Mundo", desc: "Soma SAB em testes de Carisma. Ganha perícia social." },
        { nome: "Magias Feéricas", desc: "Charm Person, Misty Step, Summon Fey, etc." }
      ],
      7: [{ nome: "Distorção Sedutora", desc: "Vantagem contra Charme/Medo. Se passar ou ver alguém passar, pode usar Reação para Encantar/Amedrontar um inimigo." }],
      11: [{ nome: "Reforços Feéricos", desc: "Conjura Summon Fey sem componente. 1x/dia sem slot (1 min, sem concentração)." }],
      15: [{ nome: "Viajante Nebuloso", desc: "Conjura Misty Step sem slot (usos=SAB). Pode levar um aliado junto." }]
    }
  },
  "Caçador das Sombras (Gloom Stalker)": {
    magiasBonus: {
      nivel1: ["Disfarce"],
      nivel2: ["Truque de Corda"],
      nivel3: ["Medo"]
    },
    features: {
      3: [
        { nome: "Emboscada Terrível", desc: "Turno 1: +10ft Speed. Soma SAB na Iniciativa. Ao atacar: +2d6 dano psíquico (usos=SAB)." },
        { nome: "Visão Umbral", desc: "Darkvision 60ft. Invisível para quem usa Darkvision para te ver no escuro." },
        { nome: "Magias de Sombra", desc: "Disguise Self, Rope Trick, Fear, etc." }
      ],
      7: [{ nome: "Mente de Ferro", desc: "Proficiência em Saves de Sabedoria (ou INT/CAR)." }],
      11: [{ nome: "Rajada do Espreitador", desc: "Dano da emboscada vira 2d8. Pode fazer ataque extra em criatura adjacente ou causar Medo em área." }],
      15: [{ nome: "Esquiva Sombria", desc: "Reação ao ser atacado: Impõe Desvantagem e teleporta 30ft." }]
    }
  },

  "Caçador (Hunter)": {
    features: {
      3: [
        { nome: "Presa do Caçador", desc: "Escolha: Colossus Slayer (+1d8 se alvo ferido) ou Horde Breaker (Ataque extra em inimigo a 5ft do primeiro)." },
        { nome: "Saber do Caçador", desc: "Sabe imunidades/resistências do alvo do Hunter's Mark." }
      ],
      7: [{ nome: "Táticas Defensivas", desc: "Escolha: Escape (Desvantagem em Oportunidade contra você) ou Defesa Multiataque (Se te acertarem, próximos ataques têm desvantagem)." }],
      11: [{ nome: "Presa Superior", desc: "Se causar dano de Hunter's Mark, causa o dano extra em outro inimigo a 30ft também." }],
      15: [{ nome: "Defesa Superior", desc: "Reação ao tomar dano: Ganha Resistência àquele tipo de dano no turno." }]
    }
  },

  "Enxameante (Swarmkeeper)": {
    magiasBonus: {
      truques: ["Mãos Mágicas"],
      nivel1: ["Fogo das Fadas"],
      nivel2: ["Teia"]
    },
    features: {
      3: [
        { nome: "Enxame Reunido", desc: "Ao acertar ataque, enxame faz: +1d6 dano, Move alvo 15ft (Save FOR) ou Move você 5ft." },
        { nome: "Magias do Enxame", desc: "Mage Hand, Faerie Fire, Web, etc." }
      ],
      7: [{ nome: "Maré Agitada", desc: "Bônus: Voo 10ft e pairar por 1 min." }],
      11: [{ nome: "Enxame Poderoso", desc: "Dano vira 1d8. Enxame derruba (Prone) ao mover. Se te mover, dá meia cobertura." }],
      15: [{ nome: "Dispersão do Enxame", desc: "Reação ao tomar dano: Resistência e teleporte 30ft." }]
    }
  },
  "Caminhante do Inverno (Winter Walker)": {
    magiasBonus: {
      nivel1: ["Faca de Gelo"],
      nivel2: ["Imobilizar Pessoa"],
      nivel4: ["Tempestade de Gelo"]
    },
    features: {
      3: [
        { nome: "Explorador Gélido", desc: "Ignora resistência a Frio. Resiste a Frio. 1x/turno: +1d4 Frio no ataque." },
        { nome: "Rima do Caçador", desc: "Ao conjurar Hunter's Mark, ganha PV Temp. Alvo do Mark não pode usar Disengage." },
        { nome: "Magias de Inverno", desc: "Ice Knife, Hold Person, Ice Storm, etc." }
      ],
      7: [{ nome: "Alma Fortalecida", desc: "Ação Mágica: Cura aliados (1d10+Nível) e dá vantagem contra Medo." }],
      11: [{ nome: "Retribuição Gelada", desc: "Reação ao ser acertado: Atacante faz Save SAB ou fica Atordoado (Stunned) e Speed 0." }],
      15: [{ nome: "Assombração Congelada", desc: "Ao usar Hunter's Mark, vira fantasma de neve: Imune a Frio/Agarrao. Causa dano frio em área." }]
    }
  },

  "Andarilho do Horizonte (Horizon Walker)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal"]
    },
    features: {
      3: [
        { nome: "Detectar Portal", desc: "Detecta portais planares a 1 milha." },
        { nome: "Guerreiro Planar", desc: "Bônus: Marca inimigo. Próximo ataque causa dano de Força e +1d8 extra." }
      ],
      7: [{ nome: "Passo Etéreo", desc: "Bônus: Conjura Etherealness até o fim do turno (atravessa paredes)." }],
      11: [{ nome: "Golpe Distante", desc: "Pode teleportar 10ft antes de cada ataque. Se atacar 2 inimigos, ganha 1 ataque extra." }],
      15: [{ nome: "Defesa Espectral", desc: "Reação ao tomar dano: Ganha resistência ao dano daquele ataque." }]
    }
  },
  "Caçador de Monstros (Monster Slayer)": {
    magiasBonus: {
      nivel1: ["Proteção contra o Bem e o Mal"]
    },
    features: {
      3: [
        { nome: "Sentido do Caçador", desc: "Ação: Descobre imunidades/vulnerabilidades do alvo." },
        { nome: "Presa do Matador", desc: "Bônus: Marca alvo. Primeiro acerto no turno causa +1d6." }
      ],
      7: [{ nome: "Defesa Sobrenatural", desc: "+1d6 em saves causados pela Presa e testes de agarrar." }],
      11: [{ nome: "Nêmesis do Mago", desc: "Reação: Se inimigo conjurar ou teleportar, faz Save SAB ou falha/perde magia." }],
      15: [{ nome: "Contra-Ataque do Matador", desc: "Reação: Se a Presa te forçar a um Save, você ataca antes. Se acertar, passa no save automaticamente." }]
    }
  },
  "Guardião Dracônico (Drakewarden)": {
    magiasBonus: {
      truques: ["Taumaturgia"]
    },
    features: {
      3: [
        { nome: "Companheiro Drake", desc: "Invoca Drake Pequeno. Ele age no seu turno. Reação dele: Adiciona 1d6 elemental no ataque de alguém." },
        { nome: "Presente Dracônico", desc: "Thaumaturgy e Draconic." }
      ],
      7: [{ nome: "Vínculo de Escama", desc: "Drake ganha asas (Voo) e fica Médio (Montaria). Você ganha resistência ao elemento dele." }],
      11: [{ nome: "Sopro do Drake", desc: "Ação: Cone 30ft. Dano 8d6 (Save DES metade)." }],
      15: [{ nome: "Vínculo Perfeito", desc: "Drake fica Grande. Mordida causa +1d6. Reação: Resistência para você ou drake se tomarem dano perto um do outro." }]
    }
  },

  // --- BRUXO (WARLOCK) ---

  "Arquifada (Archfey)": {
    magiasBonus: {
      nivel1: ["Fogo das Fadas", "Sono"],
      nivel2: ["Passo Nebuloso"]
    },
    features: {
      3: [
        { nome: "Passos da Fada", desc: "Conjura Misty Step (usos=CAR) sem slot. Pode adicionar efeito: Cura Temp ou Desvantagem em ataques inimigos." },
        { nome: "Magias da Arquifada", desc: "Faerie Fire, Sleep, Misty Step, etc." }
      ],
      6: [{ nome: "Fuga Nebulosa", desc: "Pode usar Misty Step como Reação ao tomar dano. Novos efeitos: Invisibilidade ou Dano Psíquico em área." }],
      10: [{ nome: "Defesas Sedutoras", desc: "Imune a Charme. Reação ao ser atingido: Reduz dano à metade e reflete dano psíquico." }],
      14: [{ nome: "Magia Encantadora", desc: "Ao conjurar Encantamento ou Ilusão (ação), pode usar Misty Step de graça junto." }]
    }
  },
  "Celestial (Celestial)": {
    magiasBonus: {
      truques: ["Luz", "Chama Sagrada"],
      nivel1: ["Curar Ferimentos", "Raio Guiador"],
      nivel3: ["Revivificar"]
    },
    features: {
      3: [
        { nome: "Luz Curativa", desc: "Pool de d6s (1+Nível). Bônus: Cura criatura a 60ft gastando dados." },
        { nome: "Magias Celestiais", desc: "Cure Wounds, Guiding Bolt, Revivify, etc." }
      ],
      6: [{ nome: "Alma Radiante", desc: "Resistência a Radiante. Soma CAR no dano de magias de Fogo/Radiante." }],
      10: [{ nome: "Resiliência Celestial", desc: "Ganha PV Temp ao usar Magical Cunning ou terminar descanso. Aliados também ganham." }],
      14: [{ nome: "Vingança Escaldante", desc: "Ao fazer Death Save, pode levantar com 50% da vida e explodir em dano radiante (cego em inimigos)." }]
    }
  },
  "Corruptor (Fiend)": {
    magiasBonus: {
      nivel1: ["Mãos Flamejantes", "Comando"],
      nivel3: ["Bola de Fogo"]
    },
    features: {
      3: [
        { nome: "Bênção do Tenebroso", desc: "Ao reduzir inimigo a 0 PV, ganha PV Temp (CAR + Nível)." },
        { nome: "Magias de Corruptor", desc: "Burning Hands, Command, Fireball, etc." }
      ],
      6: [{ nome: "Sorte do Tenebroso", desc: "Adiciona 1d10 a um teste ou save (1x/descanso)." }],
      10: [{ nome: "Resiliência Diabólica", desc: "Escolha resistência a um tipo de dano a cada descanso." }],
      14: [{ nome: "Arremessar no Inferno", desc: "Ao acertar ataque: Alvo some (Save CAR). Toma 8d10 Psíquico se não for Demônio." }]
    }
  },
  "Grande Antigo (Great Old One)": {
    magiasBonus: {
      nivel2: ["Detectar Pensamentos"],
      nivel3: ["Fome de Hadar"]
    },
    features: {
      3: [
        { nome: "Mente Desperta", desc: "Telepatia (alcance milhas=CAR). Bônus: Link mental com criatura." },
        { nome: "Magias Psíquicas", desc: "Dano de magias pode ser Psíquico. Encantamento/Ilusão sem componentes V/S." }
      ],
      6: [{ nome: "Combatente Clarividente", desc: "Ao criar link mental, alvo faz Save SAB ou tem Desvantagem contra você e você tem Vantagem contra ele." }],
      10: [{ nome: "Escudo Mental", desc: "Pensamentos ilegíveis. Resistência a Psíquico. Reflete dano psíquico recebido." }],
      14: [{ nome: "Criar Servo", desc: "Conjura Summon Aberration sem concentração (1 min). Aberração causa dano extra em alvo de Hex." }]
    }
  },

  "O Insondável (Fathomless)": {
    magiasBonus: {
      nivel1: ["Onda Trovejante"]
    },
    features: {
      1: [
        { nome: "Tentáculo das Profundezas", desc: "Bônus: Cria tentáculo que ataca (1d8 frio) e reduz speed." },
        { nome: "Dádiva do Mar", desc: "Natação 40ft e respira na água." }
      ],
      6: [{ nome: "Bobina Guardiã", desc: "Reação: Tentáculo reduz dano em aliado." }],
      10: [{ nome: "Tentáculos Agarradores", desc: "Conjura Evard's Black Tentacles sem slot. Ganha PV Temp ao conjurar." }],
      14: [{ nome: "Mergulho Insondável", desc: "Teleporte em grupo (até 5) através de poças de água (1 milha)." }]
    }
  },
  "O Gênio (Genie)": {
    magiasBonus: {
      nivel1: ["Detectar o Bem e Mal"]
    },
    features: {
      1: [
        { nome: "Vaso do Gênio", desc: "Lâmpada/Anel mágico. Pode entrar nele para descansar. Soma Dano Proficiência (Tipo do Gênio) em ataque." },
        { nome: "Magias de Gênio", desc: "Wish (nv 9), Creation, etc. + Magias específicas do tipo (Dao, Djinni, Efreet, Marid)." }
      ],
      6: [{ nome: "Dádiva Elemental", desc: "Resistência ao elemento do gênio. Bônus: Voo 30ft (10 min)." }],
      10: [{ nome: "Vaso Santuário", desc: "Pode levar 5 aliados para dentro do vaso. Short Rest lá dentro dura 10 min e cura mais." }],
      14: [{ nome: "Desejo Limitado", desc: "1x/dias: Conjura qualquer magia de nível 6 ou menor (Ação) sem componentes." }]
    }
  },
  "Lâmina Maldita (Hexblade)": {
    magiasBonus: {
      nivel1: ["Destruição Colérica", "Escudo Arcano"]
    },
    features: {
      1: [
        { nome: "Maldição da Lâmina", desc: "Bônus: Marca inimigo. Crítico 19-20, +Prof Dano, Cura ao matar." },
        { nome: "Guerreiro do Hex", desc: "Proficiência Média/Escudo/Marcial. Usa CARISMA para ataque/dano com arma." }
      ],
      6: [{ nome: "Espectro Amaldiçoado", desc: "Ao matar humanoide, ergue espectro para lutar por você." }],
      10: [{ nome: "Armadura de Hex", desc: "Reação: 50% de chance de ignorar um ataque do alvo amaldiçoado." }],
      14: [{ nome: "Mestre dos Hex", desc: "Se alvo da maldição morrer, pode transferir a maldição para outro." }]
    }
  },
  "O Morto-Vivo (Undead)": {
    magiasBonus: {
      nivel1: ["Falsa Vida", "Perdição"]
    },
    features: {
      1: [{ nome: "Forma de Pavor", desc: "Bônus: Transformação. Ganha PV Temp. Ao atacar, causa Medo (Save SAB)." }],
      6: [{ nome: "Toque do Túmulo", desc: "Não come/bebe/respira. Pode transformar dano em Necrótico (+1 dado na forma)." }],
      10: [{ nome: "Casca Necrótica", desc: "Resistência (ou Imunidade) a Necrótico. Ao cair a 0 PV, explode em dano necrótico e fica com 1 PV." }],
      14: [{ nome: "Projeção Espiritual", desc: "Separa espírito do corpo. Voo, atravessa paredes, resistência a dano físico. Cura ao causar necrótico." }]
    }
  },
  "O Imortal (Undying)": {
    magiasBonus: {
      truques: ["Estabilizar"]
    },
    features: {
      1: [{ nome: "Entre os Mortos", desc: "Sabe Spare the Dying. Mortos-vivos precisam de save para te atacar." }],
      6: [{ nome: "Desafiar a Morte", desc: "Recupera PV ao passar em Death Save ou estabilizar alguém." }],
      10: [{ nome: "Natureza Imortal", desc: "Não precisa respirar/comer/dormir. Envelhece devagar." }],
      14: [{ nome: "Vida Indestrutível", desc: "Bônus: Recupera PV (1d8 + Nível). Recola membros decepados." }]
    }
  },

  // --- FEITICEIRO (SORCERER) ---

  "Feitiçaria Aberrante (Aberrant)": {
    magiasBonus: {
      truques: ["Lasca Mental"],
      nivel2: ["Detectar Pensamentos"],
      nivel3: ["Fome de Hadar"]
    },
    features: {
      3: [
        { nome: "Magias Psíquicas", desc: "Detect Thoughts, Mind Sliver, Hunger of Hadar, etc." },
        { nome: "Fala Telepática", desc: "Link mental com criatura (minutos = Nível)." }
      ],
      6: [
        { nome: "Feitiçaria Psíquica", desc: "Pode conjurar magias psíquicas usando Pontos (Custo=Nível). Se usar pontos, não precisa de componentes." },
        { nome: "Defesas Psíquicas", desc: "Resistência a Psíquico. Vantagem contra Charme/Medo." }
      ],
      14: [{ nome: "Revelação na Carne", desc: "Bônus (Gasta 1+ Pontos): Ganha Voo, Natação, Visão no Invisível ou Passar em Frestas." }],
      18: [{ nome: "Implosão Distorcida", desc: "Teleporte 120ft. Ao sair, puxa inimigos para o centro e causa 3d10 Força." }]
    }
  },
  "Feitiçaria Mecânica (Clockwork)": {
    magiasBonus: {
      nivel1: ["Alarme", "Auxílio"],
      nivel5: ["Muralha de Energia"]
    },
    features: {
      3: [
        { nome: "Magias Mecânicas", desc: "Alarm, Aid, Wall of Force, etc." },
        { nome: "Restaurar Equilíbrio", desc: "Reação: Cancela Vantagem ou Desvantagem de uma criatura." }
      ],
      6: [{ nome: "Bastião da Lei", desc: "Ação Mágica (1-5 Pontos): Cria escudo em aliado. Reduz dano (d8s por ponto gasto)." }],
      14: [{ nome: "Transe da Ordem", desc: "Bônus: Por 1 min, ataques contra você não têm vantagem e você trata d20s de 9 ou menos como 10." }],
      18: [{ nome: "Cavalgada Mecânica", desc: "Ação (7 Pontos): Cura 100 PV em área, repara objetos e dissipa magias de nível 6 ou menor." }]
    }
  },
  "Feitiçaria Dracônica (Draconic)": {
    magiasBonus: {
      nivel1: ["Orbe Cromática"],
      nivel2: ["Sopro do Dragão"],
      nivel3: ["Voo"]
    },
    features: {
      3: [
        { nome: "Resiliência Dracônica", desc: "PV Máximo +1 por nível. CA = 10 + DES + CAR (se sem armadura)." },
        { nome: "Magias Dracônicas", desc: "Chromatic Orb, Dragon's Breath, Fly, Summon Dragon, etc." }
      ],
      6: [{ nome: "Afinidade Elemental", desc: "Resistência ao elemento do dragão. Soma CAR no dano de magias desse tipo." }],
      14: [{ nome: "Asas de Dragão", desc: "Bônus: Ganha asas (Voo 60ft) por 1 hora." }],
      18: [{ nome: "Companheiro Dragão", desc: "Conjura Summon Dragon sem slot e sem concentração." }]
    }
  },

  "Feitiçaria de Magia Selvagem (Wild Magic)": {
    features: {
      3: [
        { nome: "Surto de Magia Selvagem", desc: "Chance de rolar efeito aleatório ao conjurar magia (d20 = 20)." },
        { nome: "Marés do Caos", desc: "Ganha Vantagem em um teste. Dispara Surto na próxima magia." }
      ],
      6: [{ nome: "Dobrar a Sorte", desc: "Reação (1 Ponto): Adiciona ou subtrai 1d4 de um teste de outra criatura." }],
      14: [{ nome: "Caos Controlado", desc: "Role 2 vezes na tabela de Surto e escolha um." }],
      18: [{ nome: "Surto Domado", desc: "Escolha o efeito da tabela de Surto (exceto o último)." }]
    }
  },

  "Feitiçaria do Fogo Mágico (Spellfire)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos"],
      nivel2: ["Raio Ardente"],
      nivel4: ["Escudo de Fogo"],
      nivel5: ["Coluna de Chamas"]
    },
    features: {
      3: [
        { nome: "Explosão de Fogo Mágico", desc: "Ao gastar Pontos de Feitiçaria, cura aliado (Temp HP) ou causa dano (Fogo/Radiante) em área próxima." },
        { nome: "Magias de Fogo Mágico", desc: "Cure Wounds, Scorching Ray, Fire Shield, Flame Strike, etc." }
      ],
      6: [{ nome: "Absorver Magias", desc: "Sabe Counterspell. Se o Counterspell funcionar, recupera 1d4 Pontos." }],
      14: [{ nome: "Fogo Mágico Afiado", desc: "Aumenta o dano e a cura da Explosão de Fogo Mágico." }],
      18: [{ nome: "Coroa de Fogo Mágico", desc: "Ao usar Feitiçaria Inata: Voo 60ft, reduz dano gastando Hit Dice e evita dano em saves bem sucedidos." }]
    }
  },
  "Alma Divina (Divine Soul)": {
    magiasBonus: {
      nivel1: ["Curar Ferimentos", "Bênção"]
    },
    features: {
      3: [
        { nome: "Magia Divina", desc: "Acesso à lista de Clérigo. Ganha 1 magia extra baseada na afinidade (Bem, Mal, Lei, Caos)." },
        { nome: "Favorecido pelos Deuses", desc: "Se errar ataque ou save, adiciona 2d4." }
      ],
      6: [{ nome: "Cura Potencializada", desc: "Gaste 1 Ponto para rerolar dados de cura." }],
      14: [{ nome: "Forma Angélica", desc: "Bônus: Asas espectrais (Voo 30ft)." }],
      18: [{ nome: "Recuperação Sobrenatural", desc: "Bônus (se < 50% vida): Recupera metade dos PV máximos." }]
    }
  },

  "Feitiçaria Lunar (Lunar)": {
    magiasBonus: {
      truques: ["Chama Sagrada"]
    },
    features: {
      3: [
        { nome: "Encarnação Lunar", desc: "Escolha fase (Cheia, Nova, Crescente). Ganha magias grátis da fase. Sabe Sacred Flame (atinge 2 alvos)." },
        { nome: "Fogo da Lua", desc: "Sacred Flame atinge 2 alvos adjacentes." }
      ],
      6: [{ nome: "Crescer e Minguar", desc: "Reduz custo de Metamagia para escolas da fase atual. Pode mudar fase como Bônus." }],
      14: [{ nome: "Empoderamento Lunar", desc: "Cheia (Luz/Vantagem INT/SAB), Nova (Stealth/Desvantagem atq), Crescente (Resistência Nec/Rad)." }],
      18: [{ nome: "Fenômeno Lunar", desc: "Bônus: Efeito explosivo dependendo da fase (Cega/Cura, Dano Nec/Zero Speed, ou Teleporte/Resistência)." }]
    }
  },
  "Magia das Sombras (Shadow)": {
    magiasBonus: {
      nivel2: ["Escuridão"]
    },
    features: {
      3: [
        { nome: "Olhos do Escuro", desc: "Darkvision 120ft. Conjura Darkness com pontos (vê através dela)." },
        { nome: "Força da Sepultura", desc: "Se cair a 0 PV, faz Save CAR para ficar com 1 PV." }
      ],
      6: [{ nome: "Cão do Mau Agouro", desc: "Invoca lobo sombrio que persegue alvo e dá desvantagem nos saves dele." }],
      14: [{ nome: "Passo das Sombras", desc: "Bônus: Teleporte 120ft entre sombras." }],
      18: [{ nome: "Forma Umbral", desc: "Bônus (6 Pontos): Resistência a quase tudo e atravessa objetos." }]
    }
  },
  "Feitiçaria da Tempestade (Storm)": {
    features: {
      3: [
        { nome: "Falante do Vento", desc: "Fala Primordial." },
        { nome: "Magia Tempestuosa", desc: "Bônus após conjurar: Voo 10ft sem oportunidade." }
      ],
      6: [
        { nome: "Coração da Tempestade", desc: "Resistência Raio/Trovão. Ao conjurar magia desses tipos, causa dano em área." },
        { nome: "Guia da Tempestade", desc: "Controla chuva e vento ao redor." }
      ],
      14: [{ nome: "Fúria da Tempestade", desc: "Reação ao ser atingido: Dano Raio e empurra atacante 20ft." }],
      18: [{ nome: "Alma do Vento", desc: "Imunidade Raio/Trovão. Voo 60ft (pode compartilhar com grupo)." }]
    }
  }


};