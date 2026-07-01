import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/elements/card/card.component';

@Component({
    selector: 'app-admin-dashboard',
    imports: [CardComponent],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  card1Title: string = "Total Applications";
  card2Title: string = "Total Accepted Applications";
  card3Title: string = "Total Rejected Applications";
}
