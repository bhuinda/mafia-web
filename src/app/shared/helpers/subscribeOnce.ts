import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export function subscribeOnce<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    observable.pipe(first()).subscribe({
      next: value => resolve(value),
      error: error => reject(error)
    });
  });
}
