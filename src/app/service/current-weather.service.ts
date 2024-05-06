import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor(private http: HttpClient) { }
  API_Key = '78658842978cd50442bdba2cf2bacc0b';

  getCurrentWather(city: any): Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78658842978cd50442bdba2cf2bacc0b`);
  }
}
