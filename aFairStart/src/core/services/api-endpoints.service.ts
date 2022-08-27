// Angular Modules
import { Injectable, Query } from '@angular/core';
import { ImportBooking } from 'src/app/shared/classes/bookings';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';
import { UrlBuilder } from 'src/app/shared/classes/url-builder';
import { Constants } from '../config/constants';

@Injectable()
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private constants: Constants
  ) { }
  /* #region URL CREATOR */
  // URL
  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT :
        this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }

  public getAllMockUsers(): string {
    return this.createUrl('users', true);
  }

  public getAllMockDevices(): string {
    return this.createUrl('devices', true);
  }



  public getAllBookings(): string {
    return this.createUrl('bookings');
  }

  public getDevices(deviceType: string): string {
    return this.createUrlWithQueryParameters('devices', (qs: QueryStringParameters) => {
      qs.push('type', deviceType);
    });
  }

  public postBooking(): string {
    return this.createUrl('bookings');
  }

  public getBookingById(id: number): string {
    return this.createUrlWithPathVariables('bookings', [id]);
  }

  public getCurrentBooking(): string {
    return this.createUrlWithQueryParameters('bookings', (qs: QueryStringParameters) => qs.push('date', "true"));
  }
  public getDeviceById(id: number): string {
    return this.createUrlWithPathVariables('devices', [id]);
  }

  public putDeviceById(id: number): string {
    return this.createUrlWithPathVariables('devices', [id]);
  }

  public getUsersByUsername(username: string) {
    return this.createUrlWithPathVariables('users', [username]);
  }

  public putUsersByUsername(username: string) {
    return this.createUrlWithPathVariables('users', [username]);
  }

  public putSignOn(id: number) {
    return this.createUrlWithPathVariables('bookings', [id]);
  }

  public putSignOff(id: number) {
    return this.createUrlWithPathVariables('bookings', [id]);
  }

  public getLogin() {
    return this.createUrl('users/login');
  }

}