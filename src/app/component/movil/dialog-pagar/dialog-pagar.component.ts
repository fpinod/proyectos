import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;
import { Cuenta } from '../../../model/movil/cuenta';

@Component({
  selector: 'app-dialog-pagar',
  templateUrl: './dialog-pagar.component.html',
  styleUrls: ['./dialog-pagar.component.css']
})
export class DialogPagarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogPagarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta) { }

  ngOnInit() {
  }

}
