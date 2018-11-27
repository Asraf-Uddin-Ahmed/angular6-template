import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-counter-card',
  templateUrl: './counter-card.component.html',
  styleUrls: ['./counter-card.component.scss']
})
export class CounterCardComponent implements OnInit {

  @Input() endCountValue = 0;
  @Input() startCountValue = 0;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() leftImage: string;
  @Input() rightImage: string;
  @Input() countOption: {
    useEasing: boolean,
    useGrouping: boolean,
    separator: string,
    decimal: string,
    prefix: string,
    suffix: string,
  } = null;


  constructor() { }

  ngOnInit() { }



}
