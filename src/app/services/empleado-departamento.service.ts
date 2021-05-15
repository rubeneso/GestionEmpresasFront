import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoDepartamento } from '../model/empleado_departamento';
import { HttpOptions, ServerUrl } from '../properties';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoDepartamentoService {

  private empleadoDepartamentoUrl = ServerUrl + '/empDep';
  
  constructor(private http: HttpClient) { }

  getCargos(): Observable<EmpleadoDepartamento[]> {
    return this.http.get<EmpleadoDepartamento[]>(this.empleadoDepartamentoUrl + '/getAll', HttpOptions)
  }

  getCargo(id: number): Observable<EmpleadoDepartamento> {
    const empDep =  this.http.get<EmpleadoDepartamento>(this.empleadoDepartamentoUrl + '/getOne/' + id, HttpOptions);
    
    return empDep;
  }

  addOrUpdateCargo(empDep: EmpleadoDepartamento): Observable<EmpleadoDepartamento>  {
    return this.http.post<EmpleadoDepartamento>(this.empleadoDepartamentoUrl + '/addOrUpdate', empDep, HttpOptions)
  }

  deleteCargo(id: number): Observable<EmpleadoDepartamento>  {
    return this.http.delete<EmpleadoDepartamento>(this.empleadoDepartamentoUrl + '/delete/' + id, HttpOptions)
  }
}
