import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LeftNavigationBarComponent } from './left-navigation-bar/left-navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftNavigationBarComponent, RouterOutlet, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portal';
}
