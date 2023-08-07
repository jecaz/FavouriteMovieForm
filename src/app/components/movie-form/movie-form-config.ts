import { Validators } from '@angular/forms';
import { FormConfig } from '../../models/form-config';
import { isNumber } from '../../shared/validators/number.validator';

export const movieConfig: FormConfig[] = [
    {
      fieldType: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, isNumber()],
      cssClass: 'mb-3',
    },
    {
      fieldType: 'input',
      label: 'Username',
      name: 'username',
      placeholder: 'Enter your username',
      validation: [Validators.required, Validators.email],
      cssClass: 'mb-3',
    },
    {
      fieldType: 'select',
      label: 'Country',
      name: 'country',
      options: [],
      placeholder: 'Select an option',
      validation: [Validators.required],
      cssClass: 'mb-3',
    },
    {
      fieldType: 'input',
      label: 'Post Code',
      name: 'postCode',
      placeholder: 'Enter your post code',
      validation: [],
      cssClass: 'mb-3',
    },
    {
      fieldType: 'autocompleteList',
      label: 'Favourite Movie',
      name: 'favouriteMovie',
      placeholder: 'Enter your favourite movie',
      validation: [],
      cssClass: 'mb-3',
    },
    {
      label: 'Submit',
      name: 'submit',
      fieldType: 'button',
      cssClass: 'd-flex justify-content-end',
    }
  ];
