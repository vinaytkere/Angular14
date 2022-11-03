import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../_service/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private ac: AccountsService) { }
  email: any;
  user: any;
  message: string;
  ngOnInit(): void {
    //console.log(localStorage.getItem("user"));
    var values = JSON.parse(localStorage.getItem("user"));
    // this.user = JSON.parse(localStorage.getItem("user"));
    // console.log(values?.Email)
    this.ac.currentMessage.subscribe(m => this.email = m);
    this.email = values?.Email;
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  logout() {
    localStorage.setItem('user', null);
    this.ac.currentMessage;
    this.setEmail();
    this.isLoggedIn();
    this.router.navigate(['./login']);
  }
  setEmail() {
    this.ac.changeMessage(null);
  }
  isLoggedIn() {
    this.ac.isLoggedIn(false);
  }
}
