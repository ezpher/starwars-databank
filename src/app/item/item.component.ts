import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwapiService } from '../shared/services/swapi.service';
import { Person, Film, Starship, Planet, Species, Category, UrlsProperty } from '../shared/models/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy{
  
  itemSubscription$: Subscription;
  item: object;
  UrlsProperties: Array<string> = [
    UrlsProperty.characters,
    UrlsProperty.people,
    UrlsProperty.pilots,
    UrlsProperty.residents,
    UrlsProperty.films,
    UrlsProperty.starships,
    UrlsProperty.vehicles,
    UrlsProperty.species,
    UrlsProperty.planets,
    UrlsProperty.homeworld
  ]

  constructor(private route: ActivatedRoute, private swapiSvc: SwapiService) { }

  IsUrlsProperty(key: string) {
    return this.UrlsProperties.indexOf(key) > -1
  }

  ngOnInit() {

    const CATEGORY: string = this.route.snapshot.paramMap.get('category')
    const ID: string = this.route.snapshot.paramMap.get('id')

    switch (CATEGORY) {
      case Category.People:
        this.itemSubscription$ = this.swapiSvc
          .getItem<Person>(CATEGORY, ID)
          .subscribe(([item, homeworld, films, species, starships, vehicles]) => {
             console.log(item);
             item['homeworld'] = homeworld
             item['films'] = films
             item['species'] = species
             item['starships'] = starships
             item['vehicles'] = vehicles
             this.item = item;
          })
            
        break;
      case Category.Films:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(([item, species, starships, characters, planets, vehicles]) => {
          console.log(item)
          item['species'] = species
          item['starships'] = starships
          item['characters'] = characters
          item['planets'] = planets
          item['vehicles'] = vehicles
          this.item = item;
        })

        break;
      case Category.Starships:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Starship>(CATEGORY, ID)
        .subscribe(([item, films, pilots]) => {
          console.log(item);
          item['films'] = films
          item['pilots'] = pilots
          this.item = item;
        })
        break;

      case Category.Vehicles:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(([item, films, pilots]) => {
          console.log(item);
          item['films'] = films
          item['pilots'] = pilots
          this.item = item;
        })
        break;

      case Category.Species:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Species>(CATEGORY, ID)
        .subscribe(([item, homeworld, people]) => {
          console.log(item);
          item['homeworld'] = homeworld
          item['people'] = people
          this.item = item;
        })
        break;

      case Category.Planets:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Planet>(CATEGORY, ID)
        .subscribe(([item, residents, films]) => {
          console.log(item);
          item['residents'] = residents
          item['films'] = films
          this.item = item;
      })
      break;

      default:
        break;
    }

  }

  ngOnDestroy() {
    this.itemSubscription$.unsubscribe(); 
  }

}
