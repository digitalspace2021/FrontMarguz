export interface IMateria {
  status: string;
  code: number;
  message: string;
  materias: Materia[];
}

export interface Materia {
  id: number;
  materia: string;
  created_at: string;
  updated_at: string;
}
