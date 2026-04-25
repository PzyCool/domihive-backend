import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/departments', (_req, res) => {
  res.json(ok([]));
});

router.get('/divisions', (_req, res) => {
  res.json(ok([]));
});

router.get('/teams', (_req, res) => {
  res.json(ok([]));
});

export { router as orgStructureRouter };
