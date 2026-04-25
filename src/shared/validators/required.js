export const validateRequired = (body, required = []) => {
  const missing = required.filter((key) => body?.[key] === undefined || body?.[key] === null || body?.[key] === '');
  return {
    valid: missing.length === 0,
    missing
  };
};
