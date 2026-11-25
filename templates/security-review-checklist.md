# SSDLC Security Review and Threat Model Checklist

- Service / Feature: [Name]
- Reviewer: [Engineer / Security Lead]
- Date: YYYY-MM-DD

## 1. Data classification and entry points
- [ ] All public endpoints, webhooks, background jobs, and admin routes are listed.
- [ ] Sensitive fields (PII, tokens, credentials, payment identifiers) are marked.
- [ ] Data retention and deletion rules are documented.

## 2. Authentication and authorization
- [ ] Every mutating endpoint enforces authentication and object-level authorization (IDOR checks).
- [ ] Session cookies use HttpOnly, Secure, and SameSite flags.
- [ ] API keys and service tokens follow least-privilege scopes and rotation schedules.

## 3. Input validation and dependencies
- [ ] Request bodies and query parameters are validated against strict schemas.
- [ ] Parameterized queries are used everywhere to prevent SQL injection.
- [ ] Automated dependency audit and SAST scan pass with zero critical or high findings.

## 4. Logging, secrets, and abuse protection
- [ ] Secrets are loaded from a secret manager, never committed to Git.
- [ ] Passwords, tokens, and full card numbers are scrubbed from logs.
- [ ] Rate limiting and account lockout protect login and password-reset endpoints.
