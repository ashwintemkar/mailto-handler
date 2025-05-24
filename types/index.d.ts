export interface EmailClient {
    id: string;
    name: string;
    icon: string;
    urlTemplate: string;
    description?: string;
    popular?: boolean;
}

export interface MailtoData {
    to: string;
    subject: string;
    body: string;
    cc: string;
    bcc: string;
}

export interface MailtoHandlerOptions {
    /** Default email client to use */
    defaultClient?: string | null;

    /** Whether to remember user's client choice */
    rememberChoice?: boolean;

    /** localStorage key for storing preference */
    storageKey?: string;

    /** Automatically initialize on construction */
    autoInit?: boolean;

    /** UI theme */
    theme?: 'light' | 'dark' | 'auto';

    /** Modal position */
    position?: 'center' | 'cursor';

    /** Show email client icons */
    showIcons?: boolean;

    /** Additional custom email clients */
    customClients?: EmailClient[];

    /** Client IDs to exclude from the list */
    excludeClients?: string[];

    /** Automatically detect user's likely email client */
    autoDetect?: boolean;

    /** Callback when user selects a client */
    onClientSelect?: (client: EmailClient, mailtoData: MailtoData) => void;

    /** Error handler callback */
    onError?: (error: Error) => void;
}

export class ClientDetector {
    constructor();
    
    /** Detect potential email clients based on device, OS, and browser */
    detectClients(): string[];
    
    /** Check if specific email client is likely installed or preferred */
    isClientLikely(clientId: string): boolean;
    
    /** Get the most likely email client for this user */
    getMostLikelyClient(): string | null;
}

export default class MailtoHandler {
    constructor(options?: MailtoHandlerOptions);

    /** Initialize the handler (attach event listeners) */
    init(): void;

    /** Open a specific email client with mailto data */
    openEmailClient(client: EmailClient, mailtoData: MailtoData): void;

    /** Get the user's saved email client preference */
    getSavedClient(): EmailClient | null;

    /** Clear the user's saved email client preference */
    clearSavedPreference(): void;

    /** Show the client selector modal */
    showClientSelector(mailtoData: MailtoData): void;

    /** Close the current modal */
    closeModal(): void;

    /** Get list of available email clients */
    getAvailableClients(): EmailClient[];

    /** Clean up and remove event listeners */
    destroy(): void;

    /** Current options */
    readonly options: Required<MailtoHandlerOptions>;

    /** Whether the handler is initialized */
    readonly isInitialized: boolean;
    
    /** Client detector instance */
    readonly clientDetector: ClientDetector;
}