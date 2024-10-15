import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { InvoiceModalComponent } from './shared/components/invoice-modal/invoice-modal.component';
import { DashboardService } from './shared/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InvoiceHeaderComponent } from "./shared/components/invoice-header/invoice-header.component";
import { InvoiceCardComponent } from "./shared/components/invoice-card/invoice-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    InvoiceModalComponent,
    InvoiceHeaderComponent,
    InvoiceCardComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showModal = false;
  private modalSubscription: Subscription | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.modalSubscription = this.dashboardService.modalState$.subscribe(
      (state) => {
        this.showModal = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  closeModal(event: Event) {
    this.dashboardService.closeModal();
  }
}
