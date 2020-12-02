import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";
import { HttpClient } from "@angular/common/http";
import * as exampleData from './jobcolumndefs.json';

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
  private jsonData = exampleData;

  // public mobileColumn = [{ headerName: "JobID", field: "JobID" },
  //     { headerName: "Title", field: "Title" },
  //     { headerName: "Company", field: "CompanyName" },
  //     { headerName: "Status", field: "JobStatus" }];


  private gridOptions: GridOptions;
  browserWidth: number = window.innerWidth;
  browserHeight: number = window.innerHeight;

  constructor(private http: HttpClient) {
  
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering
      enableFilter: true
    };

    // Column Defs

    if (this.browserWidth <= 480) {
      this.gridOptions.columnDefs = this.jsonData['colDef1'];
      //this.params.api.sizeColumnsToFit();
    } else {
      this.gridOptions.columnDefs = this.jsonData['colDef1'];

      this.defaultColDef = {
        sortable: true,
        resizable: true,
        width: 20
      };
    }

    

    this.gridOptions.pagination = true;

    this.gridOptions.skipHeaderOnAutoSize = true;
  }

  onWindowResize(event) {
    this.browserWidth = event.target.innerWidth;
    this.browserHeight = event.target.innerHeight;

    setTimeout(function() {
      if (window.innerWidth <= 480) {
        this.gridOptions.setColumnDefs(this.mobileColumn);
        this.params.api.sizeColumnsToFit();
      }
    });
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll(skipHeader) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sizeToFit();

    this.http
      .get(
        "https://hiringmanagerwebapi.azurewebsites.net/api/job/GetAllJobsInfo"
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }

  onBtExcludeMedalColumns() {
    this.gridApi.setColumnDefs(this.jsonData['colDefExcluded']);
  }

  onBtIncludeMedalColumns() {
    this.gridApi.setColumnDefs(this.jsonData['colDef1']);
  }
}
