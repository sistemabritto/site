import { useState, useEffect } from 'react';

export default function Gamificacao() {
  const [etapas, setEtapas] = useState([
    { id: 1, titulo: 'Introdução', descricao: 'Bem-vindo ao Sistema Britto!' },
    { id: 2, titulo: 'Configuração Inicial', descricao: 'Vamos começar a configurar sua jornada!' },
    { id: 3, titulo: 'Integração com a Equipe', descricao: 'Agora vamos integrar você com a nossa equipe!' },
    { id: 4, titulo: 'Implementação', descricao: 'Estamos configurando seu ambiente!' },
    { id: 5, titulo: 'Pronto para Usar', descricao: 'Tudo certo! Agora é só usar o sistema.' }
  ]);

  const [etapaAtual, setEtapaAtual] = useState(0);

  const proximaEtapa = () => {
    if (etapaAtual < etapas.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  return (
    <div>
      <h1>Etapa {etapas[etapaAtual].titulo}</h1>
      <p>{etapas[etapaAtual].descricao}</p>
      <button onClick={proximaEtapa}>Avançar</button>
      <button onClick={etapaAnterior}>Voltar</button>
    </div>
  );
}