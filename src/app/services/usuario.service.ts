import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountSettingsComponent } from '../pages/account-settings/account-settings.component';


declare const google:any
declare const gapi:any

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(public http: HttpClient,private router:Router,private ngzone:NgZone) {}
  public auth2: any;

  public authUrl = base_url.replace('api', 'auth') || '';

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${this.authUrl}/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map(resp => true),catchError(error=>of(false))
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
  loginUsuario(formData: LoginForm) {
    if(formData.remember){
      localStorage.setItem('email',formData.email)
        
    }else{
      localStorage.removeItem('email')
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
googleInit=()=>{
  google.accounts.id.initialize({
    client_id: '948988695415-1ff93bf1ei6lp8t3die4b4u29n983ki1.apps.googleusercontent.com',
    callback: this.handleCredentialResponse
  });

}
 // ******************* google signin ***********************
 handleCredentialResponse= (response:any)=> {
  this.auth2= response.credential
  // console.log("Encoded JWT ID token: " + this.auth2);
  this.loginGoogle(this.auth2).subscribe(
    (resp) => {
      // console.log(resp);
      this.ngzone.run(()=>{ this.router.navigateByUrl('/dashboard');})
    },
    (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
  );
}
  loginGoogle(tokenGoogle: string) {
    // console.log(`${base_url.replace('api','auth')}/login`);
    // console.log('Google token');
    localStorage.removeItem('email')
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
  logout=()=>{
    localStorage.removeItem('token');
    
    this.ngzone.run(()=>{ this.router.navigateByUrl('\login')})

    google.accounts.id.disableAutoSelect();
  }
}

