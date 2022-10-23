import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderbarService {
  menu:any[]=[
    {title:'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu:[
        {title:'Main',url:'/'},
        {title:'ProgressBar',url:"progress"},
        {title:'Graficas',url:"grafica1"},
        {title:'Promesas',url:"promesas"},
        {title:'RXJS',url:"rxjs"},

    ]}
    
  ]
  constructor() { }


}
