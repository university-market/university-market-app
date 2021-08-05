export interface ConfirmDialogDataModel {
  question: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialogDefaultActions = {
  btnConfirm: 'Confirmar',
  btnCancel: 'Cancelar'
}