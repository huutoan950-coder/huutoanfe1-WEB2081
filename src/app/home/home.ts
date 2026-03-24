import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  deletingId: string | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.error = '';

    this.http.get<Product[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Không thể kết nối đến Server để tải sản phẩm';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    this.deletingId = id;
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);
        this.deletingId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Xóa thất bại!');
        this.deletingId = null;
        this.cdr.detectChanges();
      },
    });
  }
}
