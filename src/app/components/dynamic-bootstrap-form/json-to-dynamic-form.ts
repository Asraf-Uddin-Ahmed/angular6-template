import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel,
    DynamicDatePickerModel,
    DynamicTimePickerModel,
    DynamicFormControlModel
} from '@ng-dynamic-forms/core';
import { validateStartsWithoutAbc, validateUrl, requireCheckbox, requireCheckboxGroup } from '../../app.validators';


enum JsonValidationType {
    minLength,
    maxLength,
    min,
    max,
    required,
    pattern,
    startsWithout
}
enum ValidationType {
    minLength,
    maxLength,
    min,
    max,
    required,
    email,
    pattern,
    validateStartsWithoutAbc,
    validateUrl,
    requireCheckbox,
    requireCheckboxGroup
}
enum JsonInputType {
    email,
    string,
    password,
    object,
    integer,
    url,
    text,
    checkbox,
    checkboxGroup,
    radioGroup,
    select,
    date,
    time,
    datetime,
    hidden
}
enum InputType {
    text,
    password,
    number,
    email,
    color,
    tel,
    url,
    file,
    textArea,
    checkbox,
    checkboxGroup,
    select,
    date,
    time,
    datetime,
    hidden
}


export class JsonToDynamicForm {

    private readonly JSON_INPUT_TYPE_TO_FUNCTION: { [typeName: string]: (json) => DynamicFormControlModel; } = {};

    constructor() {
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.string]] = (json) => this.getInput(json, InputType.text);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.password]] = (json) => this.getInput(json, InputType.password);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.email]] = (json) => this.getInput(json, InputType.email);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.integer]] = (json) => this.getInput(json, InputType.number);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.url]] = (json) => this.getInput(json, InputType.url);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.date]] = (json) => this.getInput(json, InputType.date);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.time]] = (json) => this.getInput(json, InputType.time);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.datetime]] = (json) => this.getInput(json, InputType.datetime);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.hidden]] = (json) => this.getInput(json, InputType.hidden);

        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.object]] = (jsonObject) => this.getFormGroup(jsonObject);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.text]] = (json) => this.getTextArea(json);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.checkbox]] = (json) => this.getCheckbox(json, '');
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.checkboxGroup]] = (json) => this.getCheckboxGroup(json);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.radioGroup]] = (json) => this.getRadioGroup(json);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.select]] = (json) => this.getSelect(json);
    }

    getDynamicForm(jsonModels: any[]): DynamicFormControlModel[] {
        const dynamicFormControlModels: DynamicFormControlModel[] = [];
        jsonModels.forEach(jsonModel => {
            const controlModel = this.getControlModel(jsonModel);
            dynamicFormControlModels.push(controlModel);
        });
        return dynamicFormControlModels;
    }

    getControlModel(jsonModel: any) {
        jsonModel.type = jsonModel.type ? jsonModel.type : JsonInputType[JsonInputType.string];
        return this.JSON_INPUT_TYPE_TO_FUNCTION[jsonModel.type](jsonModel);
    }

    private getFormGroup(jsonObject: any): DynamicFormGroupModel {
        return new DynamicFormGroupModel(
            {
                id: jsonObject.name,
                label: jsonObject.label,
                group: this.getDynamicForm(jsonObject.form.value)
            },
            {
                element: {
                    control: 'jumbotron', // form-row
                    label: 'col-form-label blockquote'
                }
            }
        );
    }

    private getSelect(json: any) {
        return new DynamicSelectModel(
            {
                id: json.name,
                label: json.label,
                validators: this.getValidators(json, InputType.select),
                errorMessages: this.getErrorMessages(json, InputType.select),
                options: json.options,
                value: json.selectedOption
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }
    private getRadioGroup(json: any) {
        const dynamicRadioGroupModel = new DynamicRadioGroupModel(
            {
                id: json.name,
                label: json.label,
                // validators: this.getValidators(json, InputType.checkboxGroup),
                // errorMessages: this.getErrorMessages(json, InputType.checkboxGroup),
                options: json.options,
                value: json.selectedOption
            },
            {
                element: {
                    label: 'col-form-label',
                    option: 'btn-primary'
                }
            }
        );
        return dynamicRadioGroupModel;
    }
    private getCheckboxGroup(json: any): DynamicCheckboxGroupModel {
        const dynamicCheckboxGroupModel = new DynamicCheckboxGroupModel(
            {
                id: json.name,
                label: json.label,
                validators: this.getValidators(json, InputType.checkboxGroup),
                errorMessages: this.getErrorMessages(json, InputType.checkboxGroup),
                group: []
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
        json.options.forEach(jsonCheckbox => {
            const controlModel = this.getCheckbox(jsonCheckbox, 'btn-primary');
            dynamicCheckboxGroupModel.group.push(controlModel);
        });
        return dynamicCheckboxGroupModel;
    }
    private getCheckbox(json: any, controlClass: string): DynamicCheckboxModel {
        return new DynamicCheckboxModel(
            {
                id: json.name,
                label: json.label,
                value: json.value,
                hint: json.hint,
                validators: this.getValidators(json, InputType.checkbox),
                errorMessages: this.getErrorMessages(json, InputType.checkbox)
            },
            {
                element: {
                    control: controlClass
                }
            }
        );
    }

    private getTextArea(json: any) {
        return new DynamicTextAreaModel(
            {
                id: json.name,
                label: json.label,
                placeholder: json.placeholder,
                value: json.value,
                hint: json.hint,
                minLength: json.minLength,
                maxLength: json.maxLength,
                rows: 5,
                validators: this.getValidators(json, InputType.textArea),
                errorMessages: this.getErrorMessages(json, InputType.textArea)
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }

    private getInput(json: any, inputType: InputType): DynamicInputModel {
        return new DynamicInputModel(
            {
                inputType: inputType === InputType.datetime ? 'datetime-local' : InputType[inputType],
                id: json.name,
                label: inputType === InputType.hidden ? null : json.label,
                placeholder: json.placeholder,
                value: json.value,
                hint: json.hint,
                prefix: json.prefix,
                suffix: json.suffix,
                mask: json.mask,
                minLength: json.minLength,
                maxLength: json.maxLength,
                min: json.min,
                max: json.max,
                validators: this.getValidators(json, inputType),
                errorMessages: this.getErrorMessages(json, inputType)
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }

    private getValidators(json: any, inputType: InputType) {
        const validators = {};

        if (inputType === InputType.email) {
            validators[ValidationType[ValidationType.email]] = null;
        }
        if (inputType === InputType.url) {
            validators[ValidationType[ValidationType.validateUrl]] = {
                name: validateUrl.name,
                args: null
            };
        }
        if (inputType === InputType.checkbox && json[JsonValidationType[JsonValidationType.required]]) {
            validators[ValidationType[ValidationType.requireCheckbox]] = {
                name: requireCheckbox.name,
                args: null
            };
        }
        if (inputType === InputType.checkboxGroup && json[JsonValidationType[JsonValidationType.required]]) {
            validators[ValidationType[ValidationType.requireCheckboxGroup]] = {
                name: requireCheckboxGroup.name,
                args: null
            };
        }

        if (json[JsonValidationType[JsonValidationType.required]]) {
            validators[ValidationType[ValidationType.required]] = null;
        }
        if (json[JsonValidationType[JsonValidationType.pattern]]) {
            validators[ValidationType[ValidationType.pattern]] = json[JsonValidationType[JsonValidationType.pattern]];
        }
        if (json[JsonValidationType[JsonValidationType.minLength]]) {
            validators[ValidationType[ValidationType.minLength]] = json[JsonValidationType[JsonValidationType.minLength]];
        }
        if (json[JsonValidationType[JsonValidationType.maxLength]]) {
            validators[ValidationType[ValidationType.maxLength]] = json[JsonValidationType[JsonValidationType.maxLength]];
        }
        if (json[JsonValidationType[JsonValidationType.min]]) {
            validators[ValidationType[ValidationType.min]] = json[JsonValidationType[JsonValidationType.min]];
        }
        if (json[JsonValidationType[JsonValidationType.max]]) {
            validators[ValidationType[ValidationType.max]] = json[JsonValidationType[JsonValidationType.max]];
        }

        if (json[JsonValidationType[JsonValidationType.startsWithout]]
            && json[JsonValidationType[JsonValidationType.startsWithout]] === 'abc') {

            validators[ValidationType[ValidationType.validateStartsWithoutAbc]] = {
                name: validateStartsWithoutAbc.name,
                args: null
            };
        }

        return validators;
    }

    private getErrorMessages(json: any, inputType: InputType) {
        const errorMessages = {};

        if (inputType === InputType.email) {
            errorMessages[ValidationType[ValidationType.email]] = '{{ label }} is not valid';
        }
        if (inputType === InputType.url) {
            errorMessages[ValidationType[ValidationType.validateUrl]] = '{{ label }} is not valid';
        }
        if (inputType === InputType.checkbox && json[JsonValidationType[JsonValidationType.required]]) {
            errorMessages[ValidationType[ValidationType.requireCheckbox]] = 'You should check {{ label }}';
        }
        if (inputType === InputType.checkboxGroup && json[JsonValidationType[JsonValidationType.required]]) {
            errorMessages[ValidationType[ValidationType.requireCheckboxGroup]] = 'Select minimum one item from {{ label }}';
        }

        if (json[JsonValidationType[JsonValidationType.required]]) {
            errorMessages[ValidationType[ValidationType.required]] = '{{ label }} is required';
        }
        if (json[JsonValidationType[JsonValidationType.pattern]]) {
            errorMessages[ValidationType[ValidationType.pattern]] = '{{label}} does not match pattern {{validator.requiredPattern}}';
        }
        if (json[JsonValidationType[JsonValidationType.minLength]]) {
            errorMessages[ValidationType[ValidationType.minLength]] =
                'Minimum length of {{ label }} is ' + json[JsonValidationType[JsonValidationType.minLength]];
        }
        if (json[JsonValidationType[JsonValidationType.maxLength]]) {
            errorMessages[ValidationType[ValidationType.maxLength]] =
                'Maximum lenght of {{ label }} is ' + json[JsonValidationType[JsonValidationType.maxLength]];
        }
        if (json[JsonValidationType[JsonValidationType.min]]) {
            errorMessages[ValidationType[ValidationType.min]] =
                'Minimum value of {{ label }} is ' + json[JsonValidationType[JsonValidationType.min]];
        }
        if (json[JsonValidationType[JsonValidationType.max]]) {
            errorMessages[ValidationType[ValidationType.max]] =
                'Maximum value of {{ label }} is ' + json[JsonValidationType[JsonValidationType.max]];
        }

        if (json[JsonValidationType[JsonValidationType.startsWithout]]
            && json[JsonValidationType[JsonValidationType.startsWithout]] === 'abc') {

            errorMessages[ValidationType[ValidationType.validateStartsWithoutAbc]] = '{{label}} cannot start with abc';
        }

        return errorMessages;
    }
}
