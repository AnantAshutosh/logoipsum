import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private api: ApiService) { }
  products: any
  searchText: any;
  imagelocation: string = "../../assets/Images/ProductImage/";

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;
        },
        error: () => {
          alert("Error while fetching records")
        }
      });
  }

  toDisplay = false;
  display = true;

  toggleData(p: any) {
    p.cart = Number(p.cart) + 1;
    this.api.putProduct(p, p.id).subscribe();
    this.toDisplay = !this.toDisplay;
    this.display = !this.display
  }

  checkbtn(p: any) {
    if (Number(p.cart) > 0) {
      this.toDisplay = true;
      this.display = false;
    }
  }





  toggleCart = true;


  toggle(p: any) {
    p.cart = Number(p.cart) + 1;
    this.api.putProduct(p, p.id).subscribe();
    this.toggleCart = !this.toggleCart;
  }

  increment(p: any) {

    if (Number(p.cart) < Number(p.quantity)) {
      p.cart = Number(p.cart) + 1;
      this.api.putProduct(p, p.id).subscribe();
      console.log(p.id)
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



















  // .subscribe({
  //   next:(res)=>{
  //     console.log(res);
  //     this.dataSource=new MatTableDataSource(res);
  //     this.dataSource.paginator=this.paginator;
  //     this.dataSource.sort=this.sort;
  //   },
  //   error:()=>{
  //     alert("Error while fetching records")
  //   }
  // })


}






// products = [
//   {id:1,name:'Mini watch',price:'109',color:'Black',available:'NotAvailable'},
//   {id:2,name:'Mini machine',price:'1090',color:'Black',available:'Available'},
//   {id:3,name:'Mini match',price:'10',color:'Black',available:'NotAvailable'},
//   {id:4,name:'Mini wa',price:'10998',color:'Black',available:'Available'}
// ];
