function DocumentTODO() {
  return (
    `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{REPORT_NAME}}</title>
        <style>{{STYLES}}</style>
    </head>
    <body>
      <div class="report-draft-page report-font-size-{{FONT_SIZE}} page-break">
        <div class="report-draft-page-content">
    
            <div class="report-draft-page-header">
                {{SCHOOL_LOGO}}
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
    
            <div class="report-draft-page-table-container">
                {{CLASS_CONTAINER}}
                {{TABLE}}
            </div>
            <!-- Espaciador flexible para empujar el footer hacia abajo -->
            
    
            {{SIGNATURES_CONTAINER}}  
                
            {{SIGNATURE_TITLES}}

            {{SIGNATURE_NAMES}}

            {{SCHOOL_ADDRESS}}

            </div>
    
            {{CERTIFICATIONS_IMAGES}}
        </div> <!-- Cierre de report-draft-page-content -->
        
    
        </div>
      </body>
    </html>`);
}

module.exports = DocumentTODO;
