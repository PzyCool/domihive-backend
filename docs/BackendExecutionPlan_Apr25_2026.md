# DomiHive Unified Backend Execution Plan

Date: April 25, 2026
Status: Baseline v1 (approved for execution)

## 1) Decision Locked

DomiHive will use one backend for all current and near-term products:
- Web portals (4): Admin, Tenant/User, Landlord/Client, Internal Workforce/Operations
- Mobile apps (2): User mobile app, future second mobile portal

Architecture choice:
- Modular Monolith
- Node.js + Express + MongoDB
- One deployable server, strict domain modules

Why this is locked:
- Faster delivery than microservices at current team size
- Avoids duplicate auth/org/document logic
- Keeps strong boundaries to reduce merge conflicts
- Can split into services later per domain without rewriting contracts

## 2) Current Reality From This Repo (domihive)

This repo is frontend only and currently persists key flows via localStorage.

Already built and needing backend contracts now:
- Tenant/User web flow: browse, inspections, applications, properties, maintenance, payments, messages, settings
- Admin web flow: properties, units, applications, tenants, inspections, maintenance, payments, clients/contracts, reports, settings
- Guarded statuses and lifecycle logic are already present in UI and must be preserved in backend contracts

Current API stub already exists:
- `GET /api/tenant/browse`

## 3) Top-Level Backend Structure

```txt
backend/
  src/
    core/
      auth/
      access-control/
      database/
      config/
      middlewares/
      services/
        email/
        storage/
        notifications/
        audit/
      approvals/
      org-structure/
      sessions/
      invites/
    domains/
      workforce/
      admin/
      tenant/
      landlord/
      mobile/
      operations/
    shared/
      types/
      constants/
      validators/
      utils/
    app.js
```

Rules:
- Domain folders own their logic and routes.
- Shared contracts only in `shared/types` and `shared/constants`.
- No domain may import another domain internals directly.

## 4) Canonical Enums (Normalize Now)

Frontend currently has mixed labels (for example "Move-in pending" vs `PENDING_MOVE_IN`).
Backend must expose canonical machine enums and optional display labels.

### 4.1 Application Status
- `INSPECTION_SCHEDULED`
- `INSPECTION_VERIFIED`
- `APPLICATION_STARTED`
- `APPLICATION_SUBMITTED`
- `UNDER_REVIEW`
- `APPROVED`
- `REJECTED`
- `CANCELLED`

### 4.2 Inspection Booking Status
- `PENDING_CONFIRMATION` (display: Pending Confirmation)
- `SCHEDULED`
- `NO_SHOW` (display: No-show)
- `INSPECTION_COMPLETED` (display: Inspection Completed)

### 4.3 Tenancy Status
- `PENDING_MOVE_IN`
- `ACTIVE`
- `ENDED`

### 4.4 Maintenance Status
- `OPEN`
- `IN_PROGRESS`
- `COMPLETED`
- `ON_HOLD`
- `CANCELLED`

### 4.5 Payment Status
- `PAID`
- `PENDING`
- `OVERDUE`
- `FAILED`
- `REFUNDED`

## 5) Core Collections (Shared Across All Portals)

- `users`
- `roles`
- `permissions`
- `role_permissions`
- `sessions`
- `refresh_tokens`
- `invites`
- `audit_logs`
- `files`
- `notifications`
- `approval_requests`
- `approval_steps`
- `organizations`
- `departments`
- `divisions`
- `teams`

Notes:
- `users` must support multiple identities/portals with scoped roles.
- All writes to sensitive entities must emit `audit_logs`.
- `files` must store metadata only; blobs in S3-compatible storage.

## 6) Domain Collections

### 6.1 Tenant/User + Admin Real Estate Domain
- `properties`
- `property_units`
- `property_media`
- `inspection_slots`
- `inspection_bookings`
- `rental_applications`
- `application_documents`
- `leases`
- `tenancy_records`
- `move_in_checklists`
- `move_out_notices`
- `maintenance_tickets`
- `maintenance_updates`
- `payments`
- `payment_receipts`
- `message_threads`
- `messages`
- `favorites`

### 6.2 Landlord/Client Domain
- `landlord_profiles`
- `client_contracts`
- `owner_payout_accounts`
- `owner_settlement_runs`

### 6.3 Workforce + Operations Domain
- `employee_records`
- `onboarding_document_templates`
- `onboarding_documents`
- `document_acknowledgements`
- `document_signatures`
- `guarantor_requests`
- `guarantor_responses`
- `report_templates`
- `job_reports`
- `announcements`
- `announcement_audience`
- `announcement_read_receipts`
- `meetings`
- `meeting_participants`

## 7) Contract Mapping Required By Current Frontend

These fields are already expected in the current UI and must exist in first API versions.

### 7.1 Listing/Browse Contract
Required fields:
- `id`, `listingId`, `propertyId`, `unitId`, `unitCode`
- `title`, `description`
- `price`, `cautionFee`
- `bedrooms`, `bathrooms`, `size`
- `state`, `area`, `locationName`, `location`, `address`, `postalCode`
- `propertyType`, `propertyTypeLabel`, `buildingType`, `buildingTypeLabel`
- `managementType`, `isEstate`, `propertyAge`
- `petsAllowed`, `furnishing`, `amenityIds`
- `images`, `image`
- `tenantStatus`, `canBook`, `forRent`

### 7.2 Application Lifecycle Guarding
UI already enforces:
- canStart: `INSPECTION_VERIFIED`, `APPLICATION_STARTED`
- canPay: `APPLICATION_STARTED`
- canTrack: `APPLICATION_SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED`

Backend must enforce the same transitions server-side.

### 7.3 Property Lifecycle Sync
Existing frontend behavior expects:
- inspection completed -> unit reserved
- no-show/rejected/cancelled -> unit vacant
- approved/move-in -> unit occupied

Backend must own this lifecycle atomically.

## 8) API Surface (v1)

Use `/api/v1` namespace.

### 8.1 Core/Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/verify-otp`
- `GET /api/v1/auth/me`
- `POST /api/v1/invites`
- `POST /api/v1/invites/:id/accept`

### 8.2 Tenant/User
- `GET /api/v1/tenant/listings`
- `GET /api/v1/tenant/listings/:listingId`
- `POST /api/v1/tenant/inspections`
- `PATCH /api/v1/tenant/inspections/:id/reschedule`
- `GET /api/v1/tenant/inspections/my`
- `POST /api/v1/tenant/applications`
- `GET /api/v1/tenant/applications/my`
- `GET /api/v1/tenant/applications/:id`
- `PATCH /api/v1/tenant/applications/:id`
- `POST /api/v1/tenant/applications/:id/documents`
- `POST /api/v1/tenant/applications/:id/payments`
- `GET /api/v1/tenant/properties/my`
- `PATCH /api/v1/tenant/properties/:id/move-in`
- `POST /api/v1/tenant/maintenance`
- `GET /api/v1/tenant/maintenance/my`
- `GET /api/v1/tenant/messages/threads`
- `POST /api/v1/tenant/messages/threads`
- `POST /api/v1/tenant/messages/threads/:id/messages`
- `GET /api/v1/tenant/notifications`
- `PATCH /api/v1/tenant/notifications/read`

### 8.3 Admin
- `GET /api/v1/admin/properties`
- `POST /api/v1/admin/properties`
- `GET /api/v1/admin/properties/:id`
- `PATCH /api/v1/admin/properties/:id`
- `POST /api/v1/admin/properties/:id/units`
- `PATCH /api/v1/admin/units/:id`
- `GET /api/v1/admin/applications`
- `PATCH /api/v1/admin/applications/:id/status`
- `GET /api/v1/admin/inspections`
- `PATCH /api/v1/admin/inspections/:id/status`
- `GET /api/v1/admin/tenants`
- `GET /api/v1/admin/maintenance`
- `PATCH /api/v1/admin/maintenance/:id`
- `GET /api/v1/admin/payments`
- `GET /api/v1/admin/reports`
- `GET /api/v1/admin/clients`
- `POST /api/v1/admin/clients/contracts`

### 8.4 Landlord/Client
- `GET /api/v1/landlord/properties`
- `GET /api/v1/landlord/tenancies`
- `GET /api/v1/landlord/payouts`
- `GET /api/v1/landlord/contracts`

### 8.5 Workforce/Operations
- `GET /api/v1/workforce/employees`
- `POST /api/v1/workforce/employees`
- `GET /api/v1/workforce/onboarding/templates`
- `POST /api/v1/workforce/onboarding/documents`
- `POST /api/v1/workforce/guarantor-requests`
- `POST /api/v1/workforce/guarantor-responses/:token`
- `GET /api/v1/workforce/report-templates`
- `POST /api/v1/workforce/job-reports`
- `GET /api/v1/workforce/announcements`
- `POST /api/v1/workforce/announcements`
- `GET /api/v1/workforce/meetings`
- `POST /api/v1/workforce/meetings`

## 9) Team Sectioning (Merge-Conflict Control)

Folder ownership model:

- Team A: `core/auth`, `core/sessions`, `core/invites`
- Team B: `core/access-control`, `shared/types`, `shared/constants`
- Team C: `core/org-structure`, `domains/workforce/employee*`
- Team D: `domains/tenant` (listings, inspections, applications)
- Team E: `domains/admin` (properties, units, admin decisions)
- Team F: `domains/tenant` (maintenance, payments, messages)
- Team G: `core/services` (files, email, notifications, audit, approvals)
- Team H: `domains/workforce` (onboarding, reports, announcements, meetings)

Rules:
- Each team edits only owned folders.
- Cross-folder change requires short RFC in team chat before merge.
- Contract changes require version bump in `shared/types`.

## 10) Branch and PR Conventions

- Branch format: `backend/<team>/<scope>`
  - Example: `backend/team-d/tenant-applications`
- PR title format: `[domain] short summary`
  - Example: `[tenant] add application submission endpoint`
- PR checklist must include:
  - Updated OpenAPI spec
  - Updated enum map
  - Unit tests for status transitions
  - Audit events for create/update/delete where applicable

## 11) 2-Week Execution Sequence

### Week 1 (Core Engine + Highest Risk Contracts)
1. Day 1-2:
   - repo scaffold, app bootstrap, env config, mongodb connection
   - auth login/signup/refresh/me
2. Day 2-3:
   - roles, permissions, route guards, portal scoping
   - invites and session management
3. Day 3-4:
   - file service, audit service, notifications base
   - approval workflow skeleton
4. Day 4-5:
   - tenant listings, inspections, applications MVP
   - admin inspection and application status update APIs

### Week 2 (Domain Expansion + Frontend Integration)
1. Day 6-7:
   - tenancy records, move-in lifecycle, maintenance tickets
2. Day 7-8:
   - payments, receipts, basic landlord/client read endpoints
3. Day 8-9:
   - workforce onboarding docs, guarantor flow, report templates/reports
4. Day 9-10:
   - announcements, meetings, read receipts
   - integration hardening, status transition tests, bug fixes

## 12) Non-Negotiable Quality Gates

- All status transitions validated server-side.
- No direct DB writes outside repository/service layer.
- Every approval/decision/change logs audit event.
- File uploads scanned and metadata-only in DB.
- API responses return canonical enums only.
- Role checks on every protected route.

## 13) Immediate Risks and Mitigation

Risk 1: Enum drift between frontend labels and backend values.
- Mitigation: publish `shared/constants/statuses.ts` first and use everywhere.

Risk 2: Duplicate logic between portals.
- Mitigation: core services for auth, files, audit, notifications, approvals.

Risk 3: Merge conflicts during parallel build.
- Mitigation: strict folder ownership and RFC for cross-domain edits.

Risk 4: Frontend blocked by incomplete contracts.
- Mitigation: publish OpenAPI v1 by end of Day 2 and freeze core payloads.

## 14) Team Chat Message (Copy/Paste)

Team, backend direction is now locked as of April 25, 2026:

We are building one modular monolith backend for all DomiHive portals and both mobile apps.
Core engine first: auth, RBAC, sessions, invites, org-structure, files, audit, approvals, notifications.
Then domain modules in parallel: tenant, admin, landlord/client, workforce/operations.

All teams must follow folder ownership to avoid merge conflicts.
All API contracts must use canonical enums (not mixed display labels).
No one should guess DB structure; update architecture/contracts continuously as implementation progresses.

Execution plan document:
`docs/BackendExecutionPlan_Apr25_2026.md`

## 15) Execution Artifacts Generated (April 25, 2026)

The following implementation artifacts have now been created from this plan:

- Backend scaffold root: `backend/`
- API app entry: `backend/src/app.js`
- Server bootstrap: `backend/src/server.js`
- Route registry: `backend/src/routes.js`
- Core/domain route stubs aligned to this plan under:
  - `backend/src/core/**`
  - `backend/src/domains/**`
- Canonical status constants:
  - `backend/src/shared/constants/statuses.js`
- OpenAPI baseline:
  - `backend/openapi/openapi.v1.yaml`
- Team ownership matrix:
  - `docs/BackendOwnershipMatrix.md`

Working rule:
- Any new endpoint, enum, or payload change must update both:
  - `backend/openapi/openapi.v1.yaml`
  - `docs/BackendExecutionPlan_Apr25_2026.md` (if architecture-level impact exists)
