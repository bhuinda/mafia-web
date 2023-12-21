import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firestore = inject(Firestore)
  private chat$ = collectionData(collection(this.firestore, 'chat')) as Observable<any>;

  get chat() {
    return this.chat$;
  }

  getMessages() {
    return collectionData(collection(this.firestore, 'chat'));
  }

  sendMessage(text: string) {
    addDoc(collection(this.firestore, 'chat'), {
      timestamp: new Date().toISOString(),
      user: 'Dummy',
      text: text,
    });
  }
}
