import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  @Input() tipoUsuario : number  = 0;
  
  countries: any;
  states: any;
  cities: any;
 
  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"",
      method:"POST",
      headers: {},
      params: {
        'page': '1'
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getCountries()
      .then((data) => {
        this.countries = data;
        this.countrySelected = 'Colombia';
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.countrySelected)
      .then((data) => (this.states = data))
      .catch((err) => console.error(err));
  }

  changeCites() {
    this.authService
      .getCities(this.stateSelected)
      .then((data) => (this.cities = data))
      .catch((err) => console.error(err));
  }
}
