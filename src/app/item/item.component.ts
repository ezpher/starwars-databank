import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwapiService, Person, Film, Starship, Planet, Species } from '../shared/services/swapi.service';

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
      case 'people':
        this.itemSubscription$ = this.swapiSvc
          .getItem<Person>(CATEGORY, ID)
          .subscribe(res => {
             console.log(res);
             this.item = res;
          })
            
        break;
      case 'films':
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })

        break;
      case 'starships':
        this.itemSubscription$ = this.swapiSvc
        .getItem<Starship>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case 'vehicles':
        this.itemSubscription$ = this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case 'species':
        this.itemSubscription$ = this.swapiSvc
        .getItem<Species>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
        break;

      case 'planets':
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
