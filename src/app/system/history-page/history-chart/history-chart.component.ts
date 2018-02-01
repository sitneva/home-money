import {Component, Input} from '@angular/core';


@Component({
  selector: 'hm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  @Input() data;
}
