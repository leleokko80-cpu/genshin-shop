# deploy.py
import os
from pyinfra.operations import server

REGISTRY = "localhost:8082"
PROJECT = "devops"
BACKEND = f"{REGISTRY}/{PROJECT}/genshin-shop-backend:latest"
FRONTEND = f"{REGISTRY}/{PROJECT}/genshin-shop-frontend:latest"

# Secrets come from environment variables, never hardcoded
DB_NAME = os.environ["MYSQL_DATABASE"]
DB_USER = os.environ["MYSQL_USER"]
DB_PASS = os.environ["MYSQL_PASSWORD"]
DB_ROOT = os.environ["MYSQL_ROOT_PASSWORD"]
JWT = os.environ["JWT_SECRET"]
HARBOR_PASSWORD = os.environ["HARBOR_PASSWORD"]

server.shell(
    name="Check Docker is installed",
    commands=["docker --version"],
)

server.shell(
    name="Login to Harbor",
    commands=[f"echo '{HARBOR_PASSWORD}' | docker login {REGISTRY} -u admin --password-stdin"],
)

server.shell(
    name="Pull latest images",
    commands=[f"docker pull {BACKEND}", f"docker pull {FRONTEND}"],
)

server.shell(
    name="Create network and volume",
    commands=[
        "docker network create appnet || true",
        "docker volume create mysqldata || true",
    ],
)

server.shell(
    name="Stop old app containers",
    commands=[
        "docker rm -f frontend || true",
        "docker rm -f backend || true",
    ],
)

server.shell(
    name="Start database and wait until ready",
    commands=[
        "docker rm -f db || true",
        "docker run -d --name db --network appnet --restart unless-stopped "
        f"-e MYSQL_ROOT_PASSWORD='{DB_ROOT}' -e MYSQL_DATABASE='{DB_NAME}' "
        f"-e MYSQL_USER='{DB_USER}' -e MYSQL_PASSWORD='{DB_PASS}' "
        "-v mysqldata:/var/lib/mysql mysql:8.0",
        "for i in $(seq 1 40); do "
        f"docker exec db mysqladmin ping -h 127.0.0.1 -u root -p'{DB_ROOT}' --silent && exit 0; "
        "sleep 3; done; echo 'MySQL did not become ready'; exit 1",
    ],
)

server.shell(
    name="Start backend and wait until healthy",
    commands=[
        "docker run -d --name backend --network appnet --restart unless-stopped "
        "-p 8081:8081 "
        f"-e DB_URL='jdbc:mysql://db:3306/{DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC' "
        f"-e DB_USERNAME='{DB_USER}' -e DB_PASSWORD='{DB_PASS}' "
        f"-e JWT_SECRET='{JWT}' -e CORS_ORIGINS=http://localhost:3000 "
        f"{BACKEND}",
        "for i in $(seq 1 40); do "
        "docker exec backend wget -qO- http://localhost:8081/health >/dev/null 2>&1 && exit 0; "
        "sleep 3; done; echo 'Backend did not become healthy'; docker logs --tail 30 backend; exit 1",
    ],
)

server.shell(
    name="Start frontend",
    commands=[
        "docker run -d --name frontend --network appnet --restart unless-stopped "
        f"-p 3000:8080 {FRONTEND}",
    ],
)