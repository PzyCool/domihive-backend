import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';
import { validateRequired } from '../../shared/validators/required.js';

const router = express.Router();

router.get('/listings', (_req, res) => {
  res.json(ok({ items: [], syncedAt: new Date().toISOString() }));
});

router.get('/listings/:listingId', (req, res) => {
  res.json(ok({ id: req.params.listingId }));
});

router.post('/inspections', (req, res) => {
  const validation = validateRequired(req.body, ['listingId', 'inspectionDate', 'inspectionTime']);
  if (!validation.valid) {
    return res.status(400).json({ ok: false, code: 'VALIDATION_ERROR', missing: validation.missing });
  }

  return res.status(201).json(ok({ id: `insp_${Date.now()}`, ...req.body }));
});

router.patch('/inspections/:id/reschedule', (req, res) => {
  res.json(ok({ id: req.params.id, rescheduled: true, ...req.body }));
});

router.get('/inspections/my', (_req, res) => {
  res.json(ok([]));
});

router.post('/applications', (req, res) => {
  const validation = validateRequired(req.body, ['listingId']);
  if (!validation.valid) {
    return res.status(400).json({ ok: false, code: 'VALIDATION_ERROR', missing: validation.missing });
  }

  return res.status(201).json(ok({ id: `app_${Date.now()}`, status: 'APPLICATION_STARTED' }));
});

router.get('/applications/my', (_req, res) => {
  res.json(ok([]));
});

router.get('/applications/:id', (req, res) => {
  res.json(ok({ id: req.params.id }));
});

router.patch('/applications/:id', (req, res) => {
  res.json(ok({ id: req.params.id, ...req.body }));
});

router.post('/applications/:id/documents', (_req, res) => {
  res.status(201).json(ok({ uploaded: true }));
});

router.post('/applications/:id/payments', (_req, res) => {
  res.status(201).json(ok({ paid: true }));
});

router.get('/properties/my', (_req, res) => {
  res.json(ok([]));
});

router.patch('/properties/:id/move-in', (req, res) => {
  res.json(ok({ id: req.params.id, movedIn: true, ...req.body }));
});

router.post('/maintenance', (req, res) => {
  res.status(201).json(ok({ ticketId: `mnt_${Date.now()}`, ...req.body }));
});

router.get('/maintenance/my', (_req, res) => {
  res.json(ok([]));
});

router.get('/messages/threads', (_req, res) => {
  res.json(ok([]));
});

router.post('/messages/threads', (req, res) => {
  res.status(201).json(ok({ threadId: `th_${Date.now()}`, subject: req.body?.subject || '' }));
});

router.post('/messages/threads/:id/messages', (req, res) => {
  res.status(201).json(ok({ threadId: req.params.id, messageId: `msg_${Date.now()}`, ...req.body }));
});

router.get('/notifications', (_req, res) => {
  res.json(ok([]));
});

router.patch('/notifications/read', (_req, res) => {
  res.json(ok({ updated: true }));
});

export { router as tenantRouter };
