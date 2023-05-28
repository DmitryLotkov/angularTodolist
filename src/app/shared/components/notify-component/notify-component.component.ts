import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Message} from "primeng/api";

@Component({
  selector: 'app-notify-component',
  templateUrl: './notify-component.component.html',
  styleUrls: ['./notify-component.component.scss']
})
export class NotifyComponentComponent implements OnInit, OnDestroy {
  notify$ = new BehaviorSubject<string | null>(null);
  messages!: Message[];
  private subscription: Subscription | undefined;
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor(private notificationService: NotificationService) {
    this.notify$ = this.notificationService.notify$;
  }

  ngOnInit() {
    this.subscription = this.notify$.subscribe((value) => {
      if (value && this.notify$.getValue()) {
        this.messages = [
          { severity: 'error', summary: 'Error', detail: value },
        ];
        this.timer = setTimeout(() => {
          this.messages = [];
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      debugger
      this.subscription.unsubscribe();
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}







