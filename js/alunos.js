import { alunos } from "../dados/listagem-alunos.js";

export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existe = alunos.find(a => a.cpf === aluno.cpf);
      if (existe) {
        reject("CPF já cadastrado");
        return;
      }
      alunos.push(aluno);
      console.log("Lista atual:", alunos);
      resolve("Aluno cadastrado com sucesso!");
    }, 500);
  });
}