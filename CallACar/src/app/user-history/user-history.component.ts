import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { OrderService } from '../shared/service/order.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  public orders: Order[]
  isAdmin: boolean;

  constructor(private orderService: OrderService, private userSerivce: UserService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((res: Order[]) => {
      this.orders = res;
    });
    if(localStorage.getItem("UserAdmin") == "false"){
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

}
