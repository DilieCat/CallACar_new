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
    this.createDatabase();
  }

  postSession(user: User, car: Car, startLocation: string, endLocation: string){
    if (!this.onlineOfflineService.isOnline) {
      this.addSessionToIndexedDb({userId: user._id, carId: car._id, startLocation: startLocation, endLocation: endLocation});
    } else {
      return this.http.post(this.url, {userId: user._id, carId: car._id, startLocation: startLocation, endLocation: endLocation}).subscribe((data) => {
        console.log(data)
      });
    }
  }

  stopSession(user: User){
    console.log('in service')
    console.log(user)
    console.log(user._id)
    if (!this.onlineOfflineService.isOnline) {
      this.addStopSessionToIndexedDb(user._id);
    } else {
    return this.http.post(this.url + '/endSession/' + user._id, {}).subscribe((data) => {
      console.log(data)
      })
    }
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    console.log(this.db)
    this.db.version(1).stores({
      sessions: 'userId,carId,startTime,endTime,startLocation,endLocation',
      stopSessions: 'id++,user'

    });
  }

  

  private addSessionToIndexedDb(session) {
    this.db.sessions
      .add(session)
      .then(async () => {
        const allItems = await this.db.sessions.toArray();
        console.log('saved sessions n DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private addStopSessionToIndexedDb(userId) {
    console.log('KLSDFJLKDSF ' + typeof userId)
    this.db.stopSessions
      .add({user: userId})
      .then(async () => {
        const allItems = await this.db.stopSessions.toArray();
        console.log('saved stop sessions in DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private async sendItemsFromIndexedDb() {
    const allSessionItems = await this.db.sessions.toArray();
  
    //Sync sessions
    allSessionItems.forEach((item) => {
      this.http.post(this.url, item).subscribe((data) => {
        console.log(data)
      });
      this.db.sessions.delete(item.userId).then(() => {
        console.log(`item ${item.userId} sent and deleted locally`);
      });
    });

    const allStopSessionItems = await this.db.stopSessions.toArray();
  
    //Sync stopSessions
    allStopSessionItems.forEach((stopItem) => {
      this.http.post(this.url  + '/endSession/' +  stopItem.user, {}).subscribe((data) => {
        console.log(data)
      });
      this.db.stopSessions.delete(stopItem.id).then(() => {
        console.log(`item ${stopItem.user} sent and deleted locally`);
      });
    });


  }

}
