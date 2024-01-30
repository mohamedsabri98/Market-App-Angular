import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  carts: any[] = [];
  products: any[] = [];
  form!: FormGroup;
  details: any;

  constructor(
    private service: CartsService,
    private builder: FormBuilder,
    private ProductsService: ProductsService
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }

  getAllCarts() {
    this.service.getAllCarts().subscribe(
      (res: any) => {
        this.carts = res;
      },
      (error: any) => {
        alert('error fetching data ' + error.message);
      }
    );
  }

  applyFilter() {
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe(
      (res: any) => {
        this.carts = res;
      },
      (error: any) => {
        alert('error fetching data ' + error.message);
      }
    );
  }

  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe((res) => {
      this.getAllCarts();
      alert('cart deleted successfully');
    });
  }

  view(index: number) {
    this.products = [];
    this.details = this.carts[index];
    for (let x in this.details.products) {
      this.ProductsService.getProductById(
        this.details.products[x].productId
      ).subscribe((res: any) =>
        this.products.push({
          item: res,
          quantity: this.details.products[x].quantity,
        })
      );
    }
    console.log(this.details.products.quantity);

    console.log(this.details);
    console.log(this.products);
  }
}
