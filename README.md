# Genshin Shop: DevOps pipeline

Spring Boot backend + web frontend + MySQL, delivered through a full CI/CD chain.

## Architecture
- **GitHub**: source code and pull requests (`main` is protected)
- **GitHub Actions**: CI pipeline (`.github/workflows/ci.yml`)
- **Self-hosted runner (Windows)**: runs the build and push job
- **Harbor** (local container, `localhost:8082`): private Docker registry, project `devops`
- **Docker Compose**: runs the app locally (`db`, `backend`, `frontend`)
- **pyinfra** (`deploy.py`): automated deployment from the Harbor images
- **Uptime Kuma** (`localhost:3001`): availability monitoring of `/health`

## Pipeline flow
1. The developer pushes a `feature/*` branch
2. The pull request runs the tests (`mvn test`, frontend build)
3. Merging into `main` builds both images, tags them with the commit SHA and `latest`, and pushes them to Harbor
4. `pyinfra @local deploy.py` pulls the new images and recreates the containers
5. Uptime Kuma probes `/health` continuously

## How to run

### Locally with Docker Compose
```
cp .env.example .env      # then edit the values
docker compose up -d --build
```
App: http://localhost:3000, backend health: http://localhost:8081/health

### Deploy from Harbor with pyinfra
```
export MYSQL_ROOT_PASSWORD=... MYSQL_DATABASE=... MYSQL_USER=... MYSQL_PASSWORD=...
export JWT_SECRET=... HARBOR_PASSWORD=...
pyinfra @local deploy.py
```

### Monitoring
```
docker run -d --name uptime-kuma --restart unless-stopped --network appnet \
  -p 3001:3001 -v uptime-kuma-data:/app/data louislam/uptime-kuma:1
```
Monitor: `http://backend:8081/health`, interval 60 s, retries 2.

### CI secrets
`HARBOR_USERNAME` and `HARBOR_PASSWORD` are stored as GitHub Actions repository secrets. No credentials are committed.