function DocumentContent() {
  return `
<div class="report-draft-page-table-container">
  <div class="report-draft-page-table-classinfo">
    <div>Clase {{CLASS_NAME}}</div>
    <div>{{GROUP_AVERAGE}}</div>
  </div>
  {{TABLE}}
</div>
<!-- Espaciador flexible para empujar el footer hacia abajo -->
<div class="report-draft-page-spacer"></div>
`;
}

module.exports = DocumentContent;
