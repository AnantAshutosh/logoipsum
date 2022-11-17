import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private deref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required]
    })

    if (this.editData) {
      this.actionbtn = "update"
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['gender'].setValue(this.editData.gender);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['currency'].setValue(this.editData.currency);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['color'].setValue(this.editData.color);

    }

  }


  productForm !: FormGroup;
  actionbtn: string = "Save"
  addProduct() {
    if (!this.editData) {
      console.log(this.productForm.value)
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("Product added successfully");
              this.productForm.reset();
              this.deref.close();
            },
            error: () => {
              alert("Error while adding the product")
            }
          })
      }
    } else {
      if (this.productForm.valid) {
        this.updateProduct();
      } else {
        alert('Fill All The Field')
      }

    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product updated");
          this.productForm.reset();
          this.deref.close('update');
        },
        error: () => {
          alert('Error while updating');
        }
      })
  }





}
