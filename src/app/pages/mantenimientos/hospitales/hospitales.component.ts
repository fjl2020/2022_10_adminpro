import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Hospital } from 'src/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit,OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = false;
  public totalHospitales: number = 0;
  public imgSubs?:Subscription;
  public hospitalesTmp: Hospital[]=[]

  constructor(
    private hospitalSvc: HospitalService,
    private modalImageSvc: ModalImagenService,
    private busquedaSvc:BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs=this.modalImageSvc.nuevaImagen
        .pipe(delay(100))
        .subscribe(img=>this.cargarHospitales())
  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  cargarHospitales() {
    this.cargando = true;
    this.hospitalSvc.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.hospitalesTmp=hospitales;
      this.totalHospitales = hospitales.length;
      this.cargando = false;
    });
  }
  abrirModal(hospital: Hospital) {
    this.modalImageSvc.abrirModal('hospitales', hospital._id, hospital.img);
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalSvc
      .actualizarHospital(hospital._id || '', hospital.nombre)
      .subscribe(
        (resp) => {
          console.log(resp);
          Swal.fire('Actualizado', hospital.nombre, 'success');
        },
        (error) => {
          Swal.fire('No actualizado', error, 'error');
        }
      );
  }
  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Esta seguro de borrar?',
      text: 'Está a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalSvc.borrarHospital(hospital._id || '').subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire(
              'Borrar',
              `Hospital ${hospital.nombre} eliminado`,
              'success'
            );
            this.cargarHospitales();
          },
          (error) => {
            Swal.fire('No actualizado', error, 'error');
          }
        );
      }
    });
  }

  async crearHospital () {
    const valor = await Swal.fire({
      title:'Crear Hospital',
      text:'Ingrese el nombre',
      input: 'text',
      inputPlaceholder: 'Nombre de hospital',
      showCancelButton: true,
    })
    if (valor.isConfirmed){
      this.hospitalSvc.crearHospital(valor.value)
      .subscribe((resp:{ok:boolean,hospital:Hospital})=>{
        // Swal.fire(
        //   'Crear',
        //   `Hospital ${resp.hospital.nombre} creado`,
        //   'success'
        // );
        this.hospitales.push(resp.hospital)
        // this.cargarHospitales();
      })
    }



  }
  buscar(termino:string='')
  {
    if (termino.trim().length!=0)
    {

      this.busquedaSvc.buscar('hospitales',termino)
      .subscribe((resp:any)=>
        {
        console.log(resp);

        this.hospitales=resp
        });


    }else
    {
      this.hospitales=this.hospitalesTmp
    }
  }
}
