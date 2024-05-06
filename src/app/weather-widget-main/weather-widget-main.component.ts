import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../service/current-weather.service';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.scss']
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData: any;
  searchText:string = 'Delhi';
  constructor(private _CurrentWeatherService: CurrentWeatherService) { 

  }

  ngOnInit(): void {
    this.GetWeatherEvent();
  }



  GetWeatherEvent() {
    this._CurrentWeatherService.getCurrentWather(this.searchText).subscribe((response) => {
      this.setWeatherData(response);
    }, (error) => {
      console.log(error);
    })
  }

  setWeatherData(data: any) {
    this.WeatherData = data;

    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();

    let sunriseTime = new Date(this.WeatherData.sys.sunrise * 1000);
    this.WeatherData.sunrise_time = sunriseTime.toLocaleTimeString();

    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.wind.speed_km = (this.WeatherData.wind.speed * 3.6).toFixed(1);
  }
}
