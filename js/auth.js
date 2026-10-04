import { usuarios } from "../dados/listagem-usuarios.js";

export function login(email, senha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usuarios.find(u => u.email === email && u.senha === senha);
      if (user) {
        resolve(user);
      } else {
        reject("Usuário ou senha inválidos");
      }
    }, 500);
  });
}