import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  /* Importamos el argumento desde la interface para usarlo en la petición */
  //TODO 4: Petición al endpoint
  public countries: Country[] = []

  //TODO 1: Feedback de carga mientras se ejecutar la petición
  public isLoading: boolean = false

  /* Inyectamos el servicio en el componente */
  //TODO 3: Petición al endpoint
  constructor( private countriesService: CountriesService ) {}

  /* TODO 4:  Persistencia de datos.*/
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
  }

  /* Como ven aquí estamos llamando al metodo que creamos en el service
  pero esta vez si nos vamos a suscribir para realizar la petición a la API. */
  //TODO 5: Petición al endpoint
  searchByCapital( term: string ): void {

    //TODO 2: Feedback de carga mientras se ejecutar la petición
    this.isLoading = true

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries
        //TODO 3: Feedback de carga mientras se ejecutar la petición
        this.isLoading = false
      })
  }

}
