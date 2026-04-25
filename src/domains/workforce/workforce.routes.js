import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/employees', (_req, res) => {
  res.json(ok([]));
});

router.post('/employees', (req, res) => {
  res.status(201).json(ok({ id: `emp_${Date.now()}`, ...req.body }));
});

router.get('/onboarding/templates', (_req, res) => {
  res.json(ok([]));
});

router.post('/onboarding/documents', (req, res) => {
  res.status(201).json(ok({ id: `obd_${Date.now()}`, ...req.body }));
});

router.post('/guarantor-requests', (req, res) => {
  res.status(201).json(ok({ id: `gr_${Date.now()}`, ...req.body }));
});

router.post('/guarantor-responses/:token', (req, res) => {
  res.status(201).json(ok({ token: req.params.token, submitted: true, ...req.body }));
});

router.get('/report-templates', (_req, res) => {
  res.json(ok([]));
});

router.post('/job-reports', (req, res) => {
  res.status(201).json(ok({ id: `jr_${Date.now()}`, ...req.body }));
});

router.get('/announcements', (_req, res) => {
  res.json(ok([]));
});

router.post('/announcements', (req, res) => {
  res.status(201).json(ok({ id: `ann_${Date.now()}`, ...req.body }));
});

router.get('/meetings', (_req, res) => {
  res.json(ok([]));
});

router.post('/meetings', (req, res) => {
  res.status(201).json(ok({ id: `mtg_${Date.now()}`, ...req.body }));
});

export { router as workforceRouter };
