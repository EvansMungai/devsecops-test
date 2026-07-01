import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/elements/card/card.component';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { TableAction, TableColumn } from '../../../core/interfaces/table.interface';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../core/services/application.service';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';


@Component({
  selector: 'app-review-applications',
  imports: [CommonModule, CardComponent, TableComponent, LoadingComponent],
  templateUrl: './review-applications.component.html',
  styleUrl: './review-applications.component.css'
})
export class ReviewApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);
  private router = inject(Router);

  readonly tableData = signal<any | null>(null);
  acceptCount!: number;
  rejectCount!: number;
  tableColumns: TableColumn[] = [
    { key: 'applicationPeriod', header: 'Application Period' },
    { key: 'registrationNo', header: 'Registration Number' },
    { key: 'status', header: 'Application Status' },
    { key: 'preferredHostel', header: 'Preferred Hostel' }
  ];
  tableActions: TableAction[] = [
    { buttonProps: { text: 'Review', type: 'button', variant: 'secondary', size: 'sm', action: (row: any, index: number) => this.navigateToApplicationRoute(row, index) } }
  ]
  loadingStyles: string = 'loading-spinner loading-lg';

  ngOnInit(): void {
    this.applicationService.getApplications().subscribe({
      next: data => {
        this.tableData.set(data);
        this.acceptCount = data.filter(app => app.status === 'Accepted').length;
        this.rejectCount = data.filter(app => app.status === 'Rejected').length;
      },
      error: err => console.error("Error fetching application details: ", err)
    })
  }

  navigateToApplicationRoute(row: any, index: number) {
    const applicationNo = row['applicationNo'];
    this.router.navigate([`uhb/housekeeper/view-application/${applicationNo}`]);
  }
}
