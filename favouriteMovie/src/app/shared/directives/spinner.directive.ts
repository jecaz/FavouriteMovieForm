import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Directive({
  selector: '[spinner]',
})
export class SpinnerDirective {
  // Create resolver for loading component
  loadingFactory: ComponentFactory<LoadingComponent> =
    this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  loadingComponent: ComponentRef<LoadingComponent>;

  // @Input('spinner') show: boolean;

  // One solution with Input setter
  @Input()
  set spinner(loading: boolean) {
    this.viewContainerRef.clear();
    if (loading) {
      // create an instance of the loading component
      const spinnerComponent =
        this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
      // embed the loading component instance into the view
      this.viewContainerRef.createComponent(spinnerComponent);

      return;
    }
    // embed the contents of the host template
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private templateRef: TemplateRef<unknown>
  ) {}

  // Second solution inside the OnChange lifecycle hook
  // ngOnChanges(): void {
  //     if(this.show){
  //         const spinnerComponent = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  //         this.viewContainerRef.createComponent(spinnerComponent);
  //     } else {
  //         this.viewContainerRef.clear()
  //         this.viewContainerRef.createEmbeddedView(this.templateRef)
  //     }
  // }
}
