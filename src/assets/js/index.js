// Função para criar estrelas de fundo animadas
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    document.body.appendChild(star);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    setTimeout(() => star.remove(), 3000);
}

// Cria várias estrelas a cada 100ms
setInterval(createStar, 100);

// Função para criar o cometa com cauda
function criarCometaComCauda() {
    const cometa = document.createElement('div');
    cometa.classList.add('cometa');
    document.body.appendChild(cometa);

    // Criação da cauda do cometa
    function criarCauda() {
        const cauda = document.createElement('div');
        cauda.classList.add('cauda');
        document.body.appendChild(cauda);

        const { top, left } = cometa.getBoundingClientRect();
        cauda.style.top = `${top}px`;
        cauda.style.left = `${left}px`;

        setTimeout(() => cauda.remove(), 500);
    }

    // Anima o cometa atravessando a tela
    const iniciarCometa = () => {
        cometa.style.top = `${Math.random() * 80}vh`;
        cometa.style.left = `-100px`;

        cometa.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(110vw)' }], {
            duration: 5000,
            easing: 'linear',
            iterations: 1
        }).onfinish = iniciarCometa;

        setInterval(criarCauda, 100);
    };

    iniciarCometa();
}

// Inicia o cometa ao carregar a página
window.onload = criarCometaComCauda;

// Função para calcular o signo solar com base na data de nascimento
function calcularSignoSolar(dataNascimento) {
    const data = new Date(dataNascimento);
    const dia = data.getDate() + 1;
    const mes = data.getMonth() + 1;

    const signos = {
        "Áries": { start: { m: 3, d: 21 }, end: { m: 4, d: 19 } },
        "Touro": { start: { m: 4, d: 20 }, end: { m: 5, d: 20 } },
        "Gêmeos": { start: { m: 5, d: 21 }, end: { m: 6, d: 20 } },
        "Câncer": { start: { m: 6, d: 21 }, end: { m: 7, d: 22 } },
        "Leão": { start: { m: 7, d: 23 }, end: { m: 8, d: 22 } },
        "Virgem": { start: { m: 8, d: 23 }, end: { m: 9, d: 22 } },
        "Libra": { start: { m: 9, d: 23 }, end: { m: 10, d: 22 } },
        "Escorpião": { start: { m: 10, d: 23 }, end: { m: 11, d: 21 } },
        "Sagitário": { start: { m: 11, d: 22 }, end: { m: 12, d: 21 } },
        "Capricórnio": { start: { m: 12, d: 22 }, end: { m: 1, d: 19 } },
        "Aquário": { start: { m: 1, d: 20 }, end: { m: 2, d: 18 } },
        "Peixes": { start: { m: 2, d: 19 }, end: { m: 3, d: 20 } }
    };

    for (let signo in signos) {
        let start = signos[signo].start;
        let end = signos[signo].end;

        if ((mes == start.m && dia >= start.d) || (mes == end.m && dia <= end.d)) {
            return signo;
        }
    }
}

// Função para calcular o signo lunar simplificado
function calcularSignoLua(dataNascimento) {
    const dia = new Date(dataNascimento).getDate();
    const luas = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    return luas[dia % 12];
}

// Função para calcular o ascendente
function calcularAscendente(horaNascimento) {
    const hora = parseInt(horaNascimento.split(':')[0], 10);
    const ascendentes = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
    return ascendentes[Math.floor(hora / 2) % 12];
}

// Função para gerar e exibir o mapa astral
function gerarMapaAstral() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const horaNascimento = document.getElementById('horaNascimento').value;
    const localNascimento = document.getElementById('localNascimento').value;

    if (!nome || !dataNascimento || !horaNascimento || !localNascimento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const signoSolar = calcularSignoSolar(dataNascimento);
    const signoLua = calcularSignoLua(dataNascimento);
    const ascendente = calcularAscendente(horaNascimento);

    const descricaoSolar = getDescricaoSigno(signoSolar);
    const descricaoLua = getDescricaoSigno(signoLua);
    const descricaoAscendente = getDescricaoSigno(ascendente);

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

// Função para retornar uma descrição para o signo fornecido
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
    return descricoes[signo] || "Descrição não disponível.";
}
