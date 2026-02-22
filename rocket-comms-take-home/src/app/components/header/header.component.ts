import { Component } from '@angular/core';
import { RuxGlobalStatusBar } from '@astrouxds/angular';
import { AppThemeSwitch } from './theme-switch/theme-switch.component';

@Component({
  selector: 'app-header',
  imports: [RuxGlobalStatusBar, AppThemeSwitch],
  templateUrl: './header.component.html',
})
export class AppHeader {}
