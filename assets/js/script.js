
//TELA2

let finalizarQuiz = 0;
const TIME_2S = 2 * 1000;
let verificarRespostas;
let receberObjeto;


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

    setTimeout(scrollar, TIME_2S);
    mostrarResultado();
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
    receberObjeto = elemento;
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



function mostrarResultado (){
    if(finalizarQuiz === verificarRespostas){
        document.querySelector(".resultado-quiz").classList.remove("escondido");
        document.querySelector(".botao-home").classList.add("escondido");

        let contadorCertos = 0;
    
        let resultado = document.querySelectorAll(".selecionado.opacidade-white > .verificacao");
        for(let i = 0; i < resultado.length; i++){
            if(resultado[i].innerHTML === "true"){
                contadorCertos++;
            }
        }

        let conta = (contadorCertos * 100) / verificarRespostas;
        let arr;
        for(let i = 0; i < receberObjeto.data.levels.length; i++){
            if(conta >= receberObjeto.data.levels[i].minValue){
                arr = receberObjeto.data.levels[i];
            }
        }

        let corpoResultado = document.querySelector(".resultado-quiz");
        corpoResultado.innerHTML = `
            <div class="quiz-top" style="background-color:#434CA0;">
                <p>${Math.round(conta)}% de acerto: ${arr.title}</p>
            </div>
            <div class="resposta-quiz">
                <img src="${arr.image}" alt="">
                <p>${arr.text}</p>
            </div>
            <div class="scrollar-aqui"></div>
            <div class="botoes">
                <div class="botao-reiniciar" onclick="resetarPaginaAtual()">Reiniciar Quizz</div>
                <div class="botao-home" onclick="voltarHome()">Voltar pra home</div>
            </div>
        `;
    }
}

//buscarQuizzId ();

//TELA 3
let arrQuizz = {};
let verificaPergunta;
let verificaNiveis;

function verificarInput3a() {
    let verificaTitulo = document.querySelector(".titulo-quiz").value;
    if (verificaTitulo.length < 20 || verificaTitulo.length > 65){
       document.querySelector(".validacaoTitulo").classList.remove("escondido");
       document.querySelector(".titulo-quiz").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoTitulo").classList.add("escondido");
        document.querySelector(".titulo-quiz").classList.remove("inputErro");
        let teste = true;
        arrQuizz.title = verificaTitulo;
    }  

    let verificaURL = document.querySelector(".url-quiz").value;
    let teste = validarURL(verificaURL);
    if (teste === false){
       document.querySelector(".validacaoURL").classList.remove("escondido");
       document.querySelector(".url-quiz").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoURL").classList.add("escondido");
        document.querySelector(".url-quiz").classList.remove("inputErro");
        let teste1 = true;
        arrQuizz.image = verificaURL;
    }

    verificaPergunta = document.querySelector(".quantidadePerguntas").value;
    if (Number(verificaPergunta) < 3 || isNaN(verificaPergunta)){
       document.querySelector(".validacaoPerguntas").classList.remove("escondido");
       document.querySelector(".quantidadePerguntas").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoPerguntas").classList.add("escondido");
        document.querySelector(".quantidadePerguntas").classList.remove("inputErro");
        let teste2 = true;
    }

    verificaNiveis = document.querySelector(".quantidadeNiveis").value;
    if (Number(verificaNiveis) < 2 || isNaN(verificaNiveis)){
       document.querySelector(".validacaoNiveis").classList.remove("escondido");
       document.querySelector(".quantidadeNiveis").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoNiveis").classList.add("escondido");
        document.querySelector(".quantidadeNiveis").classList.remove("inputErro");
        let teste3 = true;
    }

    console.log(arrQuizz)
}

function validarURL (elemento){
    let re = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
    return re.test(elemento);
}