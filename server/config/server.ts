export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Upload video lớn cần timeout dài hơn mặc định (~330s)
  http: {
    serverOptions: {
      requestTimeout: env.int('REQUEST_TIMEOUT_MS', 600_000),
    },
  },
});
