import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as Highcharts from 'highcharts';
import * as HC_exporting from 'highcharts/modules/exporting';
import * as HC_export_data from 'highcharts/modules/export-data';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {

  Highcharts = Highcharts;

  @Input() chartOptions: object = null;
  @Input() enableExporting = false;
  @Input() enableDataExporting = false;
  @Input() isUpdated = false;

  @Output() isUpdatedChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
    if (this.enableExporting) {
      HC_exporting(Highcharts);
      if (this.enableDataExporting) {
        HC_export_data(Highcharts);
      }
    }
  }

  afterChartUpdated($event) {
    this.isUpdated = false;
    this.isUpdatedChange.emit(this.isUpdated);
  }

}
