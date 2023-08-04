import { IMeteoNow } from './pages/auth/interfaces/imeteo-now';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICityResponse } from './pages/auth/interfaces/icity-response';
import { ICitySingleResponse } from './pages/auth/interfaces/icity-single-response';
import { IMeteoAll } from './pages/auth/interfaces/imeteo-all';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string = '36eb864084575b69f147a76a77f68eb9';
  cityName: string = '';
  cityUrl: string = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.token}`;

  lat!: number;
  lon!: number;
  meteoUrl: string = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.token}`;
  constructor(private http: HttpClient) {}

  getCityName(cityN: string) {
    this.cityName = cityN;
    this.cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.token}`;
    console.log('this.cityUrl', this.cityUrl);

    return this.http.get<ICitySingleResponse[]>(this.cityUrl, {
      // headers: {
      //   Authorization: this.token,
      //   'Content-Type': 'application/*/*',
      // },
    });
  }

  getMeteoNowCity(city: ICitySingleResponse) {
    this.lat = city.lat;
    this.lon = city.lon;
    this.meteoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.token}&units=metric`;

    return this.http.get<IMeteoNow>(this.meteoUrl);
  }

  getMeteoAll(city: ICitySingleResponse) {
    this.lat = city.lat;
    this.lon = city.lon;
    this.meteoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.token}&units=metric`;
    // this.meteoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.token}&units=metric`;
    return this.http.get<IMeteoAll>(this.meteoUrl);
    // return this.http.get<IMeteoNow>(this.meteoUrl);
  }
}
