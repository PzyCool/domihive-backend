export const putObject = async ({ bucket, key, mimeType, size }) => {
  return {
    bucket,
    key,
    mimeType,
    size,
    storageProvider: 'stub',
    uploadedAt: new Date().toISOString()
  };
};
