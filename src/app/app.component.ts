import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        width: 150,
        suppressSizeToFit: true,
      },
      {
        field: 'age',
        headerName: 'Age of Athlete',
        width: 90,
        minWidth: 50,
        maxWidth: 150,
      },
      {
        field: 'country',
        width: 120,
      },
      {
        field: 'year',
        width: 90,
      },
      {
        field: 'date',
        width: 110,
      },
      {
        field: 'sport',
        width: 110,
      },
      {
        field: 'gold',
        width: 100,
      },
      {
        field: 'silver',
        width: 100,
      },
      {
        field: 'bronze',
        width: 100,
      },
      {
        field: 'total',
        width: 100,
      },
    ];
    this.defaultColDef = { resizable: true };
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll(skipHeader) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }

}