import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Documento } from '../documento/Documento';

import {RestService } from '../app/rest.service';
import { User } from 'src/registry/user';


@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [RestService],
})
export class MenuComponent implements OnInit {

  public isCollapsed = true;
  adr:any;
  documentosJson: {};
  documentos : Documento[];



  constructor(private route: ActivatedRoute,private router: Router, private rest : RestService) {
    route.params.subscribe(params => {this.adr = params['adr'];});

    this.documentos = [];
    this.documentosJson = [];
   }

  ngOnInit() {

  }
  getAllDocumentos(){
    this.rest.getAllDocumentos(this.adr).subscribe((data: {}) => {
      console.log(data);
      this.documentosJson = data;
    });
  }
}
