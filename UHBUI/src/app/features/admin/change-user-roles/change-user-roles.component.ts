import { Component, inject, OnInit, signal } from '@angular/core';

import { CardComponent } from '../../../shared/elements/card/card.component';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';
import { UserService } from '../../../core/services/user.service';
import { TableComponent } from '../../../shared/elements/table/table.component';
import { ChangeRoleFormComponent } from "./change-role-form/change-role-form.component";
import { TableAction, TableColumn } from '../../../core/interfaces/table.interface';


@Component({
  selector: 'app-change-user-roles',
  imports: [CardComponent, TableComponent, ChangeRoleFormComponent, LoadingComponent],
  templateUrl: './change-user-roles.component.html',
  styleUrl: './change-user-roles.component.css'
})
export class ChangeUserRolesComponent implements OnInit {
  private userService = inject(UserService);
  tableData = signal<any | null>(null);
  tableColumns: TableColumn[] = [{ key: 'userName', header: "Username" }, { key: 'role', header: 'Role' }];
  tableActions: TableAction[] = [{ buttonProps: { text: 'Change Role', type: 'button', variant: 'secondary', size: 'sm', action: (row: any, index: number) => { this.onClick(row, index)} } }]
  changeRoleFormVisibility: boolean = false;
  loadingStyles: string = 'loading-spinner loading-lg';
  selectedUsername: string = '';

  ngOnInit(): void {
    this.userService.getUsersData().subscribe({
      next: data => {
        this.tableData.set(data);
        console.log(data)
      },
      error: err => console.error('Error fetching user details: ', err)
    });
  }
  toggleChangeRoleFormVisibility(): void {
    this.changeRoleFormVisibility = !this.changeRoleFormVisibility;
  }
  onClick(row: any, index: number){
    this.selectedUsername= row['userName'];
    this.toggleChangeRoleFormVisibility();
  }
}
