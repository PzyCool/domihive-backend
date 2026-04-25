export const notFoundHandler = (req, res) => {
  res.status(404).json({
    ok: false,
    code: 'NOT_FOUND',
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};
