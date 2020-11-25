import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  columnDefs = [
    {headerName: 'JobID', field: 'JobID'},
        {headerName: 'Date', field: 'CreatedDate'},
        {headerName: 'Title', field: 'Title'},
        {headerName: 'Company', field: 'CompanyName'},
        {headerName: 'Hiring Manager', field: ''},
        {headerName: 'Location', field: 'Location'},
        {headerName: 'Status', field: 'JobStatus'},
      
    ];

    // rowData = [
    //     {make: 'Toyota', model: 'Celica', price: 35000},
    //     {make: 'Ford', model: 'Mondeo', price: 32000},
    //     {make: 'Porsche', model: 'Boxter', price: 72000}
    // ];

    rowData = [];

  ngOnInit() {
    fetch('https://hiringmanagerwebapi.azurewebsites.net/api/job/GetAllJobsInfo')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

}