import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
