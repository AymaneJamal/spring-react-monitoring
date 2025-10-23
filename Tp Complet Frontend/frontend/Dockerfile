# Image nginx simple - les fichiers sont déjà buildés localement
FROM nginx:alpine

# Copier les fichiers buildés depuis le dossier local /build
COPY build /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
