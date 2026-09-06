// Pega o canvas e permite desenhar nele.
const tela = document.getElementById('C');
const pincel = tela.getContext('2d');

// Guarda os fogos que ainda estao subindo.
const foguetes = [];

// Guarda as particulas criadas depois da explosao.
const particulas = [];

// Guarda a posicao onde o proximo foguete vai explodir.
const alvo = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 3
};

function ajustarTamanhoDaTela() {
	// Faz o canvas ocupar toda a janela.
	tela.width = window.innerWidth;
	tela.height = window.innerHeight;
}

function criarFoguete(posicaoX, posicaoY) {
	// O foguete sempre comeca na parte inferior da tela.
	foguetes.push({
		x: posicaoX,
		y: tela.height,
		alvoX: posicaoX,
		alvoY: posicaoY,
		velocidade: 8,
		cor: `hsl(${Math.random() * 360}, 90%, 65%)`
	});
}

function explodirFoguete(foguete) {
	// Cria particulas voando em todas as direcoes.
	for (let indice = 0; indice < 35; indice++) {
		const angulo = Math.random() * Math.PI * 2;
		const forca = Math.random() * 4 + 2;

		particulas.push({
			x: foguete.x,
			y: foguete.y,
			velocidadeX: Math.cos(angulo) * forca,
			velocidadeY: Math.sin(angulo) * forca,
			tamanho: Math.random() * 2 + 1,
			vida: 1,
			cor: foguete.cor
		});
	}
}

function atualizarFoguetes() {
	foguetes.forEach((foguete, indice) => {
		// Move o foguete em direcao ao ponto escolhido pelo mouse.
		foguete.y -= foguete.velocidade;

		if (foguete.y <= foguete.alvoY) {
			explodirFoguete(foguete);
			foguetes.splice(indice, 1);
		}
	});
}

function atualizarParticulas() {
	particulas.forEach((particula, indice) => {
		// Aplica movimento e uma pequena gravidade.
		particula.x += particula.velocidadeX;
		particula.y += particula.velocidadeY;
		particula.velocidadeY += 0.04;
		particula.vida -= 0.015;

		// Remove a particula quando ela perde sua vida.
		if (particula.vida <= 0) {
			particulas.splice(indice, 1);
		}
	});
}

function desenharFoguetes() {
	foguetes.forEach((foguete) => {
		pincel.beginPath();
		pincel.arc(foguete.x, foguete.y, 3, 0, Math.PI * 2);
		pincel.fillStyle = foguete.cor;
		pincel.fill();
	});
}

function desenharParticulas() {
	particulas.forEach((particula) => {
		pincel.globalAlpha = particula.vida;
		pincel.beginPath();
		pincel.arc(particula.x, particula.y, particula.tamanho, 0, Math.PI * 2);
		pincel.fillStyle = particula.cor;
		pincel.fill();
	});

	// Volta a opacidade normal para os proximos desenhos.
	pincel.globalAlpha = 1;
}

function desenharAlvo() {
	// Mostra discretamente onde o clique vai criar a explosao.
	pincel.beginPath();
	pincel.arc(alvo.x, alvo.y, 8, 0, Math.PI * 2);
	pincel.strokeStyle = 'rgba(255, 255, 255, 0.6)';
	pincel.stroke();
}

function animar() {
	// Limpa a tela e pinta o fundo escuro.
	pincel.fillStyle = 'rgba(5, 10, 25, 0.25)';
	pincel.fillRect(0, 0, tela.width, tela.height);

	atualizarFoguetes();
	atualizarParticulas();
	desenharFoguetes();
	desenharParticulas();
	desenharAlvo();

	// Continua a animacao no proximo quadro.
	requestAnimationFrame(animar);
}

// Move o alvo junto com o mouse.
tela.addEventListener('mousemove', (evento) => {
	alvo.x = evento.clientX;
	alvo.y = Math.max(50, evento.clientY);
});

// Cria um foguete ao clicar na tela.
tela.addEventListener('click', () => {
	criarFoguete(alvo.x, alvo.y);
});

// Ajusta o canvas quando a janela muda de tamanho.
window.addEventListener('resize', ajustarTamanhoDaTela);

ajustarTamanhoDaTela();
animar();

