import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empleado } from '../model/empleado';
import { EmpleadoList } from '../model/empleado-list';
import { HttpOptions, ServerUrl } from '../properties';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private empleadosUrl = ServerUrl + '/empleado';
  private pagina: string = '?page=';
  private tamano: string = '&size=';
  
  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.empleadosUrl, HttpOptions)
  }

  getEmpleadosPaginated(page: number, size: number): Observable<EmpleadoList> {
    return this.http.get<EmpleadoList>(this.empleadosUrl + this.pagina + page + this.tamano + size, HttpOptions).pipe(
      map( response => response as EmpleadoList),
    );
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(this.empleadosUrl + '/' + id, HttpOptions)
  }

  deleteEmpleado(id: number) {
    return this.http.get(this.empleadosUrl + '/delete/' + id, HttpOptions)
  }

  addOrUpdateEmpleado(empresa: Empleado): Observable<Empleado>  {
    return this.http
      .post<Empleado>(this.empleadosUrl + '/createOrUpdate', empresa, HttpOptions)
  }

}
