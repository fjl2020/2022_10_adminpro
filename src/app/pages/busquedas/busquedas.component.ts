import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from 'src/models/medico.model';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [],
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedaSvc: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino.trim());
    });
  }
  busquedaGlobal(termino: string) {
    this.busquedaSvc.busquedaGlobal(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuario;
      this.medicos = resp.medico;
      this.hospitales = resp.hospital;
    });
  }
}
