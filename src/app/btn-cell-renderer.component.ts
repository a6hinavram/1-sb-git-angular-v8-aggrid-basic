import { Component, OnDestroy } from "@angular/core";

import { ICellRendererAngularComp } from "@ag-grid-community/angular";

@Component({
  selector: "btn-cell-renderer",
  template: `
    <button (click)="btnClickedHandler($event)">Click me!</button>
  `
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
