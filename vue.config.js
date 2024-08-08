const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Remove the /api prefix when forwarding
      },
    },
  },
});

//For some reason this stuff doesn't work and I don't know why but its very goofy. All api calls need to be to the exact link


