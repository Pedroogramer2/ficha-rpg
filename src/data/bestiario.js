// src/data/bestiario.js

export const BESTIARIO = {
  "Goblin": { 
    hp: 7, 
    ca: 15,
    iniciativa: 2,
    foto: "https://www.shutterstock.com/image-illustration/3d-rendering-green-goblin-portrait-260nw-1184333353.jpg", 
    faccao: "hostil",
    atributos: { for: 8, des: 14, con: 10, int: 10, sab: 8, car: 8 },
    ataques: [
      { nome: "Cimitarra", bonusAtaque: 4, dano: "1d6 + 2", tipo: "Cortante" },
      { nome: "Arco Curto", bonusAtaque: 4, dano: "1d6 + 2", tipo: "Perfurante" }
    ]
  },
  "Lobo": { 
    hp: 11, 
    ca: 13,
    iniciativa: 2,
    foto: "https://as2.ftcdn.net/jpg/06/67/58/61/1000_F_667586192_MxR3AiSNIBpJ57Dm96QXeE2SqFk4h0Qp.jpg", 
    faccao: "hostil",
    atributos: { for: 12, des: 15, con: 15, int: 3, sab: 12, car: 6 },
    ataques: [
      { nome: "Mordida", bonusAtaque: 4, dano: "2d4 + 2", tipo: "Perfurante" }
    ]
  },
  "Bandido": { 
    hp: 11, 
    ca: 12,
    iniciativa: 1,
    foto: "https://cdna.artstation.com/p/assets/images/images/058/905/896/large/cody-ragsdale-bandit-human-portrait.jpg?1675214852g", 
    faccao: "hostil",
    atributos: { for: 11, des: 12, con: 12, int: 10, sab: 10, car: 10 },
    ataques: [
      { nome: "Cimitarra", bonusAtaque: 3, dano: "1d6 + 1", tipo: "Cortante" },
      { nome: "Besta Leve", bonusAtaque: 3, dano: "1d8 + 1", tipo: "Perfurante" }
    ]
  },
  "Guarda": { 
    hp: 11, 
    ca: 16,
    iniciativa: 1,
    foto: "https://d1vzi28wh99zvq.cloudfront.net/images/8135/461183.webp", 
    faccao: "neutro",
    atributos: { for: 13, des: 12, con: 12, int: 10, sab: 11, car: 10 },
    ataques: [
      { nome: "Lança", bonusAtaque: 3, dano: "1d6 + 1", tipo: "Perfurante" }
    ]
  },
  "Aldeão": { 
    hp: 4, 
    ca: 10,
    iniciativa: 0,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYw0ohdax0JItsHTbmjcK3pIgi5voctyKw8IUtsfPHJKvzQMXp2TScc1g&s=10", 
    faccao: "aliado",
    atributos: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 },
    ataques: [
      { nome: "Porrete", bonusAtaque: 2, dano: "1d4", tipo: "Concussão" }
    ]
  }
};