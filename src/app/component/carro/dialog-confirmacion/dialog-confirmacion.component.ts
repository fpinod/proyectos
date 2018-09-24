import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material' ;

@Component({
  selector: 'app-dialog-confirmacion',
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.css']
})
export class DialogConfirmacionComponent implements OnInit {

  confirmacion = true;

  constructor(public dialogRef: MatDialogRef<DialogConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }


}
