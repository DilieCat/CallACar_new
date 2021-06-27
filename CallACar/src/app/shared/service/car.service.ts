import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models/Car'
import { User } from 'src/app/models/User';
import { History } from '../../models/History'



@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = environment.apiBaseUrl + 'cars'

  constructor(private http: HttpClient) { }

  getCars() : Observable<Car[]>{
    return this.http.get<Car[]>(this.url + '/available')
  }

  getCarById(_id) : Observable<Car>{
    return this.http.get<Car>(environment.apiBaseUrl + 'car' + _id);
  }

  getCarHistory(user: User) : Observable<History[]>{
    //write a post http request that returns the history of a user
    return 
  }
}
