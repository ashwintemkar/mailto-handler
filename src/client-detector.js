/**
 * Email Client Detector
 * Helps detect the user's preferred email client based on various signals
 * 
 * Created by Ashwin Temkar
 * Started: May 2025
 * Last updated: June 2025
 */

class ClientDetector {
  constructor() {
    this.detectedClients = [];
    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;
    this.vendor = navigator.vendor;
    
    // Track detection count for debugging
    this._detectionCount = 0;
  }

  /**
   * Detect potential email clients based on device, OS, and browser
   * @returns {Array} List of potential client IDs
   */
  detectClients() {
    // Reset detection array
    this.detectedClients = [];
    this._detectionCount++;
    
    // TODO: Add more sophisticated detection in future versions
    // Maybe we can use feature detection for installed apps?
    
    // Check if running in mobile environment
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
    
    // iOS device detection
    const isIOS = /iPad|iPhone|iPod/.test(this.userAgent) && !window.MSStream;
    
    // Android detection
    const isAndroid = /Android/.test(this.userAgent);
    
    // MacOS detection - had to fix this for newer MacBooks
    const isMac = /Mac/.test(this.platform);
    
    // Windows detection
    const isWindows = /Win/.test(this.platform);
    
    // Chrome detection
    const isChrome = /Chrome/.test(this.userAgent) && /Google Inc/.test(this.vendor);
    
    // Firefox detection
    const isFirefox = /Firefox/.test(this.userAgent);
    
    // Safari detection
    const isSafari = /Safari/.test(this.userAgent) && /Apple Computer/.test(this.vendor);
    
    // Edge detection
    const isEdge = /Edg/.test(this.userAgent);
    
    // Check for specific clients based on platform and browser
    if (isIOS) {
      this.detectedClients.push('apple'); // Apple Mail is default on iOS
      this.detectedClients.push('gmail');
      this.detectedClients.push('outlook');
    }
    
    if (isAndroid) {
      this.detectedClients.push('gmail'); // Gmail is common on Android
      this.detectedClients.push('outlook');
    }
    
    if (isMac) {
      // My Mac testing showed Apple Mail is typically the default
      this.detectedClients.push('apple'); 
    }
    
    if (isWindows) {
      // Windows users typically have Outlook installed
      this.detectedClients.push('outlook'); 
      this.detectedClients.push('thunderbird');
    }
    
    // Browser-based suggestions
    if (isChrome) {
      this.detectedClients.push('gmail'); // Chrome users often use Gmail
    }
    
    if (isFirefox) {
      // From my testing, Firefox users often have Thunderbird
      this.detectedClients.push('thunderbird'); 
    }
    
    if (isSafari) {
      this.detectedClients.push('apple'); // Safari users might use Apple Mail
    }
    
    if (isEdge) {
      // Microsoft ecosystem - likely to use Outlook
      this.detectedClients.push('outlook'); 
    }
    
    // Remove duplicates using Set
    this.detectedClients = [...new Set(this.detectedClients)];
    
    return this.detectedClients;
  }

  /**
   * Check if specific email client is likely installed or preferred
   * @param {string} clientId - Email client ID to check
   * @returns {boolean} True if client is likely available
   */
  isClientLikely(clientId) {
    if (this.detectedClients.length === 0) {
      this.detectClients();
    }
    
    return this.detectedClients.includes(clientId);
  }

  /**
   * Get the most likely email client for this user
   * @returns {string|null} Client ID or null if couldn't determine
   */
  getMostLikelyClient() {
    if (this.detectedClients.length === 0) {
      this.detectClients();
    }
    
    // Return first client as most likely, or null if none detected
    return this.detectedClients.length > 0 ? this.detectedClients[0] : null;
  }
}

export default ClientDetector; 