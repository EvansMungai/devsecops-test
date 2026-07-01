import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminLinks, HomeLinks, HousekeeperLinks, MatronLinks, StudentLinks } from '../interfaces/mock-links';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  links: any[] = [];

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.updateLinks(event.urlAfterRedirects);
    });
  }
  private updateLinks(url: string) {
    if (url.startsWith('/uhb/student')) {
      this.links = StudentLinks;
    } else if (url.startsWith('/uhb/housekeeper')) {
      this.links = HousekeeperLinks;
    } else if (url.startsWith('/uhb/matron')) {
      if (url.includes('/view-allocation')) {
        const id = this.extractIdFromUrl(url, '/uhb/matron/view-allocation/');
      }
      this.links = MatronLinks;
    } else if (url.startsWith('/uhb/admin')) {
      this.links = AdminLinks;
    } else {
      this.links = HomeLinks;
    }
  }
  private extractIdFromUrl(url: string, basePath: string): string | null {
    const regex = new RegExp(`${basePath}([^/])+`);
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  public getLinks() {
    return this.links;
  }
}
