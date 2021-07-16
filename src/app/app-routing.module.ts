import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: 'index', component: LandingPageComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
