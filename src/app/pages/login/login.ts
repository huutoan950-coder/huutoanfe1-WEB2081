import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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
    this.success = '';

    this.http.post<any>('http://localhost:3000/login', this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Đăng nhập thành công!';
        if (res && res.accessToken) {
          localStorage.setItem('token', res.accessToken);
        }
        setTimeout(() => {
          this.router.navigateByUrl('/products');
        }, 1500);
      },
      error: () => {
        this.loading = false;
        this.error = 'Sai email hoặc mật khẩu!';
      },
    });
  }
}
