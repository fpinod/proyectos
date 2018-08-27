import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;
import { Cuenta } from '../../../model/movil/cuenta';

import {MatSort, MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Documento } from '../../../model/movil/documento';

@Component({
  selector: 'app-dialog-documentos',
  templateUrl: './dialog-documentos.component.html',
  styleUrls: ['./dialog-documentos.component.css']
})
export class DialogDocumentosComponent implements OnInit {

  displayedColumns: string[] = ['select', 'factura', 'valor'];
  selection = new SelectionModel<Cuenta>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;

  constructor(public dialogRef: MatDialogRef<DialogDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta) {

      this.dataSource = new MatTableDataSource<Documento>(data.documentos);
      console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }

  ngOnInit() {
  }

}
