# Software Requirements Specification (SRS)

- System: [System Name]
- Version: 1.0
- Author: [Engineer / Analyst]
- Date: YYYY-MM-DD

## 1. Purpose and scope
State what the software does, who interacts with it, and which external systems it connects to.

## 2. Functional requirements
| ID | Requirement | Priority | Verification method |
|---|---|---|---|
| FR-01 | System authenticates API clients with OAuth 2.0 tokens. | Must | Integration test |
| FR-02 | System validates incoming payloads against JSON Schema. | Must | Unit test |
| FR-03 | System records an audit event for every state mutation. | Must | Integration test |

## 3. Non-functional requirements
| ID | Category | Target |
|---|---|---|
| NFR-01 | Performance | p95 response time under 200ms at 500 RPS |
| NFR-02 | Security | TLS 1.3 in transit, AES-256 encryption at rest |
| NFR-03 | Recovery | RPO 5 minutes, RTO 30 minutes |

## 4. Assumptions and constraints
List platform, browser, regulatory, or third-party rate-limit constraints.
