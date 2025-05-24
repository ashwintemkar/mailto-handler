/**
 * MailtoHandler - Customizable mailto: link handler library
 * @version 1.0.0
 * @author Ashwin Temkar
 * 
 * Created while building my portfolio site - I got tired of mailto links
 * opening in random desktop apps instead of my preferred Gmail.
 * 
 * Last updated: June 3, 2025
 */

import ClientDetector from './client-detector';

class MailtoHandler {
  constructor(options = {}) {
    // Merge default options with user-provided options
    this.options = {
      // Default configuration
      defaultClient: null,
      rememberChoice: true,
      storageKey: 'mailto-handler-preference',
      autoInit: true,
      theme: 'light', // 'light', 'dark', 'auto'
      position: 'center', // 'center', 'cursor'
      showIcons: true,
      customClients: [],
      excludeClients: [],
      onClientSelect: null,
      onError: null,
      autoDetect: true, // Enable client detection
      ...options
    };

    this.isInitialized = false;
    this.modalElement = null;
    this.backdropElement = null;
    
    // Initialize client detector
    this.clientDetector = new ClientDetector();

    // Built-in email clients with SVG icons
    // I spent way too long making these icons look good!
    this.builtInClients = [
      {
        id: 'gmail',
        name: 'Gmail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>`,
        urlTemplate: 'https://mail.google.com/mail/?view=cm&to={to}&su={subject}&body={body}',
        popular: true
      },
      {
        id: 'outlook',
        name: 'Outlook',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.58.23h-8.547v-6.959l1.6 1.229c.102.085.229.126.379.126.148 0 .277-.041.389-.127L24 7.387zm-9.365-2.021h8.547c.211 0 .393.063.543.192.15.128.234.3.248.51l-7.369 5.876-1.969-1.549V5.366zM13.404.864v22.271L0 20.819V3.244L13.406.864h-.002zm-4.049 11.18c-.02-1.133-.313-2.072-.879-2.814-.668-.726-1.591-1.089-2.769-1.089-1.172 0-2.116.364-2.83 1.09-.666.728-.992 1.663-1.001 2.812h1.488c.11-.705.252-1.286.792-1.732.535-.445 1.185-.668 1.956-.668.826 0 1.466.224 1.921.67.46.449.709 1.034.74 1.754.932.245.48.453.61.626-.506.565-1.257.974-2.251 1.224-.785.219-1.384.48-1.8.782-.41.395-.71.855-.705 1.372.004.512.208.95.618 1.316.41.364.945.546 1.598.546.998 0 1.795-.375 2.389-1.123.567.607 1.315.911 2.239.911.867 0 1.553-.299 2.054-.896.501-.6.754-1.414.76-2.442v-.149h-1.488c-.02.86-.216 1.53-.577 2.01-.364.476-.869.714-1.516.714-.515 0-.917-.157-1.2-.47-.284-.314-.425-.772-.422-1.374.002-.454.094-.897.28-1.329.189-.432.603-.806 1.244-1.119.577-.303 1.158-.533 1.742-.692.583-.159 1.137-.373 1.66-.644v1.12c0 1.112-.414 1.996-1.237 2.653-.825.658-1.874.987-3.146.987-1.275 0-2.296-.343-3.06-1.029-.76-.686-1.147-1.616-1.147-2.791 0-1.174.345-2.11 1.034-2.806.691-.697 1.642-1.045 2.85-1.045 1.327 0 2.303.296 2.918.886.616.59.924 1.28.924 2.075l-1.461-.001z"/></svg>`,
        urlTemplate: 'https://outlook.live.com/mail/0/deeplink/compose?to={to}&subject={subject}&body={body}',
        popular: true
      },
      {
        id: 'yahoo',
        name: 'Yahoo Mail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#6001D2" d="M19.828 7.242a2.244 2.244 0 1 0 0-4.485 2.244 2.244 0 0 0 0 4.485zm4.09 4.376-4.402-7.553a.347.347 0 0 0-.297-.173h-1.21c-.13 0-.247.074-.303.19l-4.402 7.553a.347.347 0 0 0 .303.503h1.212c.131 0 .247-.074.303-.19l.746-1.28h5.387l.746 1.28c.056.116.172.19.303.19h1.211a.347.347 0 0 0 .303-.52zm-6.862-2.538 1.944-3.33 1.944 3.33h-3.888zM13.205 17.32a.347.347 0 0 0-.172-.3l-6.97-4.027a.347.347 0 0 0-.52.3v1.212c0 .13.074.247.19.303l6.97 4.027a.347.347 0 0 0 .52-.3V17.32h-.018zm-6.97-2.538a.347.347 0 0 0 .172.3l6.97 4.027a.347.347 0 0 0 .52-.3v-1.212a.347.347 0 0 0-.19-.303l-6.97-4.027a.347.347 0 0 0-.52.3v1.212l.018.003zM4.172 7.242a2.244 2.244 0 1 0 0-4.485 2.244 2.244 0 0 0 0 4.485zm4.09 4.376-4.402-7.553a.347.347 0 0 0-.297-.173h-1.21c-.13 0-.247.074-.303.19l-4.402 7.553a.347.347 0 0 0 .303.503h1.212c.131 0 .247-.074.303-.19l.746-1.28h5.387l.746 1.28c.056.116.172.19.303.19h1.211a.347.347 0 0 0 .303-.52zm-6.862-2.538 1.944-3.33 1.944 3.33H1.4z"/></svg>`,
        urlTemplate: 'https://compose.mail.yahoo.com/?to={to}&subject={subject}&body={body}',
        popular: true
      },
      {
        id: 'protonmail',
        name: 'ProtonMail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#8A6CFF" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-5.5V7h4v7.5l-2-1.5-2 1.5z"/></svg>`,
        urlTemplate: 'https://mail.proton.me/u/0/composer?to={to}&subject={subject}&body={body}',
        popular: true
      },
      {
        id: 'apple',
        name: 'Apple Mail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#999" d="M22 8v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8l10 5 10-5zm0-2H2C.9 6 0 6.9 0 8v10c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V8c0-1.1-.9-2-2-2zm-9 6.5l-9-4.5h18l-9 4.5z"/></svg>`,
        urlTemplate: 'mailto:{to}?subject={subject}&body={body}',
        description: 'Opens in your default mail app'
      },
      {
        id: 'thunderbird',
        name: 'Thunderbird',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#0A84FF" d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.511l-9 6.713-9-6.713V6h18zM3 18V9.044l7.386 5.509a2 2 0 0 0 2.228 0L20 9.044 20.002 18H3z"/></svg>`,
        urlTemplate: 'mailto:{to}?subject={subject}&body={body}',
        description: 'Opens in your default mail app'
      },
      {
        id: 'zoho',
        name: 'Zoho Mail',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#F0483E" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 13.21c-.41.42-.91.79-1.5 1.05-.58.26-1.23.39-1.96.39-.72 0-1.37-.13-1.95-.39-.58-.26-1.08-.62-1.5-1.05-.42-.42-.73-.92-.96-1.5-.23-.58-.34-1.2-.34-1.85 0-.66.11-1.28.34-1.85.23-.58.55-1.08.96-1.5.42-.42.92-.75 1.5-1 .58-.25 1.23-.37 1.95-.37.73 0 1.38.12 1.96.37.58.25 1.09.58 1.5 1 .42.42.74.92.97 1.5.23.58.35 1.19.35 1.85 0 .65-.12 1.27-.35 1.85-.23.58-.55 1.08-.97 1.5z"/></svg>`,
        urlTemplate: 'https://mail.zoho.com/zm/#mail/compose/to={to}&subject={subject}&body={body}',
        popular: false
      }
    ];

    // Initialize if auto-init is enabled
    if (this.options.autoInit) {
      this.init();
    }
  }

  init() {
    if (this.isInitialized) return;

    this.createStyles();
    this.attachEventListeners();
    this.isInitialized = true;
  }

  createStyles() {
    const styleId = 'mailto-handler-styles';
    if (document.getElementById(styleId)) return;

    const styles = `
        .mailto-handler-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .mailto-handler-backdrop.show {
          opacity: 1;
        }
        
        .mailto-handler-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 400px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          transform: scale(0.9) translateY(20px);
          transition: transform 0.2s ease;
        }
        
        .mailto-handler-backdrop.show .mailto-handler-modal {
          transform: scale(1) translateY(0);
        }
        
        .mailto-handler-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .mailto-handler-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .mailto-handler-subtitle {
          margin: 4px 0 0;
          font-size: 14px;
          color: #6b7280;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .mailto-handler-clients {
          padding: 16px 24px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .mailto-handler-client {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 8px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          text-align: left;
        }
        
        .mailto-handler-client:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }
        
        .mailto-handler-client:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .mailto-handler-client:last-child {
          margin-bottom: 0;
        }
        
        .mailto-handler-client-icon {
          font-size: 20px;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }
        
        .mailto-handler-client-info {
          flex: 1;
        }
        
        .mailto-handler-client-name {
          font-size: 16px;
          font-weight: 500;
          color: #111827;
          margin: 0;
        }
        
        .mailto-handler-client-desc {
          font-size: 13px;
          color: #6b7280;
          margin: 2px 0 0;
        }
        
        .mailto-handler-footer {
          padding: 16px 24px 20px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .mailto-handler-remember {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #6b7280;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .mailto-handler-remember input {
          margin-right: 8px;
        }
        
        .mailto-handler-cancel {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .mailto-handler-cancel:hover {
          background: #f3f4f6;
        }
        
        /* Dark theme */
        .mailto-handler-modal.dark {
          background: #1f2937;
          color: white;
        }
        
        .mailto-handler-modal.dark .mailto-handler-header {
          border-bottom-color: #374151;
        }
        
        .mailto-handler-modal.dark .mailto-handler-title {
          color: white;
        }
        
        .mailto-handler-modal.dark .mailto-handler-subtitle {
          color: #9ca3af;
        }
        
        .mailto-handler-modal.dark .mailto-handler-client {
          background: #374151;
          border-color: #4b5563;
          color: white;
        }
        
        .mailto-handler-modal.dark .mailto-handler-client:hover {
          border-color: #60a5fa;
          background: #4b5563;
        }
        
        .mailto-handler-modal.dark .mailto-handler-client-name {
          color: white;
        }
        
        .mailto-handler-modal.dark .mailto-handler-client-desc {
          color: #9ca3af;
        }
        
        .mailto-handler-modal.dark .mailto-handler-footer {
          border-top-color: #374151;
        }
        
        .mailto-handler-modal.dark .mailto-handler-remember {
          color: #9ca3af;
        }
        
        .mailto-handler-modal.dark .mailto-handler-cancel {
          color: #9ca3af;
        }
        
        .mailto-handler-modal.dark .mailto-handler-cancel:hover {
          background: #4b5563;
        }
        
        /* Mobile responsive */
        @media (max-width: 640px) {
          .mailto-handler-modal {
            width: 95%;
            margin: 20px;
          }
          
          .mailto-handler-header,
          .mailto-handler-clients,
          .mailto-handler-footer {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .mailto-handler-backdrop,
          .mailto-handler-modal,
          .mailto-handler-client {
            transition: none;
          }
        }
      `;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  attachEventListeners() {
    document.addEventListener('click', this.handleMailtoClick.bind(this));
  }

  handleMailtoClick(event) {
    const target = event.target.closest('a[href^="mailto:"]');
    if (!target) return;

    event.preventDefault();

    const href = target.getAttribute('href');
    const mailtoData = this.parseMailtoUrl(href);

    // Check if user has a saved preference
    const savedClient = this.getSavedClient();
    if (savedClient && this.options.rememberChoice) {
      this.openEmailClient(savedClient, mailtoData);
      return;
    }

    // Check if we should use default client
    if (this.options.defaultClient) {
      const defaultClient = this.getAvailableClients().find(c => c.id === this.options.defaultClient);
      if (defaultClient) {
        this.openEmailClient(defaultClient, mailtoData);
        return;
      }
    }

    // Check for auto-detected client if enabled
    if (this.options.autoDetect && this.options.defaultClient === null) {
      const mostLikelyClientId = this.clientDetector.getMostLikelyClient();
      if (mostLikelyClientId) {
        const detectedClient = this.getAvailableClients().find(c => c.id === mostLikelyClientId);
        if (detectedClient) {
          this.openEmailClient(detectedClient, mailtoData);
          return;
        }
      }
    }

    // Show client selection modal if no preference or default
    this.showClientSelector(mailtoData);
  }

  parseMailtoUrl(href) {
    const url = new URL(href);
    const params = new URLSearchParams(url.search);

    return {
      to: url.pathname || '',
      subject: params.get('subject') || '',
      body: params.get('body') || '',
      cc: params.get('cc') || '',
      bcc: params.get('bcc') || ''
    };
  }

  getAvailableClients() {
    let clients = [...this.builtInClients];

    // Add custom clients
    if (this.options.customClients.length > 0) {
      clients = [...clients, ...this.options.customClients];
    }

    // Exclude clients if specified
    if (this.options.excludeClients.length > 0) {
      clients = clients.filter(client => !this.options.excludeClients.includes(client.id));
    }

    // Use client detector to prioritize likely clients if autoDetect is enabled
    if (this.options.autoDetect) {
      const detectedClients = this.clientDetector.detectClients();
      
      // Sort clients based on detection results
      clients.sort((a, b) => {
        const aDetected = detectedClients.includes(a.id);
        const bDetected = detectedClients.includes(b.id);
        
        if (aDetected && !bDetected) return -1;
        if (!aDetected && bDetected) return 1;
        
        // If both detected or both not detected, sort by popularity
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        
        return 0;
      });
    } else {
      // Sort popular clients first (original behavior)
      clients.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      });
    }

    return clients;
  }

  showClientSelector(mailtoData) {
    this.createModal(mailtoData);
    document.body.appendChild(this.backdropElement);

    // Trigger animation
    requestAnimationFrame(() => {
      this.backdropElement.classList.add('show');
    });

    // Focus first client for accessibility
    setTimeout(() => {
      const firstClient = this.modalElement.querySelector('.mailto-handler-client');
      if (firstClient) firstClient.focus();
    }, 200);
  }

  createModal(mailtoData) {
    // Create backdrop
    this.backdropElement = document.createElement('div');
    this.backdropElement.className = 'mailto-handler-backdrop';
    this.backdropElement.addEventListener('click', (e) => {
      if (e.target === this.backdropElement) {
        this.closeModal();
      }
    });

    // Create modal
    this.modalElement = document.createElement('div');
    this.modalElement.className = `mailto-handler-modal ${this.getThemeClass()}`;

    const clients = this.getAvailableClients();
    const recipientDisplay = mailtoData.to || 'recipient';

    this.modalElement.innerHTML = `
        <div class="mailto-handler-header">
          <h2 class="mailto-handler-title">Choose Email Client</h2>
          <p class="mailto-handler-subtitle">Send email to ${recipientDisplay}</p>
        </div>
        
        <div class="mailto-handler-clients">
          ${clients.map(client => `
            <button class="mailto-handler-client" data-client-id="${client.id}" type="button">
              ${this.options.showIcons ? `<span class="mailto-handler-client-icon">${client.icon}</span>` : ''}
              <div class="mailto-handler-client-info">
                <div class="mailto-handler-client-name">${client.name}</div>
                ${client.description ? `<div class="mailto-handler-client-desc">${client.description}</div>` : ''}
              </div>
            </button>
          `).join('')}
        </div>
        
        <div class="mailto-handler-footer">
          <label class="mailto-handler-remember">
            <input type="checkbox" ${this.options.rememberChoice ? 'checked' : ''} id="remember-choice">
            Remember my choice
          </label>
          <button class="mailto-handler-cancel" type="button">Cancel</button>
        </div>
      `;

    // Add event listeners
    this.modalElement.addEventListener('click', (e) => {
      const clientButton = e.target.closest('.mailto-handler-client');
      const cancelButton = e.target.closest('.mailto-handler-cancel');

      if (clientButton) {
        const clientId = clientButton.dataset.clientId;
        const rememberChoice = this.modalElement.querySelector('#remember-choice').checked;
        this.handleClientSelection(clientId, mailtoData, rememberChoice);
      } else if (cancelButton) {
        this.closeModal();
      }
    });

    // Add keyboard navigation
    this.modalElement.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    this.backdropElement.appendChild(this.modalElement);
  }

  handleClientSelection(clientId, mailtoData, rememberChoice) {
    const clients = this.getAvailableClients();
    const selectedClient = clients.find(c => c.id === clientId);

    if (!selectedClient) {
      this.handleError(new Error(`Client ${clientId} not found`));
      return;
    }

    if (rememberChoice) {
      this.saveClientPreference(clientId);
    }

    this.openEmailClient(selectedClient, mailtoData);
    this.closeModal();

    // Call callback if provided
    if (this.options.onClientSelect) {
      this.options.onClientSelect(selectedClient, mailtoData);
    }
  }

  openEmailClient(client, mailtoData) {
    try {
      let url = client.urlTemplate;

      // Replace placeholders
      url = url.replace('{to}', encodeURIComponent(mailtoData.to));
      url = url.replace('{subject}', encodeURIComponent(mailtoData.subject));
      url = url.replace('{body}', encodeURIComponent(mailtoData.body));
      url = url.replace('{cc}', encodeURIComponent(mailtoData.cc));
      url = url.replace('{bcc}', encodeURIComponent(mailtoData.bcc));

      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      this.handleError(error);
    }
  }

  closeModal() {
    if (!this.backdropElement) return;

    this.backdropElement.classList.remove('show');
    setTimeout(() => {
      if (this.backdropElement && this.backdropElement.parentNode) {
        this.backdropElement.parentNode.removeChild(this.backdropElement);
      }
      this.backdropElement = null;
      this.modalElement = null;
    }, 200);
  }

  getThemeClass() {
    if (this.options.theme === 'dark') return 'dark';
    if (this.options.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';
    }
    return '';
  }

  saveClientPreference(clientId) {
    try {
      localStorage.setItem(this.options.storageKey, clientId);
    } catch (error) {
      // Fallback to cookie if localStorage is not available
      document.cookie = `${this.options.storageKey}=${clientId}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }

  getSavedClient() {
    try {
      // Try localStorage first
      const saved = localStorage.getItem(this.options.storageKey);
      if (saved) return this.getAvailableClients().find(c => c.id === saved);

      // Fallback to cookie
      const cookies = document.cookie.split(';');
      const cookie = cookies.find(c => c.trim().startsWith(`${this.options.storageKey}=`));
      if (cookie) {
        const clientId = cookie.split('=')[1];
        return this.getAvailableClients().find(c => c.id === clientId);
      }
    } catch (error) {
      // Ignore storage errors
    }
    return null;
  }

  clearSavedPreference() {
    try {
      localStorage.removeItem(this.options.storageKey);
      document.cookie = `${this.options.storageKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (error) {
      // Ignore storage errors
    }
  }

  handleError(error) {
    console.error('MailtoHandler error:', error);
    if (this.options.onError) {
      this.options.onError(error);
    }
  }

  destroy() {
    this.closeModal();
    document.removeEventListener('click', this.handleMailtoClick);

    const styleElement = document.getElementById('mailto-handler-styles');
    if (styleElement) {
      styleElement.remove();
    }

    this.isInitialized = false;
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MailtoHandler;
} else if (typeof define === 'function' && define.amd) {
  define([], function () { return MailtoHandler; });
} else {
  window.MailtoHandler = MailtoHandler;
}