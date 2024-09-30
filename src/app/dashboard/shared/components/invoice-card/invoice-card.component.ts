import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent implements OnInit {
  invoices: any[] = [];
  currentUser$: Observable<any> | undefined;

  constructor(private invoiceService: InvoiceService, private auth: Auth) {}

  ngOnInit(): void {
    this.currentUser$ = user(this.auth);
    this.currentUser$?.subscribe(user => {
      if (user) {
        this.invoiceService.invoiceStorage(user.email);
      }
    });

    this.invoiceService.invoices$.subscribe(invoices => {
      this.invoices = invoices;
    });
  }
}
