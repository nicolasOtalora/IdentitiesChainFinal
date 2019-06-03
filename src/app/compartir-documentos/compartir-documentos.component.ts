import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RestService } from '../rest.service';
import {User} from '../../registry/user';
import { Documento } from 'src/documento/Documento';
import { Permiso } from '../permisos/Permiso';

@Component({
  selector: 'app-compartir-documentos',
  templateUrl: './compartir-documentos.component.html',
  providers: [RestService],

  styleUrls: ['./compartir-documentos.component.css']
})
export class CompartirDocumentosComponent implements OnInit {


  hash: string;
  usuario : string;
  destinatario : User;
  documento: Documento;
  documentosJson : Documento[];
  constructor(private rest: RestService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {this.hash = params['hash'];});
    route.params.subscribe(params => {this.usuario = params['usuario'];});
    this.documento = new Documento();
    this.documentosJson = [];
    this.destinatario = new User();
    this.getAllDocumentos();
  }

  ngOnInit() {

  }
  getDoc(){
    console.log("getDoc");
    console.log(this.documentosJson);

    for(let doc of this.documentosJson){
      if(doc.hash === this.hash){
        this.documento = doc;
      }
    }
  }
  getAllDocumentos(){
    this.rest.getAllDocumentos(this.usuario).subscribe((data: any) => {
      // console.log(data);
      this.documentosJson = data;

      this.getDoc();
    });
  }

  compartirDoc(){
    let permiso = new Permiso();
    permiso.duenio = this.usuario;
    permiso.documentos.push(this.documento);
    this.destinatario.permisos.push(permiso);
    console.log(this.destinatario.usuario);
    this.rest.updateUser(this.destinatario.usuario,this.destinatario).subscribe((result) => {

    }, (err) => {
      console.log(err);
    });
  }
  getUser(id){
    this.rest.getUsuario(id).subscribe((data: any) => {
      console.log("get User");
      console.log(data[0].usuario);
      this.destinatario.usuario = data[0].usuario;
      this.destinatario.contrasena = data[0].contrasena;
      this.destinatario.documentos = data[0].documentos;
      this.compartirDoc();
    });
  }


  redireccion(){
    this.router.navigateByUrl(`${'menu'}/${this.usuario}`);
  }

}
