import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Empleado } from '../model/empleado';
import { GenericListComponent } from '../model/infraestructura/generic-list.component';
import { EmpleadoService } from '../services/empleado.service';
import { EmpleadoComponent } from './empleado/empleado.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [DialogService, MessageService]
})
export class EmpleadosComponent extends GenericListComponent<Empleado> implements OnInit {

  loading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  emptymessage: string = "No se encontraron empleados"

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private empleadoService: EmpleadoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.empleadoService.getEmpleadosPaginated(this.currentPage, this.pageSize).subscribe(
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

  openDialogCreateEmpleado() {
    const ref = this.dialogService.open(EmpleadoComponent, {
      header: 'Crear Empleado',
      width: '35%'
    });
    ref.onClose.subscribe(() => this.reload());
  }

  openDialogEditEmpleado(id: number) {
    const ref = this.dialogService.open(EmpleadoComponent, {
      data: {
        id: id
      },
      header: 'Editar Empleado',
      width: '35%'
    });
    ref.onClose.subscribe(() => this.reload());
  }

  deleteEmpleado(id) {
    this.empleadoService.deleteEmpleado(id).subscribe(
      (response) => {
        this.reload();
       },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error inesperado' });
      }
    )
  }

  paginate(event: LazyLoadEvent) {
    this.currentPage = event.first / event.rows;
    this.pageSize = event.rows;
    this.reload();
  }

}
