# Using mailto-handler with Bun

## Installation

```bash
bun add mailto-handler
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

// Example usage in a vanilla JS project
document.addEventListener('DOMContentLoaded', () => {
  const handler = new MailtoHandler({
    theme: 'auto',
    position: 'center',
    customClients: [
      {
        id: 'fastmail',
        name: 'Fastmail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#0B9FFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zm0 2.93h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c0 .34-.03.67-.08 1H13v-1zm0 3h6.64c-.11.35-.24.68-.39 1H13v-1zm0 3h5.6c-.45.4-.94.75-1.47 1.04H13v-1.04z"/></svg>`,
        urlTemplate: 'https://app.fastmail.com/mail/compose?to={to}&subject={subject}&body={body}'
      }
    ]
  });
});
```

## Running the example

```bash
# Start your application
bun start
``` 