import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notify$ = new BehaviorSubject<string | null>(null)

  handleError(message: string) {
    this.notify$.next(message)
  }

}
