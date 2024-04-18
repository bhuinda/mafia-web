import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '@app/shared/models/user';
import { UserService } from '@app/shared/services/user';
import { UserInfoService } from '@app/shared/services/user-info';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [DatePipe],
    standalone: true
})
export class ProfileComponent implements OnInit, OnDestroy {
  math = Math;

  user: User;
  userService = inject(UserService);
  userSubscription: Subscription;

  userInfo: any;
  userInfoService = inject(UserInfoService);
  userInfoSubscription: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
    this.userInfoSubscription = this.userInfoService.userInfo$.subscribe(userInfo => this.userInfo = userInfo);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
  }
}
