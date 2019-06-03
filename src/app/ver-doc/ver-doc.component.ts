import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { Documento } from '../../documento/Documento';
import {MatIconModule} from '@angular/material/icon';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RestService } from '../rest.service';


@Component({
  selector: 'app-ver-docs',
  templateUrl: './ver-doc.component.html',
  providers: [NgbModalConfig, NgbModal,RestService],
  styleUrls: ['./ver-doc.component.css']
})
export class VerDocComponent implements OnInit {

  documento: Documento;
  elementType : 'url' | 'canvas' | 'img' = 'url';



  hash:any;
  usuario:any;
  documentosJson : Documento[];
  constructor(private rest: RestService, private route: ActivatedRoute,private router: Router,config: NgbModalConfig, private modalService: NgbModal,) {

    //route.params.subscribe(params => {this.key = params['key'];});
    console.log("const");
    route.params.subscribe(params => {this.hash = params['hash'];});
    route.params.subscribe(params => {this.usuario = params['usuario'];});
    this.documento = new Documento();
    this.documentosJson = [];
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

  openModal(content){
    this.modalService.open(content, { centered: true, size:'sm' });
  }

  redireccion(){
    this.router.navigateByUrl(`${'menu'}/${this.usuario}`);
  }
}
