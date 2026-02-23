import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppHeader } from './components/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { AppAlertsDisplay } from './components/alerts-display/alerts-display.component';

@Component({
  selector: 'app-root',
  imports: [AppHeader, AppAlertsDisplay],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      theme === 'light'
        ? this.renderer.addClass(document.body, 'light-theme')
        : this.renderer.removeClass(document.body, 'light-theme');
    });
  }
}
