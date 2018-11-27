import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

snackNotification: string;

  constructor(public snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) { }

    ngOnInit() {

    this.snackNotification = this.data;
    console.log(this.snackNotification);
  }

  closeSnackBar() {
    this.snackBar.dismiss();
    console.log('snackbar dismissed!');
    }


}
