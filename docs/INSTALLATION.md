# Installation Guide

Complete installation guide for MailtoHandler across different environments and package managers.

## Quick Start

### CDN (Recommended for beginners)

The fastest way to get started. Just add this to your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <!-- Your content with mailto links -->
    <a href="mailto:hello@example.com">Contact us</a>

    <!-- Add MailtoHandler at the end of body -->
    <script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>
    <script>
      new MailtoHandler();
    </script>
  </body>
</html>
```

## Package Managers

### npm

```bash
npm install mailto-handler
```

```javascript
// ES6 modules
import MailtoHandler from "mailto-handler";

// CommonJS
const MailtoHandler = require("mailto-handler");

// Initialize
const handler = new MailtoHandler();
```

### Yarn

```bash
yarn add mailto-handler
```

```javascript
import MailtoHandler from "mailto-handler";
new MailtoHandler();
```

### pnpm

```bash
pnpm add mailto-handler
```

```javascript
import MailtoHandler from "mailto-handler";
new MailtoHandler();
```

### Bun

```bash
bun add mailto-handler
```

```javascript
import MailtoHandler from "mailto-handler";
new MailtoHandler();
```

## Framework Integration

### React

```jsx
import { useEffect } from "react";
import MailtoHandler from "mailto-handler";

function App() {
  useEffect(() => {
    const handler = new MailtoHandler({
      theme: "auto",
      rememberChoice: true,
    });

    // Cleanup on unmount
    return () => handler.destroy();
  }, []);

  return (
    <div>
      <h1>Contact Us</h1>
      <a href="mailto:hello@example.com">Send Email</a>
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <h1>Contact Us</h1>
    <a href="mailto:hello@example.com">Send Email</a>
  </div>
</template>

<script>
import MailtoHandler from "mailto-handler";

export default {
  name: "ContactPage",
  mounted() {
    this.mailtoHandler = new MailtoHandler({
      theme: "auto",
    });
  },
  beforeUnmount() {
    if (this.mailtoHandler) {
      this.mailtoHandler.destroy();
    }
  },
};
</script>
```

### Angular

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import MailtoHandler from "mailto-handler";

@Component({
  selector: "app-contact",
  template: `
    <h1>Contact Us</h1>
    <a href="mailto:hello@example.com">Send Email</a>
  `,
})
export class ContactComponent implements OnInit, OnDestroy {
  private mailtoHandler: MailtoHandler;

  ngOnInit() {
    this.mailtoHandler = new MailtoHandler({
      theme: "auto",
    });
  }

  ngOnDestroy() {
    if (this.mailtoHandler) {
      this.mailtoHandler.destroy();
    }
  }
}
```

### Svelte

```svelte
<script>
    import { onMount, onDestroy } from 'svelte';
    import MailtoHandler from 'mailto-handler';

    let mailtoHandler;

    onMount(() => {
        mailtoHandler = new MailtoHandler({
            theme: 'auto'
        });
    });

    onDestroy(() => {
        if (mailtoHandler) {
            mailtoHandler.destroy();
        }
    });
</script>

<h1>Contact Us</h1>
<a href="mailto:hello@example.com">Send Email</a>
```

## Build Tools

### Webpack

```javascript
// webpack.config.js
module.exports = {
  // ... other config
  externals: {
    "mailto-handler": "MailtoHandler",
  },
};
```

### Vite

```javascript
// vite.config.js
export default {
  // ... other config
  build: {
    rollupOptions: {
      external: ["mailto-handler"],
    },
  },
};
```

### Rollup

```javascript
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";

export default {
  // ... other config
  plugins: [
    resolve({
      browser: true,
    }),
  ],
};
```

## Content Security Policy (CSP)

If your site uses CSP, you may need to add these directives:

```
script-src 'self' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline';
```

The `'unsafe-inline'` for styles is needed because MailtoHandler injects CSS dynamically. For better security, you can:

1. **Self-host the CSS** and include it in your main stylesheet
2. **Use a nonce** for the injected styles
3. **Configure CSP hash** for the specific styles

## Advanced Installation

### Self-hosting

Download the files and host them yourself:

```bash
# Download the files
curl -O https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js
curl -O https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.css
```

```html
<link rel="stylesheet" href="/path/to/mailto-handler.min.css" />
<script src="/path/to/mailto-handler.min.js"></script>
```

### Loading Specific Versions

```html
<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>

<!-- Latest patch version -->
<script src="https://cdn.jsdelivr.net/npm/mailto-handler@1/dist/mailto-handler.min.js"></script>

<!-- Latest version (not recommended for production) -->
<script src="https://cdn.jsdelivr.net/npm/mailto-handler/dist/mailto-handler.min.js"></script>
```

## Server-Side Rendering (SSR)

### Next.js

```javascript
// pages/_app.js or app/layout.js
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Only initialize on client-side
    if (typeof window !== "undefined") {
      import("mailto-handler").then(({ default: MailtoHandler }) => {
        new MailtoHandler();
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
```

### Nuxt.js

```javascript
// plugins/mailto-handler.client.js
import MailtoHandler from "mailto-handler";

export default defineNuxtPlugin(() => {
  new MailtoHandler();
});
```

```javascript
// nuxt.config.js
export default {
  plugins: [{ src: "~/plugins/mailto-handler.client.js", mode: "client" }],
};
```

### SvelteKit

```javascript
// app.html or layout
<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    onMount(async () => {
        if (browser) {
            const { default: MailtoHandler } = await import('mailto-handler');
            new MailtoHandler();
        }
    });
</script>
```

## Troubleshooting

### Common Issues

**Problem**: Script not loading from CDN

```
Solution: Check your internet connection and try a different CDN:
- unpkg: https://unpkg.com/mailto-handler@1.0.0/dist/mailto-handler.min.js
- jsDelivr: https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js
```

**Problem**: "MailtoHandler is not defined" error

```
Solution: Make sure the script loads before your initialization code:
<script src="...mailto-handler.min.js"></script>
<script>
    // This should come after the library loads
    new MailtoHandler();
</script>
```

**Problem**: Not working with dynamically added content

```javascript
// Solution: Reinitialize after adding content
const handler = new MailtoHandler({ autoInit: false });
// ... add your dynamic content ...
handler.init(); // Reinitialize
```

**Problem**: Conflicts with other libraries

```javascript
// Solution: Use manual initialization
const handler = new MailtoHandler({
  autoInit: false,
  namespace: "myMailtoHandler",
});
handler.init();
```

### Browser Console Errors

Enable debug mode to see detailed logs:

```javascript
const handler = new MailtoHandler({
  debug: true, // Enable debug logging
});
```

### Performance Considerations

- Load the script after your main content
- Use `defer` or `async` attributes when possible
- Consider code splitting for large applications
- Monitor bundle size impact in your build tools

## Verification

Test your installation by:

1. **Creating a test mailto link**: `<a href="mailto:test@example.com">Test</a>`
2. **Clicking the link** - you should see the MailtoHandler modal
3. **Checking browser console** for any errors
4. **Testing on different devices** and browsers

## Next Steps

Once installation is complete:

- [Configure MailtoHandler](CONFIGURATION.md) with your preferred options
- [Customize the appearance](CUSTOMIZATION.md) to match your site
- [Explore the API](API.md) for advanced usage
- [Check out examples](../examples/) for your specific use case
