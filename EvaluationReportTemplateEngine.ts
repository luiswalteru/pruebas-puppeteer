import {
  Course,
  EvaluationReportRequest,
  Period,
  SubPeriod,
  Signature,
  Student,
  Category,
} from "./EvaluationReportRequest";

import * as fs from "node:fs/promises";

export interface TemplateData {
  [key: string]: unknown;
}

export interface TemplateConfig {
  templatePath: string;
  cssPath?: string;
}

// Tipo union que puede ser Period o SubPeriod
export type PeriodOrSubPeriod = Period | SubPeriod;

export class EvaluationReportTemplateEngine {
  private templateCache = new Map<string, string>();
  private cssCache = new Map<string, string>();

  constructor() {}

  async generateHtml(
    templateData: EvaluationReportRequest,
    config: TemplateConfig,
    student: Student
  ): Promise<string> {
    try {
      const templateHtml = await this.loadTemplate(config.templatePath);
      const cssContent = config.cssPath
        ? await this.loadCss(config.cssPath)
        : "";
      let html = await this.processHeader(
        templateData,
        templateHtml,
        cssContent,
        student
      );

      html = await this.processFooter(templateData, html);

      const showAveragesByClass = !!templateData?.advanced?.show_averages.find(
        (average) => average.value === "AVERAGES_BY_CLASS"
      );
      const showFinalAverages = !!templateData?.advanced?.show_averages.find(
        (average) => average.value === "FINAL_AVERAGES"
      );
      const showAveragesBySubject =
        !!templateData?.advanced?.show_averages.find(
          (average) => average.value === "AVERAGES_BY_SUBJECT"
        );
      const showCategoryEvaluation =
        !!templateData?.advanced?.show_category_evaluation || false;
      const maxNumberOfRows = Number.parseInt(
        templateData?.configuration?.max_number_of_rows?.toString() || "10"
      );

      let replaceContainerClass = "";
      if (templateData.configuration.type === "standard" && student?.courses) {
        const groupAverageAverage = templateData?.groupAverage?.average || "-";
        const groupAverage = showAveragesByClass
          ? "Promedio de la clase: " + groupAverageAverage
          : "";
        replaceContainerClass = `<div class='report-draft-page-table-classinfo'> <div>Clase ${
          templateData?.configuration?.school_group?.name || "-"
        }</div> <div>${groupAverage}</div> </div>`;
      }
      html = html.replace("{{CLASS_CONTAINER}}", replaceContainerClass);

      // Content Table
      let table = ``;
      if (
        templateData?.configuration?.type === "standard" ||
        templateData?.configuration?.type === "compact"
      ) {
        table = this.ReplacementsStandar(
          student,
          showFinalAverages,
          showAveragesBySubject,
          showCategoryEvaluation,
          maxNumberOfRows
        );
      }

      html = html.replace("{{TABLE}}", table);

      return html;
    } catch (error) {
      throw new Error(
        `Failed to generate HTML from template: ${templateData}. Error: ${error}`
      );
    }
  }

  private async processHeader(
    templateData: EvaluationReportRequest,
    templateHtml: string,
    cssContent: string,
    student: Student
  ) {
    templateHtml = templateHtml.replace("{{STYLES}}", cssContent);
    templateHtml = templateHtml.replace(
      "{{REPORT_NAME}}",
      templateData?.configuration?.name || "report"
    );

    const logo =
      templateData?.school?.information_school?.school_logo?.[0]?.url || "";

    templateHtml = templateHtml.replace("{{SCHOOL_LOGO_URL}}", logo);

    const schoolName =
      templateData?.school?.information_school?.school_name || "";
    templateHtml = templateHtml.replace("{{SCHOOL_NAME}}", schoolName);

    const studentName = `${student?.name || ""} ${student?.lastname || ""}`;
    templateHtml = templateHtml.replace("{{STUDENT_NAME}}", studentName);

    const educationYearLevel =
      templateData?.configuration?.education_year_level || "";
    templateHtml = templateHtml.replace(
      "{{EDUCATION_YEAR_LEVEL}}",
      educationYearLevel
    );

    const educationYearYear =
      templateData?.configuration?.education_year_year || "";
    templateHtml = templateHtml.replace(
      "{{EDUCATION_YEAR_YEAR}}",
      educationYearYear
    );

    const datePeriod = templateData?.configuration?.report_date_period || "";
    templateHtml = templateHtml.replace("{{DATE_PERIOD}}", datePeriod);

    const dateReport = templateData?.configuration?.report_date || "";
    templateHtml = templateHtml.replace("{{DATE_REPORT}}", dateReport);

    const fontSize = templateData?.configuration?.font_size || "";
    templateHtml = templateHtml.replace("{{FONT_SIZE}}", fontSize);

    const className = templateData?.configuration?.school_group?.name || "";
    templateHtml = templateHtml.replace("{{CLASS_NAME}}", className);

    return templateHtml;
  }

  private async addSignatureLine(signature: Signature) {
    if (signature?.signature_images || signature?.name || signature?.title) {
      return `<div class="report-draft-page-signatures-border"></div>`;
    }
    return "";
  }

  private async addSignatureImage(signature: Signature) {
    if (signature?.signature_images) {
      return `<img src="${signature?.signature_images[0]?.url}" />`;
    }
    return "";
  }

  private async processFooter(
    templateData: EvaluationReportRequest,
    templateHtml: string
  ) {
    const signatureLeft = `<div class="report-draft-page-signatures-left"> ${await this.addSignatureImage(
      templateData?.school?.signatures?.signature_left
    )} ${await this.addSignatureLine(
      templateData?.school?.signatures?.signature_left
    )} </div>`;
    const signatureRight = `<div class="report-draft-page-signatures-right"> ${await this.addSignatureImage(
      templateData?.school?.signatures?.signature_right
    )} ${await this.addSignatureLine(
      templateData?.school?.signatures?.signature_right
    )} </div>`;

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_LEFT}}",
      this.haveSignature(templateData?.school?.signatures?.signature_left)
        ? signatureLeft
        : ""
    );

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_RIGHT}}",
      this.haveSignature(templateData?.school?.signatures?.signature_right)
        ? signatureRight
        : ""
    );

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_LEFT_TITLE}}",
      templateData?.school?.signatures?.signature_left?.title || ""
    );

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_RIGHT_TITLE}}",
      templateData?.school?.signatures?.signature_right?.title || ""
    );

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_LEFT_NAME}}",
      templateData?.school?.signatures?.signature_left?.name || ""
    );

    templateHtml = templateHtml.replace(
      "{{SIGNATURE_RIGHT_NAME}}",
      templateData?.school?.signatures?.signature_right?.name || ""
    );

    templateHtml = templateHtml.replace(
      "{{SCHOOL_ADDRESS}}",
      templateData?.school?.information_contact?.school_adress || ""
    );

    templateHtml = templateHtml.replace(
      "{{SCHOOL_EMAIL}}",
      templateData?.school?.information_contact?.school_email || ""
    );

    templateHtml = templateHtml.replace(
      "{{SCHOOL_PHONE}}",
      templateData?.school?.information_contact?.school_phone || ""
    );

    templateHtml = templateHtml.replace(
      "{{CERTIFICATIONS_IMAGES}}",
      templateData?.school?.certifications
        ? templateData?.school?.certifications
            .map((certification) => `<img src="${certification?.url}" />`)
            .join("")
        : ""
    );

    return templateHtml;
  }

  private ReplacementsStandar(
    student: Student,
    showFinalAverages: boolean,
    showAveragesBySubject: boolean,
    showCategoryEvaluation: boolean,
    maxNumberOfRows: number
  ) {
    if (!student?.courses || student?.courses?.length === 0) {
      return "<div class='report-draft-page-table-empty'>Aún no hay datos que mostrar</div>";
    }

    const periods = this.getUniquePeriods(student?.courses || []);

    // Dividir períodos en chunks según el límite de columnas
    const periodChunks = this.dividePeriodIntoChunks(
      periods,
      showAveragesBySubject,
      maxNumberOfRows
    );

    // Generar una tabla por cada chunk de períodos
    const tables = periodChunks
      .map((periodChunk) => {
        const tableHeader = this.generateTableHeader(
          periodChunk,
          showAveragesBySubject,
          student?.courses || []
        );
        const tableBody = this.generateTableBody(
          student?.courses || [],
          periodChunk,
          showAveragesBySubject,
          showCategoryEvaluation
        );

        return `
                <div class="report-draft-page-table-wrapper">
                    <table class="report-draft-page-table-main">
                    ${tableHeader}
                    ${tableBody}
                    </table>
                </div>`;
      })
      .join("");

    const finalAverageSection = this.generateFinalAverageSection(
      student,
      showFinalAverages
    );

    return `
                ${tables}
                ${finalAverageSection}
            `;
  }

  private generateFinalAverageSection(
    student: Student,
    showFinalAverages: boolean
  ) {
    const average = student?.groupAverage?.average || "-";
    return showFinalAverages
      ? '<div class="report-draft-page-table-classinfo"><div></div><div>Promedio total: ' +
          average +
          "</div></div>"
      : "";
  }

  private generateCourseRow(
    course: Course,
    periods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean,
    showCategoryEvaluation: boolean,
    courses: Course[]
  ) {
    const periodType = this.detectPeriodType(courses);

    if (periodType === "subperiods") {
      return this.generateSubperiodsCourseRow(
        course,
        periods,
        showAveragesBySubject,
        showCategoryEvaluation
      );
    } else {
      // Lógica para periods normales
      const periodCells = (periods || [])
        .map((period) => {
          if (this.isPeriod(period)) {
            const courseGrade =
              course.periods?.find((p) => p.period === period.period)
                ?.average || "-";
            return `<td class="subject-period-cell">${courseGrade}</td>`;
          }
          return `<td class="subject-period-cell">-</td>`; // fallback
        })
        .join("");

      const averageCell = showAveragesBySubject
        ? `<td class="grade-cell">${course.average?.average || "-"}</td>`
        : "";

      // Fila principal del curso
      const mainRow = `
            <tr class="subject-row">
                <td class="subject-name">${course.name}</td>
                ${periodCells}
                ${averageCell}
            </tr>`;

      // Generar filas adicionales para las categorías
      let categoryRows = "";

      if (
        course.periods &&
        course.periods.length > 0 &&
        showCategoryEvaluation
      ) {
        // Recopilar todas las categorías únicas usando ID como identificador único
        const allCategoriesMap = new Map();

        course.periods.forEach((coursePeriod) => {
          if (
            coursePeriod.categories &&
            Array.isArray(coursePeriod.categories)
          ) {
            coursePeriod.categories.forEach((category) => {
              if (category.name && category.id) {
                // Usar ID como clave única, pero almacenar tanto nombre como ID
                allCategoriesMap.set(category.id, {
                  id: category.id,
                  name: category.name,
                });
              }
            });
          }
        });

        // Generar una fila por cada categoría única
        allCategoriesMap.forEach((categoryInfo) => {
          const categoryPeriodCells = (periods || [])
            .map((period) => {
              if (this.isPeriod(period)) {
                const coursePeriod = course.periods?.find(
                  (p) => p.period === period.period
                );
                const categoryGrade =
                  coursePeriod?.categories?.find(
                    (cat) => cat.id === categoryInfo.id
                  )?.average || "-";
                return `<td class="subject-period-cell">${categoryGrade}</td>`;
              }
              return `<td class="subject-period-cell">-</td>`; // fallback
            })
            .join("");

          const categoryAverageCell = showAveragesBySubject
            ? `<td class="grade-cell">-</td>`
            : "";

          categoryRows += `
                <tr class="subject-row category-row">
                    <td class="subject-name category-name">\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${categoryInfo.name}</td>
                    ${categoryPeriodCells}
                    ${categoryAverageCell}
                </tr>`;
        });
      }

      return mainRow + categoryRows;
    }
  }

  private generateSubperiodsCourseRow(
    course: Course,
    subperiods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean,
    showCategoryEvaluation: boolean
  ) {
    const subperiodCells = (subperiods || [])
      .map((subperiod) => {
        if (this.isSubPeriod(subperiod)) {
          // Es un SubPeriod, buscar coincidencia exacta
          const courseSubperiod = course.subperiods?.find(
            (sp) =>
              sp?.period === subperiod.period &&
              sp?.subperiod === subperiod.subperiod
          );
          const grade = courseSubperiod?.average || "-";
          return `<td class="subject-period-cell">${grade}</td>`;
        } else {
          // Es un Period, buscar por período solamente (esto no debería pasar en subperiods)
          const courseSubperiod = course.subperiods?.find(
            (sp) => sp?.period === subperiod.period
          );
          const grade = courseSubperiod?.average || "-";
          return `<td class="subject-period-cell">${grade}</td>`;
        }
      })
      .join("");

    const averageCell = showAveragesBySubject
      ? `<td class="grade-cell">${course.average?.average || "-"}</td>`
      : "";

    // Fila principal del curso
    const mainRow = `
          <tr class="subject-row">
            <td class="subject-name">${course.name}</td>
            ${subperiodCells}
            ${averageCell}
          </tr>`;

    // Generar filas adicionales para las categorías
    let categoryRows = "";

    if (
      course?.subperiods &&
      course?.subperiods?.length > 0 &&
      showCategoryEvaluation
    ) {
      // Recopilar todas las categorías únicas usando ID como identificador único
      const allCategoriesMap = new Map();

      course?.subperiods?.forEach((courseSubperiod: Period) => {
        if (
          courseSubperiod?.categories &&
          Array.isArray(courseSubperiod?.categories)
        ) {
          courseSubperiod?.categories?.forEach((category: Category) => {
            if (category.name && category.id) {
              // Usar ID como clave única, pero almacenar tanto nombre como ID
              allCategoriesMap.set(category.id, {
                id: category.id,
                name: category.name,
              });
            }
          });
        }
      });

      // Generar una fila por cada categoría única
      allCategoriesMap.forEach((categoryInfo) => {
        const categorySubperiodCells = (subperiods || [])
          .map((subperiod) => {
            if (this.isSubPeriod(subperiod)) {
              const courseSubperiod = course?.subperiods?.find(
                (sp) =>
                  sp?.period === subperiod.period &&
                  sp?.subperiod === subperiod.subperiod
              );
              const categoryGrade =
                courseSubperiod?.categories?.find(
                  (cat: Category) => cat?.id === categoryInfo?.id
                )?.average || "-";
              return `<td class="subject-period-cell">${categoryGrade}</td>`;
            } else {
              // Es un Period (no debería pasar en subperiods)
              const courseSubperiod = course?.subperiods?.find(
                (sp) => sp?.period === subperiod.period
              );
              const categoryGrade =
                courseSubperiod?.categories?.find(
                  (cat: Category) => cat?.id === categoryInfo?.id
                )?.average || "-";
              return `<td class="subject-period-cell">${categoryGrade}</td>`;
            }
          })
          .join("");

        const categoryAverageCell = showAveragesBySubject
          ? `<td class="grade-cell">-</td>`
          : "";

        categoryRows += `
              <tr class="subject-row category-row">
                <td class="subject-name category-name">\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${categoryInfo.name}</td>
                ${categorySubperiodCells}
                ${categoryAverageCell}
              </tr>`;
      });
    }

    return mainRow + categoryRows;
  }

  private generateTableBody(
    courses: Course[],
    periods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean,
    showCategoryEvaluation: boolean
  ) {
    const courseRows = (courses || [])
      .map((course) =>
        this.generateCourseRow(
          course,
          periods,
          showAveragesBySubject,
          showCategoryEvaluation,
          courses
        )
      )
      .join("");

    return `
              <tbody>
                ${courseRows}
              </tbody>`;
  }

  private generateTableHeader(
    periods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean,
    courses: Course[]
  ) {
    if (!periods || periods.length === 0) {
      const averageHeader = showAveragesBySubject ? `<th>Promedio</th>` : "";
      return `
              <thead>
                <tr>
                  <th>Materia</th>
                  ${averageHeader}
                </tr>
              </thead>`;
    }

    const periodType = this.detectPeriodType(courses);

    if (periodType === "subperiods") {
      return this.generateSubperiodsTableHeader(periods, showAveragesBySubject);
    } else {
      // Lógica para periods normales
      const periodHeaders = (periods || [])
        .map((period) => `<th>${period.name}</th>`)
        .join("");

      const averageHeader = showAveragesBySubject ? `<th>Promedio</th>` : "";

      return `
              <thead>
                <tr>
                  <th>Materia</th>
                  ${periodHeaders}
                  ${averageHeader}
                </tr>
              </thead>`;
    }
  }

  private dividePeriodIntoChunks(
    periods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean,
    maxNumberOfRows: number
  ) {
    if (!maxNumberOfRows || !periods?.length) {
      return [periods || []];
    }

    // Calcular cuántas columnas de períodos podemos mostrar por tabla
    let availableColumns = maxNumberOfRows;
    availableColumns -= 1; // Columna "Materia"
    if (showAveragesBySubject) {
      availableColumns -= 1; // Columna "Promedio"
    }

    // Si no hay espacio para períodos, mostrar al menos uno
    if (availableColumns < 1) {
      availableColumns = 1;
    }

    const chunks = [];

    // Lógica simplificada: cada período o subperiod ocupa 1 columna
    const periodsPerTable = Math.max(1, availableColumns);

    for (let i = 0; i < periods.length; i += periodsPerTable) {
      chunks.push(periods.slice(i, i + periodsPerTable));
    }

    return chunks.length > 0 ? chunks : [periods || []];
  }

  private getUniquePeriods(courses: Course[]): PeriodOrSubPeriod[] {
    if (!courses?.length) return [];

    const periodType = this.detectPeriodType(courses);

    if (periodType === "periods") {
      const allPeriods = courses.flatMap(
        (course) =>
          course?.periods?.map((period) => ({
            id: period.id,
            name: period.name,
            period: period.period,
            average: period.average,
            averageCalculated: period.averageCalculated,
            categories: period.categories,
          })) || []
      );

      // Eliminar duplicados basándose en el atributo "period"
      return allPeriods.filter(
        (period, index, array) =>
          index === array.findIndex((p) => p.period === period.period)
      );
    } else if (periodType === "subperiods") {
      // Para subperiods, devolver los subperiods únicos directamente
      const allSubPeriods = courses.flatMap(
        (course) =>
          course?.subperiods?.map((subperiod) => ({
            id: subperiod.id,
            name: subperiod.name,
            period: subperiod.period,
            subperiod: subperiod.subperiod,
            start_date: subperiod.start_date,
            end_date: subperiod.end_date,
            average: subperiod.average,
            averageCalculated: subperiod.averageCalculated,
            categories: subperiod.categories,
          })) || []
      );

      // Eliminar duplicados basándose en el atributo "period" y "subperiod"
      return allSubPeriods.filter(
        (subperiod, index, array) =>
          index ===
          array.findIndex(
            (sp) =>
              sp.period === subperiod.period &&
              sp.subperiod === subperiod.subperiod
          )
      );
    }

    return [];
  }

  private haveSignature(signature: Signature) {
    let have = true;

    if (
      signature?.signature_images &&
      !signature?.signature_images[0]?.url &&
      !signature?.name &&
      !signature?.title
    ) {
      have = false;
    }

    return have;
  }

  private detectPeriodType(courses: Course[]) {
    if (!courses || courses.length === 0) return "none";

    for (const course of courses) {
      if (course.periods && course.periods.length > 0) return "periods";
      if (course.subperiods && course.subperiods.length > 0)
        return "subperiods";
    }
    return "none";
  }

  // Type guard para determinar si es un SubPeriod
  private isSubPeriod(period: PeriodOrSubPeriod): period is SubPeriod {
    return "subperiod" in period;
  }

  // Type guard para determinar si es un Period
  private isPeriod(period: PeriodOrSubPeriod): period is Period {
    return !("subperiod" in period);
  }

  private generateSubperiodsTableHeader(
    subperiods: PeriodOrSubPeriod[],
    showAveragesBySubject: boolean
  ) {
    // Para subperiods, creamos una tabla con dos filas de headers
    // Primera fila: períodos agrupados
    // Segunda fila: subperiods individuales

    // Agrupar subperiods por periodo para el header
    const periodGroups: Record<
      string,
      { name: string; subperiods: SubPeriod[] }
    > = {};

    subperiods.forEach((item) => {
      if (this.isSubPeriod(item)) {
        if (!periodGroups[item.period]) {
          periodGroups[item.period] = {
            name: item?.period || "", // Tomar solo la primera parte del nombre
            subperiods: [],
          };
        }
        const group = periodGroups[item.period];
        if (group) {
          group.subperiods.push(item);
        }
      }
    });

    let firstRow = '<tr><th rowspan="2">Materia</th>';
    let secondRow = "<tr>";

    Object.values(periodGroups).forEach((group) => {
      const subperiodsCount = group.subperiods.length;

      // Celda del período principal
      firstRow += `<th colspan="${subperiodsCount}">${group.name}</th>`;

      // Celdas de subperiods
      group.subperiods.forEach((subperiod) => {
        secondRow += `<th>${subperiod.subperiod}</th>`;
      });
    });

    if (showAveragesBySubject) {
      firstRow += '<th rowspan="2">Promedio</th>';
    }

    firstRow += "</tr>";
    secondRow += "</tr>";

    return `
          <thead>
            ${firstRow}
            ${secondRow}
          </thead>`;
  }

  private async loadTemplate(templatePath: string): Promise<string> {
    // Verificar cache
    if (this.templateCache.has(templatePath)) {
      return this.templateCache.get(templatePath)!;
    }

    try {
      const templateContent = await fs.readFile(templatePath, "utf8");

      // Cachear template
      this.templateCache.set(templatePath, templateContent);

      return templateContent;
    } catch (error) {
      throw new Error(
        `Failed to load template: ${templatePath}. Error: ${error}`
      );
    }
  }

  private async loadCss(cssPath: string): Promise<string> {
    // Verificar cache
    if (this.cssCache.has(cssPath)) {
      return this.cssCache.get(cssPath)!;
    }

    try {
      const cssContent = await fs.readFile(cssPath, "utf8");

      // Cachear CSS
      this.cssCache.set(cssPath, cssContent);

      return cssContent;
    } catch (error) {
      throw new Error(`Failed to load CSS: ${cssPath}. Error: ${error}`);
    }
  }
}
