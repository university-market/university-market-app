export interface RegisterModel {

  nome: string;
  email: string;
  dataNascimento: Date;
  senha: string;
  cursoId: number;
  instituicaoId?: number;
}