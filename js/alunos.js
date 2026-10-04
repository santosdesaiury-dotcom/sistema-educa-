import { alunos as alunosIniciais } from "../dados/listagem-alunos.js";

function getLista() {
  const salvo = localStorage.getItem('alunos');
  if (salvo) {
    return JSON.parse(salvo);
  }
  return [...alunosIniciais]; 
}

export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const listaAtual = getLista();
      const existe = listaAtual.find(a => a.cpf === aluno.cpf);
      if (existe) {
        reject("CPF já cadastrado");
        return;
      }
      listaAtual.push(aluno);
      localStorage.setItem('alunos', JSON.stringify(listaAtual)); 
      console.log("Lista atual:", listaAtual.length);
      resolve("Aluno cadastrado com sucesso!");
    }, 500);
  });
}

// - Função para listar todos os alunos
export function listarTodosAlunos() {
  return getLista();
}