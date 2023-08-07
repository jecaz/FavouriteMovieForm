import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerDirective } from './spinner.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SpinnerDirective],
    exports: [SpinnerDirective],
})
export class SpinnerModule {}
