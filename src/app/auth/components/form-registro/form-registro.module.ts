import {  FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegistroComponent } from './form-registro.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [FormRegistroComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    AngularFileUploaderModule
  ], exports : [
    FormRegistroComponent
  ]
})
export class FormRegistroModule { }
