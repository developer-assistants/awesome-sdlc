# 7-Phase SDLC Project Checklist

## 1. Planning
- [ ] Define project scope and non-goals
- [ ] Identify stakeholders and release owner
- [ ] Estimate timeline, budget, and hosting cost

## 2. Requirements analysis
- [ ] Write user stories with acceptance criteria
- [ ] Document non-functional targets (uptime, latency, auth)
- [ ] Review privacy and data retention rules

## 3. System design
- [ ] Draft architecture diagram and service boundaries
- [ ] Design relational schema and migration strategy
- [ ] Define REST or GraphQL API contracts

## 4. Implementation
- [ ] Configure repository, linter, and CI pipeline
- [ ] Implement feature modules with unit tests
- [ ] Require peer code review on every pull request

## 5. Testing
- [ ] Run automated integration and end-to-end tests
- [ ] Verify auth, role permissions, and input validation
- [ ] Run load and latency checks in staging

## 6. Deployment
- [ ] Run database migrations with rollback plan
- [ ] Deploy to production with canary or blue-green switch
- [ ] Verify health checks, logs, and error alerts

## 7. Maintenance
- [ ] Monitor error budgets and p95 latency
- [ ] Apply dependency and OS security patches
- [ ] Log post-release feedback into the backlog
