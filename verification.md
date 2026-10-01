# Verificaciones del proyecto

| Afirmación original | Archivos revisados | Resultado | Corrección si fue necesaria |
|---|---|---|---|
| Al abrir la aplicación, se solicita y muestra la lista de libros. | `frontend/src/App.tsx`, `frontend/src/services/books.ts` | Parcial | Al montar, llama a `getBooks()` (`GET /api/books`); muestra tarjetas solo si hay resultados. Si no, muestra estado vacío o error. |
| La búsqueda filtra libros por título o autor. | `frontend/src/App.tsx` | Confirmada | No necesaria. |
| El formulario crea libros con título, autor, año y disponibilidad inicial `true`. | `frontend/src/components/BookForm.tsx`, `frontend/src/services/books.ts`, `backend/app/routes/books.py` | Confirmada | No necesaria. |
| La API permite listar, consultar por ID y crear libros, sin rutas de edición o eliminación. | `backend/app/routes/books.py`, `backend/app/main.py` | Confirmada | No necesaria en el router incluido por la aplicación. |
| Los libros se almacenan en memoria, no en una base de datos. | `backend/app/services/book_service.py` | Parcial | El servicio manipula la colección importada `BOOKS`; no se verificó su definición, así que no se puede confirmar que no haya persistencia externa. |