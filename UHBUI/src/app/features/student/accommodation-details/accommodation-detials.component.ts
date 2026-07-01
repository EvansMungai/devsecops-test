import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentService } from '../../../core/services/student.service';
import { ApplicationService } from '../../../core/services/application.service';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { CardComponent } from '../../../shared/elements/card/card.component';
import { TableColumn } from '../../../core/interfaces/table.interface';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';

@Component({
  selector: 'app-accommodation-detials',
  imports: [CommonModule, TableComponent, CardComponent, LoadingComponent],
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css'
})
export class AccommodationDetailsComponent implements OnInit {
  private studentService = inject(StudentService);
  private applicationService = inject(ApplicationService);

  cardTitle: string = "Accommodation Details"
  tableData = signal<any | null>(null);
  tableColumns: TableColumn[] = [
    { key: 'registrationNo', header: "Registration Number", sortable: false },
    { key: 'status', header: "Status", sortable: false },
    { key: 'preferredHostel', header: "Allocated Hostel", sortable: false },
    { key: 'roomNo', header: "Room Number", sortable: false },
  ];
  regNo: string = 'C026-01-0914/2022';
  loadingStyles: string = 'loading-spinner loading-lg';

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const rawUserName = user.userName;
      const regNo = rawUserName.replace(/-(?=[^-]*$)/, '/');
      this.applicationService.getApplications().subscribe({
        next: data => this.tableData.set(data.filter(a => a.registrationNo === regNo)),
        error: err => console.error('Error fetching specific application details')
      })
    } else {
      console.warn('No user data found in local storage')
    }
  }
}
