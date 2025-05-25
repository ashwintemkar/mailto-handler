# Using mailto-handler with npm

## Installation

```bash
npm install mailto-handler
```

## Usage in a project

```javascript
// ES Module import
import MailtoHandler from 'mailto-handler';

// Initialize with options
const handler = new MailtoHandler({
  theme: 'auto',
  autoDetect: true,
  rememberChoice: true
});

// Example usage in a React component
function ContactForm() {
  return (
    <div>
      <h2>Contact Us</h2>
      <p>
        Email us at: <a href="mailto:contact@example.com">contact@example.com</a>
      </p>
    </div>
  );
}
```

## Running the example

```bash
# Start your application
npm start
``` 