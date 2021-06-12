import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  {path: 'testing', component: TestingComponent },
  {path: '', component: CategoriesComponent },
  {path: 'list/:category', component: ListComponent },
  {path: 'item/:category/:id', component: ItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
