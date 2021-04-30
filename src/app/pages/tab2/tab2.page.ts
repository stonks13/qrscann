import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataService) {}

  abrirRegistro(registro){
    this.dataLocal.abrirRegistro(registro);
  }

  enviarCorreo(){
    this.dataLocal.enviarCorreo();
  }
}
