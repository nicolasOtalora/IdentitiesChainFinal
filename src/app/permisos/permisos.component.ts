import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permiso } from './Permiso';
import {Documento} from '../../documento/Documento';
import {RestService} from '../rest.service';


@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
  providers: [RestService],

})
export class PermisosComponent implements OnInit {


  permisosJson : Permiso[];
  usuario : string;

  constructor(private rest: RestService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {this.usuario = params['usuario'];});

    this.permisosJson = [];
    this.getAllPermisos();
  }

  ngOnInit() {

  }

  getAllPermisos(){
    this.rest.getAllPermisos(this.usuario).subscribe((data: any) => {
      console.log("all permisos")
      console.log(data);
      this.permisosJson = data;

    });
  }
  redireccion(){
    this.router.navigateByUrl(`${'menu'}/${this.usuario}`);
  }

}
