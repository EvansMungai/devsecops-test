import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../shared/elements/card/card.component';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { TableColumn } from '../../../core/interfaces/table.interface';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
  selector: 'app-allocated-rooms',
  imports: [CommonModule, CardComponent, TableComponent, LoadingComponent],
  templateUrl: './allocated-rooms.component.html',
  styleUrl: './allocated-rooms.component.css'
})
export class AllocatedRoomsComponent implements OnInit {
  private applicationService = inject(ApplicationService);

  tableData = signal<any | null>(null);
  tableColumns: TableColumn[] = [
    { key: "roomNo", header: "Room Number" },
    { key: "registrationNo", header: "Registration Number" },
  ];
  loadingStyles: string = 'loading-spinner loading-lg';

  // constructor() {
  //   const applicationService = this.applicationService;

  //   this.tableData = applicationService.getAllocatedRooms();
  // }
  ngOnInit(): void {
    this.applicationService.getAllocatedRooms().subscribe({
      next: data => this.tableData.set(data),
      error: err => console.error('Error fetching allocated rooms data: ', err)
    })
  }
}
