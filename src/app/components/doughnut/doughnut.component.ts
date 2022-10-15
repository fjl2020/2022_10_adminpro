import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit{
 

  @Input() dataDoughnut:number[]=[10,10,10]
  @Input('colorArray') dataColor:string[]=['#17a2b8', '#007bff','#67757c']
  @Input() title:string=""
  @Input('labelsDoughnut')  doughnutChartLabels: String[]=['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      // { data: this.dataDoughnut ,backgroundColor:this.dataColor},
      // { data: [50, 150, 120] },
      // { data: [250, 130, 70] },
    ] 
    ,
    
  };
  public doughnutChartType: ChartType = 'doughnut';
  
    constructor(){
      // console.log(this.doughnutChartLabels);
      
    }
  ngOnInit(): void {
    // console.log(this.doughnutChartLabels);
    this.doughnutChartData.labels=this.doughnutChartLabels
    this.doughnutChartData.datasets=[
      { data: this.dataDoughnut ,backgroundColor:this.dataColor},
      // { data: [50, 150, 120] },
      // { data: [250, 130, 70] },
    ] 
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
