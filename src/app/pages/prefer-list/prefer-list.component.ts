import { Component } from '@angular/core';
import { ICitySingleResponse } from '../auth/interfaces/icity-single-response';

@Component({
  selector: 'app-prefer-list',
  templateUrl: './prefer-list.component.html',
  styleUrls: ['./prefer-list.component.scss'],
})
export class PreferListComponent {
  cityPref!: ICitySingleResponse[];

  ngOnInit() {
    this.cityPref = JSON.parse(localStorage.getItem('cityPref') || '[]');
    console.log(this.cityPref);
  }
}
