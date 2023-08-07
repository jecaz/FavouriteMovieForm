import { Injectable } from '@angular/core';
import { DropdownMenu } from '../models/dropdown.model';

@Injectable()
export class CountryService {

    getCountryDropdown(): DropdownMenu[] {
        return [
          { label: 'Ireland', value: 'IRL' },
          { label: 'United Kingdom', value: 'GBR' },
        ];
      }
}
