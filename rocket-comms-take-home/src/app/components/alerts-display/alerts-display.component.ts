import { Component, signal, inject, computed } from '@angular/core';
import {
  RuxAccordion,
  RuxAccordionItem,
  RuxCard,
  RuxStatus,
  RuxButton,
  RuxSelect,
  RuxOption,
} from '@astrouxds/angular';
import { SatelliteDataApi } from '../../core/services/api/api.service';
import type { AlertSummary, Status } from '../../core/types/alerts.types';
import { AppAlertsDisplayDialog } from './dialog/alerts-dialog.component';

type AlertView = 'new' | 'ack';
type SeverityFilter = Status | 'all';

@Component({
  selector: 'app-alerts-display',
  imports: [
    RuxAccordion,
    RuxAccordionItem,
    RuxCard,
    RuxStatus,
    RuxButton,
    RuxSelect,
    RuxOption,
    AppAlertsDisplayDialog,
  ],
  templateUrl: './alerts-display.component.html',
  styleUrl: './alerts-display.component.css',
})
export class AppAlertsDisplay {
  private api = inject(SatelliteDataApi);
  private allAlerts = signal<AlertSummary[]>(this.api.getAllAlerts());
  view = signal<AlertView>('new');
  severityFilter = signal<SeverityFilter>('all');

  selectedAlert = signal<AlertSummary | null>(null);
  isDialogOpen = signal(false);

  readonly filteredAlerts = computed(() => {
    const alerts = this.allAlerts();
    const view = this.view();
    const severity = this.severityFilter();

    return alerts
      .filter((alert) => (view === 'new' ? !alert.acknowledged : alert.acknowledged))
      .filter((alert) => (severity === 'all' ? true : alert.severity === severity))
      .sort(this.sortAlertsByTime);
  });

  setView(value: string | string[] | undefined) {
    if (!value) return;

    const view = Array.isArray(value) ? value[0] : value;

    if (view === 'new' || view === 'ack') {
      this.view.set(view);
    }
  }

  setSeverity(value: string | string[] | undefined) {
    if (!value) return;
    const severity = Array.isArray(value) ? value[0] : value;
    this.severityFilter.set(severity as SeverityFilter);
  }

  showDialog(alert: AlertSummary) {
    this.selectedAlert.set(alert);
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.selectedAlert.set(null);
    this.isDialogOpen.set(false);
  }

  handleRuxDialogClosed(event: any) {
    if (event && this.selectedAlert()) {
      console.log('got here');
      this.acknowledgeAlert(this.selectedAlert()!.key);
    }
    this.closeDialog();
  }

  acknowledgeAlert(key: symbol) {
    this.allAlerts.update((alerts) =>
      alerts.map((alert) => (alert.key === key ? { ...alert, acknowledged: true } : alert)),
    );
  }

  private sortAlertsByTime(a: AlertSummary, b: AlertSummary) {
    return (
      parseInt(b.timestamps.contactBeginTimestamp) - parseInt(a.timestamps.contactBeginTimestamp)
    );
  }
}
