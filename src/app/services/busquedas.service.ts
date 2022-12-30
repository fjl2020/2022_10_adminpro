import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  private transformarUsuarios(busq: any[]):Usuario[] {
    const usuarios =  busq.map(user => new Usuario(user.role,user.email,user.google,user.nombre,'',user.img,user.uid))
    return usuarios
  }
  private transformarMedicos(busq: any[]):Usuario[] {
    const usuarios =  busq.map(user => new Usuario(user.role,user.email,user.google,user.nombre,'',user.img,user.uid))
    return usuarios
  }
  private transformarHospitales(busq: any[]):Usuario[] {
    const usuarios =  busq.map(user => new Usuario(user.role,user.email,user.google,user.nombre,'',user.img,user.uid))
    return usuarios
  }
  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp: any) => { 
        // console.log(resp.busq);
        
         switch (tipo) {
          case 'usuarios':
            // console.log(resp.busq);
            // return resp.busq
            return this.transformarUsuarios(resp.busq);
   
          case 'medicos':
            return this.transformarMedicos(resp.busq);
          case 'hospitales':
              return this.transformarHospitales(resp.busq);
          default: 
            return []
        }
        
      // return resp
      })
    );
  }
}
