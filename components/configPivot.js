const config = {
  filterable: true,
  sortable: false,
  dataSource: {
    // data: pivotedProjects,
    columns: [{
      name: 'domainName',
      expand: false
    }, {
      name: 'principleName',
      expand: false
    }, {
      name: 'patternName',
      expand: false    
    }, {
      name: 'indicatorName',
      expand: false
    }, {
      name: 'responseValue',
      expand: false
    }],
    rows: [{
      name: 'analysisId',
      expand: false
    },{
      name: 'templateName',
      expand: false
    },{
      name: 'questionnaireName',
      expand: false
    }], // Specify a dimension on rows.
    measures: ['resilienceLevel'],
    schema: {
      model: {
        fields: {
          // domainName: {
          //   type: 'string'
          // },
        }
      },
      cube: {
        dimensions: {
          domainName: {
            caption: 'Domains (ALL)'
          },
          principleName: {
            caption: 'Principles (ALL)'
          },
          patternName: {
            caption: 'Patterns (ALL)'
          },
          indicatorName: {
            caption: 'Indicators (ALL)'
          },
          responseValue: {
            caption: 'Responses (ALL)'
          },
          analysisId: {
            caption: 'Analyses (ALL)'
          },
          templateName: {
            caption: 'Templates (ALL)'
          },
          questionnaireName: {
            caption: 'Questionnaires (ALL)'
          }
        },
        // measures: ['Sum']
        measures: {
          resilienceLevel: {
            field: 'resilienceLevel',
            aggregate: 'average',
            format: '{0:n2}'
          }
        }
      }
    },
    pageSize: 10000
  },
  height: '90vh'
}

export default config
