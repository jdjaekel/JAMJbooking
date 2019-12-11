import { Component, Output, Input, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent{
  
 
  public openapps: any[];
  selectedopenapps: any[] = [];
  history = [];
  times = [];
  value: string;
  isDisplay = false;
  


  @Input()
  set openApps(val: any){
    
    this.openapps = val;
    this.getBarbers(this.openapps);
    
    //console.log(this.history);
  }

  getBarbers(openapps: any)
  {
    //console.log('openapps recieved',  openapps); 
    this.history = [];
    if(openapps != null){
      openapps.forEach(element => {
      
        if(!this.history.includes(element.employee))
        {
          this.history.push(element.employee)
         
        }
      
        
      });

    }
    console.log(this.history);
    this.isDisplay = false;

  }

  @Output() outputBarber: EventEmitter<any> = new EventEmitter(); 
  @Output() outputDate: EventEmitter<any> = new EventEmitter(); 

  sortOpenApps(value: string){
    this.outputBarber.emit(value);
    this.value = value;
    console.log(value);
    this.selectedopenapps = [];
    this.openapps.forEach(element => {
     
      if(!element.employee.localeCompare(this.value))
      {
        
        this.selectedopenapps.push(element);
      }
    });
    console.log("Sorted?:", this.selectedopenapps);

  }

  

}
