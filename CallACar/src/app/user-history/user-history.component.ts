import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';
import { OrderService } from '../shared/service/order.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  public orders: Order[]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((res: Order[]) => {
      this.orders = res;
    })
  }

}
