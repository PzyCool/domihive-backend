import { authRouter } from './core/auth/auth.routes.js';
import { accessControlRouter } from './core/access-control/access-control.routes.js';
import { sessionsRouter } from './core/sessions/sessions.routes.js';
import { invitesRouter } from './core/invites/invites.routes.js';
import { approvalsRouter } from './core/approvals/approvals.routes.js';
import { orgStructureRouter } from './core/org-structure/org-structure.routes.js';
import { tenantRouter } from './domains/tenant/tenant.routes.js';
import { adminRouter } from './domains/admin/admin.routes.js';
import { landlordRouter } from './domains/landlord/landlord.routes.js';
import { workforceRouter } from './domains/workforce/workforce.routes.js';
import { operationsRouter } from './domains/operations/operations.routes.js';
import { mobileRouter } from './domains/mobile/mobile.routes.js';

export const registerApiRoutes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/access-control', accessControlRouter);
  app.use('/api/v1/sessions', sessionsRouter);
  app.use('/api/v1/invites', invitesRouter);
  app.use('/api/v1/approvals', approvalsRouter);
  app.use('/api/v1/org', orgStructureRouter);

  app.use('/api/v1/tenant', tenantRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/landlord', landlordRouter);
  app.use('/api/v1/workforce', workforceRouter);
  app.use('/api/v1/operations', operationsRouter);
  app.use('/api/v1/mobile', mobileRouter);
};
