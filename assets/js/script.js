
//TELA2

let finalizarQuiz = 0;
const TIME_2S = 2 * 1000;
let verificarRespostas;


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

    let procuraResposta = document.querySelectorAll(".opacidade-white > .verificacao");
    let trocarCor = document.querySelectorAll(".opacidade-white > p");
    for(let i = 0; i < procuraResposta.length; i++){
        if(procuraResposta[i].innerHTML === "true"){
            trocarCor[i].classList.add("verde");
        }else {
            trocarCor[i].classList.add("vermelho");
        }
    }
    console.log(trocarCor)






    setTimeout(scrollar, TIME_2S);
    mostrarResultado();
}

function mostrarResultado (){
    if(finalizarQuiz === verificarRespostas){
    document.querySelector(".resultado-quiz").classList.remove("escondido");
    document.querySelector(".botao-home").classList.add("escondido");
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

function voltarHome () {
    document.querySelector(".quiz-top-bar").classList.add("escondido");
    document.querySelector(".tela2").classList.add("escondido");
    document.querySelector(".tela1").classList.remove("escondido");
}

//TELA2


//buscar quiz

function buscarQuizzId () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/1");
    promise.then(renderizarQuizz);
}

function renderizarQuizz (elemento) {
    let topBar = document.querySelector(".quiz-top-bar");
    topBar.innerHTML = `
        <img class="" src="${elemento.data.image}" alt="">
        <div class="sobreporImagem "></div>
        <p>${elemento.data.title}</p>
    `;
    renderizarQuizzCorpo(elemento);
}

function renderizarQuizzCorpo (elemento) {
    let corpoQuizz = document.querySelector(".container-quiz");
    verificarRespostas = elemento.data.questions.length;
    for(let i = 0; i < verificarRespostas; i++){
        corpoQuizz.innerHTML += `
            <div class="espacamento">
                <div class="quiz-top" style="background-color:${elemento.data.questions[i].color};">
                    <p>${elemento.data.questions[i].title}</p>
                </div>
                <div class="alter-quiz">
                  
                </div>
                <div class="scrollar-aqui"></div>
            </div>
        `;
    }
    renderizarQuizzPerguntas(elemento);
}

function embaralhar() { 
	return Math.random() - 0.5; 
}

function renderizarQuizzPerguntas (elemento) {
    let cont = 0;
    let perguntasQuiz = document.querySelectorAll(".alter-quiz");
    while(cont < perguntasQuiz.length){
        const arrPerguntas = elemento.data.questions[cont].answers;
        arrPerguntas.sort(embaralhar);
        console.log(arrPerguntas)
        for(let i = 0; i < elemento.data.questions[i].answers.length; i++) {
            perguntasQuiz[cont].innerHTML += `
                <div onclick="selecionarQuiz(this)">
                    <img src="${arrPerguntas[i].image}" alt="">
                    <p>${arrPerguntas[i].text}</p>
                    <div class="verificacao">${arrPerguntas[i].isCorrectAnswer}</div>
                </div>
            `;
        }
        cont ++;
    }
}

buscarQuizzId ();