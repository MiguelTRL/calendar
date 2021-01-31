import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-remider',
  templateUrl: './remider.component.html',
  styleUrls: ['./remider.component.css']
})
export class RemiderComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }
  @Input() day: any;
  redimer: any;
  selectedColor: any;
  color: any;
  hour: any;
  colors = [
    {
      name: 'yellow',
      value: '#ffff00'
    },
    {
      name: 'red',
      value: '#ff3300'
    },
    {
      name: 'blue',
      value: '#0000ff'
    }
  ];
  ngOnInit(): void {
  }

  cancel() {
    this.modal.close();
  }
  addRedimer() {

    if (!this.redimer || !this.color || !this.hour) {
      Swal.fire("Tarea incompleta", '', 'warning')
    } else {
      const addRedimer = {
        day: this.day,
        redimer: this.redimer,
        color: this.color,
        hour: this.hour
      }
      this.modal.close(addRedimer)
    }

  }

}
