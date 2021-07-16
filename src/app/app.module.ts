import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaComponent } from './empresas/empresa/empresa.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleados/empleado/empleado.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { DepartamentoComponent } from './departamentos/departamento/departamento.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    EmpresasComponent,
    EmpresaComponent,
    EmpleadosComponent,
    EmpleadoComponent,
    DepartamentosComponent,
    DepartamentoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    OverlayPanelModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
