import { JsonToDynamicForm } from './json-to-dynamic-form';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  DynamicFormService,
  DynamicFormControlModel,
  DynamicFormArrayModel,
  DynamicInputModel
} from '@ng-dynamic-forms/core';
import { DynamicFormArrayModelHelper } from './dynamic-form-array-model-helper';

@Component({
  moduleId: module.id,
  selector: 'app-dynamic-bootstrap-form',
  templateUrl: './dynamic-bootstrap-form.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicBootstrapFormComponent implements OnInit, DoCheck {

  @Input() dynamicFormControlModel: DynamicFormControlModel[];
  @Input() jsonModels: any[];
  @Input() liveUpdate: boolean;

  @Output() dbfSubmit = new EventEmitter();
  @Output() dbfCancel = new EventEmitter();
  @Output() dbfBlur = new EventEmitter();
  @Output() dbfChange = new EventEmitter();
  @Output() dbfFocus = new EventEmitter();

  formGroup: FormGroup;

  private jsonToDynamicForm: JsonToDynamicForm;

  public dynamicFormArrayModelHelpers: { [id: string]: DynamicFormArrayModelHelper; } = {};


  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.jsonToDynamicForm = new JsonToDynamicForm();
    this.dynamicFormControlModel = this.jsonModels ? this.jsonToDynamicForm.getDynamicForm(this.jsonModels) : [];
    this.dynamicFormControlModel = this.dynamicFormControlModel ? this.dynamicFormControlModel : [];
    this.formGroup = this.dynamicFormService.createFormGroup(this.dynamicFormControlModel);
    this.initDynamicFormArray();
    console.log(this.dynamicFormControlModel);
  }
  ngDoCheck() {
    if (this.liveUpdate) {
      this.updateFormLayout(this.jsonModels, this.dynamicFormControlModel, this.formGroup);
    }
  }

  onBlur($event) {
    this.dbfBlur.emit($event);
  }
  onChange($event) {
    this.dbfChange.emit($event);
  }
  onFocus($event) {
    this.dbfFocus.emit($event);
  }

  submitForm() {
    this.dbfSubmit.emit(this.formGroup);
  }
  cancelForm() {
    this.dbfCancel.emit();
  }


  private updateFormLayout(models: any[], controlModels: DynamicFormControlModel[], partialFormGroup: FormGroup) {
    for (let I = 0; I < controlModels.length; I++) {
      if (!models[I]) {
        this.dynamicFormService.removeFormGroupControl(I, partialFormGroup, controlModels);
      }
    }
    for (let I = 0; I < models.length; I++) {
      if (!controlModels[I]) {
        this.dynamicFormService.addFormGroupControl(partialFormGroup, controlModels, this.jsonToDynamicForm.getControlModel(models[I]));

      } else if (models[I]['isUpdate']) {
        this.dynamicFormService.removeFormGroupControl(I, partialFormGroup, controlModels);
        this.dynamicFormService.insertFormGroupControl(I, partialFormGroup, controlModels,
          this.jsonToDynamicForm.getControlModel(models[I]));
        models[I]['isUpdate'] = false;

      } else if (models[I]['type'] === 'object') {
        this.updateFormLayout(models[I].form.value, controlModels[I]['group'],
          partialFormGroup.controls[controlModels[I]['name']] as FormGroup);
      }
    }
  }
  private initDynamicFormArray() {
    // tslint:disable-next-line:forin
    for (const group in this.formGroup.value) {
      const formArray = this.formGroup.get(group) as FormArray;
      if (formArray instanceof FormArray) {
        const dynamicFormArrayModel = this.dynamicFormService.findById(group, this.dynamicFormControlModel) as DynamicFormArrayModel;
        this.dynamicFormArrayModelHelpers[group] =
          new DynamicFormArrayModelHelper(this.dynamicFormService, formArray, dynamicFormArrayModel);
      }
    }
  }

}
