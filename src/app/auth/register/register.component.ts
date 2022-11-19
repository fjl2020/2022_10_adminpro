import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../login-register.component.css'
  ]
})
export class RegisterComponent  {
  public formSubmitted = false

  
  public registerForm=this.fb.group({
    nombre:['test101',[Validators.required,Validators.minLength(3)]],
    email: ['test101@hospital.es',[Validators.required,Validators.email]],
    password: ['123456',Validators.required],
    password2: ['123456',Validators.required],
    terminos : [false,Validators.required]
  },{
    validators:[this.passwordIguales('password','password2'),this.terminosAceptados()]
  });


  constructor(private fb:FormBuilder,private usuarioSvc:UsuarioService,private router:Router) { }

  crearUsuario(){
    // console.log('crear usuuario',this.registerForm);
    
    this.formSubmitted=true;
    if (this.registerForm.invalid){
      return;
      
    }else{
      
      this.usuarioSvc.crearUsusario(this.registerForm.value).subscribe(resp=>{
        // console.log(resp);

        this.router.navigateByUrl('/dashboard')
      },(err)=>{
        console.warn(err.error.msg);
         
        Swal.fire('Error',err.error.msg,'error');
        
      })
       
    }
    
    
  }
  campoValido(campo:string):Boolean{

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted)
    {
      return true;
    }else{
      return false;
    }
  
  }
  aceptaTerminos(){
    if (this.formSubmitted && this.registerForm.get('terminos')?.value!=true){
      return true;
    }else
    {
      return false;
    }
  }
  comparePassword():Boolean{
    const password = this.registerForm.get('password')?.value
    const password2 = this.registerForm.get('password2')?.value
      if (this.formSubmitted && password !==password2)
        {
          return true;
        }else{
          return false;
        }

  }
  passwordIguales(pass1:string,pass2:string){
      return (formGroup:FormGroup) =>{
          const pass1Control= formGroup.get(pass1);
          const pass2Control= formGroup.get(pass2);

          if (pass1Control?.value===pass2Control?.value){
            pass2Control?.setErrors(null);
          }else{
            pass2Control?.setErrors({noEsigual:true})
          }


      }

  }
  terminosAceptados(){
    return (formGroup:FormGroup)=> {
      const terminosControl = formGroup.get('terminos');
      if (terminosControl?.value){
        terminosControl?.setErrors(null);
      }else{
        terminosControl?.setErrors({noAceptado:true})
      }
    }
  }
}
