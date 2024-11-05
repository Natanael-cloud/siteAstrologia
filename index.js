// Função para criar estrelas de fundo animadas
function createStar() {
    // Cria um elemento <div> que representará a estrela
    const star = document.createElement('div');
    // Adiciona a classe 'star' ao elemento, para aplicar o estilo
    star.classList.add('star');
    // Adiciona o elemento de estrela ao corpo do documento (página)
    document.body.appendChild(star);

    // Gera uma posição aleatória dentro da janela para a estrela
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    // Define a posição da estrela usando as coordenadas calculadas
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Remove a estrela após 3 segundos para evitar excesso de elementos e melhorar o desempenho
    setTimeout(() => star.remove(), 3000);
}

// Cria várias estrelas chamando a função `createStar` a cada 100 ms
setInterval(createStar, 100);

// Função para criar o cometa e sua animação com cauda
function criarCometaComCauda() {
    // Cria um elemento <div> para representar o cometa
    const cometa = document.createElement('div');
    // Adiciona a classe 'cometa' ao cometa para aplicar o estilo
    cometa.classList.add('cometa');
    // Adiciona o cometa ao corpo do documento
    document.body.appendChild(cometa);

    // Função para criar o efeito de cauda do cometa
    function criarCauda() {
        // Cria um elemento <div> para a cauda do cometa
        const cauda = document.createElement('div');
        // Adiciona a classe 'cauda' para o estilo da cauda
        cauda.classList.add('cauda');
        // Adiciona a cauda ao documento
        document.body.appendChild(cauda);

        // Define a posição da cauda baseada na posição atual do cometa
        const { top, left } = cometa.getBoundingClientRect();
        cauda.style.top = `${top}px`;
        cauda.style.left = `${left}px`;

        // Remove a cauda após 500ms para criar o efeito de rastro
        setTimeout(() => cauda.remove(), 500);
    }

    // Anima o cometa para atravessar a tela
    const iniciarCometa = () => {
        cometa.style.top = `${Math.random() * 80}vh`; // Posição vertical aleatória
        cometa.style.left = `-100px`; // Inicia fora da tela, à esquerda

        // Animação que move o cometa da esquerda para a direita
        cometa.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(110vw)' }
        ], {
            duration: 5000, // Duração da animação em milissegundos
            easing: 'linear', // Animação com movimento linear
            iterations: 1
        }).onfinish = iniciarCometa; // Reinicia a animação

        // Cria a cauda a cada 100ms para simular o rastro do cometa
        setInterval(criarCauda, 100);
    };

    iniciarCometa();
}

// Inicia o cometa automaticamente ao carregar a página
window.onload = criarCometaComCauda;

// Função para calcular o signo solar com base na data de nascimento fornecida
function calcularSignoSolar(dataNascimento) {
    // Converte a data de nascimento em um objeto Date
    const data = new Date(dataNascimento);
    // Obtém o dia e o mês da data fornecida
    const dia = data.getDate() + 1;
    const mes = data.getMonth() + 1;

    // Verifica o signo correspondente com base no intervalo de datas
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

// Função para calcular o signo lunar com base no dia de nascimento (simplificação)
function calcularSignoLua(dataNascimento) {
    const dia = new Date(dataNascimento).getDate();
    const luas = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    
    // Retorna um signo lunar usando o índice do dia do mês
    return luas[dia % 12];
}

// Função para calcular o ascendente baseado na hora de nascimento
function calcularAscendente(horaNascimento) {
    const hora = parseInt(horaNascimento.split(':')[0], 10);
    const ascendentes = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    
    // Divide as horas em intervalos de 2 para cada signo
    return ascendentes[Math.floor(hora / 2) % 12];
}

// Função para gerar e exibir o mapa astral
function gerarMapaAstral() {
    // Coleta os dados de entrada do usuário
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const horaNascimento = document.getElementById('horaNascimento').value;
    const localNascimento = document.getElementById('localNascimento').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !dataNascimento || !horaNascimento || !localNascimento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Calcula os signos solar, lunar e o ascendente
    const signoSolar = calcularSignoSolar(dataNascimento);
    const signoLua = calcularSignoLua(dataNascimento);
    const ascendente = calcularAscendente(horaNascimento);

    // Obtém descrições para cada signo
    const descricaoSolar = getDescricaoSigno(signoSolar);
    const descricaoLua = getDescricaoSigno(signoLua);
    const descricaoAscendente = getDescricaoSigno(ascendente);

    // Exibe o resultado no elemento HTML 'resultadoMapaAstral'
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

// Função para retornar uma breve descrição para o signo fornecido
function getDescricaoSigno(signo) {
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

    // Retorna a descrição do signo ou uma mensagem padrão
    return descricoes[signo] || "Descrição não disponível.";
}
