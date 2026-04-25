export const sendEmail = async ({ to, subject, templateId, context = {} }) => {
  return {
    provider: 'stub',
    to,
    subject,
    templateId,
    context,
    acceptedAt: new Date().toISOString()
  };
};
