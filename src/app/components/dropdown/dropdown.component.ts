import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownModel } from './dropdown-model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit {

  @Input() dropdownModel: DropdownModel;
  @Input() placeholder: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeOption(option) {
    if (this.dropdownModel.selectedOption === option) {
      return;
    }
    this.dropdownModel.selectedOption = option;
    this.onChange.emit(option);
  }
}
