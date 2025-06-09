# MailtoHandler

**Say goodbye to broken mailto links that frustrate your users.**

A lightweight JavaScript library that transforms the outdated mailto experience into a modern, user-friendly email client selection interface.

## The Problem We Solve

**Frustrated with email links not opening in your browser?**

We've all been there. You click on an email link expecting to compose a message in your favorite web-based email client, but instead:

- Your computer tries to open a desktop email app you never use
- You get a confusing "No email program is associated" error
- You end up manually copying the email address and opening Gmail/Outlook separately

This happens because `mailto:` links were designed decades ago when everyone used desktop email clients. Today, most people use web-based email services through their browsers.

## The Story Behind MailtoHandler

While building my portfolio website, I encountered the classic mailto problem that plagues developers everywhere. Clicking email links didn't open my preferred web email client - instead, I got system errors or unwanted desktop apps trying to launch.

After spending a few days researching solutions and finding only complex workarounds, I decided to build something better. MailtoHandler was born from the frustration of this common UX problem that affects millions of users daily.

Since most desktop and PC users today prefer web-based email clients over native applications, this library bridges that gap by giving users the freedom to choose their preferred email client when clicking any email link.

## The Solution

MailtoHandler intercepts mailto links and presents users with a clean, modern interface to choose their preferred email client - whether it's Gmail, Outlook, Yahoo, or any other web or desktop client.

**Try it live:** [ashwintemkar.com/mailto-handler](https://ashwintemkar.com/mailto-handler)

### Before vs After

**Before:** Broken, frustrating experience

```html
<a href="mailto:contact@example.com">Email Us</a>
<!-- User clicks → Error or unwanted app opens -->
```

**After:** Smooth, user-friendly experience

```html
<a href="mailto:hello@example.com?subject=Hello&body=Hi there!">Email us</a>

<script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>
<script>
  new MailtoHandler({ theme: "auto" });
</script>
```

Now users get a beautiful modal asking which email client they want to use!

## Why Choose MailtoHandler?

**For Developers:**

- Better user experience - keep visitors engaged instead of frustrated
- Zero configuration - works out of the box with sensible defaults
- Lightweight - just ~4KB gzipped, won't slow down your site
- Framework agnostic - works with React, Vue, Angular, or vanilla JS

**For Users:**

- Choose their preferred email client every time
- No more copying and pasting email addresses
- Remember preferences for future clicks
- Smart detection of likely preferred clients

## Key Features

- **Intercepts mailto links** - Automatically handles all mailto links on your page
- **Customizable UI** - Modern, accessible modal with light/dark theme support
- **Mobile responsive** - Works great on all screen sizes
- **Remember preferences** - Optional localStorage support for user choices
- **Client detection** - Automatically suggests the user's likely email clients
- **Lightweight** - Under 15KB minified
- **Easy integration** - One-line setup with sensible defaults
- **Accessible** - Full keyboard navigation and screen reader support
- **Multiple clients** - Built-in support for Gmail, Outlook, Yahoo, ProtonMail, and more

## Quick Start

### CDN (Easiest)

```html
<script src="https://cdn.jsdelivr.net/npm/mailto-handler@1.0.0/dist/mailto-handler.min.js"></script>
<script>
  new MailtoHandler();
</script>
```

### Package Managers

```bash
npm install mailto-handler
```

```javascript
import MailtoHandler from "mailto-handler";
new MailtoHandler();
```

## Basic Usage

```javascript
// Simple setup
const handler = new MailtoHandler();

// With customization
const handler = new MailtoHandler({
  theme: "dark",
  rememberChoice: true,
  defaultClient: "gmail",
});
```

## Documentation

- **[Installation & Setup](docs/INSTALLATION.md)** - Detailed installation guide for all environments
- **[Configuration](docs/CONFIGURATION.md)** - Complete configuration options and examples

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up the development environment
- Code style and standards
- Submitting pull requests
- Reporting issues

## License

Apache 2.0 © [Ashwin Temkar](mailto-handler/tree/main?tab=Apache-2.0-1-ov-file)

## Support

- 🐛 [Report bugs](https://github.com/rothardo/mailto-handler/issues)
- 💡 [Request features](https://github.com/rothardo/mailto-handler/issues)
- 📖 [Read the docs](docs/)
- 🌐 [Try the live demo](https://ashwintemkar.com/mailto-handler)

---

**Star this repo if MailtoHandler helped solve your mailto frustrations!** ⭐
