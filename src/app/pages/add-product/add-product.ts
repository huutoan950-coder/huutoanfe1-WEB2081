import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './add-product.html',
})
export class AddProduct {
  productForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: [''],
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  submitForm() {
    if (this.productForm.invalid) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const data = this.productForm.value;

    this.productService.create(data).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Thêm sản phẩm thành công';
        this.productForm.reset({ price: 0 });
      },
      error: () => {
        this.loading = false;
        this.error = 'Có lỗi xảy ra khi kết nối Server';
      },
    });
  }
}
