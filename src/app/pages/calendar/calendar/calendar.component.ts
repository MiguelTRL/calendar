import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import  {RemiderComponent } from '../remider/remider.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }


  week = [
    "Mon",
    "Tue",
    "Wen",
    "Thu",
    "Fri",
    "Sat",
    "sun"
  ]
  dateSelect: any;

  monthSelect: any = [];
  ngOnInit(): void {
    this.getDaysFromDate(2, 2021);
    console.log("los dias son", this.week)
  }

  getDaysFromDate(month, year) {
    const starDate = moment.utc(`${year}/${month}/1`);
    const endDate = starDate.clone().endOf('month');
    this.dateSelect = starDate;
    const diffDays = endDate.diff(starDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      console.log(a)
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);

      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        remiders : [] 
      }

    });

    this.monthSelect = arrayDays;


    console.log("array month is", arrayDays)

  }

  changueMonth(flag) {

    if (flag > 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"),prevDate.format("YYYY"))
    }else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"),nextDate.format("YYYY"))
    }
  }
  addRemider(day){

    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    console.log(objectDate);
    const modalRef = this.modalService.open(RemiderComponent, { "size": "md", "centered": true });
    modalRef.componentInstance.day = objectDate;
    modalRef.result.then(res=>{
      if(res){
        console.log("llegaron los cambios",res)

      }
    })
    
  }


  

}
