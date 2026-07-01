import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { Router } from '@angular/router';
import { ActionButton, Button, NavigationButton, SubmitButton, ToggleButton } from '../../../core/interfaces/button.interface';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {
  private router = inject(Router);

  @Input() buttonProps: Button = {};
  @Output() buttonClick = new EventEmitter<void>();

  constructor() { }

  get buttonClasses(): string {
    const props = this.buttonProps;
    const baseClasses = `btn btn-${props.variant} btn-${props.size} || sm`;
    return `${baseClasses} ${props.buttonClass} || ''`;
  }
  get buttonType(): string {
    return 'button';
  }
  // Type guard functions
  isNavigationButton(): this is { buttonProps: NavigationButton } {
    return 'route' in this.buttonProps;
  }
  isSubmitButton(): this is { buttonProps: SubmitButton } {
    return 'type' in this.buttonProps && this.buttonProps.type === 'submit';
  }
  isActionButton(): this is { buttonProps: ActionButton } {
    return 'type' in this.buttonProps && this.buttonProps.type === 'button' && 'action' in this.buttonProps;
  }
  isToggleButton(): this is { buttonProps: ToggleButton } {
    return 'isActive' in this.buttonProps && 'toggleAction' in this.buttonProps;
  }
  // Handle button clicks
  onClick(): void {
    if (this.isNavigationButton()) {
      this.router.navigate([this.buttonProps.route], {
        queryParams: this.buttonProps.queryParams
      });
    } else if (this.isActionButton()) {
      this.buttonProps.action();
    } else if (this.isToggleButton()) {
      this.buttonProps.toggleAction(!this.buttonProps.isActive)
    } else if (this.isSubmitButton()) {
      // Explicitly submit the form
      const formId = this.buttonProps.formId;
      if (formId) {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
      this.buttonClick.emit();
    }
  }
}
