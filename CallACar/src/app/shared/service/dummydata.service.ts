import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DummydataService {

  private url = environment.apiBaseUrl + 'user'

  constructor(private http: HttpClient) { }
  
  getDummyUser() : Observable<User>{
    return this.http.post<User>(this.url + '/active', {name: 'Dilie'})
  }
}
