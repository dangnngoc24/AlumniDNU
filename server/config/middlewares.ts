const uploadMaxBytes = 512 * 1024 * 1024 // 512 MB

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '512mb',
      jsonLimit: '512mb',
      textLimit: '512mb',
      formidable: {
        maxFileSize: uploadMaxBytes,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
