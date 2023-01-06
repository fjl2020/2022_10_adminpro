import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderbarService {
  menu:any[]=[]

  cargarMenu(){
    this.menu=JSON.parse(localStorage.getItem('menu')||'') || [];

    console.log('this.menu');



  }
  // menu:any[]=[
  //   {title:'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       {title:'Main',url:'/'},
  //       {title:'ProgressBar',url:"progress"},
  //       {title:'Graficas',url:"grafica1"},
  //       {title:'Promesas',url:"promesas"},
  //       {title:'RXJS',url:"rxjs"},

  //   ]},
  //   {title:'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {title:'Usuarios',url:'usuarios'},
  //       {title:'Hospitales',url:"hospitales"},
  //       {title:'Medicos',url:"medicos"},

  //   ]}

  // ]
  constructor() { }


}
