import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [],
})
export class ModelImagenComponent implements OnInit {
  public imagenSubir?: File;
  public imgTemp?: any = null;
  public usuario?: Usuario;

  constructor(
    public modalImagenSvc: ModalImagenService,
    private fileUploadSvc: FileUploadService,
    private _usuarioSvc: UsuarioService
  ) {
    this.usuario = this._usuarioSvc.usuario;
  }

  ngOnInit(): void {}
  cerrarModal(){

    this.imgTemp=null;
    this.modalImagenSvc.cerrarModal()
  }
  cambiarImagen(evento: any) {
    this.imagenSubir = evento.target.files[0];
    // console.log(this.imagenSubir);
    if (!this.imagenSubir) {
      this.imgTemp = this.imagenSubir;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }
  subirImagen() {
    const id= this.modalImagenSvc.id
    const tipo=this.modalImagenSvc.tipo
    if (this.imagenSubir && this.usuario) {
      this.fileUploadSvc
        .actualizarFoto(this.imagenSubir, 'usuarios', id || '')
        .then((img) => {
          this.cerrarModal();
          Swal.fire('Guardado', 'La imagen fue guardada', 'success');
          this.modalImagenSvc.nuevaImagen.emit(img)
               })
        .catch((err) => {
          Swal.fire('Error', 'La imagen no se pudo subir', 'error');
        });
    }

  }
}
