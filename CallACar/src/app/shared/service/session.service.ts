import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Car } from 'src/app/models/Car';
import { OnlineOfflineService } from './online-offline-service.service';
import { Dexie } from 'dexie'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private db;
  private url = environment.apiBaseUrl + 'session'
  constructor(private http: HttpClient, private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);
  }

  postSession(user: User, car: Car, startLocation: string, endLocation: string){
    return this.http.post(this.url, {userId: user._id, carId: car._id, startLocation: startLocation, endLocation: endLocation})
  }

  stopSession(user: User){
    return this.http.post(this.url + '/endSession/' + user._id, {})
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    this.db.version(1).stores({
      todos: 'id,value,done'
    });
  }

}
