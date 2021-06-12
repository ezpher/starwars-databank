import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './testing/testing.component';
import { HttpClientModule } from '@angular/common/http';
import { StarWarsMaterialModule } from './shared/star-wars-material/star-wars-material.module';
import { CategoriesComponent } from './categories/categories.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    CategoriesComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StarWarsMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
