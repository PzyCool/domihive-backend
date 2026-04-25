import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/properties', (_req, res) => {
  res.json(ok([]));
});

router.get('/tenancies', (_req, res) => {
  res.json(ok([]));
});

router.get('/payouts', (_req, res) => {
  res.json(ok([]));
});

router.get('/contracts', (_req, res) => {
  res.json(ok([]));
});

export { router as landlordRouter };
