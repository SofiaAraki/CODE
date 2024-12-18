const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Lista de cartas
const characters = [
    'css',
    'html',
    'javascript',
    'php',
    'python',
    'react',
    'sql',
    'csharp',
    'ruby',
    'swift',
];

// Função utilitária para criar elementos com classe
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Variáveis para controle do jogo
let firstCard = '';
let secondCard = '';
let loop;

// Função para verificar o fim do jogo
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === characters.length * 2) {
        clearInterval(loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos.`);
        askPlayAgain();
    }
};

// Função para perguntar se o jogador deseja jogar novamente
const askPlayAgain = () => {
    const playAgain = window.confirm('Deseja jogar novamente?');

    if (playAgain) {
        window.location.reload();
    } else {
        window.location.href = '../index.html';
    }
};

// Função para verificar se as cartas selecionadas são iguais
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        resetCards();
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            resetCards();
        }, 500);
    }
};

// Função para resetar as cartas selecionadas
const resetCards = () => {
    firstCard = '';
    secondCard = '';
};

// Função para revelar uma carta
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) return;

    if (!firstCard) {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (!secondCard) {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
};

// Função para criar uma carta
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.setAttribute('data-character', character);

    card.addEventListener('click', revealCard);

    return card;
};

// Função para carregar o jogo
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

// Função para iniciar o contador de tempo
const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

// Configuração inicial do jogo
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player') || 'Jogador';
    timer.innerHTML = '0';
    startTimer();
    loadGame();
};
