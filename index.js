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
