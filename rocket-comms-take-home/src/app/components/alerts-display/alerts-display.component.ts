import { Component, signal } from '@angular/core';
import {
  RuxAccordion,
  RuxAccordionItem,
  RuxCard,
  RuxStatus,
  RuxButton,
  RuxDialog,
  RuxSelect,
  RuxOption,
} from '@astrouxds/angular';
import { SatelliteDataApi } from '../../core/services/api/api.service';
import type { AlertSummary } from '../../core/types/alerts.types';

type NewOrAck = 'new' | 'ack';

@Component({
  selector: 'app-alerts-display',
  imports: [
    RuxAccordion,
    RuxAccordionItem,
    RuxCard,
    RuxStatus,
    RuxButton,
    RuxDialog,
    RuxSelect,
    RuxOption,
  ],
  templateUrl: './alerts-display.component.html',
  styleUrl: './alerts-display.component.css',
})
export class AppAlertsDisplay {
  newAlerts = signal<AlertSummary[]>([]);
  acknowledgedAlerts = signal<AlertSummary[]>([]);
  currentAlerts = signal<AlertSummary[]>([]);
  isNewOrAck = signal<NewOrAck>('new');

  selectedAlert = signal<AlertSummary | null>(null);

  isDialogOpen = signal(false);
  dialogMessageContact = signal<number | null>(null);
  dialogMessageDetail = signal<string | null>(null);

  constructor(private satelliteDataApi: SatelliteDataApi) {
    this.newAlerts.set(this.satelliteDataApi.getAllAlerts());
    this.getCurrentAlerts('new');
  }

  getCurrentAlerts(typeOfAlert: 'new' | 'ack') {
    this.isNewOrAck.set(typeOfAlert);
    if (typeOfAlert === 'new') {
      this.currentAlerts.set([...this.newAlerts()]);
    } else {
      this.currentAlerts.set([...this.acknowledgedAlerts()]);
    }
  }

  showDialog(alert: AlertSummary) {
    this.selectedAlert.set(alert);
    this.isDialogOpen.set(true);
    this.dialogMessageContact.set(alert.contactName);
    this.dialogMessageDetail.set(alert.contactDetail);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
    this.selectedAlert.set(null);
  }

  handleRuxDialogClosed(event: any) {
    if (event.detail && this.selectedAlert()) {
      this.acknowledgeAlert(this.selectedAlert()!.key);
    }
    this.closeDialog();
  }

  handleStatusSelection(value: string | string[] | undefined) {
    if (value === 'new' || value === 'ack') {
      this.getCurrentAlerts(value);
    }
  }

  acknowledgeAlert(key: string) {
    const updatedCurrent = [...this.currentAlerts()];
    const index = updatedCurrent.findIndex((alert) => alert.key === key);

    if (index !== -1) {
      const [alert] = updatedCurrent.splice(index, 1);
      this.currentAlerts.set(updatedCurrent);

      const acknowledgedAlert = { ...alert, acknowledged: true };
      this.acknowledgedAlerts.set([...this.acknowledgedAlerts(), acknowledgedAlert]);
    }
  }
}
