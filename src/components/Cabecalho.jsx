// src/components/Cabecalho.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CLASSES_DETALHADAS } from '../data/classesDetalhado'; // 🧠 Agora apontando para o banco detalhado

export function Cabecalho(props) {
  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");
  const [nivel, setNivel] = useState(1);

  useEffect(() => {
    if (props.dados) {
      setNome(props.dados.nome || "");
      setClasse(props.dados.classe || "Guerreiro"); 
      setNivel(props.dados.nivel || 1);
    }
  }, [props.dados]);

  function salvar(campo, valor) {
    if (props.aoSalvar) {
      props.aoSalvar(campo, valor);
    }
  }

  function mudarClasse(novaClasse) {
    setClasse(novaClasse);
    
    // Busca as regras direto do banco detalhado
    const regras = CLASSES_DETALHADAS[novaClasse];
    
    if (regras && props.dados) {
      const con = props.dados.constituicao || 10;
      const modCon = Math.floor((con - 10) / 2);
      
      // Regra D&D 2024 Nível 1: Vida Cheia do Dado + Mod Con
      const novaVidaMax = regras.dadoVida + modCon;

      salvar("classe", novaClasse);
      salvar("vidaMaxima", novaVidaMax);
      salvar("vidaAtual", novaVidaMax); 

      alert(`Classe alterada para ${novaClasse}! Vida ajustada para ${novaVidaMax} (d${regras.dadoVida} + Con).`);
    }
  }

  return (
    <header className="cabecalho-container">
      <div className="topo-navegacao">
        <Link to="/" className="btn-voltar">⬅ Voltar ao Grimório</Link>
      </div>

      <div className="inputs-principais">
        
        <div className="grupo-input principal">
          <label>Nome do Personagem</label>
          <input 
            type="text" 
            className="input-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => salvar("nome", nome)}
            placeholder="Nome do Herói"
          />
        </div>

        <div className="linha-secundaria">
          
          <div className="grupo-input">
            <label>Classe</label>
            <select 
              value={classe} 
              onChange={(e) => mudarClasse(e.target.value)}
              className="select-classe"
            >
              <option value="" disabled>Escolha uma classe...</option>
              {/* Mapeia as chaves do novo banco detalhado */}
              {Object.keys(CLASSES_DETALHADAS).map((nomeClasse) => (
                <option key={nomeClasse} value={nomeClasse}>
                  {nomeClasse}
                </option>
              ))}
            </select>
            {/* Exibe a descrição do banco detalhado */}
            <small style={{color:'#888', marginTop:'5px', fontStyle:'italic'}}>
              {CLASSES_DETALHADAS[classe]?.descricao}
            </small>
          </div>

          <div className="grupo-input pequeno">
            <label>Nível</label>
            <input 
              type="number" 
              value={nivel}
              onChange={(e) => setNivel(parseInt(e.target.value) || 1)}
              onBlur={() => salvar("nivel", parseInt(nivel))}
            />
          </div>
        </div>
      </div>

      <style>{`
        .select-classe {
          background: #111;
          border: 1px solid #444;
          color: #ffcc00;
          padding: 10px;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .select-classe:hover { border-color: #ffcc00; }
      `}</style>
    </header>
  );
}