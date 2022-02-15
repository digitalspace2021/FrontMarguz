export interface IMateria {
  status: string;
  code: number;
  messages: null;
  result: Result[];
}

export interface Result {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
