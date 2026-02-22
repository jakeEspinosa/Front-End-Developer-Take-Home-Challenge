import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('dark');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
  }
}
