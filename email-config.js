class EmailConfig {
    constructor() {
        // Temporarily hardcoded for local development due to CORS restrictions
        // In production, this will load from .env file via server
        this.publicKey = 'sVP_L5YeJR4dPLBYp';
        this.serviceId = 'service_68x1dfq';
        this.templateId = 'template_qd5hgxo';
        this.recipientEmail = 'muthuselvamm022@gmail.com';
        
        // Initialize EmailJS immediately
        this.initializeEmailJS();
    }
    
    async initializeWhenReady() {
        // Wait for env-loader to be ready with retry mechanism
        let retries = 0;
        const maxRetries = 50; // 5 seconds max wait
        
        while (!window.envLoader && retries < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        }
        
        if (window.envLoader) {
            await window.envLoader.waitForLoad();
            this.loadCredentials();
            this.initializeEmailJS();
        } else {
            console.error('Environment loader not found after waiting');
        }
    }
    
    loadCredentials() {
        this.publicKey = window.envLoader.get('sVP_L5YeJR4dPLBYp');
        this.serviceId = window.envLoader.get('service_68x1dfq');
        this.templateId = window.envLoader.get('template_qd5hgxo');
        this.recipientEmail = window.envLoader.get('muthuselvamm022@gmail.com');
        
        console.log('EmailJS credentials loaded from environment:', {
            hasPublicKey: !!this.publicKey,
            hasServiceId: !!this.serviceId,
            hasTemplateId: !!this.templateId,
            hasRecipientEmail: !!this.recipientEmail,
            publicKey: this.publicKey.substring(0, 10) + '...',
            serviceId: this.serviceId,
            templateId: this.templateId
        });
    }
    
    initializeEmailJS() {
        if (window.emailjs && this.publicKey) {
            try {
                emailjs.init(this.publicKey);
                console.log('EmailJS initialized successfully from environment variables');
                this.isInitialized = true;
            } catch (error) {
                console.error('EmailJS initialization failed:', error);
                this.isInitialized = false;
            }
        } else {
            console.error('EmailJS not available or public key missing from environment');
            this.isInitialized = false;
        }
    }
    
    sendEmail(templateParams) {
        if (!this.isInitialized) {
            return Promise.reject(new Error('EmailJS not initialized - please check your credentials'));
        }
        
        return emailjs.send(this.serviceId, this.templateId, templateParams);
    }
    
    getConfigStatus() {
        return {
            isInitialized: this.isInitialized,
            hasCredentials: this.publicKey !== 'sVP_L5YeJR4dPLBYp',
            serviceId: this.serviceId,
            templateId: this.templateId,
            recipientEmail: this.recipientEmail
        };
    }
}

window.emailConfig = new EmailConfig();