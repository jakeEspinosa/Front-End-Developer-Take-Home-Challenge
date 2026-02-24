import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SatelliteDataApi } from './api.service';
import type { Contact } from '../../types/alerts.types';

describe('SatelliteDataApi (Vitest)', () => {

  const mockContacts: Contact[] = [
    {
      contactName: 'Contact A',
      contactSatellite: 'SAT-1',
      contactDetail: 'Detail A',
      contactBeginTimestamp: 1700000000,
      contactEndTimestamp: 1700003600,
      alerts: [
        {
          errorId: '1',
          errorMessage: 'Warning alert',
          errorSeverity: 'warning',
          errorTime: 1700000100,
        },
      ],
    } as any,
    {
      contactName: 'Contact B',
      contactSatellite: 'SAT-2',
      contactDetail: 'Detail B',
      contactBeginTimestamp: 1600000000,
      contactEndTimestamp: 1600003600,
      alerts: [
        {
          errorId: '2',
          errorMessage: 'Critical alert',
          errorSeverity: 'critical',
          errorTime: 1600000100,
        },
      ],
    } as any,
    {
      contactName: 'Contact C',
      contactSatellite: 'SAT-3',
      contactDetail: 'Detail C',
      contactBeginTimestamp: 1500000000,
      contactEndTimestamp: 1500003600,
      alerts: [],
    } as any,
  ];

  let service: SatelliteDataApi;

  beforeEach(() => {
    service = new SatelliteDataApi();
    (service as any).data = mockContacts;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return satellite data', () => {
    const data = service.getSatelliteData();
    expect(data).toHaveLength(3);
    expect(data[0].contactName).toBe('Contact A');
  });

  it('should only return alerts from contacts with alerts', () => {
    const alerts = service.getAllAlerts();
    expect(alerts).toHaveLength(2);
  });

  it('should convert warning severity to caution', () => {
    const alerts = service.getAllAlerts();
    const warningAlert = alerts.find(a => a.key === '1');
    expect(warningAlert?.severity).toBe('caution');
  });

  it('should preserve other severities', () => {
    const alerts = service.getAllAlerts();
    const criticalAlert = alerts.find(a => a.key === '2');
    expect(criticalAlert?.severity).toBe('critical');
  });

  it('should format unix timestamps as HH:mm:ss', () => {
    const alerts = service.getAllAlerts();
    const alert = alerts[0];

    expect(alert.timestamps.contactBeginTimestamp).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    expect(alert.timestamps.contactEndTimestamp).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('should sort alerts by contactBeginTimestamp descending', () => {
    const alerts = service.getAllAlerts();

    expect(alerts[0].contactName).toBe('Contact A');
    expect(alerts[1].contactName).toBe('Contact B');
  });

  it('should default acknowledged to false', () => {
    const alerts = service.getAllAlerts();
    alerts.forEach(alert => {
      expect(alert.acknowledged).toBe(false);
    });
  });
});