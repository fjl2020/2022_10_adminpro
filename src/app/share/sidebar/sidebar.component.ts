import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { SliderbarService } from '../../services/sliderbar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[]
  public usuario?:Usuario;
  constructor(private slideSvc:SliderbarService,private _usuarioSvc:UsuarioService) {
    this.menuItems=this.slideSvc.menu
    this.usuario=_usuarioSvc.usuario
  }

  ngOnInit(): void {
    
    
  
  }

}
