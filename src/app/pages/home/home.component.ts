import { AuthService } from 'src/app/pages/auth/auth.service';
import { IMeteoNow } from './../auth/interfaces/imeteo-now';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ICitySingleResponse } from '../auth/interfaces/icity-single-response';
import { IResponse } from '../auth/interfaces/iresponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('f', { static: true }) form!: NgForm;

  formData: any = {
    cityName: '',
  };

  tempcityList: ICitySingleResponse[] = [
    {
      name: 'Lanciano',
      lat: 42.2305316,
      lon: 14.3907794,
      country: 'IT',
      state: 'Abruzzo',
    },
    {
      name: 'Lanciano',
      lat: 42.2305316,
      lon: 14.3907794,
      country: 'IT',
      state: 'Abruzzo',
    },
    {
      name: 'Lanciano',
      lat: 42.2305316,
      lon: 14.3907794,
      country: 'IT',
      state: 'Abruzzo',
    },
    {
      name: 'Lanciano',
      lat: 42.2305316,
      lon: 14.3907794,
      country: 'IT',
      state: 'Abruzzo',
    },
  ];
  cityList!: ICitySingleResponse[];

  meteoInfo!: IMeteoNow;

  responseUser!: IResponse;

  constructor(private apiSrv: ApiService, private authSrv: AuthService) {}

  logged!: boolean;
  ngOnInit() {
    this.authSrv.isLoggedIn$.subscribe((log: boolean) => {
      this.logged = log;
    });
  }

  submit(f: NgForm) {
    this.formData = f.form.value;
    // console.log('this.formData', this.formData.cityName);
    this.apiSrv.getCityName(this.formData.cityName).subscribe((res) => {
      // console.log('readed', res);
      this.cityList = res;
      // console.log('this.cityList', this.cityList);
    });
  }

  findMeteo(city: ICitySingleResponse) {
    this.cityList.length = 0;
    this.apiSrv.getMeteoNowCity(city).subscribe((res) => {
      // console.log('Current Weather', res);
      this.meteoInfo = res;
    });
  }

  findAllMeteo(city: ICitySingleResponse) {
    this.apiSrv.getMeteoAll(city).subscribe((res) => {
      console.log('Current ALL Weather', res);
      // this.meteoInfo = res;
    });
  }

  addPref(city: ICitySingleResponse) {
    const cityPref: ICitySingleResponse[] = JSON.parse(
      localStorage.getItem('cityPref') || '[]'
    );
    cityPref.push(city);
    console.log('cityPref', cityPref);

    localStorage.setItem('cityPref', JSON.stringify(cityPref));
    console.log('Ok add pref', city);
    console.log('cityPref', localStorage.getItem('cityPref'));
  }

  // addPref(city: ICitySingleResponse) {
  //   this.authSrv.updateUserPref(city).subscribe((res) => {
  //     console.log('Ok add pref', res);
  //   });
  // }
}
