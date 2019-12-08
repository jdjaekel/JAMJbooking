import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { booking } from 'src/booking';
import { Observable } from 'rxjs';
import { RemoveBooking } from 'src/RemoveBooking';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  

    constructor(private http: HttpClient) {
    }

    private async request(method: string, url: string, data?: any) {
      

      const result = this.http.request(method, url);
      
      return new Promise((resolve, reject) => {
        result.subscribe(resolve, reject);
      });
    }
    public removeOpenApp(employee: string, date: string, time: string): Observable<RemoveBooking> {
      console.log("Service initiated",  employee + " " + date + " " + time);
      return this.http.post<RemoveBooking>(`${environment.serverUrl}/booking/delete`, { employee, date, time})
    }
    public getBookings(){
      return this.request('GET', `${environment.serverUrl}/booking`);
    }
    public addBooking(employee: string, firstname: string, lastname: string, date: string, time: string): Observable<booking> {
        return this.http.post<booking>(`${environment.serverUrl}/booking`, { employee, firstname, lastname, date, time });
      }
    public getOpenApps(date: string){
      return this.request('GET', `${environment.serverUrl}/openapp/${date}`)

    }
    public deleteBooking(id: string) {
      return this.request('DELETE', `${environment.serverUrl}/booking/${id}`);
    }

  
}