export interface BaseButton {
    text?: string,
    disabled?: boolean,
    buttonClass?: string,
    size?: 'lg' | 'md' | 'sm' | 'xs' | 'wide' | 'block' | 'circle' | 'square',
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'outline'
}
export interface NavigationButton extends BaseButton {
    route: string,
    queryParams?: {[key: string] : string}
}
export interface SubmitButton extends BaseButton {
    type: 'submit',
    formId: string;
}
export interface ActionButton extends BaseButton {
    type: 'button',
    action: () => void
}
export interface ToggleButton extends BaseButton {
    isActive: boolean,
    toggleAction: (state: boolean) => void
}

export type Button = BaseButton | NavigationButton | SubmitButton | ActionButton | ToggleButton;