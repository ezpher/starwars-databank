import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatFormFieldModule, MatPaginator, MatSpinner } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
    MatInputModule, MatSelectModule, MatCardModule,
    MatFormFieldModule, MatPaginator, MatSpinner, BrowserAnimationsModule
  ],
  imports: [
    CommonModule
  ]
})
export class StarWarsMaterialModule { }
