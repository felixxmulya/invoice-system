import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { InvoiceModalComponent } from './shared/components/invoice-modal/invoice-modal.component';
import { DashboardService } from './shared/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    InvoiceComponent,
    InvoiceModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showModal = false;
  private modalSubscription: Subscription | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.modalSubscription = this.dashboardService.modalState$.subscribe(state => {
      this.showModal = state;
    });
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