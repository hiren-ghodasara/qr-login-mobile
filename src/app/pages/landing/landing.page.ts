import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private barcodeScanner: BarcodeScanner,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router
  ) {
    this.menu.enable(false);
  }



  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }

  ngOnInit() {

  }

  async register() {
    this.router.navigate(['/register']);
  }

  async login() {
    this.router.navigate(['/login']);
  }

  codeScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      // success. barcodeData is the data returned by scanner
    }).catch(err => {
      // error
    });
  }
}
