import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioEditComponent } from './portfolio-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    PortfolioEditComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PortfolioEditModule { }
