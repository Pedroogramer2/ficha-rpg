// src/pages/CriadorPersonagem.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
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

      const magiasFinais = { 
        truques: [...(rascunho.magiasConhecidas?.truques || [])], 
        nivel1: [...(rascunho.magiasConhecidas?.nivel1 || [])],
        nivel2: [...(rascunho.magiasConhecidas?.nivel2 || [])],
        nivel3: [...(rascunho.magiasConhecidas?.nivel3 || [])],
        nivel4: [...(rascunho.magiasConhecidas?.nivel4 || [])],
        nivel5: [...(rascunho.magiasConhecidas?.nivel5 || [])]
      };

      function mesclarMagiasBonus(pacoteDeMagias) {
        if (!pacoteDeMagias) return;
        Object.keys(pacoteDeMagias).forEach(nivelChave => {
          if (!magiasFinais[nivelChave]) magiasFinais[nivelChave] = [];
          pacoteDeMagias[nivelChave].forEach(magia => {
            if (!magiasFinais[nivelChave].includes(magia)) {
              magiasFinais[nivelChave].push(magia);
            }
          });
        });
      }

      mesclarMagiasBonus(infoRaca?.magiasBonus);
      mesclarMagiasBonus(rascunho.escolhaRacialDetalhes?.magiasBonus);
      mesclarMagiasBonus(dadosSub?.magiasBonus);

      const estiloEscolhidoObj = rascunho.escolhasClasse?.["Estilo de Luta (Fighting Style)"];
      const estiloNome = estiloEscolhidoObj ? estiloEscolhidoObj.nome : "";
      let bonusCA_Auto = rascunho.bonusCA || 0; 
      let visaoExtra = "";

      if (estiloNome.includes("Defesa") || estiloNome.includes("Defense")) bonusCA_Auto += 1;
      if (estiloNome.includes("Cegas") || estiloNome.includes("Blind")) visaoExtra = "Percepção às Cegas (10 ft)";

      const conMod = Math.floor(((rascunho.atributos?.constituicao || 10) - 10) / 2);
      const dv = infoClasse.dadoVida || 8;
      const mediaDv = (dv / 2) + 1;
      
      let vidaFinal = rascunho.vidaMaxima;
      if (rascunho.nivel > 1 && vidaFinal === (dv + conMod)) {
         vidaFinal = (dv + conMod) + ((mediaDv + conMod) * (rascunho.nivel - 1));
      }

      const dadosVidaInicial = { total: rascunho.nivel || 1, gastos: rascunho.dadosVida?.gastos || 0, tipo: dv };
      let ataquesIniciais = rascunho.ataques || [];

      // 👇 MÁGICA DOS ATRIBUTOS (FIM DO LOOP INFINITO) 👇
      // Nós APAGAMOS a soma dupla de antecedentes que tinha aqui!
      // O PassoAtributos e o Antivirus já fazem o cálculo perfeitamente.
      // Aqui a gente só embala pra viagem!
      let atributosFinais = {
        forca: Number(rascunho.atributos?.forca ?? rascunho.forca ?? 10),
        destreza: Number(rascunho.atributos?.destreza ?? rascunho.destreza ?? 10),
        constituicao: Number(rascunho.atributos?.constituicao ?? rascunho.constituicao ?? 10),
        inteligencia: Number(rascunho.atributos?.inteligencia ?? rascunho.inteligencia ?? 10),
        sabedoria: Number(rascunho.atributos?.sabedoria ?? rascunho.sabedoria ?? 10),
        carisma: Number(rascunho.atributos?.carisma ?? rascunho.carisma ?? 10),
      };

      // Tira a pasta "atributos" do rascunho pra jogar eles espalhados na raiz do banco de dados
      const { atributos, ...restoRascunho } = rascunho; 

      const personagemFinal = {
        ...restoRascunho,
        ...atributosFinais, // 👈 Exporta os atributos certinhos pra raiz sem somar +2 fantasma!
        atributos: null,
        profArmasArmaduras: textoProficiencias,
        idiomas: textoIdiomas,
        periciasTreinadas: periciasFinais,
        dadosVida: dadosVidaInicial,
        vidaMaxima: vidaFinal, 
        vidaAtual: rascunho.vidaAtual !== undefined ? rascunho.vidaAtual : vidaFinal,
        tracosClasse: tracosClasseFinais,
        bonusCA: bonusCA_Auto,
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
        {TITULOS_PASSOS.map((titulo, index) => (
          <div key={index} className={`bolinha-passo ${index === passoAtual ? 'ativa' : ''} ${index < passoAtual ? 'concluido' : ''}`} onClick={() => setPassoAtual(index)}>
            {index + 1}<span className="tooltip-passo">{titulo}</span>
          </div>
        ))}
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