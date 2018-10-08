import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppHttpService } from '../../services/app-http.service';
import { AlertMessageService } from '../../services/alert-message.service';
import { PaginationField } from '../../components/master-search/pagination-field';
import { FilterDropdownModel } from '../../components/master-search/filter-dropdown-model';
import { SortByField } from '../../components/master-search/sort-by-field';
import { SearchByField } from '../../components/master-search/search-by-field';
import { SortDropdownModel } from '../../components/master-search/sort-dropdown-model';

@Component({
  selector: 'app-home-material',
  templateUrl: './home-material.component.html',
  styleUrls: ['./home-material.component.css']
})
export class HomeMaterialComponent implements OnInit {

  sortByColumns: SortDropdownModel = {
    dropdownModel: {
      options: [
        {
          label: 'ID',
          value: 'ID'
        },
        {
          label: 'Update Time',
          value: 'updateTime'
        },
        {
          label: 'Description',
          value: 'description'
        }
      ]
      // , selectedOption: {
      //   label: 'Name',
      //   value: 'name'
      // }
    }
    // , isAscendingSort: false
  };
  sortByFieldNames: SortByField = {
    isAscendingSort: 'sortBy.isAscending',
    sortByColumn: 'sortBy.fieldName',
    queryPattern: 'order'
  };
  searchByField: SearchByField = {
    names: ['searchItem.name', 'searchItem.description']
    // name: 'search',
    // searchQueries: [
    //   {
    //     comparator: 'co',
    //     fieldName: 'name'
    //   },
    //   {
    //     comparator: 'co',
    //     fieldName: 'shortName'
    //   }
    // ]
  };
  filterDropdowns: FilterDropdownModel[] = [
    {
      dropdownModel: {
        options: [
          {
            label: 'all',
            value: ''
          },
          {
            label: 'public',
            value: 1
          },
          {
            label: 'private',
            value: 2
          }
        ],
        selectedOption: null
      },
      placeholder: 'Privacy Mode',
      fieldName: 'searchItem.privacyMode'
    },
    {
      dropdownModel: {
        options: [
          {
            label: 'all',
            value: ''
          },
          {
            label: 'descriptive',
            value: 1
          },
          {
            label: 'mcq',
            value: 2
          },
          {
            label: 'fill in the blanks',
            value: 3
          }
        ],
        selectedOption: null
      },
      placeholder: 'Type',
      fieldName: 'searchItem.answerType'
    }
  ];
  paginationFieldNames: PaginationField = new PaginationField();
  items = [];
  total = 0;

  // Table headers
  displayedColumns = ['description', 'answerType', 'privacyMode'];
  dataSource = new MatTableDataSource();

  constructor(private appHttpService: AppHttpService, private alertMessageService: AlertMessageService) {
    this.paginationFieldNames.startOffset = 'pagination.displayStart';
    this.paginationFieldNames.itemsPerPage = 'pagination.displaySize';
  }

  ngOnInit() {
  }

  changeSearch($event) {
    console.log('=> ', $event);
    this.appHttpService.get('http://localhost:4873/questions', $event)
      .subscribe(data => {
        console.log(data);
        this.total = data['totalItem'];
        this.dataSource = data['items'];
      }, err => {
        console.log(err);
        this.alertMessageService.setError('Failed to search');
      });
  }
}
