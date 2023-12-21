import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  submitted = false;
  registrationFailed = false;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(email: string, password: string) {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    this.auth.register(email, password).subscribe({
      next: () => {
        this.registrationFailed = false;
        this.submitted = false;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.registrationFailed = true;
      }
    });
  }
}
