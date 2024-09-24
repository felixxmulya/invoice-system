import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './invoice-header.component.html',
  styleUrl: './invoice-header.component.scss'
})
export class InvoiceHeaderComponent {
  showFilterMenu = false;
  private clickListener: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.clickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  toggleFilterMenu(event: Event) {
    event.stopPropagation();
    this.showFilterMenu = !this.showFilterMenu;
  }

  onDocumentClick(event: Event) {
    if (this.showFilterMenu && !this.el.nativeElement.contains(event.target)) {
      this.showFilterMenu = false;
    }
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }
}
