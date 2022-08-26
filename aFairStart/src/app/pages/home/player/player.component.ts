import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  @Input() activeBookingStart;
  @Input() activeBookingEnd;
  @Input() leftTime;
  countdownConfig: CountdownConfig;
  constructor(private router: Router) { }

  ngOnInit() {
    this.countdownConfig = { leftTime: this.leftTime, demand: false, format: 'hh:mm' };
  }

}
