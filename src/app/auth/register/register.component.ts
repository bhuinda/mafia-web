import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registrationSubscription: Subscription;
  registrationFailed = false;
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
        this.registrationFailed = true;
        this.formSubmitted = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
