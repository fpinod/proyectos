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
    @Inject(MAT_DIALOG_DATA) public cuenta: Cuenta) {

      this.dataSource = new MatTableDataSource<Documento>(cuenta.documentos);
      console.log(this.dataSource);
    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

}
