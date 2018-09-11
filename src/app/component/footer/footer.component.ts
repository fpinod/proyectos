import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Documento } from '../../model/movil/documento';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() lista: Array<Documento>;

  total = 0;

  constructor() {

   }

  ngOnInit() {

  }

  ngOnChanges() {
    this.total = 0;
    console.log('asd ' + this.lista.length);
    for (let index = 0; index < this.lista.length; index++) {
      this.total = this.total + this.lista[index].deuda;
      console.log('asdfg ' + this.lista[index].deuda);
    }
  }

}
