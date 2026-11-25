# Deployment Runbook

- Service: [Service Name]
- Release tag: `vX.Y.Z`
- Release manager: [Name]
- Date: YYYY-MM-DD

## 1. Pre-deployment checklist
- [ ] CI build, unit tests, integration tests, and security scan passed.
- [ ] Database snapshot verified and migrations tested against staging copy.
- [ ] On-call engineer alerted and dashboards open.

## 2. Rollout steps
1. Apply backward-compatible database migrations.
2. Deploy immutable container image `vX.Y.Z` to canary group (10% traffic).
3. Monitor HTTP 5xx rate, p95 latency, and error logs for 15 minutes.
4. Expand rollout to 50%, then 100% of production traffic.

## 3. Rollback steps
1. Shift 100% of traffic back to previous known-good tag `vX.Y.(Z-1)`.
2. Leave additive database columns in place to avoid data loss.
3. Post incident status in engineering channel and schedule a post-mortem.
