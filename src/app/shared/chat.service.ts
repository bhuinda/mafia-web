import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, WithFieldValue, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firestore: Firestore = inject(Firestore);
  chat$: Observable<any[]>;
  chatCollection = collection(this.firestore, 'chat');

  constructor() {
    const chatCollection = collection(this.firestore, 'chat')
    this.chat$ = collectionData(chatCollection);
  }

  sendMessage(message: WithFieldValue<DocumentData>) {
    addDoc(this.chatCollection, message);
  }

  get messages() {
    return this.chat$;
  }
}
