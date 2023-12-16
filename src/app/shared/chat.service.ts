import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chat$ = collectionData(collection(this.firestore, 'chat')) as Observable<any>;

  constructor(private readonly firestore: Firestore) {}

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
