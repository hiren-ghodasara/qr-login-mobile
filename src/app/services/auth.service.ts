import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
    private toastController: ToastController
  ) { }

  login(email: string, password: string) {
    return this.http.post(this.env.API_URL + 'api/login',
      { email, password }
    ).pipe(
      tap((token: any) => {
        this.storage.setItem('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }, err => {
        console.log('Token Stored err', err);
      }),
    );
  }

  register(formData: any = {}) {
    return this.http.post(this.env.API_URL + 'api/register',
      formData
    );
  }

  logout() {
    console.log("this.token", this.token);
    // const headers = new HttpHeaders({
    //   Authorization: this.token.token_type + ' ' + this.token.access_token
    // });
    this.storage.remove('token');
    return this.http.get(this.env.API_URL + 'api/logout')
      .pipe(
        tap(data => {
          this.storage.remove('token');
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }

  user() {
    return this.http.get(this.env.API_URL + 'api/user')
      .pipe(
        tap(user => {
          return user;
        })
      );
  }

  decodeQR(formData: any = {}) {
    return this.http.post(this.env.API_URL + 'api/decode-qr',
      formData
    );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
