import { element } from 'protractor';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicFormArrayModel, DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';

export class DynamicFormArrayModelHelper {

    constructor(
        private dynamicFormService: DynamicFormService,
        private formArray: FormArray,
        private dynamicFormArrayModel: DynamicFormArrayModel
    ) {

    }

    add() {
        this.dynamicFormService.addFormArrayGroup(this.formArray, this.dynamicFormArrayModel);
    }
    insert(index: number) {
        this.dynamicFormService.insertFormArrayGroup(index, this.formArray, this.dynamicFormArrayModel);
    }
    remove(index: number) {
        this.dynamicFormService.removeFormArrayGroup(index, this.formArray, this.dynamicFormArrayModel);
    }
    move(index: number, step: number) {
        this.dynamicFormService.moveFormArrayGroup(index, step, this.formArray, this.dynamicFormArrayModel);
    }
    clear() {
        this.dynamicFormService.clearFormArray(this.formArray, this.dynamicFormArrayModel);
    }
    total() {
        return this.dynamicFormArrayModel.size;
    }
}
