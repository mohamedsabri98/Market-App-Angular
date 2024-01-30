import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  base64Url: any = '';
  form!: FormGroup;

  constructor(private service: ProductsService, private build: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
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

  getSelctedCategries(event: any) {
    this.form.get('category')?.setValue(event.target.value);
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Url = reader.result;
      this.form.get('image')?.setValue(this.base64Url);
    };
  }

  addProduct() {
    const model = this.form.value;
    this.service.createProduct(model).subscribe((res) => {
      alert('product added successfully');
    });
  }

  updateProduct(product: any) {
    /*this.form.get('title')?.setValue(product.title);
    this.form.get('description')?.setValue(product.description);
    this.form.get('price')?.setValue(product.price);
    this.form.get('category')?.setValue(product.category);
    this.form.get('image')?.setValue(product.image);
    this.base64Url = product.image;
    console.log(this.form.value)*/
    this.form.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    this.base64Url = product.image;
    this.service.updateProduct(product.id, this.form.value).subscribe(
      (res) => {
        alert('product updated successfully');
      },
      (err) => {
        alert('error updating product');
      }
    );
  }
}
