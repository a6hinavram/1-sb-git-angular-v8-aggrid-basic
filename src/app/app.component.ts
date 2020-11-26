import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
 
rowData: any;
  constructor(private http: HttpClient) {
   
   }

  title = "my-app";

  columnDefs = [
    { field: "make", sortable: true, filter: true, checkboxSelection: true },
    { field: "model", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true }
  ];

   ngOnInit() {
        this.http.get<any>('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json').subscribe({
            next: data => {
                this.rowData = data;
            },
            error: error => {
                //this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        })
    }


}
