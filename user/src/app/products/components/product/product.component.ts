import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  addButton: boolean = false;
  amount: number = 0;
  @Input() data: any = {};
  @Output() item = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  add() {
    this.item.emit({ amount: this.data, quantity: this.amount });
  }
}
