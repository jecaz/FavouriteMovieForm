import { NgModule } from '@angular/core';

import { ValueAccessorDirective } from './value-accessor.directive';

@NgModule({
    declarations: [ValueAccessorDirective],
    exports: [ValueAccessorDirective],
})
export class ValueAccessorModule {}
