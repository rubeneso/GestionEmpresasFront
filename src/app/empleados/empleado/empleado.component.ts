import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Departamento } from 'src/app/model/departamento';
import { DepartamentoCargo } from 'src/app/model/departamento-cargo';
import { Empleado } from 'src/app/model/empleado';
import { Empresa } from 'src/app/model/empresa';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
  providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

  empleado: Empleado = new Empleado();
  empresas: Empresa[] = [];
  departamentos: Departamento[] = [];
  departamentoSeleccionado: Departamento = new Departamento();
  addDepartamentoDialog: boolean = false;

  departamentoCargoSeleccionado: DepartamentoCargo = new DepartamentoCargo();

  empleadoForm : FormGroup;

  enviando: boolean = false;

  constructor(
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private empleadoService: EmpleadoService,
    private empresaService: EmpresaService,
    private departamentoService: DepartamentoService,
  ) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getEmpresas();
    if(this.config.data) this.getEmpleado();
    this.empleadoForm = new FormGroup({
      nombre : new FormControl(this.empleado.nombre , Validators.required),
      empresa : new FormControl(this.empleado.codEmpresa , Validators.required)
    });
  }

  get f() { return this.empleadoForm.controls; }

  getEmpleado() {
    this.empleadoService.getEmpleado(this.config.data.id).subscribe(
      (response) => {
        this.empleado = response;
        this.empleado.departamentosCargos.forEach(departamentoCargo => {
          for(let i = 0; i < this.departamentos.length; i++) {
            if(this.departamentos[i].id == departamentoCargo.codDepartamento) {
              this.departamentos.splice(i, 1);
            }
          }
        })
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
        setTimeout(() =>{
          this.close();
        },1500)
      }
    );
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      (response) => {
        this.empresas = (response) ? response.lista : [];
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
        setTimeout(() =>{
          this.close();
        },1500)
      }
    );
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (response) => {
        this.departamentos = (response) ? response.lista : [];
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
        setTimeout(() =>{
          this.close();
        },1500)
      }
    );
  }

  saveEmpleado() {
    this.enviando = true;
    if(!this.empleadoForm.valid) return;
    
    this.empleadoService.addOrUpdateEmpleado(this.empleado).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary:'Éxito', detail:'El empleado se ha guardado correctamente'});
        setTimeout(() =>{
          this.close();
        },1500)
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
      }
    );
  }

  saveDepartamentoCargo() {
    this.departamentoCargoSeleccionado.codDepartamento = this.departamentoSeleccionado.id;
    this.departamentos = this.departamentos.filter(departamento => {
      return departamento.id != this.departamentoSeleccionado.id
    });
    
    if(!this.empleado.departamentosCargos) this.empleado.departamentosCargos = [];
    this.empleado.departamentosCargos.push(this.departamentoCargoSeleccionado);

    this.departamentoCargoSeleccionado = new DepartamentoCargo();
  }

  deleteDepartamentoCargo(idBorrar: number, nombreBorrar: string) {
    this.empleado.departamentosCargos = this.empleado.departamentosCargos.filter(departamentoCargo => {
      return departamentoCargo.codDepartamento != idBorrar;
    })
    this.departamentos.push({id: idBorrar, nombre: nombreBorrar, descripcion: ""});
  }

  onDepartamentoChange() {
    this.departamentoCargoSeleccionado.nombreDepartamento = this.departamentoSeleccionado.nombre;
  }

  showDialog() {
    this.departamentoCargoSeleccionado = new DepartamentoCargo();
    this.addDepartamentoDialog = true;
  }

  hideDialog() {
    this.addDepartamentoDialog = false;
  }

  close() {
    this.ref.close();
  }

}
