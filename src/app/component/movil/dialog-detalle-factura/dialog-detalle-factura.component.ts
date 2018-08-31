import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;
import { Documento } from '../../../model/movil/documento';

@Component({
  selector: 'app-dialog-detalle-factura',
  templateUrl: './dialog-detalle-factura.component.html',
  styleUrls: ['./dialog-detalle-factura.component.css']
})
export class DialogDetalleFacturaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetalleFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Documento) { }

  ngOnInit() {
  }

}
