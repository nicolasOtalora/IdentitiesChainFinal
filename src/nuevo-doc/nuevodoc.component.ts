import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from '../app/util/web3.service';
import {RestService } from '../app/rest.service';
import { Documento } from 'src/documento/Documento';
import { User } from 'src/registry/user';

@Component({
  selector: 'nuevodoc',
  templateUrl: './nuevodoc.component.html',
  styleUrls: ['./nuevodoc.component.css']
})
export class NuevoDocComponent implements OnInit{



  documentosJson : Documento[];
  usuario : User;
  adr:any;
  constructor(private rest: RestService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {this.adr = params['usuario'];});
    this.documentosJson = [];
    this.usuario = new User();
    this.getAllDocumentos();
    this.getUser();
  }

  ngOnInit():void {

  }
  getUser(){
    console.log("adr");
    console.log(this.adr);
    this.rest.getUsuario(this.adr).subscribe((data: any) => {
      console.log("get User");
      console.log(data);
      this.usuario.usuario = data[0].usuario;
      this.usuario.contrasena = data[0].contrasena;
      this.usuario.documentos = data[0].documentos;
      this.usuario.permisos = data[0].permisos;

    });
  }
  getAllDocumentos(){
    this.rest.getAllDocumentos(this.adr).subscribe((data: any) => {
      // console.log(data);
      this.documentosJson = data;
    });

  }

  public alert(){
    alert("Documento registrado correctamente!");
    var list= document.getElementsByClassName("input");
    for (var i = 0; i < list.length; i++) {
      (<HTMLInputElement>list[i]).value = "";
    }
  }
  createDoc(nombre: string, url: string, hash: string){
    let documento = new Documento();
    documento.nombre = nombre;
    documento.url = url;
    documento.hash = hash;
    this.usuario.documentos.push(documento);
    this.rest.updateUser(this.usuario.usuario,this.usuario).subscribe((result) => {

    }, (err) => {
      console.log(err);
    });
  }




  redireccionar(key){
    //let route = this.router.config.find(r => r.path === 'menu');
    //route.data =  key;    // START: One way of using routerLink
    this.router.navigateByUrl(`${'menu'}/${this.adr}`);
  }

}
