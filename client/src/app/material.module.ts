import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule
  ],
  exports: [MatCardModule, MatButtonModule, MatInputModule, MatListModule],
  declarations: []
})
export class MaterialModule {}
