# Reglas de frontend

## Objetivo

Mantener coherentes la interfaz del catálogo, su estado y las llamadas a la API.

## Justificación

La interfaz carga y filtra libros en [App.tsx](../../frontend/src/App.tsx), mientras que las peticiones HTTP están centralizadas en [books.ts](../../frontend/src/services/books.ts). El formulario envía altas por `createBook` y notifica a `App` con `onCreated` en [BookForm.tsx](../../frontend/src/components/BookForm.tsx). El tipo usado por la UI está en [book.ts](../../frontend/src/types/book.ts).

## Reglas

- Centraliza `fetch` y el manejo de respuestas en `src/services/books.ts`; no dupliques peticiones HTTP en componentes.
- Comprueba `response.ok` antes de consumir el JSON y conserva las rutas relativas `/api/...`, que dependen del proxy de Vite.
- Prioriza las clases de Tailwind CSS para los estilos de la interfaz. Añade o modifica CSS propio solo cuando el requisito no pueda resolverse razonablemente con Tailwind.
- Mantén la colección en `App` y comunica altas del formulario mediante `onCreated`; conserva alineados los campos del tipo `Book` con el modelo backend.
- El servicio `createBook` puede lanzar un error en respuestas no exitosas. Al modificar el formulario, captura y presenta el error y evita tratar un alta fallida como exitosa.

## Ejemplos

### Correcto

Usar el servicio centralizado y comprobar la respuesta, como en `getBooks`:

```ts
const response = await fetch("/api/books");
if (!response.ok) {
  throw new Error("Could not load books");
}
return response.json();
```

### Incorrecto

Duplicar la petición en el componente y procesar el JSON aunque la respuesta sea un error:

```ts
useEffect(() => {
  fetch("/api/books")
    .then((response) => response.json())
    .then(setBooks);
}, []);
```

Este patrón omite la comprobación de `response.ok` y evita reutilizar `getBooks`.