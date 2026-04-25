export const pushNotification = async ({ userId, type, title, message, cta = null }) => {
  return {
    id: `notif_${Date.now()}`,
    userId,
    type,
    title,
    message,
    cta,
    createdAt: new Date().toISOString()
  };
};
