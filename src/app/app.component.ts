import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  columnDefs = [
        {headerName: 'Make', field: 'make', sortable: true, filter: true},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
    ];

    // rowData = [
    //     {make: 'Toyota', model: 'Celica', price: 35000},
    //     {make: 'Ford', model: 'Mondeo', price: 32000},
    //     {make: 'Porsche', model: 'Boxter', price: 72000}
    // ];

    rowData = [];

  ngOnInit() {
    fetch('https://api.jsonbin.io/b/5fbcbaba04be4f05c9299a67')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

}