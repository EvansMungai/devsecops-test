import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { LinkService } from '../../../core/services/link.service';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faQrcode, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { filter } from 'rxjs';

import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { showToast } from '../../utils/toastUtils';
import {ToastComponent} from '../toast/toast.component';

@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, RouterModule, ToastComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private router = inject(Router);
  private linkService = inject(LinkService);
  private authService = inject(AuthService);

  links: any[] = [];
  faQrcode = faQrcode;
  faExit = faRightFromBracket;
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  constructor() { }
  ngOnInit(): void {
    this.links = this.linkService.getLinks();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.links = this.linkService.getLinks())
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    showToast('You have been logged out.', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
  }
}
