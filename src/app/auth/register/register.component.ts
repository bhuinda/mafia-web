import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class RegisterComponent implements OnDestroy {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registrationSubscription: Subscription;
  registrationFailed = false;
  registrationFailedDuplicateEmail = false;
  formSubmitted = false;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(email: string, password: string) {
    if (this.form.invalid) {
      this.formSubmitted = true;
      return;
    }

    this.registrationSubscription = this.auth.register(email, password).subscribe({
      next: () => {
        this.registrationFailed = false;
        this.formSubmitted = false;

        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.formSubmitted = true;

        if (error.code === 'auth/email-already-in-use') {
          this.registrationFailed = false;
          this.registrationFailedDuplicateEmail = true;
        } else {
          this.registrationFailed = true;
          this.registrationFailedDuplicateEmail = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
