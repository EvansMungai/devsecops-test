import { Component } from '@angular/core';
import { NavbarComponent } from '../../elements/navbar/navbar.component';
import { HeroComponent } from '../../elements/hero/hero.component';
import { Features } from '../../elements/features/features';
import { Testimonials } from '../../elements/testimonials/testimonials';
import { FooterComponent } from '../../elements/footer/footer.component';

@Component({
    selector: 'app-landing',
    imports: [NavbarComponent, HeroComponent, Features, Testimonials, FooterComponent],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css'
})
export class LandingComponent {

}
