import { Departamento } from "./departamento";

export class Empresa{
    id: number;
    nombre: string;
    descripcion: string;
    potenciaContratada: number;
    departamentos: Departamento[];
}