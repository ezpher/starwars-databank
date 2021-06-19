import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwapiService } from '../shared/services/swapi.service';
import { Person, Film, Starship, Planet, Species, Category, UrlsProperty, HiddenFields, Item, ItemNameType } from '../shared/models/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy{
  
  itemSubscription: Subscription;
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

  HiddenFields: Array<string> = [
    HiddenFields.created,
    HiddenFields.edited, 
    HiddenFields.url,
    HiddenFields.episode_id
  ]

  constructor(private route: ActivatedRoute, private swapiSvc: SwapiService) { }

  IsUrlsProperty(key: string) {
    return this.UrlsProperties.indexOf(key) > -1
  }

  IsHiddenField(key: string) {
    return this.HiddenFields.indexOf(key) > -1
  }

  private GetDelimitedNames(array: Array<Item>) : string {
    return array != null ? 
      array.map(item => Object.keys(item).lastIndexOf(ItemNameType.name) > -1 
        ? item.name 
        : item.title
      ).join(', ') : 'n/a';
  }

  ngOnInit() {

    const CATEGORY: string = this.route.snapshot.paramMap.get('category')
    const ID: string = this.route.snapshot.paramMap.get('id')

    switch (CATEGORY) {
      case Category.People:
        this.itemSubscription = this.swapiSvc
          .getItem<Person>(CATEGORY, ID)
          .subscribe(([item, homeworld, films, species, starships, vehicles]) => {
             console.log(item);
             item[UrlsProperty.homeworld] = this.GetDelimitedNames(homeworld)
             item[UrlsProperty.films] = this.GetDelimitedNames(films)
             item[UrlsProperty.species] = this.GetDelimitedNames(species)
             item[UrlsProperty.starships] = this.GetDelimitedNames(starships)
             item[UrlsProperty.vehicles] = this.GetDelimitedNames(vehicles)
             this.item = item;
          })
            
        break;
      case Category.Films:
        this.itemSubscription = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(([item, species, starships, characters, planets, vehicles]) => {
          console.log(item)
          item[UrlsProperty.species] = this.GetDelimitedNames(species)
          item[UrlsProperty.starships] = this.GetDelimitedNames(starships)
          item[UrlsProperty.characters] = this.GetDelimitedNames(characters)
          item[UrlsProperty.planets] = this.GetDelimitedNames(planets)
          item[UrlsProperty.vehicles] = this.GetDelimitedNames(vehicles)
          this.item = item;
        })

        break;
      case Category.Starships:
        this.itemSubscription = this.swapiSvc
        .getItem<Starship>(CATEGORY, ID)
        .subscribe(([item, films, pilots]) => {
          console.log(item);
          item[UrlsProperty.films] = this.GetDelimitedNames(films)
          item[UrlsProperty.pilots] = this.GetDelimitedNames(pilots)
          this.item = item;
        })
        break;

      case Category.Vehicles:
        this.itemSubscription = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(([item, films, pilots]) => {
          console.log(item);
          item[UrlsProperty.films] = this.GetDelimitedNames(films)
          item[UrlsProperty.pilots] = this.GetDelimitedNames(pilots)
          this.item = item;
        })
        break;

      case Category.Species:
        this.itemSubscription = this.swapiSvc
        .getItem<Species>(CATEGORY, ID)
        .subscribe(([item, homeworld, people, films]) => {
          console.log(item);
          item[UrlsProperty.homeworld] = this.GetDelimitedNames(homeworld)
          item[UrlsProperty.people] = this.GetDelimitedNames(people)
          item[UrlsProperty.films] = this.GetDelimitedNames(films)
          this.item = item;
        })
        break;

      case Category.Planets:
        this.itemSubscription = this.swapiSvc
        .getItem<Planet>(CATEGORY, ID)
        .subscribe(([item, residents, films]) => {
          console.log(item);
          item[UrlsProperty.residents] = this.GetDelimitedNames(residents)
          item[UrlsProperty.films] = this.GetDelimitedNames(films)
          this.item = item;
      })
      break;

      default:
        break;
    }

  }

  ngOnDestroy() {
    this.itemSubscription.unsubscribe(); 
  }

}
