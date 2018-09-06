import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;
import { Documento } from '../../../model/movil/documento';
import { FacturacionService } from '../../../service/movil/facturacion.service';

@Component({
  selector: 'app-dialog-detalle-factura',
  templateUrl: './dialog-detalle-factura.component.html',
  styleUrls: ['./dialog-detalle-factura.component.css']
})
export class DialogDetalleFacturaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetalleFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public documento: Documento,
    private _facturacionService: FacturacionService ) { }

  ngOnInit() {
  }

  downloadPDF() {
    window.open( this._facturacionService.downloadPDF() );
  }
}
