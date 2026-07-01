import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAction, TableColumn } from '../../../core/interfaces/table.interface';
import { ButtonComponent } from '../button/button.component';
import { ActionButton } from '../../../core/interfaces/button.interface';

@Component({
    selector: 'app-table',
    imports: [CommonModule, ButtonComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actionColumn: TableAction[] = [];
  @Input() showActionColumn: boolean = false;

  @Input() tableStyles: string = 'table text-left';
  @Input() headerStyles: string = 'p-4 text-md font-semibold text-black';
  @Input() rowStyles: string = 'p-4 text-sm hover:bg-slate-200';
  @Input() defaultSortKey: string = '';
  @Input() defaultSortDirection: 'asc' | 'desc' = 'asc';

  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @Output() rowClick = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.defaultSortKey) {
      this.sortKey = this.defaultSortKey;
      this.sortDirection = this.defaultSortDirection;
    }
  }

  get sortedData(): any[] {
    if (!this.sortKey || !this.data) {
      return this.data
    }
    return [...this.data].sort((a, b) => {
      const valueA = a[this.sortKey];
      const valueB = b[this.sortKey];

      if (valueA === valueB) return 0;
      if (this.sortDirection === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });
  }
  sortTable(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
  }
  prepareActionButton(action: TableAction, row: any, index: number): ActionButton {
    return {
      ...action.buttonProps,
      action: () => action.buttonProps.action(row, index)
    }
  }
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
}
