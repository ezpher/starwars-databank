import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../shared/services/swapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  category: string;
  items : object[];

  constructor(route : ActivatedRoute, private swapiSvc : SwapiService) { 
    this.category = route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.swapiSvc.getList(this.category).subscribe(res => this.items = res.results);
  }

}
