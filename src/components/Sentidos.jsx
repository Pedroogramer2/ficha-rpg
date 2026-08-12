// src/components/Sentidos.jsx
import { useState, useEffect } from 'react';
import itensMagicos from '../data/itensMagicos';

export function Sentidos(props) {
  const dados = props.dados || {};
  const nivel = dados.nivel || 1;
  const prof = Math.ceil(nivel / 4) + 1;
  const pericias = dados.periciasTreinadas || {};
  const talentos = dados.talentos || [];

  function getMod(nomeAtributo) {
    const valor = dados.atributos?.[nomeAtributo] || dados[nomeAtributo] || 10;
    return Math.floor((valor - 10) / 2);
  }
  
  const modWis = getMod("sabedoria");
  const modInt = getMod("inteligencia");

  // 🧠 RADAR DE HABILIDADES 🧠
  const isBardo = dados.classe === "Bardo" && nivel >= 2;
  const meiaProf = Math.floor(prof / 2);
  
  // Procura se o cara pegou o Talento Observador
  const temObservador = talentos.some(t => t.nome.toLowerCase().includes("observador") || t.nome.toLowerCase().includes("observant"));

  // 👇 O RADAR DA MOCHILA PARA SENTIDOS 👇
  let visaoEscuroMagica = 0;
  let visaoEspecialMagica = null;

  if (dados.inventario) {
    const itensEmUso = dados.inventario.filter(i => i.equipado || i.sintonizado);
    const todosMagicos = Object.values(itensMagicos).flatMap(arr => arr);

    itensEmUso.forEach(itemUso => {
      const infoMagica = todosMagicos.find(im => im.nome.toLowerCase() === itemUso.nome.toLowerCase());
      if (infoMagica) {
        
        // Puxa Visão no Escuro (Ex: Goggles of Night)
        if (infoMagica.visaoNoEscuro && infoMagica.visaoNoEscuro > visaoEscuroMagica) {
          visaoEscuroMagica = infoMagica.visaoNoEscuro;
        }

        // Puxa Visão Especial (Ex: Truesight, Blindsight)
        if (infoMagica.visaoEspecial) {
          visaoEspecialMagica = infoMagica.visaoEspecial;
        }
      }
    });
  }

  // 🧮 CÁLCULO DA VISÃO NO ESCURO FINAL 🧮
  // Tenta extrair apenas os números da string salva pelo jogador pra poder somar. (Ex: "60 ft" -> 60)
  const visaoNaturalNum = parseInt((dados.visaoEscuro || "0").toString().replace(/\D/g, '')) || 0;
  
  let visaoEscuroFinalTexto = dados.visaoEscuro || "";
  let temBuffVisual = false;

  // A Regra dos Goggles of Night do D&D 5e: 
  // Se você tem 0 de visão natural, você ganha a visão mágica (Ex: 60ft).
  // Se você já tem visão natural (Ex: 60ft), a visão mágica *soma* na sua (60 + 60 = 120ft).
  if (visaoEscuroMagica > 0) {
    temBuffVisual = true;
    if (visaoNaturalNum > 0) {
      visaoEscuroFinalTexto = `${visaoNaturalNum + visaoEscuroMagica} ft (Magia)`;
    } else {
      visaoEscuroFinalTexto = `${visaoEscuroMagica} ft (Magia)`;
    }
  }

  // Define qual visão especial usar (A da raça/classe ou a do item mágico)
  const visaoEspecialFinal = visaoEspecialMagica || props.dados.visaoEspecial;


  // 👇 CALCULADORA INTELIGENTE 👇
  function calcPassiva(modAtributo, nomePericia) {
    const status = pericias[nomePericia];
    let bonusProf = 0;

    if (status === "expertise") bonusProf = prof * 2;
    else if (status === "proficiente" || status === true) bonusProf = prof;
    else if (isBardo) bonusProf = meiaProf;

    let extraTalento = 0;
    if (temObservador && (nomePericia === "Percepção" || nomePericia === "Investigação")) {
      extraTalento = 5;
    }

    return 10 + modAtributo + bonusProf + extraTalento;
  }

  return (
    <div className="painel-sentidos">
      <h3 className="titulo-lateral">Sentidos Passivos</h3>
      
      <div className="linha-sentido">
        <span>Investigação (Int)</span>
        <strong title={temObservador ? "Talento Observador ativo (+5)" : ""}>
          {calcPassiva(modInt, "Investigação")}
        </strong>
      </div>

      <div className="linha-sentido">
        <span>Intuição (Sab)</span>
        <strong>{calcPassiva(modWis, "Intuição")}</strong>
      </div>

      <div className="linha-sentido">
        <span>Percepção (Sab)</span>
        <strong title={temObservador ? "Talento Observador ativo (+5)" : ""}>
          {calcPassiva(modWis, "Percepção")}
        </strong>
      </div>

      <hr style={{borderColor: '#444', margin: '10px 0'}}/>
      
      <div className="linha-sentido" style={{ position: 'relative' }}>
        <span>Visão no Escuro</span>
        {/* Se o item magico sobrepor, a gente bloqueia o input e colore o texto de amarelo */}
        {temBuffVisual ? (
           <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '0.85rem' }}>
              ✨ {visaoEscuroFinalTexto}
           </span>
        ) : (
          <input 
            type="text" 
            placeholder="0 ft" 
            value={dados.visaoEscuro || ""}
            onChange={(e) => props.aoSalvar && props.aoSalvar("visaoEscuro", e.target.value)}
            style={{width: '70px', background: 'transparent', border:'none', color:'white', textAlign:'right'}}
          />
        )}
      </div>
      
      {visaoEspecialFinal && (
        <div className="linha-sentido" style={{marginTop:'5px', color: visaoEspecialMagica ? '#d7bde2' : '#ffcc00'}}>
          <span>{visaoEspecialMagica ? '✨ Especial' : 'Especial'}</span>
          <strong style={{fontSize:'0.8rem'}}>{visaoEspecialFinal}</strong>
        </div>
      )}
    </div>
  );
}