import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Car } from 'src/app/models/Car';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url = environment.apiBaseUrl + 'session'
  constructor(private http: HttpClient) { }

  postSession(user: User, car: Car, startLocation: string, endLocation: string){
    return this.http.post(this.url, {userId: user._id, carId: car._id, startLocation: startLocation, endLocation: endLocation})
  }

  stopSession(user: User){
    return this.http.post(this.url + '/endSession/' + user._id, {})
  }

}
