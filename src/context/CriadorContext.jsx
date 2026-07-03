// src/context/CriadorContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Criamos a "Nuvem" invisível
const CriadorContext = createContext();

// 2. Criamos o "Cérebro" que vai abraçar o nosso Criador de Personagem
export function CriadorProvider({ children }) {
  
  // Onde fica salvo o personagem enquanto o jogador não clica em "Finalizar"
  const [rascunho, setRascunho] = useState({
    nome: "",
    classe: "",
    raca: "",
    antecedente: "",
    alinhamento: "",
    nivel: 1,
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10,
    vidaMaxima: 0,
    ataques: [],
    magias: [],
    inventario: [],
    equipamento: [],
    talentos: [],
    tracosRaciais: [],
    tracosClasse: []
  });

  // 👇 CORREÇÃO: Começamos no índice 0 (Primeira aba) 👇
  const [passoAtual, setPassoAtual] = useState(0);

  // 👇 SISTEMA ANTI-F5: Carrega o rascunho salvo ao abrir a página 👇
  useEffect(() => {
    const salvo = localStorage.getItem('rascunhoCriador');
    if (salvo) {
      try {
        setRascunho(JSON.parse(salvo));
      } catch (e) {
        console.error("Erro ao ler rascunho salvo", e);
      }
    }
  }, []);

  // 👇 SISTEMA ANTI-F5: Salva as mudanças silenciosamente na máquina do cara 👇
  useEffect(() => {
    // Só salva se o cara já tiver pelo menos escolhido a classe, pra não ficar salvando ficha vazia
    if (rascunho.classe) {
      localStorage.setItem('rascunhoCriador', JSON.stringify(rascunho));
    }
  }, [rascunho]);

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