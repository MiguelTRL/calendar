import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimeService {

  constructor(

    private http: HttpClient,


  ) { }


  getClime()  {
  
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6d3af442b2b0065692d0b67eaead6c12`)

  }
}
