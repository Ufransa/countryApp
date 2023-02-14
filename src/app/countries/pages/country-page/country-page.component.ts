import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country

  constructor( 
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        /* Esto ejecuta una acción cuando recibe un observable
        como en este caso que estamos mandando a llamar la función
        searchCountryByAlphaCode */
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        
        /* Condicional si no devuelve nada (Con esto !country) lo devolvemos a la página inicial */
        if ( !country ) {
          return this.router.navigateByUrl('')
        }

        return this.country = country 
        
        
      })
  }

}
