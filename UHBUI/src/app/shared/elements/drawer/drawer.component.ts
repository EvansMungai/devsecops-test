import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'app-drawer',
    imports: [RouterModule, NavbarComponent, MenuComponent],
    templateUrl: './drawer.component.html',
    styleUrl: './drawer.component.css'
})
export class DrawerComponent {

}
