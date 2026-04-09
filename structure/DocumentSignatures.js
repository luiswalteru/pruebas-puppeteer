function DocumentSignatures() {
  return `
<div class="report-draft-page-signatures">
  {{SIGNATURE_LEFT}}
  {{SIGNATURE_RIGHT}}  
</div>
<div class="report-draft-page-labels">
  <div class="report-draft-page-labels-left">{{SIGNATURE_LEFT_TITLE}}</div>
  <div class="report-draft-page-labels-right">{{SIGNATURE_RIGHT_TITLE}}</div>
</div>
<div class="report-draft-page-labels">
  <div class="report-draft-page-labels-left">{{SIGNATURE_LEFT_NAME}}</div>
  <div class="report-draft-page-labels-right">{{SIGNATURE_RIGHT_NAME}}</div>
</div>
<div class="report-draft-page-address">
  <div class="report-draft-page-address-column">{{SCHOOL_ADDRESS}}</div>
  <div class="report-draft-page-address-column">{{SCHOOL_EMAIL}}</div>
  <div class="report-draft-page-address-column">{{SCHOOL_PHONE}}</div>
</div>
    </div> <!-- Cierre de report-draft-page-content -->
`;
}

module.exports = DocumentSignatures;
