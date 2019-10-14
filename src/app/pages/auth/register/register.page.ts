import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordType = 'password';
  passwordShow = false;
  Uname = '';
  Uemail = '';
  Upass = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public loading: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.router.navigate(['/login']);
  }

  togglePass() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  register(form: NgForm) {
    this.loading.present();
    this.authService.register(form.value).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          () => {
            this.loading.dismiss();
          },
          error => {
            console.log(error);
            this.loading.dismiss();
          },
          () => {
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        this.loading.dismiss();
        this.alertService.presentToast(error.error.message);
      },
      () => {

      }
    );
  }

}
