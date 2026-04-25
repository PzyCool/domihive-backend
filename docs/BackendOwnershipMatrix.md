# Backend Ownership Matrix

Date: April 25, 2026
Scope: DomiHive unified backend (all portals + mobile clients)

## Leadership

| Role | Name | Responsibility |
|---|---|---|
| Executive Sponsor | PzyCool Matarh | Final scope, timeline, and architectural decisions |
| Workforce Domain Lead | Emma | Workforce requirements and delivery alignment |
| Workforce Backend Contract Lead | Brian | Workforce schemas, payload contracts, and API review |

## Engineering Pods

| Pod | Owner | Folder Ownership | Deliverables (Week 1-2) | Dependencies |
|---|---|---|---|---|
| Team A - Auth/Core Session | TBD | `backend/src/core/auth`, `backend/src/core/sessions`, `backend/src/core/invites` | signup/login/logout/refresh/me, invite issue/accept, session revocation | None |
| Team B - Access Control | TBD | `backend/src/core/access-control`, `backend/src/shared/constants`, `backend/src/shared/types` | roles/permissions schema, route guards, canonical enums | Team A |
| Team C - Org Structure | TBD | `backend/src/core/org-structure` | organizations/departments/divisions/teams APIs | Team A, Team B |
| Team D - Tenant Discovery & Applications | TBD | `backend/src/domains/tenant` (listings, inspections, applications) | listing feed, inspection booking, app lifecycle transitions | Team A, Team B |
| Team E - Admin Property/Ops | TBD | `backend/src/domains/admin` (properties, units, inspections, applications) | admin unit lifecycle, decisions, inspection updates | Team D |
| Team F - Tenant Ops | TBD | `backend/src/domains/tenant` (maintenance, payments, messages, notifications) | maintenance tickets, payment ledger, message threads, notifications | Team A |
| Team G - Platform Services | TBD | `backend/src/core/services`, `backend/src/core/approvals` | file/email/notification/audit services + approvals engine | Team A, Team B |
| Team H - Workforce | Emma + Brian | `backend/src/domains/workforce` | onboarding docs, guarantor, reports, announcements, meetings | Team C, Team G |
| Team I - Landlord/Client | TBD | `backend/src/domains/landlord` | landlord views, contracts, payouts read models | Team E, Team G |

## Integration Owners

| Integration Track | Owner | Outputs |
|---|---|---|
| OpenAPI Governance | Brian | `backend/openapi/openapi.v1.yaml` updates and breaking-change checks |
| Frontend Contract Sync (Web User/Admin) | TBD | endpoint mapping docs and payload validation fixtures |
| Mobile Contract Sync | TBD | mobile DTO mapping + version compatibility notes |
| QA & Regression | TBD | smoke suite for auth, application lifecycle, move-in workflow |

## Working Rules

1. No cross-folder edits without RFC note in team chat.
2. Any enum change requires update to OpenAPI and shared constants in same PR.
3. Any state transition endpoint must include tests before merge.
4. Every admin decision endpoint must emit audit event.

## Daily Reporting Template

Post in team chat every day before 6pm:

- Pod:
- Completed today:
- Blockers:
- Next 24h:
- Contract changes:
- PR links:
