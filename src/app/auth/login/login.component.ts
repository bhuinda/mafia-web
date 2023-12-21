import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loginSubscription: Subscription;
  loginFailed = false;
  formSubmitted = false;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(email: string, password: string): void {
    if (this.form.invalid) {
      this.formSubmitted = true;
      return;
    }

    this.loginSubscription = this.auth.login(email, password).subscribe({
      next: () => {
        this.loginFailed = false;
        this.formSubmitted = false;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.loginFailed = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
