import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any = '';
  password: any = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private loading: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.router.navigate(['/register']);
  }

  login(form: NgForm) {
    this.loading.present();
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast('Logged In');
      },
      error => {
        console.log(error);
        this.loading.dismiss();
      },
      () => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }
}
