import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json(ok({ domain: 'mobile', status: 'ready' }));
});

export { router as mobileRouter };
