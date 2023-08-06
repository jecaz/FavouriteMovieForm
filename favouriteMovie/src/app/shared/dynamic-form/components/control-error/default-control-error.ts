import { ValidationErrors } from '@angular/forms';

export const ERROR_MESSAGES: ValidationErrors = {
    required: () => 'Required field',
    email: () => 'Email required',
    maxlength: (error: { requiredLength: number, actualLength:  number}) =>
    `Maximum ${error.requiredLength} characters allowed`,
    minlength: (error: { requiredLength: number, actualLength:  number}) =>
    `Mast be at least ${error.requiredLength} characters`,
    postCodeUk: (error: { postCodeUk: boolean }) => 'Wrong post code format',
    isNumber: () => 'Numbers not allowed'
  }
