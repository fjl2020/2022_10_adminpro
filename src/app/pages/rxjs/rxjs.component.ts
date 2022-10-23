import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy{
  
  public intervalSubs:Subscription;
  constructor() {
    // this.retornaObservable().pipe(retry()).subscribe(
    //   (valor)=>{
    //     console.log('Subs: ',valor);

    //   },(err)=>{
    //     console.log(err);

    //   },
    //   ()=>{console.log('observable finalizado');}

    // );
    // this.retornaItervalo().subscribe((valor)=>console.log(valor))
    this.intervalSubs= this.retornaItervalo()
      .subscribe(console.log);


  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaItervalo():Observable<number> {
    return interval(100)
          .pipe(
            // take(10),
            map((valor)=>valor+1),
            filter(valor=>(valor%2==0 ? true : false),
            ));
            
            
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const ob$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        // console.log('tick');
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          console.log('error 2');
          observer.error('Error en 2');
        }
      }, 1000);
    });
    return ob$;
  }
}
