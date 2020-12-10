import { Component } from "@angular/core";
import { NumberFormatterComponent } from "./number-formatter.component";

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
    }
  ];

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent
  };

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];
}
