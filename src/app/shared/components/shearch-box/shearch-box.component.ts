import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-shearch-box',
  templateUrl: './shearch-box.component.html',
  styles: [
  ]
})
export class ShearchBoxComponent implements OnInit {
  

  //TODO 1: DEBOUNCE(esperar a que el usuario deje de escribir para lanzar la petición)
  //Subject es un tipo especial de observable
  private debouncer: Subject<string> = new Subject<string> ()

/* Con esto lanzamos el valor afuera para que se recogido por otro componente 
y así realizar la busqueda al presionar enter*/
  @Output()
  public onValue = new EventEmitter<string>()

  //TODO 2: DEBOUNCE(esperar a que el usuario deje de escribir para lanzar la petición)
  @Output()
  public onDebounce = new EventEmitter<string>()

  //TODO 3: DEBOUNCE(esperar a que el usuario deje de escribir para lanzar la petición)
  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit( value )
      })
  }

  //Con este metodo realizaremos la busqueda una vez pulsemos enter
  emitValue( value: string ):void {
    this.onValue.emit ( value )
  }

  //TODO 4: DEBOUNCE(esperar a que el usuario deje de escribir para lanzar la petición)
  onKeyPress( searchTerm: string ) {
    this.debouncer.next ( searchTerm )
    
  }
}
