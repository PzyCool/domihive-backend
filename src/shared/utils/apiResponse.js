export const ok = (data, meta = {}) => ({ ok: true, data, meta });
export const fail = (code, message, details = null) => ({ ok: false, code, message, details });
