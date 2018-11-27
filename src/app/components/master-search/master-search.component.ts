import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { PaginationField } from './pagination-field';
import { SortByField } from './sort-by-field';
import { DropdownModel } from '../dropdown/dropdown-model';
import { SortDropdownModel } from './sort-dropdown-model';
import { FilterDropdownModel } from './filter-dropdown-model';
import { SearchByField } from './search-by-field';

@Component({
  selector: 'app-master-search',
  templateUrl: './master-search.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../../node_modules/font-awesome/css/font-awesome.css',
    './master-search.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MasterSearchComponent implements OnInit {

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


  readonly itemsPerPageDropdown: DropdownModel = {
    options: [
      {
        label: '10',
        value: 10
      },
      {
        label: '25',
        value: 25
      },
      {
        label: '50',
        value: 50
      },
      {
        label: '100',
        value: 100
      }
    ],
    selectedOption: {
      label: '10',
      value: 10
    }
  };
  searchText = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor() { }

  ngOnInit() {
    this.emitSearchObject(this.onInit);
  }


  changeSearchText() {
    this.emitSearchObject(this.onChange);
  }
  changePage() {
    this.emitSearchObject(this.onChange);
  }
  changeItemsPerPage($event) {
    this.itemsPerPage = $event.value;
    this.emitSearchObject(this.onChange);
  }
  changeSortByColumn($event) {
    this.sortByColumnDropdown.dropdownModel.selectedOption = $event;
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
      if (value.dropdownModel.selectedOption) {
        searchObject[value.fieldName] = value.dropdownModel.selectedOption.value;
      }
    });
  }
  private loadSortFields(searchObject) {
    if (!this.sortByField) {
      return;
    }
    if (this.sortByField.sortByColumn && this.sortByColumnDropdown.dropdownModel.selectedOption) {
      searchObject[this.sortByField.sortByColumn] = this.sortByColumnDropdown.dropdownModel.selectedOption.value;
    }
    if (this.sortByField.isAscendingSort && this.sortByColumnDropdown.isAscendingSort !== undefined) {
      searchObject[this.sortByField.isAscendingSort] = this.sortByColumnDropdown.isAscendingSort;
    }
    if (this.sortByField.queryPattern
      && this.sortByColumnDropdown.dropdownModel.selectedOption
      && this.sortByColumnDropdown.isAscendingSort !== undefined) {
      searchObject[this.sortByField.queryPattern] = this.sortByColumnDropdown.dropdownModel.selectedOption.value
        .concat(this.sortByField.seperator).concat(this.sortByColumnDropdown.isAscendingSort ? 'asc' : 'desc');
    }
  }
  private loadPaginationFields(searchObject) {
    if (!this.paginationFields) {
      return;
    }
    if (this.paginationFields.pageNumber) {
      searchObject[this.paginationFields.pageNumber] = this.currentPage - (1 - this.paginationFields.pageStartFrom);
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
    if (!this.searchByField) {
      return;
    }
    if (this.searchText && this.searchByField.names && this.searchByField.names.length) {
      this.searchByField.names.forEach(fieldName => {
        searchObject[fieldName] = this.searchText;
      });
    }
    if (this.searchByField.name) {
      this.searchByField.searchQueries = this.searchByField.searchQueries ? this.searchByField.searchQueries : [];
      searchObject[this.searchByField.name] = [];
      this.searchByField.searchQueries.forEach(searchQuery => {
        if (this.searchText || searchQuery.value) {
          searchObject[this.searchByField.name].push(
            searchQuery.fieldName
            + searchQuery.comparator
            + this.getEmptyIfNotExist(searchQuery.appendBeforeSearchText)
            + (searchQuery.value ? searchQuery.value : this.searchText)
            + this.getEmptyIfNotExist(searchQuery.appendAfterSearchText)
          );
        }
      });
    }
  }

  private getEmptyIfNotExist(text: string) {
    return text ? text : '';
  }
}
