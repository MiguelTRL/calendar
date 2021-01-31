import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class CalendarModule { }
