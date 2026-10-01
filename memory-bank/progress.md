# Progreso del proyecto

## Funciona

Hechos verificados en el código:

- La aplicación frontend carga el catálogo mediante `GET /api/books` y muestra los libros como tarjetas.
- La búsqueda del catálogo filtra por título o autor.
- El formulario envía libros con título, autor, año y disponibilidad inicial `true`.
- El frontend permite consultar un libro por ID mediante `getBookById` y la interfaz `BookLookup` muestra estados de carga, no encontrado y error.
- El backend define `GET /api/books`, `GET /api/books/{book_id}` y `POST /api/books`.
- La consulta de un ID inexistente responde `404` y la creación responde `201`.
- Las rutas backend delegan la lógica en `book_service` y usan modelos Pydantic para las respuestas.
- Docker Compose define los servicios frontend y backend, publicados en los puertos `5173` y `8000`.
- Vite configura el reenvío de `/api` hacia el backend mediante `host.docker.internal:8000`.
- El backend define `GET /api/health` y permite CORS desde `http://localhost:5173`.

Estos puntos están confirmados por inspección del código. No equivalen a una prueba completa de la aplicación ejecutándose.

## Limitaciones actuales

Hechos comprobables:

- `npm run build` no terminó: TypeScript informó `TS2882` por la importación lateral de `./styles.css` desde `frontend/src/main.tsx`.
- `npm run lint` no pudo arrancar porque el ejecutable `eslint` no estaba disponible tras instalar las dependencias fijadas por el lockfile.
- No se verificó mediante ejecución el flujo completo de Compose, la respuesta real de `/api/health` ni la carga de `http://localhost:5173`.
- No se verificó mediante una prueba end-to-end la consulta de un ID existente, de un ID inexistente, la búsqueda por título o autor ni el alta desde la interfaz.
- No se verificó un comando de pruebas automatizadas para el backend.
- El servicio de libros modifica la colección importada `BOOKS` y calcula el siguiente ID a partir del máximo actual; no se verificó la definición de esa colección ni si existe persistencia externa.
- Las rutas backend revisadas no implementan edición ni eliminación.
- `BookForm` no captura ni muestra errores del servicio `createBook` y no tiene un estado de envío documentado para impedir envíos duplicados.

## Próximos pasos sugeridos

Sugerencias derivadas de las limitaciones anteriores:

- Resolver la declaración del import CSS que provoca `TS2882` y volver a ejecutar `npm run build` desde `frontend/`.
- Asegurar que ESLint esté disponible para el proyecto y volver a ejecutar `npm run lint`.
- Levantar los servicios con `docker compose up --build` y comprobar `/api/health` y la aplicación web en sus puertos documentados.
- Probar desde la interfaz un ID existente y otro inexistente, además de conservar las comprobaciones de búsqueda y creación.
- Añadir pruebas backend si el proyecto adopta un framework y comando de pruebas; actualmente no hay uno verificado.
- Definir y documentar la estrategia de persistencia y concurrencia si los libros deben sobrevivir a reinicios o recibir altas simultáneas.
- Si el producto lo requiere, diseñar e implementar rutas y UI para edición o eliminación manteniendo alineados el frontend, los modelos, las rutas y el servicio backend.
- Mejorar `BookForm` para capturar errores de creación y bloquear envíos duplicados.