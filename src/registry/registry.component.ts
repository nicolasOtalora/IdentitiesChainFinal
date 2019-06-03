import { Component, OnInit, Input } from '@angular/core';
import { User } from './user';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from '../app/util/web3.service';
import { Router } from '@angular/router';
import {RestService } from '../app/rest.service';

@Component({
  selector: 'app-registry',
  templateUrl: 'registry.component.html',
  providers: [NgbModalConfig, NgbModal, RestService],
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {


  public same = true;

  @Input() userName: string;
  @Input() password: string;
  @Input() password2: string;

  constructor(config: NgbModalConfig,private rest: RestService, private modalService: NgbModal,private router: Router) {
  }

  ngOnInit(): void {

  }

  onChanges(){
    if(this.password != this.password2){
      this.same = false;
    }else{
      this.same = true;
    }
  }

  addUser(user: string, pass: string, pass2: string, content){
    var usuario ="";
    let us = new User();
    us.usuario = user;
    if(pass == pass2){
      us.contrasena = pass;
      this.rest.addUser(us).subscribe((result) => {
        console.log(result);

        this.userName= '';
        this.password = '';
        this.password2 = '';

        this.modalService.open(content, { centered: true, size:'sm' });
        this.router.navigateByUrl(`menu/${us.usuario}`);

      }, (err) => {
        console.log(err);
      });

    }
  }

}
