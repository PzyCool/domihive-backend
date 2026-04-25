import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.post('/', (req, res) => {
  res.status(201).json(ok({ inviteId: `inv_${Date.now()}`, email: req.body?.email || null }));
});

router.post('/:id/accept', (req, res) => {
  res.json(ok({ inviteId: req.params.id, accepted: true }));
});

export { router as invitesRouter };
