import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []

  //Con esto creo una variable de ese tipo Region acotada a esos valores
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  //Creamos una variable para poder mantener seleccionados los botones escogidos
  public selectedRegion?: Region

  public isLoading: boolean = false

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    //Con esto mantendremos seleccionado en memoria el botón

    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

  searchByRegion( region: Region ): void {
    this.isLoading = true

    //Traemnos la variable para poder escoger los botones escogidos aquí y cambiamos el tipo del argumento de la función a tipo Region
    this.selectedRegion = region

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries
        this.isLoading = false
      })
  }

}
