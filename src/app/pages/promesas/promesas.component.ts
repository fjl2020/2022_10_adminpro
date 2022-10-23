import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //   const promesa=new Promise((resolve,reject)=>{
    //     if (false){

    //       resolve ("Hola mundo");
    //     }else{
    //       reject("error ")
    //     }

    //   })
    //   promesa.then((mensaje)=>
    //   {
    //     console.log("Termine==>",mensaje);

    //   }
    //   ).catch((str)=> {console.log(str);}
    //   )
    //   console.log('Saludos luego de promesa')
    this.getUsuarios().then((usuarios) => {
      // console.log(usuarios);
    }).catch(error=>{
      console.log('Error : ',error);
      
    })
    // this.getUsuarios();
  }

  getUsuarios() {
    const promesa = new Promise((res, rej) => {
      const url = 'https://reqres.in/api/users';
      fetch(url).then((resp) => {
        resp.json().then((body) => {
          res(body.data);
        }).catch(error=>{
           rej(error)
            
        });
      })
    });
    return promesa;
  }
}
