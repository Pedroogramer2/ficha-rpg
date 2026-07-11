// src/pages/CriadorPersonagem.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';

// 👇 ADICIONAMOS A BASE DE MAGIAS AQUI PRA ELE LER AS DESCRIÇÕES 👇
import { MAGIAS } from '../data/magias'; 
import { CLASSES_DETALHADAS } from '../data/classesDetalhado'; 
import { RACAS } from '../data/racas';
import { SUBCLASSES } from '../data/subclasses';
import { TALENTOS } from '../data/talentos';

import { CriadorProvider, useCriador } from '../context/CriadorContext';

import { PassoClasse } from '../components/criador/PassoClasse';
import { PassoEspecie } from '../components/criador/PassoEspecie';
import { PassoAntecedente } from '../components/criador/PassoAntecedente';
import { PassoAtributos } from '../components/criador/PassoAtributos';
import { PassoTalentos } from '../components/criador/PassoTalentos';
import { PassoPericias } from '../components/criador/PassoPericias';
import { PassoMagias } from '../components/criador/PassoMagias';
import { PassoEquipamento } from '../components/criador/PassoEquipamento';
import { PassoRevisao } from '../components/criador/PassoRevisao';

function CriadorPersonagemInterno() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const { rascunho, setRascunho, passoAtual, setPassoAtual } = useCriador();
  
  const [salvando, setSalvando] = useState(false); 
  const [carregandoEdicao, setCarregandoEdicao] = useState(!!id);

  const idProcessadoRef = useRef(null);

  const TITULOS_PASSOS = [
    "Escolha a Classe", "Escolha a Espécie", "Antecedente", "Atributos",
    "Talentos", "Perícias", "Magias", "Equipamento", "Revisão & Detalhes"
  ];

  useEffect(() => {
    if (idProcessadoRef.current === id) return;
    idProcessadoRef.current = id; 

    async function inicializarCriador() {
      if (!id) {
        setRascunho({
          nivel: 1, classe: "", raca: "", antecedente: "", nome: "", foto: null,
          escolhasClasse: {}, periciasTreinadas: {}, inventario: [],
          magiasConhecidas: { truques: [], nivel1: [] }
        });
        setPassoAtual(0);
        setCarregandoEdicao(false);
        return;
      }

      setCarregandoEdicao(true);
      try {
        const snap = await getDoc(doc(db, "personagens", id));
        if (snap.exists()) {
          setRascunho(snap.data()); 
        } else {
          alert("Ficha não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao carregar edição:", error);
      } finally {
        setCarregandoEdicao(false);
      }
    }
    
    inicializarCriador();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  function proximo() { if (passoAtual < TITULOS_PASSOS.length - 1) setPassoAtual(passoAtual + 1); }
  function anterior() { if (passoAtual > 0) setPassoAtual(passoAtual - 1); }

  function resetarContextoCriador() {
    setRascunho({
      nivel: 1, classe: "", raca: "", antecedente: "", nome: "", foto: null,
      escolhasClasse: {}, periciasTreinadas: {}, inventario: [],
      magiasConhecidas: { truques: [], nivel1: [] }
    });
    setPassoAtual(0);
    localStorage.removeItem('rascunhoCriador'); 
  }

  async function finalizarCriacao() {
    if (salvando) return;
    
    if (!rascunho.nome || !rascunho.classe) {
      alert("Por favor, preencha o Nome e a Classe do personagem antes de salvar.");
      return;
    }

    setSalvando(true);

    try {
      const infoClasse = CLASSES_DETALHADAS[rascunho.classe] || { proficiencias: {}, dadoVida: 8, tabelaNiveis: [] };
      const infoRaca = RACAS[rascunho.raca] || { periciasGratis: [] };

      let textoProficiencias = "";
      if (infoClasse.proficiencias) {
        const p = infoClasse.proficiencias;
        if (p.armaduras?.length) textoProficiencias += "Armaduras: " + p.armaduras.join(", ") + ". ";
        if (p.armas?.length) textoProficiencias += "Armas: " + p.armas.join(", ") + ".";
      }

      const textoIdiomas = (rascunho.listaIdiomas || ["Comum"]).filter(i => i).join(", ");
      const periciasFinais = { ...(rascunho.periciasTreinadas || {}) };
      if (infoRaca.periciasGratis) {
        infoRaca.periciasGratis.forEach(p => { if (!periciasFinais[p]) periciasFinais[p] = "proficiente"; });
      }

      let tracosClasseFinais = [];

      function adicionarOuAtualizarTraco(novoTraco) {
        const nomeBaseNovo = novoTraco.nome.split('(')[0].trim();
        const talentoOficial = TALENTOS[nomeBaseNovo] || TALENTOS[novoTraco.nome];
        if (talentoOficial) novoTraco.descricao = talentoOficial.descricao;

        const indexExistente = tracosClasseFinais.findIndex(t => t.nome.split('(')[0].trim() === nomeBaseNovo);

        if (indexExistente >= 0) {
          const existente = tracosClasseFinais[indexExistente];
          if (novoTraco.usosMax > existente.usosMax) existente.usosMax = novoTraco.usosMax;
          if (novoTraco.descricao) existente.descricao = novoTraco.descricao;
          existente.nome = novoTraco.nome; 
        } else {
          tracosClasseFinais.push(novoTraco);
        }
      }

      if (infoClasse.tabelaNiveis) {
        infoClasse.tabelaNiveis.forEach(nivelInfo => {
          if (nivelInfo.nivel <= rascunho.nivel) {
            nivelInfo.habilidades.forEach(hab => {
              const isObj = typeof hab === 'object';
              const nome = isObj ? hab.nome : hab;
              if (nome !== "Recurso de Arquétipo" && nome !== "Arquétipo Marcial (Subclasse)" && nome !== "Domínio Divino" && nome !== "Tradição Arcana") {
                adicionarOuAtualizarTraco({ id: Date.now() + Math.random(), nome: nome, descricao: isObj ? hab.desc : "", usosMax: isObj && hab.usos ? hab.usos : 0, usosGastos: [] });
              }
            });
          }
        });
      }

      const nomeSubclasse = Object.values(rascunho.escolhasClasse || {}).find(val => SUBCLASSES[val.nome])?.nome;
      const dadosSub = nomeSubclasse ? SUBCLASSES[nomeSubclasse] : null;

      if (dadosSub?.features) {
        Object.keys(dadosSub.features).forEach(nivelStr => {
          if (parseInt(nivelStr) <= rascunho.nivel) {
            dadosSub.features[nivelStr].forEach(feat => {
              tracosClasseFinais.push({ id: Date.now() + Math.random(), nome: `${feat.nome} (${nomeSubclasse})`, descricao: feat.desc, usosMax: feat.usos || 0, usosGastos: [] });
            });
          }
        });
      }

      if (rascunho.escolhasClasse) {
        Object.entries(rascunho.escolhasClasse).forEach(([titulo, obj]) => {
          if (obj.nome !== nomeSubclasse) {
             tracosClasseFinais.push({ id: Date.now() + Math.random(), nome: `${titulo}: ${obj.nome}`, descricao: obj.desc, usosMax: 0 });
          }
        });
      }

      // 👇 EXTERMINADOR E HIDRATADOR DE MAGIAS (O LAVA JATO) 👇
      function purgarEHidratar(listaMagias) {
        if (!listaMagias) return [];
        const unicas = [];
        
        listaMagias.forEach(mag => {
          // 1. PURIFICAÇÃO: Se for texto puro (bug antigo) ou fantasma desmembrado, DELETA!
          if (typeof mag === 'string') return; 
          if (!mag.id && !mag.nome) return;
          if (mag.id && mag.id.startsWith('bug-')) return; 

          // 2. HIDRATAÇÃO: Busca a magia oficial completa no magias.js
          let magiaCompleta = { ...mag };
          if (mag.id) {
            const magiaOficial = MAGIAS.find(m => m.id === mag.id);
            if (magiaOficial) magiaCompleta = { ...magiaOficial }; // Enche a magia de dados!
          }

          // 3. ANTI-CLONE: Só adiciona se não tiver repetida
          if (!unicas.some(u => u.id === magiaCompleta.id || u.nome === magiaCompleta.nome)) {
            unicas.push(magiaCompleta);
          }
        });
        
        return unicas;
      }

      // Limpa TODAS as magias que já estavam na ficha do Ragnar
      const magiasFinais = { 
        truques: purgarEHidratar(rascunho.magiasConhecidas?.truques), 
        nivel1: purgarEHidratar(rascunho.magiasConhecidas?.nivel1),
        nivel2: purgarEHidratar(rascunho.magiasConhecidas?.nivel2),
        nivel3: purgarEHidratar(rascunho.magiasConhecidas?.nivel3),
        nivel4: purgarEHidratar(rascunho.magiasConhecidas?.nivel4),
        nivel5: purgarEHidratar(rascunho.magiasConhecidas?.nivel5)
      };

      // 👇 MESCLADOR INTELIGENTE (Busca os dados oficiais e não duplica) 👇
      function mesclarMagiasBonus(pacoteDeMagias) {
        if (!pacoteDeMagias) return;
        Object.keys(pacoteDeMagias).forEach(nivelChave => {
          if (!magiasFinais[nivelChave]) magiasFinais[nivelChave] = [];
          
          pacoteDeMagias[nivelChave].forEach(magiaBonus => {
            let magiaCompleta = { ...magiaBonus };
            if (magiaBonus.id) {
              const magiaOficial = MAGIAS.find(m => m.id === magiaBonus.id);
              if (magiaOficial) magiaCompleta = { ...magiaOficial };
            }

            const jaExiste = magiasFinais[nivelChave].some(m => 
              (m.id && magiaCompleta.id && m.id === magiaCompleta.id) || 
              (m.nome && magiaCompleta.nome && m.nome === magiaCompleta.nome)
            );

            if (!jaExiste) {
              magiasFinais[nivelChave].push(magiaCompleta);
            }
          });
        });
      }

      mesclarMagiasBonus(infoRaca?.magiasBonus);
      mesclarMagiasBonus(rascunho.escolhaRacialDetalhes?.magiasBonus);
      mesclarMagiasBonus(dadosSub?.magiasBonus);
      // 👆 FIM DO LAVA JATO 👆

      const estiloEscolhidoObj = rascunho.escolhasClasse?.["Estilo de Luta (Fighting Style)"];
      const estiloNome = estiloEscolhidoObj ? estiloEscolhidoObj.nome : "";
      let bonusPassivo_CA = 0; 
      let visaoExtra = "";

      if (estiloNome.includes("Defesa") || estiloNome.includes("Defense")) bonusPassivo_CA += 1;
      if (estiloNome.includes("Cegas") || estiloNome.includes("Blind")) visaoExtra = "Percepção às Cegas (10 ft)";
      let bonusManual_CA = rascunho.bonusCA_Manual !== undefined ? rascunho.bonusCA_Manual : 0;

      if (rascunho.bonusCA_Manual === undefined && rascunho.bonusCA !== undefined) {
        bonusManual_CA = Math.max(0, rascunho.bonusCA - bonusPassivo_CA);
      }

      const conMod = Math.floor(((rascunho.atributos?.constituicao || 10) - 10) / 2);
      const dv = infoClasse.dadoVida || 8;
      const mediaDv = (dv / 2) + 1;
      
      let vidaFinal = rascunho.vidaMaxima;
      if (rascunho.nivel > 1 && vidaFinal === (dv + conMod)) {
         vidaFinal = (dv + conMod) + ((mediaDv + conMod) * (rascunho.nivel - 1));
      }

      const dadosVidaInicial = { total: rascunho.nivel || 1, gastos: rascunho.dadosVida?.gastos || 0, tipo: dv };
      let ataquesIniciais = rascunho.ataques || [];

      let atributosFinais = {
        forca: Number(rascunho.atributos?.forca ?? rascunho.forca ?? 10),
        destreza: Number(rascunho.atributos?.destreza ?? rascunho.destreza ?? 10),
        constituicao: Number(rascunho.atributos?.constituicao ?? rascunho.constituicao ?? 10),
        inteligencia: Number(rascunho.atributos?.inteligencia ?? rascunho.inteligencia ?? 10),
        sabedoria: Number(rascunho.atributos?.sabedoria ?? rascunho.sabedoria ?? 10),
        carisma: Number(rascunho.atributos?.carisma ?? rascunho.carisma ?? 10),
      };

      const { atributos, ...restoRascunho } = rascunho; 

      const personagemFinal = {
        ...restoRascunho,
        ...atributosFinais,
        atributos: null,
        profArmasArmaduras: textoProficiencias,
        idiomas: textoIdiomas,
        periciasTreinadas: periciasFinais,
        dadosVida: dadosVidaInicial,
        vidaMaxima: vidaFinal, 
        vidaAtual: rascunho.vidaAtual !== undefined ? rascunho.vidaAtual : vidaFinal,
        tracosClasse: tracosClasseFinais,
        bonusCA_Passivo: bonusPassivo_CA,
        bonusCA_Manual: bonusManual_CA,
        visaoEspecial: visaoExtra,
        ataques: ataquesIniciais,
        tracosRaciais: rascunho.tracosRaciais || [],
        talentos: rascunho.talentos || [],
        inventario: rascunho.inventario || [],
        magiasConhecidas: magiasFinais, 
        ultimaEdicao: new Date().toISOString()
      };

      if (id) {
        await updateDoc(doc(db, "personagens", id), personagemFinal);
        resetarContextoCriador(); 
        navigate(`/ficha/${id}`);
      } else {
        personagemFinal.criadoEm = new Date().toISOString();
        const docRef = await addDoc(collection(db, "personagens"), personagemFinal);
        const meusPersonagens = JSON.parse(localStorage.getItem('minhasFichas') || '[]');
        meusPersonagens.push(docRef.id);
        localStorage.setItem('minhasFichas', JSON.stringify(meusPersonagens));
        resetarContextoCriador(); 
        navigate(`/ficha/${docRef.id}`);
      }

    } catch (error) {
      console.error("ERRO CRÍTICO AO SALVAR:", error);
      alert(`Erro ao salvar: ${error.message}`);
    } finally {
      setSalvando(false); 
    }
  }

  if (carregandoEdicao) {
    return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Carregando ficha para edição...</div>;
  }

  const nivelAtual = rascunho.nivel || 1;
  const classeAtual = rascunho.classe;

  const niveisDeTalento = [4, 8, 12, 16, 19];
  const talentosEsperados = niveisDeTalento.filter(n => n <= nivelAtual).length;
  const talentosNaFicha = rascunho.talentos ? rascunho.talentos.length : 0;
  const temTalentoPendente = talentosNaFicha < talentosEsperados;

  let temMagiaPendente = false;
  const classesConjuradoras = ["Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Paladino", "Patrulheiro"];

  if (classeAtual && classesConjuradoras.includes(classeAtual)) {
    const infoClasse = CLASSES_DETALHADAS[classeAtual] || {};
    
    const baseTruques = infoClasse.magiasInicial?.truquesConhecidos || 0;
    let extraTruques = 0;
    if (["Feiticeiro", "Bardo", "Bruxo", "Clérigo", "Druida", "Mago"].includes(classeAtual)) {
      if (nivelAtual >= 4) extraTruques++;
      if (nivelAtual >= 10) extraTruques++;
    }
    const maxTruques = baseTruques + extraTruques;

    let attrKey = "inteligencia";
    if (["Bardo", "Bruxo", "Feiticeiro", "Paladino"].includes(classeAtual)) attrKey = "carisma";
    if (["Clérigo", "Druida", "Patrulheiro", "Monge"].includes(classeAtual)) attrKey = "sabedoria";
    
    const valAttr = rascunho.atributos?.[attrKey] || rascunho[attrKey] || 10;
    const modAttr = Math.floor((valAttr - 10) / 2);

    let maxMagias = 0;
    if (classeAtual === "Mago") maxMagias = 6 + ((nivelAtual - 1) * 2);
    else if (["Clérigo", "Druida"].includes(classeAtual)) maxMagias = Math.max(1, nivelAtual + modAttr);
    else if (classeAtual === "Paladino") maxMagias = Math.max(1, Math.floor(nivelAtual / 2) + modAttr);
    else if (classeAtual === "Patrulheiro") maxMagias = Math.ceil(nivelAtual / 2) + 1;
    else maxMagias = Math.min(22, nivelAtual + 1); 

    const truquesNaFicha = rascunho.magiasConhecidas?.truques?.length || 0;
    let totalMagiasNaFicha = 0;
    for (let i = 1; i <= 9; i++) {
      totalMagiasNaFicha += (rascunho.magiasConhecidas?.[`nivel${i}`]?.length || 0);
    }

    if (truquesNaFicha < maxTruques || totalMagiasNaFicha < maxMagias) {
      temMagiaPendente = true;
    }
  }

  function renderizarPasso() {
    switch (passoAtual) {
      case 0: return <PassoClasse />;
      case 1: return <PassoEspecie />;
      case 2: return <PassoAntecedente />;
      case 3: return <PassoAtributos />;
      case 4: return <PassoTalentos />;
      case 5: return <PassoPericias />;
      case 6: return <PassoMagias />;    
      case 7: return <PassoEquipamento />;
      case 8: return <PassoRevisao />;
      default: return <PassoClasse />;
    }
  }

  return (
    <div className="criador-container">
      <div className="barra-progresso">
        {TITULOS_PASSOS.map((titulo, index) => {
          let classePendente = "";
          if (index === 4 && temTalentoPendente) classePendente = "aba-pendente";
          if (index === 6 && temMagiaPendente) classePendente = "aba-pendente";

          return (
            <div 
              key={index} 
              className={`bolinha-passo ${index === passoAtual ? 'ativa' : ''} ${index < passoAtual ? 'concluido' : ''} ${classePendente}`} 
              onClick={() => setPassoAtual(index)}
            >
              {index + 1}<span className="tooltip-passo">{titulo}</span>
            </div>
          );
        })}
      </div>
      <h2 className="titulo-passo">{TITULOS_PASSOS[passoAtual]}</h2>
      <div className="area-conteudo-passo">{renderizarPasso()}</div>
      
      <div className="rodape-navegacao">
        <Link to={id ? `/ficha/${id}` : "/"} onClick={resetarContextoCriador}><button className="btn-nav cancelar">Cancelar</button></Link>
        <div className="btns-direita">
          <button className="btn-nav" onClick={anterior} disabled={passoAtual === 0}>⬅ Anterior</button>
          
          {passoAtual === TITULOS_PASSOS.length - 1 ? (
            <button className="btn-nav concluir" onClick={finalizarCriacao}>
               {salvando ? "Salvando..." : (id ? "✨ Atualizar Personagem!" : "✨ Criar Personagem!")}
            </button>
          ) : (
            <button className="btn-nav proximo" onClick={proximo} disabled={(passoAtual === 0 && !rascunho.classe) || (passoAtual === 1 && !rascunho.raca) || (passoAtual === 2 && !rascunho.antecedente)} style={{opacity: ((passoAtual === 0 && !rascunho.classe) || (passoAtual === 1 && !rascunho.raca)) ? 0.5 : 1}}>Próximo ➡</button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CriadorPersonagem() {
  return (
    <CriadorProvider>
      <CriadorPersonagemInterno />
    </CriadorProvider>
  );
}