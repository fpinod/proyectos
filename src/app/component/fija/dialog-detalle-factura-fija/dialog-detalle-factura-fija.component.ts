import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;
import { Documentofija } from '../../../model/fija/documentofija';
import { FacturacionFijaService } from '../../../service/fija/facturacion-fija.service';

@Component({
  selector: 'app-dialog-detalle-factura-fija',
  templateUrl: './dialog-detalle-factura-fija.component.html',
  styleUrls: ['./dialog-detalle-factura-fija.component.css']
})
export class DialogDetalleFacturaFijaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDetalleFacturaFijaComponent>,
    @Inject(MAT_DIALOG_DATA) public documento: Documentofija,
    private _facturacionFijaService: FacturacionFijaService ) { }

  ngOnInit() {
  }

  downloadPDF() {
    window.open( this._facturacionFijaService.downloadPDF() );
  }

}
