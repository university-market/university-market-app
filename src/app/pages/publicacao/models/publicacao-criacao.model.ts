export interface PublicacaoCriacaoModel {
  publicacaoId?: number;
  titulo: string;
  descricao: string;
  valor: number;
  tags?: string;
  especificacoesTecnicas?: string;
}