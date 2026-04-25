import express from 'express';
import { ok } from '../../shared/utils/apiResponse.js';

const router = express.Router();

router.post('/signup', (req, res) => {
  res.status(201).json(
    ok({
      userId: 'user_stub',
      email: req.body?.email || null,
      phone: req.body?.phone || null
    })
  );
});

router.post('/login', (req, res) => {
  res.json(
    ok({
      accessToken: 'stub_access_token',
      refreshToken: 'stub_refresh_token',
      user: {
        id: 'user_stub',
        phone: req.body?.phone || null,
        role: 'TENANT'
      }
    })
  );
});

router.post('/logout', (_req, res) => {
  res.json(ok({ loggedOut: true }));
});

router.post('/refresh', (_req, res) => {
  res.json(ok({ accessToken: 'stub_access_token_refreshed' }));
});

router.post('/verify-otp', (_req, res) => {
  res.json(ok({ verified: true }));
});

router.get('/me', (_req, res) => {
  res.json(
    ok({
      id: 'user_stub',
      name: 'DomiHive User',
      portals: ['TENANT']
    })
  );
});

export { router as authRouter };
