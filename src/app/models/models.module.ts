import { Data } from "@angular/router";

export class Registro {

  format: string;
  text: string;
  type: string;
  icon: string;
  created: Data;

  constructor(format: string, text: string) {
    this.setFormat(format);
    this.setText(text);
    this.setCreated(new Date());
    this.determinarTipo();
  }

  private determinarTipo(){
    const inicioTexto = this.text.substr(0, 4);
    switch(inicioTexto){
      case 'http':
        this.type = 'http';
        this.icon = 'globe';
        break;
      case 'geo:':
        this.type = 'geo';
        this.icon = 'pin';
        break;
      default:
        this.type = 'No reconocido';
        this.icon = 'create';
    }
  }

  getFormat(){
    return this.format;
  }
  getText(){
    return this.text;
  }
  getType(){
    return this.type;
  }
  getIcon(){
    return this.icon;
  }
  getCreated(){
    return this.created;
  }
  setFormat(format:string){
    this.format = format;
  }
  setText(text:string){
    this.text = text;
  }
  setType(type:string){
    this.type = type;
  }
  setIcon(icon:string){
    this.icon = icon;
  }
  setCreated(created:Data){
    this.created = created;
  }
}
