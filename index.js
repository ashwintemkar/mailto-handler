/**
 * MailtoHandler - Customizable mailto: link handler library
 * @version 1.0.0
 */

class MailtoHandler {
    constructor(options = {}) {
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
        ...options
      };
  
      this.isInitialized = false;
      this.modalElement = null;
      this.backdropElement = null;
      
      // Built-in email clients
      this.builtInClients = [
        {
          id: 'gmail',
          name: 'Gmail',
          icon: '📧',
          urlTemplate: 'https://mail.google.com/mail/?view=cm&to={to}&su={subject}&body={body}',
          popular: true
        },
        {
          id: 'outlook',
          name: 'Outlook',
          icon: '📨',
          urlTemplate: 'https://outlook.live.com/mail/0/deeplink/compose?to={to}&subject={subject}&body={body}',
          popular: true
        },
        {
          id: 'yahoo',
          name: 'Yahoo Mail',
          icon: '💌',
          urlTemplate: 'https://compose.mail.yahoo.com/?to={to}&subject={subject}&body={body}',
          popular: true
        },
        {
          id: 'apple',
          name: 'Apple Mail',
          icon: '✉️',
          urlTemplate: 'mailto:{to}?subject={subject}&body={body}',
          description: 'Opens in your default mail app'
        },
        {
          id: 'thunderbird',
          name: 'Thunderbird',
          icon: '🦅',
          urlTemplate: 'mailto:{to}?subject={subject}&body={body}',
          description: 'Opens in your default mail app'
        }
      ];
  
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
  
      // Show client selection modal
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
      
      // Sort popular clients first
      return clients.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      });
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
    define([], function() { return MailtoHandler; });
  } else {
    window.MailtoHandler = MailtoHandler;
  }