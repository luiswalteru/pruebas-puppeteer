const ReplacementsStandar = require("./ReplacementsStandar");
const { haveSignature } = require("./utils");

function Replacements(template, data, cssStyles, index, student) {
  // Start Document
  template = template.replace("{{STYLES}}", cssStyles);
  template = template.replace("{{REPORT_NAME}}", data.configuration.name);

  // Header

  const logo = data?.school?.information_school?.school_logo?.[0]?.url
    ? `<div class="report-draft-page-header-logo"> <img src="${data?.school?.information_school?.school_logo?.[0]?.url}" onerror="this.style.display='none'" /> </div>`
    : "";
  template = template.replace("{{SCHOOL_LOGO}}", logo);

  template = template.replace(
    "{{SCHOOL_NAME}}",
    data?.school?.information_school?.school_name || ""
  );
  template = template.replace(
    "{{STUDENT_NAME}}",
    `${student?.name} ${student?.lastname}`
  );
  template = template.replace(
    "{{EDUCATION_YEAR_LEVEL}}",
    `${data?.configuration?.education_year_level || ""}`
  );
  template = template.replace(
    "{{EDUCATION_YEAR_YEAR}}",
    `${data?.configuration?.education_year_year || ""}`
  );
  template = template.replace(
    "{{DATE_PERIOD}}",
    `${data?.configuration?.report_date_period || ""}`
  );
  template = template.replace(
    "{{DATE_REPORT}}",
    `${data?.configuration?.report_date || ""}`
  );
  template = template.replace(
    "{{FONT_SIZE}}",
    `${data?.configuration?.font_size || ""}`
  );

  // Agregar clase para salto de página (excepto en la última página)
  // if (index < data?.students?.length - 1) {
  //   template = template.replace(
  //     '<div class="report-draft-page report-font-size-' +
  //       data?.configuration?.font_size +
  //       '">',
  //     '<div class="report-draft-page report-font-size-' +
  //       data?.configuration?.font_size +
  //       ' page-break">'
  //   );
  // }

  // Content
  template = template.replace(
    "{{CLASS_NAME}}",
    data?.configuration?.school_group?.name || ""
  );

  const showAveragesByClass = data.advanced.show_averages.find(
    (average) => average.value === "AVERAGES_BY_CLASS"
  );
  const showFinalAverages = data.advanced.show_averages.find(
    (average) => average.value === "FINAL_AVERAGES"
  );
  const showAveragesBySubject = data.advanced.show_averages.find(
    (average) => average.value === "AVERAGES_BY_SUBJECT"
  );
  const showCategoryEvaluation =
    data?.advanced?.show_category_evaluation || false;

  const maxNumberOfRows = data?.configuration?.max_number_of_rows || 10;

  let replaceContainerClass = "";
  if (
    data.configuration.type === "standard" ||
    data.configuration.type === "compact"
  ) {
    if (student?.courses) {
      const groupAverageAverage = data?.groupAverage?.average || "-";
      const groupAverage = showAveragesByClass
        ? "Promedio de la clase: " + groupAverageAverage
        : "";
      replaceContainerClass = `<div class='report-draft-page-table-classinfo'> <div>Clase ${
        data?.configuration?.school_group?.name || "-"
      }</div> <div>${groupAverage}</div> </div>`;
    }
  }
  template = template.replace("{{CLASS_CONTAINER}}", replaceContainerClass);

  // Content Table
  const tableStandar = ReplacementsStandar(
    student,
    showFinalAverages,
    showAveragesBySubject,
    showCategoryEvaluation,
    maxNumberOfRows
  );

  template = template.replace("{{TABLE}}", tableStandar);

  // Signatures
  function addSignatureLine(signature) {
    if (signature?.signature_images || signature?.name || signature?.title) {
      return `<div class="report-draft-page-signatures-border"></div>`;
    }
    return "";
  }

  function addSignatureImage(signature) {
    if (signature?.signature_images && signature?.signature_images[0]?.url) {
      return `<img src="${signature?.signature_images[0]?.url}" />`;
    }
    return "";
  }

  if(
    addSignatureLine(data?.school?.signatures?.signature_right) === ''
    && addSignatureLine(data?.school?.signatures?.signature_left) === ''
  ){
    template = template.replace("{{SIGNATURES_CONTAINER}}", "");
  }else{    
    template = template.replace("{{SIGNATURES_CONTAINER}}", "<div class='report-draft-page-signatures'>{{SIGNATURE_LEFT}}{{SIGNATURE_RIGHT}}</div>");
  }

  const signatureLeft = `<div class="report-draft-page-signatures-left">${addSignatureImage(
    data?.school?.signatures?.signature_left
  )} ${addSignatureLine(data?.school?.signatures?.signature_left)}</div>`;

  const signatureRight = `<div class="report-draft-page-signatures-right">${addSignatureImage(
    data?.school?.signatures?.signature_right
  )} ${addSignatureLine(data?.school?.signatures?.signature_right)}</div>`;


  template = template.replace(
    "{{SIGNATURE_LEFT}}",
    haveSignature(data?.school?.signatures?.signature_left) ? signatureLeft : ""
  );

  template = template.replace(
    "{{SIGNATURE_RIGHT}}",
    haveSignature(data?.school?.signatures?.signature_right)
      ? signatureRight
      : ""
  );

  //  signatures titles

  const signatureLeftTitle = data?.school?.signatures?.signature_left?.title
    ? `<div class="report-draft-page-labels-left"> ${data?.school?.signatures?.signature_left?.title} </div>`
    : "";
  const signatureRightTitle = data?.school?.signatures?.signature_right?.title
    ? `<div class="report-draft-page-labels-right"> ${data?.school?.signatures?.signature_right?.title} </div>`
    : "";

  template = template.replace(
    "{{SIGNATURE_TITLES}}",
    signatureLeftTitle || signatureRightTitle
      ? `<div class="report-draft-page-labels"> ${signatureLeftTitle} ${signatureRightTitle} </div>`
      : ""
  );

  //  signatures names
  const signatureLeftName = data?.school?.signatures?.signature_left?.name
    ? `<div class="report-draft-page-labels-left"> ${data?.school?.signatures?.signature_left?.name} </div>`
    : "";
  const signatureRightName = data?.school?.signatures?.signature_right?.name
    ? `<div class="report-draft-page-labels-right"> ${data?.school?.signatures?.signature_right?.name} </div>`
    : "";

  template = template.replace(
    "{{SIGNATURE_NAMES}}",
    signatureLeftName || signatureRightName
      ? `<div class="report-draft-page-labels"> ${signatureLeftName} ${signatureRightName} </div>`
      : ""
  );

  template = template.replace(
    "{{SIGNATURE_LEFT_NAME}}",
    data?.school?.signatures?.signature_left?.name || ""
  );
  template = template.replace(
    "{{SIGNATURE_RIGHT_NAME}}",
    data?.school?.signatures?.signature_right?.name || ""
  );

  const address = data?.school?.information_contact?.school_adress
    ? `<div class="report-draft-page-address-column"> ${data?.school?.information_contact?.school_adress} </div>`
    : "";
  const email = data?.school?.information_contact?.school_email
    ? `<div class="report-draft-page-address-column"> ${data?.school?.information_contact?.school_email} </div>`
    : "";
  const phone = data?.school?.information_contact?.school_phone
    ? `<div class="report-draft-page-address-column"> ${data?.school?.information_contact?.school_phone} </div>`
    : "";

  template = template.replace(
    "{{SCHOOL_ADDRESS}}",
    address || email || phone
      ? `<div class="report-draft-page-address"> ${address} ${email} ${phone} </div>`
      : ""
  );

  template = template.replace(
    "{{SCHOOL_ADDRESS}}",
    data?.school?.information_contact?.school_adress || ""
  );
  template = template.replace(
    "{{SCHOOL_EMAIL}}",
    data?.school?.information_contact?.school_email || ""
  );
  template = template.replace(
    "{{SCHOOL_PHONE}}",
    data?.school?.information_contact?.school_phone || ""
  );

  // Footer
  template = template.replace(
    "{{CERTIFICATIONS_IMAGES}}",
    data?.school?.certifications && data?.school?.certifications.length > 0
      ? `<div class="report-draft-page-certifications">` +
          data?.school?.certifications
            .map((certification) => `<img src="${certification?.url}" />`)
            .join("") +
          `</div>`
      : ""
  );

  return template;
}

module.exports = Replacements;
