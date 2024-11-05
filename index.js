// Função para criar estrelas de fundo animadas
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  document.body.appendChild(star);

  // Posição aleatória das estrelas
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // Remover a estrela após um tempo para manter o desempenho
  setTimeout(() => star.remove(), 3000);
}

// Criar várias estrelas de fundo
setInterval(createStar, 100);

// Função para criar o cometa e sua animação
function criarCometaComCauda() {
  const cometa = document.createElement('div');
  cometa.classList.add('cometa');
  document.body.appendChild(cometa);

  // Função para criar o efeito da cauda
  function criarCauda() {
      const cauda = document.createElement('div');
      cauda.classList.add('cauda');
      document.body.appendChild(cauda);

      // Posiciona a cauda onde o cometa está no momento
      const { top, left } = cometa.getBoundingClientRect();
      cauda.style.top = `${top}px`;
      cauda.style.left = `${left}px`;

      // Remove a cauda gradualmente para criar o efeito de rastro
      setTimeout(() => {
          cauda.remove();
      }, 500); // A cauda desaparece após 500ms
  }

  // Anima o cometa através da tela
  const iniciarCometa = () => {
      cometa.style.top = `${Math.random() * 80}vh`; // Posição aleatória vertical
      cometa.style.left = `-100px`; // Começa fora da tela, à esquerda

      // Animação do cometa
      cometa.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(110vw)' } // Move para fora da tela à direita
      ], {
          duration: 5000, // Duração da animação
          easing: 'linear', // Movimento linear
          iterations: 1
      }).onfinish = iniciarCometa; // Reinicia a animação

      // Cria a cauda a cada 100ms para simular o rastro
      setInterval(criarCauda, 100);
  };

  iniciarCometa();
}

// Inicia o cometa ao carregar a página
window.onload = criarCometaComCauda;


// Função para calcular o signo solar com base na data de nascimento fornecida
function calcularSignoSolar(dataNascimento) {
    // Converte a data de nascimento para um objeto Date do JavaScript
    const data = new Date(dataNascimento);

    // Extrai o dia e o mês da data de nascimento
    const dia = data.getDate() + 1; // Ajuste do dia para compensar o início do mês em 0
    const mes = data.getMonth() + 1; // Ajuste do mês para compensar que o mês começa em 0 no JavaScript

    // Verifica o intervalo de cada signo e retorna o nome correspondente
    if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) return "Áries";
    if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) return "Touro";
    if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) return "Gêmeos";
    if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) return "Câncer";
    if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) return "Leão";
    if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) return "Virgem";
    if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) return "Libra";
    if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) return "Escorpião";
    if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) return "Sagitário";
    if ((mes == 12 && dia >= 22) || (mes == 1 && dia <= 19)) return "Capricórnio";
    if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) return "Aquário";
    if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) return "Peixes";
}

// Função principal para gerar o mapa astral
function gerarMapaAstral() {
    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const horaNascimento = document.getElementById('horaNascimento').value;
    const localNascimento = document.getElementById('localNascimento').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !dataNascimento || !localNascimento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Sai da função se houver campos obrigatórios em branco
    }

    // Calcula o signo solar usando a data de nascimento
    const signoSolar = calcularSignoSolar(dataNascimento);

    // Exibe o resultado do mapa astral
    const resultadoDiv = document.getElementById('resultadoMapaAstral');
    resultadoDiv.innerHTML = `
        <h2>Mapa Astral de ${nome}</h2>
        <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
        <p><strong>Hora de Nascimento:</strong> ${horaNascimento || "Não especificada"}</p>
        <p><strong>Local de Nascimento:</strong> ${localNascimento}</p>
        <p><strong>Signo Solar:</strong> ${signoSolar}</p>
        <p><strong>Descrição:</strong> ${getDescricaoSigno(signoSolar)}</p>
    `;
}

// Função que retorna uma breve descrição com base no signo
function getDescricaoSigno(signo) {
    // Dicionário de descrições para cada signo
    const descricoes = {
        "Áries": "Signo de Fogo, caracterizado pela iniciativa e coragem.",
        "Touro": "Signo de Terra, valorizador da estabilidade e conforto.",
        "Gêmeos": "Signo de Ar, comunicativo e adaptável.",
        "Câncer": "Signo de Água, emocional e ligado à família.",
        "Leão": "Signo de Fogo, criativo e cheio de energia.",
        "Virgem": "Signo de Terra, prático e detalhista.",
        "Libra": "Signo de Ar, amante da harmonia e da justiça.",
        "Escorpião": "Signo de Água, intenso e misterioso.",
        "Sagitário": "Signo de Fogo, busca por liberdade e aventura.",
        "Capricórnio": "Signo de Terra, ambicioso e responsável.",
        "Aquário": "Signo de Ar, inovador e idealista.",
        "Peixes": "Signo de Água, sensível e compassivo."
    };

    // Retorna a descrição correspondente ao signo, ou uma mensagem padrão se o signo não estiver listado
    return descricoes[signo] || "Descrição não disponível.";
}
