import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barcodeScanner: BarcodeScanner, private dataLocal: DataService) {}

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(!barcodeData.cancelled){
        this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text)
      }
    }).catch(err => {
      console.log('Error', err);
      //this.localData.guardarRegistro('QRCode','https://ionicframework.com/%27);
      this.dataLocal.guardarRegistro('QRCode','geo:41.4508647,2.1908592');
    })
  }

}
