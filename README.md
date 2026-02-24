# Ground Resources Management (GRM) Alerts Dashboard – Angular Implementation
This project implements a GRM alerts dashboard using Angular and the Astro UXDS (Astro component library). The goal was to present contact and alert data from data.json in a clear, intuitive, and operator-focused interface.

## Application Structure
The application is structured into two primary UI sections:

### Header
- Displays the dashboard title and integrates Astro theming for a consistent GRM-style interface.

### Alerts Display
- Presents a sortable list of alerts.
- Each alert displays:
    - Alert message (errorMessage)
    - Contact name (contactName)
    - Contact time (contactBeginTimestamp – contactEndTimestamp)
- Alerts are sorted by errorTime in descending order (most recent first).
- Severity filtering allows operators to prioritize high-severity alerts.
- A “Show Details” button opens a rux-dialog modal displaying:
    - contactSatellite
    - contactDetail

## Alerts State & Interaction Logic

The alerts display component uses signals and computed values to manage reactive state in a clean and predictable way. All alerts are stored in a local signal, while derived state such as view mode (new vs ack) and severity filtering are handled through computed logic, ensuring the UI automatically updates whenever state changes. Alerts are filtered by acknowledgement status and severity, then sorted by most recent contact time before rendering.

Dialog interactions are also state-driven: selecting an alert sets the active alert signal and opens the rux-dialog, and when the dialog closes, the alert is programmatically acknowledged. The acknowledgement logic immutably updates the alert collection, ensuring acknowledged alerts become visually distinct and cannot be reverted, aligning with the operational requirements.
