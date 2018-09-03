import {Documento} from './documento';

export interface Cuenta {
  cuenta:        number;
  deuda_vencida: number;
  total:         number;
  tipo:          string;
  cant_doc_vencida: string; // solo estetico
  cant_doc_total: string;   // solo estetico
  documentos:    Documento[];
}
