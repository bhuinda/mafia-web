import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  submitted = false;
  loginFailed = false;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(email: string, password: string): void {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    this.auth.login(email, password).subscribe({
      next: () => {
        this.loginFailed = false;
        this.submitted = false;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.loginFailed = true;
      }
    });
  }
}
