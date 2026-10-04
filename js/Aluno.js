export class Aluno {
  constructor(dados) {
    this.id = Date.now();
    this.nomeCompleto = dados.nomeCompleto;
    this.genero = dados.genero;
    this.dataNascimento = dados.dataNascimento;
    this.cpf = dados.cpf;
    this.telefone = dados.telefone;
    this.email = dados.email;
    this.cep = dados.cep;
    this.cidade = dados.cidade;
    this.estado = dados.estado;
    this.logradouro = dados.logradouro;
    this.numero = dados.numero;
    this.complemento = dados.complemento;
    this.bairro = dados.bairro;
  }
}