import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { DeadlineService } from '../services/deadline.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'countdown-timer',
  imports: [],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent {
  public secondsLeft: number = 0;
  public errorMsg: string = '';

  constructor(private deadlineService: DeadlineService,
    @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    // Prevent the api call from running at build time
    if (isPlatformBrowser(this.platformId)) {
      this.errorMsg = '';
      this.deadlineService.getDeadline().subscribe(
        (secondsLeft) => {
          this.secondsLeft = secondsLeft;
          // Start counting down to the deadline
          this.countdownToDeadline();
        },
        (error) => {
          this.errorMsg = error.message || 'Some error occurred, plz refresh page to try again';
        }
      );
    }
  }

  countdownToDeadline() {
    interval(1000)
      .pipe(takeWhile(() => this.secondsLeft > 0)) // Stop when `secondsLeft` reaches 0
      .subscribe(() => {
        this.secondsLeft--;
      });
  }

}
