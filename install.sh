#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install nodejs -y
apt-get install libwebp -y
apt-get install ffmpeg -y
npm install

echo "[*] Se han instalado todas las dependencias, ejecute el comando \"npm start\" para iniciar inmediatamente el script"
