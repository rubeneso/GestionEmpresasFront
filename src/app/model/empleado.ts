import { EmpleadoDepartamento } from "./empleado_departamento";
import { Empresa } from "./empresa";

export class Empleado{
    id: number;
    nombre: string;
    descripcion: string;
    empresa: Empresa;
    empleadosDepartamentos: EmpleadoDepartamento [];
}