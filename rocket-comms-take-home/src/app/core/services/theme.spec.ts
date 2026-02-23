import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { firstValueFrom } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should have default theme as dark', async () => {
    const theme = await firstValueFrom(service.theme$);
    expect(theme).toBe('dark');
  });

  it('should emit new theme when setTheme is called', async () => {
    service.setTheme('light');
    const theme = await firstValueFrom(service.theme$);
    expect(theme).toBe('light');
  });
});
