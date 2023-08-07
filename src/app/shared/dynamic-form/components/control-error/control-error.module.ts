import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorDirective } from './control-error.directive';
import { ControlErrorComponent } from './control-error.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ControlErrorComponent, ControlErrorDirective],
    exports: [ControlErrorComponent, ControlErrorDirective],
})
export class ControlErrorModule {}
