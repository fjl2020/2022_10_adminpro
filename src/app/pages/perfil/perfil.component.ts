import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario?:Usuario;
  public perfilForm:FormGroup= this.fb.group({
    nombre : [this.usuario?.nombre,Validators.required],
    email : [this.usuario?.email,[Validators.required,Validators.email]]
  });  
  public imagenSubir?:File;
  public imgTemp?:any=null;
  constructor(private fb:FormBuilder,private _usuarioSvc:UsuarioService,
    private fileUploadSvc:FileUploadService) {
    this.usuario=this._usuarioSvc.usuario
   }

  ngOnInit(): void {
    this.perfilForm.get('nombre')?.setValue(this._usuarioSvc.usuario?.nombre )
    this.perfilForm.get('email')?.setValue(this._usuarioSvc.usuario?.email )
}
actualizarPerfil=()=>{
  console.log(this.perfilForm);
  this._usuarioSvc.actualizarPerfil(this.perfilForm.value).subscribe((resp:any)=>{
    console.log(resp);
    // this.usuario!.nombre=resp.usuario.nombre
    // this.usuario!.email=resp.usuario.email
    const {email,nombre} = this.perfilForm.value //resp.usuario
    this.usuario!.nombre=nombre
    this.usuario!.email=email
    Swal.fire('Guardado', 'cambios fueron guardados','success')
  },(err)=>{
    const msg_error=err.error.msg
    console.log(msg_error);
    Swal.fire('Error',msg_error,'error')
    
  });
  
}
cambiarImagen (evento:any){
  this.imagenSubir=evento.target.files[0]
  // console.log(this.imagenSubir);
  if (!this.imagenSubir)
  {
    this.imgTemp=this.imagenSubir
    return

  }
  
  const reader = new FileReader();
  reader.readAsDataURL(this.imagenSubir )
  reader.onloadend=()=>{
    this.imgTemp=reader.result;
  }

  
}
subirImagen()
{
  if (this.imagenSubir && this.usuario)
  {
    this.fileUploadSvc
    .actualizarFoto(this.imagenSubir,'usuarios',this.usuario?.uid||'')
    .then(img=>{
      if (this.usuario) this.usuario.img=img
      Swal.fire('Guardado', 'La imagen fue guardada','success')
      }
      ).catch(err=>{
        Swal.fire('Error','La imagen no se pudo subir','error')
      })}
  }
} 
