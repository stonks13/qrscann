import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Registro } from '../models/models.module';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage-angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  [x: string]: any;
  guardados: Registro[] = []

  constructor(private storage: Storage, private navController: NavController, private InAppBrowser: InAppBrowser, private file: File, private emailComposer: EmailComposer) {
    this.storage.create();
    this.cargarStorage();
  }
  
  async cargarStorage(){
    this.guardados = await this.storage.get('registros') || [];
  }

  guardarRegistro(format: string, text: string){
    this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this.navController.navigateForward('tabs/tab2');
    switch (registro.type) {
      case 'http':
        const browser = this.inAppBrowser.create(registro.text, '_system');
        break;
      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
    }
  }

  enviarCorreo() {
    const temp = [];
    const titulos: string = 'Tipo, Formato, Creado en, Texto\n';

    temp.push(titulos);
    this.guardados.forEach((element) => {
      const linea = `${element.type},${element.format},${
        element.created
      },${element.text.replace(',', ' ')}\n`;
      temp.push(linea);
    });
    this.crearArchivoFisico(temp.join(' '));
  }
  crearArchivoFisico(text: string) {
    this.file
      .checkFile(this.file.dataDirectory, 'registros.csv')
      .then((existe) => {
        return this.escribirEnArchivo(text);
      })
      .catch((err) => {
        return this.file
          .createFile(this.file.dataDirectory, 'registros.csv', false)
          .then((creado) => this.escribirEnArchivo(text))
          .catch((err2) =>
            console.log('No se ha podido crear el archivo', err2)
          );
      });
  }
  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(
      this.file.dataDirectory,
      'registros.csv',
      text
    );
    const archivo = `${this.file.dataDirectory}registros.csv`;
    let email = {
      to: 'dani.santiago@itb.cat',
      attachments: [archivo],
      subject: 'Backup de scans',
      body:
        'Aqui tienes la copia de todos los codigos escaneados <strong>Scan App</strong>',
      isHtml: true,
    };
    this.emailComposer.open(email);
  }
}
