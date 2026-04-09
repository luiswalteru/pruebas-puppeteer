const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");
const sass = require("sass"); // Agregar esta línea

const DocumentStart = require("./structure/DocumentStart");
const DocumentEnd = require("./structure/DocumentEnd");
const DocumentHeader = require("./structure/DocumentHeader");
const DocumentSignatures = require("./structure/DocumentSignatures");
const DocumentFooter = require("./structure/DocumentFooter");
const DocumentContent = require("./structure/DocumentContent");

const DocumentTODO = require("./structure/DocumentTODO");

const Replacements = require("./Replacements");
// const DATA_REPORT = require("./Mockup__SIN__SUBPERIODS");
// const DATA_REPORT = require("./Mockup_JSON_API_v3---25-09");
// const DATA_REPORT = require("./Mockup_JSON_API_v3");
// const DATA_REPORT = require("./Mockup_JSON_API_v3_SUBPERIODS");

// const DATA_REPORT = require("./TAN-6247___1");
const DATA_REPORT = require("./mockup/TAN-6247___con_logos");

async function generatePDF() {
  try {
    console.log("Iniciando...");

    // Compilar SCSS a CSS
    // const scssPath = path.join(__dirname, "styles.scss");
    // console.log("Compilando estilos SCSS...");
    // const result = sass.compile(scssPath);
    // const cssStyles = result.css;
    // Guardar el CSS compilado en un archivo
    // const cssOutputPath = path.join(__dirname, "stylesComplete.css");
    // await fs.writeFile(cssOutputPath, cssStyles, "utf8");
    // console.log("Archivo CSS generado exitosamente en:", cssOutputPath);

    console.log("Leyendo archivo CSS...");
    const cssStyles = await fs.readFile(path.join(__dirname, "stylesComplete.css"), "utf8");


    // Orientation de la página
    let landscape = false; // false = vertical, true = horizontal
    let orientation = DATA_REPORT.configuration.orientation;
    if (orientation === "horizontal") {
      landscape = true;
    }

    console.log("Generando páginas para cada estudiante...");

    // Generar una página por cada estudiante
    const students = DATA_REPORT.students;
    console.log(`Generando ${students.length} páginas para estudiantes`);

    let htmlTemplate = "";

    students.forEach((student, index) => {
      console.log(
        `Procesando estudiante ${index + 1}: ${student.name} ${
          student.lastname
        }`
      );

      // Generar página para este estudiante
      let studentPageTemplate = DocumentTODO();
      // `${DocumentStart()}
      //   ${DocumentHeader()}
      //   ${DocumentContent()}
      //   ${DocumentSignatures()}
      //   ${DocumentFooter()}
      // ${DocumentEnd()}`;

      studentPageTemplate = Replacements(
        studentPageTemplate,
        DATA_REPORT,
        cssStyles,
        index,
        student
      );

      htmlTemplate += studentPageTemplate;
    });

    console.log("Iniciando navegador...");
    // Lanzar Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Establecer el contenido HTML
    await page.setContent(htmlTemplate, {
      waitUntil: "networkidle0",
      // waitUntil: "domcontentloaded", // Cambiado de "networkidle0" a "domcontentloaded"
      timeout: 10000, // Aumentar timeout a 60 segundos
    });

    console.log("Generando PDF...");
    // Generar PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: landscape,
      printBackground: true,
      margin: {
        // top: "20px",right: "20px",bottom: "20px",left: "20px",
        top: "15px",
        right: "5px",
        bottom: "5px",
        left: "5px",
      },
    });

    // Guardar el PDF
    // const outputPath = path.join(__dirname, "documento.pdf");
    const outputPath = path.join(__dirname, "documento.pdf");
    await fs.writeFile(outputPath, pdfBuffer);

    // Guardar también el archivo HTML
    const htmlOutputPath = path.join(__dirname, "documento.html");
    await fs.writeFile(htmlOutputPath, htmlTemplate, "utf8");

    await browser.close();

    console.log("PDF generado exitosamente en:", outputPath);
    console.log("Archivo PDF creado: documento.pdf");
    // console.log("HTML generado exitosamente en:", htmlOutputPath);
    // console.log("Archivo HTML creado: documento.html");
  } catch (error) {
    // Re-lanzar el error para que sea manejado por la función de reintentos
    if (error) {
      throw error;
    }
    throw new Error("Error desconocido durante la generación del PDF");
  }
}

// Función que maneja los reintentos
async function generatePDFWithRetry() {
  const maxAttempts = 4; // 1 intento inicial + 3 reintentos

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`Reintento ${attempt - 1} de 3...`);
        // Pequeña pausa antes de reintentar
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      await generatePDF();

      // Si llegamos aquí, la generación fue exitosa
      return;
    } catch (error) {
      console.error(`Error en intento ${attempt}:`, error.message);

      console.error(`Mensaje: ${error.message}`);
      
      // Mostrar stack trace completo
      if (error.stack) {
        console.error(`Stack trace:\n${error.stack}`);
      }
            

      if (attempt < maxAttempts) {
        console.log(`Preparando reintento ${attempt} de 3...`);
      } else {
        // Último intento fallido - mostrar mensaje llamativo
        console.log("PROCESO TERMINADO CON ERROR");

        process.exit(1);
      }
    }
  }
}

// Ejecutar la función con reintentos
// Para PDF vertical (por defecto): generatePDFWithRetry()
// Para PDF horizontal: generatePDFWithRetry(true)
generatePDFWithRetry();
