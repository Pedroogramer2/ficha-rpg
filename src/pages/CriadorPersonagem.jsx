// src/pages/CriadorPersonagem.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';

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
  
  const { rascunho, setRascunho, atualizarRascunho, passoAtual, setPassoAtual } = useCriador();
  
  const [salvando, setSalvando] = useState(false); 
  const [carregandoEdicao, setCarregandoEdicao] = useState(!!id);

  const [nivelOriginal, setNivelOriginal] = useState(1);
  const [vidaMaximaOriginal, setVidaMaximaOriginal] = useState(0);

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
          const data = snap.data();
          setRascunho(data); 
          setNivelOriginal(data.nivel || 1);
          setVidaMaximaOriginal(data.vidaMaxima || 0);
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
    localStorage.removeItem('passoCriador'); 
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
      const infoRaca = RACAS[rascunho.raca] || { periciasGratuitas: [] };

      let textoProficiencias = "";
      if (infoClasse.proficiencias) {
        const p = infoClasse.proficiencias;
        if (p.armaduras?.length) textoProficiencias += "Armaduras: " + p.armaduras.join(", ") + ". ";
        if (p.armas?.length) textoProficiencias += "Armas: " + p.armas.join(", ") + ".";
      }

      const textoIdiomas = (rascunho.listaIdiomas || ["Comum"]).filter(i => i).join(", ");
      
      // 👇 AUTOMAÇÃO DAS PERÍCIAS RACIAIS (Agora o VTT injeta as perícias novas na ficha) 👇
      const periciasFinais = { ...(rascunho.periciasTreinadas || {}) };
      
      // 1. Perícias que a Raça dá de graça (Ex: Percepção do Harengon)
      if (infoRaca.periciasGratuitas) {
        infoRaca.periciasGratuitas.forEach(p => { 
          if (!periciasFinais[p]) periciasFinais[p] = "proficiente"; 
        });
      }
      
      // 2. Perícias que o jogador escolheu no dropdown da raça (Ex: Humano, Lagarto)
      if (rascunho.periciasRaciaisEscolhidas) {
        rascunho.periciasRaciaisEscolhidas.forEach(p => {
          if (p && !periciasFinais[p]) periciasFinais[p] = "proficiente";
        });
      }
      // 👆 FIM DA AUTOMAÇÃO DAS PERÍCIAS 👆

      let tracosClasseFinais = rascunho.tracosClasse ? JSON.parse(JSON.stringify(rascunho.tracosClasse)) : [];

      function adicionarOuAtualizarTraco(novoTraco) {
        const nomeBaseNovo = novoTraco.nome.split('(')[0].trim();
        const nomeLower = nomeBaseNovo.toLowerCase();
        
        if (nomeLower === "fúria" || nomeLower === "rage") {
           if (rascunho.nivel >= 17) novoTraco.usosMax = 6;
           else if (rascunho.nivel >= 12) novoTraco.usosMax = 5;
           else if (rascunho.nivel >= 6) novoTraco.usosMax = 4;
           else if (rascunho.nivel >= 3) novoTraco.usosMax = 3;
           else novoTraco.usosMax = 2;
           novoTraco.recuperacao = "Descanso Longo";
        }
        else if (nomeLower.includes("foco do monge") || nomeLower.includes("ki") || nomeLower.includes("pontos de feitiçaria") || nomeLower.includes("sorcery points")) {
           novoTraco.usosMax = rascunho.nivel; 
           if (nomeLower.includes("foco") || nomeLower.includes("ki")) {
                novoTraco.recuperacao = "Descanso Curto"; 
           } else {
                novoTraco.recuperacao = "Descanso Longo"; 
           }
        }

        const talentoOficial = TALENTOS[nomeBaseNovo] || TALENTOS[novoTraco.nome];
        if (talentoOficial) novoTraco.descricao = talentoOficial.descricao;

        const indexExistente = tracosClasseFinais.findIndex(t => t.nome.split('(')[0].trim() === nomeBaseNovo);

        if (indexExistente >= 0) {
          const existente = tracosClasseFinais[indexExistente];
          
          if (novoTraco.usosMax > existente.usosMax) {
            existente.usosMax = novoTraco.usosMax;
          }
          if (novoTraco.recuperacao) {
            existente.recuperacao = novoTraco.recuperacao;
          }
          
          const ehUpgrade = novoTraco.nome.toLowerCase().includes("upgrade");
          
          if (ehUpgrade) {
            const isSpam = novoTraco.descricao.includes("Sua reserva de Foco") || novoTraco.descricao.includes("usos de Fúria aumentam");
            if (novoTraco.descricao && !existente.descricao.includes(novoTraco.descricao) && !isSpam) {
              existente.descricao += `\n\n**Evolução (Nv ${rascunho.nivel}):**\n${novoTraco.descricao}`;
            }
          } else {
            if (!existente.descricao || existente.descricao.trim() === "") {
              existente.descricao = novoTraco.descricao;
            }
            existente.nome = novoTraco.nome; 
          }
          
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
                adicionarOuAtualizarTraco({ 
                  id: Date.now() + Math.random(), 
                  nome: nome, 
                  descricao: isObj ? hab.desc : "", 
                  usosMax: isObj && (hab.usosMax || hab.usos) ? (hab.usosMax || hab.usos) : 0, 
                  usosGastos: [],
                  tipoAcao: (isObj && hab.tipoAcao) ? hab.tipoAcao : ""
                });
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
              adicionarOuAtualizarTraco({ 
                id: Date.now() + Math.random(), 
                nome: `${feat.nome} (${nomeSubclasse})`, 
                descricao: feat.desc, 
                usosMax: feat.usos || 0, 
                usosGastos: [],
                tipoAcao: feat.tipoAcao || ""
              });
            });
          }
        });
      }

      if (rascunho.escolhasClasse) {
        Object.entries(rascunho.escolhasClasse).forEach(([titulo, obj]) => {
          if (obj.nome !== nomeSubclasse) {
            const nomeDaEscolha = `${titulo}: ${obj.nome}`;
            const indexExistente = tracosClasseFinais.findIndex(t => t.nome && t.nome.startsWith(`${titulo}:`));

            if (indexExistente >= 0) {
              tracosClasseFinais[indexExistente].nome = nomeDaEscolha;
              tracosClasseFinais[indexExistente].descricao = obj.desc;
            } else {
              tracosClasseFinais.push({ 
                id: Date.now() + Math.random(), 
                nome: nomeDaEscolha, 
                descricao: obj.desc, 
                usosMax: 0,
                tipoAcao: obj.tipoAcao || ""
              });
            }
          }
        });
      }

      function purgarEHidratar(listaMagias) {
        if (!listaMagias) return [];
        const unicas = [];
        
        listaMagias.forEach(mag => {
          if (typeof mag === 'string') return; 
          if (!mag.id && !mag.nome) return;
          if (mag.id && mag.id.startsWith('bug-')) return; 

          let magiaCompleta = { ...mag };
          if (mag.id) {
            const magiaOficial = MAGIAS.find(m => m.id === mag.id);
            if (magiaOficial) magiaCompleta = { ...magiaOficial }; 
          }

          if (!unicas.some(u => u.id === magiaCompleta.id || u.nome === magiaCompleta.nome)) {
            unicas.push(magiaCompleta);
          }
        });
        
        return unicas;
      }

      const magiasFinais = { 
        truques: purgarEHidratar(rascunho.magiasConhecidas?.truques), 
        nivel1: purgarEHidratar(rascunho.magiasConhecidas?.nivel1),
        nivel2: purgarEHidratar(rascunho.magiasConhecidas?.nivel2),
        nivel3: purgarEHidratar(rascunho.magiasConhecidas?.nivel3),
        nivel4: purgarEHidratar(rascunho.magiasConhecidas?.nivel4),
        nivel5: purgarEHidratar(rascunho.magiasConhecidas?.nivel5)
      };

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

      // 👇 CÁLCULO DE HP BLINDADO PARA LEVEL UP 👇
      const conMod = Math.floor(((rascunho.atributos?.constituicao || 10) - 10) / 2);
      const dv = infoClasse.dadoVida || 8;
      const mediaDv = (dv / 2) + 1;
      
      let vidaFinal = rascunho.vidaMaxima || (dv + conMod);
      
      if (id) {
        const niveisGanhos = rascunho.nivel - nivelOriginal;
        if (niveisGanhos > 0) {
          const hpGanho = niveisGanhos * Math.max(1, mediaDv + conMod);
          vidaFinal = vidaMaximaOriginal + hpGanho;
        } else if (niveisGanhos < 0) {
          const hpPerdido = Math.abs(niveisGanhos) * Math.max(1, mediaDv + conMod);
          vidaFinal = Math.max(dv + conMod, vidaMaximaOriginal - hpPerdido);
        } else {
          vidaFinal = vidaMaximaOriginal;
        }
      } else {
        if (rascunho.nivel > 1 && vidaFinal === (dv + conMod)) {
           vidaFinal = (dv + conMod) + ((mediaDv + conMod) * (rascunho.nivel - 1));
        }
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
      case 3: 
        if (id) { 
          return (
            <div className="fade-in" style={{ textAlign: 'center', padding: '50px 20px', background: '#111', borderRadius: '8px', border: '1px solid #ffcc00', marginTop: '20px' }}>
              <h3 style={{ color: '#ffcc00', fontSize: '1.5rem', marginBottom: '15px' }}>🧬 Atributos Protegidos!</h3>
              <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6' }}>Como você está <strong>Editando / Subindo de Nível</strong>, a tela de sorteio/alocação base de atributos foi trancada.</p>
              <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '20px' }}>Seu Força, Destreza, Inteligência, etc. estão a salvo. <br/>Para aumentar os seus atributos, use as Melhorias de Atributo na aba <strong>"Talentos"</strong>.</p>
            </div>
          );
        }
        return <PassoAtributos />;
      case 4: return <PassoTalentos />;
      case 5: return <PassoPericias />;
      case 6: return <PassoMagias />;    
      case 7: 
        if (id) {
          return (
            <div className="fade-in" style={{ textAlign: 'center', padding: '50px 20px', background: '#111', borderRadius: '8px', border: '1px solid #ffcc00', marginTop: '20px' }}>
              <h3 style={{ color: '#ffcc00', fontSize: '1.5rem', marginBottom: '15px' }}>🎒 Inventário Protegido!</h3>
              <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6' }}>Como você está apenas <strong>Editando / Subindo de Nível</strong>, a geração de equipamento inicial foi desativada para não apagar o seu progresso.</p>
              <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '20px' }}>Suas espadas, poções e itens mágicos estão a salvo. <br/>Gerencie seu inventário direto na aba "Inventário" da sua Ficha.</p>
            </div>
          );
        }
        return <PassoEquipamento />;
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