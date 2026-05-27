#!/bin/bash
echo "=== Iniciando contenedores del Frontend ==="
cd /home/ubuntu/golstyle-frontend

# Permisos para que el docker compose no tenga problemas de lectura
chown -R ubuntu:ubuntu /home/ubuntu/golstyle-frontend

# Arrancamos Nginx con Angular
docker compose up -d --build
