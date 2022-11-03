import { Component, OnInit } from '@angular/core';
import { AccountsService } from './_service/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  emailValue: string;
  rules: any;
  email: any;

  constructor(private ac: AccountsService) {

  }
  ngOnInit(): void {
    var values = JSON.parse(localStorage.getItem("user"));
    this.email = values?.Email;
    if (this.email) {
      this.isLoggedIn();
    }
  }
  isLoggedIn() {
    this.ac.isLoggedIn(true)
  }

}
