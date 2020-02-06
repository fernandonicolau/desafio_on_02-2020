(function(angular) {
  'use strict';

  angular
    .module('projetoBase')
    .factory('GridCatalogoList', GridCatalogoList);

  function GridCatalogoList() {

    function _grid() {
      var optionsGrid = {
        paginationPageSizes: [10, 50, 75],
        paginationPageSize: 10,
        enableSorting: true,
        // useExternalPagination: true,
        columnDefs: [
          //{ name: 'Nome', field:'name',  width: '15%'},
          { name: 'Nome', field:'name', cellTemplate: 'ver.html', width: '15%'},
          { name: 'Descrição', field:'description',  width: '30%'},
          { name: 'Tipo Catalogo', field:'catalog.name',  width: '15%'},
          { name: 'RA', field:'ra',  width: '13%'},
          { name: 'DEC', field:'dec',  width: '13%'},
          { name: 'Editar', enableFiltering: false, cellTemplate: 'acoes.html', width: '12%'}

        ],
        enableFiltering: true,
        enableColumnResizing: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterPdfDefaultStyle: {fontSize: 8},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true},
        exporterPdfHeader: { text: "Catalogo Galaxias", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
          return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
          docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
          docDefinition.styles.footerStyle = { fontSize: 8, bold: true };
          return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600
      }

      return optionsGrid;

    }

    return {
      grid: _grid
    };


  }

})(window.angular);
