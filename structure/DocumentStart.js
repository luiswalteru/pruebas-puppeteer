function DocumentStart() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{REPORT_NAME}}</title>
    <style>{{STYLES}}</style>
</head>
<body>
  <div class="report-draft-page report-font-size-{{FONT_SIZE}}">
    <div class="report-draft-page-content">`;
}

module.exports = DocumentStart;
