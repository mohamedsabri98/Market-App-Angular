import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts: any[] = [];
  total: number = 0;
  successCard: boolean = false;

  constructor(private service: CartsService) {}

  ngOnInit() {
    this.getCartProduct();
  }

  getCartProduct() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].amount.price * this.cartProducts[x].quantity;
    }
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  clearData() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  addCart() {
    let productsCart = this.cartProducts.map((item) => {
      return { productId: item.amount.id, quantity: item.quantity };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: productsCart,
    };
    this.service.addNewCart(Model).subscribe((res) => {
      this.successCard = true;
    });
  }
}
