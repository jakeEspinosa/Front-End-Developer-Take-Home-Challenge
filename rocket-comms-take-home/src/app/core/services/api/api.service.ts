import { Injectable } from '@angular/core';
import { mockApiData } from './mock-api-data';

type Contact = (typeof mockApiData)[number];
type Alert = Contact['alerts'][number];

type AlertSummary = {
  key: symbol;
  errorMessage: string;
  contactName: number;
  timestamps: {
    contactBeginTimestamp: string;
    contactEndTimestamp: string;
  };
  contactSatellite: string;
  contactDetail: string;
  errorTime: number;
  severity: string;
  acknowledged: boolean;
};

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
        alerts.push({
          key: Symbol(),
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
