import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DropdownModel } from '../dropdown/dropdown-model';
import { SortDropdownModel } from '../master-search/sort-dropdown-model';
import { SearchByField } from '../master-search/search-by-field';
import { PaginationField } from '../master-search/pagination-field';
import { SortByField } from '../master-search/sort-by-field';
import { FilterDropdownModel } from '../master-search/filter-dropdown-model';

@Component({
  selector: 'app-master-search-material',
  templateUrl: './master-search-material.component.html',
  styleUrls: [
    '../../../../node_modules/font-awesome/css/font-awesome.css',
    './master-search-material.component.scss'
  ]
})
export class MasterSearchMaterialComponent implements OnInit {

  @Input() sortByColumnDropdown: SortDropdownModel;
  @Input() totalItem: number;
  @Input() searchByField: SearchByField;
  @Input() paginationFields: PaginationField;
  @Input() sortByField: SortByField;
  @Input() filterDropdownModels: FilterDropdownModel[];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onInit = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter();


  searchText = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor() { }

  ngOnInit() {
    console.log('-> ', this.sortByColumnDropdown);
    this.emitSearchObject(this.onInit);
  }


  changeSearchText() {
    this.emitSearchObject(this.onChange);
  }
  changePaginator($event) {
    this.currentPage = $event.pageIndex + 1;
    this.itemsPerPage = $event.pageSize;
    this.emitSearchObject(this.onChange);
  }
  changeSortByColumn($event) {
    this.sortByColumnDropdown.dropdownModel.selectedValue = $event;
    this.currentPage = 1;
    this.emitSearchObject(this.onChange);
  }
  toggleSortOrder() {
    this.sortByColumnDropdown.isAscendingSort = !this.sortByColumnDropdown.isAscendingSort;
    this.currentPage = 1;
    this.emitSearchObject(this.onChange);
  }
  changeFilterOption($event) {
    this.emitSearchObject(this.onChange);
  }
  emitSearchObject(eventEmitter: EventEmitter<object>) {
    const searchObject = {};

    this.loadSearchTextFields(searchObject);
    this.loadPaginationFields(searchObject);
    this.loadSortFields(searchObject);
    this.loadFilterFields(searchObject);

    eventEmitter.emit(searchObject);
  }


  private loadFilterFields(searchObject) {
    this.filterDropdownModels = this.filterDropdownModels ? this.filterDropdownModels : [];
    this.filterDropdownModels.forEach(value => {
      if (value.dropdownModel.selectedValue) {
        searchObject[value.fieldName] = value.dropdownModel.selectedValue;
      }
    });
  }
  private loadSortFields(searchObject) {
    if (!this.sortByField) {
      return;
    }
    if (this.sortByField.sortByColumn && this.sortByColumnDropdown.dropdownModel.selectedValue) {
      searchObject[this.sortByField.sortByColumn] = this.sortByColumnDropdown.dropdownModel.selectedValue;
    }
    if (this.sortByField.isAscendingSort && this.sortByColumnDropdown.isAscendingSort !== undefined) {
      searchObject[this.sortByField.isAscendingSort] = this.sortByColumnDropdown.isAscendingSort;
    }
    if (this.sortByField.queryPattern
      && this.sortByColumnDropdown.dropdownModel.selectedValue
      && this.sortByColumnDropdown.isAscendingSort !== undefined) {
      searchObject[this.sortByField.queryPattern] = this.sortByColumnDropdown.dropdownModel.selectedValue
        .concat(this.sortByColumnDropdown.isAscendingSort ? ' asc' : ' desc');
    }
  }
  private loadPaginationFields(searchObject) {
    if (!this.paginationFields) {
      return;
    }
    if (this.paginationFields.pageNumber) {
      searchObject[this.paginationFields.pageNumber] = this.currentPage;
    }
    if (this.paginationFields.startOffset) {
      const startOffset = (this.currentPage - 1) * this.itemsPerPage;
      searchObject[this.paginationFields.startOffset] = startOffset;
    }
    if (this.paginationFields.itemsPerPage) {
      searchObject[this.paginationFields.itemsPerPage] = this.itemsPerPage;
    }
  }
  private loadSearchTextFields(searchObject) {
    if (!this.searchByField || !this.searchText) {
      return;
    }
    if (this.searchByField.names && this.searchByField.names.length) {
      this.searchByField.names.forEach(fieldName => {
        searchObject[fieldName] = this.searchText;
      });
    }
    if (this.searchByField.name) {
      this.searchByField.searchQueries = this.searchByField.searchQueries ? this.searchByField.searchQueries : [];
      searchObject[this.searchByField.name] = [];
      this.searchByField.searchQueries.forEach(searchQuery => {
        searchObject[this.searchByField.name].push(searchQuery.fieldName + ' ' + searchQuery.comparator + ' ' + this.searchText);
      });
    }
  }
}
