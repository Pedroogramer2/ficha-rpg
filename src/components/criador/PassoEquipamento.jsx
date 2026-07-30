// src/components/criador/PassoEquipamento.jsx
import { useState, useEffect } from 'react';
import { CLASSES_DETALHADAS } from '../../data/classesDetalhado';
import { ANTECEDENTES } from '../../data/antecedentes';
import { ARMAS } from '../../data/armas';          // 👈 Trazemos as Armas para checar
import { ARMADURAS } from '../../data/armaduras'; // 👈 Trazemos as Armaduras também
import { useCriador } from '../../context/CriadorContext';

export function PassoEquipamento() {
  const { rascunho: dados, setRascunho: atualizar } = useCriador();

  const infoClasse = CLASSES_DETALHADAS[dados.classe];
  const opcoesClasse = infoClasse?.equipamentoInicial;
  
  const infoBG = ANTECEDENTES[dados.antecedente];
  const itensBG = infoBG?.equipamento || [];
  
  const [escolha, setEscolha] = useState('a');

  useEffect(() => {
    setEscolha('a');
  }, [dados.classe]);

  let ouroDoAntecedente = 0;
  const itensBGPuros = [];
  
  itensBG.forEach(item => {
    if (item.includes("PO")) {
      const numero = item.match(/\d+/);
      if (numero) ouroDoAntecedente += parseInt(numero[0]);
    } else {
      itensBGPuros.push(item);
    }
  });

  useEffect(() => {
    if (!opcoesClasse) return;

    const chaveSegura = opcoesClasse[escolha] ? escolha : 'a';
    const opcaoSelecionada = opcoesClasse[chaveSegura];
    
    let listaFinal = [];
    let ouroTotal = ouroDoAntecedente;

    const tabelaPesosGerais = {
      "flechas": 1, "poção": 0.5, "corda": 5, "mochila": 5, 
      "dormir": 7, "rações": 2, "tocha": 1, "explorador": 59,
      "masmorra": 34, "estudioso": 30, "grimório": 3
    };

    // 👇 A MÁGICA COMEÇA AQUI: Função que checa o Banco Oficial 👇
    const formatarItemInteligente = (nomeBruto, indexOrigem, nomeOrigem, qtdPassada = 1) => {
      let nomeLimpo = nomeBruto.trim();
      let qtdFinal = qtdPassada;
      let pesoFinal = 0;
      let isArma = false;
      let isArmadura = false;

      // Retira números do começo (Ex: "2 adagas")
      const matchQtd = nomeLimpo.match(/^(\d+)\s+(.+)$/);
      if (matchQtd) {
        qtdFinal = parseInt(matchQtd[1]);
        nomeLimpo = matchQtd[2].trim();
      }

      // Tenta achar a Arma no banco
      const armaEncontrada = ARMAS.find(a => nomeLimpo.toLowerCase().includes(a.nome.toLowerCase().split('(')[0].trim()));
      
      // Tenta achar a Armadura no banco
      const armaduraEncontrada = ARMADURAS.find(a => nomeLimpo.toLowerCase().includes(a.nome.toLowerCase().split('(')[0].trim()));

      if (armaEncontrada) {
        nomeLimpo = armaEncontrada.nome;
        pesoFinal = 3; // Média para não zerar
        isArma = true;
      } else if (armaduraEncontrada) {
        nomeLimpo = armaduraEncontrada.nome;
        pesoFinal = armaduraEncontrada.peso || 10;
        isArmadura = true;
      } else {
        // Se for um item comum de mochila, puxa da tabela
        for (const [chave, peso] of Object.entries(tabelaPesosGerais)) {
          if (nomeLimpo.toLowerCase().includes(chave)) pesoFinal = peso;
        }
      }

      return { 
        id: `${nomeOrigem}-${indexOrigem}-${Date.now()}`, 
        nome: nomeLimpo, 
        qtd: qtdFinal, 
        peso: pesoFinal, 
        origem: nomeOrigem,
        equipado: isArma || isArmadura,
        sintonizado: false,
        isArma: isArma,
        isArmadura: isArmadura
      };
    };

    // Formata o Antecedente
    itensBGPuros.forEach((item, i) => {
      listaFinal.push(formatarItemInteligente(item, i, "bg"));
    });

    // Formata a Classe
    if (opcaoSelecionada && opcaoSelecionada.itens) {
      opcaoSelecionada.itens.forEach((item, i) => {
        if (!item.includes("PO")) {
          listaFinal.push(formatarItemInteligente(item, i, "class"));
        }
      });
    }

    if (opcaoSelecionada && opcaoSelecionada.ouro) {
      ouroTotal += opcaoSelecionada.ouro;
    }

    // Salva na nuvem
    atualizar(prev => ({ 
      ...prev, 
      inventario: listaFinal,
      moedas: { pc: 0, pp: 0, pe: 0, po: ouroTotal, pl: 0 } 
    }));

  }, [escolha, dados.classe, dados.antecedente, ouroDoAntecedente, atualizar]); // Atualizado as dependências para evitar loops

  if (!opcoesClasse) return <div className="painel-vazio">Você precisa selecionar uma classe primeiro.</div>;

  return (
    <div className="layout-criador-duplo">
      <div className="coluna-selecao">
        <h3 className="subtitulo-criador">Equipamento Inicial ({dados.classe})</h3>
        <div className="opcoes-ab-container">
          {Object.entries(opcoesClasse).map(([chave, opcao]) => (
            <div 
              key={chave}
              className={`card-opcao-ab ${escolha === chave ? 'selecionado' : ''}`}
              onClick={() => setEscolha(chave)}
              style={{
                background: escolha === chave ? 'rgba(76, 175, 80, 0.1)' : '#1e1e1e',
                border: escolha === chave ? '1px solid #4caf50' : '1px solid #333',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <div className="badge-opcao" style={{
                position: 'absolute',
                top: 0, right: 0,
                background: escolha === chave ? '#4caf50' : '#444',
                color: escolha === chave ? '#000' : '#fff',
                padding: '4px 12px',
                borderRadius: '0 7px 0 8px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                OPÇÃO {chave.toUpperCase()}
              </div>
              
              <h4 style={{ margin: '0 0 10px 0', color: escolha === chave ? '#4caf50' : '#fff' }}>
                {opcao.titulo}
              </h4>
              
              {opcao.itens ? (
                <ul className="lista-itens-ab" style={{ margin: 0, paddingLeft: '20px', color: '#ccc', fontSize: '0.9rem' }}>
                  {opcao.itens
                    .filter(it => !it.includes("PO"))
                    .map(it => <li key={it} style={{marginBottom: '4px'}}>{it}</li>)
                  }
                  {opcao.ouro > 0 && <li className="item-ouro" style={{color: '#ffcc00', marginTop: '5px', fontWeight: 'bold'}}>+ {opcao.ouro} PO</li>}
                </ul>
              ) : (
                <div className="ouro-gigante" style={{ textAlign: 'center', fontSize: '2rem', color: '#ffcc00', fontWeight: 'bold', padding: '10px 0' }}>
                  {opcao.ouro} <small style={{fontSize: '1rem'}}>PO</small>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="coluna-detalhes">
        <div className="painel-info-classe" style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', padding: '20px', height: '100%' }}>
          <div className="cabecalho-info" style={{ borderBottom: '1px solid #444', paddingBottom: '15px', marginBottom: '15px' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>Sua Mochila</h2>
            <span className="badge-dado-vida" style={{ background: 'rgba(255, 204, 0, 0.1)', color: '#ffcc00', border: '1px solid #ffcc00' }}>
              Ouro Total: {dados.moedas?.po || 0} PO
            </span>
          </div>

          <div className="tabela-scroll" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 80px)', paddingRight: '5px' }}>
            <h4 className="titulo-tabela" style={{ color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase', margin: '0 0 10px 0' }}>Do Antecedente</h4>
            <ul className="lista-itens-preview" style={{ paddingLeft: '20px', color: '#ddd', fontSize: '0.9rem', marginBottom: '20px' }}>
              {itensBGPuros.map((item, i) => <li key={i} style={{marginBottom: '5px'}}>{item}</li>)}
            </ul>

            <h4 className="titulo-tabela" style={{ color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase', margin: '0 0 10px 0' }}>Da Classe (Opção {escolha.toUpperCase()})</h4>
            <ul className="lista-itens-preview" style={{ paddingLeft: '20px', color: '#ddd', fontSize: '0.9rem' }}>
              {opcoesClasse[escolha]?.itens ? (
                opcoesClasse[escolha].itens
                  .filter(it => !it.includes("PO")) 
                  .map((item, i) => (
                  <li key={i} className="item-destaque" style={{marginBottom: '5px'}}>{item}</li>
                ))
              ) : (
                <li className="item-ouro" style={{listStyle: 'none', color: '#ffcc00', fontStyle: 'italic'}}>💰 Apenas Ouro ({opcoesClasse[escolha]?.ouro} PO)</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}