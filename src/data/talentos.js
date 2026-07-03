// src/data/talentos.js

export const TALENTOS = {
  "Alerta": {
    nome: "Alerta (Alert)",
    descricao: "Você ganha um bônus em sua iniciativa igual ao seu Bônus de Proficiência. Além disso, no início do combate, você pode trocar sua iniciativa com a de um aliado voluntário.",
    prerequisito: "Nenhum"
  },
  "Artesão": { // 👈 Corrigido para bater com o antecedente "Artesão (Crafter)"
    nome: "Artesão (Crafter)",
    descricao: "Você ganha proficiência em três ferramentas de artesão à sua escolha. Além disso, você recebe 20% de desconto ao comprar equipamentos mundanos.",
    prerequisito: "Nenhum"
  },
  "Sortudo": {
    nome: "Sortudo (Lucky)",
    descricao: "Você tem pontos de sorte iguais ao seu Bônus de Proficiência. Você pode gastá-los para ganhar Vantagem em uma jogada de d20 ou forçar um inimigo a refazer um ataque contra você.",
    prerequisito: "Nenhum"
  },
  "Iniciado em Magia": {
    nome: "Iniciado em Magia (Magic Initiate)",
    descricao: "Você aprende 2 Truques e 1 Magia de Nível 1 de uma lista de classe específica (Clérigo, Druida ou Mago). Você pode conjurar a magia de nível 1 sem gastar espaços de magia uma vez por Descanso Longo.",
    prerequisito: "Nenhum"
  },
  "Músico": {
    nome: "Músico (Musician)",
    descricao: "Você ganha proficiência em três instrumentos musicais. Ao final de um descanso curto ou longo, você pode tocar uma canção e dar Inspiração Heroica para um número de aliados igual ao seu Bônus de Proficiência.",
    prerequisito: "Nenhum"
  },
  "Atacante Selvagem": {
    nome: "Atacante Selvagem (Savage Attacker)",
    descricao: "Uma vez por turno, ao acertar um ataque com uma arma corpo a corpo, você pode rolar os dados de dano da arma duas vezes e usar o maior resultado.",
    prerequisito: "Nenhum"
  },
  "Brigão de Taverna": {
    nome: "Brigão de Taverna (Tavern Brawler)",
    descricao: "Seus ataques desarmados causam 1d4 + Mod de Força. Quando você acerta um ataque desarmado no seu turno, você pode empurrar o alvo 5 pés ou causar dano extra.",
    prerequisito: "Nenhum"
  },
  "Habilidoso": {
    nome: "Habilidoso (Skilled)",
    descricao: "Você ganha proficiência em qualquer combinação de três perícias ou ferramentas à sua escolha.",
    prerequisito: "Nenhum"
  },
  "Robustez": { // 👈 Corrigido para bater com o antecedente "Robustez (Tough)"
    nome: "Robustez (Tough)",
    descricao: "Seu ponto de vida máximo aumenta em um valor igual a duas vezes o seu nível quando você ganha este talento. Sempre que você subir de nível, você ganha 2 PV extras.",
    prerequisito: "Nenhum"
  },
  "Curandeiro": {
    nome: "Curandeiro (Healer)",
    descricao: "Quando você usa um Kit de Curandeiro para estabilizar um aliado caído, ele recupera 1 PV e se levanta. Como uma ação, você pode gastar um uso do kit para curar 1d4 + Bônus de Proficiência de um aliado.",
    prerequisito: "Nenhum"
  },
  "Sobrevivente": {
    nome: "Sobrevivente (Survivor)",
    descricao: "Hipervigilância: Ao rolar Iniciativa, se o dado (d20) der 9 ou menos, você pode rerolar, mas deve usar o novo resultado. Preparar o Espírito (Steel Yourself): Se falhar num save contra ficar Enfeitiçado ou Amedrontado, você pode usar uma Reação para adicionar seu Bônus de Proficiência à rolagem, potencialmente transformando a falha num sucesso (1 uso por Descanso Longo).",
    prerequisito: "Nenhum"
  },
  "Olho Clínico": {
    nome: "Olho Clínico (Sharp Eye)",
    descricao: "Quando você usa a Ação de Buscar (Search) ou Estudar (Study), você pode se conceder Vantagem no teste de habilidade feito como parte da ação. Se o teste falhar, o uso do talento NÃO é gasto. (Usos = Proficiência / Descanso Longo).",
    prerequisito: "Nenhum"
  },
  "Iniciado do Culto do Dragão": {
    nome: "Iniciado do Culto do Dragão (Cult of the Dragon Initiate)",
    descricao: "Você aprende o idioma Dracônico. Como uma Ação Mágica, pode tentar amedrontar uma criatura a até 30ft (Save SAB, CD 8 + Sab + Prof). Se a criatura falhar, fica Amedrontada até o fim do seu próximo turno. Ao causar a condição Amedrontado desta forma, você ganha Inspiração Heroica (1 vez por Descanso Curto ou Longo).",
    prerequisito: "Nenhum"
  },
  "Novato do Enclave Esmeralda": {
    nome: "Novato do Enclave Esmeralda (Emerald Enclave Fledgling)",
    descricao: "Você tem a magia 'Falar com Animais' sempre preparada e pode conjurá-la como Ritual para durar 8 horas (Int, Sab ou Car). Ao usar a ação de Ajuda, você pode trocar de lugar com um aliado voluntário a até 5ft como parte da mesma ação, sem provocar ataques de oportunidade.",
    prerequisito: "Nenhum"
  },
  "Agente dos Harpistas": {
    nome: "Agente dos Harpistas (Harper Agent)",
    descricao: "Você aprende a Gíria de Ladrão (Thieves' Cant) e ganha proficiência com um instrumento musical. Ao usar a ação de Ajuda para auxiliar o ataque de um aliado, o inimigo que você distrai pode estar a até 30ft de você (desde que ele possa te ver ou ouvir), em vez de 5ft.",
    prerequisito: "Nenhum"
  },
  "Agente da Aliança dos Lordes": {
    nome: "Agente da Aliança dos Lordes (Lords' Alliance Agent)",
    descricao: "Uma vez por turno, ao conseguir um Acerto Crítico, um aliado a 30ft de você ganha Inspiração Heroica. Além disso, quando um inimigo causa dano a um aliado seu que está a até 5ft de você, você tem Vantagem no seu próximo ataque contra esse inimigo até o final do seu próximo turno.",
    prerequisito: "Nenhum"
  },
  "Recruta do Dragão Púrpura": {
    nome: "Recruta do Dragão Púrpura (Purple Dragon Rook)",
    descricao: "Você ganha proficiência em Intuição, Performance ou Persuasão. Ao rolar Iniciativa (se não estiver incapacitado), você pode conceder Inspiração Heroica a um número de criaturas a 30ft igual ao seu Bônus de Proficiência (1 vez por Descanso Longo).",
    prerequisito: "Nenhum"
  },
  "Centelha de Fogo Mágico": {
    nome: "Centelha de Fogo Mágico (Spellfire Spark)",
    descricao: "Uma vez por turno, ao sofrer dano de uma magia, você reduz o dano total em 1d4. Você também aprende o truque 'Chama Sagrada' (Int, Sab ou Car) e pode conjurá-lo como Ação Bônus um número de vezes igual ao seu Bônus de Proficiência por Descanso Longo.",
    prerequisito: "Nenhum"
  },
  "Iniciante da Manopla": {
    nome: "Iniciante da Manopla (Tyro of the Gauntlet)",
    descricao: "Reação: Se um aliado a até 5ft de você for empurrado ou puxado, você pode prevenir esse movimento. Além disso, quando você usa a ação de Preparar (Ready), o próximo ataque feito contra você tem Desvantagem até o início do seu próximo turno.",
    prerequisito: "Nenhum"
  },
  "Rufião Zhentarim": {
    nome: "Rufião Zhentarim (Zhentarim Ruffian)",
    descricao: "Ao rolar dano de um Ataque de Oportunidade, role os dados de dano duas vezes e use qualquer um dos dois totais. Além disso, se tiver Inspiração Heroica ao rolar Iniciativa, pode gastá-la para conceder Vantagem na rolagem de Iniciativa para você e todos os seus aliados.",
    prerequisito: "Nenhum"
  },
  "Filho do Sol": {
    nome: "Filho do Sol (Child of the Sun)",
    descricao: "Olhos de Eirdu: Você e aliados a até 10ft têm Vantagem em saves para evitar ou encerrar a condição Cego. Você aprende a magia 'Fogo das Fadas' (Int, Sab ou Car) e pode conjurá-la 1x por Descanso Longo sem gastar espaço de magia. Ao conjurar desta forma (sem espaço de magia), sofrer dano NÃO pode quebrar a sua Concentração.",
    prerequisito: "Nenhum"
  },
  "Bruxo de Shadowmoor": {
    nome: "Bruxo de Shadowmoor (Shadowmoor Hexer)",
    descricao: "Você sempre tem a magia 'Bruxaria' (Hex) preparada (Int, Sab ou Car) e pode conjurá-la 1x por Descanso Longo sem gastar espaço de magia. Quando uma criatura amaldiçoada pelo seu Hex te acerta com um ataque, ela sofre dano Psíquico igual ao seu Bônus de Proficiência (uma vez por turno).",
    prerequisito: "Nenhum"
  },
  "Folião Incansável": {
    nome: "Folião Incansável (Tireless Reveler)",
    descricao: "Quando um aliado que você consiga ver a até 60ft gastar uma Inspiração Heroica, você ganha Inspiração Heroica se não tiver. Você pode usar este benefício um número de vezes igual ao seu Bônus de Proficiência por Descanso Curto ou Longo.",
    prerequisito: "Nenhum"
  },
  "Caçador de Vampiros": {
    nome: "Caçador de Vampiros (Vampire Hunter)",
    descricao: "Você tem Vantagem em testes para escapar da condição Agarrado (Grappled) ou de amarras não-mágicas. Quando sofrer dano Necrótico, você pode usar sua Reação para rolar uma quantidade de d6s igual ao seu Bônus de Proficiência; reduza o dano Necrótico pelo total rolado nos dados (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nenhum"
  },
  "Brinquedo de Vampiro": {
    nome: "Brinquedo de Vampiro (Vampire's Plaything)",
    descricao: "Após um Descanso Longo, cria 1 Poção de Cura ou Antitoxina que evapora no próximo descanso longo. Pode usar Ação Bônus para Disparada (Dash) ou Desengajar (Usos = Proficiência / Descanso Longo). Conexão Vampírica: Seu antigo mestre vampiro pode falar telepaticamente com você e enxergar pelos seus sentidos se você permitir.",
    prerequisito: "Nenhum"
  },
  //Talentos Gerais
  "Melhoria de Atributo": {
    nome: "Melhoria de Atributo (Ability Score Improvement)",
    descricao: "Aumente um atributo à sua escolha em +2, ou dois atributos à sua escolha em +1 (até o máximo de 20). Este talento pode ser escolhido múltiplas vezes.",
    prerequisito: "Nível 4+"
  },
  "Ator": {
    nome: "Ator (Actor)",
    descricao: "*Aumente seu Carisma em +1 (máx. 20).* Você tem Vantagem em testes de Carisma (Enganação ou Performance) para se passar por uma pessoa real ou fictícia enquanto estiver disfarçado. Mímica: Você pode imitar vozes e sons de outras criaturas; descobrir a farsa requer um teste de Intuição (SAB) contra a sua CD (8 + Mod. Carisma + Prof).",
    prerequisito: "Nível 4+, Carisma 13+"
  },
  "Atleta": {
    nome: "Atleta (Athlete)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Você ganha um Deslocamento de Escalada igual ao seu deslocamento atual. Se estiver Deitado, levantar-se custa apenas 5ft de movimento. Você pode fazer saltos em distância e altura com corrida se movendo apenas 5ft antes do salto.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Investida": {
    nome: "Investida (Charger)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Disparada Aprimorada: Usar a ação de Disparada aumenta seu deslocamento em 10ft. Ataque de Investida: Se você se mover ao menos 10ft em linha reta e acertar um ataque corpo-a-corpo logo em seguida, escolha um: causa +1d8 de dano extra OU empurra o alvo até 10ft (se for até uma categoria maior que você). Limite de 1 vez por turno.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Cozinheiro": {
    nome: "Cozinheiro (Chef)",
    descricao: "*Aumente sua Constituição ou Sabedoria em +1 (máx. 20).* Ganha proficiência com Utensílios de Cozinheiro. Num Descanso Curto, aliados que comerem sua comida e gastarem Dados de Vida curam 1d8 PV adicionais. Ao fim de um Descanso Longo (ou com 1h de trabalho), cria guloseimas (Usos = Proficiência). Uma criatura pode comer a guloseima como Ação Bônus para ganhar PV Temporário igual à sua Proficiência.",
    prerequisito: "Nível 4+"
  },
  "Especialista em Besta": {
    nome: "Especialista em Besta (Crossbow Expert)",
    descricao: "*Aumente sua Destreza em +1 (máx. 20).* Ignora a propriedade Recarga das bestas e pode recarregá-las sem mão livre. Atacar a 5ft do inimigo não causa Desvantagem. Se usar a propriedade Leve (Light) da Besta de Mão para fazer um ataque extra, você pode somar seu modificador de atributo no dano desse ataque extra.",
    prerequisito: "Nível 4+, Destreza 13+"
  },
  "Esmagador": {
    nome: "Esmagador (Crusher)",
    descricao: "*Aumente sua Força ou Constituição em +1 (máx. 20).* Uma vez por turno, ao acertar um ataque de dano Contundente num alvo (até um tamanho maior que o seu), pode movê-lo 5ft para um espaço livre. Ao causar um Acerto Crítico com dano contundente, todos os ataques contra aquele alvo têm Vantagem até o início do seu próximo turno.",
    prerequisito: "Nível 4+"
  },
  "Duelista Defensivo": {
    nome: "Duelista Defensivo (Defensive Duelist)",
    descricao: "*Aumente sua Destreza em +1 (máx. 20).* Se estiver empunhando uma arma Acuada (Finesse) e sofrer um ataque corpo-a-corpo, você pode usar uma Reação para somar seu Bônus de Proficiência à sua CA contra ataques corpo-a-corpo, mantendo esse bônus até o INÍCIO do seu próximo turno.",
    prerequisito: "Nível 4+, Destreza 13+"
  },
  "Empunhadura Dupla": {
    nome: "Empunhadura Dupla (Dual Wielder)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Ao realizar a ação de Ataque com uma arma Leve, pode fazer 1 ataque extra como Ação Bônus usando UMA OUTRA arma corpo-a-corpo que NÃO tenha a propriedade Duas Mãos. (Você não soma atributo no dano extra, a menos que seja negativo). Você pode sacar/guardar duas armas sem a propriedade 'Duas Mãos' simultaneamente.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Durável": {
    nome: "Durável (Durable)",
    descricao: "*Aumente sua Constituição em +1 (máx. 20).* Desafiar a Morte: Você tem Vantagem nos Testes de Resistência contra a Morte. Recuperação Rápida: Como uma Ação Bônus, você pode gastar um de seus Dados de Vida, rolá-lo e recuperar Pontos de Vida iguais ao valor rolado no dado.",
    prerequisito: "Nível 4+"
  },
  "Adepto Elemental": {
    nome: "Adepto Elemental (Elemental Adept)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Maestria de Energia: Escolha Ácido, Frio, Fogo, Elétrico ou Trovejante. Suas magias ignoram Resistência ao tipo de dano escolhido. Ao rolar dano desse tipo, trate qualquer 1 rolado nos dados como um 2. (Pode ser escolhido múltiplas vezes para tipos diferentes).",
    prerequisito: "Nível 4+, Característica de Conjuração ou Magia de Pacto"
  },
  "Tocado pelas Fadas": {
    nome: "Tocado pelas Fadas (Fey Touched)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Magia Feérica: Escolha 1 magia de Nível 1 de Adivinhação ou Encantamento. Você sempre tem essa magia e 'Passo Nebuloso' preparadas. Pode conjurá-las 1 vez cada por Descanso Longo sem gastar espaço de magia. O atributo de conjuração é o mesmo aumentado por este talento.",
    prerequisito: "Nível 4+"
  },
  "Agarrador": {
    nome: "Agarrador (Grappler)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Soco e Agarrão: Ao acertar um Ataque Desarmado com a ação de Ataque, pode causar o Dano e aplicar o Agarrão (Grapple) simultaneamente (1x por turno). Vantagem de Ataque: Vantagem em ataques contra criaturas que você está agarrando. Lutador Rápido: Mover uma criatura agarrada (do seu tamanho ou menor) não custa deslocamento extra.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Mestre de Armas Grandes": {
    nome: "Mestre de Armas Grandes (Great Weapon Master)",
    descricao: "*Aumente sua Força em +1 (máx. 20).* Maestria com Arma Pesada: Ao acertar uma criatura com uma arma de propriedade Pesada (Heavy) na sua Ação de Ataque, causa dano extra igual ao seu Bônus de Proficiência. Talhar: Ao causar um Crítico corpo-a-corpo ou reduzir um alvo a 0 PV, pode fazer 1 ataque extra com a mesma arma como Ação Bônus.",
    prerequisito: "Nível 4+, Força 13+"
  },
  "Fortemente Blindado": {
    nome: "Fortemente Blindado (Heavily Armored)",
    descricao: "*Aumente sua Força ou Constituição em +1 (máx. 20).* Você ganha treinamento (proficiência) com Armaduras Pesadas.",
    prerequisito: "Nível 4+, Proficiência em Armaduras Médias"
  },
  "Mestre de Armaduras Pesadas": {
    nome: "Mestre de Armaduras Pesadas (Heavy Armor Master)",
    descricao: "*Aumente sua Força ou Constituição em +1 (máx. 20).* Redução de Dano: Quando for atingido por um ataque enquanto veste uma Armadura Pesada, qualquer dano Contundente, Perfurante ou Cortante sofrido é reduzido em um valor igual ao seu Bônus de Proficiência.",
    prerequisito: "Nível 4+, Proficiência em Armaduras Pesadas"
  },
  "Líder Inspirador": {
    nome: "Líder Inspirador (Inspiring Leader)",
    descricao: "*Aumente sua Sabedoria ou Carisma em +1 (máx. 20).* Ao fim de um Descanso Curto ou Longo, você pode inspirar até 6 aliados a 30ft de você (pode incluir a si mesmo). Cada um ganha PV Temporário igual ao seu Nível de Personagem + o Modificador do atributo que você aumentou com este talento.",
    prerequisito: "Nível 4+, Sabedoria ou Carisma 13+"
  },
  "Mente Aguçada": {
    nome: "Mente Aguçada (Keen Mind)",
    descricao: "*Aumente sua Inteligência em +1 (máx. 20).* Conhecimento: Escolha Arcanismo, História, Investigação, Natureza ou Religião. Se não for proficiente, ganha proficiência; se já for, ganha Especialização (Expertise) nela. Estudo Rápido: Você pode usar a Ação de Estudar (Study) como uma Ação Bônus.",
    prerequisito: "Nível 4+, Inteligência 13+"
  },
  "Levemente Blindado": {
    nome: "Levemente Blindado (Lightly Armored)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Você ganha treinamento (proficiência) com Armaduras Leves e Escudos.",
    prerequisito: "Nível 4+"
  },
  "Matador de Magos": {
    nome: "Matador de Magos (Mage Slayer)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Quebrador de Concentração: Quando você causa dano a uma criatura que está se concentrando, ela tem Desvantagem no teste para manter a Concentração. Mente Protegida: Se você falhar em um Teste de Resistência de Inteligência, Sabedoria ou Carisma, pode transformá-lo num Sucesso em vez disso (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Treinamento com Armas Marciais": {
    nome: "Treinamento com Armas Marciais (Martial Weapon Training)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Você ganha proficiência com Armas Marciais.",
    prerequisito: "Nível 4+"
  },
  "Mestre de Armaduras Médias": {
    nome: "Mestre de Armaduras Médias (Medium Armor Master)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Usuário Destro: Enquanto vestir Armadura Média, você pode somar até 3 (em vez do máximo normal de 2) na sua CA, desde que sua Destreza seja 16 ou maior.",
    prerequisito: "Nível 4+, Proficiência em Armaduras Médias"
  },
  "Moderadamente Blindado": {
    nome: "Moderadamente Blindado (Moderately Armored)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Você ganha treinamento (proficiência) com Armaduras Médias.",
    prerequisito: "Nível 4+, Proficiência em Armaduras Leves"
  },
  "Observador": {
    nome: "Observador (Observant)",
    descricao: "*Aumente sua Inteligência ou Sabedoria em +1 (máx. 20).* Observador Atento: Escolha Intuição, Investigação ou Percepção. Ganha proficiência na escolhida (ou Especialização, se já for proficiente). Busca Rápida: Você pode usar a Ação de Buscar (Search) como uma Ação Bônus.",
    prerequisito: "Nível 4+, Inteligência ou Sabedoria 13+"
  },
  "Perfurador": {
    nome: "Perfurador (Piercer)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Perfuração: 1 vez por turno, ao acertar um ataque que cause dano Perfurante, pode rerolar um dos dados de dano da arma e usar o novo resultado. Crítico Aprimorado: Acertos Críticos com dano Perfurante rolam um dado de dano adicional.",
    prerequisito: "Nível 4+"
  },
  "Envenenador": {
    nome: "Envenenador (Poisoner)",
    descricao: "*Aumente sua Destreza ou Inteligência em +1 (máx. 20).* Seu dano ignora Resistência a Veneno. Ganha proficiência com Kit de Envenenador. Com 1h e 50 PO, cria doses de veneno (qtd = Bônus Prof). Ação Bônus p/ aplicar na arma (dura 1 min). Alvo atingido faz Save CON (CD 8 + Modificador deste talento + Prof) ou sofre 2d8 dano Venenoso e fica Envenenado até o fim do seu próximo turno.",
    prerequisito: "Nível 4+"
  },
  "Mestre de Armas de Haste": {
    nome: "Mestre de Armas de Haste (Polearm Master)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Golpe de Haste: Imediatamente após atacar com Bordão, Lança ou arma Pesada com Alcance (Reach), faça um ataque extra (Ação Bônus) com o cabo da arma, causando 1d4 de dano Contundente. Golpe Reativo: Com essas mesmas armas, você pode usar uma Reação para atacar uma criatura que ENTRA no alcance da sua arma.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Resiliente": {
    nome: "Resiliente (Resilient)",
    descricao: "*Escolha um atributo no qual você NÃO tenha proficiência em Testes de Resistência. Aumente este atributo em +1 (máx. 20).* Você ganha proficiência nos Testes de Resistência desse atributo escolhido.",
    prerequisito: "Nível 4+"
  },
  "Conjurador de Ritual": {
    nome: "Conjurador de Ritual (Ritual Caster)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Escolha magias nível 1 com a tag Ritual (quantidade = Bônus Prof). Elas ficam sempre preparadas. (Sempre que sua proficiência subir, adicione +1 magia de ritual nível 1). Ritual Rápido: 1 vez por Descanso Longo, pode conjurar uma magia de Ritual no seu tempo de conjuração normal, sem gastar espaços de magia.",
    prerequisito: "Nível 4+, Inteligência, Sabedoria ou Carisma 13+"
  },
  "Sentinela": {
    nome: "Sentinela (Sentinel)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Guardião: Imediatamente após uma criatura a 5ft de você usar a ação de Desengajar ou acertar um ataque em um alvo diferente de você, você pode fazer um Ataque de Oportunidade contra ela. Parada: Quando você acerta uma criatura com um Ataque de Oportunidade, o deslocamento dela cai para 0 pelo resto do turno.",
    prerequisito: "Nível 4+, Força ou Destreza 13+"
  },
  "Tocado pelas Sombras": {
    nome: "Tocado pelas Sombras (Shadow Touched)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Magia Sombria: Escolha 1 magia de Nível 1 de Ilusão ou Necromancia. Você sempre tem essa magia e 'Invisibilidade' preparadas. Pode conjurá-las 1 vez cada por Descanso Longo sem gastar espaço de magia. O atributo de conjuração é o mesmo aumentado por este talento.",
    prerequisito: "Nível 4+"
  },
  "Atirador de Elite": {
    nome: "Atirador de Elite (Sharpshooter)",
    descricao: "*Aumente sua Destreza em +1 (máx. 20).* Ignorar Cobertura: Seus ataques à distância ignoram Meia Cobertura e Cobertura Três-Quartos. Atirar em Combate: Estar a 5ft de um inimigo não causa Desvantagem nos seus ataques à distância. Tiros Longos: Atacar no limite de alcance longo da arma não causa Desvantagem na rolagem de ataque.",
    prerequisito: "Nível 4+, Destreza 13+"
  },
  "Mestre de Escudos": {
    nome: "Mestre de Escudos (Shield Master)",
    descricao: "*Aumente sua Força em +1 (máx. 20).* Pancada com Escudo: Ao acertar um ataque corpo-a-corpo (como parte da Ação de Ataque) a 5ft, você pode dar uma pancada de escudo (se equipado). O alvo faz Save FOR (CD 8 + Mod FOR + Prof) ou é empurrado 5ft ou fica Deitado (1 vez por turno). Interpor Escudo: Se sofrer um efeito que exija Save DES para levar metade do dano, e você passar no save, pode usar sua Reação para sofrer ZERO de dano.",
    prerequisito: "Nível 4+, Proficiência com Escudos"
  },
  "Especialista em Perícia": {
    nome: "Especialista em Perícia (Skill Expert)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 20).* Proficiência: Ganha proficiência em 1 perícia à sua escolha. Especialização (Expertise): Escolha 1 perícia em que você já tem proficiência. Você ganha Especialização nela.",
    prerequisito: "Nível 4+"
  },
  "Furtivo": {
    nome: "Furtivo (Skulker)",
    descricao: "*Aumente sua Destreza em +1 (máx. 20).* Percepção às Cegas: Ganha Blindsight num alcance de 10ft. Névoa de Guerra: Vantagem em testes de Furtividade (Stealth) ao usar a ação de Esconder-se em combate. Franco-Atirador: Se você fizer um ataque enquanto estiver escondido e errar, a rolagem não revela a sua localização.",
    prerequisito: "Nível 4+, Destreza 13+"
  },
  "Cortador": {
    nome: "Cortador (Slasher)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Mutilar: 1 vez por turno, ao acertar um ataque que cause dano Cortante, você reduz o deslocamento da criatura em 10ft até o início do seu próximo turno. Crítico Aprimorado: Quando você consegue um Acerto Crítico com dano Cortante, o alvo fica com Desvantagem em rolagens de ataque até o início do seu próximo turno.",
    prerequisito: "Nível 4+"
  },
  "Veloz": {
    nome: "Veloz (Speedy)",
    descricao: "*Aumente sua Destreza ou Constituição em +1 (máx. 20).* O seu Deslocamento aumenta em 10ft. Disparada em Terreno Difícil: Ao usar a Ação de Disparada, terreno difícil não custa movimento extra naquele turno. Movimento Ágil: Ataques de Oportunidade feitos contra você têm Desvantagem.",
    prerequisito: "Nível 4+, Destreza ou Constituição 13+"
  },
  "Franco-Atirador Mágico": {
    nome: "Franco-Atirador Mágico (Spell Sniper)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Ignorar Cobertura: Seus ataques com magias ignoram Meia Cobertura e Cobertura Três-Quartos. Magia Corpo-a-Corpo: Estar a 5ft de um inimigo não causa Desvantagem nas rolagens de ataque com magia. Alcance Aumentado: Se conjurar uma magia com pelo menos 10ft de alcance (que exija rolagem de ataque), seu alcance aumenta em 60ft.",
    prerequisito: "Nível 4+, Característica de Conjuração ou Magia de Pacto"
  },
  "Telecinético": {
    nome: "Telecinético (Telekinetic)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Aprende 'Mãos Mágicas'. Ao conjurar, a mão pode ficar Invisível, não exige componentes Verbais/Somáticos e seu alcance aumenta em 30ft. Empurrão Telecinético: Ação Bônus para empurrar criatura visível a 30ft. Alvo faz Save FOR (CD 8 + Mod do Atributo Escolhido + Prof) ou é movido 5ft em sua direção ou para longe.",
    prerequisito: "Nível 4+"
  },
  "Telepata": {
    nome: "Telepata (Telepathic)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Declaração Telepática: Fale telepaticamente com qualquer criatura visível a 60ft, num idioma que você conhece (ela não ganha a habilidade de responder). Detectar Pensamentos: Você sempre tem essa magia preparada e pode conjurá-la sem espaço de magia e sem componentes 1x por Descanso Longo.",
    prerequisito: "Nível 4+"
  },
  "Conjurador de Guerra": {
    nome: "Conjurador de Guerra (War Caster)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Concentração: Vantagem em saves de CON para manter Concentração. Magia Reativa: Se um alvo provocar Ataque de Oportunidade saindo do seu alcance, você pode usar a Reação para conjurar uma magia nele (tempo de 1 Ação, alvo único) em vez de atacar. Componentes Somáticos: Pode fazer gestos de magias mesmo empunhando armas/escudo.",
    prerequisito: "Nível 4+, Característica de Conjuração ou Magia de Pacto"
  },
  "Mestre de Armas": {
    nome: "Mestre de Armas (Weapon Master)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Propriedade de Maestria (Mastery): Você pode usar a propriedade de Maestria de 1 tipo de arma Simples ou Marcial de sua escolha (desde que tenha proficiência nela). Ao final de um Descanso Longo, pode trocar a arma escolhida para outra elegível.",
    prerequisito: "Nível 4+"
  },
  "Conjurador Gélido": {
    nome: "Conjurador Gélido (Cold Caster)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Você aprende o truque 'Raio de Gelo'. Mordida de Gelo (Frostbite): 1x por turno, ao acertar um ataque e causar dano Gélido (Cold), o alvo deve subtrair 1d4 do próximo Teste de Resistência que ele fizer antes do final do seu próximo turno.",
    prerequisito: "Nível 4+"
  },
  "Marcado pelo Dragão": {
    nome: "Marcado pelo Dragão (Dragonscarred)",
    descricao: "*Aumente sua Constituição ou Carisma em +1 (máx. 20).* Escolha Ácido, Frio, Fogo, Elétrico ou Veneno para ganhar Resistência. Poder Assustador: Ao causar dano num alvo com Ação de Ataque ou Mágica, pode usar o benefício 'Terror do Dragão' (do seu talento Iniciado do Culto do Dragão) como uma Ação Bônus neste turno.",
    prerequisito: "Nível 4+, Talento 'Iniciado do Culto do Dragão'"
  },
  "Magia do Enclave": {
    nome: "Magia do Enclave (Enclave Magic)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Amigo dos Animais: Vantagem ao usar ação de Influenciar Bestas. Você sempre tem a magia 'Sentido Bestial' preparada. Pode conjurá-la 1x por Descanso Longo sem espaço de magia e, quando o faz, ela NÃO exige Concentração.",
    prerequisito: "Nível 4+, Talento 'Novato do Enclave Esmeralda'"
  },
  "Trapaceiro Feérico": {
    nome: "Trapaceiro Feérico (Fairy Trickster)",
    descricao: "*Aumente sua Destreza ou Carisma em +1 (máx. 20).* Trote Feérico: Ao usar Desengajar, Terreno Difícil não custa movimento extra no turno. Ataque Confuso: Ao acertar um ataque, força o alvo a um Save SAB (CD 8 + Mod + Prof) ou ele tem Desvantagem em Testes de Resistência até o fim do seu próximo turno (Usos = Proficiência / Descanso Longo).",
    prerequisito: "Nível 4+"
  },
  "Magia de Gênio": {
    nome: "Magia de Gênio (Genie Magic)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Magia de Desejo (Wish Magic): Como Ação Mágica, conjura 1 magia de nível 1 da lista de Feiticeiro (1x por Descanso Longo). No nível 11 do personagem, a magia passa a ser conjurada como usando um slot nível 2. No nível 17, como slot nível 3.",
    prerequisito: "Nível 4+"
  },
  "Trabalho em Equipe Harpista": {
    nome: "Trabalho em Equipe Harpista (Harper Teamwork)",
    descricao: "*Aumente sua Destreza ou Carisma em +1 (máx. 20).* Ao usar Ajuda num ataque contra um inimigo, esse inimigo tem Desvantagem no PRIMEIRO Teste de Resistência que fizer antes do início do seu próximo turno. Se você passar num save para encerrar Amedrontado ou Paralisado em si mesmo, pode curar a mesma condição em 1 aliado a 30ft.",
    prerequisito: "Nível 4+, Talento 'Agente dos Harpistas'"
  },
  "Determinação Senhorial": {
    nome: "Determinação Senhorial (Lordly Resolve)",
    descricao: "*Aumente sua Força ou Carisma em +1 (máx. 20).* Porta-Estandarte (1x/Desc. Longo): Ação Bônus para escolher até 3 criaturas a 60ft. Elas podem usar Reação para deixar de estar Deitadas. Além disso, ficam 'apoiadas' por 1 min: não podem ser possuídas, Enfeitiçadas ou Amedrontadas (se já tiverem, ganham Vantagem no save para encerrar).",
    prerequisito: "Nível 4+, Talento 'Agente da Aliança dos Lordes'"
  },
  "Tocado por Mythal": {
    nome: "Tocado por Mythal (Mythal Touched)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Proteção de Mythal: Se for atingido por uma magia ou falhar num save contra magia, pode usar Reação para rolar 1d20 num efeito caótico (CD 8+Mod+Prof): (1-2) Dano em área, (3-7) Telepatia com o conjurador, (8-10) Inversão de Gravidade local, (11-13) Chance de atordoar a si e o conjurador, (14-17) +2 CA, (18-19) Fogo em objetos, ou (20) Anula a magia! (Usos = Proficiência / Descanso Longo).",
    prerequisito: "Nível 4+"
  },
  "Resiliência da Ordem": {
    nome: "Resiliência da Ordem (Order's Resilience)",
    descricao: "*Aumente sua Força, Sabedoria ou Carisma em +1 (máx. 20).* Ressurgir: Quando estiver Deitado (Prone), levantar-se custa apenas 5ft do seu movimento. Mais Fortes Juntos: Se estiver a 5ft de um aliado (que não esteja incapacitado), você e o aliado ganham Vantagem em Testes de Resistência de Força.",
    prerequisito: "Nível 4+, Talento 'Iniciante da Manopla'"
  },
  "Comandante do Dragão Púrpura": {
    nome: "Comandante do Dragão Púrpura (Purple Dragon Commandant)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Encorajar Aliado: Ação Bônus para dar 2d6 + seu Modificador do atributo deste talento em PV Temporário para um aliado a 30ft (Usos = Proficiência / Descanso Longo). Último Recurso (Last Stand): Você tem Vantagem nas rolagens de ataque enquanto estiver Sanguinolento (Bloodied - com menos da metade da vida máxima).",
    prerequisito: "Nível 4+, Talento 'Recruta do Dragão Púrpura' ou Prof. com Armas Marciais"
  },
  "Adepto do Fogo Mágico": {
    nome: "Adepto do Fogo Mágico (Spellfire Adept)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Fogo Mágico Combustível: 1x por turno, quando uma magia que você conjurou causar dano Radiante, você pode gastar até 2 Dados de Vida, rolar, e somar o total como dano Radiante extra na rolagem. Fogo Mágico Escaldante: Seu dano Radiante ignora Resistências a dano Radiante.",
    prerequisito: "Nível 4+, Talento 'Centelha de Fogo Mágico' ou Conjuração/Magia de Pacto"
  },
  "Justiça das Ruas": {
    nome: "Justiça das Ruas (Street Justice)",
    descricao: "*Aumente sua Força ou Destreza em +1 (máx. 20).* Gravata (Headlock): Seus aliados têm Vantagem nos ataques contra qualquer criatura que esteja Agarrada (Grappled) por você. Nó Firme: Você soma sua Proficiência na CD para inimigos escaparem de correntes ou cordas amarradas por você. Papo Reto: Atitude Hostil do inimigo não causa Desvantagem na sua Intimidação.",
    prerequisito: "Nível 4+"
  },
  "Táticas Zhentarim": {
    nome: "Táticas Zhentarim (Zhentarim Tactics)",
    descricao: "*Aumente sua Destreza ou Carisma em +1 (máx. 20).* Retaliar: Imediatamente após uma criatura a 5ft te atingir com um ataque corpo-a-corpo, você pode fazer um Ataque de Oportunidade contra ela. Mercenário Versátil: Ao fim de um Descanso Longo, escolha 1 perícia que seja proficiente; você ganha Especialização (Expertise) nela até o fim do próximo Descanso Longo.",
    prerequisito: "Nível 4+, Talento 'Rufião Zhentarim'"
  },
  "Sedento de Sangue": {
    nome: "Sedento de Sangue (Bloodlust)",
    descricao: "*Aumente sua Força, Destreza ou Constituição em +1 (máx. 20).* Recuperação Poderosa: Ao rolar Dado de Vida para curar, trate rolagens 1 ou 2 como 3. Banquete Sanguíneo (1x/turno): Ao acertar um ataque numa criatura Sanguinolenta (Bloodied) que não seja Construto/Morto-Vivo, você pode gastar 1 Dado de Vida, rolá-lo e curar igual ao valor rolado + Mod. Constituição (Usos = Proficiência / Descanso Longo).",
    prerequisito: "Nível 4+"
  },
  "Bombardeiro": {
    nome: "Bombardeiro (Bomber)",
    descricao: "*Aumente sua Destreza em +1 (máx. 20).* Lançamento Distante: Ao usar a Ação de Ataque para arremessar um frasco ou ampola, você pode mirar em um alvo ou objeto a até 40ft de você. Tiros Longos: Atacar em alcance longo não impõe Desvantagem nas suas rolagens de ataque com armas de Arremesso.",
    prerequisito: "Nível 4+"
  },
  "Névoas Sufocantes": {
    nome: "Névoas Sufocantes (Cloying Mists)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Erga-se, Névoa: Você sempre tem a magia 'Névoa Obscurecente' preparada. Pode conjurá-la 1x por Descanso Longo sem gastar espaço de magia. Névoa Agarradora: Sempre que conjurar essa magia, chamas não-mágicas na área se apagam, e criaturas (exceto você e aliados) têm o Deslocamento reduzido em 5ft enquanto estiverem nela.",
    prerequisito: "Nível 4+"
  },
  "Dor Deliciosa": {
    nome: "Dor Deliciosa (Delicious Pain)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 20).* Carne Endurecida: Imediatamente após sofrer dano Contundente, Perfurante ou Cortante, você pode usar uma Reação para ganhar Resistência a danos Contundentes, Perfurantes e Cortantes até o início do seu próximo turno. (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Portador da Luz": {
    nome: "Portador da Luz (Light Bringer)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Aprende o truque 'Luz' (sem componentes materiais). Luminância Solar: 1x por Desc. Longo, pode fazer a luz da magia ser Luz do Sol real. Cura do Sol: Como Ação Bônus, se estiver sob luz solar, pode gastar 1 Dado de Vida, rolá-lo e curar o valor rolado. (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Mordida de Amor": {
    nome: "Mordida de Amor (Love Bites)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 20).* Dor Cativante: Imediatamente após causar dano a uma criatura com uma arma corpo-a-corpo ou Ataque Desarmado, você pode usar uma Ação Bônus para deixar o alvo Enfeitiçado (Charmed) por você até o início do seu próximo turno, ou até você ou seus aliados o danificarem. (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Putrefazer": {
    nome: "Putrefazer (Putrefy)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 20).* Necrose: Ao rolar dano Necrótico, você pode forçar UMA criatura que sofreu o dano a ficar com a condição Envenenado (Poisoned) até o início do seu próximo turno. (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Repreensão": {
    nome: "Repreensão (Rebuke)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 20).* Golpe Radiante: Ao rolar dano Radiante, você pode forçar UMA criatura Enorme (Huge) ou menor que sofreu o dano a ficar com a condição Deitado (Prone). (1 uso por Descanso Curto ou Longo).",
    prerequisito: "Nível 4+"
  },
  "Fascínio Traiçoeiro": {
    nome: "Fascínio Traiçoeiro (Treacherous Allure)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Você sempre tem a magia 'Enfeitiçar Pessoa' preparada. Pode conjurá-la 1x por Descanso Longo sem espaço de magia. Traição Inevitável: Você tem Vantagem em rolagens de ataque contra criaturas com a condição Enfeitiçado.",
    prerequisito: "Nível 4+"
  },
  "Tocado pelo Vampiro": {
    nome: "Tocado pelo Vampiro (Vampire Touched)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (máx. 20).* Magia Vampírica: Escolha 1 magia de Nível 1 de Encantamento ou Ilusão. Ela e 'Patas de Aranha' (Spider Climb) estão sempre preparadas. Pode conjurar cada uma 1x por Descanso Longo sem espaço de magia (ao conjurar Patas de Aranha assim, deve mirar em si mesmo).",
    prerequisito: "Nível 4+"
  },
  "Dádiva da Proeza em Combate": {
    nome: "Dádiva da Proeza em Combate (Boon of Combat Prowess)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Mira Inigualável: Quando você errar uma rolagem de ataque, você pode transformá-la em um acerto. (1 uso por turno).",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Viagem Dimensional": {
    nome: "Dádiva da Viagem Dimensional (Boon of Dimensional Travel)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Passos Piscantes: Imediatamente após realizar a Ação de Ataque ou Ação Mágica, você pode se teletransportar até 30ft para um espaço desocupado que possa ver.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Resistência a Energia": {
    nome: "Dádiva da Resistência a Energia (Boon of Energy Resistance)",
    descricao: "*Aumente um atributo à sua escolha em +1 (máx. 30).* Resistências: Escolha duas entre Ácido, Frio, Fogo, Elétrico, Necrótico, Veneno, Psíquico, Radiante ou Trovejante para ter Resistência (pode trocar no Descanso Longo). Redirecionar: Ao sofrer dano de um dos tipos escolhidos, use a Reação para redirecionar a outra criatura a 60ft. Ela faz Save DES (CD 8+Mod CON+Prof) ou sofre 2d12 + Mod CON de dano daquele tipo.",
    prerequisito: "Nível 19+"
  },
  "Dádiva do Destino": {
    nome: "Dádiva do Destino (Boon of Fate)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Melhorar o Destino: Quando você ou outra criatura a 60ft tiver sucesso ou falhar em um Teste de d20, você pode rolar 2d4 e aplicar o total como um bônus ou penalidade na rolagem do d20. (Recarrega ao rolar Iniciativa ou após Descanso Curto/Longo).",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Fortitude": {
    nome: "Dádiva da Fortitude (Boon of Fortitude)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Saúde Fortificada: Seu PV Máximo aumenta em 40. Além disso, sempre que você curar Pontos de Vida, você recupera PV extras iguais ao seu modificador de Constituição (limite de 1 vez por turno).",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Ofensiva Irresistível": {
    nome: "Dádiva da Ofensiva Irresistível (Boon of Irresistible Offense)",
    descricao: "*Aumente sua Força ou Destreza em +1 (limite máximo de 30).* Superar Defesas: Seu dano Contundente, Perfurante e Cortante SEMPRE ignora Resistências. Golpe Esmagador: Ao rolar um 20 natural no d20 de um ataque, você causa dano extra ao alvo igual ao valor do atributo que você aumentou com este talento.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Recuperação": {
    nome: "Dádiva da Recuperação (Boon of Recovery)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Último Recurso: Ao cair a 0 PV, você cai para 1 PV e cura metade do seu PV Máximo (1x por Descanso Longo). Vitalidade: Você ganha uma reserva de dez d10s. Como Ação Bônus, pode gastar dados da reserva, rolá-los e curar o total rolado (recarrega tudo no Descanso Longo).",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Perícia": {
    nome: "Dádiva da Perícia (Boon of Skill)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Adepto Completo: Você ganha proficiência em TODAS as perícias do jogo. Especialização: Escolha uma perícia na qual você não tenha Especialização (Expertise) e ganhe Especialização nela.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Velocidade": {
    nome: "Dádiva da Velocidade (Boon of Speed)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Artista da Fuga: Como uma Ação Bônus, você pode usar a ação de Desengajar, o que TAMBÉM encerra a condição Agarrado (Grappled) em você. Rapidez: Seu Deslocamento aumenta em 30ft.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Lembrança Mágica": {
    nome: "Dádiva da Lembrança Mágica (Boon of Spell Recall)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (limite máximo de 30).* Conjuração Livre: Sempre que você conjurar uma magia gastando um espaço de magia de nível 1 a 4, role 1d4. Se o número rolado for IGUAL ao nível do espaço gasto, o espaço de magia NÃO é consumido.",
    prerequisito: "Nível 19+"
  },
  "Dádiva do Espírito da Noite": {
    nome: "Dádiva do Espírito da Noite (Boon of the Night Spirit)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Fundir-se às Sombras: Em Penumbra ou Escuridão, use Ação Bônus para ficar Invisível (quebra ao usar Ação, Ação Bônus ou Reação). Forma Sombria: Em Penumbra ou Escuridão, você ganha Resistência a TODOS os danos, exceto Psíquico e Radiante.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Visão Verdadeira": {
    nome: "Dádiva da Visão Verdadeira (Boon of Truesight)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Visão Verdadeira: Você ganha Visão Verdadeira (Truesight) com um alcance de 60ft.",
    prerequisito: "Nível 19+"
  },
  "Dádiva de Siberys": {
    nome: "Dádiva de Siberys (Boon of Siberys)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Magia Aberrante: Escolha 1 magia de nível 8 ou menor da lista de Feiticeiro (ou baseada em uma Marca do Dragão). Ela está sempre preparada. Você pode conjurá-la 1x por Descanso Curto ou Longo sem gastar espaço de magia e sem componentes.",
    prerequisito: "Nível 19+, Campanha de Eberron"
  },
  "Dádiva do Derramamento de Sangue": {
    nome: "Dádiva do Derramamento de Sangue (Boon of Bloodshed)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Sorte do Assassino: Quando um inimigo visível cai a 0 PV, você ganha Vantagem no seu próximo ataque até o fim do seu próximo turno. Poder da Dor: 1x por turno, se atacar enquanto estiver Sanguinolento (Bloodied), causa dano extra igual à sua Proficiência.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Saúde Farta": {
    nome: "Dádiva da Saúde Farta (Boon of Bountiful Health)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Saúde Aumentada: Sempre que ganhar Pontos de Vida Temporários, adicione +5 ao total. Recuperação Superior: Ao gastar Dados de Vida para curar, não role; use sempre o valor máximo possível de cada dado.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Comunicação": {
    nome: "Dádiva da Comunicação (Boon of Communication)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (limite máximo de 30).* Falante Astuto: Sem Desvantagem para influenciar criaturas Hostis. Intérprete Brilhante: Compreende o significado literal de qualquer idioma falado, lido ou em linguagem de sinais. Comunicação Mental: Ganha Telepatia com alcance de 120ft.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Resiliência Desesperada": {
    nome: "Dádiva da Resiliência Desesperada (Boon of Desperate Resilience)",
    descricao: "*Aumente sua Força ou Constituição em +1 (limite máximo de 30).* Defesa de Corpo e Mente: Enquanto estiver Sanguinolento (Bloodied - menos da metade da vida), você tem Resistência a TODOS os tipos de dano, exceto dano de Energia (Force).",
    prerequisito: "Nível 19+"
  },
  "Dádiva do Esplendor Radiante": {
    nome: "Dádiva do Esplendor Radiante (Boon of Exquisite Radiance)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Descanso Eterno: Criaturas que você reduz a 0 PV não podem se tornar Mortos-Vivos. Radiância Poderosa: 1x por Descanso Longo, ao causar dano Radiante, você pode usar o valor MÁXIMO possível de cada dado em vez de rolar.",
    prerequisito: "Nível 19+"
  },
  "Dádiva das Formas Fluidas": {
    nome: "Dádiva das Formas Fluidas (Boon of Fluid Forms)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (limite máx de 30).* Metamorfo: Ação Mágica para se transformar em Besta, Humanoide ou Monstruosidade de ND 10 ou menor por 1 hora (1x por Descanso Longo). Ganha PV Temp igual à vida da forma + 20 extras. Você mantém sua mente, atributos mentais e feitiçaria.",
    prerequisito: "Nível 19+"
  },
  "Dádiva do Favor da Fortuna": {
    nome: "Dádiva do Favor da Fortuna (Boon of Fortune's Favor)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Rerrolar Resistência: Uma vez por turno, quando você falhar em um Teste de Resistência (Saving Throw), você pode rerolá-lo, mas deve usar o novo resultado.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Maestria em Veneno": {
    nome: "Dádiva da Maestria em Veneno (Boon of Poison Mastery)",
    descricao: "*Aumente um atributo à sua escolha em +1 (limite máximo de 30).* Antitóxico: Você é IMUNE a dano Venenoso e à condição Envenenado. Envenenador Perfeito: 1x por turno, ao rolar dano venenoso de ataques/magias, você pode usar o valor MÁXIMO de cada dado em vez de rolar.",
    prerequisito: "Nível 19+"
  },
  "Dádiva da Folia": {
    nome: "Dádiva da Folia (Boon of Revelry)",
    descricao: "*Aumente sua Inteligência, Sabedoria ou Carisma em +1 (limite máx de 30).* Sempre tem 'Dança Irresistível de Otto' preparada. 1x/Desc. Longo conjura sem slot/componentes, e sofrer dano NÃO quebra sua Concentração nela. Alvos enfeitiçados pela sua dança não podem conjurar magias verbais e cantam baboseiras.",
    prerequisito: "Nível 19+"
  },
  "Anatomia Aberrante": {
    nome: "Anatomia Aberrante (Aberrant Anatomy)",
    descricao: "Sem Fôlego: Prende a respiração por 1h. Percepção Extrassensorial: Ganha Proficiência e Especialização em Percepção, e Blindsight de 15ft. Carne Distorcida: Ao rolar 1 natural num Teste de d20, faça um Save CON (CD 13+Prof). Se falhar, fica Atordoado (Stunned) até o fim do seu próximo turno.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Alma Ecoante": {
    nome: "Alma Ecoante (Echoing Soul)",
    descricao: "Proeza Canalizada: Ganha proficiência em 2 perícias e Especialização em 1 perícia proficiente (pode trocar no Desc. Longo). Idiomas Inerentes: Aprende 1 idioma. Ecos Intrusivos: Ao rolar 1 natural num Teste de d20, faça um Save CON (CD 13+Prof). Se falhar, fica Incapacitado e com Deslocamento pela metade até o fim do seu próximo turno.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Sussurros Reunidos": {
    nome: "Sussurros Reunidos (Gathered Whispers)",
    descricao: "Sussurros: Aprende 'Mensagem' (sem comp. materiais). Sempre tem 'Augúrio' preparada (conjura 1x/Desc. Longo sem espaço de magia). Grito Sobrenatural: Ao ser atacado, use Reação para somar sua Proficiência à sua CA contra o ataque (Usos = Proficiência / Desc. Longo). Vozes do Além: Ao rolar 1 natural num Teste de d20, faça Save SAB (CD 13+Prof) ou fique Surdo e com Desvantagem em ataques e testes de habilidade até o fim do próximo turno.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Sombra Viva": {
    nome: "Sombra Viva (Living Shadow)",
    descricao: "Aprende 'Mãos Mágicas' (sem comp.). Golpe Alongado: Ao atacar corpo-a-corpo, pode aumentar seu alcance em 10ft (Usos = Prof / Desc. Longo). Vontade Agourenta: Ao rolar 1 natural num Teste de d20, faça Save SAB (CD 13+Prof). Se falhar, fica Incapacitado e sua sombra age (Role 1d8: 1 = Foge numa direção aleatória, 2-6 = Ataca criatura aleatória perto, 7-8 = Você cai Deitado).",
    prerequisito: "Campanha de Ravenloft"
  },
  "Andarilho das Brumas": {
    nome: "Andarilho das Brumas (Mist Walker)",
    descricao: "Viajante de Domínio: Age como se tivesse talismã das brumas pro seu destino. Caminhada das Brumas: Ao sofrer dano ou falhar num save de Agarrado/Impedido, use Reação para teleportar 15ft (Usos = Prof / Desc. Longo). Raízes Envenenadas: Num raio de 10 milhas de onde você faz Descanso Longo, o mundo suga sua vitalidade. Fazer Descanso Curto lá exige Save CON (CD 13+Prof); se falhar, você não ganha nenhum benefício do descanso.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Segunda Pele": {
    nome: "Segunda Pele (Second Skin)",
    descricao: "Forma Alternativa: Sempre tem 'Alterar-se' (Alter Self) preparada. Conjura 1x/Desc. Longo sem espaço de magia e SEM exigir Concentração. Mudança Involuntária: Você tem um gatilho (ex: cheiro, som, lua). Ao encontrar o gatilho, faça Save CAR (CD 13+Prof). Se falhar, conjura Alterar-se à força. Se já não tiver usos, fica Atordoado até o início do seu próximo turno.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Ser Simbiótico": {
    nome: "Ser Simbiótico (Symbiotic Being)",
    descricao: "Mente Compartilhada: O simbionte morre e revive com você. Ganha proficiência em 1 perícia de conhecimento/interação e 1 idioma. Simbiose: Ao falhar num save, use Reação para gastar 1 Dado de Vida e somá-lo ao save (Usos = Prof / Desc. Longo). Agenda Simbiótica: Ao rolar 1 natural num Teste d20, faça Save CAR (CD 13+Prof). Se falhar, fica Enfeitiçado pelo simbionte por 1d12 horas, forçado a seguir a agenda dele.",
    prerequisito: "Campanha de Ravenloft"
  },
  "Toque da Morte": {
    nome: "Toque da Morte (Touch of Death)",
    descricao: "Toque Mortal: Aprende o truque 'Toque Arrepiante' (Chill Touch) sem componentes. O dano necrótico deste feitiço ignora Resistências. Puxão do Túmulo: Você tem Desvantagem em Testes de Resistência contra a Morte (Death Saving Throws).",
    prerequisito: "Campanha de Ravenloft"
  },
  "Observadores": {
    nome: "Observadores (Watchers)",
    descricao: "Olhos Emprestados: Tem 'Sentido Bestial' e 'Falar com Animais' preparadas (conjura 1x/Desc. Longo sem espaço de magia). Ao usar Buscar, soma 1d4 ao teste. Observação Incessante: Desvantagem em saves contra a magia 'Vidência'. Além disso, ao rolar 1 natural num Teste de d20, faça Save SAB (CD 13+Prof) ou tenha Desvantagem em TODOS os Testes de d20 por 1 minuto (pode repetir o save no fim de cada turno).",
    prerequisito: "Campanha de Ravenloft"
  },
};