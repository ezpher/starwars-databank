import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService, Person, Film, Starship, Planet, Species } from '../shared/services/swapi.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  item : object;

  constructor(private route: ActivatedRoute, private swapiSvc: SwapiService) { }

  ngOnInit() {

    const CATEGORY = this.route.snapshot.paramMap.get('category')
    const ID: string = this.route.snapshot.paramMap.get('id')

    switch (CATEGORY) {
      case 'people':
        this.swapiSvc
          .getItem<Person>(CATEGORY, ID)
          .subscribe(res => {
             console.log(res);
             this.item = res;
          })
            
        break;
      case 'films':
        this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
      case 'starships':
        this.swapiSvc
        .getItem<Starship>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
      case 'vehicles':
        this.swapiSvc
        .getItem<Film>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
      case 'species':
        this.swapiSvc
        .getItem<Species>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
        })
      case 'planets':
        this.swapiSvc
        .getItem<Planet>(CATEGORY, ID)
        .subscribe(res => {
          console.log(res);
          this.item = res;
      })
      default:
      break;
    }

  }

}
