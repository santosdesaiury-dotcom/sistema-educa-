import { cursos } from "../dados/listagem-cursos.js";

export function listarCursos(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!usuario) {
        reject("Usuário não logado");
        return;
      }
      const meusCursos = cursos.filter(c => c.professorId === usuario.id);
      resolve(meusCursos);
    }, 500);
  });
}