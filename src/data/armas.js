// src/data/armas.js

export const PROPRIEDADES_MAESTRIA = {
  "Cleave": "Ao acertar, pode fazer um segundo ataque em criatura a 5ft da primeira (dano da arma apenas).",
  "Graze": "Se errar o ataque, causa dano igual ao mod de Habilidade.",
  "Nick": "Permite fazer o ataque extra da ação bônus como parte da ação principal (Luta com Duas Armas).",
  "Push": "Empurra a criatura acertada 10ft (3m) para longe.",
  "Sap": "O inimigo acertado tem Desvantagem no próximo ataque dele.",
  "Slow": "Reduz o deslocamento do inimigo em 10ft (3m).",
  "Topple": "Força um save de Con ou o inimigo cai Caído (Prone).",
  "Vex": "Ao acertar, ganha Vantagem no próximo ataque contra o mesmo alvo."
};

export const ARMAS = [
  // ==========================================
  // ARMAS SIMPLES CORPO A CORPO (Simple Melee)
  // ==========================================
  { 
    nome: "Adaga (Dagger)", dano: "1d4", tipo: "Perfurante", 
    propriedades: ["Acuidade", "Leve", "Arremesso (20/60)"], 
    maestria: "Nick", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Azagaia (Javelin)", dano: "1d6", tipo: "Perfurante", 
    propriedades: ["Arremesso (30/120)"], 
    maestria: "Slow", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Bordão (Quarterstaff)", dano: "1d6", tipo: "Contundente", 
    propriedades: ["Versátil (1d8)"], 
    maestria: "Topple", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Clava (Club)", dano: "1d4", tipo: "Contundente", 
    propriedades: ["Leve"], 
    maestria: "Slow", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Clava Grande (Greatclub)", dano: "1d8", tipo: "Contundente", 
    propriedades: ["Duas Mãos"], 
    maestria: "Push", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Foice Curta (Sickle)", dano: "1d4", tipo: "Cortante", 
    propriedades: ["Leve"], 
    maestria: "Nick", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Lança (Spear)", dano: "1d6", tipo: "Perfurante", 
    propriedades: ["Arremesso (20/60)", "Versátil (1d8)"], 
    maestria: "Sap", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Machadinha (Handaxe)", dano: "1d6", tipo: "Cortante", 
    propriedades: ["Leve", "Arremesso (20/60)"], 
    maestria: "Vex", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Maça (Mace)", dano: "1d6", tipo: "Contundente", 
    propriedades: [], 
    maestria: "Sap", categoria: "Armas Simples Corpo a Corpo" 
  },
  { 
    nome: "Martelo Leve (Light Hammer)", dano: "1d4", tipo: "Contundente", 
    propriedades: ["Leve", "Arremesso (20/60)"], 
    maestria: "Nick", categoria: "Armas Simples Corpo a Corpo" 
  },

  // ==========================================
  // ARMAS SIMPLES À DISTÂNCIA (Simple Ranged)
  // ==========================================
  { 
    nome: "Arco Curto (Shortbow)", dano: "1d6", tipo: "Perfurante", 
    propriedades: ["Munição (80/320)", "Duas Mãos"], 
    maestria: "Vex", categoria: "Armas Simples à Distância" 
  },
  { 
    nome: "Besta Leve (Light Crossbow)", dano: "1d8", tipo: "Perfurante", 
    propriedades: ["Munição (80/320)", "Recarga", "Duas Mãos"], 
    maestria: "Slow", categoria: "Armas Simples à Distância" 
  },
  { 
    nome: "Dardo (Dart)", dano: "1d4", tipo: "Perfurante", 
    propriedades: ["Acuidade", "Arremesso (20/60)"], 
    maestria: "Vex", categoria: "Armas Simples à Distância" 
  },
  { 
    nome: "Funda (Sling)", dano: "1d4", tipo: "Contundente", 
    propriedades: ["Munição (30/120)"], 
    maestria: "Slow", categoria: "Armas Simples à Distância" 
  },

  // ==========================================
  // ARMAS MARCIAIS CORPO A CORPO (Martial Melee)
  // ==========================================
  { 
    nome: "Alabarda (Halberd)", dano: "1d10", tipo: "Cortante", 
    propriedades: ["Pesada", "Alcance", "Duas Mãos"], 
    maestria: "Cleave", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Chicote (Whip)", dano: "1d4", tipo: "Cortante", 
    propriedades: ["Acuidade", "Alcance"], 
    maestria: "Slow", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Cimitarra (Scimitar)", dano: "1d6", tipo: "Cortante", 
    propriedades: ["Acuidade", "Leve"], 
    maestria: "Nick", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Espada Curta (Shortsword)", dano: "1d6", tipo: "Perfurante", 
    propriedades: ["Acuidade", "Leve"], 
    maestria: "Vex", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Espada Grande (Greatsword)", dano: "2d6", tipo: "Cortante", 
    propriedades: ["Pesada", "Duas Mãos"], 
    maestria: "Graze", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Espada Longa (Longsword)", dano: "1d8", tipo: "Cortante", 
    propriedades: ["Versátil (1d10)"], 
    maestria: "Sap", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Estrela da Manhã (Morningstar)", dano: "1d8", tipo: "Perfurante", 
    propriedades: [], 
    maestria: "Sap", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Glaive", dano: "1d10", tipo: "Cortante", 
    propriedades: ["Pesada", "Alcance", "Duas Mãos"], 
    maestria: "Graze", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Lança de Montaria (Lance)", dano: "1d10", tipo: "Perfurante", 
    propriedades: ["Pesada", "Alcance", "Duas Mãos (exceto montado)"], 
    maestria: "Topple", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Machado de Batalha (Battleaxe)", dano: "1d8", tipo: "Cortante", 
    propriedades: ["Versátil (1d10)"], 
    maestria: "Topple", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Machado Grande (Greataxe)", dano: "1d12", tipo: "Cortante", 
    propriedades: ["Pesada", "Duas Mãos"], 
    maestria: "Cleave", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Malho (Maul)", dano: "2d6", tipo: "Contundente", 
    propriedades: ["Pesada", "Duas Mãos"], 
    maestria: "Topple", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Mangual (Flail)", dano: "1d8", tipo: "Contundente", 
    propriedades: [], 
    maestria: "Sap", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Martelo de Guerra (Warhammer)", dano: "1d8", tipo: "Contundente", 
    propriedades: ["Versátil (1d10)"], 
    maestria: "Push", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Picareta de Guerra (War Pick)", dano: "1d8", tipo: "Perfurante", 
    propriedades: ["Versátil (1d10)"], 
    maestria: "Sap", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Pique (Pike)", dano: "1d10", tipo: "Perfurante", 
    propriedades: ["Pesada", "Alcance", "Duas Mãos"], 
    maestria: "Push", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Rapieira (Rapier)", dano: "1d8", tipo: "Perfurante", 
    propriedades: ["Acuidade"], 
    maestria: "Vex", categoria: "Armas Marciais Corpo a Corpo" 
  },
  { 
    nome: "Tridente (Trident)", dano: "1d8", tipo: "Perfurante", 
    propriedades: ["Arremesso (20/60)", "Versátil (1d10)"], 
    maestria: "Topple", categoria: "Armas Marciais Corpo a Corpo" 
  },

  // ==========================================
  // ARMAS MARCIAIS À DISTÂNCIA (Martial Ranged)
  // ==========================================
  { 
    nome: "Arco Longo (Longbow)", dano: "1d8", tipo: "Perfurante", 
    propriedades: ["Munição (150/600)", "Pesada", "Duas Mãos"], 
    maestria: "Slow", categoria: "Armas Marciais à Distância" 
  },
  { 
    nome: "Besta de Mão (Hand Crossbow)", dano: "1d6", tipo: "Perfurante", 
    propriedades: ["Munição (30/120)", "Leve", "Recarga"], 
    maestria: "Vex", categoria: "Armas Marciais à Distância" 
  },
  { 
    nome: "Besta Pesada (Heavy Crossbow)", dano: "1d10", tipo: "Perfurante", 
    propriedades: ["Munição (100/400)", "Pesada", "Recarga", "Duas Mãos"], 
    maestria: "Push", categoria: "Armas Marciais à Distância" 
  },
  { 
    nome: "Mosquete (Musket)", dano: "1d12", tipo: "Perfurante", 
    propriedades: ["Munição (40/120)", "Recarga", "Duas Mãos"], 
    maestria: "Slow", categoria: "Armas Marciais à Distância" 
  },
  { 
    nome: "Pistola (Pistol)", dano: "1d10", tipo: "Perfurante", 
    propriedades: ["Munição (30/90)", "Recarga"], 
    maestria: "Vex", categoria: "Armas Marciais à Distância" 
  },
  { 
    nome: "Zarabatana (Blowgun)", dano: "1", tipo: "Perfurante", 
    propriedades: ["Munição (25/100)", "Recarga"], 
    maestria: "Vex", categoria: "Armas Marciais à Distância" 
  }
];