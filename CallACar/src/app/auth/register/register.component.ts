import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
    homeAddress: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }

    this.userService.register(this.registerForm.getRawValue()).subscribe((res: any) => {
      console.log("Succesfully registered user.");
    })
  }

}
