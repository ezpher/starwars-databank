import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwapiService } from '../shared/services/swapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  category: string;
  items : object[];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private swapiSvc: SwapiService
  ) { 
    this.category = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.swapiSvc
      .getList(this.category)
      .subscribe(res => this.items = res.results);
  }

  goToItem(url: string) {
    const URL_SECTIONS = url.split('/')
    const CATEGORY = URL_SECTIONS[4]
    const ID = URL_SECTIONS[5]

    this.router.navigate(['/item/', CATEGORY, ID])
  }
}
