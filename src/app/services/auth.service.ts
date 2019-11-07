import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) { }

  login(email: string, password: string) {
    console.log('environment.API_URL', environment.API_URL);
    return this.http.post(environment.API_URL + 'api/login',
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
    return this.http.post(environment.API_URL + 'api/register',
      formData
    );
  }

  logout() {
    console.log('this.token', this.token);
    // const headers = new HttpHeaders({
    //   Authorization: this.token.token_type + ' ' + this.token.access_token
    // });
    this.storage.remove('token');
    return this.http.get(environment.API_URL + 'api/logout')
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
    return this.http.get(environment.API_URL + 'api/user')
      .pipe(
        tap(user => {
          return user;
        })
      );
  }

  decodeQR(formData: any = {}) {
    return this.http.post(environment.API_URL + 'api/decode-qr',
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
