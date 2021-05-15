import { Empleado } from "./empleado";

export class Departamento{
    id: number;
    nombre: string;
    descripcion: string;
    empresas: string[];
    empleados: Empleado [];
}