import { Component } from "@angular/core";
import { NumberFormatterComponent } from "./number-formatter.component";

import {DisplayRecordComponent} from './displayrecord.component';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    {
      headerName: "Price",
      field: "price",
      cellRenderer: "numberFormatterComponent"
    },
    {
      headerName: "Pricee",
      field: "price",
      valueGetter: function(params) {
        return params.data.price + 1;
      },
      cellRenderer: "numberFormatterComponent"
    },
     {
      headerName: "recorddebug",
      field: "make",
      valueGetter: function(params) {
        return params.data.make;
      },
      cellRenderer: "DisplayRecordComponent"
    }
  ];

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
    DisplayRecordComponent: DisplayRecordComponent
  };

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];
}
