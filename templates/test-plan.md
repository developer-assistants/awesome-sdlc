# QA Test Plan

- Release: [Version / Feature]
- QA Lead: [Name]
- Date: YYYY-MM-DD

## 1. Scope
List features and endpoints covered in this test cycle, plus anything explicitly out of scope.

## 2. Test environments
- Staging URL and database seed state.
- Supported browsers, OS versions, or device matrix.

## 3. Test layers
- Unit tests: business rules and validation edge cases.
- Integration tests: database transactions, auth, and webhook retries.
- End-to-end tests: core signup, billing, and error-recovery flows.
- Performance test: sustained load at 2x expected peak traffic for 15 minutes.
- Security checks: dependency audit, SAST scan, and role permission matrix.

## 4. Exit criteria
- Zero open Sev-1 or Sev-2 defects.
- 100% pass rate on automated CI checks for the release commit.
- Product owner sign-off on staging UAT.
