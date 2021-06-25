import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/service/order.service';
import { User } from '../models/User';
import { DummydataService } from '../shared/service/dummydata.service';
import { Order } from '../models/Order';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public user: User
  public orders: Order[]

  constructor(public orderService: OrderService, public dummyService: DummydataService) { }

  ngOnInit() {
    this.dummyService.getDummyUser().subscribe(data => {
      this.user = data
      this.orderService.getUserOrder(this.user).subscribe(history => {
        this.orders = history
      })
    })
    
  }

}
