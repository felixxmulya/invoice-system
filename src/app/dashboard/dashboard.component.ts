import { Component } from '@angular/core';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { InvoiceComponent } from './shared/invoice/invoice.component';
import { InvoiceModalComponent } from './shared/invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    InvoiceComponent,
    InvoiceModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
