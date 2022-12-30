import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import Swal from 'sweetalert2';

import { map, Observable, catchError, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { Usuario } from '../../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;
declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    public http: HttpClient,
    private router: Router,
    private ngzone: NgZone
  ) {}
  public auth2: any;
  public usuario?: Usuario;
  public authUrl = base_url.replace('api', 'auth') || '';

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${this.authUrl}/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, img, nombre, role, uid } = resp.usuario;
          this.usuario = new Usuario(role, email, google, nombre, '', img, uid);

          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  crearUsusario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      map((resp: any) => {
        // console.log(resp);

        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        return true;
      })
    );
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario?.uid || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  actualizarPerfil(data: { nombre: string; email: string; role: string }) {
    data = { ...data, role: this.usuario?.role || '' };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }
  loginUsuario(formData: LoginForm) {
    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }
    // console.log(`${base_url.replace('api','auth')}/login`);
    // console.log(formData);

    return this.http.post(`${this.authUrl}/login`, formData).pipe(
      map((resp: any) => {
        // console.log(resp);

        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        return true;
      })
    );
  }
  googleInit = () => {
    google.accounts.id.initialize({
      client_id:
        '948988695415-1ff93bf1ei6lp8t3die4b4u29n983ki1.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
  };
  // ******************* google signin ***********************
  handleCredentialResponse = (response: any) => {
    this.auth2 = response.credential;
    // console.log("Encoded JWT ID token: " + this.auth2);
    this.loginGoogle(this.auth2).subscribe(
      (resp) => {
        // console.log(resp);
        this.ngzone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  };
  loginGoogle(tokenGoogle: string) {
    // console.log(`${base_url.replace('api','auth')}/login`);
    // console.log('Google token');
    localStorage.removeItem('email');
    return this.http
      .post(`${this.authUrl}/google`, { token: tokenGoogle })
      .pipe(
        map((resp: any) => {
          localStorage.setItem('id', resp.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));

          return true;
        })
      );
  }
  logout = () => {
    localStorage.removeItem('token');

    this.ngzone.run(() => {
      this.router.navigateByUrl('login');
    });

    google.accounts.id.disableAutoSelect();
  };
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp => {
          const usuarios  =resp.usuarios.map(
            user => new Usuario(user.role,user.email,user.google,user.nombre,'',user.img,user.uid)
            );          
          return {
            total:resp.total,
            usuarios
          };
        })
        );
  }
  eliminarUsuario(uid:string){
    console.log(uid);
    
    const url = `${base_url}/usuarios/${uid}`;
    return this.http.delete(url, this.headers);
  }
  guardarUsuario(usuario: Usuario) {
    // data = { ...data, role: this.usuario?.role || '' };
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
