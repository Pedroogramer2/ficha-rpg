// src/data/antecedentes.js

export const ANTECEDENTES = {
  "Acólito (Acolyte)": {
    atributos: ["Sabedoria", "Inteligência", "Carisma"], // Escolhe 2 desses para ganhar bônus
    talento: "Iniciado em Magia (Clérigo)",
    pericias: ["Intuição", "Religião"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Símbolo Sagrado", "Livro de Orações", "5 Varetas de Incenso", "Vestes", "10 PO"]
  },
  "Artesão (Artisan)": {
    atributos: ["Força", "Destreza", "Inteligência"],
    talento: "Artesão (Crafter)",
    pericias: ["Investigação", "Persuasão"],
    ferramenta: "Uma ferramenta de artesão à escolha",
    equipamento: ["Ferramenta de Artesão", "Carta de Recomendação", "Roupa de Viajante", "25 PO"]
  },
  "Charlatão (Charlatan)": {
    atributos: ["Destreza", "Constituição", "Carisma"],
    talento: "Habilidoso (Skilled)",
    pericias: ["Enganação", "Prestidigitação"],
    ferramenta: "Kit de Falsificação",
    equipamento: ["Roupa Fina", "Kit de Disfarce", "15 PO"]
  },
  "Criminoso (Criminal)": {
    atributos: ["Destreza", "Constituição", "Inteligência"],
    talento: "Alerta (Alert)",
    pericias: ["Furtividade", "Prestidigitação"],
    ferramenta: "Ferramentas de Ladrão",
    equipamento: ["Roupa Escura", "Pé de Cabra", "2 Adagas", "16 PO"]
  },
  "Artista (Entertainer)": {
    atributos: ["Destreza", "Carisma", "Força"], // Força para dançarinos/acrobatas
    talento: "Músico (Musician)",
    pericias: ["Acrobacia", "Performance"],
    ferramenta: "Instrumento Musical",
    equipamento: ["Instrumento Musical", "Roupa de Apresentação", "Espelho de Aço", "8 PO"]
  },
  "Fazendeiro (Farmer)": {
    atributos: ["Força", "Constituição", "Sabedoria"],
    talento: "Robustez (Tough)",
    pericias: ["Adestrar Animais", "Natureza"],
    ferramenta: "Ferramentas de Carpinteiro",
    equipamento: ["Foice", "Roupa de Viajante", "Chapéu de Palha", "20 PO"]
  },
  "Guarda (Guard)": {
    atributos: ["Força", "Inteligência", "Sabedoria"],
    talento: "Alerta (Alert)",
    pericias: ["Atletismo", "Percepção"],
    ferramenta: "Jogos (Dados ou Cartas)",
    equipamento: ["Lança", "Capa", "Insígnia", "10 PO"]
  },
  "Guia (Guide)": {
    atributos: ["Destreza", "Constituição", "Sabedoria"],
    talento: "Iniciado em Magia (Druida)",
    pericias: ["Furtividade", "Sobrevivência"],
    ferramenta: "Kit de Cartógrafo",
    equipamento: ["Arco Curto", "20 Flechas", "Tenda", "5 PO"]
  },
  "Eremita (Hermit)": {
    atributos: ["Constituição", "Sabedoria", "Carisma"],
    talento: "Curandeiro (Healer)",
    pericias: ["Medicina", "Religião"],
    ferramenta: "Kit de Herbalismo",
    equipamento: ["Kit de Herbalismo", "Cobertor de Inverno", "Lâmpada", "Oleo", "10 PO"]
  },
  "Comerciante (Merchant)": {
    atributos: ["Constituição", "Inteligência", "Carisma"],
    talento: "Sortudo (Lucky)",
    pericias: ["Intuição", "Persuasão"],
    ferramenta: "Kit de Navegador",
    equipamento: ["Abaco", "Roupa Fina", "20 PO"]
  },
  "Nobre (Noble)": {
    atributos: ["Força", "Inteligência", "Carisma"],
    talento: "Habilidoso (Skilled)",
    pericias: ["História", "Persuasão"],
    ferramenta: "Jogos (Xadrez ou similar)",
    equipamento: ["Roupa Fina", "Sinete", "25 PO"]
  },
  "Sábio (Sage)": {
    atributos: ["Constituição", "Inteligência", "Sabedoria"],
    talento: "Iniciado em Magia (Mago)",
    pericias: ["Arcanismo", "História"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Livro de Lore", "Tinta", "Pena", "10 PO"]
  },
  "Marinheiro (Sailor)": {
    atributos: ["Força", "Destreza", "Sabedoria"],
    talento: "Brigão de Taverna (Tavern Brawler)",
    pericias: ["Atletismo", "Percepção"],
    ferramenta: "Ferramentas de Navegador",
    equipamento: ["Corda de Seda (50ft)", "Adaga", "Amuleto da Sorte", "10 PO"]
  },
  "Escriba (Scribe)": {
    atributos: ["Destreza", "Inteligência", "Sabedoria"],
    talento: "Habilidoso (Skilled)",
    pericias: ["Investigação", "Percepção"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Pergaminhos", "Tinta Fina", "Luminária Pequena", "15 PO"]
  },
  "Soldado (Soldier)": {
    atributos: ["Força", "Destreza", "Constituição"],
    talento: "Atacante Selvagem (Savage Attacker)",
    pericias: ["Atletismo", "Intimidação"],
    ferramenta: "Jogos (Cartas)",
    equipamento: ["Troféu de Guerra", "Curativos", "Roupa Comum", "10 PO"]
  },
  "Viajante (Wayfarer)": {
    atributos: ["Destreza", "Sabedoria", "Carisma"],
    talento: "Sortudo (Lucky)",
    pericias: ["Intuição", "Furtividade"],
    ferramenta: "Ferramentas de Ladrão",
    equipamento: ["2 Adagas", "Bússola", "Bolsa", "10 PO"]
  },
  "Herdeiro Aberrante (Aberrant Heir)": {
    atributos: ["Força", "Constituição", "Carisma"],
    talento: "Marca do Dragão Aberrante (Aberrant Dragonmark)",
    pericias: ["História", "Intimidação"],
    ferramenta: "Kit de Disfarce",
    equipamento: ["Kit de Disfarce", "Fantasia", "Roupa de Viajante", "Adaga", "16 PO"]
  },
  "Arqueólogo (Archaeologist)": {
    atributos: ["Destreza", "Inteligência", "Sabedoria"],
    talento: "Habilidoso (Skilled)",
    pericias: ["História", "Sobrevivência"],
    ferramenta: "Ferramentas de Cartógrafo",
    equipamento: ["Ferramentas de Cartógrafo", "Lanterna Furta-Fogo", "Mapa", "Estojo de Mapa ou Pergaminho", "Pá", "Tenda", "Roupa de Viajante", "17 PO"]
  },
  "Agente da Casa (House Agent)": {
    atributos: ["Força", "Inteligência", "Carisma"],
    talento: "Sortudo (Lucky)",
    pericias: ["Investigação", "Persuasão"],
    ferramenta: "Uma ferramenta de artesão à escolha",
    equipamento: ["Ferramenta de Artesão (escolhida)", "Roupa Fina", "20 PO"]
  },
  "Herdeiro da Casa Cannith (House Cannith Heir)": {
    atributos: ["Força", "Destreza", "Inteligência"],
    talento: "Marca da Criação (Mark of Making)",
    pericias: ["Investigação", "Prestidigitação"],
    ferramenta: "Uma ferramenta de artesão à escolha",
    equipamento: ["Ferramenta de Artesão (escolhida)", "Pé de Cabra", "Roupa Fina", "2 Algibeiras", "17 PO"]
  },
  "Herdeiro da Casa Deneith (House Deneith Heir)": {
    atributos: ["Força", "Constituição", "Sabedoria"],
    talento: "Marca da Sentinela (Mark of Sentinel)",
    pericias: ["Intuição", "Percepção"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Kit de Jogos (escolhido)", "Lança", "Arco Curto", "20 Flechas", "Aljava", "Roupa Fina", "Kit de Curandeiro", "1 PO"]
  },
  "Herdeiro da Casa Ghallanda (House Ghallanda Heir)": {
    atributos: ["Destreza", "Sabedoria", "Carisma"],
    talento: "Marca da Hospitalidade (Mark of Hospitality)",
    pericias: ["Intuição", "Persuasão"],
    ferramenta: "Utensílios de Cozinheiro",
    equipamento: ["Utensílios de Cozinheiro", "Roupa Fina", "Panela de Ferro", "Lâmpada", "5 Frascos de Óleo", "Perfume", "26 PO"]
  },
  "Herdeiro da Casa Jorasco (House Jorasco Heir)": {
    atributos: ["Destreza", "Constituição", "Sabedoria"],
    talento: "Marca da Cura (Mark of Healing)",
    pericias: ["Medicina", "Furtividade"],
    ferramenta: "Kit de Herbalismo",
    equipamento: ["Kit de Herbalismo", "Roupa Fina", "Kit de Curandeiro", "25 PO"]
  },
  "Herdeiro da Casa Kundarak (House Kundarak Heir)": {
    atributos: ["Força", "Constituição", "Inteligência"],
    talento: "Marca da Proteção (Mark of Warding)",
    pericias: ["Arcanismo", "Investigação"],
    ferramenta: "Ferramentas de Ladrão",
    equipamento: ["Ferramentas de Ladrão", "Roupa Fina", "10 PO"]
  },
  "Herdeiro da Casa Lyrandar (House Lyrandar Heir)": {
    atributos: ["Força", "Destreza", "Carisma"],
    talento: "Marca da Tempestade (Mark of Storm)",
    pericias: ["Acrobacia", "Natureza"],
    ferramenta: "Ferramentas de Navegador",
    equipamento: ["Ferramentas de Navegador", "Roupa Fina", "10 PO"]
  },
  "Herdeiro da Casa Medani (House Medani Heir)": {
    atributos: ["Destreza", "Inteligência", "Sabedoria"],
    talento: "Marca da Detecção (Mark of Detection)",
    pericias: ["Intuição", "Investigação"],
    ferramenta: "Kit de Disfarce",
    equipamento: ["Kit de Disfarce", "Roupa Fina", "10 PO"]
  },
  "Herdeiro da Casa Orien (House Orien Heir)": {
    atributos: ["Destreza", "Constituição", "Inteligência"],
    talento: "Marca da Passagem (Mark of Passage)",
    pericias: ["Acrobacia", "Atletismo"],
    ferramenta: "Ferramentas de Cartógrafo",
    equipamento: ["Ferramentas de Cartógrafo", "Roupa Fina", "Mapa", "Estojo de Mapa ou Pergaminho", "18 PO"]
  },
  "Herdeiro da Casa Phiarlan (House Phiarlan Heir)": {
    atributos: ["Destreza", "Sabedoria", "Carisma"],
    talento: "Marca da Sombra (Mark of Shadow)",
    pericias: ["Enganação", "Furtividade"],
    ferramenta: "Kit de Disfarce",
    equipamento: ["Kit de Disfarce", "Roupa Fina", "10 PO"]
  },
  "Herdeiro da Casa Sivis (House Sivis Heir)": {
    atributos: ["Inteligência", "Sabedoria", "Carisma"],
    talento: "Marca da Escrita (Mark of Scribing)",
    pericias: ["História", "Percepção"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Kit de Caligrafia", "Roupa Fina", "Tinta", "5 Penas", "Papel (30 folhas)", "Pergaminho (9 folhas)", "8 PO"]
  },
  "Herdeiro da Casa Tharashk (House Tharashk Heir)": {
    atributos: ["Constituição", "Inteligência", "Sabedoria"],
    talento: "Marca da Descoberta (Mark of Finding)",
    pericias: ["Percepção", "Sobrevivência"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Kit de Jogos (escolhido)", "Kit de Escalada", "Roupa Fina", "Armadilha de Caça", "Algemas", "2 PO"]
  },
  "Herdeiro da Casa Thuranni (House Thuranni Heir)": {
    atributos: ["Destreza", "Inteligência", "Carisma"],
    talento: "Marca da Sombra (Mark of Shadow)",
    pericias: ["Performance", "Furtividade"],
    ferramenta: "Um Instrumento Musical à escolha",
    equipamento: ["Instrumento Musical (escolhido)", "Fantasia", "Roupa Fina", "13 PO"]
  },
  "Herdeiro da Casa Vadalis (House Vadalis Heir)": {
    atributos: ["Constituição", "Sabedoria", "Carisma"],
    talento: "Marca do Adestramento (Mark of Handling)",
    pericias: ["Adestrar Animais", "Natureza"],
    ferramenta: "Kit de Herbalismo",
    equipamento: ["Kit de Herbalismo", "Roupa Fina", "Rede", "29 PO"]
  },
  "Inquisitivo (Inquisitive)": {
    atributos: ["Constituição", "Inteligência", "Carisma"],
    talento: "Alerta (Alert)",
    pericias: ["Intuição", "Investigação"],
    ferramenta: "Ferramentas de Ladrão",
    equipamento: ["Ferramentas de Ladrão", "Lanterna Furta-Fogo", "Pé de Cabra", "Óleo (10 frascos)", "Roupa de Viajante", "10 PO"]
  },
  "Corsário Chondathano (Chondathan Freebooter)": {
    atributos: ["Força", "Destreza", "Sabedoria"],
    talento: "Habilidoso (Skilled)",
    pericias: ["Atletismo", "Prestidigitação"],
    ferramenta: "Ferramentas de Tecelão",
    equipamento: ["Adaga", "Ferramentas de Tecelão", "Mochila", "Esferas de Metal", "Cesta", "Saco de Dormir", "Balde", "Rações (3 dias)", "Corda", "Apito de Sinalização", "Roupa de Viajante", "38 PO"]
  },
  "Habitante de Magia Morta (Dead Magic Dweller)": {
    atributos: ["Força", "Constituição", "Sabedoria"],
    talento: "Curandeiro (Healer)",
    pericias: ["Medicina", "Sobrevivência"],
    ferramenta: "Ferramentas de Trabalhador em Couro",
    equipamento: ["Clava Grande (Greatclub)", "Ferramentas de Trabalhador em Couro", "Saco de Dormir", "Cobertor", "Kit de Curandeiro", "Vara de 3m", "Rações (3 dias)", "Tenda", "Caixa de Fogo", "5 Tochas", "Roupa de Viajante", "Cantil", "32 PO"]
  },
  "Cultista do Dragão (Dragon Cultist)": {
    atributos: ["Destreza", "Constituição", "Inteligência"],
    talento: "Iniciado do Culto do Dragão (Cult of the Dragon Initiate)",
    pericias: ["Enganação", "Furtividade"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Kit de Caligrafia", "Adaga", "Garrafa de Vidro", "Lâmpada", "Algemas", "Óleo (5 frascos)", "2 Algibeiras", "Túnica", "Corda", "30 PO"]
  },
  "Zelador do Enclave Esmeralda (Emerald Enclave Caretaker)": {
    atributos: ["Constituição", "Inteligência", "Sabedoria"],
    talento: "Novato do Enclave Esmeralda (Emerald Enclave Fledgling)",
    pericias: ["Natureza", "Sobrevivência"],
    ferramenta: "Kit de Herbalismo",
    equipamento: ["Arco Curto", "20 Flechas", "Kit de Herbalismo", "Saco de Dormir", "Cobertor", "Algibeira", "Tenda", "Roupa de Viajante", "13 PO"]
  },
  "Mercenário Punho Flamejante (Flaming Fist Mercenary)": {
    atributos: ["Força", "Constituição", "Carisma"],
    talento: "Robustez (Tough)",
    pericias: ["Intimidação", "Percepção"],
    ferramenta: "Ferramentas de Ferreiro",
    equipamento: ["Maça", "Ferramentas de Ferreiro", "Roupa Fina", "Algemas", "Aríete Portátil", "4 PO"]
  },
  "Tocado por Gênio (Genie Touched)": {
    atributos: ["Destreza", "Sabedoria", "Carisma"],
    talento: "Iniciado em Magia (Mago)",
    pericias: ["Percepção", "Persuasão"],
    ferramenta: "Ferramentas de Soprador de Vidro",
    equipamento: ["Martelo Leve", "Ferramentas de Soprador de Vidro", "Roupa Fina", "Lâmpada", "Óleo (3 frascos)", "Cantil", "2 PO"]
  },
  "Harpista (Harper)": {
    atributos: ["Destreza", "Inteligência", "Carisma"],
    talento: "Agente dos Harpistas (Harper Agent)",
    pericias: ["Performance", "Prestidigitação"],
    ferramenta: "Kit de Disfarce",
    equipamento: ["Kit de Disfarce", "Saco de Dormir", "Fantasia", "Arpéu", "Corda", "Roupa de Viajante", "14 PO"]
  },
  "Pescador de Gelo (Ice Fisher)": {
    atributos: ["Força", "Destreza", "Constituição"],
    talento: "Alerta (Alert)",
    pericias: ["Adestrar Animais", "Atletismo"],
    ferramenta: "Ferramentas de Entalhador",
    equipamento: ["Ferramentas de Entalhador", "Cesta", "Roldana e Polia", "Balde", "Corrente", "Armadilha de Caça", "Rede", "Vara de 3m", "Rações (3 dias)", "Corda", "Roupa de Viajante", "32 PO"]
  },
  "Cavaleiro da Manopla (Knight Of The Gauntlet)": {
    atributos: ["Força", "Inteligência", "Sabedoria"],
    talento: "Iniciante da Manopla (Tyro of the Gauntlet)",
    pericias: ["Atletismo", "Medicina"],
    ferramenta: "Ferramentas de Ferreiro",
    equipamento: ["Lança", "Ferramentas de Ferreiro", "Lanterna Furta-Fogo", "Símbolo Sagrado", "Algemas", "Óleo (5 frascos)", "Caixa de Fogo", "Roupa de Viajante", "9 PO"]
  },
  "Vassalo da Aliança dos Lordes (Lords' Alliance Vassal)": {
    atributos: ["Força", "Inteligência", "Carisma"],
    talento: "Agente da Aliança dos Lordes (Lords’ Alliance Agent)",
    pericias: ["Intuição", "Persuasão"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["2 Azagaias", "Kit de Caligrafia", "Roupa Fina", "Tinta", "5 Penas", "Pergaminho (9 folhas)", "13 PO"]
  },
  "Peregrino do Poço da Lua (Moonwell Pilgrim)": {
    atributos: ["Constituição", "Sabedoria", "Carisma"],
    talento: "Iniciado em Magia (Druida)",
    pericias: ["Natureza", "Performance"],
    ferramenta: "Suprimentos de Pintor",
    equipamento: ["Bordão", "Suprimentos de Pintor", "Saco de Dormir", "Sino", "Algibeira", "Túnica", "Barbante", "Roupa de Viajante", "Cantil", "34 PO"]
  },
  "Invasor de Tumbas de Mulhorand (Mulhorandi Tomb Raider)": {
    atributos: ["Destreza", "Constituição", "Inteligência"],
    talento: "Sortudo (Lucky)",
    pericias: ["Investigação", "Religião"],
    ferramenta: "Ferramentas de Pedreiro",
    equipamento: ["Adaga", "Martelo Leve", "Ferramentas de Pedreiro", "Mochila", "Saco de Dormir", "Pé de Cabra", "Escada", "Vara de 3m", "2 Algibeiras", "Corda", "Barbante", "Caixa de Fogo", "5 Tochas", "Roupa de Viajante", "Cantil", "26 PO"]
  },
  "Guardião de Mythal (Mythalkeeper)": {
    atributos: ["Inteligência", "Sabedoria", "Carisma"],
    talento: "Artesão (Crafter)",
    pericias: ["Arcanismo", "História"],
    ferramenta: "Ferramentas de Joalheiro",
    equipamento: ["Bordão", "Ferramentas de Joalheiro", "Perfume", "Algibeira", "Túnica", "Pá", "Barbante", "Cantil", "16 PO"]
  },
  "Escudeiro do Dragão Púrpura (Purple Dragon Squire)": {
    atributos: ["Força", "Sabedoria", "Carisma"],
    talento: "Recruta do Dragão Púrpura (Purple Dragon Rook)",
    pericias: ["Adestrar Animais", "Intuição"],
    ferramenta: "Ferramentas de Navegador",
    equipamento: ["Lança", "Ferramentas de Navegador", "Roupa Fina", "9 PO"]
  },
  "Andarilho de Rashemen (Rashemi Wanderer)": {
    atributos: ["Força", "Constituição", "Carisma"],
    talento: "Robustez (Tough)",
    pericias: ["Intimidação", "Percepção"],
    ferramenta: "Ferramentas de Cartógrafo",
    equipamento: ["Ferramentas de Cartógrafo", "Mochila", "Saco de Dormir", "Lanterna Furta-Fogo", "Óleo (3 frascos)", "Corda", "Caixa de Fogo", "Roupa de Viajante", "Cantil", "23 PO"]
  },
  "Exilado dos Mestres das Sombras (Shadowmasters Exile)": {
    atributos: ["Destreza", "Inteligência", "Carisma"],
    talento: "Atacante Selvagem (Savage Attacker)",
    pericias: ["Acrobacia", "Furtividade"],
    ferramenta: "Ferramentas de Ladrão",
    equipamento: ["2 Adagas", "Ferramentas de Ladrão", "Estrepes", "Fantasia", "Arpéu", "Pítons de Ferro", "Espelho", "2 Algibeiras", "Corda", "Roupa de Viajante", "3 PO"]
  },
  "Iniciado do Fogo Mágico (Spellfire Initiate)": {
    atributos: ["Constituição", "Inteligência", "Carisma"],
    talento: "Centelha de Fogo Mágico (Spellfire Spark)",
    pericias: ["Arcanismo", "Percepção"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Kit de Jogos (escolhido)", "Foco Arcano (Cristal ou Varinha)", "2 Algibeiras", "Roupa de Viajante", "36 PO"]
  },
  "Mercenário Zhentarim (Zhentarim Mercenary)": {
    atributos: ["Força", "Destreza", "Carisma"],
    talento: "Rufião Zhentarim (Zhentarim Ruffian)",
    pericias: ["Intimidação", "Percepção"],
    ferramenta: "Kit de Falsificação",
    equipamento: ["Clava", "Adaga", "Kit de Falsificação", "Roupa Fina", "Lanterna Furta-Fogo", "Óleo (3 frascos)", "2 Algibeiras", "Barbante", "Caixa de Fogo", "11 PO"]
  },
  "Assombrado (Haunted One)": {
    atributos: ["Constituição", "Sabedoria", "Carisma"],
    talento: "Sobrevivente (Survivor) ou Dádiva Sombria (Dark Gift) à escolha",
    pericias: ["Arcanismo", "Sobrevivência"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Kit de Jogos (escolhido)", "Pé de Cabra", "Água Benta (1 frasco)", "Espelho", "Óleo (2 frascos)", "Apito de Sinalização", "Caixa de Fogo", "Roupa de Viajante", "5 Tochas", "Cantil", "14 PO"]
  },
  "Investigador (Investigator)": {
    atributos: ["Inteligência", "Sabedoria", "Carisma"],
    talento: "Olho Vivo (Sharp Eye) ou Dádiva Sombria (Dark Gift) à escolha",
    pericias: ["Intuição", "Investigação"],
    ferramenta: "Kit de Disfarce",
    equipamento: ["Kit de Disfarce", "Algemas", "Pá", "Roupa de Viajante", "3 Frascos de Vidro", "16 PO"]
  },
  "Vagante das Brumas (Mist Wanderer)": {
    atributos: ["Destreza", "Constituição", "Sabedoria"],
    talento: "Dádiva Sombria (Dark Gift) à escolha (Andarilho das Brumas recomendado)",
    pericias: ["Furtividade", "Sobrevivência"],
    ferramenta: "Uma ferramenta de artesão à escolha",
    equipamento: ["Ferramenta de Artesão (escolhida)", "Lâmpada", "Óleo (5 frascos)", "Algibeira", "Corda", "Caixa de Fogo", "Roupa de Viajante", "30 PO"]
  },
  "Médium Espiritual (Spirit Medium)": {
    atributos: ["Constituição", "Inteligência", "Sabedoria"],
    talento: "Dádiva Sombria (Dark Gift) à escolha (Sussurros Reunidos recomendado)",
    pericias: ["Intuição", "Religião"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Adaga", "Kit de Jogos (escolhido)", "Cesta", "Sino", "8 Velas", "Tinta", "Pena", "Papel (5 folhas)", "Caixa de Fogo", "Roupa de Viajante", "32 PO"]
  },
  "Farrista (Carouser)": {
    atributos: ["Destreza", "Inteligência", "Carisma"],
    talento: "Folião Incansável (Tireless Reveler)",
    pericias: ["Enganação", "Persuasão"],
    ferramenta: "Um Kit de Jogos à escolha",
    equipamento: ["Adaga", "Kit de Jogos (escolhido)", "Roupa Fina", "Garrafa de Vidro", "Espelho", "Perfume", "Algibeira", "Caixa de Fogo", "19 PO"]
  },
  "Especialista de Lorwyn (Lorwyn Expert)": {
    atributos: ["Força", "Constituição", "Sabedoria"],
    talento: "Filha do Sol (Child of the Sun)",
    pericias: ["Atletismo", "Natureza"],
    ferramenta: "Ferramentas de Cartógrafo",
    equipamento: ["Bordão", "Ferramentas de Cartógrafo", "Mochila", "Cesta", "Pergaminho (4 folhas)", "Corda", "Roupa de Viajante", "29 PO"]
  },
  "Buscador de Pacto (Pact Seeker)": {
    atributos: ["Constituição", "Inteligência", "Carisma"],
    talento: "Talento de Pacto Planar (Planar Pact) à escolha",
    pericias: ["Arcanismo", "Persuasão"],
    ferramenta: "Kit de Caligrafia",
    equipamento: ["Livro", "Kit de Caligrafia", "Tinta", "Pena", "Pergaminho (10 folhas)", "Roupa de Viajante", "2 PO"]
  },
  "Especialista de Shadowmoor (Shadowmoor Expert)": {
    atributos: ["Destreza", "Inteligência", "Carisma"],
    talento: "Bruxo de Shadowmoor (Shadowmoor Hexer)",
    pericias: ["Acrobacia", "Enganação"],
    ferramenta: "Ferramentas de Soprador de Vidro",
    equipamento: ["Adaga", "Ferramentas de Soprador de Vidro", "Mochila", "Armadilha de Caça", "Lâmpada", "Óleo (3 frascos)", "Roupa de Viajante", "Cantil", "8 PO"]
  },
  "Devoto de Vampiro (Vampire Devotee)": {
    atributos: ["Força", "Constituição", "Carisma"],
    talento: "Brinquedo do Vampiro (Vampire’s Plaything)",
    pericias: ["Persuasão", "Furtividade"],
    ferramenta: "Utensílios de Cozinheiro",
    equipamento: ["Utensílios de Cozinheiro", "Roupa Fina", "2 Frascos de Vidro", "Kit de Curandeiro", "Perfume", "Lâmpada", "Óleo (3 frascos)", "Cantil", "19 PO"]
  },
  "Sobrevivente de Vampiro (Vampire Survivor)": {
    atributos: ["Destreza", "Constituição", "Sabedoria"],
    talento: "Caçador de Vampiros (Vampire Hunter)",
    pericias: ["Intuição", "Religião"],
    ferramenta: "Ferramentas de Entalhador",
    equipamento: ["Ferramentas de Entalhador", "Pé de Cabra", "Lanterna Furta-Fogo", "Símbolo Sagrado (relicário)", "Água Benta", "Espelho", "Óleo (3 frascos)", "Caixa de Fogo", "Roupa de Viajante", "Cantil", "4 PO"]
  }
};