import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StoryService } from '../../services/story';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-story',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-story.html',
})
export class AddStory {
  addForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private router: Router,
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      views: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      genre: [''],
      year: [2026],
    });
  }

  get name() {
    return this.addForm.get('name');
  }
  get author() {
    return this.addForm.get('author');
  }
  get views() {
    return this.addForm.get('views');
  }

  submitForm() {
    if (this.addForm.invalid) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const data = this.addForm.value;

    this.storyService.create(data).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Thêm truyện thành công! Đang chuyển trang...';

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1000);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Có lỗi xảy ra khi kết nối Server: ' + err.message;
      },
    });
  }
}
