# Generador de PDF con Puppeteer

Una aplicación Node.js simple que utiliza Puppeteer para generar archivos PDF a partir de templates HTML y estilos CSS.

## Características

- 🚀 Generación rápida de PDFs
- 🎨 Templates HTML personalizables
- 💄 Estilos CSS modernos
- 📱 Diseño responsive
- 🔧 Fácil configuración

## Estructura del Proyecto

```
puppeteer/
├── package.json          # Configuración y dependencias
├── index.js             # Archivo principal
├── template.html        # Template HTML del documento
├── styles.css          # Estilos CSS del documento
└── README.md           # Este archivo
```

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Uso

1. Ejecutar la aplicación:
```bash
npm start
```

O directamente:
```bash
node index.js
```

2. El PDF se generará automáticamente como `documento.pdf` en el directorio actual.

## Personalización

### Modificar el Template HTML
Edita el archivo `template.html` para cambiar la estructura del documento.

### Cambiar los Estilos
Modifica el archivo `styles.css` para personalizar la apariencia del PDF.

### Configurar el PDF
En `index.js` puedes ajustar:
- Formato del papel (A4, Letter, etc.)
- Márgenes
- Orientación
- Otras opciones de Puppeteer

## Dependencias

- **puppeteer**: ^21.3.8 - Para generar PDFs desde HTML

## Requisitos del Sistema

- Node.js >= 14.0.0
- Sistema operativo compatible con Puppeteer (Windows, macOS, Linux)

## Notas

- El primer ejecutado puede tardar más tiempo ya que Puppeteer descarga Chromium
- Los estilos están optimizados para impresión PDF
- El template incluye JavaScript para mostrar la fecha actual
