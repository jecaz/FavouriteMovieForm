import { ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ModalContent } from '../models/modal.model';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable()
export class ModalService {
    modalNotifier: Subject<string>;

    modalTemplate$ = new BehaviorSubject<TemplateRef<ElementRef> | null>(null);

    modalContent$ = new BehaviorSubject<ModalContent | null>(null);

    constructor(private readonly resolver: ComponentFactoryResolver, private readonly injector: Injector) {}

    setModalContent(content: ModalContent): void {
        this.modalContent$.next(content);
    }

    setModalTemplate(templateRef: TemplateRef<ElementRef>): void {
      this.modalTemplate$.next(templateRef);
    }

    open(): Observable<string> {
        const modalComponentFactory: ComponentFactory<ModalComponent> = this.resolver.resolveComponentFactory(ModalComponent);
        const contentViewReference: EmbeddedViewRef<ElementRef<unknown>> = this.modalTemplate$.value.createEmbeddedView(null);
        const modalComponent: ComponentRef<ModalComponent> = modalComponentFactory.create(this.injector, [contentViewReference.rootNodes]);

        modalComponent.instance.modalContent = this.modalContent$.value;
        modalComponent.instance.reject.subscribe(() => this.closeModal());
        modalComponent.instance.confirm.subscribe(() => this.confirmModal('confirm'));
        modalComponent.hostView.detectChanges();
        document.body.append(modalComponent.location.nativeElement);
        this.modalNotifier = new Subject();

        return this.modalNotifier.asObservable();
    }

    closeModal(): void {
        this.modalNotifier.complete();
    }

    confirmModal(action: string): void {
        this.modalNotifier.next(action);
        this.closeModal();
    }
}
