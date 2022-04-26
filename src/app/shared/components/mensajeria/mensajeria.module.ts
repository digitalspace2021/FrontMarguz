import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeriaComponent } from './mensajeria.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MensajeriaComponent], 
  imports: [
    CommonModule, FormsModule
  ],
  exports :[
    MensajeriaComponent
  ]

})
export class MensajeriaModule { }
