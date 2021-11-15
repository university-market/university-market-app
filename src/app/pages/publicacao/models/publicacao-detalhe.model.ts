export interface PublicacaoDetalheModel {
    publicacaoId: number;
    titulo: string;
    descricao: string;
    valor: number;
    tags?: string;
    especificacoesTecnicas?: string;
    pathImagem?: string;
    dataHoraCriacao: Date;
    estudanteId?: number; 
}