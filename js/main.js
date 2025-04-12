document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCriarSessao");
    const sessoesContainer = document.querySelector(".hero");

    const btnQuiz = document.getElementById("btnQuiz");
    if (btnQuiz) {
        btnQuiz.addEventListener("click", () => {
            const index = btnQuiz.dataset.index;
            localStorage.setItem("sessaoAleatoria", index);
            iniciarAleatorizacao();
        });
    }

    if (form) {
        form.addEventListener("submit", criarSessao);
    }

    if (sessoesContainer && window.location.pathname.includes("sessoes.html")) {
        exibirSessoes();
    }

    if (window.location.pathname.includes("aleatorizar-sessao.html")) {
        iniciarQuizAleatorio();
    }
});

// Função para criar nova sessão
function criarSessao(e) {
    e.preventDefault();

    const form = e.target;
    const nome = form.querySelector('input[name="name"]').value;
    const question = form.querySelector('input[name="question"]').value;
    const answer = form.querySelector('input[name="answer"]').value;

    const novaSessao = {
        nome,
        questions: [
            { question, answer },
        ],
    };

    const sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
    sessoes.push(novaSessao);
    localStorage.setItem("sessoes", JSON.stringify(sessoes));

    alert("Sessão criada com sucesso!");
    form.reset();
}

// Função para exibir as sessões já existentes
function exibirSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
    const container = document.querySelector(".hero");

    sessoes.forEach((sessao, index) => {
        const card = criarCard(sessao, index);
        container.appendChild(card);
    });
}

// Função para criar o card de cada sessão
function criarCard(sessao, index) {
    const div = document.createElement("div");
    div.className = "w-lg bg-gray-800 pt-12 p-4";

    div.innerHTML = `
      <div data-aos-delay="300" class="rounded-xl bg-white p-6 text-center shadow-xl flex flex-col items-center">
        <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
                                <svg viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white">
                        <path
                          d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
                          fill="white"></path>
                      </svg>
        </div>
        <h1 class="text-darken mb-6 text-xl font-medium">${sessao.nome}</h1>
        <div class="flex gap-4">
            <a onclick="verSessao(${index})" class="bg-sky-500 hover:bg-sky-700 rounded-lg px-4 py-2 text-white cursor-pointer">Ver</a>
            <a onclick="adicionarConteudo(${index})" class="bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2 text-white cursor-pointer">Adicionar</a>
            <a onclick="deletarSessao(${index})" class="bg-red-500 hover:bg-red-700 rounded-lg px-4 py-2 text-white cursor-pointer">Deletar</a>
            <a href="./aleatorizar-sessao.html" class="bg-yellow-500 hover:bg-yellow-700 rounded-lg px-4 py-2 text-white cursor-pointer">Quiz</a>
        </div>   
      </div>
    `;

    return div;
}

function adicionarConteudo(index) {
    const sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
    const sessao = sessoes[index];

    const novaPergunta = prompt("Digite a nova pergunta:");
    if (!novaPergunta) return;

    const novaResposta = prompt("Digite a resposta para essa pergunta:");
    if (!novaResposta) return;

    sessao.questions.push({
        question: novaPergunta,
        answer: novaResposta
    });

    sessoes[index] = sessao;
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    alert("Pergunta adicionada com sucesso!");
    location.reload(); // atualiza para exibir novo conteúdo (pode melhorar isso depois com renderização dinâmica)
}

function verSessao(index) {
    const sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
    const sessao = sessoes[index]

    let mensagem = `Sessão ${sessao.nome}\n`

    sessao.questions.forEach((q,i) => {
        mensagem += `\n${i + 1}ª Pergunta: ${q.question}\n${i + 1}ª Resposta: ${q.answer}\n`
    })

    alert(mensagem)
}

function deletarSessao(index) {
    const sessoes = JSON.parse(localStorage.getItem("sessoes") || "[]");
    sessoes.splice(index, 1);
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    location.reload();
}
