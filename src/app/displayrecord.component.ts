import {Component} from '@angular/core';

@Component({
  selector: 'app-number-formatter-cell',
  template: `
    <span>{{params | json}}</span>
  `
})
export class DisplayRecordComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
}