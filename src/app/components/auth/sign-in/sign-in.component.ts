import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth';
import { NgClass } from '@angular/common';
import { subscribeOnce } from '@app/shared/helpers/subscribeOnce';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
})
export class SignInComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  signInSubscription: Subscription;
  signInFailed = false;
  signInError = {
    header: 'Sign in attempt failed',
    message: 'Email/password is incorrect.'
  };

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  formSubmitted = false;
  formErrors = [
    {
      control: 'email',
      message: 'Email must be valid.'
    },
    {
      control: 'password',
      message: 'Password must be at least 6 characters long.'
    }
  ];

  onSubmit(email: string, password: string): void {
    if (this.form.invalid) {
      this.formSubmitted = true;
      return;
    }

    subscribeOnce(this.auth.signIn(email, password), {
      next: () => {
        this.signInFailed = false;
        this.formSubmitted = false;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.signInFailed = true;
        this.formSubmitted = true;
      }
    });
  }
}
