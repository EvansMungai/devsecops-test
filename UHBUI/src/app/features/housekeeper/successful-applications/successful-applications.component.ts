import { Component, inject, OnInit, signal } from '@angular/core';

import { CardComponent } from '../../../shared/elements/card/card.component';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { TableColumn } from '../../../core/interfaces/table.interface';
import { ApplicationService } from '../../../core/services/application.service';
import { LoadingComponent} from '../../../shared/elements/loading/loading.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-successful-applications',
  imports: [CommonModule, CardComponent, TableComponent, LoadingComponent],
  templateUrl: './successful-applications.component.html',
  styleUrl: './successful-applications.component.css'
})
export class SuccessfulApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);

  readonly tableData = signal<any | null>(null);
  tableColumns: TableColumn[] = [
    { key: 'applicationPeriod', header: "Application Period", sortable: false },
    { key: 'registrationNo', header: "Registration Number", sortable: false },
    { key: 'status', header: "Status", sortable: false }
  ];
  loadingStyles: string = 'loading-spinner loading-lg';

  ngOnInit(): void {
    this.applicationService.getAcceptedApplications().subscribe({
      next: data => this.tableData.set(data),
      error: err => console.error("Error fetching application details: ", err)
    })
  }
}
