import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    public loading: LoadingService,
    private barcodeScanner: BarcodeScanner,
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
      prompt: 'Place a barcode inside the scan area',
    };
  }

  ngOnInit() {
    this.getUser();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  getUser() {
    this.loading.present();
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }, err => {

      }, () => {
        this.loading.dismiss();
      }
    );
  }

  scanCode() {
    this.barcodeScanner
      .scan(this.barcodeScannerOptions)
      .then(barcodeData => {
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log('scanCode Error', err);
      });
  }

  runData() {
    this.loading.present();
    this.authService.decodeQR(this.scannedData).subscribe(
      data => {
        console.log('runData data', data);
        this.scannedData = {};
      },
      error => {
        console.log('runData error', error);
        this.scannedData = {};
      },
      () => {
        this.loading.dismiss();
      }
    );
  }

}
