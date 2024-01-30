import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: any[] = [];
  categories: any[] = [];
  spinner: boolean = false;
  cartProducts: any[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategries();
  }

  getProducts() {
    this.spinner = true;
    return this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.spinner = false;
      },
      (error) => {
        alert(error.message);
        this.spinner = false;
      }
    );
  }

  getCategries() {
    this.spinner = true;

    return this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.spinner = false;
      },
      (error) => {
        alert(error.message);
        this.spinner = false;
      }
    );
  }

  filterCategory($event: any) {
    let value = $event.target.value;
    value == 'all' ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.spinner = true;

    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res;
      this.spinner = false;
    });
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let existProduct = this.cartProducts.find(
        (item) => item.item.id == event.item.id
      );
      if (existProduct) {
        alert('this product already add in the cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
