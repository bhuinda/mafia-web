import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  @ViewChild('commandInput') commandInput: ElementRef;

  router = inject(Router);
  auth = inject(AuthService);

  userSubscription: Subscription;
  user: any;

  commandList = [
    {
      command: '/help',
      action: () => console.log("Help command executed.")
    },
    {
      command: '/home',
      action: () => this.router.navigateByUrl('/home')
    }
  ]

  commandForm = new FormGroup({
    command: new FormControl('')
  });

  onSubmit() {
    const command = this.commandForm.get('command').value;
    const commandObj = this.commandList.find(obj => obj.command == command);

    if (commandObj) {
      commandObj.action();
    } else {
      console.error(`Command "${command}" not found.`);
    }

    this.commandForm.reset();
  }

  focusInput() {
    this.commandInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.user = this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
