import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

/* API REST => https://restcountries.com/#api-endpoints-v3-name */

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    /* TODO 1: Persistencia de datos. Tras esto creamos la interface de cache-store */
    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    /* TODO 1: Localstorage, mantenemos información en memoria aunque el cliente refresque la página */
    private saveToLocalStorage() {
        //Guardar todo en memoria pero convirtiendolo todo en un string de Json
        localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ))
    }

    private loadToLocalStorage() {
        //Si no ha logrado hacer el saveToLocalStorage, entonces salirse
        if ( !localStorage.getItem( 'cacheStore' ) ) return

        //Si lo logra hacer entonces cargar el stringify guardado
        this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! )
    }

    //TODO 1: Petición al endpoint
    constructor(private http: HttpClient) { 
        /* TODO 3: Localstorage */
        this.loadToLocalStorage()
     }

    private getCountriesRequest( url: string ): Observable<Country[]> {
        return this.http.get<Country[]>(url)
        /* Usando el pipe de catchError devolvemos un observable vacío
    y al devolverlo así tenemos puesto que diga el mensaje de que 
    no hay paises que mostrar */
        .pipe(
            catchError( () => of([])),
        /* Con el operador delay obligamos a retrasar la carga en milesimas de segundo */
            // delay( 1000 ),
        )
    }  
/* Ajustamos el endpoint de la busqueda por capital por medio de la petición que va a retornar
un objeto de tipo country en arreglo. Todo esto lo haremos a través de un observable. 
Si nos fijamos encapsulamos la petición principal (apiUrl) para poder abreviarla
y al final le añadimos el termino que es lo que vamos a buscar añadiendolo al endpoint. 
Añadiendo el .subscribe ejecutaremos la petición. Hasta ahora solo la estamos leyendo. */
    //TODO 2: Petición al endpoint
    searchCapital( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/capital/${ term }`
            return this.getCountriesRequest(url)
                //TODO 4: Persistencia de datos.
                .pipe(
                    tap( countries => this.cacheStore.byCapital = { term, countries } ),
                    //TODO 2: Localstorage
                    tap( () => this.saveToLocalStorage() ),
                )
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`
            return this.getCountriesRequest(url)
                .pipe(
                    tap( countries => this.cacheStore.byCountries = { term, countries } ),
                    tap( () => this.saveToLocalStorage() ),
                )
    }

    searchRegion( region: Region ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ region }`
            return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byRegion = { region, countries } ),
                tap( () => this.saveToLocalStorage() ),
            )
    }

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        return this.http.get< Country[] >(`${ this.apiUrl }/alpha/${ code }`)
            .pipe(
                /* Transformamos la info de countries a si countries es mayor que 0
                entonces devolveremos solo la posición 0, es decir, el primer elemento,
                si no, devuelve un null*/
                map( countries => countries.length > 0 ? countries[0]: null ),
                /* Si da un error es porque regresa un null */
                catchError( () => of(null))
            )
    }

    

}