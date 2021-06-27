import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }

    this.userService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe((res: any) => {
      console.log(res.user._id);
      localStorage.setItem("UserName", this.loginForm.value.name);
      localStorage.setItem("UserId", res.user._id);
      this.router.navigate(['/']);
      console.log("Succesvol ingelogd!");
    })
  }

}
