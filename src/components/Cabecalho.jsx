// src/components/Cabecalho.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CLASSES_DETALHADAS } from '../data/classesDetalhado';

export function Cabecalho(props) {
  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");
  const [nivel, setNivel] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.dados) {
      setNome(props.dados.nome || "");
      setClasse(props.dados.classe || "Guerreiro"); 
      setNivel(props.dados.nivel || 1);
    }
  }, [props.dados]);

  function salvar(campo, valor) {
    if (props.aoSalvar) props.aoSalvar(campo, valor);
  }

  // Pegamos o ID para mandar o cara pro Criador caso ele tente mexer onde não deve
  const fichaId = props.dados?.id;

  return (
    <header className="cabecalho-container" style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
      <div className="topo-navegacao" style={{ marginBottom: '15px' }}>
        <Link to="/" className="btn-voltar" style={{ color: '#aaa', textDecoration: 'none' }}>⬅ Voltar</Link>
      </div>

      <div className="inputs-principais" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        
        <div className="grupo-input principal" style={{ flex: '1 1 200px' }}>
          <label style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>Nome do Herói</label>
          <input 
            type="text" 
            className="input-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => salvar("nome", nome)}
            placeholder="Nome"
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #555', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', outline: 'none' }}
          />
        </div>

        <div className="linha-secundaria" style={{ display: 'flex', gap: '15px', flex: '1 1 250px' }}>
          
          {/* 👇 A CLASSE AGORA É SÓ LEITURA! Se quiser mudar, clica no botão 👇 */}
          <div className="grupo-input" style={{ flex: 1 }}>
            <label style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>Classe</label>
            <div 
              title="Para mudar de classe, vá em Editar Ficha"
              style={{ background: '#222', border: '1px solid #444', color: '#ffcc00', padding: '10px', borderRadius: '5px', fontSize: '1.1rem', cursor: 'not-allowed', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              {classe}
              <button 
                onClick={() => navigate(`/editar/${fichaId}`)}
                style={{ background: 'transparent', border: 'none', color: '#3498db', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✏️ Editar
              </button>
            </div>
          </div>

          {/* O nível também deveria ser só leitura, já que tem o botão de Level Up lá no StatusCombate, mas mantive editável só por garantia */}
          <div className="grupo-input pequeno" style={{ width: '80px' }}>
            <label style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>Nível</label>
            <input 
              type="number" 
              value={nivel}
              onChange={(e) => setNivel(parseInt(e.target.value) || 1)}
              onBlur={() => salvar("nivel", parseInt(nivel))}
              style={{ width: '100%', background: '#222', border: '1px solid #444', color: 'white', padding: '10px', borderRadius: '5px', fontSize: '1.1rem', textAlign: 'center' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}