# NoiseBlock (Twitter/X)

NoiseBlock es una extensión ligera y precisa para filtrar y censurar palabras, spoilers y contenido no deseado en Twitter/X.

## Características
- Censura palabras específicas en tweets y comentarios (insensible a tildes y mayúsculas).
- Permite elegir entre censurar solo la palabra, ocultar el tweet completo, o usar un modo sensible para filtrar temas delicados.
- Añade y elimina palabras clave fácilmente desde el popup.
- Filtro opcional de tweets patrocinados/sugeridos.
- Soporte multilingüe (ES, EN, FR, DE, IT, PT).
- Interfaz moderna, responsiva y con modo oscuro.
- No recoge ni comparte datos personales. Todo se guarda localmente en tu navegador.

## Instalación
1. Descarga o clona este repositorio.
2. Ve a `chrome://extensions` y activa el "Modo de desarrollador".
3. Haz clic en "Cargar descomprimida" y selecciona la carpeta del proyecto.

## Uso
- Haz clic en el icono de NoiseBlock en la barra de extensiones mientras navegas Twitter/X.
- Añade palabras clave que quieras filtrar.
- Marca "Modo sensible" para activar el filtro temático.
- Cambia el idioma, el modo de censura o activa el modo oscuro desde el popup.

## Permisos requeridos
- `activeTab`: para poder filtrar el contenido de la pestaña activa.
- `storage`: para guardar tus palabras clave y configuración localmente.
- `host_permissions`: solo para Twitter/X.

## Privacidad
Esta extensión **no recoge ni comparte datos personales**. Todo lo que configuras (palabras clave, opciones) se guarda únicamente en tu navegador, usando `chrome.storage.local`.

## Autor
[coff.ee/freeextensions](https://coff.ee/freeextensions) 