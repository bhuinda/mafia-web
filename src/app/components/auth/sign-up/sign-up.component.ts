import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
})
export class SignUpComponent {
  // TO-DO: Add "success!" message after successful registration to AuthComponent

  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  signUpSubscription: Subscription;
  signUpFailed: boolean = false;
  signUpError = {
    header: 'signUpFailed',
    message: 'Sign up attempt failed; email/password is incorrect.'
  };

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  formSubmitted: boolean = false;
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

  onSubmit(email: string, password: string) {
    if (this.form.invalid) {
      this.formSubmitted = true;
      return;
    }

    // this.registrationSubscription = this.auth.register(email, password).subscribe({
    //   next: () => {
    //     this.registrationFailed = false;
    //     this.formSubmitted = false;

    //     this.router.navigateByUrl('/home');
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.formSubmitted = true;

    //     if (error.code === 'auth/email-already-in-use') {
    //       this.registrationFailed = false;
    //       this.registrationFailedDuplicateEmail = true;
    //     } else {
    //       this.registrationFailed = true;
    //       this.registrationFailedDuplicateEmail = false;
    //     }
    //   }
    // });
  }
}
