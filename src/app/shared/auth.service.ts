import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  header: any;

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(
        'https://common.laalsa.com/support/support/credentials/login',
        user,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        this.header = res.headers.get('x-access-token');
        this.router.navigate(['/orderdetails']);
      });
  }

  get isLoggedIn(): boolean {
    let authToken = this.header;
    return authToken !== null ? true : false;
  }

  getOrderDetails(): Observable<any> {
    console.log('geting order details')
    return this.http.get<any>(
      'https://common.laalsa.com/support/support/crm/detailedOrderDetails?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0',
      {
        headers: new HttpHeaders().set(
          'X-access-token',
          this.header 
        ),
      }
    );
  }
}
