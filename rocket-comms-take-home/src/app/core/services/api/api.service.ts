import { Injectable } from '@angular/core';
import { mockApiData } from './mock-api-data';
import type { Alert, AlertSummary, Contact } from '../../types/alerts.types';

@Injectable({
  providedIn: 'root',
})
export class SatelliteDataApi {
  private data: Contact[] = mockApiData;

  public getSatelliteData(): Contact[] {
    return this.data;
  }

  private getContactsWithAlerts(): Contact[] {
    return this.data.filter((contact) => contact.alerts.length > 0);
  }

  public getAllAlerts() {
    const contactsWithAlerts = this.getContactsWithAlerts();

    const alerts: AlertSummary[] = [];

    for (const contact of contactsWithAlerts) {
      for (const alert of contact.alerts as Alert[]) {
        if (alert.errorSeverity === 'warning') {
          alert.errorSeverity = 'caution';
        }
        alerts.push({
          key: alert.errorId,
          errorMessage: alert.errorMessage,
          contactName: contact.contactName,
          timestamps: {
            contactBeginTimestamp: this.unixToHHMMSS(contact.contactBeginTimestamp),
            contactEndTimestamp: this.unixToHHMMSS(contact.contactEndTimestamp),
          },
          contactSatellite: contact.contactSatellite,
          contactDetail: contact.contactDetail,
          errorTime: alert.errorTime,
          severity: alert.errorSeverity,
          acknowledged: false,
        });
      }
    }

    alerts.sort(
      (a, b) =>
        parseInt(b.timestamps.contactBeginTimestamp) - parseInt(a.timestamps.contactBeginTimestamp),
    );

    return alerts;
  }

  private unixToHHMMSS(t: number): string {
    return new Date(t * 1000).toISOString().substr(11, 8);
  }
}
