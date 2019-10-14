import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { environment } from 'src/environments/environment';

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
    private menu: MenuController,
    private barcodeScanner: BarcodeScanner,
    private authService: AuthService,
    private navCtrl: NavController,
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
    console.log(environment.production);
    console.log(environment.API_URL);
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
