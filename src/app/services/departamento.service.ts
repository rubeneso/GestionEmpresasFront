import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../model/departamento';
import { HttpOptions, ServerUrl } from '../properties';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private deptmsUrl = ServerUrl + '/departamento';

  constructor(private http: HttpClient) { }

  getDeptm(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(this.deptmsUrl + '/getOne/' + id, HttpOptions)
  }

  getDeptms(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.deptmsUrl + '/getAll', HttpOptions)
  }

  addOrUpdateDeptm(empleado: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.deptmsUrl + '/addOrUpdate', empleado, HttpOptions);
  }
}
