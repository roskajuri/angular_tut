import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;

  constructor(private global: GlobalService, ) { }

  ngOnInit() {
    this.userSub = this.global.user.subscribe(
      me => {
        this.account = me;
        console.log('me', me)
      }
    );
  }

}
