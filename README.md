# 🎬 Proyecto Salas de Cine – NestJS + PostgreSQL + Docker

Este proyecto es una API REST construida con **NestJS**, **Sequelize**, **PostgreSQL** y **Docker**, que permite gestionar películas, funciones de cine, reservas de boletas y más.

---

## 🚀 Requisitos

- Node.js >= 18.x
- Docker y Docker Compose
- PostgreSQL (si no usas Docker)
- `npm` o `yarn`

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/proyecto-salas-cine.git
cd proyecto-salas-cine

# Instalar dependencias
npm install
```

## Para ejecutar el proyecto en modo de desarrollo, usa el siguiente comando:
```bash
docker-compose up --build
```

## Configura el archivo .env

```bash
PORT
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
API_URL
API_KEY
```


## Rutas disponibles
```bash
POST /funciones: Crear una nueva función en el sistema.

GET /funciones: Obtener todas las funciones.

GET /funciones/:id/disponibilidad: Consultar la disponibilidad de una función por su ID.

POST /peliculas: Importar películas populares desde TMDB.

GET /peliculas: Obtener todas las películas.
```

## 🧪 Pruebas

```bash
npm run test
```

## Para ejecutar las pruebas con cobertura, usa:
```bash
npm run test:cov
```