// src/context/CriadorContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Criamos a "Nuvem" invisível
const CriadorContext = createContext();

// 2. Criamos o "Cérebro" que vai abraçar o nosso Criador de Personagem
export function CriadorProvider({ children }) {
  
  // 👇 Esqueleto alinhado com a nossa arquitetura final (Evita bugs de undefined nas telas) 👇
  const [rascunho, setRascunho] = useState({
    nome: "",
    classe: "",
    raca: "",
    antecedente: "",
    alinhamento: "",
    nivel: 1,
    atributos: { forca: 10, destreza: 10, constituicao: 10, inteligencia: 10, sabedoria: 10, carisma: 10 },
    vidaMaxima: 0,
    ataques: [],
    magiasConhecidas: { truques: [], nivel1: [] },
    inventario: [],
    talentos: [],
    tracosRaciais: [],
    tracosClasse: [],
    periciasTreinadas: {},
    escolhasClasse: {}
  });

  const [passoAtual, setPassoAtual] = useState(0);

  // 👇 ANTI-F5 SUPREMO: Carrega a Ficha E A ABA QUE ELE ESTAVA 👇
  useEffect(() => {
    const salvo = localStorage.getItem('rascunhoCriador');
    const passoSalvo = localStorage.getItem('passoCriador'); // Lembra a aba!
    
    if (salvo) {
      try {
        setRascunho(JSON.parse(salvo));
        if (passoSalvo) {
          setPassoAtual(parseInt(passoSalvo));
        }
      } catch (e) {
        console.error("Erro ao ler rascunho salvo", e);
      }
    }
  }, []);

  // 👇 ANTI-F5 SUPREMO: Salva as mudanças e a tela atual silenciosamente 👇
  useEffect(() => {
    if (rascunho.classe) {
      localStorage.setItem('rascunhoCriador', JSON.stringify(rascunho));
      localStorage.setItem('passoCriador', passoAtual.toString());
    }
  }, [rascunho, passoAtual]);

  // Função inteligente que qualquer aba pode usar para mudar um dado na nuvem
  function atualizarRascunho(campo, valor) {
    setRascunho(estadoAnterior => ({
      ...estadoAnterior,
      [campo]: valor
    }));
  }

  return (
    <CriadorContext.Provider value={{ 
      rascunho, 
      setRascunho, 
      atualizarRascunho, 
      passoAtual, 
      setPassoAtual 
    }}>
      {children}
    </CriadorContext.Provider>
  );
}

// 3. Um atalho chique para os outros arquivos puxarem os dados facilmente
export function useCriador() {
  const context = useContext(CriadorContext);
  if (!context) {
    throw new Error("useCriador deve ser usado dentro de um CriadorProvider");
  }
  return context;
}