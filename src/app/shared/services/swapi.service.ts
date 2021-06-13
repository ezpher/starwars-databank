import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Item, List } from '../models/models';

const SWAPI_BASE_URL : string = 'https://swapi.dev/api'

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) {}

  // getList will only get the results of 10 items of the category inside the container object, as per API schema; 
  // url with no page query string will only get first page containing first 10 items
  getList(category: string, queryString: string = '') : Observable<List<Item>> {

    return this.http
      .get<List<Item>>(`${SWAPI_BASE_URL}/${category}/${queryString}`)
      .pipe(take<List<Item>>(1))
  }

  getItem<Item>(category: string, id: string) : Observable<Item> {
    return this.http
      .get<Item>(`${SWAPI_BASE_URL}/${category}/${id}`)
  }

}
