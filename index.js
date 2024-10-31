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
