import {Documento} from './documento';

export interface Cuenta {
  cuenta:        number;
  deuda_vencida: number;
  total:         number;
  tipo:          string;
  documentos:    Documento[];
}
