import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { BotonFacebookComponent } from './components/boton-facebook/boton-facebook.component';
import { BotonGoogleComponent } from './components/boton-google/boton-google.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { LoginComponent } from './containers/login/login.component';
import { RegistroEstudianteComponent } from './containers/registro-estudiante/registro-estudiante.component';
import { RegistroProfesorComponent } from './containers/registro-profesor/registro-profesor.component';
import { ResetearContrasenaComponent } from './containers/resetear-contrasena/resetear-contrasena.component';
import { RestaurarContrasenaComponent } from './containers/restaurar-contrasena/restaurar-contrasena.component';
import { HeaderAuthComponent } from './components/header-auth/header-auth.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistroComponent } from './containers/registro/registro.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { IdiomasModalComponent } from './components/idiomas/idiomas.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { HorarioModalComponent } from './components/horario/horario.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { MensajeriaModule } from '../admin/components/mensajeria/mensajeria.module';

@NgModule({
  declarations: [
    AuthComponent,
    BotonFacebookComponent,
    BotonGoogleComponent,
    HorarioModalComponent,
    ValidacionComponent,
    LoginComponent,
    RegistroEstudianteComponent,
    RegistroProfesorComponent,
    ResetearContrasenaComponent,
    RestaurarContrasenaComponent,
    HeaderAuthComponent,
    FormRegistroComponent,
    RegistroComponent,
    IdiomasModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AngularFileUploaderModule,
    MatCheckboxModule,
    SharedModule,
    MensajeriaModule
  ],
  exports: [FormRegistroComponent],
})
export class AuthModule { }
