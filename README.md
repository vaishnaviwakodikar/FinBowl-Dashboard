# FinBowl — RMS (Design-to-Code)

React implementation of the RMS Disbursement, Loans, and Loan Detail screens.

## Stack
React 19 (function components + hooks) · Vite · React Router · Tailwind CSS · lucide-react

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## What's implemented
- **Disbursement** (`/rms/disbursement`) — stat cards, searchable/paginated table, loading / error / empty states via a mock async API in `src/data/mockData.js`.
- **Loans list** (`/rms/loans`) — entry point to the Add Loan flow.
- **Add Loan** (`/rms/loans/new`) — full form (customer, loan, commission, broker, notes) with inline validation and a submit error state. The "Save as Draft" ↔ "Cancel" button swaps once the form becomes dirty, matching the two form states in the source screens.
- **Loan Detail** (`/rms/loans/:caseId`) — scroll-spy section nav, commission breakdown, brokers, payments, and documents.

## Notes on source fidelity
This was built from four exported PNG screenshots rather than direct Figma access (the shared link required Figma login, which isn't reachable from this environment). Spacing, type scale, and colors are close estimates from the screenshots rather than exact Figma measurements — worth a quick diff against Dev Mode before shipping. The one visible inconsistency in the source screens (a duplicated "Loan Information" entry in the Loan Detail side nav) was resolved to a single entry.

## Responsive behavior
Sidebar collapses behind a hamburger menu below the `lg` breakpoint. The disbursement table scrolls horizontally on narrow viewports instead of squashing columns. Forms and detail cards drop from multi-column to single-column below `sm`.

## Real-world states handled
Loading, error (with retry), and empty states are implemented for both the Disbursement table and Loan Detail fetch, plus form-level validation and a submit-failure state on Add Loan — none of which appear explicitly in the source design.
