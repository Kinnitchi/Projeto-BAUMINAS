$(document).ready(function () {

});

const setSelectedZoomItem = selectedItem => {
   if (selectedItem.inputId == 'log_fornecedor') {
      document.querySelector("#A2_COD").value = selectedItem.A2_COD;
   } else if (selectedItem.inputId == 'log_produto') {
      document.querySelector("#B1_COD").value = selectedItem.B1_COD;
   } else if (selectedItem.inputId == 'log_transportador') {
      document.querySelector("#A4_COD").value = selectedItem.A4_COD;
   }
}

const removedZoomItem = selectedItem => {
   if (selectedItem.inputId == 'log_fornecedor') {
      document.querySelector("#A2_COD").value = '';
   } else if (selectedItem.inputId == 'log_produto') {
      document.querySelector("#B1_COD").value = '';
   } else if (selectedItem.inputId == 'log_transportador') {
      document.querySelector("#A4_COD").value = '';
   }
}