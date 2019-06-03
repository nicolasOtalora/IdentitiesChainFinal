import {Documento } from '../documento/Documento';
import {Permiso } from '../app/permisos/Permiso';

export class User{
  id: string;
  usuario: string;
  contrasena: string;
  documentos: Documento [];
  permisos: Permiso[];
  constructor(){
    this.documentos = [];
    this.permisos = [];
  }

}
