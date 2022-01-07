export interface IMateria {
  status: string;
  code: number;
  message: string;
  materias: IDataMateria[];
}

export interface IDataMateria {
  id: number;
  materia: string;
  created_at: string;
  updated_at: string;
}
