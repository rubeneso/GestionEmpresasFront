
export class GenericListComponent<T> {
  public tituloTotal: string = '';
  public total: number = 0;

  datasource: T[];

  constructor() {
  }

}
