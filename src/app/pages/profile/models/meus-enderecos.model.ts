export interface MeusEnderecosModel{
    id?: number;
    estudante_id?: number;
    rua: string;
    numero: string;
    cep: string;
    complemento?: string;
    bairro: string;
    municipio: string
}