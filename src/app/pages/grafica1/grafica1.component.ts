import { Component } from '@angular/core';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  constructor() {}
  public labels1= ['Nacionales', 'Internacionales']
  public data1=[452, 212]
  public title1="Ventas"
  public colorArray1 =[ '#007b00','#677500']
  public labels2= ['Locales', 'Internacionales']
  public data2=[ 22, 212]
  public title2="Compras"
  public colorArray2 =[ '#007b00','#677500']
  public labels3= ['Materia Prima', 'Productos Contruidos', 'Ciencia']
  public data3=[12, 22, 212]
  public title3="Exportaciones"
  public colorArray3 =['rgb(128,23,68)', '#007bff','#67757c']
  public labels4= ['Materia Prima', 'Productos Contruidos', 'Ciencia']
  public data4=[12, 22, 212]
  public title4="Importaciones"
  public colorArray4 =['#17a2b8', '#007bff','#67757c']
  
}
