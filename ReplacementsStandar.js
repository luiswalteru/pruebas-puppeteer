/**
 * Detecta si los cursos usan periods o subperiods
 * @param {Array} courses - Array de cursos del estudiante
 * @returns {string} 'periods' | 'subperiods' | 'none'
 */
function detectPeriodType(courses) {
  if (!courses || courses.length === 0) return 'none';
  
  for (const course of courses) {
    if (course.periods && course.periods.length > 0) return 'periods';
    if (course.subperiods && course.subperiods.length > 0) return 'subperiods';
  }
  return 'none';
}

/**
 * Agrupa los subperiods por period y crea la estructura jerárquica
 * @param {Array} courses - Array de cursos del estudiante
 * @returns {Array} Array de períodos agrupados con sus subperiods
 */
function getGroupedSubperiods(courses) {
  const periodGroups = {};
  
  // Recopilar todos los subperiods
  courses.forEach(course => {
    if (course.subperiods) {
      course.subperiods.forEach(subperiod => {
        const periodId = subperiod.period;
        
        if (!periodGroups[periodId]) {
          periodGroups[periodId] = {
            period: subperiod.period,
            name: subperiod.name,
            subperiods: []
          };
        }
        
        // Agregar subperiod si no existe ya
        const existingSubperiod = periodGroups[periodId].subperiods.find(
          sp => sp.subperiod === subperiod.subperiod
        );
        
        if (!existingSubperiod && subperiod.subperiod) {
          periodGroups[periodId].subperiods.push({
            period: subperiod.period,
            name: subperiod.name,
            subperiod: subperiod.subperiod
          });
        }
      });
    }
  });
  
  return Object.values(periodGroups);
}

/**
 * Obtiene los períodos únicos de todos los cursos
 * @param {Array} courses - Array de cursos con períodos o subperiods
 * @returns {Array} Array de períodos únicos
 */
function getUniquePeriods(courses) {
  if (!courses?.length) return [];

  const periodType = detectPeriodType(courses);
  
  if (periodType === 'periods') {
    const allPeriods = courses.flatMap(
      (course) =>
        course?.periods?.map((period) => ({
          name: period.name,
          period: period.period,
          average: period.average,
        })) || []
    );

    // Eliminar duplicados basándose en el atributo "period"
    return allPeriods.filter(
      (period, index, array) =>
        index === array.findIndex((p) => p.period === period.period)
    );
  } else if (periodType === 'subperiods') {
    // Para subperiods, devolver la estructura agrupada
    return getGroupedSubperiods(courses);
  }
  
  return [];
}

/**
 * Genera el encabezado de la tabla
 * @param {Array} periods - Array de períodos (ya pre-calculado según límite)
 * @param {boolean} showAveragesBySubject - Si mostrar columna de promedio
 * @param {Array} courses - Array de cursos para detectar tipo de período
 * @returns {string} HTML del encabezado
 */
function generateTableHeader(periods, showAveragesBySubject, courses) {
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

  const periodType = detectPeriodType(courses);
  
  if (periodType === 'subperiods') {
    return generateSubperiodsTableHeader(periods, showAveragesBySubject);
  } else {
    // Lógica original para periods
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

/**
 * Genera el encabezado de tabla para subperiods con estructura jerárquica
 * @param {Array} periodGroups - Array de grupos de períodos con subperiods
 * @param {boolean} showAveragesBySubject - Si mostrar columna de promedio
 * @returns {string} HTML del encabezado jerárquico
 */
function generateSubperiodsTableHeader(periodGroups, showAveragesBySubject) {
  let firstRow = '<tr><th rowspan="2">Materia</th>';
  let secondRow = '<tr>';
  
  periodGroups.forEach(periodGroup => {
    const subperiodsCount = periodGroup.subperiods.length || 1;
    
    // Celda del período principal
    firstRow += `<th colspan="${subperiodsCount}">${periodGroup.name}</th>`;
    
    // Celdas de subperiods
    if (periodGroup.subperiods.length > 0) {
      periodGroup.subperiods.forEach(subperiod => {
        secondRow += `<th>${subperiod.subperiod}</th>`;
      });
    } else {
      // Si no hay subperiods específicos, usar una celda vacía
      secondRow += '<th></th>';
    }
  });
  
  if (showAveragesBySubject) {
    firstRow += '<th rowspan="2">Promedio</th>';
  }
  
  firstRow += '</tr>';
  secondRow += '</tr>';
  
  return `
    <thead>
      ${firstRow}
      ${secondRow}
    </thead>`;
}

/**
 * Genera una fila de materia con sus calificaciones
 * @param {Object} course - Objeto del curso
 * @param {Array} periods - Array de períodos (ya pre-calculado según límite)
 * @param {boolean} showAveragesBySubject - Si mostrar promedio de la materia
 * @param {boolean} showCategoryEvaluation - Si mostrar evaluaciones por categoría
 * @param {Array} courses - Array de cursos para detectar tipo de período
 * @returns {string} HTML de la fila del curso
 */
function generateCourseRow(
  course,
  periods,
  showAveragesBySubject,
  showCategoryEvaluation,
  courses
) {
  const periodType = detectPeriodType(courses);
  
  if (periodType === 'subperiods') {
    return generateSubperiodsCourseRow(course, periods, showAveragesBySubject, showCategoryEvaluation);
  } else {
    // Lógica original para periods
    const periodCells = (periods || [])
      .map((period) => {
        const courseGrade =
          course.periods?.find((p) => p.period === period.period)?.average || "-";
        return `<td class="subject-period-cell">${courseGrade}</td>`;
      })
      .join("");

    const averageCell = showAveragesBySubject
      ? `<td class="grade-cell">${course.average?.average || "-"}</td>`
      : "";

    // Fila principal del curso
    let mainRow = `
      <tr class="subject-row">
        <td class="subject-name">${course.name}</td>
        ${periodCells}
        ${averageCell}
      </tr>`;

    // Generar filas adicionales para las categorías
    let categoryRows = "";

    if (course.periods && course.periods.length > 0 && showCategoryEvaluation) {
      // Recopilar todas las categorías únicas usando ID como identificador único
      const allCategoriesMap = new Map();

      course.periods.forEach((coursePeriod) => {
        if (coursePeriod.categories && Array.isArray(coursePeriod.categories)) {
          coursePeriod.categories.forEach((category) => {
            if (category.name && category.id) {
              // Usar ID como clave única, pero almacenar tanto nombre como ID
              allCategoriesMap.set(category.id, {
                id: category.id,
                name: category.name
              });
            }
          });
        }
      });

      // Generar una fila por cada categoría única
      allCategoriesMap.forEach((categoryInfo) => {
        const categoryPeriodCells = (periods || [])
          .map((period) => {
            const coursePeriod = course.periods?.find(
              (p) => p.period === period.period
            );
            const categoryGrade =
              coursePeriod?.categories?.find((cat) => cat.id === categoryInfo.id)
                ?.average || "-";
            return `<td class="subject-period-cell">${categoryGrade}</td>`;
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

/**
 * Genera una fila de materia para subperiods
 * @param {Object} course - Objeto del curso
 * @param {Array} periodGroups - Array de grupos de períodos con subperiods
 * @param {boolean} showAveragesBySubject - Si mostrar promedio de la materia
 * @param {boolean} showCategoryEvaluation - Si mostrar evaluaciones por categoría
 * @returns {string} HTML de la fila del curso
 */
function generateSubperiodsCourseRow(course, periodGroups, showAveragesBySubject, showCategoryEvaluation) {
  const subperiodCells = (periodGroups || [])
    .map((periodGroup) => {
      if (periodGroup.subperiods.length > 0) {
        return periodGroup.subperiods.map(subperiod => {
          const courseSubperiod = course.subperiods?.find(
            sp => sp.period === periodGroup.period && sp.subperiod === subperiod.subperiod
          );
          const grade = courseSubperiod?.average || "-";
          return `<td class="subject-period-cell">${grade}</td>`;
        }).join('');
      } else {
        // Si no hay subperiods específicos, buscar por período solamente
        const courseSubperiod = course.subperiods?.find(
          sp => sp.period === periodGroup.period
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
  let mainRow = `
    <tr class="subject-row">
      <td class="subject-name">${course.name}</td>
      ${subperiodCells}
      ${averageCell}
    </tr>`;

  // Generar filas adicionales para las categorías
  let categoryRows = "";

  if (course.subperiods && course.subperiods.length > 0 && showCategoryEvaluation) {
    // Recopilar todas las categorías únicas usando ID como identificador único
    const allCategoriesMap = new Map();

    course.subperiods.forEach((courseSubperiod) => {
      if (courseSubperiod.categories && Array.isArray(courseSubperiod.categories)) {
        courseSubperiod.categories.forEach((category) => {
          if (category.name && category.id) {
            // Usar ID como clave única, pero almacenar tanto nombre como ID
            allCategoriesMap.set(category.id, {
              id: category.id,
              name: category.name
            });
          }
        });
      }
    });

    // Generar una fila por cada categoría única
    allCategoriesMap.forEach((categoryInfo) => {
      const categorySubperiodCells = (periodGroups || [])
        .map((periodGroup) => {
          if (periodGroup.subperiods.length > 0) {
            return periodGroup.subperiods.map(subperiod => {
              const courseSubperiod = course.subperiods?.find(
                sp => sp.period === periodGroup.period && sp.subperiod === subperiod.subperiod
              );
              const categoryGrade =
                courseSubperiod?.categories?.find((cat) => cat.id === categoryInfo.id)
                  ?.average || "-";
              return `<td class="subject-period-cell">${categoryGrade}</td>`;
            }).join('');
          } else {
            const courseSubperiod = course.subperiods?.find(
              sp => sp.period === periodGroup.period
            );
            const categoryGrade =
              courseSubperiod?.categories?.find((cat) => cat.id === categoryInfo.id)
                ?.average || "-";
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

/**
 * Genera el cuerpo de la tabla con todas las materias
 * @param {Array} courses - Array de cursos
 * @param {Array} periods - Array de períodos (ya pre-calculado según límite)
 * @param {boolean} showAveragesBySubject - Si mostrar promedio por materia
 * @param {boolean} showCategoryEvaluation - Si mostrar evaluaciones por categoría
 * @returns {string} HTML del cuerpo de la tabla
 */
function generateTableBody(
  courses,
  periods,
  showAveragesBySubject,
  showCategoryEvaluation
) {
  const courseRows = (courses || [])
    .map((course) =>
      generateCourseRow(
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

/**
 * Genera la sección del promedio final
 * @param {boolean} showFinalAverages - Si mostrar promedio final
 * @returns {string} HTML de la sección de promedio final
 */
function generateFinalAverageSection(student, showFinalAverages) {
  const average = student?.groupAverage?.average || "-";
  return showFinalAverages
    ? '<div class="report-draft-page-table-classinfo"><div></div><div>Promedio total: ' +
        average +
        "</div></div>"
    : "";
}

/**
 * Calcula cuántas columnas ocupa un período (considerando subperiods)
 * @param {Object} period - Objeto del período
 * @returns {number} Número de columnas que ocupa
 */
function calculatePeriodColumns(period) {
  if (period.subperiods && period.subperiods.length > 0) {
    return period.subperiods.length;
  }
  return 1; // Un período sin subperiods ocupa 1 columna
}

/**
 * Divide los períodos en chunks según el límite de columnas (funciona con periods y subperiods)
 * @param {Array} periods - Array de períodos
 * @param {boolean} showAveragesBySubject - Si mostrar columna de promedio
 * @param {number} maxNumberOfRows - Cantidad máxima de columnas permitidas
 * @param {Array} courses - Array de cursos para detectar tipo de período
 * @returns {Array} Array de chunks de períodos
 */
function dividePeriodIntoChunks(
  periods,
  showAveragesBySubject,
  maxNumberOfRows,
  courses
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

  const periodType = detectPeriodType(courses);
  const chunks = [];

  if (periodType === 'subperiods') {
    // Para subperiods, necesitamos considerar que cada período puede ocupar múltiples columnas
    let currentChunk = [];
    let currentChunkColumns = 0;

    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      const periodColumns = calculatePeriodColumns(period);

      // Si agregar este período excede el límite, crear un nuevo chunk
      if (currentChunkColumns + periodColumns > availableColumns && currentChunk.length > 0) {
        chunks.push([...currentChunk]);
        currentChunk = [period];
        currentChunkColumns = periodColumns;
      } else {
        // Si es el primer período o cabe en el chunk actual
        currentChunk.push(period);
        currentChunkColumns += periodColumns;
      }
    }

    // Agregar el último chunk si no está vacío
    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
    }
  } else {
    // Lógica original para periods (cada período ocupa 1 columna)
    const periodsPerTable = Math.max(1, availableColumns);
    
    for (let i = 0; i < periods.length; i += periodsPerTable) {
      chunks.push(periods.slice(i, i + periodsPerTable));
    }
  }

  return chunks.length > 0 ? chunks : [periods || []];
}

/**
 * Función principal que genera el reporte estándar de calificaciones
 * @param {Object} student - Objeto del estudiante con sus cursos
 * @param {boolean} showFinalAverages - Si mostrar promedio final
 * @param {boolean} showAveragesBySubject - Si mostrar promedio por materia
 * @param {boolean} showCategoryEvaluation - Si mostrar evaluaciones por categoría
 * @param {number} maxNumberOfRows - Cantidad máxima de columnas permitidas
 * @returns {string} HTML del reporte completo
 */
function ReplacementsStandar(
  student,
  showFinalAverages,
  showAveragesBySubject,
  showCategoryEvaluation,
  maxNumberOfRows
) {

  if(!student?.courses){
    return "<div class='report-draft-page-table-empty'>Aún no hay datos que mostrar</div>";
  }

  const periods = getUniquePeriods(student?.courses);

  // Dividir períodos en chunks según el límite de columnas
  const periodChunks = dividePeriodIntoChunks(
    periods,
    showAveragesBySubject,
    maxNumberOfRows,
    student?.courses
  );

  // Generar una tabla por cada chunk de períodos
  const tables = periodChunks
    .map((periodChunk, index) => {
      const tableHeader = generateTableHeader(
        periodChunk,
        showAveragesBySubject,
        student?.courses
      );
      const tableBody = generateTableBody(
        student?.courses,
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

  const finalAverageSection = generateFinalAverageSection(
    student,
    showFinalAverages
  );

  return `
    ${tables}
    ${finalAverageSection}
  `;
}

module.exports = ReplacementsStandar;
