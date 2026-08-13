// src/utils/calculadoras.js
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';
import { ARMADURAS } from '../data/armaduras';
import { TALENTOS } from '../data/talentos';
import { RACAS } from '../data/racas';
import itensMagicos from '../data/itensMagicos';

/**
 * Calcula a Vida Máxima exata de um personagem seguindo as regras de D&D 5e.
 * Adicionado parâmetro opcional de bônus (Para Talentos como Robusto ou Anão da Colina)
 */
export function calcularVidaMaxima(classe, nivel, constituicao, bonusFixoPorNivel = 0) {
  const infoClasse = CLASSES_DETALHADAS[classe];
  
  // Se não achar a classe, retorna um valor seguro para não quebrar a tela
  if (!infoClasse) return 10; 

  const conMod = Math.floor(((constituicao || 10) - 10) / 2);
  const dv = infoClasse.dadoVida;
  
  // A média do dado no D&D é sempre a metade + 1 (ex: d8 vira 5, d10 vira 6)
  const mediaDv = (dv / 2) + 1;

  // Vida do Nível 1: Dado Cheio + Modificador de Constituição + Bônus Fixo
  let vida = dv + conMod + bonusFixoPorNivel;

  // Vida dos níveis seguintes: Média + Modificador de Constituição + Bônus Fixo
  if (nivel > 1) {
    vida += (mediaDv + conMod + bonusFixoPorNivel) * (nivel - 1);
  }

  // Regra de Ouro do D&D: Você nunca pode ganhar menos de 1 PV por nível
  return Math.max(nivel, vida);
}

/**
 * MOTOR GLOBAL DE STATUS: Calcula CA, Deslocamento, Iniciativa e Percepção
 * Tudo no mesmo lugar para manter Ficha e Mesa sempre idênticas (Princípio DRY)
 */
export function calcularStatusGlobais(ficha) {
  if (!ficha) return { caFinal: 10, deslocamentoFinal: 30, percepcaoPassiva: 10, iniciativaFinal: 0, velocidadesExtras: {} };

  const nivel = ficha.nivel || 1;
  const profBonus = Math.ceil(nivel / 4) + 1;
  const infoRaca = ficha.raca ? RACAS[ficha.raca] : null;

  const modDes = Math.floor(((ficha.destreza || 10) - 10) / 2);
  const modSab = Math.floor(((ficha.sabedoria || 10) - 10) / 2);
  const modCon = Math.floor(((ficha.constituicao || 10) - 10) / 2);

  // --- 1. INICIATIVA ---
  let iniciativaFinal = modDes;
  if (infoRaca && infoRaca.bonusIniciativa === "proficiencia") {
    iniciativaFinal += profBonus;
  }

  // --- 2. LEITURA DE ITENS MÁGICOS ---
  let bonusCA_Itens = 0;
  let bonusSpeedItens = 0;
  let velocidadeVooItens = 0;

  if (ficha.inventario) {
    const itensEmUso = ficha.inventario.filter(i => i.equipado || i.sintonizado);
    const todosMagicos = Object.values(itensMagicos).flatMap(arr => arr);

    itensEmUso.forEach(itemUso => {
      const infoMagica = todosMagicos.find(im => im.nome.toLowerCase() === itemUso.nome.toLowerCase());
      if (infoMagica) {
        if (infoMagica.bonusCA) bonusCA_Itens += infoMagica.bonusCA;
        if (infoMagica.bonusDeslocamento) bonusSpeedItens += infoMagica.bonusDeslocamento;
        if (infoMagica.concedeVoo && infoMagica.concedeVoo > velocidadeVooItens) {
          velocidadeVooItens = infoMagica.concedeVoo;
        }
      }
    });
  }

  // --- 3. VELOCIDADES EXTRAS (RAÇA + ITENS) ---
  let velocidadeVoo = velocidadeVooItens;
  let velocidadeNatacao = 0;
  let velocidadeEscalada = 0;

  if (infoRaca && infoRaca.velocidadesExtras) {
    if (infoRaca.velocidadesExtras.voo && infoRaca.velocidadesExtras.voo > velocidadeVoo) velocidadeVoo = infoRaca.velocidadesExtras.voo;
    if (infoRaca.velocidadesExtras.natacao) velocidadeNatacao = infoRaca.velocidadesExtras.natacao;
    if (infoRaca.velocidadesExtras.escalada) velocidadeEscalada = infoRaca.velocidadesExtras.escalada;
  }

  // --- 4. DESLOCAMENTO BASE (SPEED) ---
  let bonusSpeedTalentos = 0;
  if (ficha.talentos) {
    ficha.talentos.forEach(t => {
      const infoTalento = Object.values(TALENTOS).find(talentoDB => talentoDB.nome === t.nome);
      if (infoTalento?.efeitosPassivos?.bonusDeslocamento) bonusSpeedTalentos += infoTalento.efeitosPassivos.bonusDeslocamento;
    });
  }

  let bonusSpeedClasse = 0;
  const semArmadura = !ficha.armaduraEquipada || ficha.armaduraEquipada === "";
  const escudoCA = ficha.escudoCA || 0;

  if (ficha.classe === "Monge" && semArmadura && escudoCA === 0) {
    if (nivel >= 18) bonusSpeedClasse = 30;
    else if (nivel >= 14) bonusSpeedClasse = 25;
    else if (nivel >= 10) bonusSpeedClasse = 20;
    else if (nivel >= 6) bonusSpeedClasse = 15;
    else if (nivel >= 2) bonusSpeedClasse = 10;
  } else if (ficha.classe === "Bárbaro" && nivel >= 5) {
    const isArmaduraPesada = ["cota de malha", "cota de talas", "placas"].some(pesada => (ficha.armaduraEquipada || "").toLowerCase().includes(pesada));
    if (!isArmaduraPesada) bonusSpeedClasse = 10;
  }

  const baseSpeed = ficha.deslocamento || 30;
  const deslocamentoFinal = baseSpeed + bonusSpeedTalentos + bonusSpeedClasse + bonusSpeedItens;

  // --- 5. CLASSE DE ARMADURA (CA) ---
  let componenteArmadura = 10;
  let componenteDex = modDes;
  let componenteClasse = 0;
  let labelClasse = "";

  const nomeParaBuscar = (ficha.armaduraEquipada || "").toLowerCase().trim();
  let armaduraObj = null;

  if (nomeParaBuscar) {
    // 👇 CORREÇÃO AQUI: Estava procurando em ARMAS, agora procura em ARMADURAS 👇
    armaduraObj = ARMADURAS.find(a => a.nome?.toLowerCase() === nomeParaBuscar) || ARMADURAS.find(a => a.nome?.toLowerCase().includes(nomeParaBuscar));
  }

  if (armaduraObj) {
    componenteArmadura = armaduraObj.caBase || 10;
    if (armaduraObj.addDex) {
      componenteDex = typeof armaduraObj.maxDex === 'number' ? Math.min(modDes, armaduraObj.maxDex) : modDes;
    } else {
      componenteDex = 0;
    }
  } else {
    // Cálculo sem armadura (Racial e Classes)
    componenteArmadura = infoRaca?.caBaseRacial ? infoRaca.caBaseRacial : 10;
    
    if (componenteArmadura === 17 && infoRaca?.nome?.includes("Tortle")) {
      componenteDex = 0;
    }
    
    if (ficha.classe === "Monge" && escudoCA === 0) {
      componenteClasse = modSab;
      labelClasse = "Sab";
    } else if (ficha.classe === "Bárbaro") {
      componenteClasse = modCon;
      labelClasse = "Con";
    }
    
    // Conflito Bárbaro vs Lagarto (Fica com a maior)
    if (infoRaca?.caBaseRacial && componenteClasse > 0) {
      const totalRaca = infoRaca.caBaseRacial + modDes;
      const totalClasse = 10 + modDes + componenteClasse;
      if (totalClasse > totalRaca) componenteArmadura = 10;
      else componenteClasse = 0;
    }
  }

  const bonusManualCA = ficha.bonusCA_Manual || 0;
  const caFinal = componenteArmadura + componenteDex + componenteClasse + escudoCA + bonusManualCA + bonusCA_Itens;

  // --- 6. PERCEPÇÃO PASSIVA ---
  let bonusTreinoPerc = 0;
  if (ficha.periciasTreinadas?.["Percepção"] === "proficiente") bonusTreinoPerc = profBonus;
  if (ficha.periciasTreinadas?.["Percepção"] === "expertise") bonusTreinoPerc = profBonus * 2;
  const percepcaoPassiva = 10 + modSab + bonusTreinoPerc + (ficha.bonusPercepcaoPassiva || 0);

  return {
    caFinal,
    deslocamentoFinal,
    iniciativaFinal,
    percepcaoPassiva,
    velocidadesExtras: { voo: velocidadeVoo, natacao: velocidadeNatacao, escalada: velocidadeEscalada },
    detalhesCA: { componenteArmadura, componenteDex, componenteClasse, escudoCA, bonusManualCA, bonusCA_Itens, labelClasse }
  };
}