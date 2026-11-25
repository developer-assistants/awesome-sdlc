# Incident Post-Mortem

- Incident ID: INC-YYYY-NNN
- Severity: Sev-1 / Sev-2
- Incident commander: [Name]
- Date: YYYY-MM-DD

## 1. Summary
State what failed, who was affected, and how long the impact lasted.

## 2. Timeline (UTC)
- HH:MM - Triggering event or deployment.
- HH:MM - Automated alert fired.
- HH:MM - Root cause isolated.
- HH:MM - Mitigation or rollback restored normal service.

## 3. Root cause
Explain the technical mechanism without blaming individuals.

## 4. What went well and what slowed recovery
- Detection time and alert signal quality.
- Runbook accuracy and rollback speed.

## 5. Follow-up action items
| Action | Owner | Due date | Ticket |
|---|---|---|---|
| Add regression test for failing migration path | [Name] | YYYY-MM-DD | #123 |
| Lower canary error-rate auto-rollback threshold | [Name] | YYYY-MM-DD | #124 |
