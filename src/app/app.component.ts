import {Component, OnInit} from '@angular/core';
import {NumberFormatterComponent} from './number-formatter.component';
import {NumericEditorComponent} from './numeric-editor.component';
import {RangeFilterComponent} from './range-filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  columnDefs = [
        {headerName: 'Make', field: 'make'},
        {headerName: 'Model', field: 'model'},
        {
      headerName: 'Price',
      field: 'price',
      editable: true,
      cellRenderer: 'numberFormatterComponent',
      cellEditor: 'numericEditorComponent',
      filter: 'rangeFilterComponent'
    }
    ];

    frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
    numericEditorComponent: NumericEditorComponent,
    rangeFilterComponent: RangeFilterComponent
  };

    rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];

}