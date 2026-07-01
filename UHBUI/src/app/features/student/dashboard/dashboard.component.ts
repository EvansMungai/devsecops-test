import { Component, OnInit, inject, signal } from '@angular/core';

import { CardComponent } from '../../../shared/elements/card/card.component';
import { StudentService } from '../../../core/services/student.service';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';

@Component({
  selector: 'student-dashboard',
  imports: [CardComponent, LoadingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  private studentService = inject(StudentService);

  cardTitle: string = "Student Details"
  studentData = signal<any | null>(null);
  loadingStyles: string = 'loading-spinner loading-lg';

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const rawUserName = user.userName;
      const regNo = rawUserName.replace(/-(?=[^-]*$)/, '/');
      this.studentService.getSpecificStudentData(regNo).subscribe({
        next: data => this.studentData.set(data),
        error: err => console.error('Error fetching student details: ', err)
      })
    } else {
      console.warn('No user data found in local storage')
    }
  }
}
