import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})

export class IncrementadorComponent  implements OnInit{

  // @Input()  progreso:number =40;  
  @Input('valor')  progreso:number =40;  
  @Input()  btnClass:string ='btn-primary';  

  @Output('valOut') valorSalida: EventEmitter<number> =new EventEmitter();

  constructor() { }
  ngOnInit(): void {
      this.btnClass=`btn ${this.btnClass}`

  }
  onChange(nuevoValor:number){
    if (nuevoValor>=100){
      this.progreso=100;
    }else if (nuevoValor<=0)
    {
      this.progreso=0;
    }else{
      this.progreso=nuevoValor;
    }

    this.valorSalida.emit(this.progreso)

  }
 
  get getPorcentaje(){
    return `${this.progreso}%`
  }
  cambiarValor(valor:number){
    // this.progreso+=valor
    if (this.progreso+valor>100){
      this.progreso=100;
    }
    else if (this.progreso+valor<0){
      this.progreso=0;
    }
    else {
      this.progreso+=valor
    }
    this.valorSalida.emit(this.progreso);
  }

}
