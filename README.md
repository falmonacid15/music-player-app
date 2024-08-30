# Music Player App

Aplicacion web responsive capaz de reproducir canciones, puedes buscarlas por sus nombres, artistas o album, ademas puedes crearte una cuenta y acceder a la posibilidad de guardar favoritas y crear listas de reproduccion.

![Logo](https://res.cloudinary.com/dlw31usvu/image/upload/v1725011769/music-app/hatdg24v9hgtoqoyjcma.png)

## Variables de entorno

Para ejecutar exitosamente esta aplicacion deberas crear el archivo .env y llegar las siguientes variables:

`DATABASE_URL`

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

## Instalación y ejecución

Instalar dependencias

```bash
  npm install
```

Crear base de datos y migrar

```bash
  npx prisma migrate dev
```

Ejecutar

```bash
  npm run dev
```

## Deployment

To deploy this project run

```bash
  npm run build
```

## Stack tecnologico

**Client:** NextJS, Zustand, TailwindCSS, NextUI

**Server:** Node, Express, NextJS Server.
