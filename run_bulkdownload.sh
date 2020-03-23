#!/bin/bash

echo "Iniciando el proceso"

#Accediendo a carpeta con el entorno virtual
cd /home/portaledcahn_backend/portaledcahn_env

#Activando el entorno virtual
source bin/activate

#Accediendo a la carpeta del proyecto
cd /home/portaledcahn_backend/edcahn_backend

#Ejecutando conversor para CE
python ocds_bulk_download/functions.py

echo "Finalizó correctamente"