import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  getSelectorHTML(page: string): string {
    return `
      <div class="selector">
        [<span class="highlight">${page.toUpperCase()}</span>]
      </div>
    `;
  }
}
