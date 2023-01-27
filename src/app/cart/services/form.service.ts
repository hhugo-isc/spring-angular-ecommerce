import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private COUNTRIES_BASE_URL = 'http://localhost:8080/api/countries';
  private STATES_BASE_URL = 'http://localhost:8080/api/states';

  constructor(private http: HttpClient) {}

  getCreditCardMonts(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    // build an array for month dropdown list
    // - start at current month and loop until
    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10 years
    let startYear: number = new Date().getFullYear();
    let endYear: number = startYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<GetResponseCountries>(this.COUNTRIES_BASE_URL)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStateUrl = `${this.STATES_BASE_URL}/search/findByCountryCode?code=${countryCode}`;
    return this.http
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((response) => response._embedded.states));
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
