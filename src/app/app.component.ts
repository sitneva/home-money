import { Component } from '@angular/core';
import {fadeStateTrigger} from './shared/animations/fade.animation';

@Component({
  selector: 'hm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hm';
}
