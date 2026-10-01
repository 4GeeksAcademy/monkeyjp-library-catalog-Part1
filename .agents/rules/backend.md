# Reglas de backend

## Objetivo

Preservar el contrato HTTP del catálogo y mantener separadas las rutas, la validación y la lógica de libros.

## Justificación

[books.py](../../backend/app/routes/books.py) declara las rutas y delega el trabajo a [book_service.py](../../backend/app/services/book_service.py). Los modelos de entrada y salida están definidos en [book.py](../../backend/app/models/book.py), y [main.py](../../backend/app/main.py) monta el router bajo `/api`.

## Reglas

- Mantén las rutas enfocadas en HTTP y delega el acceso y la mutación de libros a `app/services/book_service.py`.
- Usa `BookCreate` para validar entradas y `Book` como `response_model`; conserva `201` al crear y `404` cuando no existe el ID solicitado.
- Mantén el contrato actual: `title` y `author` requieren longitud mínima 1, `year` es entero y `available` es booleano con valor predeterminado `true`.
- No asumas que la colección importada `BOOKS` proporciona persistencia duradera. El servicio calcula IDs como el máximo actual más uno; si cambias almacenamiento o concurrencia, revisa también cómo se asignan IDs.

## Ejemplos

### Correcto

Declarar el contrato HTTP en la ruta y delegar la creación al servicio, como en `create_book`:

```py
@router.post("", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate):
    return add_book(payload)
```

### Incorrecto

Crear y almacenar el libro directamente en la ruta, con un ID fijo y sin el contrato de respuesta:

```py
@router.post("")
def create_book(payload: BookCreate):
    book = {"id": 1, **payload.model_dump()}
    BOOKS.append(book)
    return book
```

Este patrón duplica la lógica del servicio, puede repetir IDs y omite `response_model` y el estado `201` explícitos.