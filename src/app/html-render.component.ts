import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'child-cell',
  template: `<span
    ><button
      style="height: 20px"
      (click)="invokeParentMethod()"
      class="btn btn-info"
    >
      Invoke Parent
    </button></span
  >`,
  styles: [
    `
      .btn {
        line-height: 0.5;
      }
    `,
  ],
})
export class HtmlRender implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    console.log(this.params.value);
  }

  refresh(): boolean {
    return false;
  }
}