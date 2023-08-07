import { ModalContent } from './../../models/modal.model';
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  modalContent: Partial<ModalContent>;

  @Output()
  reject = new EventEmitter<void>();

  @Output()
  confirm = new EventEmitter<void>();

  constructor(private readonly elementRef: ElementRef) { }

  onClose(): void {
    this.elementRef.nativeElement.remove();
    this.reject.emit();
  }

  onConfirm(): void {
    this.elementRef.nativeElement.remove();
    this.confirm.emit();
  }
}
