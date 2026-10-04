import { login } from "../js/auth.js";

const form = document.getElementById("formLogin");
const feedback = document.getElementById("feedback");


document.getElementById("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  window.alert("Funcionalidade em construção");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    feedback.textContent = "Preencha e-mail e senha";
    feedback.className = "feedback error";
    return;
  }

  login(email, senha)
    .then((user) => {
      
      sessionStorage.setItem("usuarioLogado", JSON.stringify(user));
      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((msg) => {
      feedback.textContent = msg;
      feedback.className = "feedback error";
    });
});
