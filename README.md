# Déploiement du Projet Vue.js avec Docker

Ce guide explique comment déployer l'application Vue.js en local avec Docker.

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Node.js (pour le développement local)
- Un backend Laravel fonctionnel sur le port 8000

## Structure du Projet

```
brand-vue/
├── src/
│   ├── components/
│   │   ├── Alert-component.vue
│   │   ├── BrandList.vue
│   │   ├── BrandModal.vue
│   │   └── DeleteModal.vue
│   └── api/
│       └── api.js
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── README.md
```

## Configuration

### 1. Configuration du Backend

Assurez-vous que votre backend Laravel est configuré pour accepter les requêtes CORS. Dans votre fichier `.env` Laravel :

### 2. Configuration de l'API

Le fichier `src/api/api.js` est configuré pour communiquer avec le backend Laravel sur `http://localhost:8000/api`.

## Déploiement

### 1. Construction de l'Image

```bash
docker-compose build
```

### 2. Lancement des Conteneurs

```bash
docker-compose up -d
```

### 3. Accès à l'Application

- Frontend Vue.js : http://localhost:8080
- Backend Laravel : http://localhost:8000

## Commandes Utiles

- Voir les logs des conteneurs :

```bash
docker-compose logs -f
```

- Arrêter les conteneurs :

```bash
docker-compose down
```

- Reconstruire et redémarrer :

```bash
docker-compose up -d --build
```

## Dépannage

### Problèmes Courants

1. **Erreur de connexion au backend**

   - Vérifiez que le backend Laravel est en cours d'exécution
   - Vérifiez que le port 8000 est accessible
   - Vérifiez la configuration CORS dans Laravel

2. **Problèmes de build**

   - Nettoyez le cache Docker : `docker system prune -a`
   - Reconstruisez l'image : `docker-compose build --no-cache`

3. **Problèmes de réseau**
   - Vérifiez que le réseau `app-network` est créé : `docker network ls`
   - Recréez le réseau si nécessaire : `docker network create app-network`

## Développement

Pour le développement local sans Docker :

1. Installez les dépendances :

```bash
npm install
```

2. Lancez le serveur de développement :

```bash
npm run dev
```

## Notes Importantes

- Le frontend est configuré pour communiquer avec le backend via `host.docker.internal:8000`
- Les requêtes API sont automatiquement redirigées vers le backend Laravel
- Le serveur Nginx est configuré pour gérer le routage côté client (SPA)
