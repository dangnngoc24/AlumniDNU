export default {
  routes: [
    {
      method: 'GET',
      path: '/alumnis/form-options',
      handler: 'alumni.formOptions',
      config: {
        auth: false,
      },
    },
  ],
};
