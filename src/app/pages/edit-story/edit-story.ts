import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StoryService } from '../../services/story';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-story',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-story.html',
  styleUrl: './edit-story.css',
})
export class EditStory implements OnInit {
  editForm: FormGroup;
  id!: string;
  msg = { type: '', content: '' };
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: StoryService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      views: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get name() {
    return this.editForm.get('name');
  }
  get author() {
    return this.editForm.get('author');
  }
  get views() {
    return this.editForm.get('views');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe({
      next: (data: any) => {
        this.editForm.patchValue(data);
        this.cdr.detectChanges();
      },
      error: () => {
        this.showMsg('error', 'Không tìm thấy dữ liệu truyện này!');
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.service.update(this.id, this.editForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.showMsg('success', 'Cập nhật thành công! Dữ liệu đã được lưu.');
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.showMsg('error', `Lỗi hệ thống: ${err.message || 'Không thể cập nhật'}`);
        this.cdr.detectChanges();
      },
    });
  }

  showMsg(type: string, content: string) {
    this.msg = { type, content };
  }
}
