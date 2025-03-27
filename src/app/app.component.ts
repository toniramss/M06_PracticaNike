import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "./components/header-component/header-component.component";
import { FooterComponentComponent } from "./components/footer-component/footer-component.component";
import { NavbarComponentComponent } from "./components/navbar-component/navbar-component.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponentComponent, FooterComponentComponent, NavbarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practicaNike';

  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isLoginOrRegister(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/register';
  }

}
