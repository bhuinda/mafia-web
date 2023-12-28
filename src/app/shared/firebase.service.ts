import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly firestore = inject(Firestore);
  private roles$ = collectionData(collection(this.firestore, 'roles')) as Observable<any>;
  private locale$ = collectionData(collection(this.firestore, 'resources/locale/en-US')) as Observable<any>;

  get roles () {
    return this.roles$;
  }

  get locale () {
    return this.locale$;
  }
}
