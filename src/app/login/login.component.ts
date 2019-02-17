import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;
  loading: boolean;
  constructor(private userService:UserService ,private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onLogin() {
    this.loading = true;
    this.userService.loginUser(this.userLogin.value).subscribe(
      response => {
        this.loading = false;
        console.log('response', response);
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
    console.log(this.userLogin.value)
  }
  // goHome() {
  //   this.router.navigate(['/home']);
  //   console.log('clicked');
  // }
}
