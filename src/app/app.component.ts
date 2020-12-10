import { Component } from "@angular/core";
import { GridOptions } from 'ag-grid-community';
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
  private gridOptions: GridOptions;
 

  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
        enableFilter: true
    };

    // Column 
    
    // [
    //   { headerName: "Make", field: "make" },
    //   { headerName: "Model", field: "model" },
    //   { headerName: "Price", field: "price" }
    // ];

    this.gridOptions.columnDefs = [
      // {
      //   headerName: '#',
      //   maxWidth: 100,
      //   valueGetter: hashValueGetter,
      // },
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


  btnClick(): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === "Value")[0];
    console.log(valueColumn);
    
    //const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible('make', false);
    this.gridOptions.api.sizeColumnsToFit();
  }

  show = true;

  showCheckboxes(): void { 
            var checkboxes =  
                document.getElementById("checkBoxes"); 
  
            if (this.show) { 
                checkboxes.style.display = "block"; 
                this.show = false; 
            } else { 
                checkboxes.style.display = "none"; 
                this.show = true; 
            } 
        }

        
        testFun(event: Event, val: String){
          console.log(event.target.checked);
          this.gridOptions.columnApi.setColumnVisible(val, event.target.checked);
          //alert(val);
        } 
}

var hashValueGetter = function (params) {
  return params.node.rowIndex;
};
