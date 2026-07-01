import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../shared/elements/card/card.component';
import { HostelRegistrationFormComponent } from "./hostel-registration-form/hostel-registration-form.component";
import { RoomsRegistrationFormComponent } from "./rooms-registration-form/rooms-registration-form.component";
import { TableComponent } from '../../../shared/elements/table/table.component';
import { HostelService } from '../../../core/services/hostel.service';
import { RoomService } from '../../../core/services/room.service';
import { ActionButton } from '../../../core/interfaces/button.interface';
import { ButtonComponent } from '../../../shared/elements/button/button.component';
import { TableColumn } from '../../../core/interfaces/table.interface';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';

@Component({
  selector: 'app-admin-register',
  imports: [CommonModule, CardComponent, HostelRegistrationFormComponent, RoomsRegistrationFormComponent, TableComponent, ButtonComponent, LoadingComponent],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent implements OnInit {
  private hostelService = inject(HostelService);
  private roomService = inject(RoomService);

  registerHostelVisibility: boolean = false;
  registerRoomVisibility: boolean = false;
  hostelsData = signal<any | null>(null);
  roomsData = signal<any | null>(null);
  hostelColumns: TableColumn[] = [
    { key: 'hostelName', header: 'Hostel Name' },
    { key: 'capacity', header: 'Hostel Capacity' },
    { key: 'type', header: 'Hostel Type' }
  ];
  roomColumns: TableColumn[] = [
    { key: 'roomNo', header: 'Room Number' },
    { key: 'hostelNo', header: 'Hostel Number' }
  ];
  loadingStyles: string = 'loading-spinner loading-lg';
  hostelsLoading = false;
  roomsLoading = false;
  hostelsError = false;
  roomsError = false;
  hostelsErrorMessage = '';
  roomsErrorMessage = '';


  ngOnInit(): void {
    this.hostelService.getHostelsData().subscribe({
      next: data => this.hostelsData.set(data),
      error: err => console.error('Error fetching hostel details: ', err)
    })
    this.roomService.getRoomsData().subscribe({
      next: data => this.roomsData.set(data),
      error: err => console.error('Error fetching hostel details: ', err)
    })
  }

  registerHostelButton(): ActionButton {
    return {
      text: 'Register Hostel',
      variant: 'secondary',
      type: 'button',
      size: 'sm',
      action: () => this.toggleRegisterHostelVisibility()
    }
  }
  registerRoomButton(): ActionButton {
    return {
      text: 'Register Room',
      variant: 'secondary',
      type: 'button',
      size: 'sm',
      action: () => this.toggleRegisterRoomVisibility()
    }
  }
  toggleRegisterHostelVisibility() {
    return this.registerHostelVisibility = !this.registerHostelVisibility;
  }
  toggleRegisterRoomVisibility() {
    return this.registerRoomVisibility = !this.registerRoomVisibility;
  }
}
