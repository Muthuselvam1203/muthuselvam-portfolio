class EnvLoader {
    constructor() {
        this.env = {}
        this.isLoaded = false;
        this.loadEnv();
    }
    
    async loadEnv() {
        try {
            const response = await fetch('.env');
            if (response.ok) {
                const text = await response.text();
                this.parseEnv(text);
                this.isLoaded = true;
                console.log('Environment variables loaded successfully from .env file');
            } else {
                console.error('Could not load .env file. Please ensure .env file exists and is accessible.');
                this.isLoaded = false;
            }
        } catch (error) {
            console.error('Error loading .env file:', error);
            this.isLoaded = false;
        }
    }
    
    parseEnv(text) {
        const lines = text.split('\n');
        lines.forEach(line => {
            // Skip comments and empty lines
            if (line.trim() && !line.trim().startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    this.env[key.trim()] = valueParts.join('=').trim();
                }
            }
        });
    }
    
    get(key) {
        return this.env[key] || '';
    }
    
    isReady() {
        return this.isLoaded;
    }
    
    async waitForLoad() {
        while (!this.isLoaded) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return this.isLoaded;
    }
}

window.envLoader = new EnvLoader();