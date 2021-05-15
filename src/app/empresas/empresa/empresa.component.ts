import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  providers: [MessageService]
})
export class EmpresaComponent implements OnInit {

  empresa: Empresa = new Empresa();

  empresaForm : FormGroup;

  enviando: boolean = false;

  constructor(
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
    if(this.config.data) this.getEmpresa();
    this.empresaForm = new FormGroup({
      nombre : new FormControl(this.empresa.nombre , Validators.required),
      potenciaContratada : new FormControl(this.empresa.potenciaContratada , Validators.required)
    });
  }

  get f() { return this.empresaForm.controls; }

  getEmpresa() {
    this.empresaService.getEmpresa(this.config.data.id).subscribe(
      (response) => {
        this.empresa = response;
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error inesperado'});
        setTimeout(() =>{
          this.close();
        },1500)
      }
    );
  }

  saveEmpresa() {
    this.enviando = true;
    if(!this.empresaForm.valid) return;
    
    this.empresaService.addOrUpdateEmpresa(this.empresa).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary:'Éxito', detail:'La empresa se ha guardado correctamente'});
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