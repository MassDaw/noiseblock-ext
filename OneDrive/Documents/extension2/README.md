# NoiseBlock

NoiseBlock es una extensión ligera y minimalista para Chrome/Brave que te permite filtrar publicaciones y comentarios con palabras clave personalizadas en redes sociales (Twitter/X, Facebook, Reddit) y en cualquier sitio que añadas manualmente.

## Características
- Oculta automáticamente publicaciones y comentarios que contengan palabras clave definidas por el usuario.
- Permite añadir y eliminar palabras clave fácilmente desde el popup.
- Filtro opcional de publicaciones patrocinadas/sugeridas.
- "Modo sensible": activa un filtro temático de palabras delicadas (spoilers, violencia, política, etc.).
- Soporte multilingüe (ES, EN, FR, DE, IT, PT).
- Interfaz moderna, responsiva y con modo oscuro.
- **Selector de modo de censura**: elige entre censurar solo la palabra, ocultar el párrafo, u ocultar el elemento completo.
- El filtrado es insensible a tildes/acentos y mayúsculas/minúsculas ("basilica" bloqueará "Basílica").
- No recoge ni comparte datos personales. Todo se guarda localmente en tu navegador.

## Instalación
1. Descarga o clona este repositorio.
2. Ve a `chrome://extensions` y activa el "Modo de desarrollador".
3. Haz clic en "Cargar descomprimida" y selecciona la carpeta del proyecto.

## Uso
- Haz clic en el icono de NoiseBlock en la barra de extensiones.
- Añade palabras clave que quieras filtrar.
- Marca "Modo sensible" para activar el filtro temático.
- Añade sitios personalizados si quieres filtrar en otras webs.
- Cambia el idioma, el modo de censura o activa el modo oscuro desde el popup.

## Permisos requeridos
- `activeTab`: para poder filtrar el contenido de la pestaña activa.
- `storage`: para guardar tus palabras clave y configuración localmente.
- `host_permissions`: solo para los sitios que elijas (por defecto Twitter, Facebook, Reddit y los que añadas manualmente).

## Privacidad
Esta extensión **no recoge ni comparte datos personales**. Todo lo que configuras (palabras clave, sitios, opciones) se guarda únicamente en tu navegador, usando `chrome.storage.local`.

## Autor
[coff.ee/freeextensions](https://coff.ee/freeextensions) 