import { AbstractControl, ValidationErrors } from '@angular/forms';

export const isNumber =
    () =>
        (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const numberRegex = /\d/g;
            const numberValid = numberRegex.test(control.value);
            return numberValid ? { isNumber: true } : null;
        };
