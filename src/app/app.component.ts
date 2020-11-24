// Author: T4professor

import { Component } from '@angular/core';
import { ButtonRendererComponent } from './btn-cell-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular 6';
  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};

  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    {
      headerName: 'Button Col 1',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Click 1'
      }
    },
    {
      headerName: 'Button Col 2',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick2.bind(this),
        label: 'Click 2'
      }
    },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
  }
  
  onBtnClick2(e) {
    this.rowDataClicked2 = e.rowData;
  }
}
