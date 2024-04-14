import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'todo';
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const timeOptions = [];

    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hourFormat = hours < 10 ? `0${hours}` : `${hours}`;
        const minuteFormat = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const timeValue = `${hourFormat}:${minuteFormat}`;

        timeOptions.push({
          label: timeValue,
          value: timeValue
        });
      }
    }

    console.log(timeOptions);

    this.authService.me()
  }
}
