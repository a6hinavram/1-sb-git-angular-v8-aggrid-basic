import { Component } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { HttpClient } from "@angular/common/http";
import * as exampleData from "./jobcolumndefs.json";

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
  private rowSelection;
  private jsonData = exampleData;
  quickSearchValue: string = "";
  public saved_state1;
  public columnViews: [];
  public viewName;
  public viewsList = new Map();
  savedViewNamesList: any;
  selectedView;

  private gridOptions: GridOptions;
  browserWidth: number = window.innerWidth;
  browserHeight: number = window.innerHeight;
  columnsList;

  constructor(private http: HttpClient) {
    this.savedViewNamesList = new Array();
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering
      enableFilter: true
    };

    // Column Defs

    this.columnsList = this.jsonData["colDef1"];

    if (this.browserWidth <= 480) {
      this.gridOptions.columnDefs = this.jsonData["colDef1"];
      //this.params.api.sizeColumnsToFit();
    } else {
      this.gridOptions.columnDefs = this.jsonData["colDef1"];

      this.defaultColDef = {
        sortable: true,
        resizable: true,
        width: 20
      };

      this.rowSelection = "multiple";
    }

    this.gridOptions.pagination = true;

    this.gridOptions.skipHeaderOnAutoSize = true;

    let savedViews = localStorage.getItem("saved_views");
    if (savedViews != undefined) {
      let savedList = JSON.parse(savedViews);
      console.log(savedList);

      //console.log(this.viewsList);
      for (let [key, value] of savedList) {
        console.log("key");
        console.log(key.name);

        this.viewsList.set(
          { name: key.name },
          { data: value.data, filterData: value.filterData }
        );
        this.savedViewNamesList.push(key.name);
      }
    }

    //console.log(this.savedViewNamesList);
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
    this.gridApi.setColumnDefs(this.jsonData["colDefExcluded"]);
    this.sizeToFit();
  }

  onBtIncludeMedalColumns() {
    this.gridApi.setColumnDefs(this.jsonData["colDef1"]);
    this.sizeToFit();
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].Title : "";
  }

  onQuickFilterChanged() {
    this.gridOptions.api.setQuickFilter(this.quickSearchValue);
  }

  saveState() {
    // save the columns state
    this.saved_state1 = this.gridColumnApi.getColumnState();

    //window.colState = this.gridColumnApi.getColumnState();
    console.log("column state saved");
    console.log(this.saved_state1);
    console.log(this.gridOptions.api.getFilterModel());

    //console.log(JSON.stringify(gridOptions.columnApi.getColumnState()));
    //console.log(JSON.stringify(gridOptions.api.getFilterModel()));
    //console.log(JSON.stringify(gridOptions.api.getSortModel()));
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

  saveView() {
    // save the columns state
    let viewName = this.viewName;
    if (viewName.length > 0) {
      let colState = this.gridColumnApi.getColumnState();
      let filterState = this.gridOptions.api.getFilterModel();

      let savedFilterModel = this.gridOptions.api.getFilterModel();
      // let keys = Object.keys(savedFilterModel);
      // let savedFilters = keys.length > 0 ? keys.join(", ") : "(none)";

      this.viewsList.set(
        { name: viewName },
        { data: colState, filterData: savedFilterModel }
      );
      localStorage.setItem("saved_views", JSON.stringify(this.viewsList));
      console.log(this.viewsList.get(viewName));
      this.savedViewNamesList.push(viewName);
    } else {
      alert("Plese enter view name");
    }
  }

  showView() {
    if (this.selectedView == "Default View") {
      this.gridColumnApi.resetColumnState();
      this.gridApi.setFilterModel(null);
    } else {
      console.log(this.viewsList);
      let colData;
      let filterData;

      for (let [key, value] of this.viewsList) {
        console.log(key.name);
        console.log(value);
        if (this.selectedView == key.name) {
          console.log("value");
          console.log(value);
          colData = value.data;
          filterData = value.filterData;
        }

        //this.viewsList.set({ name: key.name }, { data: key.data });
        //this.savedViewNamesList.push(key.name);
      }

      console.log(colData);

      //alert(this.selectedView);
      //let data = this.viewsList.get(this.selectedView);

      if (!colData) {
        console.log(
          "no columns state to restore by, you must save state first"
        );
        return;
      }

      console.log("filterData");
      console.log(filterData);

      this.gridApi.setFilterModel(filterData);

      this.gridColumnApi.applyColumnState({
        state: colData,
        applyOrder: true
      });

      //let filterState = this.gridOptions.api.getFilterModel();
      //this.gridOptions.api.setFilterModel();
      console.log("column state restored");
    }
  }

  testFun(event: Event, val: String) {
    console.log(event.target.checked);
    this.gridOptions.columnApi.setColumnVisible(val, event.target.checked);
    //alert(val);
  }
}

function bracketsFormatter(params) {
  return "(" + params.value + ")";
}
