import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css'
})
export class LoadingComponent {
    @Input() styles = '';

    get loadingStyles(): string {
        const props = this.styles;
        const loadingStyles = `loading ${props}`;
        return loadingStyles
    }
}
