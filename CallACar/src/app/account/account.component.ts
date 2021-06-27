import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  public accountForm: FormGroup = new FormGroup({
    name: new FormControl(localStorage.getItem("UserName"), Validators.required),
    age: new FormControl(localStorage.getItem("UserAge"), Validators.required),
    homeAddress: new FormControl(localStorage.getItem("UserAddress"), Validators.required),
  });
  

  //TODO make an update function for the user.
  // onSubmit(){
  //   this.userService.updateUser().subscribe((res: User) => {

  //   })
  // }
}
