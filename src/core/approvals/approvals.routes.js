import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/requests', (_req, res) => {
  res.json(ok([]));
});

router.post('/requests', (req, res) => {
  res.status(201).json(ok({ requestId: `apr_${Date.now()}`, type: req.body?.type || 'GENERIC' }));
});

export { router as approvalsRouter };
