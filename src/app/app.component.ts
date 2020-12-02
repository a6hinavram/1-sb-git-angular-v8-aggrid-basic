import { Component } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-root',
  template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
      #agGrid
      style="width: 100%; height: 100%;"
      id="myGrid"
      class="ag-theme-alpine"
      [modules]="modules"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  public modules: Module[] = AllCommunityModules;
  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  public rowData: [];

  constructor() {
    this.columnDefs = [
      {
        headerName: 'make',
        field: 'make',
      },
      {
        headerName: 'model',
        field: 'model',
      },
      {
        headerName: 'price',
        field: 'price',
      },

    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   this.rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];
  }
}
