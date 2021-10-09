import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Dados comuns para validação de senha
export const PASSWORD_MINLENGHT = 4;

export function confirmacaoSenhaValidator(senha: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    console.log('senha is', senha);
    console.log('confirmacao senha is', control.value);

    if (senha != null && control !== null) {

      if (senha?.trim() == control?.value?.trim())
        return null;
    }

    return {incorrect: true};
  };
}