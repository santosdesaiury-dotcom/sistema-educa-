import { listarTodosAlunos } from "../js/alunos.js";

const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
if (!usuarioLogado) window.location.href = "../login/login.html";

const form = document.getElementById("formAluno");
const feedback = document.getElementById("feedback");

function renderLista() {
  const lista = listarTodosAlunos();
  const tbody = document.getElementById("listaAlunos");
  const qtd = document.getElementById("qtdLista");
  if(qtd) qtd.innerText = lista.length;
  if(!tbody) return;
  if(lista.length === 0){
    tbody.innerHTML = `<tr><td colspan="4" style="padding:15px; text-align:center;">Nenhum aluno ainda</td></tr>`;
    return;
  }
  tbody.innerHTML = lista.map(a => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd;">${a.nomeCompleto || a.nome}</td>
      <td style="padding:8px; border:1px solid #ddd;">${a.cpf}</td>
      <td style="padding:8px; border:1px solid #ddd;">${a.email}</td>
      <td style="padding:8px; border:1px solid #ddd;">${a.cidade}</td>
    </tr>`).join('');
}
renderLista();

document.getElementById("cep")?.addEventListener("blur", async (e) => {
  const cep = e.target.value.replace(/\D/g,"");
  if(cep.length===8){
    try{
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const d = await r.json();
      if(!d.erro){
        document.getElementById("logradouro").value = d.logradouro;
        document.getElementById("bairro").value = d.bairro;
        document.getElementById("cidade").value = d.localidade;
        document.getElementById("estado").value = d.uf;
      }
    }catch{}
  }
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Clicou em salvar - JS carregou!");

  const aluno = {
    nomeCompleto: document.getElementById("nomeCompleto").value.trim(),
    genero: document.getElementById("genero").value,
    dataNascimento: document.getElementById("dataNascimento").value,
    cpf: document.getElementById("cpf").value.replace(/\D/g,""),
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    cep: document.getElementById("cep").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    logradouro: document.getElementById("logradouro").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    id: Date.now()
  };

  if(aluno.nomeCompleto.length < 4 || aluno.nomeCompleto.length > 80){
    feedback.textContent = "Nome deve ter 4 a 80 caracteres";
    feedback.className = "feedback error";
    return;
  }
  if(aluno.cpf.length !== 11){
    feedback.textContent = "CPF deve ter 11 números";
    feedback.className = "feedback error";
    return;
  }

  try {
    const listaAtual = listarTodosAlunos();
    listaAtual.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(listaAtual));
    
    feedback.textContent = "Aluno cadastrado com sucesso!";
    feedback.className = "feedback success";
    form.reset();
    renderLista();
  } catch(err){
    feedback.textContent = "Erro: " + err;
    feedback.className = "feedback error";
  }
});