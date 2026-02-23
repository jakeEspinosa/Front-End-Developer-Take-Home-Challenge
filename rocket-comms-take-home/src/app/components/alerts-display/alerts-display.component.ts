import { Component } from '@angular/core';
import {
  RuxAccordion,
  RuxAccordionItem,
  RuxCard,
  RuxStatus,
  RuxButton,
  RuxIcon,
  RuxDialog,
} from '@astrouxds/angular';
import { SatelliteDataApi } from '../../core/services/api/api.service';
import type { AlertSummary } from '../../core/types/alerts.types';

type NewOrAck = 'new' | 'ack';

@Component({
  selector: 'app-alerts-display',
  imports: [RuxAccordion, RuxAccordionItem, RuxCard, RuxStatus, RuxButton, RuxIcon, RuxDialog],
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
      return this.newAlerts;
    } else {
      this.isNewOrAck = 'ack';
      return this.acknowledgedAlerts;
    }
  }

  showDialog(alert: AlertSummary): void {
    this.isDialogOpen = true;
    this.dialogMessageContact = alert.contactName;
    this.dialogMessageDetail = alert.contactDetail;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
