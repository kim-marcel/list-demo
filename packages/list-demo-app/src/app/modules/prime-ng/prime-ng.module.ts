import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, InputTextModule } from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class PrimeNGModule { }
