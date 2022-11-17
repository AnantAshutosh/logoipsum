import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})




export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  putProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
  }


  getCart() {
    return this.http.get<any>("http://localhost:3000/AddCart/");
  }

  deleteCart(id: number) {
    return this.http.delete<any>("http://localhost:3000/AddCart/" + id)
  }

  putCart(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/AddCart/" + id, data)
  }

  postCart(data: any) {
    return this.http.post<any>("http://localhost:3000/AddCart/", data);
  }

}
