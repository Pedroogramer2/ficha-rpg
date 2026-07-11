// src/data/racas.js
export const RACAS = {
  "Humano": {
    nome: "Humano",
    descricao: "Ambiciosos e engenhosos, humanos são conhecidos por sua adaptabilidade e determinação.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { nome: "Engenhoso (Resourceful)", desc: "Ao terminar um Descanso Longo, você ganha 1 Ponto de Inspiração Heroica." },
      { nome: "Habilidoso (Skillful)", desc: "Você ganha Proficiência em 1 perícia à sua escolha." },
      { nome: "Versátil (Versatile)", desc: "Você ganha 1 Talento de Origem (Origin Feat) à sua escolha." }
    ]
  },
  "Aasimar": {
    nome: "Aasimar",
    descricao: "Mortais com uma centelha dos Planos Superiores. Podem manifestar asas ou halos de luz.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Radiante", "Necrótico"],
    magiasBonus: {
      truques: [{ id: "light", nome: "Light" }]
    },
    tracos: [
      { nome: "Mãos Curativas", desc: "Ação Mágica (Toque): Cura PV igual a um rolar de d4s. Quantidade de d4s = seu Bônus de Proficiência. Usos: 1/Descanso Longo." },
      { nome: "Portador da Luz", desc: "Você conhece o truque Light. Você conjura usando Sabedoria, Inteligência ou Carisma (escolha na criação)." },
      { nome: "Revelação Celestial (Nível 3)", desc: "Ação Bônus: Transforma-se por 1 minuto (ou até usar Bônus para encerrar). Usos: Prof/Descanso Longo. Uma vez no seu turno, ao causar dano, dá dano extra (Proficiência). Tipo: Radiante (Asas/Luz) ou Necrótico (Manto). Escolha a forma ao ativar:\n• Asas Celestiais: Deslocamento de voo = caminhada.\n• Resplendor Interno: Emite Luz. Fim do seu turno, toda criatura a 10ft de você toma dano Radiante (igual sua Proficiência).\n• Manto Necrótico: Ao ativar, criaturas a 10ft (exceto aliados) fazem Save de Carisma (CD 8 + Carisma + Proficiência) ou ficam Amedrontadas (Frightened) até o fim do seu próximo turno." }
    ]
  },
  "Draconato (Dragonborn)": {
    nome: "Draconato (Dragonborn)",
    descricao: "Humanoides com traços dracônicos, sopro elemental e, eventualmente, voo.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Ancestralidade Dracônica",
      opcoes: [
        { nome: "Fogo (Ouro, Vermelho, Latão)", resistenciaExtra: "Fogo", tracoExtra: "Sopro: Dano de Fogo." },
        { nome: "Frio (Prata, Branco)", resistenciaExtra: "Frio", tracoExtra: "Sopro: Dano de Frio." },
        { nome: "Ácido (Cobre, Negro)", resistenciaExtra: "Ácido", tracoExtra: "Sopro: Dano Ácido." },
        { nome: "Elétrico (Azul, Bronze)", resistenciaExtra: "Elétrico", tracoExtra: "Sopro: Dano Elétrico." },
        { nome: "Veneno (Verde)", resistenciaExtra: "Veneno", tracoExtra: "Sopro: Dano Venenoso." }
      ] 
    },
    tracos: [
      { nome: "Arma de Sopro", desc: "Ação de Ataque: Você pode substituir UM dos seus ataques para exalar energia destrutiva. Escolha o formato na hora: Cone de 15ft ou Linha de 30ft. Criaturas na área fazem Save de Destreza (CD 8 + CON + Prof). Dano: 1d10 (Nv 1), 2d10 (Nv 5), 3d10 (Nv 11), 4d10 (Nv 17). Metade do dano num sucesso. Usos: Proficiência/Descanso Longo." },
      { nome: "Voo Dracônico (Nível 5)", desc: "Ação Bônus: Brotam asas espectrais. Ganha deslocamento de Voo igual seu deslocamento normal por 10 minutos. Usos: 1/Descanso Longo." }
    ]
  },
  "Anão": {
    nome: "Anão",
    descricao: "Robustos e resilientes, criados das pedras e forjados para durar.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "120 ft",
    resistenciasPadrao: ["Veneno"],
    tracos: [
      { nome: "Resiliência Anã", desc: "Vantagem em Testes de Resistência para evitar ou encerrar a condição Envenenado (Poisoned)." },
      { nome: "Robustez Anã", desc: "Seus Pontos de Vida máximos aumentam em 1 para cada nível de personagem que possuir." },
      { nome: "Sentido de Pedra (Stonecunning)", desc: "Ação Bônus: Ganha Sentido Sísmico (Tremorsense) 60ft por 10 minutos. Deve estar e permanecer sobre superfície de pedra natural. Usos: Proficiência/Descanso Longo." }
    ]
  },
  "Elfo": {
    nome: "Elfo",
    descricao: "Seres mágicos e longevos, ligados à natureza ou ao feérico.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Linhagem Élfica",
      opcoes: [
        { 
          nome: "Drow (Elfo Negro)", 
          visaoEscuroExtra: "120 ft", 
          tracoExtra: "Magia Drow: Faerie Fire (Nv 3) e Darkness (Nv 5). Usos: 1/Descanso Longo ou com Slots.",
          magiasBonus: {
            nivel1: [{ id: "faerie-fire", nome: "Faerie Fire" }],
            nivel2: [{ id: "darkness", nome: "Darkness" }]
          }
        },
        { 
          nome: "Alto Elfo", 
          tracoExtra: "Magia Superior: Escolha 1 Truque de Mago. Detect Magic (Nv 3) e Misty Step (Nv 5). Usos: 1/Descanso Longo ou com Slots.",
          magiasBonus: {
            nivel1: [{ id: "detect-magic", nome: "Detect Magic" }],
            nivel2: [{ id: "misty-step", nome: "Misty Step" }]
          }
        },
        { 
          nome: "Elfo da Floresta", 
          tracoExtra: "Passos da Floresta: Deslocamento vira 35ft. Magias: Longstrider (Nv 3) e Pass without Trace (Nv 5). Usos: 1/Descanso Longo ou com Slots.",
          magiasBonus: {
            nivel1: [{ id: "longstrider", nome: "Longstrider" }],
            nivel2: [{ id: "pass-without-trace", nome: "Pass without Trace" }]
          }
        }
      ]
    },
    tracos: [
      { nome: "Ancestralidade Feérica", desc: "Vantagem em Testes de Resistência para evitar ou encerrar a condição Enfeitiçado (Charmed)." },
      { nome: "Sentidos Aguçados", desc: "Proficiência na perícia Percepção (Perception), Intuição (Insight) ou Sobrevivência (Survival)." },
      { nome: "Transe", desc: "Não precisa dormir. Imune a magias de sono. Descanso Longo termina após 4 horas de meditação consciente." }
    ]
  },
  "Gnomo": {
    nome: "Gnomo",
    descricao: "Pequenos, criativos e cheios de energia mágica subterrânea ou florestal.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Linhagem Gnômica",
      opcoes: [
        { 
          nome: "Gnomo da Floresta", 
          tracoExtra: "Magia da Floresta: Minor Illusion (sempre) e Speak with Animals (apenas conjura, pode usar Slots). Atributo: Int, Sab ou Car.",
          magiasBonus: {
            truques: [{ id: "minor-illusion", nome: "Minor Illusion" }],
            nivel1: [{ id: "speak-with-animals", nome: "Speak with Animals" }]
          }
        },
        { 
          nome: "Gnomo das Rochas", 
          tracoExtra: "Engenhoqueiro: Truques Mending e Prestidigitação (apenas para criar minidispositivos mecânicos temporários). Atributo: Int, Sab ou Car.",
          magiasBonus: {
            truques: [{ id: "mending", nome: "Mending" }, { id: "prestidigitation", nome: "Prestidigitation" }]
          }
        }
      ]
    },
    tracos: [
      { nome: "Astúcia Gnômica", desc: "Vantagem em Testes de Resistência de Inteligência, Sabedoria e Carisma." }
    ]
  },
  "Golias (Goliath)": {
    nome: "Golias",
    descricao: "Descendentes de gigantes, fortes como a montanha e capazes de crescer em tamanho.",
    deslocamento: 35,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Ancestralidade Gigante",
      opcoes: [
        { nome: "Colina (Hill)", tracoExtra: "Tombo do Gigante: Ao acertar ataque corpo-a-corpo, alvo cai Deitado (Prone). Usos: Prof/Longo." },
        { nome: "Fogo (Fire)", tracoExtra: "Ataque de Fogo: Acerto soma +1d10 de Fogo. Usos: Prof/Longo." },
        { nome: "Frio (Frost)", tracoExtra: "Ataque Frio: Acerto toma +1d6 Frio e Deslocamento reduz em 10ft até o início do seu próximo turno. Usos: Prof/Longo." },
        { nome: "Nuvem (Cloud)", tracoExtra: "Passo de Nuvem: Ação Bônus, Teleporta 30ft sem oportunidade. Usos: Prof/Longo." },
        { nome: "Pedra (Stone)", tracoExtra: "Resistência de Pedra: Reação ao tomar dano. Reduz o dano em 1d12 + CON. Usos: Prof/Longo." },
        { nome: "Tempestade (Storm)", tracoExtra: "Reação à Dor: Reação ao tomar dano. Causador a 60ft faz Save de DES ou toma 1d8 Elétrico. Usos: Prof/Longo." }
      ]
    },
    tracos: [
      { nome: "Forma Grande (Nível 5)", desc: "Ação Bônus: Fica categoria Grande (Large). Seu alcance aumenta em 5ft e tem Vantagem em testes de Força. Duração 10 min. Usos: 1/Descanso Longo." },
      { nome: "Constituição Poderosa", desc: "Vantagem para escapar da condição Agarrado (Grappled). Conta como tamanho Grande para carregar/puxar peso." }
    ]
  },
  "Halfling": {
    nome: "Halfling",
    descricao: "Pequenos, ágeis e sobrenaturalmente sortudos. Amantes do conforto e da comunidade.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { nome: "Sorte (Lucky)", desc: "Se rolar 1 natural no d20 (Ataque, Teste ou Save), pode rerolar o dado. Você DEVE usar o novo resultado." },
      { nome: "Bravura", desc: "Vantagem em Testes de Resistência para evitar ou encerrar a condição Amedrontado (Frightened)." },
      { nome: "Agilidade Halfling", desc: "Você pode se mover através do espaço de criaturas que sejam Médias ou maiores que você." },
      { nome: "Furtividade Natural", desc: "Você tem Proficiência em Furtividade (Stealth). Pode tentar se esconder mesmo que esteja coberto apenas por aliados maiores." }
    ]
  },
  "Orc": {
    nome: "Orc",
    descricao: "Viajantes incansáveis abençoados com resistência e força inabaláveis.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "120 ft",
    resistenciasPadrao: [],
    tracos: [
      { nome: "Adrenalina (Adrenaline Rush)", desc: "Ação Bônus: Usa a ação Disparada (Dash). Imediatamente ganha PV Temporário igual ao seu Nível de personagem. Usos: Proficiência/Descanso Longo ou Curto." },
      { nome: "Resistência Implacável", desc: "Quando seus PV chegam a 0 (mas você não morre na hora), você pode cair a 1 PV em vez disso. Usos: 1/Descanso Longo." }
    ]
  },
  "Tiefling": {
    nome: "Tiefling",
    descricao: "Herdeiros de um legado planar inferior, com chifres e caudas.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    magiasBonus: {
      truques: [{ id: "thaumaturgy", nome: "Thaumaturgy" }]
    },
    escolhaRacial: {
      titulo: "Legado Infernal",
      opcoes: [
        { 
          nome: "Abissal", 
          resistenciaExtra: "Veneno", 
          tracoExtra: "Magia: Ray of Sickness (Nv 3) e Hold Person (Nv 5). Usos: 1/Longo ou Slots.",
          magiasBonus: {
            nivel1: [{ id: "ray-of-sickness", nome: "Ray of Sickness" }],
            nivel2: [{ id: "hold-person", nome: "Hold Person" }]
          }
        },
        { 
          nome: "Ctônico", 
          resistenciaExtra: "Necrótico", 
          tracoExtra: "Magia: False Life (Nv 3) e Ray of Enfeeblement (Nv 5). Usos: 1/Longo ou Slots.",
          magiasBonus: {
            nivel1: [{ id: "false-life", nome: "False Life" }],
            nivel2: [{ id: "ray-of-enfeeblement", nome: "Ray of Enfeeblement" }]
          }
        },
        { 
          nome: "Infernal", 
          resistenciaExtra: "Fogo", 
          tracoExtra: "Magia: Hellish Rebuke (Nv 3) e Darkness (Nv 5). Usos: 1/Longo ou Slots.",
          magiasBonus: {
            nivel1: [{ id: "hellish-rebuke", nome: "Hellish Rebuke" }],
            nivel2: [{ id: "darkness", nome: "Darkness" }]
          }
        }
      ]
    },
    tracos: [
      { nome: "Presença de Outro Mundo", desc: "Você conhece o truque Thaumaturgy. Suas magias bônus desta raça usam Int, Sab ou Car (sua escolha)." }
    ]
  },
  "Dhampir": {
    nome: "Dhampir",
    descricao: "Pessoas vivas que possuem proeza vampírica mas são amaldiçoadas com uma fome macabra. Muitos surgem de encontros com vampiros ou barganhas necromânticas.",
    deslocamento: 35,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Necrótico"],
    tracos: [
      { 
        nome: "Escalada de Aranha", 
        desc: "Você tem deslocamento de escalada igual ao seu deslocamento normal. No nível 3, pode mover-se para cima, para baixo e por paredes verticais e tetos com as mãos livres." 
      },
      { 
        nome: "Mordida Vampírica", 
        desc: "Seu Ataque Desarmado pode ser uma mordida (1d4 + CON dano Perfurante). Ao causar dano (exceto em Construtos/Mortos-vivos), você pode se Empoderar: recuperar PV igual ao dano OU ganhar um bônus num próximo teste/ataque igual ao dano (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Sangue-Bruxo (Hexblood)": {
    nome: "Sangue-Bruxo (Hexblood)",
    descricao: "Indivíduos infundidos com magia feérica devido a energias místicas ou bruxaria misteriosa (como barganhas com megeras).",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    magiasBonus: {
      nivel1: [{ id: "disguise-self", nome: "Disguise Self" }, { id: "hex", nome: "Hex" }]
    },
    tracos: [
      { 
        nome: "Símbolo Macabro (Eerie Token)", 
        desc: "Ação Bônus: Cria um token mágico inofensivo (como um cacho de cabelo). Pode mandar Mensagem Distante (25 palavras) telepaticamente para quem segurá-lo (10 milhas) OU Visão Remota (Ação Mágica, vê e ouve a partir do token por 1 min). 1x/Descanso Longo." 
      }
    ]
  },
  "Lupino (Lupin)": {
    nome: "Lupino (Lupin)",
    descricao: "Nascidos de encontros com lobisomens onde a maldição não se instalou totalmente. Presos em uma forma híbrida, possuem força bestial e um uivo aterrorizante.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Salto Feroz", 
        desc: "Seu Ataque Desarmado causa dano Cortante. 1x por turno, ao acertar esse ataque, você pode causar o Dano e aplicar o efeito de Empurrar (Shove) simultaneamente." 
      },
      { 
        nome: "Uivo Aterrorizante", 
        desc: "Ação Bônus: Inimigos a 15ft fazem Save SAB (CD 8 + CON + Prof). Se falharem, têm Desvantagem em ataques e saves até o início do seu próximo turno. (Usos = Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Instintos de Lobisomem", 
        desc: "Você ganha proficiência em Percepção, Furtividade ou Sobrevivência (adicione a proficiência manualmente na aba de perícias)." 
      }
    ]
  },
  "Renascido (Reborn)": {
    nome: "Renascido (Reborn)",
    descricao: "Indivíduos que morreram, mas inexplicavelmente ainda vivem. Alguns exibem cicatrizes de fins fatais, outros são maravilhas da magia costurados juntos.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Resistência Sobrenatural",
      opcoes: [
        { nome: "Frio", resistenciaExtra: "Frio", tracoExtra: "Resistência a dano Gélido adquirida." },
        { nome: "Necrótico", resistenciaExtra: "Necrótico", tracoExtra: "Resistência a dano Necrótico adquirida." },
        { nome: "Veneno", resistenciaExtra: "Veneno", tracoExtra: "Resistência a dano Venenoso adquirida." }
      ]
    },
    tracos: [
      { 
        nome: "Fugiu da Morte", 
        desc: "Vantagem em Testes de Resistência contra a Morte (Death Saves)." 
      },
      { 
        nome: "Imortal (Everlasting)", 
        desc: "Não sofre exaustão por fome, sede ou sufocamento. Não precisa dormir e é imune a sono mágico. Descanso longo concluído em 4h num estado inativo, mas consciente." 
      },
      { 
        nome: "Conhecimento de Vida Passada", 
        desc: "Ganha proficiência em 1 perícia à sua escolha. Ao falhar em um teste, pode somar 1d6 ao d20 (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Metamorfo (Changeling)": {
    nome: "Metamorfo (Changeling)",
    descricao: "Com aparências em constante mudança, os metamorfos residem em muitas sociedades sem serem detectados, podendo adotar qualquer rosto de forma sobrenatural graças à sua conexão com o mundo feérico.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Instintos de Metamorfo", 
        desc: "Você ganha proficiência em 2 perícias entre: Enganação, Intuição, Intimidação, Performance ou Persuasão." 
      },
      { 
        nome: "Metamorfo (Shape-Shifter)", 
        desc: "Ação: Muda sua aparência, tamanho (Médio/Pequeno) e voz. Você deve adotar uma forma com o mesmo arranjo básico de membros que o seu. Enquanto estiver transformado, você tem Vantagem em testes de Carisma." 
      }
    ]
  },
  "Kalashtar": {
    nome: "Kalashtar",
    descricao: "Criados a partir da união da humanidade com espíritos renegados chamados quori, do plano dos sonhos. Possuem habilidades psiônicas menores e olhos que brilham intensamente sob emoção.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: ["Psíquico"],
    tracos: [
      { 
        nome: "Mente Dupla", 
        desc: "Você tem Vantagem em Testes de Resistência de Sabedoria e Carisma." 
      },
      { 
        nome: "Elo Mental", 
        desc: "Você tem telepatia com um alcance igual a 10 vezes o seu Nível em pés. Como uma Ação Mágica, pode permitir que o alvo responda telepaticamente por 1 hora." 
      },
      { 
        nome: "Separado dos Sonhos", 
        desc: "Você é imune à magia Sonho (Dream). Além disso, ao terminar um Descanso Longo, ganha proficiência em 1 perícia temporária à sua escolha até o próximo descanso." 
      }
    ]
  },
  "Khoravar (Meio-Elfo)": {
    nome: "Khoravar (Meio-Elfo)",
    descricao: "Descendentes de humanos e elfos que desenvolveram suas próprias comunidades, orgulhosos de sua herança e frequentemente agindo como diplomatas ou pontes entre culturas.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    magiasBonus: {
      truques: [{ id: "friends", nome: "Friends" }]
    },
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em Testes de Resistência contra a condição Enfeitiçado (Charmed)." 
      },
      { 
        nome: "Dádiva Feérica", 
        desc: "Conhece o truque Amizade (Friends). Após um Descanso Longo, pode trocá-lo por outro truque de Clérigo, Druida ou Mago." 
      },
      { 
        nome: "Resiliência à Letargia", 
        desc: "Se falhar num Save contra ficar Inconsciente, pode transformá-lo num Sucesso. 1 uso por cada 1d4 Descansos Longos." 
      },
      { 
        nome: "Versatilidade em Perícia", 
        desc: "Após cada Descanso Longo, você ganha proficiência temporária em 1 perícia ou ferramenta à sua escolha." 
      }
    ]
  },
  "Shifter": {
    nome: "Shifter",
    descricao: "Humanoides com aspectos bestiais que descendem de pessoas tocadas pela licantropia. Podem realçar suas feições animais temporariamente em um processo chamado 'Shifting'.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Transformação Animal (Shifting)",
      opcoes: [
        { nome: "Pele de Besta (Beasthide)", tracoExtra: "Na transformação: +1d6 PV Temp extras e +1 de bônus na CA." },
        { nome: "Dente Longo (Longtooth)", tracoExtra: "Na transformação: Pode atacar com presas (1d6 + FOR Perfurante) como Ação Bônus." },
        { nome: "Passada Ágil (Swiftstride)", tracoExtra: "Na transformação: +10ft de Deslocamento. Reação se inimigo parar a 5ft: Move 10ft sem oportunidade." },
        { nome: "Caçada Selvagem (Wildhunt)", tracoExtra: "Na transformação: Vantagem em testes de Sabedoria. Inimigos a 30ft não têm vantagem contra você (a não ser que incapacitado)." }
      ]
    },
    tracos: [
      { 
        nome: "Instintos Bestiais", 
        desc: "Proficiência em Acrobacia, Atletismo, Intimidação ou Sobrevivência à sua escolha." 
      },
      { 
        nome: "Transformação (Shifting)", 
        desc: "Ação Bônus: Assume forma bestial por 1 min. Ganha PV Temporário igual a 2x sua Proficiência. Ativa seu benefício da escolha racial. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Forjado Bélico (Warforged)": {
    nome: "Forjado Bélico (Warforged)",
    descricao: "Seres mecânicos senscientes construídos de madeira e metal originalmente como armas de guerra. Podem sentir dor e emoção, buscando cultivar sua própria individualidade.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: ["Veneno"],
    tracos: [
      { 
        nome: "Resiliência de Construto", 
        desc: "Vantagem em Testes de Resistência contra ficar Envenenado." 
      },
      { 
        nome: "Proteção Integrada", 
        desc: "Você ganha +1 de bônus na CA. Armaduras vestidas não podem ser removidas contra sua vontade." 
      },
      { 
        nome: "Descanso da Sentinela", 
        desc: "Não dorme e não é afetado por sono mágico. Descanso longo leva 6 horas inativo, imóvel, porém totalmente consciente." 
      },
      { 
        nome: "Design Especializado & Incansável", 
        desc: "Não ganha exaustão por fome, sede ou sufocamento. Você também ganha 1 proficiência em perícia e 1 em ferramenta." 
      }
    ]
  },
  "Boggart": {
    nome: "Boggart",
    descricao: "Pequenos goblinoides encontrados no reino de Lorwyn-Shadowmoor. Possuem características bestiais variadas, chifres e focinhos de animais, e vivem em comunidades sem leis rigorosas.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Você tem Vantagem em Testes de Resistência contra a condição Enfeitiçado (Charmed)." 
      },
      { 
        nome: "Fúria do Pequeno", 
        desc: "Quando você causa dano com um ataque ou magia a uma criatura maior que você, pode causar dano extra igual ao seu Bônus de Proficiência. (Usos = Proficiência / Descanso Longo, máximo de 1 vez por turno)." 
      },
      { 
        nome: "Fuga Ágil", 
        desc: "Você pode realizar a ação de Desengajar ou Esconder-se como uma Ação Bônus em cada um dos seus turnos." 
      }
    ]
  },
  "Fada (Faerie)": {
    nome: "Fada (Faerie)",
    descricao: "Conhecidas por suas travessuras, fadas se assemelham a insetos com traços humanoides, possuindo antenas e asas. Nascem de flores e possuem magia inata.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    magiasBonus: {
      truques: [{ id: "druidcraft", nome: "Druidcraft" }],
      nivel1: [{ id: "faerie-fire", nome: "Faerie Fire" }],
      nivel2: [{ id: "enlarge-reduce", nome: "Enlarge/Reduce" }]
    },
    escolhaRacial: {
      titulo: "Origem da Fada",
      opcoes: [
        { nome: "Fada de Lorwyn", tracoExtra: "Você é uma fada tradicional que serve à Rainha Oura. (Sem visão no escuro)." },
        { nome: "Fada de Shadowmoor", visaoEscuroExtra: "120 ft", tracoExtra: "Nascida nas trevas de Shadowmoor, você adquire Visão no Escuro de 120 pés." }
      ]
    },
    tracos: [
      { 
        nome: "Voo", 
        desc: "Graças às suas asas, você tem um Deslocamento de Voo de 30ft. Você não pode usar esse voo se estiver usando armadura média ou pesada." 
      }
    ]
  },
  "Flamekin": {
    nome: "Flamekin",
    descricao: "Pessoas feitas de fogo e pedra, com forte conexão com o mundo natural. Seus corpos irradiam chamas mágicas inofensivas, mas podem conjurar chamas ardentes para lutar.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Fogo"],
    magiasBonus: {
      truques: [{ id: "produce-flame", nome: "Produce Flame" }],
      nivel1: [{ id: "burning-hands", nome: "Burning Hands" }],
      nivel2: [{ id: "flame-blade", nome: "Flame Blade" }]
    },
    tracos: [
      { 
        nome: "Alcançar a Chama (Reach to the Blaze)", 
        desc: "Você conhece feitiços baseados em fogo e os conjura usando Inteligência, Sabedoria ou Carisma como atributo de conjuração." 
      }
    ]
  },
  "Metamorfo de Lorwyn (Lorwyn Changeling)": {
    nome: "Metamorfo de Lorwyn",
    descricao: "Metamorfos carismáticos capazes de imitar grosseiramente formas de criaturas e plantas. Suas transformações são tão lúdicas e rudimentares que muitos acham o efeito inexplicavelmente charmoso.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "120 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Imitador Encantador", 
        desc: "Você ganha proficiência na perícia Performance." 
      },
      { 
        nome: "Moldar-se (Shape Self)", 
        desc: "Ação: Você pode remodelar seu corpo para uma forma Humanoide de 2 pernas ou Bestial de 4 pernas. Na forma humanoide, pode vestir armaduras e roupas do seu tamanho." 
      },
      { 
        nome: "Movimento Imprevisível", 
        desc: "Quando você rolar Iniciativa (e não tiver Desvantagem na rolagem), você pode usar sua Reação para realizar a ação de Disparada (Dash)." 
      }
    ]
  },
  "Rimekin": {
    nome: "Rimekin",
    descricao: "Descendentes de flamekin que abraçaram a lógica fria, transformando suas chamas em gelo espiritual. Suas chamas brilham em azul gelado e cobrem suas armas com geada inofensiva.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Frio"],
    magiasBonus: {
      truques: [{ id: "ray-of-frost", nome: "Ray of Frost" }],
      nivel1: [{ id: "ice-knife", nome: "Ice Knife" }],
      nivel2: [{ id: "flame-blade", nome: "Flame Blade" }]
    },
    tracos: [
      { 
        nome: "Magia de Fogo Frio", 
        desc: "Você conjura magias de gelo (Int, Sab ou Car). Detalhe vital: Quando você conjura a magia Lâmina Flamejante (Flame Blade) através deste traço, a magia causa dano Gélido (Cold) em vez de dano de Fogo." 
      }
    ]
  },
  "Aarakocra": {
    nome: "Aarakocra",
    descricao: "Um povo alado originário do Plano Elemental do Ar. Assemelham-se a grandes pássaros humanoides, serviam antigos duques do vento e ainda dominam os ares.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    magiasBonus: {
      nivel2: [{ id: "gust-of-wind", nome: "Gust of Wind" }]
    },
    tracos: [
      { 
        nome: "Voo", 
        desc: "Graças às suas asas, você tem deslocamento de voo de 30ft. Você não pode usar esse voo se estiver usando armadura média ou pesada." 
      },
      { 
        nome: "Garras", 
        desc: "Você possui garras em seus pés. Pode usá-las para fazer ataques desarmados, causando 1d6 + FOR de dano Cortante." 
      }
    ]
  },
  "Metamorfo (Multiverso)": {
    nome: "Metamorfo (Multiverso)",
    descricao: "Com aparências em constante mudança, os metamorfos adotam rostos e identidades (personas) de forma sobrenatural, canalizando a essência de sua ancestralidade feérica.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Instintos de Metamorfo", 
        desc: "Você ganha proficiência em 2 perícias à sua escolha entre: Enganação, Intuição, Intimidação, Performance ou Persuasão." 
      },
      { 
        nome: "Metamorfo (Shapechanger)", 
        desc: "Ação: Muda sua aparência, tamanho (Médio/Pequeno) e voz. Permanece na nova forma até usar outra ação para reverter ou até morrer (roupas e atributos não mudam)." 
      }
    ]
  },
  "Gnomo Profundo (Svirfneblin)": {
    nome: "Gnomo Profundo (Svirfneblin)",
    descricao: "Nativos do Subterrâneo (Underdark), são imbuídos com a magia desse reino, sendo mestres da camuflagem e capazes de passar despercebidos nas sombras.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: "120 ft",
    resistenciasPadrao: [],
    magiasBonus: {
      nivel1: [{ id: "disguise-self", nome: "Disguise Self" }],
      nivel3: [{ id: "nondetection", nome: "Nondetection" }]
    },
    tracos: [
      { 
        nome: "Resistência Mágica Gnômica", 
        desc: "Você tem Vantagem em Testes de Resistência de Inteligência, Sabedoria e Carisma contra magias." 
      },
      { 
        nome: "Camuflagem Svirfneblin", 
        desc: "Você tem Vantagem em testes de Destreza (Furtividade). (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Duergar": {
    nome: "Duergar",
    descricao: "Anões cujos ancestrais foram transformados por séculos no Subterrâneo e por experimentos de devoradores de mentes, ganhando formidáveis poderes psiônicos.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "120 ft",
    resistenciasPadrao: ["Veneno"],
    magiasBonus: {
      nivel2: [{ id: "enlarge-reduce", nome: "Enlarge/Reduce" }, { id: "invisibility", nome: "Invisibility" }]
    },
    tracos: [
      { 
        nome: "Resiliência Anã", 
        desc: "Vantagem em Testes de Resistência contra a condição Envenenado." 
      },
      { 
        nome: "Fortitude Psiônica", 
        desc: "Você tem Vantagem em Testes de Resistência para evitar ou acabar com as condições Enfeitiçado (Charmed) ou Atordoado (Stunned) em você." 
      }
    ]
  },
  "Eladrin": {
    nome: "Eladrin",
    descricao: "Elfos da Agrestia das Fadas (Feywild), um reino de beleza perigosa. Eles ressoam com as emoções capturadas naquele plano na forma de estações do ano.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Estação do Eladrin",
      opcoes: [
        { nome: "Outono (Paz e Boa Vontade)", tracoExtra: "Passo Feérico (Outono): Após teleportar, até 2 criaturas a 10ft fazem Save SAB (CD 8 + Prof + Atributo Mágico) ou ficam Enfeitiçadas por 1 min." },
        { nome: "Inverno (Contemplação e Dor)", tracoExtra: "Passo Feérico (Inverno): Antes de teleportar, 1 criatura a 5ft faz Save SAB ou fica Amedrontada até o fim do seu próximo turno." },
        { nome: "Primavera (Alegria e Celebração)", tracoExtra: "Passo Feérico (Primavera): Em vez de teleportar a si mesmo, você pode tocar um aliado a 5ft e teleportá-lo para 30ft de distância." },
        { nome: "Verão (Audácia e Agressão)", tracoExtra: "Passo Feérico (Verão): Após teleportar, você causa dano de Fogo igual ao seu bônus de Proficiência em cada criatura à sua escolha a 5ft de onde você chegou." }
      ]
    },
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condição Enfeitiçado." 
      },
      { 
        nome: "Sentidos Aguçados", 
        desc: "Você tem proficiência na perícia Percepção." 
      },
      { 
        nome: "Transe", 
        desc: "Descanso longo em 4h de meditação consciente. Ao terminar, você pode mudar sua Estação e ganha proficiência em 2 armas ou ferramentas de sua escolha até o próximo descanso." 
      },
      { 
        nome: "Passo Feérico (Fey Step)", 
        desc: "Ação Bônus: Teleporta magicamente até 30ft para um espaço desocupado. O efeito extra depende da sua Estação. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Fada (Multiverso)": {
    nome: "Fada (Multiverso)",
    descricao: "Um povo minúsculo imbuído com a magia do Feywild. Assemelham-se a pequenos elfos com asas de insetos (ou folhas, pássaros) e características feéricas místicas.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    magiasBonus: {
      truques: [{ id: "druidcraft", nome: "Druidcraft" }],
      nivel1: [{ id: "faerie-fire", nome: "Faerie Fire" }],
      nivel2: [{ id: "enlarge-reduce", nome: "Enlarge/Reduce" }]
    },
    tracos: [
      { 
        nome: "Voo", 
        desc: "Graças às suas asas, você tem deslocamento de voo de 30ft. Você não pode usar esse voo se estiver usando armadura média ou pesada." 
      }
    ]
  },
  "Firbolg": {
    nome: "Firbolg",
    descricao: "Primos distantes dos gigantes, são seres pacíficos e extremamente conectados com as florestas primitivas do multiverso, possuindo magia ligada à ofuscação e natureza.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    magiasBonus: {
      nivel1: [{ id: "detect-magic", nome: "Detect Magic" }, { id: "disguise-self", nome: "Disguise Self" }]
    },
    tracos: [
      { 
        nome: "Passo Oculto", 
        desc: "Ação Bônus: Você fica magicamente invisível até o início do seu próximo turno, ou até atacar, causar dano ou forçar um save. (Usos = Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Porte Poderoso", 
        desc: "Você conta como uma categoria de tamanho maior para determinar capacidade de carga e peso que pode empurrar, arrastar ou levantar." 
      },
      { 
        nome: "Fala das Feras e Folhas", 
        desc: "Pode se comunicar limitadamente com Bestas e Plantas. Eles entendem você, mas você não os entende. Você tem Vantagem em testes de Carisma para influenciá-los." 
      }
    ]
  },
  "Genasi do Ar (Air Genasi)": {
    nome: "Genasi do Ar",
    descricao: "Descendentes de Djinns (gênios do ar). Suas peles e cabelos refletem os ventos, nuvens e tempestades do Plano Elemental do Ar.",
    deslocamento: 35,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Elétrico"],
    magiasBonus: {
      truques: [{ id: "shocking-grasp", nome: "Shocking Grasp" }],
      nivel1: [{ id: "feather-fall", nome: "Feather Fall" }],
      nivel2: [{ id: "levitate", nome: "Levitate" }]
    },
    tracos: [
      { 
        nome: "Fôlego Interminável", 
        desc: "Você pode prender a respiração indefinidamente enquanto não estiver incapacitado." 
      },
      { 
        nome: "Misturar-se com o Vento", 
        desc: "Você conhece feitiços do ar (Int, Sab ou Car). Você pode conjurar os feitiços desta característica sem componentes materiais." 
      }
    ]
  },
  "Genasi da Terra (Earth Genasi)": {
    nome: "Genasi da Terra",
    descricao: "Descendentes de Dao (gênios da terra). Eles herdam a força inabalável de seus ancestrais e trazem gemas brilhantes, pó de cristal ou rachaduras de luz na pele.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    magiasBonus: {
      truques: [{ id: "blade-ward", nome: "Blade Ward" }],
      nivel2: [{ id: "pass-without-trace", nome: "Pass without Trace" }]
    },
    tracos: [
      { 
        nome: "Caminhar na Terra", 
        desc: "Você pode se mover por terreno difícil sem gastar movimento extra se estiver usando seu deslocamento de caminhada no chão ou piso." 
      },
      { 
        nome: "Fundir-se à Pedra", 
        desc: "Você pode conjurar seu truque 'Proteção contra Lâminas' normalmente E também como uma Ação Bônus (Usos como bônus = Proficiência / Descanso Longo). Magias desta raça não exigem componentes materiais." 
      }
    ]
  },
  "Genasi do Fogo (Fire Genasi)": {
    nome: "Genasi do Fogo",
    descricao: "Descendentes de Efreeti (gênios do fogo). Canalizam a natureza flamejante de sua herança, tendo peles cor de carvão ou brasa e cabelos como fumaça ou fogo.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Fogo"],
    magiasBonus: {
      truques: [{ id: "produce-flame", nome: "Produce Flame" }],
      nivel1: [{ id: "burning-hands", nome: "Burning Hands" }],
      nivel2: [{ id: "flame-blade", nome: "Flame Blade" }]
    },
    tracos: [
      { 
        nome: "Alcançar a Chama", 
        desc: "Você conhece magias baseadas em fogo (Int, Sab ou Car). As magias de nível superior recebidas por essa raça não requerem componentes materiais." 
      }
    ]
  },
  "Genasi da Água (Water Genasi)": {
    nome: "Genasi da Água",
    descricao: "Descendentes de Marids (gênios da água). Adaptados perfeitamente à vida aquática, com pele que reflete a luz como gotas de água ou escamas invisíveis.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Ácido"],
    magiasBonus: {
      truques: [{ id: "acid-splash", nome: "Acid Splash" }],
      nivel1: [{ id: "create-or-destroy-water", nome: "Create or Destroy Water" }],
      nivel3: [{ id: "water-walk", nome: "Water Walk" }]
    },
    tracos: [
      { 
        nome: "Anfíbio", 
        desc: "Você possui Deslocamento de Natação igual ao seu deslocamento de caminhada. Você pode respirar ar e água." 
      },
      { 
        nome: "Chamado da Onda", 
        desc: "Você conhece feitiços oceânicos (Int, Sab ou Car). As magias de nível superior recebidas por essa raça não requerem componentes materiais." 
      }
    ]
  },
  "Githyanki": {
    nome: "Githyanki",
    descricao: "Viajantes do Plano Astral, treinados ao longo de eras. Romperam com os Githzerai para formar uma sociedade focada em proeza marcial e conhecimento cósmico.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: ["Psíquico"],
    magiasBonus: {
      truques: [{ id: "mage-hand", nome: "Mage Hand" }],
      nivel1: [{ id: "jump", nome: "Jump" }],
      nivel2: [{ id: "misty-step", nome: "Misty Step" }]
    },
    tracos: [
      { 
        nome: "Conhecimento Astral", 
        desc: "Você acessa um reservatório místico do Plano Astral. Após cada Descanso Longo, ganha proficiência em 1 perícia e 1 arma ou ferramenta à sua escolha (dura até o próximo descanso)." 
      },
      { 
        nome: "Psiônicos Githyanki", 
        desc: "Você conjura magias psiônicas sem componentes materiais (Int, Sab ou Car). O seu truque Mãos Mágicas é INVISÍVEL ao ser conjurado por este traço." 
      }
    ]
  },
  "Githzerai": {
    nome: "Githzerai",
    descricao: "Habitantes do Caos Mutável de Limbo. Focados no poder mental e na disciplina rígida para estabilizar a desordem, forjando defesas psíquicas impenetráveis.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: ["Psíquico"],
    magiasBonus: {
      truques: [{ id: "mage-hand", nome: "Mage Hand" }],
      nivel1: [{ id: "shield", nome: "Shield" }],
      nivel2: [{ id: "detect-thoughts", nome: "Detect Thoughts" }]
    },
    tracos: [
      { 
        nome: "Disciplina Mental", 
        desc: "Suas defesas psíquicas inatas concedem Vantagem em Testes de Resistência para evitar ou encerrar as condições Enfeitiçado (Charmed) e Amedrontado (Frightened)." 
      },
      { 
        nome: "Psiônicos Githzerai", 
        desc: "Você conjura magias psiônicas sem componentes materiais (Int, Sab ou Car). O seu truque Mãos Mágicas é INVISÍVEL ao ser conjurado por este traço." 
      }
    ]
  },
  "Golias (Goliath - MotM)": {
    nome: "Golias (Goliath - MotM)",
    descricao: "Descendentes distantes dos gigantes, infundidos com a essência sobrenatural das montanhas mais altas. Possuem pele rochosa e força estrondosa.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: ["Frio"],
    tracos: [
      { 
        nome: "Pequeno Gigante", 
        desc: "Você ganha proficiência em Atletismo e conta como uma categoria de tamanho maior para determinar capacidade de carga, e peso que pode empurrar, puxar ou levantar." 
      },
      { 
        nome: "Nascido na Montanha", 
        desc: "Aclimatado naturalmente a altas atitudes (incluindo acima de 20.000 pés)." 
      },
      { 
        nome: "Resistência de Pedra", 
        desc: "Reação: Quando você sofre dano, pode rolar 1d12 + seu Mod. de Constituição e subtrair esse total do dano recebido. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Harengon": {
    nome: "Harengon",
    descricao: "Povo-coelho bípede originário da Agrestia das Fadas (Feywild). Incorporam a liberdade, possuindo pernas potentes, sentidos aguçados e uma famosa sorte feérica.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Gatilho de Lebre (Hare-Trigger)", 
        desc: "Você pode adicionar seu Bônus de Proficiência a todas as suas rolagens de Iniciativa." 
      },
      { 
        nome: "Sentidos Leporinos", 
        desc: "Você ganha proficiência na perícia Percepção." 
      },
      { 
        nome: "Trabalho de Pés Sortudo", 
        desc: "Reação: Se falhar num Save de Destreza, pode rolar 1d4 e somar ao resultado, potencialmente transformando em sucesso. Não pode usar se estiver Deitado ou deslocamento 0." 
      },
      { 
        nome: "Salto de Coelho", 
        desc: "Ação Bônus: Salta uma distância (em pés) igual a 5 vezes o seu Bônus de Proficiência sem provocar ataques de oportunidade. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Kenku": {
    nome: "Kenku",
    descricao: "Um povo com traços de corvo, abençoados com observação aguçada e memórias sobrenaturalmente precisas. Geralmente encontrados no Pendor das Sombras (Shadowfell) ou no Plano Material.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Duplicação Especialista", 
        desc: "Você tem Vantagem em testes de habilidade para produzir uma duplicata exata de uma escrita ou artesanato que você já viu." 
      },
      { 
        nome: "Lembrança Kenku", 
        desc: "Você ganha proficiência em 2 perícias à sua escolha. Além disso, ao fazer um teste com qualquer perícia que seja proficiente, você pode se dar Vantagem antes de rolar o d20 (Usos = Bônus de Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Mímica", 
        desc: "Você pode imitar com precisão sons e vozes que já ouviu. Para descobrirem a farsa, precisam passar num teste de Intuição (Sabedoria) contra a sua CD (8 + Proficiência + Mod. Carisma)." 
      }
    ]
  },
  "Locathah": {
    nome: "Locathah",
    descricao: "Um povo-peixe orgulhoso e resiliente. Sobreviveram a guerras e escravidão, formando tribos ao longo das costas, caçando tanto na terra quanto debaixo d'água.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Armadura Natural", 
        desc: "Você tem pele escamosa e dura. Sem usar armadura, sua CA é 12 + seu Mod. de Destreza. Você ainda pode usar escudos normalmente." 
      },
      { 
        nome: "Observador e Atlético", 
        desc: "Você ganha proficiência nas perícias Atletismo e Percepção." 
      },
      { 
        nome: "Vontade do Leviatã", 
        desc: "Você tem Vantagem em Testes de Resistência para evitar ser Enfeitiçado, Amedrontado, Paralisado, Envenenado, Atordoado ou colocado para Dormir." 
      },
      { 
        nome: "Anfíbio Limitado", 
        desc: "Você possui Deslocamento de Natação de 30ft e respira ar e água. No entanto, precisa ser submerso na água pelo menos uma vez a cada 4 horas para não sufocar." 
      }
    ]
  },
  "Owlin": {
    nome: "Owlin",
    descricao: "Parentes distantes das corujas gigantes da Agrestia das Fadas (Feywild). Variam de pequenos e fofinhos a majestosos, com asas nas costas e penas extremamente silenciosas.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "120 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Voo", 
        desc: "Graças às suas asas, você tem deslocamento de voo de 30ft. Você não pode usar esse voo se estiver usando armadura média ou pesada." 
      },
      { 
        nome: "Penas Silenciosas", 
        desc: "Você ganha proficiência na perícia Furtividade." 
      }
    ]
  },
  "Sátiro (Satyr)": {
    nome: "Sátiro (Satyr)",
    descricao: "Originários do Feywild, os sátiros prosperam na energia da alegria. Assemelham-se a elfos da cintura para cima, mas possuem pernas, cascos e chifres de bode.",
    deslocamento: 35,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Chifrada", 
        desc: "Você pode usar sua cabeça e chifres para fazer ataques desarmados, causando 1d6 + FOR de dano Contundente." 
      },
      { 
        nome: "Resistência Mágica", 
        desc: "Você tem Vantagem em Testes de Resistência contra magias." 
      },
      { 
        nome: "Saltos Alegres", 
        desc: "Ao fazer um salto em distância ou em altura, você pode rolar 1d8 e somar o resultado à quantidade de pés cobertos pelo salto (mesmo sem pegar impulso)." 
      },
      { 
        nome: "Folião", 
        desc: "Você ganha proficiência nas perícias Performance e Persuasão, além de proficiência com um instrumento musical da sua escolha." 
      }
    ]
  },
  "Elfo do Mar (Sea Elf)": {
    nome: "Elfo do Mar (Sea Elf)",
    descricao: "Elfos que se apaixonaram pela beleza do oceano e passaram a habitar os mares de muitos mundos, bem como o Plano Elemental da Água.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Frio"],
    tracos: [
      { 
        nome: "Filho do Mar", 
        desc: "Você possui Deslocamento de Natação de 30ft, pode respirar ar e água e possui Resistência a dano Gélido (Cold)." 
      },
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condição Enfeitiçado." 
      },
      { 
        nome: "Amigo do Mar", 
        desc: "Você pode comunicar ideias simples a qualquer Besta que possua deslocamento de natação." 
      },
      { 
        nome: "Sentidos Aguçados", 
        desc: "Você tem proficiência na perícia Percepção." 
      },
      { 
        nome: "Transe", 
        desc: "Descanso longo em 4h de meditação. Ao terminar, ganha proficiência temporária em 2 armas ou ferramentas de sua escolha até o próximo descanso." 
      }
    ]
  },
  "Shadar-Kai": {
    nome: "Shadar-Kai",
    descricao: "Elfos do Pendor das Sombras (Shadowfell), servos da Rainha dos Corvos. Transformados pela energia sombria do plano, vivem em um estado entre a vida e a morte.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Necrótico"],
    tracos: [
      { 
        nome: "Bênção da Rainha dos Corvos", 
        desc: "Ação Bônus: Teleporta magicamente até 30ft. A partir do Nível 3, ao usar este teleporte, você fica translúcido e ganha Resistência a TODOS os tipos de dano até o início do seu próximo turno. (Usos = Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condição Enfeitiçado." 
      },
      { 
        nome: "Sentidos Aguçados", 
        desc: "Você tem proficiência na perícia Percepção." 
      },
      { 
        nome: "Transe", 
        desc: "Descanso longo em 4h de meditação. Ao terminar, ganha proficiência temporária em 2 armas ou ferramentas de sua escolha até o próximo descanso." 
      }
    ]
  },
  "Tabaxi": {
    nome: "Tabaxi",
    descricao: "Povo-gato criado pelo Senhor dos Gatos. Famosos pela sua curiosidade natural, reflexos inigualáveis e agilidade fenomenal.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Garras de Gato", 
        desc: "Você possui Deslocamento de Escalada de 30ft. Você pode usar suas garras para fazer ataques desarmados, causando 1d6 + FOR de dano Cortante." 
      },
      { 
        nome: "Talento Felino", 
        desc: "Você ganha proficiência nas perícias Percepção e Furtividade." 
      },
      { 
        nome: "Agilidade Felina", 
        desc: "No seu turno de combate, você pode dobrar seu deslocamento de movimento até o fim do turno. Após usar esse traço, você não pode usá-lo de novo até passar 1 turno sem se mover (0 ft)." 
      }
    ]
  },
  "Tortle": {
    nome: "Tortle",
    descricao: "Povo-tartaruga místico com um profundo senso de conexão natural. Viajam de forma nômade pelas costas e mares dizendo: 'Nós vestimos nossos lares nas nossas costas.'",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Garras", 
        desc: "Você pode usar suas garras para fazer ataques desarmados, causando 1d6 + FOR de dano Cortante." 
      },
      { 
        nome: "Prender a Respiração", 
        desc: "Você pode prender sua respiração por até 1 hora." 
      },
      { 
        nome: "Armadura Natural", 
        desc: "Seu casco te concede CA 17 base (Des não afeta). Você não pode vestir armaduras de nenhum tipo, mas ainda pode aplicar o bônus de escudos." 
      },
      { 
        nome: "Intuição Natural", 
        desc: "Você ganha proficiência em 1 perícia: Adestrar Animais, Medicina, Natureza, Percepção, Furtividade ou Sobrevivência." 
      },
      { 
        nome: "Defesa de Casco", 
        desc: "Ação: Você se recolhe no casco. Até sair, você ganha +4 na CA e Vantagem em saves de FOR e CON. Você fica Deitado, seu deslocamento cai para 0, você tem Desvantagem em saves de DES, não pode tomar reações e a única ação possível é usar uma Ação Bônus para emergir do casco." 
      }
    ]
  },
  "Tritão (Triton)": {
    nome: "Tritão (Triton)",
    descricao: "Originários do Plano Elemental da Água, os tritões vieram ao Plano Material para proteger os oceanos e a superfície de terrores abissais.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Frio"],
    magiasBonus: {
      nivel1: [{ id: "fog-cloud", nome: "Fog Cloud" }],
      nivel2: [{ id: "gust-of-wind", nome: "Gust of Wind" }],
      nivel3: [{ id: "water-walk", nome: "Water Walk" }]
    },
    tracos: [
      { 
        nome: "Anfíbio", 
        desc: "Você possui Deslocamento de Natação de 30ft e pode respirar ar e água." 
      },
      { 
        nome: "Controlar Ar e Água", 
        desc: "Você conhece feitiços do mar e vento (Int, Sab ou Car). Você pode conjurá-los usando este traço sem precisar de componentes materiais." 
      },
      { 
        nome: "Emissário do Mar", 
        desc: "Você pode comunicar ideias simples a qualquer Besta, Elemental ou Monstruosidade que possua deslocamento de natação. Eles o entendem, mas você não os entende." 
      },
      { 
        nome: "Guardião das Profundezas", 
        desc: "Adaptado às profundezas congelantes, você ganha Resistência a dano Gélido (Cold)." 
      }
    ]
  },
  "Verdan": {
    nome: "Verdan",
    descricao: "A raça mais nova de Faerûn. Descendentes de goblins transformados pela entidade 'Aquele-Que-Perdura'. Possuem sangue escuro, telepatia limitada e um surto de crescimento bizarro na juventude.",
    deslocamento: 30,
    tamanho: "Pequeno (Muda para Médio no Nível 5)",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Cura do Sangue Negro", 
        desc: "O seu sangue caótico impulsiona sua regeneração. Quando rolar 1 ou 2 em um Dado de Vida durante um Descanso Curto, você pode rerolar o dado, mas deve usar o novo resultado." 
      },
      { 
        nome: "Telepatia Limitada", 
        desc: "Você pode falar telepaticamente com qualquer criatura que consiga ver a até 30ft. Ela não precisa falar seu idioma, mas precisa compreender pelo menos um idioma para entender suas ideias simples." 
      },
      { 
        nome: "Persuasivo", 
        desc: "Você ganha proficiência na perícia Persuasão." 
      },
      { 
        nome: "Intuição Telepática", 
        desc: "Sua conexão mental fortalece sua vontade. Vantagem em TODOS os Testes de Resistência de Sabedoria e Carisma." 
      }
    ]
  },
  "Urso-Coruja (Bugbear)": {
    nome: "Urso-Coruja (Bugbear)",
    descricao: "Nem insetos (bugs) nem ursos (bears), são os primos colossais dos goblins. Possuem raízes feéricas que os tornam predadores furtivos aterrorizantes, mesmo com seu tamanho.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condition Enfeitiçado." 
      },
      { 
        nome: "Membros Longos", 
        desc: "Quando você faz um ataque corpo-a-corpo (melee) no seu turno, o seu alcance é 5ft maior que o normal." 
      },
      { 
        nome: "Porte Poderoso", 
        desc: "Você conta como uma categoria de tamanho maior para determinar capacidade de carga, empurrar, puxar ou levantar." 
      },
      { 
        nome: "Furtivo", 
        desc: "Você ganha proficiência em Furtividade. Além disso, pode passar e parar em espaços feitos para criaturas Pequenas sem precisar se espremer." 
      },
      { 
        nome: "Ataque Surpresa", 
        desc: "Se você acertar uma criatura com um ataque e ela AINDA NÃO TIVER AGIDO no combate (primeiro turno), ela toma +2d6 de dano extra." 
      }
    ]
  },
  "Centauro (Centaur)": {
    nome: "Centauro (Centaur)",
    descricao: "Nativos do Feywild, metade elfo e metade cavalo. Galopam pelo multiverso com grande velocidade e ressoam com o mundo natural.",
    deslocamento: 40,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Investida", 
        desc: "Se você se mover pelo menos 30ft em linha reta até um alvo e acertá-lo com uma arma corpo-a-corpo, você pode usar uma Ação Bônus para fazer um ataque com os Cascos." 
      },
      { 
        nome: "Corpo Equino", 
        desc: "Você conta como uma categoria de tamanho maior para carga. Escalar custa 4ft de movimento para cada 1ft que subir, em vez do normal." 
      },
      { 
        nome: "Cascos", 
        desc: "Ataques desarmados com seus cascos causam 1d6 + FOR de dano Contundente." 
      },
      { 
        nome: "Afinidade Natural", 
        desc: "Você ganha proficiência em Adestrar Animais, Medicina, Natureza ou Sobrevivência à sua escolha." 
      }
    ]
  },
  "Goblin": {
    nome: "Goblin",
    descricao: "Povo astuto e de tamanho pequeno encontrado em todo o multiverso. Sobreviventes natos, possuem uma herança feérica que lhes dá um talento para encontrar pontos fracos em oponentes maiores.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condição Enfeitiçado." 
      },
      { 
        nome: "Fúria do Pequeno", 
        desc: "Quando você causa dano com um ataque ou magia a uma criatura MAIOR que você, pode causar dano extra igual ao seu Bônus de Proficiência. (Usos = Proficiência / Descanso Longo, max 1/turno)." 
      },
      { 
        nome: "Fuga Ágil", 
        desc: "Você pode realizar a ação de Desengajar ou Esconder-se como uma Ação Bônus em cada um dos seus turnos." 
      }
    ]
  },
  "Grung": {
    nome: "Grung",
    descricao: "Humanoides sapos agressivos de florestas tropicais. Têm uma sociedade de castas dividida por cores e secretam um veneno constante na pele.",
    deslocamento: 25,
    tamanho: "Pequeno",
    visaoEscuro: null,
    resistenciasPadrao: ["Veneno"],
    tracos: [
      { 
        nome: "Alerta Arbóreo", 
        desc: "Possui Deslocamento de Escalada de 25ft e ganha proficiência na perícia Percepção." 
      },
      { 
        nome: "Anfíbio & Imunidade a Veneno", 
        desc: "Você pode respirar ar e água. É IMUNE a dano Venenoso e à condição Envenenado." 
      },
      { 
        nome: "Pele Venenosa", 
        desc: "Quem te agarrar ou tocar sua pele sofre Save de CON (CD 12) ou fica Envenenado por 1 min. Você também pode aplicar seu veneno numa arma perfurante (Save CON 12 ou toma 2d4 de dano Venenoso)." 
      },
      { 
        nome: "Salto Parado", 
        desc: "Seu salto em distância é de 25ft e em altura é de 15ft, com ou sem pegar impulso." 
      },
      { 
        nome: "Dependência de Água", 
        desc: "Você deve mergulhar na água por pelo menos 1 hora por dia, ou sofrerá 1 Nível de Exaustão. Só sai com magia ou mergulhando de novo." 
      }
    ]
  },
  "Hobgoblin": {
    nome: "Hobgoblin",
    descricao: "Primos táticos dos Goblins e Bugbears. Com profundos laços feéricos, canalizam o aspecto da reciprocidade, sendo imbatíveis quando lutam ao lado de aliados.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Ancestralidade Feérica", 
        desc: "Vantagem em saves para evitar ou encerrar a condição Enfeitiçado." 
      },
      { 
        nome: "Dádiva Feérica", 
        desc: "Você pode usar a Ação de Ajuda (Help) como uma Ação Bônus. (Usos = Proficiência / Descanso Longo). A partir do Nv 3, ao Ajudar, você adiciona um benefício: Hospitalidade (você e aliado ganham 1d6+Prof de PV Temp), Passagem (+10ft de deslocamento pra ambos) ou Rancor (inimigo atacado terá Desvantagem no próximo ataque)." 
      },
      { 
        nome: "Sorte dos Muitos", 
        desc: "Se você errar um ataque, save ou teste, pode ganhar um bônus no dado igual à quantidade de aliados a 30ft que você possa ver (Máximo +3). (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Kobold": {
    nome: "Kobold",
    descricao: "Pequenos seres que carregam a centelha dracônica. Costumam servir dragões (ou lutar contra eles) e ressoam poder dracônico em seus urros.",
    deslocamento: 30,
    tamanho: "Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Legado Kobold",
      opcoes: [
        { nome: "Astúcia (Craftiness)", tracoExtra: "Você ganha proficiência em Arcanismo, Investigação, Medicina, Prestidigitação ou Sobrevivência." },
        { nome: "Desafio (Defiance)", tracoExtra: "Você tem Vantagem em Testes de Resistência para evitar ou encerrar a condição Amedrontado." },
        { nome: "Feitiçaria Dracônica", tracoExtra: "Você ganha 1 Truque à sua escolha da lista de Feiticeiro (Int, Sab ou Car). Adicione-o manualmente no seu Grimório." }
      ]
    },
    tracos: [
      { 
        nome: "Grito Dracônico", 
        desc: "Ação Bônus: Solta um urro para inimigos a 10ft. Até o início do seu próximo turno, você e seus aliados ganham Vantagem em ataques contra os inimigos que ouviram. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Povo-Lagarto (Lizardfolk)": {
    nome: "Povo-Lagarto (Lizardfolk)",
    descricao: "Humanoides saurianos que sobrevivem nos ambientes mais hostis usando apenas seus instintos. Foram criados pelos deuses para guardar as maravilhas naturais do Plano Material.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Anfíbio", 
        desc: "Você possui Deslocamento de Natação de 30ft e pode prender a respiração por até 15 minutos de cada vez." 
      },
      { 
        nome: "Mordida & Mandíbulas Famintas", 
        desc: "Sua mordida é um ataque desarmado que causa 1d6 + FOR de dano Cortante. Como uma Ação Bônus, você pode fazer um ataque especial de mordida; se acertar, causa o dano normal e você ganha PV Temporário igual ao seu Bônus de Proficiência. (Usos da Ação Bônus = Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Armadura Natural", 
        desc: "Você possui pele escamosa rígida. Sem armadura, sua CA é 13 + seu Mod. de Destreza. Você ainda pode usar o bônus de escudos normalmente." 
      },
      { 
        nome: "Intuição Natural", 
        desc: "Você ganha proficiência em 2 perícias à sua escolha entre: Adestrar Animais, Medicina, Natureza, Percepção, Furtividade ou Sobrevivência." 
      }
    ]
  },
  "Minotauro": {
    nome: "Minotauro",
    descricao: "Humanoides com peitos de barril e cabeças semelhantes às de touros. Abençoados com um senso de direção sobrenatural, são navegadores incríveis e guerreiros brutais.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: null,
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Chifres", 
        desc: "Você pode usar seus chifres para fazer ataques desarmados, causando 1d6 + FOR de dano Perfurante." 
      },
      { 
        nome: "Investida Perfurante (Goring Rush)", 
        desc: "Imediatamente após usar a Ação de Disparada (Dash) e se mover pelo menos 20ft, você pode fazer 1 ataque corpo-a-corpo com seus chifres como uma Ação Bônus." 
      },
      { 
        nome: "Chifres Marteladores", 
        desc: "Imediatamente após acertar uma criatura com um ataque corpo-a-corpo (como parte da Ação de Ataque), você pode usar sua Ação Bônus para empurrar o alvo. O alvo (a 5ft de você e até uma categoria de tamanho maior) deve passar num Save de FOR (CD 8 + Prof + FOR) ou será empurrado até 10ft de você." 
      },
      { 
        nome: "Lembrança do Labirinto", 
        desc: "Você sempre sabe para qual direção fica o Norte e tem Vantagem em testes de Sabedoria (Sobrevivência) para navegar ou rastrear." 
      }
    ]
  },
  "Orc": {
    nome: "Orc",
    descricao: "Descendentes do deus Gruumsh. Carregam a tenacidade inigualável de seu criador e são guardiões incansáveis e aliados formidáveis, capazes de sobreviver a golpes mortais.",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    tracos: [
      { 
        nome: "Descarga de Adrenalina", 
        desc: "Você pode usar a Ação de Disparada (Dash) como uma Ação Bônus. Sempre que usar este traço, você também ganha PV Temporário igual ao seu Bônus de Proficiência. (Usos = Proficiência / Descanso Longo)." 
      },
      { 
        nome: "Porte Poderoso", 
        desc: "Você conta como uma categoria de tamanho maior para determinar capacidade de carga, e o peso que pode empurrar, puxar ou levantar." 
      },
      { 
        nome: "Resistência Implacável", 
        desc: "Quando você é reduzido a 0 Pontos de Vida, mas não é morto instantaneamente, pode cair para 1 Ponto de Vida em vez disso. (1 uso por Descanso Longo)." 
      }
    ]
  },
  "Shifter (Multiverso)": {
    nome: "Shifter (Multiverso)",
    descricao: "Descendentes de licantropos. Não podem mudar de forma completamente, mas podem realçar suas feições animais temporariamente (Shifting).",
    deslocamento: 30,
    tamanho: "Médio",
    visaoEscuro: "60 ft",
    resistenciasPadrao: [],
    escolhaRacial: {
      titulo: "Transformação Animal (Shifting)",
      opcoes: [
        { nome: "Pele de Besta (Beasthide)", tracoExtra: "Na transformação: +1d6 PV Temp extras e +1 de bônus na CA." },
        { nome: "Dente Longo (Longtooth)", tracoExtra: "Na transformação: Pode atacar com presas (1d6 + FOR Perfurante) como Ação Bônus." },
        { nome: "Passada Ágil (Swiftstride)", tracoExtra: "Na transformação: +10ft de Deslocamento. Reação se inimigo parar a 5ft: Move 10ft sem oportunidade." },
        { nome: "Caçada Selvagem (Wildhunt)", tracoExtra: "Na transformação: Vantagem em testes de Sabedoria. Inimigos a 30ft não têm vantagem contra você (a não ser que incapacitado)." }
      ]
    },
    tracos: [
      { 
        nome: "Instintos Bestiais", 
        desc: "Você ganha proficiência em 1 perícia: Acrobacia, Atletismo, Intimidação ou Sobrevivência." 
      },
      { 
        nome: "Transformação (Shifting)", 
        desc: "Ação Bônus: Assume forma bestial por 1 min. Ganha PV Temporário igual a 2x sua Proficiência. Ativa seu benefício da escolha racial. (Usos = Proficiência / Descanso Longo)." 
      }
    ]
  },
  "Yuan-Ti": {
    nome: "Yuan-Ti",
    descricao: "Originalmente humanos que se transformaram em um povo serpente através de rituais antigos. São abençoados com resistências mágicas e manifestam heranças ofídicas variadas.",
    deslocamento: 30,
    tamanho: "Médio ou Pequeno",
    visaoEscuro: "60 ft",
    resistenciasPadrao: ["Veneno"],
    magiasBonus: {
      truques: [{ id: "poison-spray", nome: "Poison Spray" }],
      nivel1: [{ id: "animal-friendship", nome: "Animal Friendship" }],
      nivel2: [{ id: "suggestion", nome: "Suggestion" }]
    },
    tracos: [
      { 
        nome: "Resistência Mágica", 
        desc: "Você tem Vantagem em Testes de Resistência contra magias." 
      },
      { 
        nome: "Resiliência a Veneno", 
        desc: "Você tem Vantagem em Testes de Resistência para evitar ou acabar com a condição Envenenado em você, e possui Resistência a dano de Veneno." 
      },
      { 
        nome: "Conjuração Serpentina", 
        desc: "Você conhece as magias bônus desta raça (Int, Sab ou Car). Você pode conjurar Amizade Animal um número ilimitado de vezes, mas apenas visando Cobras/Serpentes." 
      }
    ]
  }
};