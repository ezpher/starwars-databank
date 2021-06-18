import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item, List } from '../shared/models/models';
import { SwapiService } from '../shared/services/swapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  
  listSubscription: Subscription;
  category: string;
  list: List<Item>;
  items: Item[];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private swapiSvc: SwapiService
  ) { 
    this.category = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.getList(this.swapiSvc, this.category)
  }

  getList(swapiService: SwapiService, category: string, queryString: string = '') {
    this.listSubscription = swapiService
      .getList(category, queryString)
      .subscribe(res => {
        this.list = res;
        this.items = this.list.results;
      });
  }

  goToItem(url: string) {
    const URL_SECTIONS: string[] = url.split('/')
    const CATEGORY: string = URL_SECTIONS[4]
    const ID: string = URL_SECTIONS[5]

    this.router.navigate(['/item/', CATEGORY, ID])
  }

  goToPage(prevOrNextPage: string) {

    if (!prevOrNextPage) return;

    const PAGE_QUERYSTR_PATTERN: RegExp = new RegExp('\\?.+$') 
    const PAGE_QUERYSTR: string = prevOrNextPage.match(PAGE_QUERYSTR_PATTERN)[0]

    if (!PAGE_QUERYSTR) return;

    this.getList(this.swapiSvc, this.category, PAGE_QUERYSTR)
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe()
  }
}
