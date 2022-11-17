import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(private api: ApiService) { }

  products: any

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res.filter((a: { cart: number; }) => {
            return a.cart > 0;
          });;
        },
        error: () => {
          alert("Error while fetching records")
        }
      });

  }

  delete(p: { cart: number; id: number; }) {
    p.cart = 0;
    this.api.putProduct(p, p.id).subscribe({
      next: (res) => {

        alert("product is deleted")
      }
    });
  }

  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res
        },
        error: () => {
          alert("Error while fetching records")
        }
      })
  }







  increment(p: any) {

    if (Number(p.cart) < Number(p.quantity)) {
      p.cart = Number(p.cart) + 1;
      this.api.putProduct(p, p.id).subscribe();
    } else {
      alert('item out Of Stock');
    }

    console.log(p.cart);

  }


  decrement(p: any) {


    if (Number(p.cart) > 0) {
      p.cart = Number(p.cart) - 1;
      this.api.putProduct(p, p.id).subscribe();

    }


    console.log(p.cart);

  }







}
