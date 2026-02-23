import { Component } from '@angular/core';
import { RuxAccordion, RuxAccordionItem, RuxCard } from '@astrouxds/angular';
import { SatelliteDataApi } from '../../core/services/api/api.service';

@Component({
  selector: 'app-alerts-display',
  imports: [RuxAccordion, RuxAccordionItem, RuxCard],
  templateUrl: './alerts-display.component.html',
  styleUrl: './alerts-display.component.css',
})
export class AppAlertsDisplay {
  alerts;

  constructor(private satelliteDataApi: SatelliteDataApi) {
    this.alerts = satelliteDataApi.getAllAlerts();
  }
}
