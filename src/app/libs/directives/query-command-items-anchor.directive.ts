import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[queryCommandItemsAnchor]',
})
export class QueryCommandItemsAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
