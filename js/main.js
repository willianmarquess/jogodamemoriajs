//é chamado quando o site começa a carregar
(() => {
    start();
})();

var numeros;
var imagens;
var contClick = 0;
var cardAtual;
var cardAnterior;
var pontos = 0;

function start() {

    numeros = sorteadorImagens();
    imagens = document.getElementsByClassName("img-back");

    preenchedorImagens(numeros, imagens);

    startGame();

}

function sorteadorImagens() {
    //criando vetor de numeros
    var numeros = [];

    while (numeros.length < 10) {
        var aleatorio = Math.floor(Math.random() * 10) + 1;
        //verifica se o valor sorteado ja existe no vetor
        if (numeros.indexOf(aleatorio) == -1) {
            //joga o valor aleatorio dentro do vetor
            numeros.push(aleatorio);
        }
    }

    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] > 5) {
            numeros[i] -= 5;
        }
    }

    console.log(numeros);
    return numeros;
}

function preenchedorImagens(numeros, imagens) {
    for (var i = 0; i < imagens.length; i++) {
        imagens[i].src = 'img/card' + numeros[i] + '.jpg';
    }
}

function startGame() {
    var cartas = document.getElementsByClassName("card-conteudo");
    for (var i = 0; i < cartas.length; i++) {
        cartas[i].style.transform = 'rotateY(-180deg)';
    }

    setTimeout(() => {
            for (var i = 0; i < cartas.length; i++) {
                cartas[i].style.transform = 'none';
            }
        },
        2000);
}

function viraCarta(numeroCarta) {
    if (contClick < 2) {
        contClick++;
        cardAtual =
            document.getElementsByClassName("card-conteudo")[numeroCarta];
        cardAtual.style.transform = 'rotateY(-180deg)';
        cardAnterior = (contClick === 1) ? cardAtual : cardAnterior;

        if (contClick === 2) {
            var ganhou = verificarIgualdade(cardAtual, cardAnterior);

            if (!ganhou) {
                setTimeout(() => {
                    cardAtual.style.transform = 'none';
                    cardAnterior.style.transform = 'none';
                    resetCartas();
                }, 800);
            } else {
                resetCartas();
                pontos++;
            }

            if (pontos === 5) {
                alert('Você é fera!!');
            }

        }

    }
}

function verificarIgualdade(cardAtual, cardAnterior) {
    var imagemCardAtual = cardAtual.lastElementChild.firstElementChild;
    var imagemCardAnterior = cardAnterior.lastElementChild.firstElementChild;


    if (imagemCardAnterior.src === imagemCardAtual.src) {
        cardAnterior.parentNode.onclick = '';
        cardAtual.parentNode.onclick = '';
        return true;
    } else {
        return false;
    }

}

function resetCartas() {
    cardAtual = null;
    cardAnterior = null;
    contClick = 0;
}