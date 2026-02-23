import { mockApiData } from '../services/api/mock-api-data';

// Value types
export type Contact = (typeof mockApiData)[number];
export type Alert = Contact['alerts'][number];
export type AlertSummary = {
  key: string;
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
