import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss',
})
export class InvoiceCardComponent implements OnInit {
  invoices: any[] = [];
  currentUser$: Observable<any> | undefined;

  constructor(private invoiceService: InvoiceService, private auth: Auth) {}

  ngOnInit(): void {
    this.currentUser$ = user(this.auth);

    this.currentUser$
      ?.pipe(
        switchMap((user) => {
          this.invoiceService.invoiceStorage(user.email);
          return this.invoiceService.filteredInvoices$;
        })
      )
      .subscribe((invoices) => {
        this.invoices = invoices;
      });
  }
}
