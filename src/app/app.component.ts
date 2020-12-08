import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];
  public saved_state1;

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
      { headerName: "Make", field: "make", filter:true },
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

  saveState() {
    // save the columns state
    this.saved_state1 = this.gridColumnApi.getColumnState();

    //window.colState = this.gridColumnApi.getColumnState();
    console.log("column state saved");
    console.log(this.saved_state1);
  }

  restoreState() {
    if (!this.saved_state1) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    this.gridColumnApi.applyColumnState({
      state: this.saved_state1,
      applyOrder: true
    });
    console.log("column state restored");
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
    console.log("column state reset");
  }
}
