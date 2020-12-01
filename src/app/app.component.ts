import { Component } from '@angular/core';
import {GridOptions} from "ag-grid";

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
       
        // Column Defs
        this.gridOptions.columnDefs = [
        {headerName: '', field: ''},
        {headerName: 'JobID', field: 'JobID'},
        {headerName: 'Date', field: 'CreatedDate'},
        {headerName: 'Title', field: 'Title'},
        {headerName: 'Company', field: 'CompanyName'},
        {headerName: 'Hiring Manager', field: ''},
        {headerName: 'Location', field: 'Location'},
        {headerName: 'Status', field: 'JobStatus'},
    ];

 fetch('https://hiringmanagerwebapi.azurewebsites.net/api/job/GetAllJobsInfo')
            .then(result => result.json())
            .then(rowData => this.gridOptions.rowData = rowData);
      
        // this.gridOptions.rowData = [
        //      {make: 'Toyota', model: 'Celica', price: 35000},
        // {make: 'Ford', model: 'Mondeo', price: 32000},
        // {make: 'Porsche', model: 'Boxter', price: 72000}
        // ]
    }

    ngOnInit() {
       
    }

}