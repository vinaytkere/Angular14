import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from '../_service/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  email = '';
  message = '';
  isInvalid: boolean = false;

  constructor(private formBuilder: FormBuilder, private ac: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.ac.currentMessage.subscribe(m => this.email = m);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.ac.login(this.loginForm.value).subscribe(result => {
        localStorage.setItem('user', JSON.stringify(result));
        var values = JSON.parse(localStorage.getItem("user"));
        this.email = values?.Email;
        if (this.email) {
          this.isInvalid = false;
        }
        else {
          this.isInvalid = true;
        }
        this.setEmail();
        this.isLoggedIn();
        this.router.navigate(['./tasks']);
      }, error => {
        this.isInvalid = true;
        console.log(error)
      })
    }
  }

  setEmail() {
    this.ac.changeMessage(this.email);
  }
  isLoggedIn() {
    this.ac.isLoggedIn(true)
  }
}
