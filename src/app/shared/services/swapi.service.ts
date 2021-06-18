import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, take, defaultIfEmpty } from 'rxjs/operators';
import { Category, Item, List } from '../models/models';

const SWAPI_BASE_URL: string = 'https://swapi.dev/api'

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

  getItem<Item>(category: string, id: string) : Observable<any> {
    return this.http
      .get<Item>(`${SWAPI_BASE_URL}/${category}/${id}`)
      .pipe(
        flatMap(item => {

          let itemObservable$ = of(item)

          if (category === Category.People) {

            let homeworldObservable$ = this.getItems(item['homeworld'])
            let filmsObservable$ = this.getItems(item['films'])
            let speciesObservable$ = this.getItems(item['species'])
            let starshipsObservable$ = this.getItems(item['starships'])
            let vehiclesObservable$ = this.getItems(item['vehicles'])

            return forkJoin<any>(itemObservable$, homeworldObservable$, filmsObservable$, speciesObservable$, starshipsObservable$, vehiclesObservable$)
          } 

          if (category === Category.Films) {

            let speciesObservable$ = this.getItems(item['species'])
            let starshipsObservable$ = this.getItems(item['starships'])
            let charactersObservable$ = this.getItems(item['characters'])
            let planetsObservable$ = this.getItems(item['planets'])
            let vehiclesObservable$ = this.getItems(item['vehicles'])

            return forkJoin<any>(itemObservable$, speciesObservable$, starshipsObservable$, charactersObservable$, planetsObservable$, vehiclesObservable$)
          } 

          if (category === Category.Starships) {

            let filmsObservable$ = this.getItems(item['films'])
            let pilotsObservable$ = this.getItems(item['pilots'])

            return forkJoin<any>(itemObservable$, filmsObservable$, pilotsObservable$)
          } 

          if (category === Category.Vehicles) {

            let filmsObservable$ = this.getItems(item['films'])
            let pilotsObservable$ = this.getItems(item['pilots'])

            return forkJoin<any>(itemObservable$, filmsObservable$, pilotsObservable$)
          } 

          if (category === Category.Species) {

            let homeworldObservable$ = this.getItems(item['homeworld'])
            let peopleObservable$ = this.getItems(item['people'])
            let filmsObservable$ = this.getItems(item['films'])

            return forkJoin<any>(itemObservable$, homeworldObservable$, peopleObservable$, filmsObservable$)
          } 

          if (category === Category.Planets) {

            let residentsObservable$ = this.getItems(item['residents'])
            let filmsObservable$ = this.getItems(item['films'])

            return forkJoin<any>(itemObservable$, residentsObservable$, filmsObservable$)
          } 
          
          return;
        })
      )
  }

  // will return the corresponding objects for the urlArray e.g. PlanetUrls[] => Planets[]
  getItems(urlArray: Array<string>|string) : Observable<Item[]> {
    
    if (!Array.isArray(urlArray)) urlArray = [urlArray]

    const OBSERVABLE_LIST: Observable<Item>[] = [];
    for (const url of urlArray) {
      const ITEM_OBSERVABLE$ = this.http.get<Item>(url)
      OBSERVABLE_LIST.push(ITEM_OBSERVABLE$);
    }

    // Need to handle null or else forkjoin will not work since rely on at least one emitted value
    return forkJoin(OBSERVABLE_LIST)
      .pipe(
        defaultIfEmpty(null)
      );
    
    // return of(...urlArray)
    //   .pipe(
    //     concatMap(url => this.http.get<Item>(url)),
    //     map(item => {
    //       return item
    //     })
    //   )
  }

}
