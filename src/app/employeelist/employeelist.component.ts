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
  

  //@Input() openapps: any[];
  @Input()
  set openApps(val: any){
    
    this.openapps = val;

    this.openapps.forEach(element => {
      
      if(!this.history.includes(element.employee))
      {
        this.history.push(element.employee)
       
      }
    
      
    });
    console.log(this.history);

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
  
  /*ngOnInit(): void {
    this.openapps.forEach(element => {
      console.log(element.employee);
      if(!this.history.includes(element.employee))
      {
        this.history.push(element)
      }
      
    });
    console.log("History", this.history);
  }
*/
 
  


  
  
  
  


  

}
