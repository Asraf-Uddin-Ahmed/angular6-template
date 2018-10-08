import { Component, OnInit } from '@angular/core';

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
  DynamicTimePickerModel
} from '@ng-dynamic-forms/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
  model = [

    new DynamicFormGroupModel(
      {
        id: 'stay',
        group: [

          new DynamicDatePickerModel(
            {
              id: 'arrivalDate',
              inline: false,
              label: 'Arrival',
              placeholder: 'Date of Arrival',
              toggleIcon: './assets/calendar-icon.svg'
            },
            {
              element: {
                container: 'p-0',
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-4'
              }
            }
          ),

          new DynamicDatePickerModel(
            {
              id: 'departureDate',
              inline: false,
              label: 'Departure',
              placeholder: 'Date of Departure',
              toggleIcon: './assets/calendar-icon.svg'
            },
            {
              element: {
                container: 'p-0',
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-4'
              }
            }
          )
        ]
      },
      {
        element: {
          control: 'form-row'
        }
      }
    ),

    new DynamicTimePickerModel(
      {
        id: 'arrivalTime',
        label: 'Estimated Arrival Time'
      },
      {
        element: {
          container: 'pt-2 mb-0',
          label: 'col-form-label'
        }
      }
    ),

    new DynamicFormArrayModel(
      {
        id: 'bootstrapFormArray',
        initialCount: 5,
        label: 'Form Array',
        groupFactory: () => {
          return [
            new DynamicInputModel(
              {
                id: 'bootstrapArrayGroupInput',
                placeholder: 'example array group input'
              },
              {
                element: {
                  label: 'col-form-label'
                }
              }
            )
          ];
        }
      },
      {
        element: {
          label: 'col-form-label'
        }
      }
    )
  ];
  */

  modelJson = [
    {
      'name': 'date',
      'label': 'date',
      'type': 'date',
      'required': true,
      'value': '2017-12-21'
    },
    {
      'name': 'time',
      'label': 'time',
      'type': 'time',
      'required': true,
      'value': '22:07'
    },
    {
      'name': 'datetime',
      'label': 'datetime',
      'type': 'datetime',
      'required': true,
      'value': '2017-12-29T17:02'
    },
    {
      'name': 'name',
      'label': 'Area name.',
      'minLength': 3,
      'maxLength': 50,
      'min': 1,
      'max': 5,
      'required': true,
      'hint': 'json.hint',
      'prefix': 'json.prefix',
      'suffix': 'json.suffix',
      'value': 'Grand Pappy Marina.'
    },
    {
      'name': 'password',
      'label': 'Password',
      'type': 'password',
      'minLength': 3,
      'maxLength': 50,
      'required': true,
      'value': 'my pass'
    },
    {
      'name': 'description',
      'label': 'Description',
      'type': 'text',
      'required': true,
      'minLength': 3,
      'maxLength': 100,
      'hint': 'json.hint',
      'value': 'Grand Pappy Marina.'
    },
    {
      'name': 'type',
      'label': 'Area type.',
      'required': true,
      'type': 'integer',
      'min': 1,
      'max': 5,
      'value': 1
    },
    {
      'name': 'timeZoneRef',
      'label': 'Area time zone.',
      'required': true,
      'pattern': '[a-c]+',
      'value': 'abc'
    },
    {
      'name': 'officePhone',
      'label': 'Office Phone number.',
      'mask': ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'required': true,
      'value': '+123456789.'
    },
    {
      'name': 'officeEmail',
      'label': 'Office email address.',
      'required': true,
      'type': 'email',
      'startsWithout': 'abc',
      'value': 'office@konnectedtechnology.com'
    },
    {
      'name': 'numberOfSlots',
      'label': 'Office email address.',
      'type': 'integer',
      'value': 100
    },
    {
      'name': 'numberOfGates',
      'label': 'Area gates count.',
      'type': 'integer',
      'value': 5
    },
    {
      'name': 'numberOfRepeaters',
      'label': 'Area repeaters count.',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'numberOfGateways',
      'label': 'Area gateways count.',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'numberOfSections',
      'label': 'Office email address',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'url',
      'label': 'URL',
      'type': 'url',
      'value': ''
    },
    {
      'name': 'address',
      'label': 'Address',
      'required': true,
      'type': 'object',
      'form': {
        'value': [
          {
            'name': 'cityRef',
            'label': 'City referance',
            'required': true,
            'value': '544-900ABT'
          },
          {
            'name': 'street',
            'label': 'Street Address',
            'required': true,
            'value': '1234 Street'
          },
          {
            'name': 'zip',
            'label': 'Zip code',
            'required': true,
            'value': '77342'
          }
        ]
      }
    },
    {
      'name': 'isAgree',
      'label': 'Agree',
      'type': 'checkbox',
      'hint': 'pls confirm',
      'required': true,
      'value': false
    },
    {
      'name': 'hobbies',
      'label': 'Hobbies',
      'type': 'checkboxGroup',
      'required': true,
      'options': [
        {
          'name': 'reading',
          'label': 'Reading',
          'type': 'checkbox',
          'value': false
        },
        {
          'name': 'writing',
          'label': 'Writing',
          'type': 'checkbox',
          'value': true
        },
        {
          'name': 'walking',
          'label': 'Walking',
          'type': 'checkbox',
          'value': false
        }
      ]
    },
    {
      'name': 'passion',
      'label': 'Passion',
      'type': 'radioGroup',
      'required': true,
      'options': [
        {
          'label': 'Reading',
          'value': 'read'
        },
        {
          'label': 'Writing',
          'value': 'write'
        },
        {
          'label': 'Walking',
          'value': 'walk'
        }
      ],
      'selectedOption': 'walk'
    },
    {
      'name': 'job',
      'label': 'Job',
      'type': 'select',
      'required': true,
      'options': [
        {
          'label': 'Reading',
          'value': 'read'
        },
        {
          'label': 'Writing',
          'value': 'write'
        },
        {
          'label': 'Walking',
          'value': 'walk'
        }
      ],
      'selectedOption': 'read'
    }
  ];

  constructor() { }
  ngOnInit() {
  }

  postForm(formGroup) {
    console.log(formGroup);
  }
  cancelForm() {
    console.log('redirect to previous page');
  }

  actionBlur($event) {
    // console.log(`BLUR event on ${$event.model.id}: `, $event);
  }
  actionChange($event) {
    // console.log(`CHANGE event on ${$event.model.id}: `, $event);
  }
  actionFocus($event) {
    // console.log(`FOCUS event on ${$event.model.id}: `, $event);
  }

  afterAddingFile(fileItem) {
    console.log('afterAddingFile => ', fileItem);
    fileItem.url = 's3_bucket_url';
    // for upload instantly after adding file
    // fileItem.upload();
  }
  onProgress(fileItemWithProgress) {
    console.log('progress => ', fileItemWithProgress);
  }
  onSuccess(fileItem) {
    console.log('success => ', fileItem);
  }
  onError(fileItem) {
    console.log('error => ', fileItem);
  }
  onFileOverDropZone() {
    console.log('fileOverDropZone');
  }
}
