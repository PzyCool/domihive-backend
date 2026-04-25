# DomiHive Backend Scaffold

This folder contains the initial modular monolith scaffold for DomiHive unified backend.

## Quick Start

1. Copy env template:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run dev server:

```bash
npm run dev
```

Health check:

- `GET /health`

Base API prefix:

- `/api/v1`

## Structure

- `src/core`: shared engine modules
- `src/domains`: portal-specific business modules
- `src/shared`: shared constants, contracts, validators, utilities
- `openapi/openapi.v1.yaml`: API contract baseline

## Notes

- Current handlers are scaffold stubs for parallel team implementation.
- Replace stubs with real repository/service logic per ownership matrix.
