# Spring React Monitoring

Petit projet démonstratif full‑stack pour portfolio : une application de gestion / inventaire de voitures composée d'un backend Spring Boot (Java 17) et d'un frontend React, containerisée avec Docker Compose et observée via Prometheus + Grafana.

## Composants
- Backend (Spring Boot) : service Java exposant une API REST sous `/api` et endpoint Actuator `/actuator/prometheus` pour métriques. Packaging via Maven, image Docker basée sur le JAR construit.
- Frontend (React) : application React buildée en statique et servie via une image Nginx (dossier `frontend/build` copié dans l'image).
- MariaDB : base de données relationnelle contenant les données d'application (propriétaires, voitures). Volume persistant configuré dans docker-compose.
- Prometheus : collecte les métriques exposées par le backend (Actuator) et par Prometheus lui‑même.
- Grafana : interface graphique pour visualiser les métriques stockées par Prometheus (dashboards, alerting).

## Interaction entre les images Docker (flux entre 5 images)

1. Frontend (nginx) ↔ Backend (spring-boot)
   - Le frontend (fichiers statiques servis par Nginx) effectue des appels HTTP vers l'API du backend sur `/api/*`.
   - En local, Docker Compose place les deux conteneurs sur le même réseau `tp-complet`, ce qui permet au frontend d'appeler le backend via le nom de service (p.ex. `http://spring-data-rest-app:8080/api/`).

2. Backend ↔ MariaDB
   - Le backend utilise JDBC (MariaDB driver) pour se connecter à la base de données MariaDB (service `mariadb`) via `jdbc:mariadb://mariadb-springboot:3306/springboot`.
   - Les données persistantes (propriétaires, voitures) sont stockées dans un volume Docker `mariadb_data` pour persistance.

3. Prometheus ↔ Backend
   - Prometheus scrape le backend via le `metrics_path` `/actuator/prometheus` configuré dans `prometheus.yml`.
   - Si le backend nécessite une authentification pour les métriques, Prometheus peut être configuré pour utiliser `basic_auth` (à externaliser pour la sécurité).

4. Grafana ↔ Prometheus
   - Grafana est configurée pour utiliser Prometheus comme datasource. Les dashboards Grafana lisent les métriques stockées par Prometheus et affichent visualisations et alertes.

5. Réseau & découverte
   - Docker Compose crée un réseau isolé `tp-complet` et tous les services sont connectés à ce réseau. Les services communiquent entre eux par leurs noms de service définis dans les fichiers `docker-compose.yml`.

## Démarrage local rapide
1. Copier `.env.example` → `.env` et remplir les secrets (DB password, Grafana admin pass si souhaité).
2. Lancer l'ensemble :

```bash
docker-compose up --build
```

3. Accéder aux services :
- Frontend (Nginx) : http://localhost
- Backend : http://localhost:8080 (API `/api`)
- Prometheus : http://localhost:9090
- Grafana : http://localhost:3000 (admin/admin par défaut — changer en prod)

## Notes de sécurité et production
- Ne pas committer de secrets dans le repo. Utiliser des variables d'environnement ou un secret manager.
- Restreindre CORS et endpoints Actuator en production.
- Remplacer `ddl-auto=update` par migrations gérées (Flyway / Liquibase) pour éviter dérives du schéma.

---

Ce README est un point de départ : je peux l'étendre avec un diagramme d'architecture (SVG), exemples de commandes CI/CD (GitHub Actions) et un guide pour provisionner dashboards Grafana si tu veux. Veux‑tu que j'ajoute ces sections maintenant ?
