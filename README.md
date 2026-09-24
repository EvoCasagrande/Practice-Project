# API de gestión de proyectos y tareas

API REST desarrollada con Node.js y TypeScript para organizar proyectos y sus tareas. Cada usuario puede administrar sus propios recursos, buscar por texto, filtrar tareas por estado y consultar listados paginados.

Proyecto de portfolio orientado a demostrar conocimientos de desarrollo backend: diseño de endpoints, bases de datos relacionales, autenticación, autorización, validación y pruebas automatizadas.

## Tecnologías

- Node.js y TypeScript.
- Express 5.
- PostgreSQL y Prisma ORM.
- Zod para validar datos de entrada.
- JWT para autenticación.
- bcrypt para almacenar hashes de contraseñas.
- Helmet y express-rate-limit.
- Vitest y Supertest.

## Funcionalidades

- Registro e inicio de sesión.
- Autenticación mediante tokens JWT.
- Roles `USER` y `ADMIN`.
- Gestión de cuentas, proyectos y tareas.
- Restricción de acceso según el rol y la pertenencia del recurso.
- Búsqueda de proyectos por nombre y tareas por título.
- Filtro de tareas completadas o pendientes.
- Paginación y ordenamiento configurable.
- Manejo centralizado de errores.
- Endpoint de salud.
- Apagado ordenado del servidor.

## Modelo de datos

Un usuario puede tener varios proyectos y cada proyecto puede contener varias tareas.

```text
User
 └── Project
      └── Task
```

La eliminación de un usuario también elimina sus proyectos y tareas. La eliminación de un proyecto elimina sus tareas asociadas.

## Instalación local

### Requisitos

- Node.js 24 y npm.
- PostgreSQL disponible.
- Una base de datos vacía para la primera instalación.

### 1. Instalar dependencias

Cloná o descargá el repositorio y, desde la raíz, ejecutá:

```bash
npm ci
```

### 2. Configurar las variables de entorno

Copiá `.env.example` a un archivo llamado `.env` y reemplazá los valores de ejemplo:

```dotenv
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/practice_db
JWT_SECRET=reemplazar_por_una_clave_aleatoria
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto HTTP. Si se omite, se utiliza `3000`. |
| `DATABASE_URL` | URL de conexión con PostgreSQL. Obligatoria. |
| `JWT_SECRET` | Clave utilizada para firmar y verificar tokens. Obligatoria. |

Podés generar una clave aleatoria con:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Usá el resultado como `JWT_SECRET`. El archivo `.env` no debe subirse al repositorio.

### 3. Generar el cliente y compilar

```bash
npm run build
```

Este comando limpia `dist`, genera el cliente de Prisma y compila TypeScript.

### 4. Aplicar las migraciones

Con PostgreSQL funcionando y `DATABASE_URL` configurada:

```bash
npm run db:deploy
```

Este comando aplica las migraciones existentes a la base indicada en `DATABASE_URL`.

### 5. Iniciar la API

Para desarrollo, con recarga automática:

```bash
npm run dev
```

Para ejecutar la versión compilada:

```bash
npm start
```

Por defecto, la API estará disponible en:

```text
http://localhost:3000
```

## Scripts

| Comando | Función |
|---|---|
| `npm run dev` | Ejecuta el código TypeScript con recarga automática. |
| `npm run build` | Limpia, genera el cliente Prisma y compila. |
| `npm start` | Ejecuta la aplicación compilada. |
| `npm run clean` | Elimina los archivos generados en `dist`. |
| `npm test` | Ejecuta Vitest en modo interactivo. |
| `npm run test:run` | Ejecuta las pruebas una vez y termina. |
| `npm run db:deploy` | Aplica las migraciones pendientes. |

## Autenticación

### Registro

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "Ana",
  "email": "ana@example.com",
  "password": "Ejemplo123"
}
```

Las cuentas nuevas reciben el rol `USER`. El registro no permite asignarse el rol `ADMIN`.

La contraseña debe tener entre 8 y 64 caracteres, incluir al menos una mayúscula y no superar 72 bytes en UTF-8.

### Inicio de sesión

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "ana@example.com",
  "password": "Ejemplo123"
}
```

La respuesta incluye los datos públicos del usuario y un `token`.

Para acceder a las rutas protegidas, enviá:

```http
Authorization: Bearer <token>
```

Usá el ID del usuario obtenido al registrarte o iniciar sesión para completar `:userId`.

## Roles y permisos

| Operación | Permiso |
|---|---|
| Listar usuarios | Solo `ADMIN`. |
| Consultar o eliminar una cuenta | Su dueño o un `ADMIN`. |
| Editar una cuenta | Solo su dueño. |
| Administrar proyectos y tareas | Solo su dueño. |

El middleware de autenticación consulta el usuario en la base para obtener su rol actual y verificar que la cuenta siga existiendo.

El rol no puede modificarse desde la edición de perfil. Para preparar una cuenta administradora de desarrollo, se cambia su rol directamente en la base mediante una herramienta administrativa.

## Endpoints

Salvo `/health` y las rutas de autenticación, los endpoints requieren un token válido.

### Salud y autenticación

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Comprueba que la API responde. |
| POST | `/api/v1/auth/register` | Registra una cuenta. |
| POST | `/api/v1/auth/login` | Inicia sesión y devuelve un token. |

`/health` devuelve `200` con `{"status":"ok"}`. No comprueba la disponibilidad de PostgreSQL.

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/v1/users` | Lista usuarios; exclusivo de administradores. |
| GET | `/api/v1/users/:userId` | Consulta una cuenta. |
| PATCH | `/api/v1/users/:userId` | Actualiza nombre o email. |
| DELETE | `/api/v1/users/:userId` | Elimina una cuenta. |

### Proyectos

Ruta base: `/api/v1/users/:userId/projects`

| Método | Ruta relativa | Descripción |
|---|---|---|
| GET | `/` | Lista proyectos del usuario. |
| POST | `/` | Crea un proyecto. |
| GET | `/:projectId` | Consulta un proyecto. |
| PATCH | `/:projectId` | Actualiza un proyecto. |
| DELETE | `/:projectId` | Elimina un proyecto. |

Ejemplo de body para crear un proyecto:

```json
{
  "name": "Portfolio",
  "description": "Desarrollo de mi portfolio personal"
}
```

### Tareas

Ruta base: `/api/v1/users/:userId/projects/:projectId/tasks`

| Método | Ruta relativa | Descripción |
|---|---|---|
| GET | `/` | Lista las tareas del proyecto. |
| POST | `/` | Crea una tarea. |
| GET | `/:taskId` | Consulta una tarea. |
| PATCH | `/:taskId` | Actualiza una tarea. |
| DELETE | `/:taskId` | Elimina una tarea. |

Ejemplo de body para crear una tarea:

```json
{
  "title": "Documentar los endpoints",
  "completed": false
}
```

`completed` es opcional al crear una tarea y su valor inicial es `false`.

## Filtros, paginación y ordenamiento

Estos parámetros se aplican a los listados de proyectos y tareas.

| Parámetro | Proyectos | Tareas | Valor por defecto |
|---|---|---|---|
| `search` | Busca por nombre. | Busca por título. | Sin búsqueda. |
| `completed` | No aplica. | `true` o `false`. | Ambos estados. |
| `page` | Entero positivo. | Entero positivo. | `1` |
| `limit` | Entre 1 y 100. | Entre 1 y 100. | `10` |
| `sortBy` | `id` o `name`. | `id` o `title`. | `id` |
| `order` | `asc` o `desc`. | `asc` o `desc`. | `asc` |

La búsqueda no distingue mayúsculas de minúsculas. Si se envía `search`, debe contener entre 1 y 100 caracteres para proyectos, o entre 1 y 200 para tareas, después de eliminar espacios de los extremos.

Los filtros pueden combinarse:

```http
GET /api/v1/users/1/projects?search=portfolio&page=1&limit=5&sortBy=name&order=asc
```

```http
GET /api/v1/users/1/projects/2/tasks?search=documentar&completed=false&page=1&limit=5&sortBy=title&order=asc
```

Se utiliza el ID ascendente como criterio de desempate.

### Información de paginación

Ejemplo de una respuesta sin coincidencias:

```json
{
  "status": "success",
  "results": 0,
  "page": 1,
  "limit": 10,
  "total": 0,
  "totalPages": 0,
  "tasks": []
}
```

- `results`: cantidad de elementos devueltos en la página.
- `total`: cantidad total de coincidencias, sin paginación.
- `totalPages`: total dividido por el límite, redondeado hacia arriba.
- `tasks` o `projects`: elementos de la página solicitada.

Una página posterior a la última devuelve un array vacío y conserva el total de coincidencias.

## Validaciones y errores

La API valida bodies, identificadores y parámetros de consulta.

Límites principales:

| Campo | Máximo |
|---|---:|
| Nombre de usuario | 100 caracteres |
| Nombre de proyecto | 100 caracteres |
| Descripción de proyecto | 2000 caracteres |
| Título de tarea | 200 caracteres |

Los PATCH deben incluir al menos un campo editable válido.

Ejemplo de respuesta de error:

```json
{
  "status": "error",
  "message": "Acceso no autorizado"
}
```

Los errores de validación del body también pueden incluir una lista `errors` con el campo y su mensaje.

| Código | Uso |
|---|---|
| `400` | Entrada inválida o JSON mal formado. |
| `401` | Autenticación ausente o inválida. |
| `403` | Permisos insuficientes. |
| `404` | Ruta o recurso inexistente. |
| `409` | Conflicto, como un email duplicado. |
| `413` | Body demasiado grande. |
| `429` | Límite de solicitudes alcanzado. |
| `500` | Error interno inesperado. |
| `503` | Determinados fallos de disponibilidad de la base. |

## Seguridad

- Contraseñas almacenadas como hashes con bcrypt.
- Respuestas de usuario sin el hash de contraseña.
- Autenticación JWT y autorización por rol y pertenencia.
- Validación de entradas mediante Zod.
- Headers de seguridad mediante Helmet.
- Límite de login: 5 solicitudes por IP cada 10 minutos.
- Límite de registro: 3 solicitudes por IP cada hora.

Los limitadores cuentan también las solicitudes exitosas. Su almacenamiento actual es en memoria del proceso.

## Pruebas

```bash
npm run test:run
```

La suite utiliza Vitest y Supertest e incluye casos sobre:

- Validación y transformación de datos.
- Límites de longitud y actualizaciones vacías.
- Permisos de administradores y propietarios.
- Protección del campo `role`.
- Autenticación inválida o vencida.
- Errores HTTP y límites de solicitudes.

Los tests que importan la aplicación requieren las variables de entorno configuradas y el cliente de Prisma generado.

## Estructura

```text
prisma/
  migrations/
  schema.prisma
src/
  config/
  lib/
  middlewares/
  modules/
    auth/
    users/
    projects/
    tasks/
  utils/
  app.ts
  server.ts
tests/
```

Los módulos separan rutas, controladores, servicios y schemas. `app.ts` configura Express y `server.ts` inicia el servidor y gestiona su apagado.

## Estado

La API puede ejecutarse localmente y cuenta con scripts de build, pruebas y migraciones.

El despliegue público está pendiente. La configuración del proxy y del entorno de producción se ajustará al hosting elegido.