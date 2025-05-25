/**
 * MailtoHandler unit tests
 */

describe('MailtoHandler', () => {
  let handler;
  
  beforeEach(() => {
    // Create a fresh instance for each test
    handler = new MailtoHandler();
    
    // Mock DOM elements
    document.body.innerHTML = `
      <a href="mailto:test@example.com" id="simple-link">Email</a>
      <a href="mailto:test@example.com?subject=Test&body=Hello" id="complex-link">Email with subject</a>
    `;
  });
  
  afterEach(() => {
    // Clean up
    if (handler && handler.destroy) {
      handler.destroy();
    }
    document.body.innerHTML = '';
  });
  
  test('should initialize with default options', () => {
    expect(handler.isInitialized).toBe(true);
    expect(handler.options.theme).toBe('light');
    expect(handler.options.rememberChoice).toBe(true);
  });
  
  test('should parse mailto URLs correctly', () => {
    const simpleUrl = 'mailto:test@example.com';
    const complexUrl = 'mailto:test@example.com?subject=Test&body=Hello';
    
    const simpleData = handler.parseMailtoUrl(simpleUrl);
    expect(simpleData.to).toBe('test@example.com');
    expect(simpleData.subject).toBe('');
    expect(simpleData.body).toBe('');
    
    const complexData = handler.parseMailtoUrl(complexUrl);
    expect(complexData.to).toBe('test@example.com');
    expect(complexData.subject).toBe('Test');
    expect(complexData.body).toBe('Hello');
  });
  
  test('should get available clients', () => {
    const clients = handler.getAvailableClients();
    expect(Array.isArray(clients)).toBe(true);
    expect(clients.length).toBeGreaterThan(0);
    
    // Check if Gmail is included by default
    const hasGmail = clients.some(client => client.id === 'gmail');
    expect(hasGmail).toBe(true);
  });
  
  test('should exclude specified clients', () => {
    const customHandler = new MailtoHandler({
      excludeClients: ['gmail']
    });
    
    const clients = customHandler.getAvailableClients();
    const hasGmail = clients.some(client => client.id === 'gmail');
    expect(hasGmail).toBe(false);
    
    customHandler.destroy();
  });
  
  test('should add custom clients', () => {
    const customClient = {
      id: 'custom',
      name: 'Custom Client',
      icon: '🔧',
      urlTemplate: 'https://custom.com/compose?to={to}'
    };
    
    const customHandler = new MailtoHandler({
      customClients: [customClient]
    });
    
    const clients = customHandler.getAvailableClients();
    const hasCustomClient = clients.some(client => client.id === 'custom');
    expect(hasCustomClient).toBe(true);
    
    customHandler.destroy();
  });
}); 