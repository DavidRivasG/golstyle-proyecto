#!/bin/bash
echo "=== Deteniendo contenedores del Frontend ==="
cd /home/ubuntu/golstyle-frontend

if [ -f docker-compose.yml ]; then
    sudo docker compose down || true
fi
