$(document).ready(function () {
   $('#A4_EMAIL').on('blur', function () {
      checkEmail();
   });
});

const setSelectedZoomItem = selectedItem => {
   if (selectedItem.inputId == 'log_fornecedor') {
      document.querySelector("#A2_COD").value = selectedItem.A2_COD;
      document.querySelector("#A2_NOME").value = selectedItem.A2_NOME;
   } else if (selectedItem.inputId == 'log_produto') {
      document.querySelector("#B1_COD").value = selectedItem.B1_COD;
      document.querySelector("#B1_DESC").value = selectedItem.B1_DESC;
   } else if (selectedItem.inputId == 'log_transportador') {
      document.querySelector("#A4_COD").value = selectedItem.A4_COD;
      document.querySelector("#A4_NOME").value = selectedItem.A4_NOME;
      document.querySelector("#A4_EMAIL").value = selectedItem.A4_EMAIL.trim();
      checkEmail();
   }
}

const removedZoomItem = selectedItem => {
   if (selectedItem.inputId == 'log_fornecedor') {
      document.querySelector("#A2_COD").value = '';
   } else if (selectedItem.inputId == 'log_produto') {
      document.querySelector("#B1_COD").value = '';
   } else if (selectedItem.inputId == 'log_transportador') {
      document.querySelector("#A4_COD").value = '';
      document.querySelector("#A4_EMAIL").value = '';
   }
}

const checkEmail = () => {

   var email = document.querySelector("#A4_EMAIL");

   if (email.value.trim() == '') {
      console.log('E-mail não informado');
      email.setAttribute('placeholder', 'E-mail não informado');
      email.removeAttribute('readonly');
      email.classList.add('errorEmail');

   } else {
      email.setAttribute('readonly', true);
      email.classList.remove('errorEmail');
   }
}