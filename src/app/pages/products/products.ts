import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

export interface Story {
  id: string;
  name: string;
  author: string;
  year: number;
  genre: string;
  image: string;
  views: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  stories: Story[] = [];
  loading = false;
  error = '';
  deletingId: string | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.loading = true;
    this.error = '';

    this.http.get<Story[]>('http://localhost:3000/stories').subscribe({
      next: (data) => {
        this.stories = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Không thể kết nối đến Server để tải dữ liệu';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteStory(id: string) {
    if (!confirm('Bạn có chắc chắn muốn xóa cuốn truyện này không?')) return;

    this.deletingId = id;
    this.http.delete(`http://localhost:3000/stories/${id}`).subscribe({
      next: () => {
        this.stories = this.stories.filter((story) => story.id !== id);
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
