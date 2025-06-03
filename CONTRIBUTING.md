# Contributing to MailtoHandler

Thank you for your interest in contributing to MailtoHandler! This guide will help you get started with development and contribution guidelines.

## Development Setup

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Git
- A modern web browser for testing

### Getting Started

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/mailto-handler.git
   cd mailto-handler
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   This starts a development server with hot reloading at `http://localhost:3000`

4. **Run tests**
   ```bash
   npm test
   ```

### Project Structure

```
mailto-handler/
├── src/                    # Source code
│   ├── core/              # Core library functionality
│   ├── ui/                # UI components and styling
│   ├── clients/           # Email client definitions
│   └── utils/             # Utility functions
├── dist/                  # Built files (auto-generated)
├── examples/              # Usage examples
├── docs/                  # Documentation
├── tests/                 # Test files
└── tools/                 # Build tools and scripts
```

## Development Scripts

```bash
npm run dev          # Start development server with watch mode
npm run build        # Build for production
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Lint code with ESLint
npm run lint:fix     # Fix linting issues automatically
npm run format       # Format code with Prettier
npm run size         # Check bundle size
npm run validate     # Run all checks (lint, test, build)
```

## Code Style Guidelines

### JavaScript

- Use ES6+ features where appropriate
- Follow ESLint configuration (extends Standard style)
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```javascript
/**
 * Opens an email client with the provided data
 * @param {Object} client - The email client configuration
 * @param {Object} mailtoData - The email data (to, subject, body, etc.)
 */
openEmailClient(client, mailtoData) {
    // Implementation
}
```

### CSS

- Use CSS custom properties for theming
- Follow BEM-like naming conventions
- Mobile-first responsive design
- Ensure accessibility (proper contrast, focus states)

```css
.mailto-handler__modal {
  /* Base styles */
}

.mailto-handler__modal--dark {
  /* Dark theme variant */
}
```

## Testing

### Writing Tests

- Write tests for all new features and bug fixes
- Use descriptive test names
- Test both happy path and edge cases
- Include accessibility tests where relevant

```javascript
describe("MailtoHandler", () => {
  test("should intercept mailto links and show modal", () => {
    // Test implementation
  });

  test("should handle invalid mailto URLs gracefully", () => {
    // Test implementation
  });
});
```

### Test Types

- **Unit tests** - Test individual functions and components
- **Integration tests** - Test feature interactions
- **Browser tests** - Test in different browsers (manual/automated)
- **Accessibility tests** - Test keyboard navigation and screen readers

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**

   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit your changes**

   ```bash
   git commit -m 'Add amazing feature: detailed description'
   ```

   Use conventional commit format when possible:

   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests

4. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Link any related issues
   - Add screenshots/GIFs for UI changes

### PR Requirements

Before submitting a PR, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Code is properly linted (`npm run lint`)
- [ ] No significant increase in bundle size
- [ ] Documentation is updated if needed
- [ ] Changes are tested in multiple browsers
- [ ] Accessibility requirements are met

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Browser and version** information
- **Minimal code example** that demonstrates the issue
- **Screenshots** if applicable

### Feature Requests

For feature requests, please describe:

- **The problem** you're trying to solve
- **Your proposed solution**
- **Alternative solutions** you've considered
- **Use cases** and examples

## Documentation

### Updating Documentation

- Keep README.md concise and user-focused
- Update relevant docs in `/docs` folder for detailed guides
- Include code examples in documentation
- Test all code examples to ensure they work

### Writing Guidelines

- Use clear, simple language
- Include practical examples
- Structure content with headings and lists
- Keep line length reasonable (80-100 characters)

## Email Client Support

### Adding New Email Clients

To add support for a new email client:

1. **Add client definition** in `src/clients/`

   ```javascript
   export const newClient = {
     id: "new-client",
     name: "New Email Client",
     icon: "<svg>...</svg>",
     urlTemplate: "https://example.com/compose?to={to}&subject={subject}",
     description: "Fast, secure email",
   };
   ```

2. **Add detection logic** (if applicable)

   ```javascript
   // In client detector
   isNewClientLikely() {
       // Detection logic based on user agent, etc.
   }
   ```

3. **Add tests** for the new client
4. **Update documentation** with the new client info

## Release Process

Maintainers handle releases, but contributors should be aware:

1. Version bumping follows semantic versioning
2. Changelog is updated for each release
3. New releases are tagged and published to npm
4. CDN links are updated accordingly

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain a professional tone in all interactions

## Getting Help

- **Questions**: Open a discussion or issue
- **Real-time chat**: Join our community channels (if available)
- **Documentation**: Check the `/docs` folder first
- **Examples**: Look at `/examples` for working code

## Recognition

Contributors are recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Project documentation (when appropriate)

Thank you for contributing to MailtoHandler! 🚀
