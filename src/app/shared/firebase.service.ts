import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  roles$: Observable<any[]>;
  locale$: Observable<any[]>;

  constructor() {
    const roleCollection = collection(this.firestore, 'roles')
    this.roles$ = collectionData(roleCollection);

    const localeCollection = collection(this.firestore, 'resources/locale/en-US')
    this.locale$ = collectionData(localeCollection);
  }

  get roles () {
    return this.roles$;
  }

  get locale () {
    return this.locale$;
  }
}
