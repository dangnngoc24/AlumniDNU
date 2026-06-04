const uploadMaxBytes = 512 * 1024 * 1024 // 512 MB

export default () => ({
  upload: {
    config: {
      sizeLimit: uploadMaxBytes,
      security: {
        allowedTypes: [
          'image/*',
          'video/*',
          'audio/*',
          'application/pdf',
          'application/*',
        ],
        deniedTypes: ['application/x-sh', 'application/x-dosexec'],
      },
      sharp: {
        cache: false,
        concurrency: 1,
      },
    },
  },
})
