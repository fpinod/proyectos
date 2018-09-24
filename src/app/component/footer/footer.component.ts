import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Documento } from '../../model/movil/documento';
import { FacturacionComponent } from '../movil/facturacion/facturacion.component';
import { CarroService } from '../../service/carro/carro.service';
import { MatDialog } from '@angular/material';
import { DialogCarroComponent } from '../carro/dialog-carro/dialog-carro.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() lista: Array<Documento>;

  total = 0;
  cant_seleccionados = 0;
  show_dialog_carro = false;
  dialogRef;
  constructor(private _carroService: CarroService,
              public dialog: MatDialog) {
   }

  ngOnInit() {

  }

  ngOnChanges() {
    this.total = 0;
    for (let index = 0; index < this._carroService.selection_movil_documento.selected.length; index++) {
      this.total = this.total + this._carroService.selection_movil_documento.selected[index].deuda;
    }
    for (let index = 0; index < this._carroService.selection_fija_documento.selected.length; index++) {
      this.total = this.total + this._carroService.selection_fija_documento.selected[index].deuda;
    }
    this.cant_seleccionados = this._carroService.selection_movil_documento.selected.length +
                              this._carroService.selection_fija_documento.selected.length;
  }

  clean() {
    this._carroService.selection_fija_documento.clear();
    this._carroService.selection_movil_documento.clear();
    this._carroService.selection_fija.clear();
    this._carroService.selection_movil.clear();
    this.total = 0;
    this.cant_seleccionados = 0;
  }


  openDialogCarro(): void {
    this.dialogRef = this.dialog.open(DialogCarroComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.show_dialog_carro = false;
      console.log('The dialog was closed');
    });
  }


  closeDialogCarro(): void {
    this.dialogRef.close();
  }
}
