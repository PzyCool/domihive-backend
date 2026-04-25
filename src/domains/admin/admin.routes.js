import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.get('/properties', (_req, res) => {
  res.json(ok([]));
});

router.post('/properties', (req, res) => {
  res.status(201).json(ok({ id: `prop_${Date.now()}`, ...req.body }));
});

router.get('/properties/:id', (req, res) => {
  res.json(ok({ id: req.params.id }));
});

router.patch('/properties/:id', (req, res) => {
  res.json(ok({ id: req.params.id, ...req.body }));
});

router.post('/properties/:id/units', (req, res) => {
  res.status(201).json(ok({ propertyId: req.params.id, unitId: `unit_${Date.now()}`, ...req.body }));
});

router.patch('/units/:id', (req, res) => {
  res.json(ok({ unitId: req.params.id, ...req.body }));
});

router.get('/applications', (_req, res) => {
  res.json(ok([]));
});

router.patch('/applications/:id/status', (req, res) => {
  res.json(ok({ id: req.params.id, status: req.body?.status || null }));
});

router.get('/inspections', (_req, res) => {
  res.json(ok([]));
});

router.patch('/inspections/:id/status', (req, res) => {
  res.json(ok({ id: req.params.id, status: req.body?.status || null }));
});

router.get('/tenants', (_req, res) => {
  res.json(ok([]));
});

router.get('/maintenance', (_req, res) => {
  res.json(ok([]));
});

router.patch('/maintenance/:id', (req, res) => {
  res.json(ok({ id: req.params.id, ...req.body }));
});

router.get('/payments', (_req, res) => {
  res.json(ok([]));
});

router.get('/reports', (_req, res) => {
  res.json(ok({ occupancy: [], finance: [], operations: [] }));
});

router.get('/clients', (_req, res) => {
  res.json(ok([]));
});

router.post('/clients/contracts', (req, res) => {
  res.status(201).json(ok({ contractId: `ctr_${Date.now()}`, ...req.body }));
});

export { router as adminRouter };
