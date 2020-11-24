import { Component } from '@angular/core';
import { BtnCellRenderer } from "./btn-cell-renderer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

frameworkComponents: any;

constructor() {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    }
  }

  columnDefs = [
        // {headerName: 'Make', field: 'make'},

{
        field: "make",
        cellRenderer: "btnCellRenderer",
        cellRendererParams: {
          clicked: function(field: any) {
            alert(`${field} was clicked`);
          }
        },
        minWidth: 150
      },

        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
    ];

    

    rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];

}