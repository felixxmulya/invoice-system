import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceHeaderComponent } from "../invoice-header/invoice-header.component";
import { InvoiceCardComponent } from "../invoice-card/invoice-card.component";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceHeaderComponent,
    InvoiceCardComponent
],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
