import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RemiderComponent } from '../remider/remider.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ClimeService } from '../../../services/clime.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(
    private modalService: NgbModal, private clime: ClimeService
  ) { }

  actualClime :any ; 
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
  reminders: any = [];
  monthSelect: any = [];
  actualDay: any;
  ngOnInit(): void {
    var check = moment(new Date(), 'YYYY/MM/DD');
    this.getDaysFromDate(check.format('M'), check.format('YYYY'));

    this.clime.getClime().subscribe(res => {
      console.log(res)
      this.actualClime = res;
    })

  }

  getDaysFromDate(month, year) {
    const starDate = moment(`${year}/${month}/1`);
    const endDate = starDate.clone().endOf('month');
    this.dateSelect = starDate;
    this.actualDay = moment(new Date(), 'YYYY/MM/DD').format('YYYY-MM-D');
    console.log("actual day", this.actualDay)
    const diffDays = endDate.diff(starDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        dayValue: dayObject.format('YYYY-MM-D'),
        dateMoment: dayObject,
        indexWeek: dayObject.isoWeekday(),
        remiders: []
      }

    });

    this.monthSelect = arrayDays;
    this.validateRemindersAll()



  }

  validateRemindersAll() {
    this.monthSelect.map((res, i) => {
      if (localStorage.getItem("reminders")) {
        var reminders = JSON.parse(localStorage.getItem("reminders"));
        this.reminders = reminders;
        reminders.map(reminder => {
          if (res.dateMoment.format('YYYY-MM-D') === moment(reminder.day).format('YYYY-MM-D')) {
            this.monthSelect[i].remiders.push(reminder)
          }
        })
      }


    })
  }
  deleteTrash(i) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reminder!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.monthSelect[i].remiders = [];
        this.saveReminders();
      }

    })
  }
  changueMonth(flag) {

    if (flag > 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"))
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"))
    }
  }
  addRemider(day) {

    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    const modalRef = this.modalService.open(RemiderComponent, { "size": "md", "centered": true });
    modalRef.componentInstance.day = objectDate;
    modalRef.result.then(res => {
      if (res) {
        this.reminders.push(res);
        localStorage.setItem("reminders", JSON.stringify(this.reminders));
        Swal.fire('attached reminder', '', 'success')
        this.validateReminders(res);

      }
    })

  }

  validateReminders(reminder) {
    this.monthSelect.map((res, i) => {

      if (res.dateMoment.format('YYYY-MM-D') === reminder.day.format('YYYY-MM-D')) {
        this.monthSelect[i].remiders.push(reminder)
      }
    });
  }


  editReminder(reminder, daypos, i, day) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    const modalRef = this.modalService.open(RemiderComponent, { "size": "md", "centered": true });
    modalRef.componentInstance.edit = reminder;
    modalRef.componentInstance.day = objectDate;
    modalRef.result.then(res => {
      if (res != "deleted") {
        this.monthSelect[daypos].remiders[i] = res;

        setTimeout(() => {
          this.saveReminders();

        }, 100);
      } else {
        this.monthSelect[daypos].remiders.splice(i, 1);
        this.saveReminders();
      }
    })

  }

  saveReminders() {
    var reminders = [];
    this.monthSelect.map(res => {
      res.remiders.map(reminder => {
        reminders.push(reminder)
      })
    });
    localStorage.setItem("reminders", JSON.stringify(reminders));

  }



}
