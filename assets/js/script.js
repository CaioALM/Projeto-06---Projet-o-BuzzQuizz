// TELA1

function criarQuizz() {
    let elemento = document.querySelector(".tela1")
    elemento.classList.add("escondido")
    let element = document.querySelector(".tela3")
    element.classList.remove("escondido")

}
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
let verificaNiveis = 2;
let questions = [];
let answers = [];
let levels = [];

function verificarInput3a() {
    let teste;
    let teste1;
    let teste2;
    let teste3;

    let verificaTitulo = document.querySelector(".titulo-quiz").value;
    if (verificaTitulo.length < 20 || verificaTitulo.length > 65){
       document.querySelector(".validacaoTitulo").classList.remove("escondido");
       document.querySelector(".titulo-quiz").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoTitulo").classList.add("escondido");
        document.querySelector(".titulo-quiz").classList.remove("inputErro");
        teste = true;
        arrQuizz.title = verificaTitulo;
    }  

    let verificaURL = document.querySelector(".url-quiz").value;
    let urlOK = validarURL(verificaURL);
    if (urlOK === false){
       document.querySelector(".validacaoURL").classList.remove("escondido");
       document.querySelector(".url-quiz").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoURL").classList.add("escondido");
        document.querySelector(".url-quiz").classList.remove("inputErro");
        teste1 = true;
        arrQuizz.image = verificaURL;
    }

    verificaPergunta = document.querySelector(".quantidadePerguntas").value;
    if (Number(verificaPergunta) < 3 || isNaN(verificaPergunta)){
       document.querySelector(".validacaoPerguntas").classList.remove("escondido");
       document.querySelector(".quantidadePerguntas").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoPerguntas").classList.add("escondido");
        document.querySelector(".quantidadePerguntas").classList.remove("inputErro");
        teste2 = true;
    }

    verificaNiveis = document.querySelector(".quantidadeNiveis").value;
    if (Number(verificaNiveis) < 2 || isNaN(verificaNiveis)){
       document.querySelector(".validacaoNiveis").classList.remove("escondido");
       document.querySelector(".quantidadeNiveis").classList.add("inputErro");
    }else {
        document.querySelector(".validacaoNiveis").classList.add("escondido");
        document.querySelector(".quantidadeNiveis").classList.remove("inputErro");
        teste3 = true;
    }

    if (teste === true && teste1 === true && teste2 === true && teste3 === true){
        document.querySelector(".tela3").classList.add("escondido");
        document.querySelector(".tela3-2").classList.remove("escondido");
        renderizarPerguntas();
    }else {
        alert("Preencha os dados corretamente");
    }

    console.log(arrQuizz)
}

function validarURL (elemento){
    let re = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
    return re.test(elemento);
}

function validarCor (elemento) {
    let re = /^#[0-9a-f]{6}/i;
    return re.test(elemento);
}


function renderizarPerguntas () {
    for(let i = 2; i <= verificaPergunta; i++){
        let renderizaPergunta = document.querySelector(".rederizarPerguntas");
        renderizaPergunta.innerHTML += `
        <div class="alternar">
        <div class="tituloPergunta" onclick="alternarPerguntas(this)">
            <p>Pergunta ${i}</p>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="inputPerguntas escondido">
            <p class="dentroPergunta">Pergunta ${i}</p>
            <input type="text" placeholder="Texto da pergunta" class="texto${i}-pergunta">
            <p class="validacao${i}Texto erroP escondido">Texto deve conter no mínimo 20 letras</p>
            <input type="text" placeholder="Cor de fundo da pergunta" class="cor${i}-pergunta">
            <p class="validacao${i}Cor erroP escondido">Cor deve ser no formato hexadecimal Ex: #EC362D</p>
            <div class="inputUrlEspac"></div>

            <p class="dentroPergunta">Resposta correta</p>
            <input type="text" placeholder="Resposta correta" class="reposta${i}-certa">
            <p class="validacao${i}Certo erroP escondido">Texto não pode estar vazio</p>
            <input type="text" placeholder="URL da imagem" class="urlResp${i}Certa">
            <p class="validacao${i}URLCerto erroP escondido">O valor informado não é uma URL válida</p>
            <div class="inputUrlEspac"></div>

            <p class="dentroPergunta">Resposta incorreta</p>
            <input type="text" placeholder="Resposta incorreta 1" class="resposta${i}-erro1">
            <p class="validacao${i}Erro1 erroP escondido">Deve conter pelo menos 1 resposta incorreta</p>
            <input type="text" placeholder="URL da imagem 1" class="urlResp${i}Erro1">
            <p class="validacao${i}URLErro1 erroP escondido">O valor informado não é uma URL válida</p>
            <div class="inputUrlEspac"></div>

            <input type="text" placeholder="Resposta incorreta 2" class="resposta${i}-erro2">

            <input type="text" placeholder="URL da imagem 2" class="urlResp${i}Erro2">
            <p class="validacao${i}URLErro2 erroP escondido">O valor informado não é uma URL válida</p>
            <div class="inputUrlEspac"></div>

            <input type="text" placeholder="Resposta incorreta 3" class="resposta${i}-erro3">

            <input type="text" placeholder="URL da imagem 3" class="urlResp${i}Erro3">
            <p class="validacao${i}URLErro3 erroP escondido">O valor informado não é uma URL válida</p>
        </div>
        </div>
        `;
    }

}

function verificarInput3b () {
    let teste;
    let teste1;
    let teste2;
    let teste3;
    let teste4;
    let teste5;
    let teste6;
    let teste7;
    let teste8;
    let teste9;
    let cont = 0;

    for(let i = 1; i <= verificaPergunta; i++){

    let verificaTexto = document.querySelector(`.texto${i}-pergunta`).value;
    if (verificaTexto.length < 20){
       document.querySelector(`.validacao${i}Texto`).classList.remove("escondido");
       document.querySelector(`.texto${i}-pergunta`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}Texto`).classList.add("escondido");
        document.querySelector(`.texto${i}-pergunta`).classList.remove("inputErro");
        teste = true;
    } 

    let verificaCor = document.querySelector(`.cor${i}-pergunta`).value;
    let corOK = validarCor(verificaCor);
    if (corOK === false){
       document.querySelector(`.validacao${i}Cor`).classList.remove("escondido");
       document.querySelector(`.cor${i}-pergunta`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}Cor`).classList.add("escondido");
        document.querySelector(`.cor${i}-pergunta`).classList.remove("inputErro");
        teste1 = true;
    }

    let verificaRespCerta = document.querySelector(`.reposta${i}-certa`).value;
    if (verificaRespCerta.length < 1){
       document.querySelector(`.validacao${i}Certo`).classList.remove("escondido");
       document.querySelector(`.reposta${i}-certa`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}Certo`).classList.add("escondido");
        document.querySelector(`.reposta${i}-certa`).classList.remove("inputErro");
        teste2 = true;
    }

    let verificaURLCerto = document.querySelector(`.urlResp${i}Certa`).value;
    let urlOK = validarURL(verificaURLCerto);
    if (urlOK === false){
       document.querySelector(`.validacao${i}URLCerto`).classList.remove("escondido");
       document.querySelector(`.urlResp${i}Certa`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}URLCerto`).classList.add("escondido");
        document.querySelector(`.urlResp${i}Certa`).classList.remove("inputErro");
        teste3 = true;
    }

    let verificaRespErro1 = document.querySelector(`.resposta${i}-erro1`).value;
    if (verificaRespErro1.length < 1){
       document.querySelector(`.validacao${i}Erro1`).classList.remove("escondido");
       document.querySelector(`.resposta${i}-erro1`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}Erro1`).classList.add("escondido");
        document.querySelector(`.resposta${i}-erro1`).classList.remove("inputErro");
        teste4 = true;
    }

    let verificaURLErro1 = document.querySelector(`.urlResp${i}Erro1`).value;
    let urlErro1OK = validarURL(verificaURLErro1);
    if (urlErro1OK === false){
       document.querySelector(`.validacao${i}URLErro1`).classList.remove("escondido");
       document.querySelector(`.urlResp${i}Erro1`).classList.add("inputErro");
    }else {
        document.querySelector(`.validacao${i}URLErro1`).classList.add("escondido");
        document.querySelector(`.urlResp${i}Erro1`).classList.remove("inputErro");
        teste5 = true;
    }

    let verificaRespErro2 = document.querySelector(`.resposta${i}-erro2`).value;
    if (verificaRespErro2.length != 0){
        teste6 = true;
    }

    let verificaURLErro2 = document.querySelector(`.urlResp${i}Erro2`).value;
    let urlErro2OK = validarURL(verificaURLErro2);
    if(verificaURLErro2 != 0) {  
        if (urlErro2OK === false){
            document.querySelector(`.validacao${i}URLErro2`).classList.remove("escondido");
            document.querySelector(`.urlResp${i}Erro2`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}URLErro2`).classList.add("escondido");
            document.querySelector(`.urlResp${i}Erro2`).classList.remove("inputErro");
            teste7 = true;
        }
    }
    let verificaRespErro3 = document.querySelector(`.resposta${i}-erro3`).value;
    if (verificaRespErro3.length != 0){
        teste8 = true;
    }

    let verificaURLErro3 = document.querySelector(`.urlResp${i}Erro3`).value;
    let urlErro3OK = validarURL(verificaURLErro3);
    if(verificaURLErro3 != 0){   
        if (urlErro3OK === false){
            document.querySelector(`.validacao${i}URLErro3`).classList.remove("escondido");
            document.querySelector(`.urlResp${i}Erro3`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}URLErro3`).classList.add("escondido");
            document.querySelector(`.urlResp${i}Erro3`).classList.remove("inputErro");
            teste9 = true;
        }
    }

    if(teste2 === true && teste3 === true && teste4 === true && teste5 === true){
        answers[0] = [{
            text: verificaRespCerta,
            image: verificaURLCerto,
            isCorrectAnswer: true
        },
        {
            text: verificaRespErro1,
            image: verificaURLErro1,
            isCorrectAnswer: false
        },
        ]
    }

    if(teste6 === true && teste7 === true){
        answers[0].push({
            text: verificaRespErro2,
            image: verificaURLErro2,
            isCorrectAnswer: false
        })        
    }

    if(teste8 === true && teste9 === true){
        answers[0].push( {
            text: verificaRespErro3,
            image: verificaURLErro3,
            isCorrectAnswer: false
        });        
    }

    if(teste === true && teste1 === true){
        questions[cont] = [
            {
                title: verificaTexto,
                color: verificaCor,
                answers: answers[0]
            }
        ]
        renderizaNiveis ()
    }
    cont++;
    }
    arrQuizz.questions = questions;

}


function alternarPerguntas (elemento) {
    let checar = elemento.parentNode;
    let temEscondido = document.querySelector(".alternar .tituloPergunta.escondido");
    let teste = document.querySelectorAll(".alternar .inputPerguntas");
    for(let i = 0; i < teste.length; i++){
        teste[i].classList.add("escondido");
    }
    if(temEscondido !== null){
        temEscondido.classList.remove("escondido");
    }
    checar.querySelector(".tituloPergunta").classList.add("escondido");
    checar.querySelector(".inputPerguntas").classList.remove("escondido");

}
renderizaNiveis()
function renderizaNiveis () {
    for(let i = 2; i <= verificaNiveis; i++){
        let renderizaNiveis = document.querySelector(".rederizarNiveis");
        renderizaNiveis.innerHTML += `
        <div class="alternarNiveis">
        <div class="tituloNivel " onclick="alternarNiveis(this)">
          <p>Nível ${i}</p>
          <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="inputNiveis escondido">

          <p class="dentroPergunta">Nível ${i}</p>
          <input type="text" placeholder="Título do nível" class="titulo${i}-nivel">
          <p class="validacao${i}Titulo erroP escondido">Texto deve conter no mínimo 10 letras</p>
          <input type="text" placeholder="% de acerto mínima" class="minimo${i}-pergunta">
          <p class="validacao${i}minimo erroP escondido">Deve ser um número entre 0 e 100</p>
          <input type="text" placeholder="URL da imagem do nível" class="urlNivel${i}">
          <p class="validacao${i}URLNivel erroP escondido">O valor informado não é uma URL válida</p>
          <input type="text" placeholder="Descrição do nível" class="descNivel${i}">
          <p class="validacao${i}DescNivel erroP escondido">Texto deve conter no mínimo 30 letras</p>

        </div>
        </div>
        `;
    }
}

function alternarNiveis (elemento) {
    let checar = elemento.parentNode;
    let temEscondido = document.querySelector(".alternarNiveis .tituloNivel.escondido");
    let teste = document.querySelectorAll(".alternarNiveis .inputNiveis");
    for(let i = 0; i < teste.length; i++){
        teste[i].classList.add("escondido");
    }
    if(temEscondido !== null){
        temEscondido.classList.remove("escondido");
    }
    checar.querySelector(".tituloNivel").classList.add("escondido");
    checar.querySelector(".inputNiveis").classList.remove("escondido");
}

function verificarInput3c () {
    teste = true;
    teste1 = true;
    teste2 = true;
    teste3 = true;
    let arr = [];
    let cont = 0;

    for(let i = 1; i <= verificaNiveis; i++){

        let verificaTexto = document.querySelector(`.titulo${i}-nivel`).value;
        if (verificaTexto.length < 10){
           document.querySelector(`.validacao${i}Titulo`).classList.remove("escondido");
           document.querySelector(`.titulo${i}-nivel`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}Titulo`).classList.add("escondido");
            document.querySelector(`.titulo${i}-nivel`).classList.remove("inputErro");
            teste = true;
        } 

        let verificaMinimo = document.querySelector(`.minimo${i}-pergunta`).value;
        if (verificaMinimo.length < 1 || Number(verificaMinimo) < 0 || Number(verificaMinimo) > 100 || isNaN(verificaMinimo)){
           document.querySelector(`.validacao${i}minimo`).classList.remove("escondido");
           document.querySelector(`.minimo${i}-pergunta`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}minimo`).classList.add("escondido");
            document.querySelector(`.minimo${i}-pergunta`).classList.remove("inputErro");
            teste1 = true;
            arr[cont].push(Number(verificaMinimo));
        }

        let verificaURLNivel1 = document.querySelector(`.urlNivel${i}`).value;
        let urlNivel1OK = validarURL(verificaURLNivel1);
        if (urlNivel1OK === false){
           document.querySelector(`.validacao${i}URLNivel`).classList.remove("escondido");
           document.querySelector(`.urlNivel${i}`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}URLNivel`).classList.add("escondido");
            document.querySelector(`.urlNivel${i}`).classList.remove("inputErro");
            teste2 = true;
        }

        let verificaTextoDesc = document.querySelector(`.descNivel${i}`).value;
        if (verificaTextoDesc.length < 30){
           document.querySelector(`.validacao${i}DescNivel`).classList.remove("escondido");
           document.querySelector(`.descNivel${i}`).classList.add("inputErro");
        }else {
            document.querySelector(`.validacao${i}DescNivel`).classList.add("escondido");
            document.querySelector(`.descNivel${i}`).classList.remove("inputErro");
            teste3 = true;
        } 

        if(teste === true && teste1 === true && teste2 === true && teste3 === true){
            levels[cont] = {
                title: verificaTexto,
                image: verificaURLNivel1,
                text: verificaTextoDesc,
                minValue: verificaMinimo
            }
        }

        cont++;
    }

    let verificaZero = arr.map(elemento => elemento === 0).filter(elemento => elemento === true);
    if(verificaZero.length !== 0){
        arrQuizz.levels = levels;
        //chamar função que finaliza essa tela
    }else {
        alert("Deve existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
    }
}

