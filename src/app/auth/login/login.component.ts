import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from 'src/app/interfaces/login-form';

declare const gapi:any
declare const google:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login-register.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public email:string='' ;
  public remember:boolean=false ;
  // @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;

  private clientId =
    '948988695415-1ff93bf1ei6lp8t3die4b4u29n983ki1.apps.googleusercontent.com';
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private _usuarioSvc: UsuarioService,
    private router: Router,
    private ngzone:NgZone
  ) {}
  ngOnInit(): void {
    this.googleSDKinit()


    this.email = localStorage.getItem('email')||'';

    if (this.email.length>1){
      // this.loginForm.get('remember')?.value=true
      // this.remember=true
      this.loginForm.get('remember')?.setValue(true)
      this.loginForm.get('email')?.setValue(this.email)
    }
  }
 
    // ******************* google signin ***********************
  handleError= (response:any)=> {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  googleSDKinit=()=>{
    this._usuarioSvc.googleInit()
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
       
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

  }
  // ******************* google signin ***********************
  login() {

   
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const loginValues: LoginForm = {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || '',
        remember: this.loginForm.get('remember')?.value || false,
      };
      this._usuarioSvc.loginUsuario(loginValues).subscribe(
        (resp) => {
          // console.log(resp);
          this.ngzone.run(()=>{this.router.navigateByUrl('/dashboard');})
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );

      // this.router.navigateByUrl('/')
    }
  }
  campoValido(campo: string): Boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  terminosAceptados() {
    return (formGroup: FormGroup) => {};
  }
  
}
