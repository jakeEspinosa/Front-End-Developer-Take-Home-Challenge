import { Component, input, output } from '@angular/core';
import { RuxDialog, RuxButton } from '@astrouxds/angular';
import type { AlertSummary } from '../../../core/types/alerts.types';

@Component({
  selector: 'app-alerts-display-dialog',
  imports: [RuxDialog, RuxButton],
  templateUrl: './alerts-dialog.component.html',
  styleUrl: './alerts-dialog.component.css',
})
export class AppAlertsDisplayDialog {
  alert = input<AlertSummary | null>(null);
  open = input(false);

  acknowledge = output<symbol>();
  close = output<void>();
}
