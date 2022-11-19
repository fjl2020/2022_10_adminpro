import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  public tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRutas().subscribe(({ titulo }) => {
              this.title = titulo;
              document.title = `Admin pro ${titulo}`;
              
              });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  
  getArgumentosRutas() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event) => (event as ActivationEnd).snapshot.firstChild === null),
      map((event) => (event as ActivationEnd).snapshot.data)
    );
  }
}
