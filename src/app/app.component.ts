import { Component } from '@angular/core';
import {GridOptions} from "ag-grid";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    private gridOptions: GridOptions;

    constructor(private http: HttpClient) {
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

    this.http.get<any>('https://hiringmanagerwebapi.azurewebsites.net/api/job/GetAllJobsInfo').subscribe({
            next: data => {
                this.gridOptions.rowData = data;
            },
            error: error => {
                //this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        })
    }

   ngOnInit() {
        
    }

}