// src/data/armaduras.js

export const ARMADURAS = [
  // --- ARMADURAS LEVES (Light Armor) ---
  // Somam modificador de Destreza total
  {
    nome: "Acolchoada (Padded)",
    tipo: "Leve",
    caBase: 11,
    addDex: true, // Soma Dex inteira
    furtividade: "Desvantagem",
    preco: 5,
    peso: 8
  },
  {
    nome: "Couro (Leather)",
    tipo: "Leve",
    caBase: 11,
    addDex: true,
    furtividade: "Normal",
    preco: 10,
    peso: 10
  },
  {
    nome: "Couro Batido (Studded Leather)",
    tipo: "Leve",
    caBase: 12,
    addDex: true,
    furtividade: "Normal",
    preco: 45,
    peso: 13
  },

  // --- ARMADURAS MÉDIAS (Medium Armor) ---
  // Somam Destreza até o máximo de +2 (ou +3 com talento, mas regra base é 2)
  {
    nome: "Gibão de Peles (Hide)",
    tipo: "Média",
    caBase: 12,
    addDex: true,
    maxDex: 2, // Limite de bônus
    furtividade: "Normal",
    preco: 10,
    peso: 12
  },
  {
    nome: "Camisão de Malha (Chain Shirt)",
    tipo: "Média",
    caBase: 13,
    addDex: true,
    maxDex: 2,
    furtividade: "Normal",
    preco: 50,
    peso: 20
  },
  {
    nome: "Brunea (Scale Mail)",
    tipo: "Média",
    caBase: 14,
    addDex: true,
    maxDex: 2,
    furtividade: "Desvantagem",
    preco: 50,
    peso: 45
  },
  {
    nome: "Peitoral (Breastplate)",
    tipo: "Média",
    caBase: 14,
    addDex: true,
    maxDex: 2,
    furtividade: "Normal",
    preco: 400,
    peso: 20
  },
  {
    nome: "Meia-Armadura (Half Plate)",
    tipo: "Média",
    caBase: 15,
    addDex: true,
    maxDex: 2,
    furtividade: "Desvantagem",
    preco: 750,
    peso: 40
  },

  // --- ARMADURAS PESADAS (Heavy Armor) ---
  // Não somam Destreza. Têm requisito de Força (opcional implementar aviso).
  {
    nome: "Cota de Anéis (Ring Mail)",
    tipo: "Pesada",
    caBase: 14,
    addDex: false,
    furtividade: "Desvantagem",
    preco: 30,
    peso: 40
  },
  {
    nome: "Cota de Malha (Chain Mail)",
    tipo: "Pesada",
    caBase: 16,
    addDex: false,
    reqForca: 13,
    furtividade: "Desvantagem",
    preco: 75,
    peso: 55
  },
  {
    nome: "Cota de Talas (Splint)",
    tipo: "Pesada",
    caBase: 17,
    addDex: false,
    reqForca: 15,
    furtividade: "Desvantagem",
    preco: 200,
    peso: 60
  },
  {
    nome: "Armadura de Placas (Plate)",
    tipo: "Pesada",
    caBase: 18,
    addDex: false,
    reqForca: 15,
    furtividade: "Desvantagem",
    preco: 1500,
    peso: 65
  },

  // --- ESCUDOS ---
  {
    nome: "Escudo",
    tipo: "Escudo",
    bonusCA: 2,
    preco: 10,
    peso: 6
  }
];