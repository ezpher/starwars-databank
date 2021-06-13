import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwapiService } from '../shared/services/swapi.service';
import { Person, Film, Starship, Planet, Species, Category } from '../shared/models/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy{
  
  itemSubscription$: Subscription;
  item: object;

  constructor(private route: ActivatedRoute, private swapiSvc: SwapiService) { }

  ngOnInit() {

    const CATEGORY: string = this.route.snapshot.paramMap.get('category')
    const ID: string = this.route.snapshot.paramMap.get('id')

    switch (CATEGORY) {
      case Category.People:
        this.itemSubscription$ = this.swapiSvc
          .getItem<Person>(CATEGORY, ID)
          .subscribe(res => {
             console.log(res);
             this.item = res;
          })
            
        break;
      case Category.Films:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })

        break;
      case Category.Starships:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Starship>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case Category.Vehicles:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case Category.Species:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Species>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case Category.Planets:
        this.itemSubscription$ = this.swapiSvc
        .getItem<Planet>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
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
