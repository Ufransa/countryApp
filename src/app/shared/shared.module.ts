import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ShearchBoxComponent } from './components/shearch-box/shearch-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ShearchBoxComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SidebarComponent,
    ShearchBoxComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
