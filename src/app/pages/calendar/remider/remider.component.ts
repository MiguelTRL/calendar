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
  @Input() edit: any;

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
    if (this.edit) {
      this.redimer = this.edit.redimer,
        this.color = this.edit.color,
        this.hour = this.edit.hour
    }
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


  deleteTrash() {

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
      if (result.isConfirmed){
        this.modal.close("deleted");
      }

    })
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Once deleted, you will not be able to recover this imaginary file!",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then((willDelete) => {
    //   if (willDelete) {
    //     Swal("Poof! Your imaginary file has been deleted!", {
    //       icon: "success",
    //     });
    //   } else {
    //     Swal("Your imaginary file is safe!");
    //   }
    // });

  }
  onCountrySelected(country) {

    console.log(country)

  }

}
