# Proyecto Web del Tiempo

## Descripción

Este proyecto es una aplicación web para mostrar el clima actual y la predicción del tiempo para una ciudad específica o para la localización actual del usuario. Utiliza la API de OpenWeather para obtener los datos meteorológicos y presentar los resultados.

## Estructura del Proyecto

### Archivos y Directorios Principales

- `index.html`: Contiene la estructura básica de la aplicación.
- `CSS/style.scss`: Hoja de estilos SCSS para la aplicación.
- `JS/main.js`: Contiene la lógica JavaScript para interactuar con la API y manejar eventos del DOM.

## Descripción de Archivos

### `index.html`
Este archivo define la estructura HTML básica de la aplicación:
- Contiene un botón para abrir el sidebar de navegación.
- Incluye un sidebar con opciones para navegar entre las funcionalidades principales.
- Contiene un área principal para mostrar el contenido, como el formulario de búsqueda y los resultados del clima.

### `CSS/style.scss`
Archivo de estilos SCSS que define el aspecto visual de la aplicación:
- **Clases Principales**:
  - `.bg-image`: Aplica una imagen de fondo a toda la página.
  - `#barraLateral`: Define el sidebar oculto inicialmente y que se despliega con una transición.
  - `#contenido-principal`: Área principal que contiene el formulario y los resultados del clima.
  - `.card`: Estilo para las tarjetas que muestran los datos del clima, incluyendo un fondo azul muy claro.

#### Mixins
- **`sidebar-hover-effect`**: Para cambiar las características del navbar al estar sobre ellas.
- **`card-style`**: Para estilizar las tarjetas del clima.

### `JS/main.js`
Este archivo contiene la lógica JavaScript de la aplicación:
- Maneja la apertura y cierre del sidebar.
- Define eventos para mostrar formularios y obtener datos de la API de OpenWeather.
- Utiliza la API de geolocalización del navegador para obtener el clima de la localización actual del usuario.

#### Funciones Principales
- **Obtener Clima Actual y Predicción**: Utiliza AJAX para realizar solicitudes a la API de OpenWeather y mostrar los resultados en formato de tarjeta.
- **Navegación en la barra lateral**
- **Interacción con el Usuario**: Limpia y actualiza el contenido mostrado en la página basado en las interacciones del usuario.

## Enlace GitHub Pages
- https://younessmouhcine.github.io/PROYECTO-WEATHER-YOUNESS/
