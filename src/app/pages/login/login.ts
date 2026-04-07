import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const data = this.loginForm.value;

    this.http
      .get<any[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
      .subscribe({
        next: (users) => {
          this.loading = false;

          if (users.length > 0) {
            localStorage.setItem('token', 'token-gia-he-thong');
            localStorage.setItem('email', users[0].email);

            alert('Đăng nhập thành công!');
            window.location.href = '/';
          } else {
            this.error = 'Sai email hoặc mật khẩu!';
          }
        },
        error: () => {
          this.loading = false;
          this.error = 'Lỗi kết nối Server!';
        },
      });
  }
}
