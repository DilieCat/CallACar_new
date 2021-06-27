import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../shared/service/car.service';
import { Car } from '../models/Car'
import { OrderService } from '../shared/service/order.service';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { ToastService } from '../shared/service/toast.service';
import { DummydataService } from '../shared/service/dummydata.service';
import { UserService } from '../shared/service/user.service';
import { SessionService } from '../shared/service/session.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //properties
  @Input()  size: number | string;
  public cars: Car[]
  public carSelectorVisible: string = 'none'
  public orderButtonVisible: string = 'none'
  public orderCarToHomeVisible: string = 'inline'
  public orderCarToAdressVisible: string = 'inline'
  public noLicenseText: string = 'none'
  public addressFormVisible: string = 'none'
  public activeText: string = 'none'
  public stopSessionButton: string = 'none'
  public selectedCar: Car
  public chosenAddress: string
  public address: string
  public user: User
  time = {hour: 13, minute: 30};

  //Dummy data


  constructor(public carService: CarService, public orderService: OrderService, public toastService: ToastService, public dummyDataService: DummydataService, public userService: UserService, public sessionService: SessionService) { }

  orderToHome(){
    this.showButtons()
    this.carSelectorVisible = 'inline'
    this.chosenAddress = this.user.homeAddress
  }

  orderToAddress(){
    this.showButtons()
    this.addressFormVisible = 'inline'
    this.carSelectorVisible = 'inline'
  }

  showButtons(){
    this.orderCarToHomeVisible = 'none'
    this.orderCarToAdressVisible = 'none'
    this.orderButtonVisible = 'inline'
  }

  createOrder(){
    let time: string = this.getCurrentTime()
    let order: Order = new Order(this.user._id, this.chosenAddress, 'Statenplein', time, '18:00', this.selectedCar._id, 25, 22)
    console.log(this.user._id)
    console.log(this.user)
    console.log(order)
    console.log(this.user.homeAddress)
    console.log(this.chosenAddress)
    this.sessionService.postSession(this.user, this.selectedCar, this.chosenAddress, 'Oost breda')
    this.activeState()
  }

  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  getCurrentTime(){
    var current = new Date();
    return current.toLocaleTimeString()
  }

  ngOnInit() {
      const id = localStorage.getItem("UserId");
      this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
      localStorage.setItem("UserAge", data.age.toString());
      localStorage.setItem("UserAddress", data.homeAddress);
      localStorage.setItem("UserConsent", data.consent.toString());
      localStorage.setItem("UserAdmin", data.admin.toString());
      console.log("The data:");
      console.log(data);
      if(data.activeCar) return this.activeState();
      if(!data.driversLicense) return this.noLicense();
    })
    this.carService.getCars().subscribe((data: Car[]) => {
      this.cars = data
    });
  }

  stopSession(){
    console.log(this.user)
    this.sessionService.stopSession(this.user)
    this.unactiveState()
  }

  activeState(){
    this.carSelectorVisible = 'none'
    this.orderButtonVisible = 'none'
    this.orderCarToHomeVisible  = 'none'
    this.orderCarToAdressVisible = 'none'
    this.addressFormVisible = 'none'
    this.activeText = 'inline'
    this.stopSessionButton = 'inline'
  }

  unactiveState(){
    this.activeText = 'none'
    this.stopSessionButton = 'none'
    this.orderCarToHomeVisible = 'inline'
    this.orderCarToAdressVisible = 'inline'
  }

  noLicense(){
    this.carSelectorVisible = 'none'
    this.orderButtonVisible = 'none'
    this.orderCarToHomeVisible  = 'none'
    this.orderCarToAdressVisible = 'none'
    this.noLicenseText = 'inline'
  }

}

