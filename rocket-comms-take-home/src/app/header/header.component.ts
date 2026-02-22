import { Component } from '@angular/core';
import { RuxGlobalStatusBar } from '@astrouxds/angular';

@Component({
  selector: 'app-header',
  imports: [RuxGlobalStatusBar],
  templateUrl: './header.component.html',
})
export class AppHeader {}
