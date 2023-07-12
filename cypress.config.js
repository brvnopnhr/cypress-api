const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      API_URL: "http://165.227.93.41/lojinha",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
