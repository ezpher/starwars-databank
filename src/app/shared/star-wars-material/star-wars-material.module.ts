import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const MODULES = [
  MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
  MatInputModule, MatSelectModule, MatCardModule,
  MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule, BrowserAnimationsModule
]

@NgModule({
  imports: [CommonModule, ...MODULES] ,
  exports: MODULES
})
export class StarWarsMaterialModule { }
