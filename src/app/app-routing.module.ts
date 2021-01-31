import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'calendar', loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {path: '',redirectTo: 'calendar',pathMatch: 'full'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
