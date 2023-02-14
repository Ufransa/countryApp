import { Country } from './country';
import { Region } from './region.type';

/* TODO 2:  Persistencia de datos. Tras esto creamos la interface 
pero ojo que si nos fijamos la de RegionCouintries será diferente, viene de region.type ya que
son resultados cerrados*/

export interface CacheStore {
    byCapital: TermCountries
    byCountries: TermCountries
    byRegion: RegionCountries
}

export interface TermCountries {
    term: string
    countries: Country[]
}

export interface RegionCountries {
    region?: Region
    countries: Country[]
}