import { Component } from '@angular/core';
import { AppHeader } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [AppHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
