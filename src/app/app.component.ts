import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  public mobileColumn = [
    { headerName: "JobID", field: "JobID" },
    { headerName: "Title", field: "Title" },
    { headerName: "Company", field: "CompanyName" },
    { headerName: "Status", field: "JobStatus" }
  ];

  private gridOptions: GridOptions;
  browserWidth: number = window.innerWidth;
  browserHeight: number = window.innerHeight;

  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
        enableFilter: true
    };

    // Column Defs
    this.gridOptions.columnDefs = [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" }
    ];

    this.gridOptions.pagination = true;
    this.gridOptions.skipHeaderOnAutoSize = true;
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sizeToFit();

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
  }
}
