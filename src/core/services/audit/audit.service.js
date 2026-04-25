export const createAuditEvent = ({ actorId, action, entity, entityId, metadata = {} }) => ({
  actorId,
  action,
  entity,
  entityId,
  metadata,
  createdAt: new Date().toISOString()
});
