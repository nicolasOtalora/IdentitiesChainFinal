import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {RestService } from '../app/rest.service';
import { User } from 'src/registry/user';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RestService],

})
export class LoginComponent implements OnInit {


  usuario : User;

  constructor(private rest: RestService, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    this.usuario = new User();

  }

  ngOnInit():void {


  }

  logIn(user: string, password: string, content){
    var flag = false;
    //
    //
    // if(flag == false){
    //   this.modalService.open(content, { centered: true, size:'sm' });
    // }
    this.rest.getUsuario(user).subscribe((data: any) => {
      console.log("get User");
      console.log(data);
      if(data.length != 0){
        this.usuario.usuario = data[0].usuario;
        this.usuario.contrasena = data[0].contrasena;
        this.usuario.documentos = data[0].documentos;
        this.usuario.permisos = data[0].permisos;
        if(this.usuario.usuario === user && this.usuario.contrasena === password){
          flag = true;
          this.router.navigateByUrl(`/menu/${this.usuario.usuario}`);
        }
      }
      if(flag == false){
        this.modalService.open(content, { centered: true, size:'sm' });
      }
    });

  }


}
