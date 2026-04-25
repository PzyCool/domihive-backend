import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/roles', (_req, res) => {
  res.json(ok([{ id: 'role_super_admin', name: 'Super Admin' }, { id: 'role_tenant', name: 'Tenant' }]));
});

router.get('/permissions', (_req, res) => {
  res.json(ok([{ id: 'tenant.read' }, { id: 'tenant.write' }, { id: 'admin.read' }, { id: 'admin.write' }]));
});

export { router as accessControlRouter };
