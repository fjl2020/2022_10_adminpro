import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medico.service';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup =new FormGroup({});
  public hospitales:Hospital[]=[]
  public hospitalSeleccionado?:Hospital;
  public medicoSeleccionado?:Medico;
  constructor(private fb:FormBuilder,
    private hospitalSvc:HospitalService,
    private medicoSvc:MedicosService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.medicoForm=this.fb.group({
      nombre:['',Validators.required],
      hospital:["",Validators.required]
    })
    this.cargarHospitales()
    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId:Hospital)=>{
      this.hospitalSeleccionado=this.hospitales.find((h:any)=> h._id===hospitalId);

    })
    this.activatedRoute.params.subscribe(({id})=>{

      this.cargarMedicoById(id)
    }
    )
    // this.medicoSvc.cargarMedico()
  }
  cargarMedicoById(id:string){
    if (id==='nuevo' ) return;
      this.medicoSvc.cargarMedico(id)
      .pipe(delay(100)).subscribe((resp:any )=>{
        this.medicoSeleccionado=resp;
        const {nombre,hospital:{_id}}=resp
        this.medicoForm.setValue({nombre,hospital: _id})

      },error=>this.router.navigateByUrl(`/dashboard/medicos`));



  }
  cargarHospitales(){
    this.hospitalSvc.cargarHospitales().subscribe((resp)=>{
      this.hospitales=resp
    })
  }
  guardarMedico(){
    // console.log(this.medicoForm.value );
    const {nombre}=this.medicoForm.value
    if (this.medicoSeleccionado)
    {
      const data={...this.medicoForm.value}
      data._id=this.medicoSeleccionado._id
      // console.log(data);
      this.medicoSvc.actualizarMedico(data)
        .subscribe(resp=>
            Swal.fire('Medicos',`Se actualizo el médico ${nombre}`,'success')
      )

    }else{

      this.medicoSvc.crearMedico(this.medicoForm.value).subscribe((resp:any)=>{

        // console.log(resp.medico._id);
        Swal.fire('Medicos',`Se creó el médico ${nombre}`,'success')
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id  }`)
      })
    }


  }
}
