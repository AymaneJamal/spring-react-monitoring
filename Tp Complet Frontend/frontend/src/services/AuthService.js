class AuthService {
    constructor() {
        this.username = null;
        this.password = null;
    }

    // Stocker les credentials après le login
    setCredentials(username, password) {
        this.username = username;
        this.password = password;
        
        // Stocker aussi dans localStorage pour persistance
        localStorage.setItem('auth_username', username);
        localStorage.setItem('auth_password', password);
    }

    // Récupérer les credentials stockés
    getCredentials() {
        if (!this.username || !this.password) {
            // Récupérer depuis localStorage si pas en mémoire
            this.username = localStorage.getItem('auth_username');
            this.password = localStorage.getItem('auth_password');
        }
        
        return {
            username: this.username,
            password: this.password
        };
    }

    // Générer l'en-tête Authorization Basic Auth
    getAuthHeader() {
        const { username, password } = this.getCredentials();
        
        if (username && password) {
            // Encoder en base64: "username:password"
            const credentials = btoa(`${username}:${password}`);
            return `Basic ${credentials}`;
        }
        
        return null;
    }

    // Vérifier si l'utilisateur est connecté
    isAuthenticated() {
        const { username, password } = this.getCredentials();
        return username && password;
    }

    // Déconnexion
    logout() {
        this.username = null;
        this.password = null;
        localStorage.removeItem('auth_username');
        localStorage.removeItem('auth_password');
    }

    // Obtenir les headers complets pour axios - credentials en clair
    getAuthHeaders() {
        const { username, password } = this.getCredentials();
        
        if (username && password) {
            return {
                'username': username,
                'password': password,
                'Content-Type': 'application/json'
            };
        }
        
        return {
            'Content-Type': 'application/json'
        };
    }
}

// Instance singleton
const authService = new AuthService();
export default authService;