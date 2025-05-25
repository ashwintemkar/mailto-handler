# Using mailto-handler with Yarn

## Installation

```bash
yarn add mailto-handler
```

## Usage in a project

```javascript
// ES Module import
import MailtoHandler from 'mailto-handler';

// Initialize with options
const handler = new MailtoHandler({
  theme: 'dark',
  autoDetect: true,
  rememberChoice: true
});

// Example usage in a Vue component
export default {
  mounted() {
    // Initialize mailto handler when component is mounted
    this.handler = new MailtoHandler({
      theme: 'auto'
    });
  },
  beforeDestroy() {
    // Clean up when component is destroyed
    if (this.handler) {
      this.handler.destroy();
    }
  },
  template: `
    <div>
      <h2>Contact Us</h2>
      <p>
        Email us at: <a href="mailto:contact@example.com">contact@example.com</a>
      </p>
    </div>
  `
}
```

## Running the example

```bash
# Start your application
yarn start
``` 