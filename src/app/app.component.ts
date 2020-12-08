import { Component } from '@angular/core';
import { GridOptions } from "ag-grid";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private gridOptions: GridOptions;

  constructor() {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering 
      enableFilter: true
    };
   
   
    this.gridOptions.columnDefs = [
      {
        headerName: 'Group A',
        children: [
          { headerName: 'Make', field: 'make', resizable: true,filter:true },
          { headerName: 'Model', field: 'model' },
        ]
      },
      { headerName: 'Price', field: 'price' },

    ];

    this.gridOptions.defaultColDef = {
      // set every column width
        width: 100,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter'
    }


    this.gridOptions.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]
  }

}