import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, getDocs} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly firestore = inject(Firestore);
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

  // TO-DO: Change deleteMessages() to use cloud functions to incur less read/write costs on Firebase
  deleteMessages() {
    getDocs(collection(this.firestore, 'chat'))
      .then((data) => {
        data.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      }
    );
  };
}

// TO-DO: Refactor so multiple chat instances can be created; currently, every method refers to the same chat object
