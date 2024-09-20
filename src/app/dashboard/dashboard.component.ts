import { Component } from '@angular/core';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { InvoiceComponent } from './shared/invoice/invoice.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    InvoiceComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
