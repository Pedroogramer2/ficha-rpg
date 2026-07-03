// src/data/manobras.js

export const MANOBRAS = [
  {
    nome: "Aparar (Parry)",
    desc: "Reação: Quando for atingido por um ataque corpo a corpo, gaste 1 dado de superioridade para reduzir o dano pelo valor rolado + seu mod. de Destreza."
  },
  {
    nome: "Ataque Ameaçador (Menacing Attack)",
    desc: "Ao acertar: Adiciona o dado de superioridade ao dano e o alvo deve fazer save de SAB. Se falhar, fica Amedrontado até o final do seu próximo turno."
  },
  {
    nome: "Ataque de Desarmar (Disarming Attack)",
    desc: "Ao acertar: Adiciona o dado de superioridade ao dano e força o alvo a largar um item (Save FOR). O objeto cai aos pés dele."
  },
  {
    nome: "Ataque de Precisão (Precision Attack)",
    desc: "Ao fazer um ataque: Adicione o dado de superioridade à rolagem de acerto. Pode usar antes ou depois de rolar o d20."
  },
  {
    nome: "Ataque de Empurrão (Pushing Attack)",
    desc: "Ao acertar: Adiciona o dado de superioridade ao dano e, se o alvo for Grande ou menor, empurra-o 15 pés (Save FOR nega o empurrão)."
  },
  {
    nome: "Ataque de Rasteira (Trip Attack)",
    desc: "Ao acertar: Adiciona o dado de superioridade ao dano e, se o alvo for Grande ou menor, derruba-o (Prone) (Save FOR nega)."
  },
  {
    nome: "Ataque Pulmonar (Lunging Attack)",
    desc: "Ao fazer um ataque corpo a corpo: Aumenta o alcance em 5 pés. Se acertar, adiciona o dado de superioridade ao dano."
  },
  {
    nome: "Ataque Giratório (Sweeping Attack)",
    desc: "Ao acertar: Escolha outra criatura a 5 pés do alvo original (e ao seu alcance). Se a rolagem de ataque acertar a segunda criatura também, ela toma dano igual ao rolamento do dado de superioridade."
  },
  {
    nome: "Contra-Ataque / Ripostar (Riposte)",
    desc: "Reação: Quando uma criatura errar um ataque corpo a corpo contra você, gaste 1 dado para fazer um ataque corpo a corpo contra ela. Se acertar, soma o dado ao dano."
  },
  {
    nome: "Finta (Feinting Attack)",
    desc: "Ação Bônus: Escolha uma criatura a 5 pés. Você tem Vantagem no próximo ataque contra ela neste turno. Se acertar, soma o dado ao dano."
  },
  {
    nome: "Golpe de Comandante (Commander's Strike)",
    desc: "Ao usar a ação de Ataque, abdique de um ataque e gaste 1 dado. Um aliado que possa te ver/ouvir pode usar a Reação para fazer um ataque de arma, somando o dado de superioridade ao dano."
  },
  {
    nome: "Golpe de Distração (Distracting Strike)",
    desc: "Ao acertar: Adiciona o dado de superioridade ao dano. O próximo ataque feito por um aliado contra o mesmo alvo tem Vantagem."
  },
  {
    nome: "Isca e Troca (Bait and Switch)",
    desc: "Se mover 5 pés, pode trocar de lugar com um aliado voluntário a 5 pés (não gasta deslocamento de nenhum). Gaste 1 dado e adicione o valor à CA de um dos dois até o inicio do seu próximo turno."
  },
  {
    nome: "Passo Evasivo (Evasive Footwork)",
    desc: "Ao se mover: Gaste 1 dado e adicione o valor à sua CA até você parar de se mover."
  },
  {
    nome: "Reunir (Rally)",
    desc: "Ação Bônus: Escolha um aliado que possa te ver/ouvir. Ele ganha PV Temporários iguais ao dado de superioridade + seu mod. de Carisma."
  },
  {
    nome: "Avaliação Tática (Tactical Assessment)",
    desc: "Ao fazer um teste de História, Intuição ou Investigação, gaste 1 dado e adicione ao resultado."
  },
  {
    nome: "Presença de Comando (Commanding Presence)",
    desc: "Ao fazer um teste de Intimidação, Persuasão ou Performance, gaste 1 dado e adicione ao resultado."
  },
  {
    nome: "Emboscada (Ambush)",
    desc: "Ao fazer um teste de Furtividade ou Iniciativa, gaste 1 dado e adicione ao resultado."
  }
];