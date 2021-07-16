import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Departamento } from '../model/departamento';
import { GenericListComponent } from '../model/infraestructura/generic-list.component';
import { DepartamentoService } from '../services/departamento.service';
import { DepartamentoComponent } from './departamento/departamento.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss'],
  providers: [DialogService, MessageService]
})
export class DepartamentosComponent extends GenericListComponent<Departamento> implements OnInit {

  loading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  emptymessage: string = "No se encontraron departamentos"

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.departamentoService.getDepartamentosPaginated(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.loading = false;
        if (response != null) {
          this.datasource = response.lista;
          this.total = response.total;
        }
        else {
          this.datasource = [];
          this.total = 0;
        }
      },
      (error) => {
        this.loading = false;
        this.datasource = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error inesperado' });
      }
    );
  }

  openDialogCreateDepartamento() {
    const ref = this.dialogService.open(DepartamentoComponent, {
      header: 'Crear Departamento',
      width: '35%'
    });
    ref.onClose.subscribe(() => this.reload());
  }

  openDialogEditDepartamento(id: number) {
    const ref = this.dialogService.open(DepartamentoComponent, {
      data: {
        id: id
      },
      header: 'Editar Departamento',
      width: '35%'
    });
    ref.onClose.subscribe(() => this.reload());
  }

  paginate(event: LazyLoadEvent) {
    this.currentPage = event.first / event.rows;
    this.pageSize = event.rows;
    this.reload();
  }

}
