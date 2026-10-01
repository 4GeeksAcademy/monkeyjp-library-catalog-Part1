# Engineering findings and rules

## Frontend

- **Hallazgo:** Si falla `createBook`, el servicio lanza un error, pero `BookForm` no lo captura ni muestra un estado de envío. **Regla:** Capturar e informar errores y evitar envíos duplicados. Justificación: [frontend/src/services/books.ts](frontend/src/services/books.ts), [frontend/src/components/BookForm.tsx](frontend/src/components/BookForm.tsx).
- **Patrón:** `App` posee el estado del catálogo y el formulario comunica altas mediante `onCreated`. **Regla:** Mantener el estado compartido en `App` y comunicar cambios del formulario mediante su callback, o actualizar ambos lados al cambiar el patrón. Justificación: [frontend/src/App.tsx](frontend/src/App.tsx), [frontend/src/components/BookForm.tsx](frontend/src/components/BookForm.tsx).
- **Patrón:** Las llamadas HTTP están centralizadas en un servicio. **Regla:** Mantener `fetch` y el manejo de respuestas en `frontend/src/services/books.ts`, sin duplicarlos en componentes. Justificación: [frontend/src/services/books.ts](frontend/src/services/books.ts).

## Backend

- **Hallazgo:** El servicio modifica la colección `BOOKS` y calcula IDs a partir del valor máximo actual; no demuestra persistencia duradera ni manejo de concurrencia. **Regla:** No asumir que los datos sobreviven al reinicio; si se requiere persistencia o concurrencia, sustituir ese mecanismo manteniendo el acceso a datos detrás del servicio. Justificación: [backend/app/services/book_service.py](backend/app/services/book_service.py).
- **Patrón:** Las rutas delegan al servicio y declaran modelos de respuesta; la creación responde con `201` y la consulta por ID usa `404` cuando no existe. **Regla:** Mantener las rutas enfocadas en HTTP, validar con los modelos Pydantic y conservar los contratos y códigos de respuesta. Justificación: [backend/app/routes/books.py](backend/app/routes/books.py), [backend/app/models/book.py](backend/app/models/book.py).

## Integración

- **Hallazgo:** El frontend solicita `/api/books`; Vite lo reenvía a `host.docker.internal:8000`, nombre que Docker Compose habilita para el contenedor. **Regla:** Al cambiar rutas, puertos o proxy, actualizar y comprobar conjuntamente el servicio frontend, Vite y Docker Compose. Justificación: [frontend/src/services/books.ts](frontend/src/services/books.ts), [frontend/vite.config.ts](frontend/vite.config.ts), [docker-compose.yml](docker-compose.yml).