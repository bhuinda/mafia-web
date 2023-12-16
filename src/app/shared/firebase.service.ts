import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  roles$ = collectionData(collection(this.firestore, 'roles')) as Observable<any>;
  locale$ = collectionData(collection(this.firestore, 'resources/locale/en-US')) as Observable<any>;

  constructor(private readonly firestore: Firestore) {}

  get roles () {
    return this.roles$;
  }

  get locale () {
    return this.locale$;
  }
}
