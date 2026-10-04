import { listarCursos } from "../js/cursos.js";
import { listarTodosAlunos } from "../js/alunos.js";

const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));


if (!usuarioLogado) {
  window.location.href = "../login/login.html";
}


const userNameEl = document.getElementById("userName");
if (userNameEl && usuarioLogado) {
  userNameEl.textContent = `Bem-vindo(a), ${usuarioLogado.nome}`;
}


const cardsEl = document.getElementById("cards");
const feedbackEl = document.getElementById("feedback");
const totalAlunosEl = document.getElementById("total-alunos");
const totalCursosEl = document.getElementById("total-cursos");

listarCursos(usuarioLogado)
  .then((cursos) => {
    
    if (totalCursosEl) {
      totalCursosEl.innerText = cursos.length;
    }

   
    try {
      const todosAlunos = listarTodosAlunos();
      if (totalAlunosEl) {
        totalAlunosEl.innerText = todosAlunos.length;
      }
    } catch (e) {
      
      const salvos = JSON.parse(localStorage.getItem('alunos') || 'null');
      if (totalAlunosEl) {
        totalAlunosEl.innerText = salvos ? salvos.length : 0;
      }
    }

    if (cursos.length === 0) {
      cardsEl.innerHTML = "<p>Nenhum curso vinculado.</p>";
      return;
    }
    
    cardsEl.innerHTML = "";
    cursos.forEach((curso) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${curso.nome}</h3>
        <p><strong>Início:</strong> ${curso.dataInicio}</p>
        <p><strong>Fim:</strong> ${curso.dataFim}</p>
      `;
      cardsEl.appendChild(div);
    });
  })
  .catch((erro) => {
    if (feedbackEl) {
      feedbackEl.textContent = erro;
      feedbackEl.className = "feedback error";
    }
  });


document.getElementById("linkCursos")?.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Funcionalidade em construção... ");
});


document.getElementById("btnSair")?.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "../login/login.html";
});