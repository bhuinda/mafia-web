import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

interface Callback<T> {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
}

export function subscribeOnce<T>(
  observable: Observable<T>,
  callbacks?: Callback<T>
): void {
  observable.pipe(first()).subscribe(callbacks);
}
