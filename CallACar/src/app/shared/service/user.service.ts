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
export class UserService {
  private url = environment.apiBaseUrl + 'user'

  constructor(private http: HttpClient) { }
  
  getOneUser(user: User) : Observable<User>{
    return this.http.post<User>(this.url + '/active', {id: user._id})
  }
}
