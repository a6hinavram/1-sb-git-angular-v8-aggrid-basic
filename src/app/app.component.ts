import { Component } from '@angular/core';
import {RedComponentComponent} from "./red-component/red-component.component";

// Ref
// https://stackblitz.com/edit/angular-ag-grid-angular

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  columnDefs = [
        {headerName: 'Make', field: 'make', cellRendererFramework: RedComponentComponent,},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
    ];

    rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];

}