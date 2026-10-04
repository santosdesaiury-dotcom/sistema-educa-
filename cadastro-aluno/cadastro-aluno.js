
import { Aluno } from "../js/Aluno.js"; 
import { cadastrarAluno } from "../js/alunos.js"; 


const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
if (!usuario) {
  window.location.href = '../login/login.html';
}

document.getElementById('userName').textContent = usuario.nome;
document.getElementById('btnSair').addEventListener('click', () => {
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = '../login/login.html';
});


const cepInput = document.getElementById('cep');
cepInput.addEventListener('blur', async () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      document.getElementById('logradouro').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('estado').value = data.uf || '';
    }
  } catch (e) {
    console.error("Erro ViaCEP", e);
  }
});

document.getElementById('formAluno').addEventListener('submit', (e) => {
  e.preventDefault();
  const feedback = document.getElementById('feedback');

  const nome = document.getElementById('nome').value.trim();
  const genero = document.getElementById('genero').value;
  const dataNasc = document.getElementById('dataNasc').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();
  const logradouro = document.getElementById('logradouro').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const complemento = document.getElementById('complemento').value.trim();
  const bairro = document.getElementById('bairro').value.trim();


  if (nome.length < 4 || nome.length > 80) {
    feedback.textContent = "Nome deve ter de 4 a 80 caracteres";
    feedback.className = "feedback error"; return;
  }
  if (!genero) {
    feedback.textContent = "Gênero é obrigatório";
    feedback.className = "feedback error"; return;
  }
  if (!moment(dataNasc, "DD/MM/YYYY", true).isValid()) {
    feedback.textContent = "Data inválida. Use DD/MM/YYYY";
    feedback.className = "feedback error"; return;
  }
  const dt = moment(dataNasc, "DD/MM/YYYY");
  if (dt.isBefore(moment("01/01/1900", "DD/MM/YYYY")) || dt.isAfter(moment())) {
    feedback.textContent = "Data deve ser maior que 01/01/1900 e menor que hoje";
    feedback.className = "feedback error"; return;
  }
  if (!/^\d+$/.test(cpf)) {
    feedback.textContent = "CPF deve conter apenas números";
    feedback.className = "feedback error"; return;
  }
  if (!/^\d+$/.test(telefone)) {
    feedback.textContent = "Telefone deve conter apenas números";
    feedback.className = "feedback error"; return;
  }
  if (!/^\d+$/.test(cep)) {
    feedback.textContent = "CEP deve conter apenas números";
    feedback.className = "feedback error"; return;
  }
  if (!/^\d+$/.test(numero)) {
    feedback.textContent = "Número deve conter apenas números";
    feedback.className = "feedback error"; return;
  }
  if (!cidade || !estado || !logradouro || !bairro || !email) {
    feedback.textContent = "Preencha todos os campos obrigatórios (*)";
    feedback.className = "feedback error"; return;
  }


  const novo = new Aluno({
    nomeCompleto: nome, genero, dataNascimento: dataNasc, cpf, telefone, email,
    cep, cidade, estado, logradouro, numero, complemento, bairro
  });


  cadastrarAluno(novo)
    .then(msg => {
      feedback.textContent = msg;
      feedback.className = "feedback success";
      e.target.reset();
    })
    .catch(err => {
      feedback.textContent = err;
      feedback.className = "feedback error";
    });
});