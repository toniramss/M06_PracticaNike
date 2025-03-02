import { Component } from '@angular/core';
import { HomeBannerComponent } from "../home-banner/home-banner.component";
import { Slider1Component } from "../slider1/slider1.component";

@Component({
  selector: 'app-home-component',
  imports: [HomeBannerComponent, Slider1Component],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
