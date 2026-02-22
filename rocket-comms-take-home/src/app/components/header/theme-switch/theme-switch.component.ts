import { Component } from '@angular/core';
import { RuxSwitch } from '@astrouxds/angular';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  imports: [RuxSwitch],
  templateUrl: './theme-switch.component.html',
})
export class AppThemeSwitch {
  current: 'light' | 'dark' = 'dark';

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    console.log(this.current);
    this.themeService.setTheme(this.current);
  }
}
