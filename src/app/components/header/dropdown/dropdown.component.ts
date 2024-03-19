import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.visible = false;
    this.closed.emit();
  }
}
