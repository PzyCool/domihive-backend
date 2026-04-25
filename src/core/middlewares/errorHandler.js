export const errorHandler = (error, _req, res, _next) => {
  const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
  const code = error?.code || 'INTERNAL_ERROR';
  const message = error?.message || 'Unexpected server error.';

  res.status(status).json({
    ok: false,
    code,
    message
  });
};
