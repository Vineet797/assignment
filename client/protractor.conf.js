exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/e2e/*.spec.js'], // Your test specs
    capabilities: {
      browserName: 'chrome'
    },
    directConnect: true, // No need for a separate Selenium server
    onPrepare: function () {
      // You can add global browser setups here
    },
    jasmineNodeOpts: {
      showColors: true, // Use colors in the command line report.
    }
  };
  