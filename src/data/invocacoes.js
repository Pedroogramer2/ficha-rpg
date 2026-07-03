// src/data/invocacoes.js

export const INVOCACOES = [
  // --- NÍVEL 1 (Pactos e Básicos) ---
  {
    nome: "Pacto da Lâmina (Pact of the Blade)",
    nivelMinimo: 1,
    requisito: "Nenhum",
    desc: "Ação Bônus: Conjura uma arma mágica (ou vincula uma existente). Você usa CARISMA para ataque e dano. Pode mudar o tipo de dano para Necrótico, Psíquico ou Radiante."
  },
  {
    nome: "Pacto da Corrente (Pact of the Chain)",
    nivelMinimo: 1,
    requisito: "Nenhum",
    desc: "Aprende a magia 'Find Familiar'. Pode conjurar formas especiais (Imp, Pseudodragão, Esqueleto, etc). Pode abdicar de um ataque para o familiar atacar."
  },
  {
    nome: "Pacto do Tomo (Pact of the Tome)",
    nivelMinimo: 1,
    requisito: "Nenhum",
    desc: "Ganha um Livro das Sombras. Escolha 3 Truques e 2 Rituais de Nível 1 de QUALQUER classe. Eles contam como magias de Bruxo para você."
  },

  // --- NÍVEL 2+ ---
  {
    nome: "Rajada Agonizante (Agonizing Blast)",
    nivelMinimo: 2,
    requisito: "Truque de Bruxo que cause dano",
    desc: "Escolha um truque de dano. Adicione seu modificador de Carisma ao dano dele. (Pode pegar mais de uma vez para truques diferentes)."
  },
  {
    nome: "Armadura das Sombras (Armor of Shadows)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Você pode conjurar 'Armadura Arcana' (Mage Armor) em si mesmo à vontade, sem gastar slot."
  },
  {
    nome: "Visão Diabólica (Devil's Sight)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Você enxerga normalmente em escuridão mágica e não-mágica até 120 pés (36m)."
  },
  {
    nome: "Lança Mística (Eldritch Spear)",
    nivelMinimo: 2,
    requisito: "Truque de Bruxo que cause dano (alcance 10ft+)",
    desc: "Aumenta o alcance do truque escolhido em Nível de Bruxo x 30 pés."
  },
  {
    nome: "Vigor Infernal (Fiendish Vigor)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Vitalidade Falsa' (False Life) em si mesmo à vontade (sem slot). Você ganha o valor máximo do dado automaticamente."
  },
  {
    nome: "Lições dos Primeiros (Lessons of the First Ones)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Você ganha um Talento de Origem (Origin Feat) à sua escolha. (Pode pegar mais de uma vez)."
  },
  {
    nome: "Máscara de Muitas Faces (Mask of Many Faces)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Disfarçar-se' (Disguise Self) à vontade, sem gastar slot."
  },
  {
    nome: "Visões Nevoadas (Misty Visions)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Imagem Silenciosa' (Silent Image) à vontade, sem gastar slot."
  },
  {
    nome: "Salto de Outro Mundo (Otherworldly Leap)",
    nivelMinimo: 2,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Salto' (Jump) em si mesmo à vontade, sem gastar slot."
  },
  {
    nome: "Rajada Repulsora (Repelling Blast)",
    nivelMinimo: 2,
    requisito: "Truque de Bruxo que cause dano",
    desc: "Quando acertar criatura Grande ou menor com o truque escolhido, empurra ela 10 pés para longe."
  },
  {
    nome: "Mente Mística (Eldritch Mind)",
    nivelMinimo: 2, // O texto não diz nível, mas geralmente invocações passivas entram no pool geral
    requisito: "Nenhum",
    desc: "Você tem Vantagem em testes de Constituição para manter Concentração."
  },

  // --- NÍVEL 5+ ---
  {
    nome: "Passo Ascendente (Ascendant Step)",
    nivelMinimo: 5,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Levitar' (Levitate) em si mesmo à vontade, sem gastar slot."
  },
  {
    nome: "Destruição Mística (Eldritch Smite)",
    nivelMinimo: 5,
    requisito: "Pacto da Lâmina",
    desc: "Ao acertar com arma de pacto, gaste slot para causar +1d8 de Força (+1d8 por nível do slot) e derrubar (Prone) se for Enorme ou menor."
  },
  {
    nome: "Olhar de Duas Mentes (Gaze of Two Minds)",
    nivelMinimo: 5,
    requisito: "Nenhum",
    desc: "Ação Bônus: Toque um voluntário para ver/ouvir pelos sentidos dele. Pode conjurar magias como se estivesse no espaço dele."
  },
  {
    nome: "Dádiva das Profundezas (Gift of the Depths)",
    nivelMinimo: 5,
    requisito: "Nenhum",
    desc: "Respira na água, ganha Natação. Conjura 'Respirar na Água' (Water Breathing) 1x/dia sem slot."
  },
  {
    nome: "Investidura do Mestre das Correntes (Investment of the Chain Master)",
    nivelMinimo: 5,
    requisito: "Pacto da Corrente",
    desc: "Familiar ganha Voo ou Natação (40ft), ataques mágicos e usa sua CD de magia. Bônus: Mande ele atacar. Reação: Dê resistência a ele."
  },
  {
    nome: "Mestre das Miríades de Formas (Master of Myriad Forms)",
    nivelMinimo: 5,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Alterar-se' (Alter Self) à vontade, sem gastar slot."
  },
  {
    nome: "Uno com as Sombras (One with Shadows)",
    nivelMinimo: 5,
    requisito: "Nenhum",
    desc: "Se estiver em penumbra ou escuridão, pode conjurar 'Invisibilidade' (Invisibility) em si mesmo sem gastar slot."
  },
  {
    nome: "Lâmina Sedenta (Thirsting Blade)",
    nivelMinimo: 5,
    requisito: "Pacto da Lâmina",
    desc: "Você ganha Ataque Extra com sua arma de pacto (ataca 2 vezes)."
  },

  // --- NÍVEL 7+ ---
  {
    nome: "Sussurros da Sepultura (Whispers of the Grave)",
    nivelMinimo: 7,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Falar com os Mortos' (Speak with Dead) à vontade, sem gastar slot."
  },

  // --- NÍVEL 9+ ---
  {
    nome: "Dádiva dos Protetores (Gift of the Protectors)",
    nivelMinimo: 9,
    requisito: "Pacto do Tomo",
    desc: "Escreva nomes no livro (max = CAR). Se um deles cair a 0 PV, cai a 1 PV em vez disso. (1x/dia por página)."
  },
  {
    nome: "Bebedor de Vida (Lifedrinker)",
    nivelMinimo: 9,
    requisito: "Pacto da Lâmina",
    desc: "Ao acertar com arma de pacto: +1d6 extra (Necrótico/Psíquico/Radiante). Pode gastar Hit Die para se curar no acerto."
  },
  {
    nome: "Visões de Reinos Distantes (Visions of Distant Realms)",
    nivelMinimo: 9,
    requisito: "Nenhum",
    desc: "Pode conjurar 'Olho Arcano' (Arcane Eye) à vontade, sem gastar slot."
  },

  // --- NÍVEL 12+ ---
  {
    nome: "Lâmina Devoradora (Devouring Blade)",
    nivelMinimo: 12,
    requisito: "Lâmina Sedenta (Thirsting Blade)",
    desc: "O Ataque Extra da Lâmina Sedenta agora confere 2 ataques extras (Total 3 ataques)."
  },

  // --- NÍVEL 15+ ---
  {
    nome: "Visão da Bruxa (Witch Sight)",
    nivelMinimo: 15,
    requisito: "Nenhum",
    desc: "Você tem Visão Verdadeira (Truesight) com alcance de 30 pés."
  }
];