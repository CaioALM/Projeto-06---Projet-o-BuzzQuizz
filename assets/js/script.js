
//TELA2

let finalizarQuiz = 0;
const TIME_2S = 2 * 1000;


function selecionarQuiz (elemento) {
    finalizarQuiz ++;
    elemento.classList.add("selecionado");
    elemento.parentNode.classList.add("alter-quizOk");
    elemento.parentNode.classList.remove("alter-quiz");
    let selecionado = document.querySelectorAll(".alter-quizOk>div");
    document.querySelector(".scrollar-aqui").classList.remove("scrollar-aqui");

    for(let i = 0; i < selecionado.length; i++){
        selecionado[i].classList.add("opacidade-white");
        selecionado[i].removeAttribute("onclick");
    }
    setTimeout(scrollar, TIME_2S);
    mostrarResultado();
}

function mostrarResultado (){
    //alterar 2 pela quantidade de quiz que o usuario colocar
    if(finalizarQuiz === 2){
    document.querySelector(".resultado-quiz").classList.remove("escondido");
    document.querySelector(".botao-home").classList.add("escondido")
    }
}

function scrollar () {
    const elemento = document.querySelector(".scrollar-aqui");
    elemento.scrollIntoView();
}

function resetarPaginaAtual (){
    document.location.reload(true);
    const elemento = document.querySelector(".sobreporImagem");
    elemento.scrollIntoView();
}

//TELA2
