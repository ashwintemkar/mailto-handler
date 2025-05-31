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
    
    // Note: This is based on common patterns I've observed
    // Future: Could add local app detection if browser APIs allow
    
    // Mobile detection with improved patterns
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
    
    // iOS device detection with version detection
    const isIOS = /iPad|iPhone|iPod/.test(this.userAgent) && !window.MSStream;
    const iOSVersion = isIOS ? 
      parseInt(this.userAgent.match(/OS (\d+)_/i)?.[1] || '0', 10) : 0;
    
    // Android detection with version detection
    const isAndroid = /Android/.test(this.userAgent);
    const androidVersion = isAndroid ? 
      parseFloat(this.userAgent.match(/Android (\d+(\.\d+)?)/i)?.[1] || '0') : 0;
    
    // MacOS detection - fixed for M1/M2 Macs
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
    
    // Samsung browser detection
    const isSamsung = /SamsungBrowser/.test(this.userAgent);

    // Check for specific clients based on platform and browser
    if (isIOS) {
      // Apple Mail is default on iOS
      this.detectedClients.push('apple');
      
      // Gmail and Outlook are common on iOS too
      this.detectedClients.push('gmail');
      this.detectedClients.push('outlook');
      
      // Newer iOS versions might have different defaults
      if (iOSVersion >= 14) {
        // iOS 14+ allows changing default mail app
        this.detectedClients.unshift('gmail'); // Gmail more common as custom default
      }
    }
    
    if (isAndroid) {
      // Gmail is typically default on Android
      this.detectedClients.push('gmail');
      this.detectedClients.push('outlook');
      
      // Samsung devices often use Samsung Email
      if (isSamsung) {
        this.detectedClients.unshift('samsung');
      }
      
      // Newer Android versions allow changing defaults
      if (androidVersion >= 10) {
        // More variety in defaults on newer Android
        this.detectedClients.push('protonmail');
      }
    }
    
    if (isMac) {
      // Apple Mail is typically the default on macOS
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
      // Firefox users often have Thunderbird
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