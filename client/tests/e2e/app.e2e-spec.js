describe('Submit Maintenance Request', function () {
    it('should fill out the form and submit a request', function () {
      // Navigate to the test page
      browser.get('http://localhost:5000/test.html');
  
      // Fill in the form fields
      element(by.id('name')).sendKeys('John Doe');
      element(by.id('email')).sendKeys('john@example.com');
      element(by.id('unitNumber')).sendKeys('101');
      element(by.id('serviceType')).sendKeys('Plumbing');
      element(by.id('summary')).sendKeys('Leaky faucet');
      element(by.id('details')).sendKeys('The faucet is leaking.');
  
      // Submit the form
      element(by.id('submit')).click();
  
      // You can add expectations here if you expect the form to behave in a certain way
    });
  });
  