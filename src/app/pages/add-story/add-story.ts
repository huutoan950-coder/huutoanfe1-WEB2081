import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { StoryService } from '../../services/story';

@Component({
  selector: 'app-add-story',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
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
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: [''],
      views: [0, Validators.min(0)],
    });
  }

  get title() {
    return this.addForm.get('title');
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
        this.success = 'Thêm truyện thành công';
        this.addForm.reset({ views: 0 });
      },
      error: () => {
        this.loading = false;
        this.error = 'Có lỗi xảy ra khi kết nối Server';
      },
    });
  }
}
