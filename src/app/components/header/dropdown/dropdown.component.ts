import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  router = inject(Router);

  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel)
    ).subscribe(() => {
      this.visible = false;
      this.closed.emit();
    });
  }
}
