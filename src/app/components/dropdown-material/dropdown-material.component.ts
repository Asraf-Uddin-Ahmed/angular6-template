import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownModel } from '../dropdown/dropdown-model';

@Component({
  selector: 'app-dropdown-material',
  templateUrl: './dropdown-material.component.html',
  styleUrls: ['./dropdown-material.component.css']
})
export class DropdownMaterialComponent implements OnInit {

  @Input() dropdownModel: DropdownModel;
  @Input() placeholder: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeOption() {
    this.onChange.emit(this.dropdownModel.selectedValue);
  }

}
