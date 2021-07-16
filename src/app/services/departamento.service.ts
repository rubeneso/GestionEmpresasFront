import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departamento } from '../model/departamento';
import { DepartamentoList } from '../model/departamento-list';
import { HttpOptions, ServerUrl } from '../properties';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private departamentosUrl = ServerUrl + '/departamento';
  private pagina: string = '?page=';
  private tamano: string = '&size=';
  
  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<DepartamentoList> {
    return this.http.get<DepartamentoList>(this.departamentosUrl, HttpOptions)
  }

  getDepartamentosPaginated(page: number, size: number): Observable<DepartamentoList> {
    return this.http.get<DepartamentoList>(this.departamentosUrl + this.pagina + page + this.tamano + size, HttpOptions).pipe(
      map( response => response as DepartamentoList),
    );
  }

  getDepartamento(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(this.departamentosUrl + '/' + id, HttpOptions)
  }

  addOrUpdateDepartamento(departamento: Departamento): Observable<Departamento>  {
    return this.http
      .post<Departamento>(this.departamentosUrl + '/createOrUpdate', departamento, HttpOptions)
  }
  
}
