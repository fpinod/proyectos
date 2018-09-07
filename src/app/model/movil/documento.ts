export interface Documento {
  mes:           string;
  factura:       number;
  fecha_emitida: string;
  fecha_vencida: string;
  valor:         number;
  deuda:         number;
  tipo:          string;
  situacion:     string; // solo estetico
}
