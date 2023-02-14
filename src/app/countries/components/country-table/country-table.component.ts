import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  /* Ajustamos el tamaño de las imagenes generales del html */
  styles: [
    `img{
      width: 25px
    }`
  ]
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = []
}
