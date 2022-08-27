import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { BehaviorSubject } from 'rxjs';
import { ApiEndpointsService } from 'src/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/core/services/api-http.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  @Input() activeBookingStart;
  @Input() activeBookingId;
  @Input() activeBookingEnd;
  @Input() leftTime;
  countdownConfig: CountdownConfig;

  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() isSignedOn: BehaviorSubject<boolean>;

  constructor(private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService) { }

  ngOnInit() {
    this.countdownConfig = { leftTime: this.leftTime, demand: false, format: 'hh:mm' };
    console.log(this.isSignedOn);
  }
  public signOn() {
    this.apiHttpService
      .put(
        this.apiEndpointsService.putSignOn(this.activeBookingId) + '/signOn',
        null
      )
      .subscribe(
        (data) => {
          this.isSignedOn = new BehaviorSubject<boolean>(true);
        },
        (error) => {
          console.log(error.status);
        }
      );
  }

  public signOff() {
    this.apiHttpService
      .put(
        this.apiEndpointsService.putSignOff(this.activeBookingId) + '/signOff',
        null
      )
      .subscribe(
        (data) => {
          this.isSignedOn = new BehaviorSubject<boolean>(false);
          this.show = new BehaviorSubject<boolean>(false);
        },
        (error) => {
          console.log(error.status);
        }
      );
  }
}
