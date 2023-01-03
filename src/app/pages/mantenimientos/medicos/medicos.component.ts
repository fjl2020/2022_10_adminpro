import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = false;
  public totalMedicos: number = 0;
  public imgSubs?:Subscription;
  public medicosTmp: Medico[]=[]

  constructor( private medicoSvc: MedicosService,
    private modalImageSvc: ModalImagenService,
    private busquedaSvc:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImageSvc.nuevaImagen
        .pipe(delay(100))
        .subscribe(img=>this.cargarMedicos())
  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe()
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoSvc.cargarMedicos().subscribe((resp:Medico[])=>{
      this.medicos=resp;
      this.medicosTmp=resp;
      this.totalMedicos=resp.length
      this.cargando = false;


    });

  }

  crearMedico(){

  }
  abrirModal(medico:Medico){
    console.log(medico);

    this.modalImageSvc.abrirModal('medicos', medico._id, medico.img);
  }
  guardarMedico(medico:Medico){

  }
  eliminarMedico(medico:Medico){

    Swal.fire({
      title: 'Esta seguro de borrar?',
      text: 'Está a punto de borrar el hospital ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoSvc.borrarMedico(medico._id || '').subscribe(
          (resp) => {

            console.log(resp);
            Swal.fire(
              'Borrar',
              `Hospital ${medico.nombre} eliminado`,
              'success'
            );
            this.cargarMedicos();
          },
          (error) => {
            Swal.fire('No actualizado', error, 'error');
          }
        );
      }
    });
  }
  buscar(termino:string){
    if (termino.trim().length!=0)
    {

      this.busquedaSvc.buscar('medicos',termino)
      .subscribe((resp:any)=>
        {
        // console.log(resp);

        this.medicos=resp
        });


    }else
    {
      this.medicos=this.medicosTmp
    }
  }
}
