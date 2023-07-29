import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.container {margin-top: 100px}'],
  providers: [LoadingService],
})
export class AppComponent {
  @ViewChild('modalTemplate')
  modal: TemplateRef<ElementRef>;

  constructor(private readonly modalService: ModalService) {}

  ngAfterViewInit(): void {
    this.modalService.setModalTemplate(this.modal);
  }
}
