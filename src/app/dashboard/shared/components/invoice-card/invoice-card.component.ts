import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../../../invoice/shared/services/invoice.service';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
