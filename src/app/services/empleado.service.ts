import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';
import { HttpOptions, ServerUrl } from '../properties';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private empleadosUrl = ServerUrl + '/empleado';

  constructor(private http: HttpClient) { }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(this.empleadosUrl + '/getOne/' + id, HttpOptions)
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.empleadosUrl + '/getAll', HttpOptions)
  }

  addOrUpdateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosUrl + '/addOrUpdate', empleado, HttpOptions);
  }
}
