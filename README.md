# MailtoHandler 📧

A lightweight, customizable JavaScript library that improves the user experience of `mailto:` links by providing a modern client selection interface.

## 😫 The Problem

**Frustrated with email links not opening in your browser?**

We've all been there. You click on an email link expecting to compose a message in your favorite web-based email client, but instead:
- 🚫 Your computer tries to open a desktop email app you never use
- 🤔 You get a confusing "No email program is associated" error
- 🔄 You end up manually copying the email address and opening Gmail/Outlook separately

This happens because `mailto:` links were designed in an era when everyone used desktop email clients. Today, most people use web-based email services through their browsers.

## 💡 Motivation

While building my portfolio website, I encountered the classic `mailto:` problem - clicking email links didn't open my preferred web email client. Since most users on desktop or PC use browser-based email clients rather than native applications, I created MailtoHandler to solve this common frustration.

MailtoHandler gives users the freedom to choose their preferred email client when clicking email links, whether it's Gmail, Outlook, Yahoo, or any other web or desktop client.

**Try it yourself at [ashwintemkar.com/mailto-handler](https://ashwintemkar.com/mailto-handler)** - a GUI tool to generate code you can directly use in your projects!

## 🚀 Why Choose MailtoHandler?

### For Developers
- **Better User Experience**: Keep visitors on your site instead of frustrating them with email errors
- **Zero Configuration**: Works out of the box with sensible defaults
- **Lightweight**: Won't slow down your site (just ~4KB gzipped)
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS

### For Users
- **Choice**: Select your preferred email client every time
- **Convenience**: No more copying and pasting email addresses
- **Persistence**: Remember preferences for future clicks
- **Smart Detection**: Automatically suggests your likely preferred clients

## Features

- 🎯 **Intercepts mailto: links** - Automatically handles all mailto links on your page
- 🎨 **Customizable UI** - Modern, accessible modal with light/dark theme support
- 📱 **Mobile responsive** - Works great on all screen sizes
- 💾 **Remember preferences** - Optional localStorage/cookie support for user choices
- 🔍 **Client detection** - Automatically detects and suggests the user's likely email clients
- ⚡ **Lightweight** - Under 15KB minified
- 🔧 **Easy integration** - One-line setup with sensible defaults
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 📧 **Multiple clients** - Built-in support for Gmail, Outlook, Yahoo, ProtonMail, and more

## 🎬 See It In Action

### Before: The Frustrating Experience
```html
<a href="mailto:contact@example.com">Email Us</a>
<!-- User clicks and gets an error or unwanted app opening -->
```

### After: The Smooth Experience
```html
<!DOCTYPE html>
<html>
<head>
    <title>Better Email Experience</title>
</head>
<body>
    <h1>Contact Us</h1>
    <p>Have questions? <a href="mailto:hello@example.com?subject=Hello&body=Hi there!">Email us</a></p>
    
    <!-- Add MailtoHandler -->
    <script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>
    <script>
        // One line of code is all you need!
        new MailtoHandler({ theme: 'auto' });
    </script>
</body>
</html>
```

Now when users click "Email us", they'll get a beautiful modal asking which email client they want to use!

## Installation

### Package Managers
```bash
# npm
npm install mailto-handler

# yarn
yarn add mailto-handler

# pnpm
pnpm add mailto-handler

# bun
bun add mailto-handler
```

See [examples/package-managers](examples/package-managers) for specific usage examples with each package manager.

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>
```

### ES6 Modules
```javascript
import MailtoHandler from 'mailto-handler';
```

## Usage

### Basic Setup
```javascript
// Initialize with defaults
const handler = new MailtoHandler();

// Or with custom options
const handler = new MailtoHandler({
    theme: 'dark',
    rememberChoice: true,
    defaultClient: 'gmail'
});
```

### Configuration Options

```javascript
const handler = new MailtoHandler({
    // UI Options
    theme: 'light',           // 'light', 'dark', 'auto'
    position: 'center',       // 'center', 'cursor'
    showIcons: true,          // Show email client icons
    
    // Behavior Options
    rememberChoice: true,     // Remember user's client choice
    defaultClient: null,      // Auto-select a default client
    autoInit: true,           // Automatically attach event listeners
    autoDetect: true,         // Detect user's likely email clients
    
    // Storage Options
    storageKey: 'mailto-handler-preference',
    
    // Client Options
    excludeClients: ['apple'], // Hide specific clients
    customClients: [          // Add custom email clients
        {
            id: 'protonmail',
            name: 'ProtonMail',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#8A6CFF" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-5.5V7h4v7.5l-2-1.5-2 1.5z"/></svg>`,
            urlTemplate: 'https://mail.proton.me/u/0/composer?to={to}&subject={subject}&body={body}'
        }
    ],
    
    // Callbacks
    onClientSelect: (client, mailtoData) => {
        console.log('User selected:', client.name);
    },
    onError: (error) => {
        console.error('MailtoHandler error:', error);
    }
});
```

### Manual Initialization
```javascript
const handler = new MailtoHandler({ autoInit: false });
handler.init(); // Initialize when ready
```

### API Methods

```javascript
// Clear saved user preference
handler.clearSavedPreference();

// Get currently saved client
const savedClient = handler.getSavedClient();

// Programmatically open email client
handler.openEmailClient(client, {
    to: 'test@example.com',
    subject: 'Test',
    body: 'Hello world!'
});

// Clean up and remove event listeners
handler.destroy();
```

## Built-in Email Clients

The library includes support for these email clients out of the box:

- **Gmail** - Opens in Gmail web interface
- **Outlook** - Opens in Outlook.com
- **Yahoo Mail** - Opens in Yahoo Mail web interface
- **ProtonMail** - Opens in ProtonMail web interface
- **Apple Mail** - Opens in system default mail app
- **Thunderbird** - Opens in system default mail app
- **Zoho Mail** - Opens in Zoho Mail web interface

## Custom Email Clients

You can easily add support for additional email clients:

```javascript
const handler = new MailtoHandler({
    customClients: [
        {
            id: 'fastmail',
            name: 'Fastmail',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#0B9FFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zm0 2.93h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c0 .34-.03.67-.08 1H13v-1zm0 3h6.64c-.11.35-.24.68-.39 1H13v-1zm0 3h5.6c-.45.4-.94.75-1.47 1.04H13v-1.04z"/></svg>`,
            urlTemplate: 'https://app.fastmail.com/mail/compose?to={to}&subject={subject}&body={body}',
            description: 'Fast, secure email'
        },
        {
            id: 'hey',
            name: 'HEY Email',
            icon: '👋',
            urlTemplate: 'https://app.hey.com/emails/new?to={to}&subject={subject}&body={body}'
        }
    ]
});
```

### URL Template Variables

- `{to}` - Recipient email address
- `{subject}` - Email subject
- `{body}` - Email body content
- `{cc}` - CC recipients
- `{bcc}` - BCC recipients

## Styling and Theming

### Built-in Themes
```javascript
const handler = new MailtoHandler({
    theme: 'light',  // Light theme
    theme: 'dark',   // Dark theme  
    theme: 'auto'    // Follows system preference
});
```

### Custom CSS
The library uses CSS custom properties that you can override:

```css
:root {
    --mailto-handler-primary: #3b82f6;
    --mailto-handler-background: #ffffff;
    --mailto-handler-text: #111827;
    --mailto-handler-border: #e5e7eb;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Accessibility

The library is built with accessibility in mind:

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- High contrast support
- Respects `prefers-reduced-motion`

## Size and Performance

- **Minified**: ~12KB
- **Gzipped**: ~4KB
- **Zero dependencies**
- **Lazy loaded styles** - CSS is only injected when needed

## Client Detection

MailtoHandler can automatically detect the user's likely email clients based on their device, operating system, and browser:

```javascript
// Enable client detection (on by default)
const handler = new MailtoHandler({
    autoDetect: true
});

// Access the client detector directly
const detector = handler.clientDetector;
const likelyClients = detector.detectClients();
const mostLikelyClient = detector.getMostLikelyClient();

// Check if a specific client is likely
const isGmailLikely = detector.isClientLikely('gmail');
```

### How Client Detection Works

The detection algorithm uses various signals to determine which email clients are likely installed or preferred:

- **Device type** - Mobile, tablet, or desktop
- **Operating system** - iOS, Android, macOS, Windows, etc.
- **Browser** - Chrome, Firefox, Safari, Edge, etc.
- **Previous choices** - User's previously selected clients

For example, if a user is on an iPhone, the detector will suggest Apple Mail and Gmail as likely options. If on Windows with Edge browser, Outlook will be suggested.

## Advanced Usage

### Integration with Single Page Apps

```javascript
// React example
import { useEffect } from 'react';
import MailtoHandler from 'mailto-handler';

function App() {
    useEffect(() => {
        const handler = new MailtoHandler({
            theme: 'auto',
            onClientSelect: (client) => {
                // Analytics tracking
                gtag('event', 'mailto_client_selected', {
                    client_name: client.name
                });
            }
        });
        
        return () => handler.destroy();
    }, []);
    
    return <div>...</div>;
}
```

### Custom Storage Implementation

```javascript
const handler = new MailtoHandler({
    rememberChoice: false // Disable built-in storage
});

// Implement your own storage logic
handler.options.onClientSelect = (client) => {
    // Save to your preferred storage
    yourStorageSystem.set('email-client', client.id);
};
```

## 🛠️ Online Code Generator

Need a quick implementation? Visit our online tool:

**[ashwintemkar.com/mailto-handler](https://ashwintemkar.com/mailto-handler)**

This GUI tool lets you:
- Configure all options visually
- Preview the UI in real-time
- Generate ready-to-use code for your website
- Test different configurations

## FAQ

### Q: Why not just use the browser's default mailto handler?
A: Many users don't have a desktop email client configured, or prefer using web-based email. This library provides a better UX by letting users choose their preferred web client.

### Q: Does this work with email parameters like CC and BCC?
A: Yes! The library supports all standard mailto parameters: to, subject, body, cc, and bcc.

### Q: Can I customize the appearance?
A: Absolutely. You can use the built-in themes or override the CSS custom properties for complete customization.

### Q: Is this library accessible?
A: Yes, it's built with accessibility in mind, including keyboard navigation, screen reader support, and high contrast compatibility.

### Q: What about mobile devices?
A: The library is fully responsive and works great on mobile. It will gracefully handle the different email app behaviors on iOS and Android.

### Q: Which package managers are supported?
A: The library is compatible with all major package managers including npm, yarn, pnpm, and bun. You can use whichever you prefer in your project.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Start development server with watch mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build

# Check bundle size
npm run size
```

## License

GPL 3.0 © [Ashwin Temkar](https://github.com/rothardo/mailto-handler?tab=GPL-3.0-1-ov-file)

## Changelog

### v1.0.0
- Initial release
- Support for Gmail, Outlook, Yahoo, Apple Mail, Thunderbird
- Light/dark theme support
- localStorage preference saving
- Mobile responsive design
- Full accessibility support

## 🙌 Join the Community

Found MailtoHandler useful? Consider:
- Starring the [GitHub repository](https://github.com/rothardo/mailto-handler)
- Sharing feedback or reporting issues
- Contributing improvements or new features
- Telling other developers about this solution