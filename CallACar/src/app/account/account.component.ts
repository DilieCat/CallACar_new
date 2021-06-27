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

  gaveConsent: boolean;
  public accountForm: FormGroup

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (localStorage.getItem("UserConsent") == "false") {
      this.gaveConsent = false;
    } else {
      this.gaveConsent = true;
    }
    this.accountForm = new FormGroup({
      name: new FormControl(localStorage.getItem("UserName"), Validators.required),
      age: new FormControl(localStorage.getItem("UserAge"), Validators.required),
      homeAddress: new FormControl(localStorage.getItem("UserAddress"), Validators.required),
      consent: new FormControl(this.gaveConsent, Validators.required)
    });
  }

   
  

  //TODO make an update function for the user.
  onSubmit(){
    this.userService.updateUser(localStorage.getItem("UserId"),this.accountForm.getRawValue()).subscribe((res: any) => {
      console.log("Succesfully updated user" + res.name + res.age + res.homeAddress);
    },
    (error) => {
      this.userService.getUserById(localStorage.getItem("UserId")).subscribe((res: any) => {
        localStorage.removeItem("UserAddress");
        localStorage.removeItem("UserAge");
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserConsent");
        localStorage.setItem("UserAddress", res.homeAddress);
        localStorage.setItem("UserName", res.name);
        localStorage.setItem("UserAge", res.age.toString());
        localStorage.setItem("UserConsent", res.consent.toString());
      })
    });
    
    // (error) => {
    //   console.error("Error caught in the update user");
    // });
  }
}
