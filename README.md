# Proyecto de Anuncios

Este proyecto se centra en la gestión de anuncios, permitiendo a los usuarios realizar diversas acciones como crear, ver y buscar anuncios, entre otras funcionalidades.

## Estructura de Carpetas

El proyecto está organizado en varias carpetas principales:

- `src/`
  - `api/`: Contiene archivos relacionados con la gestión de peticiones a la API.
  - `components/`: Contiene los componentes reutilizables en varias partes del proyecto, como Advert, SearchContainer, EmptyAdverts, etc.
  - `context/`: Define contextos utilizados para el manejo de datos globales en la aplicación, como AdvertsContext, TagsContext, y UserContext.
  - `hooks/`: Almacena ganchos personalizados utilizados en diferentes partes de la aplicación, como useCustomNavigation y useAdverts.
  - `interfaces/`: Define las interfaces TypeScript utilizadas para tipar los datos en la aplicación.
  - `pages/`: Contiene las páginas principales de la aplicación organizadas por funcionalidad, como AdvertsPage, AdvertDetail, CreateAdvert, Login, etc.
  - `service/`: Incluye archivos de servicios que manejan la lógica de negocio y las llamadas a la API para las funcionalidades específicas, como getAllAdverts, createAdvert, login, etc.
  - `styles/`: Almacena los estilos CSS o componentes de estilo relacionados con las páginas o componentes.

## Funcionalidades Principales

### Adverts

- **AdvertsPage**: Página que muestra todos los anuncios disponibles.
- **AllAdverts**: Componente que provee la estructura para visualizar todos los anuncios.
- **AdvertDetail**: Página que muestra detalles de un anuncio específico.

### Creación de Anuncios

- **CreateAdvert**: Página que permite crear un nuevo anuncio.

### Autenticación

- **Login**: Página para iniciar sesión.

### Layouts

- **AppLayout**: Diseño principal de la aplicación.
- **AdvertsLayout**: Diseño para las páginas relacionadas con anuncios.

## Enrutamiento y Navegación

Se hace uso de `react-router-dom` para gestionar las rutas y la navegación dentro de la aplicación.
Se implementan rutas públicas y protegidas, como las relacionadas con la autenticación y el acceso a ciertas funcionalidades.

## Ejecución del Proyecto

Para ejecutar este proyecto localmente:

1. Clona el repositorio: `git clone https://github.com/JoseAlbDR/Practica-REACT.git`
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

## Dependencias Principales

- **react**: Librería principal para construir interfaces de usuario.
- **react-router-dom**: Manejo de enrutamiento y navegación.
- **react-toastify**: Mostrar notificaciones de manera amigable en la interfaz.

## Notas Importantes

- Asegúrate de tener las variables de entorno correctamente configuradas para el funcionamiento adecuado de la aplicación.
