import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.scss'
})
export class InvoiceViewComponent implements OnInit {
  invoice: any = {};
  userEmail: string = '';
  invoiceId: string = '';
  isDeleted: boolean = false;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isDeleted = false;
      this.invoiceData();
    });
  }

  ngOnInit(): void {
    this.invoiceData();
  }

  invoiceData(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.invoiceService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.invoiceService.getInvoiceById(this.userEmail, this.invoiceId).subscribe(
          invoice => {
            if (invoice) {
              this.invoice = invoice;
            } else if (!this.isDeleted) {
              this.router.navigate(['/dashboard']);
            }
          },
          error => {
            console.error('Error fetching invoice:', error);
            if (!this.isDeleted) {
              this.router.navigate(['/dashboard']);
            }
          }
        );
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  deleteInvoice(): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      console.log(`Deleting invoice with description: ${this.invoice.description}`);
      this.invoiceService.deleteInvoice(this.userEmail, this.invoice.description).subscribe(
        () => {
          console.log('Invoice deleted successfully');
          this.isDeleted = true;
          window.location.reload();
        },
        error => {
          console.error('Failed to delete invoice:', error);
          alert('Failed to delete invoice');
        }
      );
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  saveInvoice(): void {
    this.invoiceService.saveInvoice(this.invoice).subscribe(
      () => {
        console.log('Invoice saved successfully');
        this.isEditing = false;
      },
      error => {
        console.error('Failed to save invoice:', error);
        alert('Failed to save invoice');
      }
    );
  }
}
