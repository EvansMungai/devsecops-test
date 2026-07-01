import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { LinkService } from '../../../core/services/link.service';
import { AuthService } from '../../../core/services/auth.service';
import { showToast } from '../../utils/toastUtils';
import {ToastComponent} from '../toast/toast.component';

@Component({
  selector: 'app-navbar',
  imports: [ToastComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private router = inject(Router);
  private linkService = inject(LinkService);
  private authService = inject(AuthService);

  links: any[] = [];
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  constructor() { }
  ngOnInit(): void {
    this.links = this.linkService.getLinks();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.links = this.linkService.getLinks());
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    showToast('You have been logged out.', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
  }
}
