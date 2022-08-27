import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatISO } from 'date-fns';
import { Bookings, ImportBooking } from 'src/app/shared/classes/bookings';
import { ApiEndpointsService } from 'src/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/core/services/api-http.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './createBooking.html',
  styleUrls: ['./createBooking.scss'],
})
export class CreateBookingComponent implements OnInit {

  project: string;
  //TODO Beispielname ändern 
  teamMates: string[] = new Array("Max Muster (Me)");
  timeEstimateHour: number;
  timeEstimateMinutes: number;
  dateFromDatePicker: string;

  upcomingBookings: Bookings[] = [];
  dateMin;
  teamMateInput: boolean = false;
  newTeamMate: string;
  constructor(private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService, private router: Router) { }

  ngOnInit() {
    this.dateMin = new Date(Date.now()).toISOString();
  }

  stringifyEvent(e) {
    const obj = {};
    for (let k in e) {
      obj[k] = e[k];
    }
    return JSON.stringify(obj, (k, v) => {
      if (v instanceof Node) return 'Node';
      if (v instanceof Window) return 'Window';
      return v;
    }, ' ');
  }


  public addTeamMate() {
    this.teamMateInput = true;
  }

  public saveTeamMate() {
    if (this.newTeamMate != null) {
      this.teamMates.push(this.newTeamMate);
    }
    this.newTeamMate = "";
    this.teamMateInput = false;

  }

  public cancel() {
    this.newTeamMate = "";
    this.teamMateInput = false;
  }

  public createBooking() {
    if (this.teamMates.length > 0 && this.timeEstimateHour != null && this.timeEstimateMinutes != null && this.dateFromDatePicker != null) {
      const date = this.convertDateFromDatePickerToJavaLocalDate(this.dateFromDatePicker);
      const importBooking = new ImportBooking(0, date, this.convertEstimateTimeToMinutes(this.timeEstimateHour, this.timeEstimateMinutes));

      this.apiHttpService
        .post(this.apiEndpointsService.postBooking(), JSON.stringify(importBooking))
        .subscribe(
          (data) => {
            this.router.navigate(['/working']);
          },
          (error) => {
            if (error.status == '201') { this.router.navigate(['/working']); }
          });
    }
  }



  private convertEstimateTimeToMinutes(hours: number, minutes: number): number {
    return (hours * 60 + minutes);
  }

  private convertDateFromDatePickerToJavaLocalDate(date: string): string {
    date = date.split('+')[0];
    date += ".000Z";
    console.log(date + "  " + formatISO(new Date(date)));
    return date;
  }


}
