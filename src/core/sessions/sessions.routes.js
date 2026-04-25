import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(ok([]));
});

export { router as sessionsRouter };
