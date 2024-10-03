import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceHeaderComponent } from './shared/components/invoice-header/invoice-header.component';
import { InvoiceCardComponent } from './shared/components/invoice-card/invoice-card.component';
import { InvoiceModalComponent } from './shared/components/invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceHeaderComponent,
    InvoiceCardComponent,
    InvoiceModalComponent
],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
