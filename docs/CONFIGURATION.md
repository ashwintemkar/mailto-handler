# Configuration Guide

Complete guide to configuring MailtoHandler with all available options and examples.

## Basic Configuration

```javascript
const handler = new MailtoHandler({
  theme: "auto",
  rememberChoice: true,
  showIcons: true,
});
```

## Configuration Options

### UI Options

#### `theme`

Controls the visual theme of the modal.

```javascript
const handler = new MailtoHandler({
  theme: "light", // 'light', 'dark', 'auto'
});
```

- `'light'` - Light theme with white background
- `'dark'` - Dark theme with dark background
- `'auto'` - Automatically follows system preference

#### `position`

Controls where the modal appears on screen.

```javascript
const handler = new MailtoHandler({
  position: "center", // 'center', 'cursor'
});
```

- `'center'` - Modal appears in center of screen
- `'cursor'` - Modal appears near cursor position

#### `showIcons`

Controls whether email client icons are displayed.

```javascript
const handler = new MailtoHandler({
  showIcons: true, // true, false
});
```

### Behavior Options

#### `rememberChoice`

Controls whether user preferences are saved.

```javascript
const handler = new MailtoHandler({
  rememberChoice: true, // true, false
});
```

When enabled, the user's selected email client is remembered for future clicks.

#### `defaultClient`

Pre-selects a default email client.

```javascript
const handler = new MailtoHandler({
  defaultClient: "gmail", // 'gmail', 'outlook', 'yahoo', etc.
});
```

#### `autoInit`

Controls automatic initialization.

```javascript
const handler = new MailtoHandler({
  autoInit: false, // true, false
});

// Manual initialization
handler.init();
```

#### `autoDetect`

Enables automatic detection of user's likely email clients.

```javascript
const handler = new MailtoHandler({
  autoDetect: true, // true, false
});
```

### Storage Options

#### `storageKey`

Customize the localStorage key for saving preferences.

```javascript
const handler = new MailtoHandler({
  storageKey: "my-app-email-preference",
});
```

#### `storageType`

Choose storage mechanism for preferences.

```javascript
const handler = new MailtoHandler({
  storageType: "localStorage", // 'localStorage', 'sessionStorage', 'cookie'
});
```

### Client Options

#### `excludeClients`

Hide specific email clients from the selection.

```javascript
const handler = new MailtoHandler({
  excludeClients: ["apple", "thunderbird"],
});
```

Available client IDs:

- `'gmail'`
- `'outlook'`
- `'yahoo'`
- `'apple'`
- `'thunderbird'`
- `'protonmail'`
- `'zoho'`

#### `customClients`

Add support for additional email clients.

```javascript
const handler = new MailtoHandler({
  customClients: [
    {
      id: "fastmail",
      name: "Fastmail",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#0B9FFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zm0 2.93h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c0 .34-.03.67-.08 1H13v-1zm0 3h6.64c-.11.35-.24.68-.39 1H13v-1zm0 3h5.6c-.45.4-.94.75-1.47 1.04H13v-1.04z"/>
            </svg>`,
      urlTemplate:
        "https://app.fastmail.com/mail/compose?to={to}&subject={subject}&body={body}",
      description: "Fast, secure email",
    },
  ],
});
```

### Callback Options

#### `onClientSelect`

Called when user selects an email client.

```javascript
const handler = new MailtoHandler({
  onClientSelect: (client, mailtoData) => {
    console.log("User selected:", client.name);
    console.log("Email data:", mailtoData);

    // Analytics tracking
    gtag("event", "email_client_selected", {
      client_name: client.name,
      has_subject: !!mailtoData.subject,
    });
  },
});
```

#### `onError`

Called when an error occurs.

```javascript
const handler = new MailtoHandler({
  onError: (error) => {
    console.error("MailtoHandler error:", error);

    // Error reporting
    errorReporter.report(error);
  },
});
```

#### `onModalOpen`

Called when the client selection modal opens.

```javascript
const handler = new MailtoHandler({
  onModalOpen: (mailtoData) => {
    console.log("Modal opened for:", mailtoData);
  },
});
```

#### `onModalClose`

Called when the modal closes (with or without selection).

```javascript
const handler = new MailtoHandler({
  onModalClose: (selectedClient) => {
    if (selectedClient) {
      console.log("Modal closed with selection:", selectedClient.name);
    } else {
      console.log("Modal closed without selection");
    }
  },
});
```

## URL Template Variables

When creating custom clients, you can use these variables in the `urlTemplate`:

- `{to}` - Recipient email address
- `{subject}` - Email subject (URL encoded)
- `{body}` - Email body content (URL encoded)
- `{cc}` - CC recipients (comma-separated, URL encoded)
- `{bcc}` - BCC recipients (comma-separated, URL encoded)

```javascript
const customClient = {
  id: "custom-client",
  name: "Custom Email",
  urlTemplate:
    "https://example.com/compose?to={to}&subject={subject}&body={body}&cc={cc}",
};
```

## Complete Configuration Example

```javascript
const handler = new MailtoHandler({
  // UI Options
  theme: "auto",
  position: "center",
  showIcons: true,

  // Behavior Options
  rememberChoice: true,
  defaultClient: null,
  autoInit: true,
  autoDetect: true,

  // Storage Options
  storageKey: "mailto-handler-preference",
  storageType: "localStorage",

  // Client Options
  excludeClients: ["apple"],
  customClients: [
    {
      id: "hey",
      name: "HEY Email",
      icon: "👋",
      urlTemplate:
        "https://app.hey.com/emails/new?to={to}&subject={subject}&body={body}",
      description: "Email at its best",
    },
  ],

  // Callbacks
  onClientSelect: (client, mailtoData) => {
    console.log(`User selected ${client.name}`);
  },
  onError: (error) => {
    console.error("Error:", error);
  },
  onModalOpen: (mailtoData) => {
    console.log("Modal opened");
  },
  onModalClose: (selectedClient) => {
    console.log("Modal closed");
  },
});
```

## Environment-Specific Configurations

### Development

```javascript
const handler = new MailtoHandler({
  theme: "auto",
  rememberChoice: false, // Don't save preferences in dev
  debug: true, // Enable debug logging
  onError: (error) => {
    console.error("Dev error:", error);
  },
});
```

### Production

```javascript
const handler = new MailtoHandler({
  theme: "auto",
  rememberChoice: true,
  autoDetect: true,
  onClientSelect: (client) => {
    // Analytics tracking
    analytics.track("email_client_selected", {
      client: client.id,
    });
  },
  onError: (error) => {
    // Error reporting service
    errorReporter.captureException(error);
  },
});
```

### Mobile-Optimized

```javascript
const handler = new MailtoHandler({
  theme: "auto",
  position: "center", // Better for mobile
  showIcons: true, // Icons help on small screens
  autoDetect: true, // Detect mobile email apps
  customClients: [
    // Add mobile-specific clients
    {
      id: "spark",
      name: "Spark",
      icon: "⚡",
      urlTemplate:
        "readdle-spark://compose?recipient={to}&subject={subject}&body={body}",
      description: "Smart email app",
    },
  ],
});
```

## Dynamic Configuration

### Conditional Configuration

```javascript
const isMobile =
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const handler = new MailtoHandler({
  theme: "auto",
  position: isMobile ? "center" : "cursor",
  showIcons: !isMobile, // Hide icons on mobile to save space
  autoDetect: true,
  excludeClients: isMobile ? ["thunderbird"] : [], // Hide desktop clients on mobile
});
```

### User Preference Based

```javascript
const userPrefs = getUserPreferences(); // Your preference system

const handler = new MailtoHandler({
  theme: userPrefs.darkMode ? "dark" : "light",
  rememberChoice: userPrefs.rememberEmailClient,
  defaultClient: userPrefs.defaultEmailClient,
  showIcons: userPrefs.showIcons,
});
```

### A/B Testing Configuration

```javascript
const experimentVariant = getExperimentVariant("mailto-handler-ui");

const handler = new MailtoHandler({
  theme: "auto",
  position: experimentVariant === "cursor" ? "cursor" : "center",
  showIcons: experimentVariant !== "minimal",
  onClientSelect: (client) => {
    // Track A/B test results
    analytics.track("email_client_selected", {
      client: client.id,
      experiment_variant: experimentVariant,
    });
  },
});
```

## Advanced Custom Clients

### Client with Authentication

```javascript
const handler = new MailtoHandler({
  customClients: [
    {
      id: "company-mail",
      name: "Company Mail",
      icon: "🏢",
      urlTemplate:
        "https://mail.company.com/compose?to={to}&subject={subject}&body={body}&auth_token=" +
        getAuthToken(),
      description: "Internal company email",
      requiresAuth: true,
    },
  ],
});
```

### Client with Custom Logic

```javascript
const handler = new MailtoHandler({
  customClients: [
    {
      id: "smart-client",
      name: "Smart Email",
      icon: "🧠",
      handler: (mailtoData) => {
        // Custom logic instead of URL template
        if (mailtoData.to.includes("@company.com")) {
          window.open(`https://internal-mail.com/compose?to=${mailtoData.to}`);
        } else {
          window.open(`https://external-mail.com/compose?to=${mailtoData.to}`);
        }
      },
      description: "Smart routing based on recipient",
    },
  ],
});
```

## Configuration Validation

MailtoHandler validates your configuration and will warn about common issues:

```javascript
const handler = new MailtoHandler({
  theme: "invalid-theme", // Warning: falls back to 'auto'
  excludeClients: ["nonexistent"], // Warning: client doesn't exist
  customClients: [
    {
      id: "gmail", // Warning: conflicts with built-in client
      name: "My Gmail",
    },
  ],
});
```

## Configuration Best Practices

### Performance

- **Enable `autoDetect`** to show relevant clients first
- **Use `excludeClients`** to remove unused options
- **Set `rememberChoice: true`** to reduce repeated selections

### User Experience

- **Use `theme: 'auto'`** to respect user's system preference
- **Provide meaningful `description`** for custom clients
- **Include recognizable `icon`** for custom clients

### Analytics & Monitoring

- **Track client selections** with `onClientSelect`
- **Monitor errors** with `onError`
- **A/B test different configurations** to optimize UX

### Accessibility

- **Always provide `description`** for custom clients
- **Use semantic icons** or text fallbacks
- **Test keyboard navigation** with your configuration

## Migration Guide

### From v0.x to v1.x

```javascript
// Old configuration (v0.x)
const handler = new MailtoHandler({
  darkMode: true, // Changed to theme: 'dark'
  savePreference: true, // Changed to rememberChoice: true
});

// New configuration (v1.x)
const handler = new MailtoHandler({
  theme: "dark",
  rememberChoice: true,
});
```

## Troubleshooting Configuration

### Common Configuration Issues

**Issue**: Custom client not appearing

```javascript
// Problem: Missing required fields
{
    id: 'custom',
    // Missing: name, urlTemplate or handler
}

// Solution: Include all required fields
{
    id: 'custom',
    name: 'Custom Email',
    urlTemplate: 'https://example.com/compose?to={to}'
}
```

**Issue**: Theme not working

```javascript
// Problem: Invalid theme value
{
  theme: "custom-theme";
}

// Solution: Use valid theme values
{
  theme: "auto";
} // 'light', 'dark', or 'auto'
```

**Issue**: Callbacks not firing

```javascript
// Problem: Typo in callback name
{
  onClientSelected: () => {};
} // Wrong name

// Solution: Use correct callback names
{
  onClientSelect: () => {};
} // Correct name
```

### Debug Configuration

```javascript
const handler = new MailtoHandler({
  debug: true, // Enable debug mode
  onError: (error) => {
    console.group("MailtoHandler Configuration Error");
    console.error(error);
    console.trace();
    console.groupEnd();
  },
});
```

This will help identify configuration issues during development.
