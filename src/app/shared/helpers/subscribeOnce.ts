import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export function subscribeOnce<T>(observable: Observable<T>): void {
  observable.pipe(first()).subscribe();
}
