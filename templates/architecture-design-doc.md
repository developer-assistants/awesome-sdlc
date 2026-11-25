# Architecture Design Document (ADD)

- Service / Feature: [Name]
- Author: [Tech Lead]
- Reviewers: [Names]
- Date: YYYY-MM-DD

## 1. Context
Summarize the business goal and technical constraints driving this design.

## 2. Architecture overview
Describe services, queues, caches, and data stores. Link to a diagram generated with the SDLC Diagram Generator.

## 3. Data model and API contracts
- Primary tables or collections and indexes.
- Public endpoints, request/response shapes, and idempotency keys.

## 4. Failure modes and mitigations
| Failure scenario | Impact | Mitigation |
|---|---|---|
| Primary database failover | Brief write errors | Connection pool retry + read replica promotion |
| Downstream API timeout | Elevated latency | 2s timeout + circuit breaker + dead-letter queue |

## 5. Security and privacy
- Authentication and authorization boundaries.
- Secrets management and PII retention rules.

## 6. Rollout and rollback plan
- Feature flag or canary traffic ramp (10% -> 50% -> 100%).
- Backward-compatible schema migration order.
