import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from 'src/models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor( private http:HttpClient
    ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }
    // get uid(): string {
    //   return this.usuario?.uid || '';
    // }
    get headers() {
      return {
        headers: {
          'x-token': this.token,
        },
      };
    }
    cargarMedicos(desde: number = 0) {
      const url = `${base_url}/medicos`;
      return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ ok: boolean , medicos: Medico[] })=> resp.medicos)
        )

    }
    cargarMedico(id: string = '') {
      const url = `${base_url}/medicos/${id}`;
      return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ ok: boolean , medicos: Medico })=> resp.medicos)
        )

    }
    borrarMedico(id:string){
      const url = `${base_url}/medicos/${id}`;
      return this.http.delete<any>(url, this.headers)
      .pipe(
        map((resp:{ ok: boolean , medicos: Medico[] })=> resp.medicos)
        )

    }
    crearMedico(medico:{nombre:string,hospitalId:string}){
      const url = `${base_url}/medicos`;
      return this.http.post<any>(url, medico ,this.headers)

    }
    actualizarMedico(medico:Medico){
      const url = `${base_url}/medicos/${medico._id}`;
      return this.http.put<any>(url, medico,this.headers)

    }
}
