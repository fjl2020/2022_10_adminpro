import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent,data:{titulo:'Dashboard'} },

      { path: 'account-settings', component: AccountSettingsComponent ,data:{titulo:'Account Settings'}},
      {path : 'buscar/:termino',component:BusquedasComponent , data: {titulo: 'Busquedas'}},
      { path: 'grafica1', component: Grafica1Component ,data:{titulo:'Graph'}},
      { path: 'perfil', component: PerfilComponent ,data:{titulo:'perfil'}},
      { path: 'progress', component: ProgressComponent ,data:{titulo:'Progress'}},
      { path: 'promesas', component: PromesasComponent ,data:{titulo:'Promise'}},
      { path: 'rxjs', component: RxjsComponent  ,data:{titulo:'RxJs'}},

      //mantenimientos
      { path: 'hospitales', component: HospitalesComponent  ,data:{titulo:'Hospitales de aplicación'}},
      { path: 'medicos', component: MedicosComponent  ,data:{titulo:'Medicos de aplicación'}},
      { path: 'medico/:id', component: MedicoComponent  ,data:{titulo:'Medicos de aplicación'}},
      //rutas de admin
      { path: 'usuarios', canActivate: [AdminGuard],component: UsuariosComponent  ,data:{titulo:'Usuarios de aplicación'}},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
