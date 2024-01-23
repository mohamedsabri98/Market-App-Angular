import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent {
  id: any;
  data: any = {};
  spinner: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.spinner = true;
    this.service.getProductById(this.id).subscribe(
      (res) => {
        this.spinner = false;
        this.data = res;
      },
      (error) => {
        this.spinner = false;
        alert(error.message);
      }
    );
  }
}
