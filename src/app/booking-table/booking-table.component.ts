import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServerService } from '../server.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.css']
})
export class BookingTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'employee', 'firstname', 'date', 'time', 'cancel'];
  
  bookings: any[] = [];
 
  cancelSuccess: boolean;

  constructor(private fb: FormBuilder, private server: ServerService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    
    this.getBookings();
  }

  private getBookings()
  {
    this.server.getBookings().then((response: any) => {
      this.bookings = response;
      console.log('Response', this.bookings);
      
      



    })


  }

  
  

  private deleteBooking(id: string)
  {
    this.server.deleteBooking(id).then(() => {
      console.log("Yeet");
      this.getBookings();
      this.cancelSuccess = true;
      
    })
    

  }

  refresh() {
    this.server.getBookings().then((response: any) => {
      this.bookings = response;
      console.log('Response', this.bookings);
    })
    
  }

}
