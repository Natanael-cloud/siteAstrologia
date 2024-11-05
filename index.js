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
    const data = new Date(dataNascimento); // Converte a data de nascimento em um objeto Date
    const dia = data.getDate() + 1; // Obtém o dia do mês e adiciona 1 para correção
    const mes = data.getMonth() + 1; // Obtém o mês e adiciona 1 para correção

    // Verifica qual signo corresponde à data fornecida com base no intervalo de dias e meses
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

// Função para calcular o signo lunar baseado no dia do nascimento (simplificação)
function calcularSignoLua(dataNascimento) {
    const dia = new Date(dataNascimento).getDate(); // Extrai o dia da data de nascimento
    const luas = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    
    // Retorna um signo lunar baseado no dia do mês, utilizando uma abordagem simplificada
    return luas[dia % 12];
}

// Função para calcular o ascendente com base na hora de nascimento
function calcularAscendente(horaNascimento) {
    const hora = parseInt(horaNascimento.split(':')[0], 10); // Extrai a hora do campo de hora de nascimento
    const ascendentes = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    
    // Divide o dia em intervalos de 2 horas para cada signo e retorna o ascendente correspondente
    return ascendentes[Math.floor(hora / 2) % 12];
}

// Função principal para gerar o mapa astral e exibir os resultados
function gerarMapaAstral() {
    // Coleta os dados de entrada do usuário
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const horaNascimento = document.getElementById('horaNascimento').value;
    const localNascimento = document.getElementById('localNascimento').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !dataNascimento || !horaNascimento || !localNascimento) {
        alert("Por favor, preencha todos os campos obrigatórios."); // Exibe alerta se algum campo estiver vazio
        return; // Encerra a função caso faltem informações
    }

    // Calcula o signo solar, o signo lunar e o ascendente usando as funções definidas anteriormente
    const signoSolar = calcularSignoSolar(dataNascimento);
    const signoLua = calcularSignoLua(dataNascimento);
    const ascendente = calcularAscendente(horaNascimento);

    // Obtém descrições para cada signo chamando a função getDescricaoSigno
    const descricaoSolar = getDescricaoSigno(signoSolar);
    const descricaoLua = getDescricaoSigno(signoLua);
    const descricaoAscendente = getDescricaoSigno(ascendente);

    // Obtém o elemento onde os resultados serão exibidos e insere o resultado formatado
    const resultadoDiv = document.getElementById('resultadoMapaAstral');
    resultadoDiv.innerHTML = `
        <h2>Mapa Astral de ${nome}</h2>
        <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
        <p><strong>Hora de Nascimento:</strong> ${horaNascimento}</p>
        <p><strong>Local de Nascimento:</strong> ${localNascimento}</p>

        <p><strong>Signo Solar:</strong> ${signoSolar} - ${descricaoSolar}</p>
        <p><strong>Signo Lunar:</strong> ${signoLua} - ${descricaoLua}</p>
        <p><strong>Ascendente:</strong> ${ascendente} - ${descricaoAscendente}</p>
    `;
}

// Função para retornar uma breve descrição com base no signo fornecido
function getDescricaoSigno(signo) {
    // Define um objeto com descrições para cada signo
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

    // Retorna a descrição do signo ou uma mensagem padrão se o signo não for encontrado
    return descricoes[signo] || "Descrição não disponível.";
}
