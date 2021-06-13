import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../shared/models/models';
import { SwapiService } from '../shared/services/swapi.service';

@Component({
  selector: 'app-testing',
  template: `

  <h2>Testing Retrival of Items</h2>

  <!-- subscribing to observables in template -->
  <!--  <ul>
      <li *ngFor="let person of (peopleList$ | async).results">
        {{person.name}}
      </li>
    </ul>
  -->

  <!-- subscribing to observables programmatically -->
  <ul>
    <li *ngFor="let person of people">
      {{person.name}}
    </li>
  </ul>
  `,
  styles: []
})
export class TestingComponent implements OnInit {

  category : string = 'people';
  peopleList$ : Observable<List>;
  people : object[];

  constructor(private swapiService : SwapiService) { }

  ngOnInit() {

    // subscribing to observables in template
      // this.peopleList$ = this.swapiService
      //   .getList(this.category)

    // subscribing to observables programmatically 
    this.swapiService
      .getList(this.category)
      .subscribe(response => {
        console.log(response);
        this.people = response.results;
      }, error => {
        console.log(error)
      })
  }

}
