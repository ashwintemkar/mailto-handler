# Using mailto-handler with pnpm

## Installation

```bash
pnpm add mailto-handler
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

// Example usage in a Svelte component
<script>
  import { onMount, onDestroy } from 'svelte';
  import MailtoHandler from 'mailto-handler';
  
  let handler;
  
  onMount(() => {
    handler = new MailtoHandler({
      theme: 'auto',
      position: 'cursor'
    });
  });
  
  onDestroy(() => {
    if (handler) {
      handler.destroy();
    }
  });
</script>

<div>
  <h2>Contact Us</h2>
  <p>
    Email us at: <a href="mailto:contact@example.com">contact@example.com</a>
  </p>
</div>
```

## Running the example

```bash
# Start your application
pnpm start
``` 