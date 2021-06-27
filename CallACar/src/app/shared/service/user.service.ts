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
  
  public getOneUser(name) : Observable<User>{
    return this.http.post<User>(this.url + '/active', {name: name})
  }

  public getUserById(_id) : Observable<User>{
    return this.http.get<User>(this.url + "/" + _id);
  }

  // public updateUser(user: User) : Observable<User> {
  //   return this.http.put<User>(this.url + user._id);
  // }

  public register(registerStuff: User) : Observable<any> {
    return this.http.post<any>(this.url + '/register', registerStuff);
  }

  public login(name: string, password: string) : Observable<User>{
    return this.http.post<User>(this.url + '/login', {name: name, password: password})
  } 
}
