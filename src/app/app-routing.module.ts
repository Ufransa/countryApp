import { CountriesModule } from './countries/countries.module';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* CON ESTO VAMOS A GESTIONAR LAS RUTAS URL DE NUESTRA APLICACIÓN 
SIENDO LA BASE POR EJEMPLO: http://localhost:4200/ Y AÑADIENDO ESTO
LA CONVERTIMOS EN http://localhost:4200/home. Y ASÍ CON TODOS LOS 
COMPONENTES QUE QUERRAMOS AÑADIR */
const routes: Routes = [
    {
        /* PERMITE DE MANERA PEREZOSA, CARGAR UN MODULO. ESTO SIGNIFICA CARGARLO BAJO DEMANDA Y LUEGO QUEDA EN MEMORIA */
        path: 'countries',
        loadChildren: () => import('./countries/countries.module')
            .then( m => m.CountriesModule )
    },
    {
        /* En caso de poner la url base http://localhost:4200/ redigirá al home */
        path: '**',
        redirectTo: 'countries'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot ( routes ),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {}
