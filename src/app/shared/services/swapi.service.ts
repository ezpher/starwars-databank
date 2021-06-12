import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

const SWAPI_BASE_URL : string = 'https://swapi.dev/api'
const CategoryParam : string = 'people'

export interface List {
  count: number;
  next: string;
  previous: string;
  results: object[];
}

interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;  
  films: string[];    
  species: string[];  
  starships: string[];
  vehicles: string[]; 
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) {}

  // getList will only get the results of 10 items of the category inside the container object, as per API schema; 
  // url with no page query string will only get first page containing first 10 items
  getList(category : string) : Observable<List> {
    return this.http
      .get<List>(`${SWAPI_BASE_URL}/${category}/`)
      .pipe(take<List>(1))
  }
}
