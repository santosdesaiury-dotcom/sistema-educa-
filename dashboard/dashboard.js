import { listarCursos } from "../js/cursos.js";

const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

//- se não tiver logado, volta pro login
if (!usuarioLogado) {
  window.location.href = "../login/login.html";
}

// - mostra nome
const userNameEl = document.getElementById("userName");
if (userNameEl && usuarioLogado) {
  userNameEl.textContent = `Bem-vindo(a), ${usuarioLogado.nome}`;
}

// - lista cursos
const cardsEl = document.getElementById("cards");
const feedbackEl = document.getElementById("feedback");

listarCursos(usuarioLogado)
  .then((cursos) => {
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
    feedbackEl.textContent = erro;
    feedbackEl.className = "feedback error";
  });

// - Cursos em construção
document.getElementById("linkCursos")?.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Funcionalidade em construção... ");
});

// Logout
document.getElementById("btnSair")?.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "../login/login.html";
});
