//cria uma função que recupera os valores
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

//cria uma função para habilitar o botão de 'Play' apos escrever o nome
const validateInput = ({ target }) => {
    if (target.value.length >= 3) {
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

//cria uma função para enviar o nome do jogador para o localStorage
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}

// chama a função para conferir o nome inserido
input.addEventListener('input', validateInput);
// chama a funçao para enviar o nome do jogador
form.addEventListener('submit', handleSubmit);