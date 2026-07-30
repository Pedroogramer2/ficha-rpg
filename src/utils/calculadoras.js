// src/utils/calculadoras.js
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';

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