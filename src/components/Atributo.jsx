// src/components/Atributo.jsx
import { useState, useEffect } from 'react';
import itensMagicos from '../data/itensMagicos'; 

export function Atributo(props) {
  const valorBase = props.valorInicial || 10;
  
  let bonusItens = 0;
  let bonusSaveItens = 0;
  let valorFixoItem = 0; // 👈 NOVO: O Rastreador da Manopla do Ogro!
  
  if (props.dados && props.dados.inventario) {
    const itensEmUso = props.dados.inventario.filter(i => i.equipado || i.sintonizado);
    const todosMagicos = Object.values(itensMagicos).flatMap(arr => arr);

    itensEmUso.forEach(itemUso => {
      const infoMagica = todosMagicos.find(im => im.nome.toLowerCase() === itemUso.nome.toLowerCase());
      
      if (infoMagica) {
        const nomeFormatado = props.chaveBanco.charAt(0).toUpperCase() + props.chaveBanco.slice(1);
        
        // 1. Busca bônus comum (Ex: bonusForca: 2)
        if (infoMagica[`bonus${nomeFormatado}`]) {
          bonusItens += infoMagica[`bonus${nomeFormatado}`];
        }
        
        // 2. Busca valor FIXO (Ex: setaForca: 19)
        if (infoMagica[`seta${nomeFormatado}`]) {
          // Se tiver 2 itens fixos (loucura), pega o maior
          if (infoMagica[`seta${nomeFormatado}`] > valorFixoItem) {
            valorFixoItem = infoMagica[`seta${nomeFormatado}`];
          }
        }

        if (infoMagica.bonusSaveGeral) {
          bonusSaveItens += infoMagica.bonusSaveGeral;
        }
      }
    });
  }

  // 👇 A MATEMÁTICA INTELIGENTE DO VALOR FIXO 👇
  const valorSemFixo = valorBase + bonusItens;
  const usandoFixo = valorFixoItem > valorSemFixo; // Verifica se a Manopla é mais forte que o herói
  const valorTotal = usandoFixo ? valorFixoItem : valorSemFixo;

  const modificador = Math.floor((valorTotal - 10) / 2);
  const modTexto = modificador >= 0 ? `+${modificador}` : modificador;

  function rolarCheck() {
    if (props.aoRolar) props.aoRolar(`Teste de ${props.nome}`, modificador);
  }

  function rolarSave() {
    const baseSave = props.proficiente ? (modificador + props.bonusProf) : modificador;
    const bonusTotal = baseSave + bonusSaveItens;
    
    const titulo = `Salvaguarda de ${props.nome}` + (props.proficiente ? " (Prof)" : "");
    if (props.aoRolar) props.aoRolar(titulo, bonusTotal);
  }

  const classeBotaoSave = props.proficiente ? "btn-roll-attr save proficiente" : "btn-roll-attr save";
  const valorSaveBaseDisplay = props.proficiente ? (modificador + props.bonusProf) : modificador;
  const valorSaveFinalDisplay = valorSaveBaseDisplay + bonusSaveItens;
  const textoSave = valorSaveFinalDisplay >= 0 ? `+${valorSaveFinalDisplay}` : valorSaveFinalDisplay;

  return (
    <div className="card-atributo" style={{ position: 'relative' }}>
      
      {/* AVISOS SUPERIORES DE ITENS MÁGICOS */}
      <div style={{ position: 'absolute', top: '-8px', right: '-5px', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', zIndex: 5 }}>
        {usandoFixo && (
           <span style={{ background: '#3498db', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', boxShadow: '0 0 5px #3498db' }}>
             🦾 {valorFixoItem} Fixo
           </span>
        )}
        {!usandoFixo && bonusItens !== 0 && (
          <span style={{ background: '#ffcc00', color: 'black', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', boxShadow: '0 0 5px #ffcc00' }}>
            +{bonusItens} Magia
          </span>
        )}
      </div>

      {bonusSaveItens !== 0 && (
        <div style={{ position: 'absolute', top: '-5px', left: '-5px', background: '#8e44ad', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', boxShadow: '0 0 5px #8e44ad', zIndex: 5 }} title={`+${bonusSaveItens} em todos os Saving Throws por Itens Mágicos`}>
          +{bonusSaveItens} Save
        </div>
      )}

      <div className="nome-atributo">{props.nome}</div>
      <div className="modificador-destaque roravel" onClick={rolarCheck}>
        {modTexto}
      </div>

      <div className="input-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <small style={{ color: (bonusItens !== 0 || usandoFixo) ? '#ffcc00' : '#888' }}>Total</small>
        
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: (bonusItens !== 0 || usandoFixo) ? '#ffcc00' : 'white', margin: '5px 0' }}>
          {valorTotal}
        </div>
        
        <small style={{ fontSize: '0.6rem', color: '#666' }}>
          Base ({valorBase}) {bonusItens !== 0 && !usandoFixo ? `+ Mod (${bonusItens})` : ''}
        </small>
      </div>

      <div className="botoes-rolagem-attr">
        <button className="btn-roll-attr" onClick={rolarCheck}>CHECK</button>
        <button className={classeBotaoSave} onClick={rolarSave} title={props.proficiente ? "Proficiente" : ""}>
          SAVE {textoSave}
        </button>
      </div>
    </div>
  );
}