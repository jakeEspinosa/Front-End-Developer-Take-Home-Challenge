import { Component } from '@angular/core';
import {
  RuxAccordion,
  RuxAccordionItem,
  RuxCard,
  RuxStatus,
  RuxButton,
  RuxIcon,
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
    RuxIcon,
    RuxDialog,
    RuxSelect,
    RuxOption,
  ],
  templateUrl: './alerts-display.component.html',
  styleUrl: './alerts-display.component.css',
})
export class AppAlertsDisplay {
  newAlerts: AlertSummary[] = [];
  acknowledgedAlerts: AlertSummary[] = [];
  currentAlerts: AlertSummary[] = [];
  isNewOrAck: NewOrAck = 'new';

  isDialogOpen: boolean = false;
  dialogMessageContact: number | null = null;
  dialogMessageDetail: string | null = null;

  constructor(private satelliteDataApi: SatelliteDataApi) {
    this.newAlerts = satelliteDataApi.getAllAlerts();
    this.currentAlerts = this.getCurrentAlerts('new');
  }

  getCurrentAlerts(typeOfAlert: 'new' | 'ack') {
    if (typeOfAlert === 'new') {
      this.isNewOrAck = 'new';
      this.currentAlerts = this.newAlerts;
    } else {
      this.isNewOrAck = 'ack';
      this.currentAlerts = this.acknowledgedAlerts;
    }
    return this.currentAlerts;
  }

  showDialog(alert: AlertSummary): void {
    this.isDialogOpen = true;
    this.dialogMessageContact = alert.contactName;
    this.dialogMessageDetail = alert.contactDetail;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  handleStatusSelection(event: Event): void {
    const value = (event.target as HTMLRuxSelectElement)?.value;
    if (!value) return;

    this.getCurrentAlerts(value as 'new' | 'ack');
  }
}
