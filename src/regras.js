// src/regras.js

export const CLASSES_DND = {
  "Bárbaro": {
    dadoVida: 12,
    descricao: "Um guerreiro feroz de origem primitiva.",
    resistencias: ["forca", "constituicao"]
  },
  "Bardo": {
    dadoVida: 8,
    descricao: "Um mago inspirador cujo poder ecoa a música da criação.",
    resistencias: ["destreza", "carisma"]
  },
  "Clérigo": {
    dadoVida: 8,
    descricao: "Um campeão sacerdotal que empunha magia divina.",
    resistencias: ["sabedoria", "carisma"]
  },
  "Druida": {
    dadoVida: 8,
    descricao: "Um sacerdote da Velha Fé.",
    resistencias: ["inteligencia", "sabedoria"]
  },
  "Guerreiro": {
    dadoVida: 10,
    descricao: "Um mestre do combate marcial.",
    resistencias: ["forca", "constituicao"]
  },
  "Ladino": {
    dadoVida: 8,
    descricao: "Um trapaceiro que usa furtividade e astúcia.",
    resistencias: ["destreza", "inteligencia"]
  },
  "Mago": {
    dadoVida: 6,
    descricao: "Um usuário de magia escolástico.",
    resistencias: ["inteligencia", "sabedoria"]
  },
  "Monge": {
    dadoVida: 8,
    descricao: "Um mestre das artes marciais.",
    resistencias: ["forca", "destreza"]
  },
  "Paladino": {
    dadoVida: 10,
    descricao: "Um guerreiro santo.",
    resistencias: ["sabedoria", "carisma"]
  },
  "Patrulheiro": {
    dadoVida: 10,
    descricao: "Um guerreiro da natureza.",
    resistencias: ["forca", "destreza"]
  },
  "Feiticeiro": {
    dadoVida: 6,
    descricao: "Um conjurador com magia inata.",
    resistencias: ["constituicao", "carisma"]
  },
  "Bruxo": {
    dadoVida: 8,
    descricao: "Um portador de magia pactuada.",
    resistencias: ["sabedoria", "carisma"]
  }
};

// ... Mantenha a LISTA_PERICIAS aqui embaixo igual estava ...
export const LISTA_PERICIAS = [
    { nome: "Acrobacia", atributo: "destreza" },
    { nome: "Adestrar Animais", atributo: "sabedoria" },
    { nome: "Arcanismo", atributo: "inteligencia" },
    { nome: "Atletismo", atributo: "forca" },
    { nome: "Enganação", atributo: "carisma" },
    { nome: "Furtividade", atributo: "destreza" },
    { nome: "História", atributo: "inteligencia" },
    { nome: "Intimidação", atributo: "carisma" },
    { nome: "Intuição", atributo: "sabedoria" },
    { nome: "Investigação", atributo: "inteligencia" },
    { nome: "Medicina", atributo: "sabedoria" },
    { nome: "Natureza", atributo: "inteligencia" },
    { nome: "Percepção", atributo: "sabedoria" },
    { nome: "Performance", atributo: "carisma" },
    { nome: "Persuasão", atributo: "carisma" },
    { nome: "Prestidigitação", atributo: "destreza" },
    { nome: "Religião", atributo: "inteligencia" },
    { nome: "Sobrevivência", atributo: "sabedoria" }
];

// ... (mantenha o código anterior, CLASSES_DND e LISTA_PERICIAS) ...

/**
 * Calcula o dano de um Truque baseado no nível do personagem.
 * Regra: O dano dobra no nível 5, triplica no 11 e quadruplica no 17.
 * Ex: "1d10" vira "4d10" no nível 20.
 */
export function escalarDanoTruque(danoBase, nivelPersonagem) {
  // Se não tiver dano ou não for texto, devolve igual
  if (!danoBase || typeof danoBase !== 'string') return danoBase;

  // Regex para achar padrões como "1d10", "1d8", "1d12"
  // Captura: (Qtd)(Dado)(Resto) -> ex: "1", "d10", " + Mod"
  const regex = /^(\d+)(d\d+)(\s*.*)$/i;
  const match = danoBase.match(regex);

  // Se não achou padrão de dado (ex: dano fixo "1"), retorna o original
  if (!match) return danoBase;

  const qtdOriginal = parseInt(match[1]);
  const tipoDado = match[2]; // ex: "d10"
  const resto = match[3] || "";    // ex: " + Força" (se tiver)

  // Define o multiplicador pelo Tier de jogo
  let multiplicador = 1;
  if (nivelPersonagem >= 17) multiplicador = 4;
  else if (nivelPersonagem >= 11) multiplicador = 3;
  else if (nivelPersonagem >= 5) multiplicador = 2;

  // Calcula nova quantidade
  const novaQtd = qtdOriginal * multiplicador;

  return `${novaQtd}${tipoDado}${resto}`;
}