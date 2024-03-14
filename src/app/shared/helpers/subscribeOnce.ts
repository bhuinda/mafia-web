import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

interface Callbacks<T> {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
}

export function subscribeOnce<T>(
  observable: Observable<T>,
  callbacks: Callbacks<T> = {}
): void {
  observable.pipe(first()).subscribe(callbacks);
}
