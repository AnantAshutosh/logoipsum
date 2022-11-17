import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService,) { }
  productForm !: FormGroup;
  selectedImage = null;

  myImage!: Observable<any>;
  base64code!: any;

  getimage!: string;

  ngOnInit(): void {


    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required],
      image: ['', Validators.required],
      cart: ['0']
    })




  }



  addProduct() {
    console.log(this.productForm.value)

    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)

        // this.api.postProduct()
        .subscribe({
          next: (res) => {
            alert("Product added successfully");
            this.productForm.reset();
          },
          error: () => {
            alert("Error while adding the product")
          }
        })
    } else {
      alert("Fill All the Field")
    }
  }




  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file)
    this.convertToBase64(file)
  }

  convertToBase64(file: File) {
    const obeservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })

    obeservable.subscribe((d) => {
      this.getimage = d;
      console.log(this.getimage);
    })
  }

  readFile(file: File, subscribe: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)

    filereader.onload = () => {
      subscribe.next(filereader.result);
      subscribe.complete()
    }

    filereader.onerror = () => {
      subscribe.error()
      subscribe.complete()
    }

  }



  // onFileSelected(event: any){

  //   console.log(event);
  //   this.selectedImage=event.target.files[0];
  // }



  //   getImage = "";
  // document.querySelector("#myFileInput").addEventListener("change", function () {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     getImage = reader.result;
  //   });

  //   reader.readAsDataURL(this.files[0]);
  // });

  // loadImage(){

  // }







}
