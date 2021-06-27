import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/Car';
import { Order } from '../models/Order';
import { CarService } from '../shared/service/car.service';
import { OrderService } from '../shared/service/order.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  public cars: Car[]
  public plannerForm: FormGroup
  text: string = "";

  constructor(private carService: CarService, private orderService: OrderService) { }

  ngOnInit() {
    this.carService.getCars().subscribe((data: Car[]) => {
      this.cars = data
    });
    this.plannerForm = new FormGroup({
      start: new FormControl("", Validators.required),
      end: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      car: new FormControl("", Validators.required),
    })
  }

  onSubmit() {
    let time: string = this.getCurrentTime();
    this.orderService.postOrder(this.plannerForm.getRawValue()).subscribe((res: any) => {
      console.log("Order created");
      this.text = "Je wordt benaderd als je auto vertrekt!"
    });
  }

  getCurrentTime() {
    var current = new Date();
    return current.toLocaleTimeString()
  }
}
