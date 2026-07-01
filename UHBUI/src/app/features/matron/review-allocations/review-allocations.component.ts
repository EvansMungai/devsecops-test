import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/elements/card/card.component';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';
import { TableColumn, TableAction } from '../../../core/interfaces/table.interface';
import { ApplicationService } from '../../../core/services/application.service';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-review-allocations',
  imports: [CommonModule, CardComponent, TableComponent, LoadingComponent],
  templateUrl: './review-allocations.component.html',
  styleUrl: './review-allocations.component.css'
})
export class ReviewAllocationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);
  private roomService = inject(RoomService);
  private router = inject(Router);

  readonly tableData = signal<any | null>(null);
  readonly roomData = signal<any | null>(null);
  tableColumns: TableColumn[] = [
    { key: 'applicationPeriod', header: 'Application Period' },
    { key: 'registrationNo', header: 'Registration Number' },
    { key: 'status', header: 'Application Status' },
    { key: 'preferredHostel', header: 'Preferred Hostel' }
  ];
  tableActions: TableAction[] = [{ buttonProps: { text: 'Allocate Room', type: 'button', variant: 'secondary', size: 'sm', action: (row: any, index: number) => this.navigateToAllocationRoute(row, index) } }]
  loadingStyles: string = 'loading-spinner loading-lg';

  ngOnInit(): void {
    this.applicationService.getAcceptedApplications().subscribe({
      next: data => this.tableData.set(data),
      error: err => console.error('Error fetching accepted applications: ', err)
    });
    this.roomService.getRoomsData().subscribe({
      next: data => this.roomData.set(data),
      error: err => console.error('Error fetching rooms data')
    });
  }

  navigateToAllocationRoute(row: any, index: number) {
    const applicationNo = row['applicationNo'];
    this.router.navigate([`uhb/matron/view-allocation/${applicationNo}`]);
  }
}
