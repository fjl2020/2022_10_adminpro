import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

import { UsuarioService } from '../../../services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Usuario } from '../../../../models/usuario.model';
import { Hospital } from 'src/models/hospital.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {
  public totalUsuarios: number=0;
  public usuarios: Usuario[]=[]
  public usuariosTmp: Usuario[]=[]
  public imgSubs?:Subscription;
  public desde:number=0;
  public cargando:boolean =true;
  constructor(private usuarioSvc:UsuarioService,
    private busquedaSvc:BusquedasService,
    private modalImageSvc:ModalImagenService) { }

  ngOnInit(): void {
      this.cargarUsuarios()
      this.imgSubs=this.modalImageSvc.nuevaImagen
        .pipe(delay(100))
        .subscribe(img=>this.cargarUsuarios())
  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  cargarUsuarios(){
    this.cargando=true;
    this.usuarioSvc.cargarUsuarios(this.desde).subscribe(({total,usuarios}) =>
    {
      this.totalUsuarios= total
        this.usuarios= usuarios
        this.usuariosTmp = usuarios
      this.cargando=false;
    });
  }
  cambiarPagina(valor:number){
    this.desde+=valor;
    if (this.desde <0 ){
      this.desde=0
    } else if (this.desde >this.totalUsuarios){
      this.desde-=valor;
    }
    this.cargarUsuarios()
  }
  buscar(termino:string='')
  {
    if (termino.trim().length!=0)
    {

      this.busquedaSvc.buscar('usuarios',termino)
      .subscribe((resp:any[]) =>
        {

        this.usuarios=resp
        });


    }else
    {
      this.usuarios=this.usuariosTmp
    }
  }
  eliminarUsuario(usuario:Usuario){

    if (usuario.uid===this.usuarioSvc.usuario?.uid){
      Swal.fire('Error','No puede borrarse a si mismo')
      return
    }


    Swal.fire({
      title: 'Esta seguro de borrar?',
      text: "Está a punto de borrar el usuario "+usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioSvc.eliminarUsuario(usuario.uid||'').subscribe((resp:any)=>{

          if (resp.ok==true){
            this.cargarUsuarios()
            Swal.fire(
              'Usuario borrado!',
              `El usuario ${usuario.nombre} se ha borrado.`,
              'success'
            )
          }})
      }
    })
  }
  checkSameUser(usuario:Usuario){
    return usuario.uid!==this.usuarioSvc.uid
  }
  cambiarRole(usuario:Usuario){
    console.log(usuario );
    this.usuarioSvc.guardarUsuario (usuario).subscribe(resp=>{
      console.log(resp);

    },error=>{
      console.log(error);

    })

  }
  abrirModal(usuario:Usuario){
    // console.log(usuario);
    this.modalImageSvc.abrirModal('usuarios',usuario.uid,usuario.img)

  }
}
