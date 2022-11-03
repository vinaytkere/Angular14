import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private email = new BehaviorSubject("");
  currentMessage = this.email.asObservable();

  private isLogged = new BehaviorSubject(false);
  isLoggedIn$ = this.isLogged.asObservable();

  constructor(private httpClient: HttpClient) { }

  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>('https://localhost:44375/register', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post<any>('https://localhost:44375/login', data);
  }
  changeMessage(message: string) {
    this.email.next(message)
  }
  isLoggedIn(message: boolean) {
    return this.isLogged.next(message);
  }
}
