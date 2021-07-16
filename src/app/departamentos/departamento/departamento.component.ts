import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Departamento } from 'src/app/model/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
  providers: [MessageService]
})
export class DepartamentoComponent implements OnInit {

  departamento: Departamento = new Departamento();

  departamentoForm : FormGroup;

  enviando: boolean = false;

  constructor(
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
  ) { }

  ngOnInit(): void {
    if(this.config.data) this.getDepartamento();
    this.departamentoForm = new FormGroup({
      nombre : new FormControl(this.departamento.nombre , Validators.required)
    });
  }

  get f() { return this.departamentoForm.controls; }

  getDepartamento() {
    this.departamentoService.getDepartamento(this.config.data.id).subscribe(
      (response) => {
        this.departamento = response;
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
        setTimeout(() =>{
          this.close();
        },1500)
      }
    );
  }

  saveDepartamento() {
    this.enviando = true;
    if(!this.departamentoForm.valid) return;
    
    this.departamentoService.addOrUpdateDepartamento(this.departamento).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary:'Éxito', detail:'El departamento se ha guardado correctamente'});
        setTimeout(() =>{
          this.close();
        },1500)
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
      }
    );
  }

  close() {
    this.ref.close();
  }

}
