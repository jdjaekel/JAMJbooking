import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerService } from '../server.service';
import { booking } from 'src/booking';

@Component({
  selector: 'app-booking-stepper',
  templateUrl: './booking-stepper.component.html',
  styleUrls: ['./booking-stepper.component.css']
})
export class BookingStepperComponent implements OnInit {

  
  isUserAdmin: boolean;
  openapps: any[] = [];
  firstname: string;
  lastname: string;
  email: string;
  dateVal: string;
  barber: string;
  selectedTime: string;
  isTimeSelected = false;

  dispData()
  {
    console.log(this.firstname);

  }
 
  date = new FormControl((new Date()).toISOString().substring(0, 10));
  picker = new Date();
  

  constructor(private server: ServerService) {

    

  }
  recieveBarber($event){

      this.barber = $event;
      console.log("Barber Event: ", this.barber);

  }
  recieveTime($event){
    this.selectedTime = $event;
    this.isTimeSelected = true;
    console.log("Time Event: ", this.selectedTime);


  }
  ngOnInit() {
    

    
  }

  

  getOpenApp()
  {
    this.dateVal = this.date.value.toISOString().substring(0, 10);
    console.log("Date wrong?", this.dateVal);
    
    this.server.getOpenApps(this.dateVal).then((response: any) =>{
      this.openapps = response;
     

    })
  }
  removeOpenApp()
  {
    console.log("Remove open app ran");
    this.server.removeOpenApp(this.barber, this.dateVal, this.selectedTime).subscribe((createdBooking: booking) => {
          
      this.barber = '';
      this.firstname = '';
      this.lastname = '';
      this.dateVal = '';
      this.selectedTime = '';
      this.email ='';
      const appointmentDate = new Date(createdBooking.date).toDateString();
      
    },
    (error: ErrorEvent) => {
      console.log("Big ol error.");
    });;
  }
  addBooking(){

    
   
    console.log("Date wrong2?", this.dateVal);
      this.server.addBooking(this.barber, this.firstname, this.lastname,
        this.dateVal, this.selectedTime
        ).subscribe((createdBooking: booking) => {
          
          this.barber = '';
          this.firstname = '';
          this.lastname = '';
          this.dateVal = '';
          this.selectedTime = '';
          this.email ='';
          const appointmentDate = new Date(createdBooking.date).toDateString();
          
        },
        (error: ErrorEvent) => {
          console.log("Big ol error.");
        });
    
  }

}
