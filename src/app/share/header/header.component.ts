import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario?:Usuario;

  constructor(private _usuarioSvc:UsuarioService) {
    this.usuario=_usuarioSvc.usuario
   }
  ngOnInit(): void {

  }
  logout= ()=>{
    this._usuarioSvc.logout();
    
  };
  
}
