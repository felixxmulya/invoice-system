import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.scss'
})
export class InvoiceViewComponent implements OnInit {
  invoice: any;
  userEmail: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.invoiceService.getInvoiceById(this.userEmail, invoiceId!).subscribe(invoice => {
          this.invoice = invoice;
        });
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
