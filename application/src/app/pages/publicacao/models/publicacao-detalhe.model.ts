export interface PublicacaoDetalheModel {
    publicacaoId: number;
    titulo: string;
    descricao: string;
    valor: number;
    tags?: string;
    detalhesTecnicos?: string;
    pathImagem?: string;
    dataHoraCriacao: Date;
}