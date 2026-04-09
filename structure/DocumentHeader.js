function DocumentHeader() {
  return `
<div class="report-draft-page-header">
  <div class="report-draft-page-header-logo">
    <img
      src="{{SCHOOL_LOGO_URL}}"
      onerror="this.style.display='none'"
    />
  </div>
  <div class="report-draft-page-header-data">
    <div class="report-draft-page-header-data-column">
      <div class="report-draft-page-header-data-column-schoolname">{{SCHOOL_NAME}}</div>
      <div class="report-draft-page-header-data-column-student">{{STUDENT_NAME}}</div>
    </div>
    <div class="report-draft-page-header-data-column">
      <div class="report-draft-page-header-data-column-date">
        {{DATE_PERIOD}} | {{DATE_REPORT}}
      </div>
      <div class="report-draft-page-header-data-column-etapa">
        {{EDUCATION_YEAR_LEVEL}} | {{EDUCATION_YEAR_YEAR}}
      </div>
    </div>
  </div>
</div>
  `;
}

module.exports = DocumentHeader;
