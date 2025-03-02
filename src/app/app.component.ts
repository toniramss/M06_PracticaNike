import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "./components/header-component/header-component.component";
import { FooterComponentComponent } from "./components/footer-component/footer-component.component";
import { NavbarComponentComponent } from "./components/navbar-component/navbar-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponentComponent, FooterComponentComponent, NavbarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practicaNike';
}
