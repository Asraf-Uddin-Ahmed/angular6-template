import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function requireCheckboxGroup(control: AbstractControl): ValidationErrors | null {
    for (const key in control.value) {
        if (control.value.hasOwnProperty(key)) {
            const value = control.value[key];
            if (value) {
                return null;
            }
        }
    }
    return { requireCheckboxGroup: true };
}

export function requireCheckbox(control: AbstractControl): ValidationErrors | null {
    const hasError = !control.value;
    return hasError ? { requireCheckbox: true } : null;
}

export function validateStartsWithoutAbc(control: AbstractControl): ValidationErrors | null {
    const hasError = control.value ? (control.value as string).startsWith('abc') : false;
    return hasError ? { validateStartsWithoutAbc: true } : null;
}

export function validateUrl(control: AbstractControl) {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const hasError = control.value ? !pattern.test(control.value as string) : false;
    return hasError ? { validateUrl: true } : null;
}

export function customDateRangeValidator(group: FormGroup): ValidationErrors | null {

    const dateArrival = group.get('arrivalDate').value as Date;
    const dateDeparture = group.get('departureDate').value as Date;
    let hasError = false;

    if (dateArrival && dateDeparture) {
        hasError = dateArrival >= dateDeparture || dateDeparture <= dateArrival;
    }

    return hasError ? { customDateRangeValidator: true } : null;
}
