import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const postCodeUK =
  () =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const postCodeRegex = new RegExp(
      '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
    );
    const postCodeValid = postCodeRegex.test(control.value);
    return !postCodeValid ? { postCodeUk: true } : null;
  };

export const UK_POST_CODE_VALIDATORS = [Validators.required, postCodeUK()];
export const IRL_POST_CODE_VALIDATORS = [
  Validators.minLength(6),
  Validators.maxLength(10),
];
