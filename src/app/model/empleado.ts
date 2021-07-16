import { DepartamentoCargo } from "./departamento-cargo";

export class Empleado{
    id: number;
    nombre: string;
    descripcion: string;
    codEmpresa: number;
    departamentosCargos: DepartamentoCargo [];
}