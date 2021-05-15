import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../model/empresa';
import { HttpOptions, ServerUrl } from '../properties';
import { EmpresaList } from '../model/empresa-list';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private empresasUrl = ServerUrl + '/empresa';
  private pagina: string = '?page=';
  private tamano: string = '&size=';
  
  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.empresasUrl, HttpOptions)
  }

  getEmpresasPaginated(page: number, size: number): Observable<EmpresaList> {
    return this.http.get<EmpresaList>(this.empresasUrl + this.pagina + page + this.tamano + size, HttpOptions).pipe(
      map( response => response as EmpresaList),
    );
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(this.empresasUrl + '/' + id, HttpOptions)
  }

  addOrUpdateEmpresa(empresa: Empresa): Observable<Empresa>  {
    return this.http
      .post<Empresa>(this.empresasUrl + '/createOrUpdate', empresa, HttpOptions)
  }
}
