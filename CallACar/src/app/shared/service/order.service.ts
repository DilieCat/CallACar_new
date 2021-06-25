import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models/Car'
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiBaseUrl + 'order'
  constructor(private http: HttpClient) { }

  postOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.url, order)
  }

  getUserOrder(user: User): Observable<Order[]>{
    return this.http.get<Order[]>(this.url + '/' + user._id)
  }

}