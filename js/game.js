//
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// cria uma lista de cartas
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

//
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}   

//let só pode ser acessado dentro do escopo onde foi criado
//define variaveis para verificar as cartas selecionadas
let firstCard = '';
let secondCard = '';

//cria uma função para verificar se o jogo terminou
const checkEndGame = () => {

    const disabledCards = document.querySelectorAll('.disabled-card');
    // verifica se o número de cartas desabilitadas é igual ao número de cartas totais
    // isso indica o fim do jogo, portanto para o tempo e exibe uma mensagem de parabéns
    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
        window.confirm('Deseja jogar novamente?');
        window.location.reload();
    }
}

//cria uma função para verificar se as cartas selecionadas são iguais
const checkCards = () => {

    // cria uma variável para verificar se as cartas selecionadas são iguais
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    // verifica se as cartas selecionadas são iguais
    if (firstCharacter === secondCharacter) {
        
        // dasabilita as cartas selecionadas
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';
    
    // caso as cartas selecionadas não sejam iguais, remove a classe 'reveal-card' das cartas selecionadas
    // ou seja, vira elas novamente
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');            

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

// cria uma função para revelar as cartas selecionadas
const revealCard = ({ target }) => {
    
    // verifica se a carta selecionada já está revelada
    if (target.parentNode.className.includes('reveal-card')) {
      return;
    }
    // verifica se já foi selecionada uma carta
    if (firstCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
    
    // verifica se já foi selecionada a segunda carta
    } else if (secondCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
    // chama a função para verificar se as cartas selecionadas são iguais
      checkCards(); 
    }
}

// cria uma função para criar as cartas
const createCard = (character) => {

    // 
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('../images/${character}.png')`;
    
    // adiciona um nó filho à carta
    card.appendChild(front);
    card.appendChild(back);
    
    // adiciona um evento de clique à carta
    card.addEventListener('click', revealCard);

    //
    card.setAttribute('data-character', character)
  
    return card;
}

// cria uma função para carregar o jogo
const loadGame = () => {

    // cria um array para duplicar as cartas
    const duplicateCharacters = [...characters, ...characters];
    
    // cria um array ordenado aleatoriamente
    // serve para distribuir as cartas aleatoriamente no tabuleiro
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
    // 
    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
}

// contador de tempo
const startTimer = () => {

    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
      checkEndGame();
    }, 1000);
  
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame(); 
}
