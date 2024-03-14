import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { AuthService } from '@services/auth';
import { NgIf } from '@angular/common';
import { subscribeOnce } from '@app/shared/helpers/subscribeOnce';

@Component({
    selector: 'app-login',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SignInComponent {
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

    subscribeOnce(this.auth.signIn(email, password), {
      next: () => {
        this.loginFailed = false;
        this.formSubmitted = false;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.loginFailed = true;
        this.formSubmitted = true;
      }
    });
  }
}
