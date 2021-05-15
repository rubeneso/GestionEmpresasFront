import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Empresa } from '../model/empresa';
import { GenericListComponent } from '../model/infraestructura/generic-list.component';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaComponent } from './empresa/empresa.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [DialogService, MessageService]
})
export class EmpresasComponent extends GenericListComponent<Empresa> implements OnInit {

  loading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  emptymessage: string = "No se encontraron empresas"

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private empresaService: EmpresaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.empresaService.getEmpresasPaginated(this.currentPage, this.pageSize).subscribe(
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

  openDialogCreateEmpresa() {
    const ref = this.dialogService.open(EmpresaComponent, {
      header: 'Crear Empresa',
      width: '35%'
    });
    ref.onClose.subscribe(() => this.reload());
  }

  openDialogEditEmpresa(id: number) {
    const ref = this.dialogService.open(EmpresaComponent, {
      data: {
        id: id
      },
      header: 'Edición de Empresa',
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
