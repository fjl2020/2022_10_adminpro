import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private _usuarioSvc:UsuarioService) { }

  ngOnInit(): void {

  }
  logout= ()=>{
    this._usuarioSvc.logout();
    
  };

}
