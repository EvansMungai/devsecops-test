import { WritableSignal } from "@angular/core";
export function showToast(message: string, alertStyle: string, toastVisible: WritableSignal<boolean>, toastStyles: WritableSignal<string>, alertStyles: WritableSignal<string>, alertMessage: WritableSignal<string>): void {
    toastVisible.set(true);
    toastStyles.set('toast-top toast-end');
    alertStyles.set(alertStyle);
    alertMessage.set(message);

    setTimeout(() => toastVisible.set(false), 3000);
}