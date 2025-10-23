import axios from 'axios';
import authService from './AuthService';

// Créer une instance axios avec configuration par défaut
const apiClient = axios.create({
    baseURL: '',  // Utiliser le proxy
    timeout: 10000,
});

// Intercepteur pour les requêtes - ajouter automatiquement Basic Auth
apiClient.interceptors.request.use(
    (config) => {
        // Récupérer les credentials
        const { username, password } = authService.getCredentials();
        
        if (username && password) {
            // Encoder en Basic Auth comme curl
            const credentials = btoa(`${username}:${password}`);
            config.headers['Authorization'] = `Basic ${credentials}`;
        }
        
        // S'assurer que le Content-Type est défini
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses - gérer les erreurs d'authentification
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expiré ou invalide
            authService.logout();
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;