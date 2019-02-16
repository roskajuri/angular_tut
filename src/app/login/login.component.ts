import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;
  loading: boolean;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onLogin() {
    this.loading = true;
  }
  // goHome() {
  //   this.router.navigate(['/home']);
  //   console.log('clicked');
  // }
}
