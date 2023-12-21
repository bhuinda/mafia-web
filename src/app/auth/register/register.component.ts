import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  auth = inject(AuthService);
  fb = inject(FormBuilder);

  submitted = false;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(email: string, password: string) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.auth.register(email, password);
  }
}
