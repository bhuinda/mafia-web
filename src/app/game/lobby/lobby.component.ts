import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.css'],
    standalone: true,
    imports: [RouterLink, ChatComponent]
})
export class LobbyComponent {
}
